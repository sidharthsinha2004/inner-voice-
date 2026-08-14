import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
  TrendingUp,
  Flame,
  Hash,
  ArrowUpRight,
  Heart,
  Repeat2,
  MessageCircle,
  Trophy,
  Sparkles,
} from "lucide-react";

import { useAppData } from "../../context/AppDataContext";
import PostCard from "../home/components/PostCard";
import "./trending.css"


export default function Trending() {
  const { posts } = useAppData();
  const navigate = useNavigate();


  /* =====================================================
     TRENDING POSTS
  ===================================================== */

  const trendingPosts = useMemo(() => {
    return [...posts].sort(
      (a, b) =>
        b.likes +
        b.reposts -
        (a.likes + a.reposts)
    );
  }, [posts]);


  /* =====================================================
     TRENDING TAGS
  ===================================================== */

  const trendingTags = useMemo(() => {
    const counts = {};

    posts.forEach((post) => {
      (post.tags || []).forEach((tag) => {
        counts[tag] =
          (counts[tag] || 0) + 1;
      });
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1]);
  }, [posts]);


  /* =====================================================
     STATS
  ===================================================== */

  const totalLikes = useMemo(
    () =>
      posts.reduce(
        (sum, post) =>
          sum + (post.likes || 0),
        0
      ),
    [posts]
  );


  const totalReposts = useMemo(
    () =>
      posts.reduce(
        (sum, post) =>
          sum + (post.reposts || 0),
        0
      ),
    [posts]
  );


  const topPost = trendingPosts[0];


  return (
    <div className="trending-page">


      {/* =================================================
          HEADER
      ================================================= */}

      <header className="trending-header">

        <div className="trending-heading">

          <div className="trending-main-icon">
            <TrendingUp size={21} />
          </div>

          <div>

            <span className="trending-eyebrow">
              INNERVOICE · COMMUNITY PULSE
            </span>

            <h1>
              What's trending
            </h1>

            <p>
              The voices, ideas and
              conversations getting attention.
            </p>

          </div>

        </div>


        <div className="trending-live">

          <span />

          LIVE

        </div>

      </header>


      {/* =================================================
          STATS
      ================================================= */}

      <section className="trending-stats">

        <div className="trending-stat-card">

          <div className="trending-stat-icon flame">
            <Flame size={17} />
          </div>

          <div>

            <span>
              Trending posts
            </span>

            <strong>
              {posts.length}
            </strong>

          </div>

        </div>


        <div className="trending-stat-card">

          <div className="trending-stat-icon heart">
            <Heart size={17} />
          </div>

          <div>

            <span>
              Community likes
            </span>

            <strong>
              {totalLikes}
            </strong>

          </div>

        </div>


        <div className="trending-stat-card">

          <div className="trending-stat-icon repost">
            <Repeat2 size={17} />
          </div>

          <div>

            <span>
              Reposts
            </span>

            <strong>
              {totalReposts}
            </strong>

          </div>

        </div>

      </section>


      {/* =================================================
          TOP TRENDING POST
      ================================================= */}

      {topPost && (

        <section className="trending-spotlight">

          <div className="trending-spotlight-label">

            <div>

              <Trophy size={14} />

              <span>
                #1 RIGHT NOW
              </span>

            </div>

            <Sparkles size={15} />

          </div>


          <div className="trending-spotlight-content">

            <div className="trending-rank-big">
              01
            </div>


            <div className="trending-spotlight-info">

              <span className="trending-spotlight-category">
                {topPost.category}
              </span>

              <h2>
                {topPost.title}
              </h2>

              <p>
                {topPost.description}
              </p>


              <div className="trending-spotlight-meta">

                <span>
                  {topPost.username}
                </span>

                <span>
                  <Heart size={12} />
                  {topPost.likes}
                </span>

                <span>
                  <Repeat2 size={12} />
                  {topPost.reposts}
                </span>

                <span>
                  <MessageCircle size={12} />
                  {topPost.comments}
                </span>

              </div>

            </div>


            <button
              type="button"
              onClick={() =>
                navigate(
                  `/search?q=${encodeURIComponent(
                    topPost.title
                  )}`
                )
              }
              className="trending-open-button"
            >
              <ArrowUpRight size={17} />
            </button>

          </div>

        </section>
      )}


      {/* =================================================
          TRENDING TOPICS
      ================================================= */}

      <section className="trending-topics-section">

        <div className="trending-section-header">

          <div>

            <span>
              COMMUNITY SIGNALS
            </span>

            <h2>
              Trending topics
            </h2>

          </div>

          <Hash
            size={18}
            className="trending-section-icon"
          />

        </div>


        <div className="trending-topics">

          {trendingTags.length > 0 ? (

            trendingTags.map(
              ([tag, count], index) => (

                <button
                  type="button"
                  key={tag}
                  onClick={() =>
                    navigate(
                      `/search?q=${encodeURIComponent(
                        tag
                      )}`
                    )
                  }
                  className="trending-topic"
                >

                  <span className="topic-rank">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <span className="topic-hash">
                    #
                  </span>

                  <span className="topic-name">
                    {tag}
                  </span>

                  <span className="topic-count">
                    {count}
                  </span>

                  <ArrowUpRight
                    size={13}
                    className="topic-arrow"
                  />

                </button>

              )
            )

          ) : (

            <div className="trending-no-topics">
              No trending topics yet.
            </div>

          )}

        </div>

      </section>


      {/* =================================================
          RANKING
      ================================================= */}

      <section className="trending-ranking-section">

        <div className="trending-section-header">

          <div>

            <span>
              THE LEADERBOARD
            </span>

            <h2>
              Top voices
            </h2>

          </div>

          <span className="trending-sort-label">
            Ranked by engagement
          </span>

        </div>


        <div className="trending-ranking">

          {trendingPosts.map(
            (post, index) => (

              <div
                key={post.id}
                className="trending-rank-row"
              >

                <div
                  className={`trending-position ${
                    index === 0
                      ? "first"
                      : index === 1
                      ? "second"
                      : index === 2
                      ? "third"
                      : ""
                  }`}
                >
                  {index + 1}
                </div>


                <div className="trending-user-avatar">
                  {post.username?.charAt(0)}
                </div>


                <div className="trending-rank-info">

                  <div className="trending-rank-title">

                    <h3>
                      {post.title}
                    </h3>

                    <span>
                      {post.category}
                    </span>

                  </div>

                  <p>
                    by {post.username}
                  </p>

                </div>


                <div className="trending-engagement">

                  <div>
                    <Heart size={13} />
                    <span>
                      {post.likes}
                    </span>
                  </div>

                  <div>
                    <Repeat2 size={13} />
                    <span>
                      {post.reposts}
                    </span>
                  </div>

                </div>


                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/search?q=${encodeURIComponent(
                        post.title
                      )}`
                    )
                  }
                  className="trending-row-arrow"
                >
                  <ArrowUpRight size={15} />
                </button>

              </div>

            )
          )}

        </div>

      </section>


      {/* =================================================
          FULL TRENDING POSTS
      ================================================= */}

      <section className="trending-posts-section">

        <div className="trending-section-header">

          <div>

            <span>
              EXPLORE THE CONVERSATION
            </span>

            <h2>
              Trending posts
            </h2>

          </div>

        </div>


        <div className="trending-posts">

          {trendingPosts.map(
            (post, index) => (

              <div
                key={post.id}
                className="trending-post-wrapper"
              >

                <div className="trending-post-number">

                  <span>
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  {index === 0 && (
                    <Flame size={12} />
                  )}

                </div>

                <PostCard post={post} />

              </div>

            )
          )}

        </div>

      </section>

    </div>
  );
}