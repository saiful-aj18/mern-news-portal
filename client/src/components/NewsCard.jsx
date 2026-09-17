import { Link } from "react-router-dom";

function NewsCard({ news }) {
  return (
    <article className="group overflow-hidden border border-stone-200 bg-white">
      {/* Image */}
      <Link to={`/news/${news._id}`} className="block overflow-hidden">
        <img
          src={news.image}
          alt={news.title}
          className="aspect-[16/10] w-full object-cover transition duration-300 group-hover:scale-[1.02]"
        />
      </Link>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
          <span className="text-red-600">
            {news.category}
          </span>

          <span className="text-stone-300">•</span>

          <span className="text-stone-500">
            {new Date(news.createdAt).toLocaleDateString()}
          </span>
        </div>

        <Link to={`/news/${news._id}`}>
          <h3 className="text-lg font-bold leading-snug text-stone-900 transition group-hover:text-red-600 sm:text-xl">
            {news.title}
          </h3>
        </Link>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-stone-600">
          {news.description}
        </p>

        {news.author?.name && (
          <p className="mt-4 text-xs font-medium text-stone-500">
            By {news.author.name}
          </p>
        )}
      </div>
    </article>
  );
}

export default NewsCard;