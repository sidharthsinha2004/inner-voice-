import { useMemo, useState } from "react";

import Stories from "./components/Stories";
import FeedFilters from "./components/FeedFilters";
import PostCard from "./components/PostCard";

import { useAppData } from "../../context/AppDataContext";

export default function Home() {
  const { posts } = useAppData();
  const [activeFilter, setActiveFilter] = useState("For You");

  const visiblePosts = useMemo(() => {
    const list = [...posts];

    switch (activeFilter) {
      case "Trending":
        return list.sort(
          (a, b) => b.likes + b.reposts - (a.likes + a.reposts)
        );
      case "Latest":
        return list.sort((a, b) => b.createdAt - a.createdAt);
      case "Following":
        return list.filter((p) => p.isFollowing);
      case "Popular":
        return list.sort((a, b) => b.likes - a.likes);
      case "Nearby":
      case "For You":
      default:
        return list;
    }
  }, [posts, activeFilter]);

  return (
    <div>
      {/* Stories */}
      <Stories />

      {/* Feed Filters */}
      <div className="mt-6">
        <FeedFilters active={activeFilter} onChange={setActiveFilter} />
      </div>

      {/* Posts */}
      <div className="mt-8 space-y-6">
        {visiblePosts.length > 0 ? (
          visiblePosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-10 text-center">
            <p className="text-stone-500 dark:text-stone-400">
              {activeFilter === "Following"
                ? "You're not following anyone with posts yet. Explore to find voices worth following."
                : "No posts to show right now."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
