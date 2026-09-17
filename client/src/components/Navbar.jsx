import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Latest", path: "/news" },
    { name: "Politics", path: "/news?category=Politics" },
    { name: "Technology", path: "/news?category=Technology" },
    { name: "Sports", path: "/news?category=Sports" },
  ];

  return (
    <>
      {/* Top information bar */}
      <div className="hidden border-b border-stone-200 bg-stone-100 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 text-xs text-stone-500">
          <p>Independent news. Clear reporting.</p>

          <p>
            {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Main header */}
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          
          <Link to="/" className="group">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center bg-red-700 text-lg font-black text-white">
                N
              </div>

              <div>
                <h1 className="text-xl font-black tracking-tight text-stone-950">
                  NEWSROOM
                </h1>

                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-stone-400">
                  Daily Journal
                </p>
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${
                    isActive
                      ? "text-red-700"
                      : "text-stone-600 hover:text-stone-950"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <Link
              to="/login"
              className="border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-900 transition hover:border-stone-900"
            >
              Sign in
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center border border-stone-300 text-stone-700 lg:hidden"
            aria-label="Open menu"
          >
            <span className="text-xl">☰</span>
          </button>
        </div>

        {/* Category strip */}
        <div className="hidden border-t border-stone-100 lg:block">
          <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-500">
            <span className="text-red-700">Trending</span>
            <span>Bangladesh</span>
            <span>World</span>
            <span>Business</span>
            <span>Entertainment</span>
            <span>Health</span>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;