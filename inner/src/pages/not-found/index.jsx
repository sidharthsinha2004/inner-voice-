import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-10 sm:p-16 shadow-sm text-center">
      <p className="text-6xl font-black text-(--accent) dark:text-(--accent-text-dark)">
        404
      </p>

      <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-50 mt-4">
        This voice couldn't be found
      </h1>

      <p className="text-stone-500 dark:text-stone-400 mt-2">
        The page you're looking for doesn't exist or may have moved.
      </p>

      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 bg-(--accent) text-white px-6 py-3 rounded-full font-semibold hover:bg-(--accent-hover) transition"
      >
        <Compass size={18} />
        Back to Home
      </Link>
    </div>
  );
}
