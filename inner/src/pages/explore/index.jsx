import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Compass,
  Video,
  Music,
  BarChart3,
  ArrowUpRight,
  Heart,
  Sparkles,
  Layers3,
} from "lucide-react";

import { useAppData } from "../../context/AppDataContext";
import "./explore.css"

export default function Explore() {
  const { posts } = useAppData();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] =
    useState("All");


  /* =====================================================
     CATEGORIES
  ===================================================== */

  const categories = useMemo(() => {
    const set = new Set(
      posts.map((p) => p.category)
    );

    return [
      "All",
      ...Array.from(set),
    ];
  }, [posts]);


  /* =====================================================
     FILTER
  ===================================================== */

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") {
      return posts;
    }

    return posts.filter(
      (p) =>
        p.category === activeCategory
    );
  }, [posts, activeCategory]);


  const featuredPost =
    filteredPosts[0];

  const remainingPosts =
    filteredPosts.slice(1);


  /* =====================================================
     MEDIA PREVIEW
  ===================================================== */

  const renderPreview = (
    post,
    large = false
  ) => {

    if (post.image) {
      return (
        <img
          src={post.image}
          alt={post.title}
          className={
            large
              ? "explore-feature-image"
              : "explore-card-image"
          }
          loading="lazy"
        />
      );
    }


    if (
      post.media?.some(
        (m) => m.type === "video"
      )
    ) {
      return (
        <div
          className={
            large
              ? "explore-media-placeholder video large"
              : "explore-media-placeholder video"
          }
        >
          <div className="explore-media-icon">
            <Video size={large ? 30 : 22} />
          </div>

          <span>VIDEO</span>
        </div>
      );
    }


    if (
      post.media?.some(
        (m) => m.type === "audio"
      )
    ) {
      return (
        <div
          className={
            large
              ? "explore-media-placeholder audio large"
              : "explore-media-placeholder audio"
          }
        >
          <div className="explore-media-icon">
            <Music size={large ? 30 : 22} />
          </div>

          <span>AUDIO</span>
        </div>
      );
    }


    if (post.poll) {
      return (
        <div
          className={
            large
              ? "explore-media-placeholder poll large"
              : "explore-media-placeholder poll"
          }
        >
          <div className="explore-media-icon">
            <BarChart3
              size={large ? 30 : 22}
            />
          </div>

          <span>COMMUNITY POLL</span>
        </div>
      );
    }


    return (
      <div
        className={
          large
            ? "explore-text-placeholder large"
            : "explore-text-placeholder"
        }
      >
        <Sparkles size={large ? 28 : 20} />

        <span>
          A shared thought
        </span>
      </div>
    );
  };


  return (
    <div className="explore-page">


      {/* =================================================
          HEADER
      ================================================= */}

      <header className="explore-header">

        <div className="explore-heading">

          <div className="explore-icon">
            <Compass size={20} />
          </div>

          <div>

            <span className="explore-eyebrow">
              INNERVOICE · DISCOVER
            </span>

            <h1>
              Explore perspectives
            </h1>

            <p>
              Find voices, ideas and
              stories worth discovering.
            </p>

          </div>

        </div>


        <div className="explore-stats">

          <div>
            <strong>
              {posts.length}
            </strong>

            <span>
              Voices
            </span>
          </div>

          <div className="explore-stat-divider" />

          <div>
            <strong>
              {categories.length - 1}
            </strong>

            <span>
              Topics
            </span>
          </div>

        </div>

      </header>


      {/* =================================================
          DISCOVERY BANNER
      ================================================= */}

      <section className="explore-discovery-banner">

        <div className="discovery-decoration">
          <Sparkles size={22} />
        </div>

        <div>

          <span>
            SOMETHING NEW
          </span>

          <h2>
            Every voice has a story.
          </h2>

          <p>
            Explore different perspectives
            from the InnerVoice community.
          </p>

        </div>

        <div className="discovery-count">

          <Layers3 size={15} />

          <span>
            {filteredPosts.length}{" "}
            {filteredPosts.length === 1
              ? "post"
              : "posts"}
          </span>

        </div>

      </section>


      {/* =================================================
          CATEGORY NAVIGATION
      ================================================= */}

      <div className="explore-category-wrapper">

        <div className="explore-category-label">
          <span>
            EXPLORE BY TOPIC
          </span>
        </div>


        <div className="explore-categories">

          {categories.map((cat) => (

            <button
              key={cat}
              type="button"
              onClick={() =>
                setActiveCategory(cat)
              }
              className={
                activeCategory === cat
                  ? "explore-category active"
                  : "explore-category"
              }
            >
              {cat}
            </button>

          ))}

        </div>

      </div>


      {/* =================================================
          FEATURED
      ================================================= */}

      {featuredPost && (

        <section className="explore-feature-section">

          <div className="explore-section-heading">

            <div>

              <span>
                FEATURED VOICE
              </span>

              <h2>
                Worth a closer look
              </h2>

            </div>

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/search?q=${encodeURIComponent(
                    featuredPost.title
                  )}`
                )
              }
            >
              View post
              <ArrowUpRight size={14} />
            </button>

          </div>


          <button
            type="button"
            onClick={() =>
              navigate(
                `/search?q=${encodeURIComponent(
                  featuredPost.title
                )}`
              )
            }
            className="explore-feature-card"
          >

            <div className="explore-feature-media">

              {renderPreview(
                featuredPost,
                true
              )}

              <div className="explore-feature-overlay">

                <span>
                  {featuredPost.category}
                </span>

              </div>

            </div>


            <div className="explore-feature-content">

              <div className="explore-feature-meta">

                <div className="explore-avatar">
                  {featuredPost.username?.charAt(
                    0
                  )}
                </div>

                <div>

                  <strong>
                    {featuredPost.username}
                  </strong>

                  <span>
                    {featuredPost.time}
                  </span>

                </div>

              </div>


              <h3>
                {featuredPost.title}
              </h3>


              <p>
                {featuredPost.description}
              </p>


              <div className="explore-feature-footer">

                <span>
                  <Heart size={14} />
                  {featuredPost.likes}
                </span>

                <span>
                  {featuredPost.comments} comments
                </span>

                <ArrowUpRight
                  size={18}
                  className="feature-arrow"
                />

              </div>

            </div>

          </button>

        </section>

      )}


      {/* =================================================
          ALL VOICES
      ================================================= */}

      <section className="explore-posts-section">

        <div className="explore-section-heading">

          <div>

            <span>
              COMMUNITY
            </span>

            <h2>
              Latest voices
            </h2>

          </div>

          <span className="explore-result-count">
            {remainingPosts.length} results
          </span>

        </div>


        {remainingPosts.length > 0 ? (

          <div className="explore-post-grid">

            {remainingPosts.map(
              (post) => (

                <button
                  key={post.id}
                  type="button"
                  onClick={() =>
                    navigate(
                      `/search?q=${encodeURIComponent(
                        post.title
                      )}`
                    )
                  }
                  className="explore-post-card"
                >

                  {/* MEDIA */}

                  <div className="explore-card-media">

                    {renderPreview(post)}

                    <span className="explore-card-category">
                      {post.category}
                    </span>

                  </div>


                  {/* CONTENT */}

                  <div className="explore-card-content">

                    <div className="explore-card-user">

                      <div className="explore-small-avatar">
                        {post.username?.charAt(
                          0
                        )}
                      </div>

                      <div>

                        <strong>
                          {post.username}
                        </strong>

                        <span>
                          {post.time}
                        </span>

                      </div>

                    </div>


                    <h3>
                      {post.title}
                    </h3>


                    <p>
                      {post.description}
                    </p>


                    <div className="explore-card-footer">

                      <span>
                        <Heart size={13} />
                        {post.likes}
                      </span>

                      <span>
                        {post.comments} replies
                      </span>

                      <ArrowUpRight
                        size={15}
                      />

                    </div>

                  </div>

                </button>

              )
            )}

          </div>

        ) : (

          <div className="explore-empty">

            <div className="explore-empty-icon">
              <Compass size={25} />
            </div>

            <h3>
              Nothing here yet
            </h3>

            <p>
              There aren't any posts in
              this category yet.
            </p>

            <button
              type="button"
              onClick={() =>
                setActiveCategory("All")
              }
            >
              Explore all voices
            </button>

          </div>

        )}

      </section>

    </div>
  );
}