import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
  TrendingUp,
  Users,
  BrainCircuit,
  ArrowRight,
  Check,
} from "lucide-react";

import { useAppData } from "../context/AppDataContext";

export default function RightSidebar() {
  const navigate = useNavigate();
  const { posts, communities, toggleJoinCommunity } = useAppData();

  const trendingTopics = useMemo(() => {
    const counts = {};
    posts.forEach((p) => {
      (p.tags || []).forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([tag]) => tag);
  }, [posts]);

  const topCommunities = communities.slice(0, 3);

  return (
    <aside className="sticky top-24 space-y-6">
      {/* Trending */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-[var(--accent)] dark:text-[var(--accent-text-dark)]" size={22} />
          <h2 className="font-bold text-lg text-stone-900 dark:text-stone-50">
            Trending
          </h2>
        </div>

        <div className="space-y-3">
          {trendingTopics.map((topic) => (
            <button
              key={topic}
              onClick={() => navigate(`/search?q=${encodeURIComponent(topic)}`)}
              className="w-full text-left px-4 py-3 rounded-xl hover:bg-[var(--accent-soft)] dark:hover:bg-stone-800 transition"
            >
              <p className="font-semibold text-[var(--accent)] dark:text-[var(--accent-text-dark)]">
                #{topic}
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Join the conversation
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Communities */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="text-[var(--accent)] dark:text-[var(--accent-text-dark)]" size={22} />
            <h2 className="font-bold text-lg text-stone-900 dark:text-stone-50">
              Communities
            </h2>
          </div>
          <button
            onClick={() => navigate("/communities")}
            className="text-xs font-semibold text-[var(--accent)] dark:text-[var(--accent-text-dark)] hover:underline"
          >
            See all
          </button>
        </div>

        <div className="space-y-4">
          {topCommunities.map((community) => (
            <div key={community.id} className="flex justify-between items-center gap-3">
              <button
                onClick={() => navigate("/communities")}
                className="text-left min-w-0"
              >
                <p className="font-semibold text-stone-800 dark:text-stone-100 truncate">
                  {community.name}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {community.members.toLocaleString()} Members
                </p>
              </button>

              <button
                onClick={() => toggleJoinCommunity(community.id)}
                className={`shrink-0 flex items-center gap-1 px-4 py-2 rounded-full text-sm transition ${
                  community.joined
                    ? "bg-[var(--accent-soft)] dark:bg-stone-800 text-[var(--accent)] dark:text-[var(--accent-text-dark)]"
                    : "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
                }`}
              >
                {community.joined && <Check size={14} />}
                {community.joined ? "Joined" : "Join"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insight */}
      <div className="rounded-3xl bg-gradient-to-br from-[var(--accent)] to-[#3B8069] text-white p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <BrainCircuit size={24} />
          <h2 className="font-bold text-lg">AI Insight</h2>
        </div>

        <p className="text-sm leading-6 text-stone-100">
          Today's conversations are focused on mental wellness and career
          growth. Explore these discussions to connect with like-minded
          people.
        </p>

        <button
          onClick={() => navigate("/explore")}
          className="mt-5 flex items-center gap-2 bg-white text-[var(--accent)] px-4 py-2 rounded-full font-semibold hover:scale-105 transition"
        >
          Explore
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Daily Inspiration */}
      <div className="bg-[#FFF9F1] dark:bg-stone-900 border border-[#F3D9A4] dark:border-stone-800 rounded-3xl p-5">
        <h3 className="font-bold text-[#B87D22] dark:text-amber-400 mb-3">
          🌿 Daily Inspiration
        </h3>
        <p className="text-sm text-stone-700 dark:text-stone-300 leading-6">
          "Your voice has value. Share your thoughts today—someone out there
          may need to hear them."
        </p>
      </div>
    </aside>
  );
}
