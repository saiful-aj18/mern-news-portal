
import { Link } from "react-router-dom";

const NewsCard = ({ news }) => {
  return (
    <article className="group">

      <Link to={`/news/${news._id}`}>
        <div className="overflow-hidden bg-stone-200">
          <img
            src={news.image}
            alt={news.title}
            className="h-60 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
          />
        </div>
      </Link>

      <div className="pt-4">

        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
          <span className="text-red-700">
            {news.category}
          </span>

          <span className="text-stone-300">•</span>

          <span className="text-stone-400">
            {news.author?.name || "Staff"}
          </span>
        </div>

        <Link to={`/news/${news._id}`}>
          <h3 className="mt-2 text-xl font-bold leading-6 tracking-tight text-stone-950 group-hover:text-red-700">
            {news.title}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-600">
          {news.description}
        </p>

        <Link
          to={`/news/${news._id}`}
          className="mt-4 inline-block text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-red-700"
        >
          Read story →
        </Link>

      </div>
    </article>
  );
};

export default NewsCard;