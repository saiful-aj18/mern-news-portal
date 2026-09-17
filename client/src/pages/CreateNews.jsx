import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Image,
  Layers,
  Send,
  LoaderCircle,
  Type,
} from "lucide-react";

import api from "../services/api";

const categories = [
  "Politics",
  "Sports",
  "Technology",
  "Business",
  "Entertainment",
  "Health",
  "World",
  "National",
];

function CreateNews() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    category: "National",
    description: "",
    content: "",
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !formData.title.trim() ||
      !formData.image.trim() ||
      !formData.category ||
      !formData.description.trim() ||
      !formData.content.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    setSaving(true);

    try {
      const response = await api.post("/news", {
        title: formData.title.trim(),
        image: formData.image.trim(),
        category: formData.category,
        description: formData.description.trim(),
        content: formData.content.trim(),
      });

      const createdNews = response.data.news;

      navigate(`/news/${createdNews._id}`, {
        replace: true,
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to publish news. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100">
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:py-10 lg:px-6">
          <Link
            to="/dashboard"
            className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-stone-500 transition hover:text-red-600"
          >
            <ArrowLeft size={15} />
            Back to Dashboard
          </Link>

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-red-600 text-white">
              <FileText size={19} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-600">
                News Publisher
              </p>

              <h1 className="mt-1 text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">
                Create News
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-stone-500">
                Write and publish a new story to the Newsroom.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:py-10 lg:px-6 lg:py-12">
        <div className="border border-stone-200 bg-white">
          <div className="border-b border-stone-200 px-5 py-5 sm:px-7">
            <h2 className="font-bold text-stone-900">
              Story Information
            </h2>

            <p className="mt-1 text-xs text-stone-500">
              Add the details of your news story below.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-5 sm:p-7"
          >
            {error && (
              <div className="mb-6 border-l-4 border-red-600 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                {error}
              </div>
            )}

            <div className="mb-6">
              <label
                htmlFor="title"
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-stone-600"
              >
                News Title
              </label>

              <div className="relative">
                <Type
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                />

                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter a clear and engaging headline"
                  className="w-full border border-stone-300 bg-white py-3.5 pl-10 pr-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-red-600"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Image */}
              <div>
                <label
                  htmlFor="image"
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-stone-600"
                >
                  Image URL
                </label>

                <div className="relative">
                  <Image
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                  />

                  <input
                    id="image"
                    name="image"
                    type="url"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full border border-stone-300 bg-white py-3.5 pl-10 pr-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-red-600"
                  />
                </div>

                <p className="mt-2 text-[11px] text-stone-400">
                  Use a publicly accessible image URL.
                </p>
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-stone-600"
                >
                  Category
                </label>

                <div className="relative">
                  <Layers
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                  />

                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full appearance-none border border-stone-300 bg-white py-3.5 pl-10 pr-3 text-sm text-stone-900 outline-none transition focus:border-red-600"
                  >
                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {formData.image.trim() && (
              <div className="mt-6">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-stone-600">
                  Image Preview
                </p>

                <div className="overflow-hidden border border-stone-200 bg-stone-100">
                  <img
                    src={formData.image}
                    alt="News preview"
                    className="max-h-80 w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mt-6">
              <label
                htmlFor="description"
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-stone-600"
              >
                Short Description
              </label>

              <textarea
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a short summary of the story..."
                className="w-full resize-none border border-stone-300 bg-white px-3 py-3 text-sm leading-6 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-red-600"
              />

              <p className="mt-2 text-[11px] text-stone-400">
                This summary will appear on news cards.
              </p>
            </div>

            <div className="mt-6">
              <label
                htmlFor="content"
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-stone-600"
              >
                Full Story
              </label>

              <textarea
                id="content"
                name="content"
                rows="12"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write the full news story here..."
                className="w-full resize-y border border-stone-300 bg-white px-3 py-3 text-sm leading-7 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-red-600"
              />

              <p className="mt-2 text-[11px] text-stone-400">
                Write the complete content of your news story.
              </p>
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-stone-200 pt-6 sm:flex-row sm:justify-end">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 border border-stone-300 px-5 py-3 text-sm font-bold text-stone-700 transition hover:border-stone-900 hover:text-stone-900"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 bg-stone-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <LoaderCircle
                      size={17}
                      className="animate-spin"
                    />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Send size={17} />
                    Publish News
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default CreateNews;