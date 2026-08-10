import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAppData } from "../../context/AppDataContext";
import PostCard from "../home/components/PostCard";

export default function Bookmarks() {
  const { posts } = useAppData();
  const navigate = useNavigate();

  const bookmarked = posts.filter((p) => p.bookmarked);

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Bookmark className="text-[var(--accent)] dark:text-[var(--accent-text-dark)]" size={24} />
        <div>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-50">
            Bookmarks
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {bookmarked.length} saved {bookmarked.length === 1 ? "post" : "posts"}
          </p>
        </div>
      </div>

      {bookmarked.length > 0 ? (
        <div className="space-y-6">
          {bookmarked.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-12 text-center">
          <Bookmark size={40} className="mx-auto text-stone-300 dark:text-stone-700 mb-4" />
          <h2 className="text-lg font-bold text-stone-800 dark:text-stone-100">
            No bookmarks yet
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1 mb-6">
            Tap the bookmark icon on any post to save it here for later.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2.5 rounded-full text-sm font-semibold bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition"
          >
            Browse the feed
          </button>
        </div>
      )}
    </div>
  );
}
