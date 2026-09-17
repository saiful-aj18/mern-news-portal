import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  LoaderCircle,
  Newspaper,
} from "lucide-react";

import api from "../services/api";

const categories = [
  "All",
  "Politics",
  "Sports",
  "Technology",
  "Business",
  "Entertainment",
  "Health",
  "World",
  "National",
];

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get("/news");

        setNews(response.data.news || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const matchSearch =
        item.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchCategory =
        selectedCategory === "All"
          ? true
          : item.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [news, search, selectedCategory]);

  const totalPages = Math.ceil(
    filteredNews.length / itemsPerPage
  );

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const currentNews = filteredNews.slice(start, end);

  return (
    <div className="min-h-screen bg-stone-100">
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-600">
            News Archive
          </p>

          <h1 className="mt-2 text-3xl font-black text-stone-900 sm:text-4xl">
            Latest News
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-500">
            Explore stories from politics, sports,
            technology, business and more.
          </p>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 lg:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div className="relative w-full lg:max-w-sm">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
              />

              <input
                type="text"
                placeholder="Search news..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full border border-stone-300 bg-white py-3 pl-10 pr-3 text-sm outline-none focus:border-red-600"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 text-xs font-bold transition
                  ${
                    selectedCategory === cat
                      ? "bg-red-600 text-white"
                      : "border border-stone-300 bg-white text-stone-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        {loading ? (
          <div className="flex min-h-[50vh] items-center justify-center">
            <div className="flex items-center gap-2 text-stone-500">
              <LoaderCircle
                size={18}
                className="animate-spin"
              />
              Loading news...
            </div>
          </div>
        ) : currentNews.length === 0 ? (
          <div className="border border-dashed border-stone-300 bg-white py-16 text-center">
            <Newspaper
              size={40}
              className="mx-auto text-stone-400"
            />

            <h3 className="mt-4 text-xl font-bold">
              No news found
            </h3>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {currentNews.map((item) => (
                <article
                  key={item._id}
                  className="border border-stone-200 bg-white transition hover:border-stone-400"
                >
                  <Link to={`/news/${item._id}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="aspect-[16/10] w-full object-cover"
                    />
                  </Link>

                  <div className="p-5">
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide">
                      <span className="text-red-600">
                        {item.category}
                      </span>

                      <span className="text-stone-300">
                        •
                      </span>

                      <span className="text-stone-500">
                        {new Date(
                          item.createdAt
                        ).toLocaleDateString()}
                      </span>
                    </div>

                    <Link to={`/news/${item._id}`}>
                      <h3 className="mt-3 text-lg font-bold leading-7 text-stone-900 hover:text-red-600">
                        {item.title}
                      </h3>
                    </Link>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-stone-500">
                      {item.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-xs text-stone-500">
                        {item.author?.name}
                      </span>

                      <Link
                        to={`/news/${item._id}`}
                        className="text-sm font-bold text-red-600"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setCurrentPage(index + 1)
                  }
                  className={`h-10 w-10 text-sm font-bold
                  ${
                    currentPage === index + 1
                      ? "bg-red-600 text-white"
                      : "border border-stone-300 bg-white"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default News;
