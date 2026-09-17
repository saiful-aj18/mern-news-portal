import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-stone-300 bg-stone-950 text-stone-300">
      <div className="mx-auto max-w-7xl px-5 py-12">

        <div className="grid gap-10 md:grid-cols-3">

          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center bg-red-700 font-black text-white">
                N
              </div>

              <div>
                <h2 className="font-black tracking-tight text-white">
                  NEWSROOM
                </h2>

                <p className="text-[9px] uppercase tracking-[0.2em] text-stone-500">
                  Daily Journal
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-6 text-stone-500">
              News, analysis and stories from Bangladesh and around the
              world.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Explore
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-stone-500">
              <Link to="/news" className="hover:text-white">
                Latest News
              </Link>

              <Link to="/news?category=Politics" className="hover:text-white">
                Politics
              </Link>

              <Link
                to="/news?category=Technology"
                className="hover:text-white"
              >
                Technology
              </Link>

              <Link to="/news?category=Sports" className="hover:text-white">
                Sports
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Information
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-stone-500">
              <Link to="/contact" className="hover:text-white">
                Contact Us
              </Link>

              <Link to="/login" className="hover:text-white">
                Sign In
              </Link>

              <Link to="/register" className="hover:text-white">
                Create Account
              </Link>
            </div>
          </div>

        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-stone-800 pt-6 text-xs text-stone-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Newsroom Daily Journal.</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;