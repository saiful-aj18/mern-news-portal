import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import NewsCard from "../components/NewsCard";

function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get("/news");
        setNews(response.data.news || []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load news."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-7xl items-center justify-center px-4">
        <p className="text-sm text-stone-500">
          Loading latest news...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center lg:px-6">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  const latestSix = news.slice(0, 6);
  const featuredNews = latestSix[0];
  const sideNews = latestSix.slice(1, 4);
  const gridNews = latestSix.slice(4, 7);

  return (
    <div>
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:pb-12 sm:pt-10 lg:px-6 lg:pb-16 lg:pt-14">
        <div className="mb-8 border-b border-stone-300 pb-5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
            Top Stories
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
            Today&apos;s Headlines
          </h1>
        </div>

        {featuredNews && (
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Featured Story */}
            <article className="lg:col-span-8">
              <Link
                to={`/news/${featuredNews._id}`}
                className="group block"
              >
                <div className="overflow-hidden bg-stone-200">
                  <img
                    src={featuredNews.image}
                    alt={featuredNews.title}
                    className="aspect-[16/10] w-full object-cover transition duration-300 group-hover:scale-[1.01] sm:aspect-[16/9]"
                  />
                </div>

                <div className="mt-5">
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                    <span className="text-red-600">
                      {featuredNews.category}
                    </span>

                    <span className="text-stone-300">
                      •
                    </span>

                    <span className="text-stone-500">
                      {new Date(
                        featuredNews.createdAt
                      ).toLocaleDateString()}
                    </span>
                  </div>

                  <h2 className="mt-3 text-2xl font-black leading-tight tracking-tight text-stone-900 transition group-hover:text-red-600 sm:text-3xl lg:text-4xl">
                    {featuredNews.title}
                  </h2>

                  <p className="mt-4 max-w-3xl text-sm leading-6 text-stone-600 sm:text-base">
                    {featuredNews.description}
                  </p>
                </div>
              </Link>
            </article>

            {/* Side Stories */}
            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
              {sideNews.map((item) => (
                <Link
                  key={item._id}
                  to={`/news/${item._id}`}
                  className="group grid grid-cols-[110px_1fr] gap-4 border-b border-stone-200 pb-5 sm:grid-cols-[130px_1fr] lg:grid-cols-[120px_1fr]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="aspect-square w-full object-cover"
                  />

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-600">
                      {item.category}
                    </p>

                    <h3 className="mt-2 text-sm font-bold leading-5 text-stone-900 transition group-hover:text-red-600 sm:text-base">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Latest News */}
      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:py-12 lg:px-6 lg:py-14">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
                Latest
              </p>

              <h2 className="mt-2 text-2xl font-black text-stone-900 sm:text-3xl">
                More News
              </h2>
            </div>

            <Link
              to="/news"
              className="shrink-0 text-xs font-bold uppercase tracking-wide text-stone-600 hover:text-red-600 sm:text-sm"
            >
              View all →
            </Link>
          </div>

          {gridNews.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {gridNews.map((item) => (
                <NewsCard
                  key={item._id}
                  news={item}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-stone-500">
              No additional news available.
            </p>
          )}
        </div>
      </section>

      {/* Editorial CTA */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:py-14 lg:px-6 lg:py-16">
        <div className="border-l-4 border-red-600 bg-stone-900 px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">
              Newsroom
            </p>

            <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
              Stay informed. Stay connected.
            </h2>

            <p className="mt-3 text-sm leading-6 text-stone-400 sm:text-base">
              Explore our complete news coverage and discover stories
              from different categories.
            </p>

            <Link
              to="/news"
              className="mt-6 inline-block bg-white px-5 py-3 text-sm font-bold text-stone-900 transition hover:bg-stone-200"
            >
              Explore all news
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;