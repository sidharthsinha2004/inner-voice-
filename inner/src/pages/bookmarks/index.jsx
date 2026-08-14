import { Bookmark, Sparkles, ArrowRight, Library, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAppData } from "../../context/AppDataContext";
import PostCard from "../home/components/PostCard";
import "./bookmark.css";
export default function Bookmarks() {
  const { posts } = useAppData();
  const navigate = useNavigate();

  const bookmarked = posts.filter((post) => post.bookmarked);

  return (
    <div className="bookmarks-page">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <section className="bookmarks-header">

        <div className="bookmarks-heading">

          <div className="bookmarks-icon">
            <Bookmark size={25} strokeWidth={2.2} />
          </div>

          <div>
            <div className="bookmarks-eyebrow">
              <Sparkles size={14} />
              YOUR COLLECTION
            </div>

            <h1>
              Bookmarks
            </h1>

            <p>
              Keep the conversations and ideas that matter to you.
            </p>
          </div>

        </div>

        {/* Count */}
        <div className="bookmarks-count-card">
          <span className="bookmarks-count">
            {bookmarked.length}
          </span>

          <span className="bookmarks-count-label">
            {bookmarked.length === 1 ? "Saved post" : "Saved posts"}
          </span>
        </div>

      </section>


      {/* =====================================================
          TOOLBAR
      ===================================================== */}
      {bookmarked.length > 0 && (
        <div className="bookmarks-toolbar">

          <div className="bookmarks-result">
            <Library size={17} />
            <span>
              Your saved conversations
            </span>
          </div>

          <button
            className="bookmarks-browse-button"
            onClick={() => navigate("/")}
          >
            <Search size={16} />
            Browse feed
          </button>

        </div>
      )}


      {/* =====================================================
          BOOKMARKS
      ===================================================== */}
      {bookmarked.length > 0 ? (

        <div className="bookmarks-list">

          {bookmarked.map((post) => (
            <article
              className="bookmark-post-wrapper"
              key={post.id}
            >
              <PostCard post={post} />
            </article>
          ))}

        </div>

      ) : (

        /* =====================================================
           EMPTY STATE
        ===================================================== */
        <section className="bookmarks-empty">

          <div className="empty-decoration empty-decoration-one" />
          <div className="empty-decoration empty-decoration-two" />

          <div className="bookmarks-empty-icon">
            <Bookmark
              size={34}
              strokeWidth={1.8}
            />
          </div>

          <div className="bookmarks-empty-content">

            <span className="empty-eyebrow">
              NOTHING SAVED YET
            </span>

            <h2>
              Your collection is waiting.
            </h2>

            <p>
              Save posts, ideas, and conversations that you want
              to come back to later. They will appear here.
            </p>

            <button
              onClick={() => navigate("/")}
              className="bookmarks-primary-button"
            >
              Browse the feed

              <ArrowRight size={17} />
            </button>

          </div>

        </section>

      )}

    </div>
  );
}