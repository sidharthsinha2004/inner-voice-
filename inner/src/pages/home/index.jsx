import { useMemo, useState } from "react";
import {
  Sparkles,
  PenLine,
  SlidersHorizontal,
} from "lucide-react";

import Stories from "./components/Stories";
import FeedFilters from "./components/FeedFilters";
import PostCard from "./components/PostCard";

import { useAppData } from "../../context/AppDataContext";

import "./feed.css";

export default function Home() {
  const { posts } = useAppData();
  const [activeFilter, setActiveFilter] = useState("For You");

  const visiblePosts = useMemo(() => {
    const list = [...posts];

    switch (activeFilter) {
      case "Trending":
        return list.sort(
          (a, b) =>
            b.likes +
            b.reposts -
            (a.likes + a.reposts)
        );

      case "Latest":
        return list.sort(
          (a, b) => b.createdAt - a.createdAt
        );

      case "Following":
        return list.filter((p) => p.isFollowing);

      case "Popular":
        return list.sort(
          (a, b) => b.likes - a.likes
        );

      case "Nearby":
      case "For You":
      default:
        return list;
    }
  }, [posts, activeFilter]);

  return (
    <main className="home-feed">

      {/* =================================================
          FEED INTRO
      ================================================= */}

      <section className="feed-intro">

        <div className="feed-intro-left">

          <div className="feed-kicker">
            <Sparkles size={13} />
            INNERVOICE · HOME
          </div>

          <h1>
            Stories that
            <span> matter.</span>
          </h1>

          <p>
            Discover honest thoughts, quiet moments,
            and voices worth listening to.
          </p>

        </div>

        <div className="feed-intro-action">

          <button
            type="button"
            className="feed-create-button"
          >
            <PenLine size={16} />
            Share a thought
          </button>

        </div>

      </section>


      {/* =================================================
          STORIES
      ================================================= */}

      <section className="feed-section">

        <div className="feed-section-heading">

          <div>
            <span>YOUR CIRCLE</span>
            <h2>Stories</h2>
          </div>

          <button
            type="button"
            className="feed-icon-button"
            title="Story options"
          >
            <SlidersHorizontal size={16} />
          </button>

        </div>

        <div className="home-feed-stories">
          <Stories />
        </div>

      </section>


      {/* =================================================
          FEED
      ================================================= */}

      <section className="feed-section feed-main-section">

        <div className="feed-section-heading feed-heading-main">

          <div>
            <span>DISCOVER</span>
            <h2>Feed</h2>
          </div>

          <p>
            {visiblePosts.length}{" "}
            {visiblePosts.length === 1
              ? "post"
              : "posts"}
          </p>

        </div>


        {/* FILTERS */}

        <div className="feed-filters">

          <FeedFilters
            active={activeFilter}
            onChange={setActiveFilter}
          />

        </div>


        {/* POSTS */}

        <div className="feed-posts">

          {visiblePosts.length > 0 ? (

            visiblePosts.map((post) => (
              <article
                className="feed-post-wrapper"
                key={post.id}
              >
                <PostCard post={post} />
              </article>
            ))

          ) : (

            <div className="feed-empty">

              <div className="feed-empty-icon">
                <Sparkles size={22} />
              </div>

              <span className="feed-empty-label">
                NOTHING HERE YET
              </span>

              <h3>
                Your feed is quiet.
              </h3>

              <p>
                {activeFilter === "Following"
                  ? "You're not following anyone with posts yet. Explore to find voices worth following."
                  : "There are no posts to show right now. Check back soon."}
              </p>

            </div>

          )}

        </div>
        <section className="feed-section">

          <div className="feed-section-heading">

            <div>
              <span>YOUR CIRCLE</span>
              <h2>Stories</h2>
            </div>

          </div>

          <div className="home-feed-stories">
            <Stories />
          </div>

        </section>


        <section className="feed-section feed-main-section">

          <div className="feed-section-heading">

            <div>
              <span>DISCOVER</span>
              <h2>Feed</h2>
            </div>

            <p>
              {visiblePosts.length} posts
            </p>

          </div>

          <div className="feed-filters">
            <FeedFilters
              active={activeFilter}
              onChange={setActiveFilter}
            />
          </div>

          <div className="feed-posts">
            {/* posts */}
          </div>

        </section>

      </section>

    </main>
  );
}