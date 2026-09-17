import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login, loading } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    const result = await login(formData);

    if (!result.success) {
      setError(result.message);
      return;
    }

    const redirectTo =
      location.state?.from?.pathname || "/dashboard";

    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="min-h-[calc(100vh-160px)] bg-stone-100 px-4 py-10 sm:py-14 lg:px-6 lg:py-20">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
            Welcome back
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">
            Sign in
          </h1>

          <p className="mt-3 text-sm text-stone-500">
            Sign in to manage your Newsroom account.
          </p>
        </div>

        {/* Form */}
        <div className="border border-stone-200 bg-white p-5 shadow-sm sm:p-7">
          {error && (
            <div className="mb-5 border-l-4 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-stone-800"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-red-600"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-stone-800"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-red-600"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-stone-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Register */}
          <div className="mt-6 border-t border-stone-200 pt-6 text-center">
            <p className="text-sm text-stone-500">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-red-600 hover:text-red-700"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;