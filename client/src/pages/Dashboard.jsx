import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  FileText,
  Plus,
  Pencil,
  Trash2,
  Save,
  Camera,
  Newspaper,
  ArrowRight,
  LoaderCircle,
} from "lucide-react";

import api from "../services/api";
import useAuthStore from "../store/authStore";

function Dashboard() {
  const { user } = useAuthStore();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    photoURL: "",
    bio: "",
  });

  const [myNews, setMyNews] = useState([]);

  const [profileLoading, setProfileLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/users/profile");

        const userData = response.data.user;

        setProfile({
          name: userData.name || "",
          email: userData.email || "",
          photoURL: userData.photoURL || "",
          bio: userData.bio || "",
        });
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load profile."
        );
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchMyNews = async () => {
      try {
        const response = await api.get("/news/my-news");

        setMyNews(response.data.news || []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load your news."
        );
      } finally {
        setNewsLoading(false);
      }
    };

    fetchMyNews();
  }, []);


  const handleChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Update Profile
 
  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await api.put(
        "/users/profile",
        {
          name: profile.name,
          photoURL: profile.photoURL,
          bio: profile.bio,
        }
      );

      const updatedUser = response.data.user;

      setProfile({
        name: updatedUser.name || "",
        email: updatedUser.email || "",
        photoURL: updatedUser.photoURL || "",
        bio: updatedUser.bio || "",
      });

      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteNews = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this news?"
    );

    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
      await api.delete(`/news/${id}`);

      setMyNews((prev) =>
        prev.filter((item) => item._id !== id)
      );

      setMessage("News deleted successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to delete news."
      );
    }
  };

  return (
    <div className="min-h-screen bg-stone-100">
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 lg:px-6 lg:py-12">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-red-600">
                <Newspaper size={14} />
                <span>Account Dashboard</span>
              </div>

              <h1 className="text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">
                Welcome back{user?.name ? `, ${user.name}` : ""}
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-stone-500 sm:text-base">
                Manage your profile and keep track of the
                stories you have published.
              </p>
            </div>

            <Link
              to="/create-news"
              className="inline-flex w-full items-center justify-center gap-2 bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700 sm:w-auto"
            >
              <Plus size={17} />
              Create News
            </Link>
          </div>
        </div>
      </section>
  
      <main className="mx-auto max-w-7xl px-4 py-8 sm:py-10 lg:px-6 lg:py-12">

        {message && (
          <div className="mb-6 border-l-4 border-green-600 bg-green-50 px-4 py-3 text-sm text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 border-l-4 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-12">
          <section className="lg:col-span-4">
            <div className="border border-stone-200 bg-white">
              <div className="border-b border-stone-200 px-5 py-5 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center bg-stone-100 text-stone-700">
                    <User size={18} />
                  </div>

                  <div>
                    <h2 className="font-bold text-stone-900">
                      Profile
                    </h2>

                    <p className="text-xs text-stone-500">
                      Update your account information
                    </p>
                  </div>
                </div>
              </div>

              {profileLoading ? (
                <div className="flex min-h-80 items-center justify-center">
                  <div className="flex items-center gap-2 text-sm text-stone-500">
                    <LoaderCircle
                      size={17}
                      className="animate-spin"
                    />
                    Loading profile...
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleProfileUpdate}
                  className="p-5 sm:p-6"
                >
                  {/* Profile Image */}
                  <div className="mb-6 flex items-center gap-4">
                    <div className="relative">
                      {profile.photoURL ? (
                        <img
                          src={profile.photoURL}
                          alt={profile.name}
                          className="h-16 w-16 rounded-full border border-stone-200 object-cover"
                        />
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-stone-500">
                          <User size={25} />
                        </div>
                      )}

                      <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-600 text-white">
                        <Camera size={11} />
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-bold text-stone-900">
                        {profile.name || "Your Name"}
                      </p>

                      <p className="mt-1 text-xs text-stone-500">
                        News contributor
                      </p>
                    </div>
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="name"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-stone-600"
                    >
                      Full Name
                    </label>

                    <div className="relative">
                      <User
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                      />

                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={profile.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-stone-300 bg-white py-3 pl-10 pr-3 text-sm outline-none transition focus:border-red-600"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-5">
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-stone-600"
                    >
                      Email
                    </label>

                    <div className="relative">
                      <Mail
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                      />

                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={profile.email}
                        disabled
                        className="w-full cursor-not-allowed border border-stone-200 bg-stone-50 py-3 pl-10 pr-3 text-sm text-stone-500 outline-none"
                      />
                    </div>

                    <p className="mt-2 text-[11px] text-stone-400">
                      Email cannot be changed.
                    </p>
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="photoURL"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-stone-600"
                    >
                      Profile Photo URL
                    </label>

                    <div className="relative">
                      <Camera
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                      />

                      <input
                        id="photoURL"
                        name="photoURL"
                        type="url"
                        value={profile.photoURL}
                        onChange={handleChange}
                        placeholder="https://example.com/photo.jpg"
                        className="w-full border border-stone-300 bg-white py-3 pl-10 pr-3 text-sm outline-none transition placeholder:text-stone-400 focus:border-red-600"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="bio"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-stone-600"
                    >
                      Bio
                    </label>

                    <textarea
                      id="bio"
                      name="bio"
                      rows="4"
                      value={profile.bio}
                      onChange={handleChange}
                      placeholder="Write a short bio..."
                      className="w-full resize-none border border-stone-300 bg-white px-3 py-3 text-sm leading-6 outline-none transition placeholder:text-stone-400 focus:border-red-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex w-full items-center justify-center gap-2 bg-stone-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? (
                      <>
                        <LoaderCircle
                          size={17}
                          className="animate-spin"
                        />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={17} />
                        Update Profile
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </section>

          <section className="lg:col-span-8">
            <div className="border border-stone-200 bg-white">
              
              <div className="border-b border-stone-200 px-5 py-5 sm:px-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center bg-stone-100 text-stone-700">
                      <FileText size={18} />
                    </div>

                    <div>
                      <h2 className="font-bold text-stone-900">
                        My News
                      </h2>

                      <p className="text-xs text-stone-500">
                        Stories published by you
                      </p>
                    </div>
                  </div>

                  <div className="text-xs font-semibold text-stone-500">
                    {myNews.length}{" "}
                    {myNews.length === 1
                      ? "Story"
                      : "Stories"}
                  </div>
                </div>
              </div>

              {/* News List */}
              <div className="p-4 sm:p-6">
                {newsLoading ? (
                  <div className="flex min-h-60 items-center justify-center">
                    <div className="flex items-center gap-2 text-sm text-stone-500">
                      <LoaderCircle
                        size={17}
                        className="animate-spin"
                      />
                      Loading your news...
                    </div>
                  </div>
                ) : myNews.length === 0 ? (
                  <div className="border border-dashed border-stone-300 px-5 py-12 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center bg-stone-100 text-stone-500">
                      <FileText size={22} />
                    </div>

                    <h3 className="mt-4 font-bold text-stone-900">
                      No stories yet
                    </h3>

                    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-stone-500">
                      You haven&apos;t published any news
                      stories yet. Create your first story
                      to get started.
                    </p>

                    <Link
                      to="/create-news"
                      className="mt-5 inline-flex items-center gap-2 bg-stone-900 px-4 py-3 text-sm font-bold text-white hover:bg-red-600"
                    >
                      <Plus size={16} />
                      Create your first story
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {myNews.map((item) => (
                      <article
                        key={item._id}
                        className="border border-stone-200 p-3 transition hover:border-stone-300 sm:p-4"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row">

                          <Link
                            to={`/news/${item._id}`}
                            className="block shrink-0 sm:w-36"
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              className="aspect-[16/10] w-full object-cover sm:aspect-square"
                            />
                          </Link>

                          {/* Content */}
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
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

                            <Link
                              to={`/news/${item._id}`}
                            >
                              <h3 className="mt-2 text-base font-bold leading-6 text-stone-900 hover:text-red-600 sm:text-lg">
                                {item.title}
                              </h3>
                            </Link>

                            <p className="mt-2 line-clamp-2 text-sm leading-5 text-stone-500">
                              {item.description}
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                              <Link
                                to={`/edit-news/${item._id}`}
                                className="inline-flex items-center gap-1.5 border border-stone-300 px-3 py-2 text-xs font-bold text-stone-700 transition hover:border-stone-900 hover:text-stone-900"
                              >
                                <Pencil size={14} />
                                Edit
                              </Link>

                              <button
                                type="button"
                                onClick={() =>
                                  handleDeleteNews(
                                    item._id
                                  )
                                }
                                className="inline-flex items-center gap-1.5 border border-red-200 px-3 py-2 text-xs font-bold text-red-600 transition hover:border-red-600 hover:bg-red-50"
                              >
                                <Trash2 size={14} />
                                Delete
                              </button>

                              <Link
                                to={`/news/${item._id}`}
                                className="ml-auto inline-flex items-center gap-1.5 px-2 py-2 text-xs font-bold text-stone-500 hover:text-red-600"
                              >
                                View
                                <ArrowRight size={14} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;