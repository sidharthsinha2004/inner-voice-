import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Compass, Video, Music, BarChart3 } from "lucide-react";

import { useAppData } from "../../context/AppDataContext";

export default function Explore() {
  const { posts } = useAppData();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [posts, activeCategory]);

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Compass className="text-[var(--accent)] dark:text-[var(--accent-text-dark)]" size={24} />
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-50">
          Explore
        </h1>
      </div>
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
        Browse voices by category and discover something new.
      </p>

      {/* Category chips */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeCategory === cat
                ? "bg-[var(--accent)] text-white shadow-md scale-105"
                : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:bg-[var(--accent-soft)] dark:hover:bg-stone-800 hover:text-[var(--accent)] dark:hover:text-[var(--accent-text-dark)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Post grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {filteredPosts.map((post) => (
            <button
              key={post.id}
              onClick={() => navigate(`/search?q=${encodeURIComponent(post.title)}`)}
              className="text-left bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {post.image ? (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-44 object-cover"
                  loading="lazy"
                />
              ) : post.media?.some((m) => m.type === "video") ? (
                <div className="w-full h-44 bg-stone-900 flex items-center justify-center">
                  <Video className="text-white/80" size={32} />
                </div>
              ) : post.media?.some((m) => m.type === "audio") ? (
                <div className="w-full h-44 bg-[var(--accent)] flex items-center justify-center">
                  <Music className="text-white/80" size={32} />
                </div>
              ) : post.poll ? (
                <div className="w-full h-44 bg-[var(--accent-hover)] flex items-center justify-center">
                  <BarChart3 className="text-white/80" size={32} />
                </div>
              ) : null}
              <div className="p-5">
                <span className="text-xs font-semibold text-[var(--accent)] dark:text-[var(--accent-text-dark)]">
                  {post.category}
                </span>
                <h3 className="font-bold text-stone-900 dark:text-stone-50 mt-1 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                  by {post.username} · {post.likes} likes
                </p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-12 text-center">
          <p className="text-stone-500 dark:text-stone-400">
            No posts in this category yet.
          </p>
        </div>
      )}
    </div>
  );
}
