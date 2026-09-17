import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LogIn,
  LogOut,
  LayoutDashboard,
  Plus,
} from "lucide-react";

import useAuthStore from "../store/authStore";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const { user, logout } = useAuthStore();

  const navLinkClass = ({ isActive }) =>
    `text-sm font-semibold transition ${
      isActive
        ? "text-red-600"
        : "text-stone-700 hover:text-red-600"
    }`;

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/90 shadow-sm backdrop-blur-xl">
      {/* Top Info Bar */}
      <div className="hidden border-b border-stone-200/70 bg-stone-50/70 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs text-stone-500 lg:px-6">
          <span>Thursday, September 17, 2026</span>

          <span>Independent News &amp; Analysis</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex min-h-16 items-center justify-between gap-4">
          <Link
            to="/"
            onClick={closeMenu}
            className="flex shrink-0 items-center gap-2.5 sm:gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center bg-red-600 text-lg font-black text-white shadow-sm sm:h-10 sm:w-10 sm:text-xl">
              N
            </div>

            <div className="leading-none">
              <div className="text-base font-black tracking-tight text-stone-900 sm:text-xl">
                NEWSROOM
              </div>

              <div className="mt-1 text-[8px] font-medium uppercase tracking-[0.18em] text-stone-500 sm:text-[9px]">
                Daily Journal
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/news" className={navLinkClass}>
              Latest
            </NavLink>

            <NavLink
              to="/news?category=Politics"
              className={navLinkClass}
            >
              Politics
            </NavLink>

            <NavLink
              to="/news?category=Technology"
              className={navLinkClass}
            >
              Technology
            </NavLink>

            <NavLink
              to="/news?category=Sports"
              className={navLinkClass}
            >
              Sports
            </NavLink>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-700 transition hover:text-red-600"
                >
                  <LayoutDashboard size={15} />
                  Dashboard
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 border border-cyan-900 px-4 py-2 text-sm font-semibold text-cyan-900 transition hover:bg-cyan-900 hover:text-white"
                >
                  <LogOut size={15} />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-2 border border-cyan-900 px-4 py-2 text-sm font-semibold text-cyan-900 transition hover:bg-cyan-900 hover:text-white"
              >
                <LogIn size={15} />
                Sign in
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() =>
              setMenuOpen((prev) => !prev)
            }
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-stone-300 bg-white/70 text-stone-900 transition hover:border-stone-900 lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="border-t border-stone-200/80 py-3 lg:hidden">
            <nav className="flex flex-col">
              <NavLink
                to="/"
                onClick={closeMenu}
                className={navLinkClass}
              >
                <span className="flex items-center border-b border-stone-100 px-2 py-3">
                  Home
                </span>
              </NavLink>

              <NavLink
                to="/news"
                onClick={closeMenu}
                className={navLinkClass}
              >
                <span className="flex items-center border-b border-stone-100 px-2 py-3">
                  Latest
                </span>
              </NavLink>

              <NavLink
                to="/news?category=Politics"
                onClick={closeMenu}
                className={navLinkClass}
              >
                <span className="flex items-center border-b border-stone-100 px-2 py-3">
                  Politics
                </span>
              </NavLink>

              <NavLink
                to="/news?category=Technology"
                onClick={closeMenu}
                className={navLinkClass}
              >
                <span className="flex items-center border-b border-stone-100 px-2 py-3">
                  Technology
                </span>
              </NavLink>

              <NavLink
                to="/news?category=Sports"
                onClick={closeMenu}
                className={navLinkClass}
              >
                <span className="flex items-center border-b border-stone-100 px-2 py-3">
                  Sports
                </span>
              </NavLink>

              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={closeMenu}
                    className="flex items-center gap-2 border-b border-stone-100 px-2 py-3 text-sm font-semibold text-stone-700 transition hover:text-cyan-600"
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>

                  <Link
                    to="/create-news"
                    onClick={closeMenu}
                    className="flex items-center gap-2 border-b border-stone-100 px-2 py-3 text-sm font-semibold text-stone-700 transition hover:text-cyan-600"
                  >
                    <Plus size={16} />
                    Create News
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-3 flex items-center justify-center gap-2 bg-cyan-900 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-cyan-600"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="mt-3 flex items-center justify-center gap-2 bg-cyan-900 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-cyan-600"
                >
                  <LogIn size={16} />
                  Sign in
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>

      <div className="border-t border-stone-200/70 bg-white/50">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 lg:px-6">
          <div className="flex min-w-max items-center gap-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-stone-500 sm:gap-6">
            <span className="text-red-600">
              Trending
            </span>

            <span>Bangladesh</span>
            <span>World</span>
            <span>Business</span>
            <span>Entertainment</span>
            <span>Health</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;