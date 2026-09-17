import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";
import NewsCard from "../components/NewsCard";

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get("/news");

        setNews(response.data.news || []);
      } catch (error) {
        console.error(error);

        setError("Unable to load the latest news.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const latestNews = news.slice(0, 6);

  const featuredNews = latestNews[0];

  return (
    <div>

      {/*
          HERO / LEAD STORY */}
      <section className="border-b border-stone-300 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 md:py-14">

          <div className="mb-8 flex items-end justify-between border-b border-stone-200 pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-700">
                The latest
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-tight text-stone-950 md:text-3xl">
                Today&apos;s Headlines
              </h2>
            </div>

            <Link
              to="/news"
              className="hidden text-sm font-semibold text-stone-600 hover:text-red-700 sm:block"
            >
              View all →
            </Link>
          </div>

          {loading ? (
            <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
              <div className="h-[420px] animate-pulse bg-stone-200" />
              <div className="space-y-4">
                <div className="h-32 animate-pulse bg-stone-200" />
                <div className="h-32 animate-pulse bg-stone-200" />
                <div className="h-32 animate-pulse bg-stone-200" />
              </div>
            </div>
          ) : error ? (
            <div className="border border-red-200 bg-red-50 px-5 py-8 text-sm text-red-700">
              {error}
            </div>
          ) : featuredNews ? (
            <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">

              {/* Main story */}
              <Link
                to={`/news/${featuredNews._id}`}
                className="group"
              >
                <div className="overflow-hidden">
                  <img
                    src={featuredNews.image}
                    alt={featuredNews.title}
                    className="h-[300px] w-full object-cover transition duration-500 group-hover:scale-[1.02] md:h-[420px]"
                  />
                </div>

                <div className="mt-5">
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider">
                    <span className="text-red-700">
                      {featuredNews.category}
                    </span>

                    <span className="text-stone-300">•</span>

                    <span className="text-stone-400">
                      {featuredNews.author?.name || "Staff"}
                    </span>
                  </div>

                  <h1 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight text-stone-950 group-hover:text-red-700 md:text-5xl">
                    {featuredNews.title}
                  </h1>

                  <p className="mt-4 max-w-3xl text-base leading-7 text-stone-600">
                    {featuredNews.description}
                  </p>
                </div>
              </Link>

              {/* Side stories */}
              <div className="divide-y divide-stone-200 border-y border-stone-200">
                {latestNews.slice(1, 4).map((item) => (
                  <Link
                    key={item._id}
                    to={`/news/${item._id}`}
                    className="group flex gap-4 py-5"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-24 w-28 shrink-0 object-cover"
                    />

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-red-700">
                        {item.category}
                      </span>

                      <h3 className="mt-1 line-clamp-3 text-base font-bold leading-5 text-stone-900 group-hover:text-red-700">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-xs text-stone-400">
                        {item.author?.name || "Staff"}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

            </div>
          ) : (
            <div className="border border-dashed border-stone-300 py-16 text-center">
              <p className="text-stone-500">
                No news available yet.
              </p>
            </div>
          )}

        </div>
      </section>

      {/* LATEST NEWS */}
      <section className="mx-auto max-w-7xl px-5 py-14">

        <div className="mb-8 flex items-end justify-between border-b border-stone-300 pb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-700">
              More stories
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight">
              Latest News
            </h2>
          </div>

          <Link
            to="/news"
            className="text-sm font-semibold text-stone-600 hover:text-red-700"
          >
            See all →
          </Link>
        </div>

        {latestNews.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestNews.map((item) => (
              <NewsCard key={item._id} news={item} />
            ))}
          </div>
        )}

      </section>

      {/* CTA Additional */}
      <section className="border-y border-stone-300 bg-stone-100">
        <div className="mx-auto max-w-7xl px-5 py-14">

          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-700">
              Join the newsroom
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950">
              Have a story worth publishing?
            </h2>

            <p className="mt-4 leading-7 text-stone-600">
              Create an account and publish your own news stories on the
              platform.
            </p>

            <Link
              to="/register"
              className="mt-6 inline-flex bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Create an account
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;
