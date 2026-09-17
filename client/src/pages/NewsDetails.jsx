
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  User,
  LoaderCircle,
  Newspaper,
} from "lucide-react";

import api from "../services/api";

function NewsDetails() {
  const { id } = useParams();

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get(`/news/${id}`);

        setNews(response.data.news);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load this news."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-stone-100 px-4">
        <div className="flex items-center gap-2 text-sm text-stone-500">
          <LoaderCircle
            size={18}
            className="animate-spin"
          />
          Loading story...
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-[60vh] bg-stone-100 px-4 py-12">
        <div className="mx-auto max-w-xl border border-stone-200 bg-white p-6 text-center sm:p-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center bg-red-50 text-red-600">
            <Newspaper size={22} />
          </div>

          <h1 className="mt-4 text-xl font-bold text-stone-900">
            Story not found
          </h1>

          <p className="mt-2 text-sm leading-6 text-stone-500">
            {error || "The requested news story could not be found."}
          </p>

          <Link
            to="/news"
            className="mt-6 inline-flex items-center gap-2 bg-stone-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-600"
          >
            <ArrowLeft size={16} />
            Back to News
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(
    news.createdAt
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Article Header */}
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12 lg:px-6 lg:py-16">
          <Link
            to="/news"
            className="mb-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-stone-500 transition hover:text-red-600"
          >
            <ArrowLeft size={15} />
            Back to News
          </Link>

          <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider">
            <span className="bg-red-600 px-3 py-1.5 text-white">
              {news.category}
            </span>

            <span className="flex items-center gap-1.5 text-stone-500">
              <CalendarDays size={14} />
              {formattedDate}
            </span>
          </div>

          <h1 className="max-w-4xl text-3xl font-black leading-tight tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
            {news.title}
          </h1>

          {news.description && (
            <p className="mt-5 max-w-3xl text-base leading-7 text-stone-600 sm:text-lg sm:leading-8">
              {news.description}
            </p>
          )}

          <div className="mt-7 flex items-center gap-3 border-t border-stone-200 pt-5">
            {news.author?.photoURL ? (
              <img
                src={news.author.photoURL}
                alt={news.author.name}
                className="h-10 w-10 rounded-full border border-stone-200 object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-500">
                <User size={18} />
              </div>
            )}

            <div>
              <p className="text-sm font-bold text-stone-900">
                {news.author?.name || "Newsroom Contributor"}
              </p>

              <p className="mt-0.5 text-xs text-stone-500">
                Published by Newsroom
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:py-10 lg:px-6 lg:py-12">
        <article className="border border-stone-200 bg-white">
          {/* Image */}
          <div className="overflow-hidden bg-stone-100">
            <img
              src={news.image}
              alt={news.title}
              className="max-h-[560px] w-full object-cover"
            />
          </div>

          <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            <div className="whitespace-pre-line text-base leading-8 text-stone-700 sm:text-lg sm:leading-9">
              {news.content}
            </div>
          </div>
        </article>

        {/* Back */}
        <div className="mt-8">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 border border-stone-300 bg-white px-5 py-3 text-sm font-bold text-stone-700 transition hover:border-stone-900 hover:text-stone-900"
          >
            <ArrowLeft size={16} />
            More News
          </Link>
        </div>
      </main>
    </div>
  );
}

export default NewsDetails;