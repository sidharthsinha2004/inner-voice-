import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Flame } from "lucide-react";

import { useAppData } from "../../context/AppDataContext";
import PostCard from "../home/components/PostCard";

export default function Trending() {
  const { posts } = useAppData();
  const navigate = useNavigate();

  const trendingPosts = useMemo(
    () => [...posts].sort((a, b) => b.likes + b.reposts - (a.likes + a.reposts)),
    [posts]
  );

  const trendingTags = useMemo(() => {
    const counts = {};
    posts.forEach((p) => {
      (p.tags || []).forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [posts]);

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <TrendingUp className="text-[var(--accent)] dark:text-[var(--accent-text-dark)]" size={24} />
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-50">
          Trending
        </h1>
      </div>
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
        The voices getting the most attention right now.
      </p>

      {/* Trending hashtags */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Flame size={18} className="text-[#B87D22]" />
          <h2 className="font-bold text-stone-900 dark:text-stone-50">
            Trending Tags
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {trendingTags.map(([tag, count]) => (
            <button
              key={tag}
              onClick={() => navigate(`/search?q=${encodeURIComponent(tag)}`)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-soft)] dark:bg-stone-800 text-[var(--accent)] dark:text-[var(--accent-text-dark)] text-sm font-semibold hover:bg-[var(--accent-soft-hover)] dark:hover:bg-stone-700 transition"
            >
              #{tag}
              <span className="text-xs font-normal text-stone-500 dark:text-stone-400">
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Ranked posts */}
      <div className="space-y-6">
        {trendingPosts.map((post, index) => (
          <div key={post.id} className="relative">
            <div className="absolute -left-3 -top-3 z-10 h-9 w-9 rounded-full bg-[var(--accent)] text-white text-sm font-bold flex items-center justify-center shadow-md">
              {index + 1}
            </div>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
