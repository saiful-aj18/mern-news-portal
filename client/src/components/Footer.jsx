import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-950 text-stone-300">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-12 lg:px-6 lg:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center bg-red-600 text-xl font-black text-white">
                N
              </div>

              <div>
                <h2 className="text-xl font-black tracking-tight text-white">
                  NEWSROOM
                </h2>

                <p className="text-[9px] uppercase tracking-[0.2em] text-stone-500">
                  Daily Journal
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-6 text-stone-400">
              Independent reporting, breaking news and stories that matter.
              Stay informed with our latest coverage.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link className="hover:text-white" to="/">
                Home
              </Link>

              <Link className="hover:text-white" to="/news">
                Latest News
              </Link>

              <Link className="hover:text-white" to="/contact">
                Contact
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Categories
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <span>Politics</span>
              <span>Technology</span>
              <span>Sports</span>
              <span>Business</span>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-stone-800 pt-6 text-center text-xs text-stone-500 sm:flex sm:items-center sm:justify-between sm:text-left">
          <p>© 2026 Newsroom. All rights reserved.</p>

          <p className="mt-2 sm:mt-0">
            Built by Saiful
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;