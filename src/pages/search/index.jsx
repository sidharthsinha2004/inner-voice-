import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon, Users, X } from "lucide-react";

import { useAppData } from "../../context/AppDataContext";
import PostCard from "../home/components/PostCard";

const TABS = ["Posts", "Communities"];

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { posts, communities, toggleJoinCommunity } = useAppData();
  const [tab, setTab] = useState("Posts");

  const rawQuery = searchParams.get("q") || "";
  const q = rawQuery.toLowerCase().trim();

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchParams(value ? { q: value } : {}, { replace: true });
  };

  const clear = () => setSearchParams({}, { replace: true });

  const matchedPosts = useMemo(() => {
    if (!q) return [];
    return posts.filter((p) =>
      [p.title, p.description, p.username, p.category, ...(p.tags || [])]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [posts, q]);

  const matchedCommunities = useMemo(() => {
    if (!q) return [];
    return communities.filter((c) =>
      [c.name, c.description, c.category].join(" ").toLowerCase().includes(q)
    );
  }, [communities, q]);

  return (
    <div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center gap-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl px-4 py-3 mb-6 shadow-sm"
      >
        <SearchIcon size={18} className="text-stone-400 shrink-0" />
        <input
          type="text"
          value={rawQuery}
          onChange={handleChange}
          placeholder="Search thoughts, people, communities..."
          className="flex-1 bg-transparent outline-none text-sm text-stone-800 dark:text-stone-100 placeholder:text-stone-400"
          autoFocus
        />
        {rawQuery && (
          <button
            type="button"
            onClick={clear}
            className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </form>

      {!q ? (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-12 text-center">
          <SearchIcon size={40} className="mx-auto text-stone-300 dark:text-stone-700 mb-4" />
          <h2 className="text-lg font-bold text-stone-800 dark:text-stone-100">
            Search InnerVoice
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            Find posts, tags, and communities from the search bar above.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-6">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                  tab === t
                    ? "bg-[var(--accent)] text-white"
                    : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800"
                }`}
              >
                {t} (
                {t === "Posts" ? matchedPosts.length : matchedCommunities.length}
                )
              </button>
            ))}
          </div>

          {tab === "Posts" ? (
            matchedPosts.length > 0 ? (
              <div className="space-y-6">
                {matchedPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <EmptyResult query={rawQuery} />
            )
          ) : matchedCommunities.length > 0 ? (
            <div className="space-y-4">
              {matchedCommunities.map((c) => (
                <div
                  key={c.id}
                  className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="h-12 w-12 rounded-2xl bg-[var(--accent-soft)] dark:bg-stone-800 flex items-center justify-center text-[var(--accent)] dark:text-[var(--accent-text-dark)] shrink-0">
                      <Users size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-stone-900 dark:text-stone-50 truncate">
                        {c.name}
                      </p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        {c.members.toLocaleString()} members
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleJoinCommunity(c.id)}
                    className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition ${
                      c.joined
                        ? "bg-[var(--accent-soft)] dark:bg-stone-800 text-[var(--accent)] dark:text-[var(--accent-text-dark)]"
                        : "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
                    }`}
                  >
                    {c.joined ? "Joined" : "Join"}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <EmptyResult query={rawQuery} />
          )}
        </>
      )}
    </div>
  );
}

function EmptyResult({ query }) {
  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-12 text-center">
      <p className="text-stone-500 dark:text-stone-400">
        No results for <span className="font-semibold">"{query}"</span>
      </p>
    </div>
  );
}
