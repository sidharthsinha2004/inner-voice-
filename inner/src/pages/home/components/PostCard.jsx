import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Repeat2,
  MoreHorizontal,
  Globe2,
  Send,
  Flag,
  Link2,
  EyeOff,
  Music,
  Check,
  Sparkles,
} from "lucide-react";

import { useAppData } from "../../../context/AppDataContext";
import "./postcard.css"

/* =========================================================
   POLL
========================================================= */

function Poll({ post, onVote }) {
  const poll = post.poll;

  if (!poll) return null;

  const hasVoted = poll.votedOptionId !== null;

  return (
    <div className="post-poll">

      <div className="post-poll-header">

        <div className="post-poll-icon">
          <Sparkles size={15} />
        </div>

        <div>
          <span className="post-poll-label">
            Community Poll
          </span>

          <p className="post-poll-question">
            {poll.question}
          </p>
        </div>

      </div>


      <div className="post-poll-options">

        {poll.options.map((opt) => {

          const pct =
            poll.totalVotes > 0
              ? Math.round(
                  (opt.votes / poll.totalVotes) * 100
                )
              : 0;

          const isPicked =
            poll.votedOptionId === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onVote(post.id, opt.id)}
              className={`post-poll-option ${
                isPicked ? "selected" : ""
              }`}
            >

              {hasVoted && (
                <span
                  className="post-poll-progress"
                  style={{
                    width: `${pct}%`,
                  }}
                />
              )}

              <span className="post-poll-option-content">

                <span className="post-poll-option-left">

                  {isPicked && (
                    <span className="post-poll-check">
                      <Check size={12} />
                    </span>
                  )}

                  <span>
                    {opt.text}
                  </span>

                </span>


                {hasVoted && (
                  <strong>
                    {pct}%
                  </strong>
                )}

              </span>

            </button>
          );
        })}

      </div>


      <div className="post-poll-footer">

        <span>
          {poll.totalVotes}{" "}
          {poll.totalVotes === 1
            ? "vote"
            : "votes"}
        </span>

        {hasVoted && (
          <span>
            Tap another option to change
          </span>
        )}

      </div>

    </div>
  );
}


/* =========================================================
   MEDIA
========================================================= */

function PostMedia({ media, image }) {

  const hasMedia =
    media && media.length > 0;

  if (hasMedia) {

    const images =
      media.filter(
        (m) => m.type === "image"
      );

    const videos =
      media.filter(
        (m) => m.type === "video"
      );

    const audios =
      media.filter(
        (m) => m.type === "audio"
      );


    return (
      <div className="post-media">

        {/* IMAGES */}

        {images.length > 0 && (

          <div
            className={`post-image-grid ${
              images.length === 1
                ? "single"
                : images.length === 2
                ? "double"
                : "multiple"
            }`}
          >

            {images.map((m) => (

              <div
                key={m.id}
                className="post-image-wrapper"
              >

                <img
                  src={m.url}
                  alt={
                    m.name ||
                    "Post image"
                  }
                  loading="lazy"
                />

              </div>

            ))}

          </div>

        )}


        {/* VIDEOS */}

        {videos.map((m) => (

          <div
            key={m.id}
            className="post-video-wrapper"
          >

            <video
              src={m.url}
              controls
            />

          </div>

        ))}


        {/* AUDIO */}

        {audios.map((m) => (

          <div
            key={m.id}
            className="post-audio"
          >

            <div className="post-audio-icon">
              <Music size={19} />
            </div>

            <div className="post-audio-content">

              <p>
                {m.name || "Audio"}
              </p>

              <audio
                src={m.url}
                controls
              />

            </div>

          </div>

        ))}

      </div>
    );
  }


  if (image) {

    return (
      <div className="post-media">

        <div className="post-image-wrapper single">

          <img
            src={image}
            alt=""
            loading="lazy"
          />

        </div>

      </div>
    );
  }


  return null;
}


/* =========================================================
   POST CARD
========================================================= */

export default function PostCard({ post }) {

  const {
    toggleLike,
    toggleBookmark,
    toggleRepost,
    addComment,
    showToast,
    votePoll,
  } = useAppData();

  const navigate =
    useNavigate();


  const [commentText, setCommentText] =
    useState("");

  const [menuOpen, setMenuOpen] =
    useState(false);


  const commentInputRef =
    useRef(null);


  const commentsList =
    post.commentsList || [];


  /* =======================================================
     COMMENT
  ======================================================= */

  const handleAddComment = (e) => {

    e.preventDefault();

    if (!commentText.trim()) return;

    addComment(
      post.id,
      commentText
    );

    setCommentText("");
  };


  /* =======================================================
     SHARE
  ======================================================= */

  const handleShare = () => {

    const fakeUrl =
      `${window.location.origin}/post/${post.id}`;

    if (
      navigator.clipboard?.writeText
    ) {
      navigator.clipboard
        .writeText(fakeUrl)
        .catch(() => {});
    }

    showToast(
      "Link copied to clipboard"
    );

    setMenuOpen(false);
  };


  /* =======================================================
     COMMENT FOCUS
  ======================================================= */

  const focusComposer = () => {

    commentInputRef.current?.focus();

    commentInputRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };


  return (

    <article className="professional-post">


      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="professional-post-header">

        <button
          type="button"
          onClick={() =>
            navigate("/profile")
          }
          className="post-profile"
        >

          <div className="post-avatar">
            {post.username
              .charAt(0)
              .toUpperCase()}
          </div>


          <div className="post-profile-info">

            <div className="post-profile-name-row">

              <h3>
                {post.username}
              </h3>

              <span className="post-verified">
                <Check size={10} />
              </span>

            </div>


            <div className="post-meta">

              <span>
                {post.time}
              </span>

              <span className="post-meta-dot">
                •
              </span>

              <span className="post-category">
                {post.category}
              </span>

              <Globe2 size={12} />

            </div>

          </div>

        </button>


        {/* MENU */}

        <div className="post-menu-wrapper">

          <button
            type="button"
            onClick={() =>
              setMenuOpen((v) => !v)
            }
            className="post-menu-button"
            aria-label="Post options"
          >
            <MoreHorizontal size={19} />
          </button>


          {menuOpen && (

            <>

              <div
                className="post-menu-overlay"
                onClick={() =>
                  setMenuOpen(false)
                }
              />


              <div className="professional-post-menu">

                <button
                  onClick={handleShare}
                >
                  <Link2 size={16} />
                  Copy link
                </button>


                <button
                  onClick={() => {

                    setMenuOpen(false);

                    showToast(
                      "You'll see fewer posts like this"
                    );

                  }}
                >
                  <EyeOff size={16} />
                  Not interested
                </button>


                <div className="post-menu-divider" />


                <button
                  className="danger"
                  onClick={() => {

                    setMenuOpen(false);

                    showToast(
                      "Thanks — we'll review this post"
                    );

                  }}
                >
                  <Flag size={16} />
                  Report post
                </button>

              </div>

            </>

          )}

        </div>

      </div>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="professional-post-content">

        <h2>
          {post.title}
        </h2>


        <p>
          {post.description}
        </p>


        {/* TAGS */}

        {post.tags?.length > 0 && (

          <div className="post-tags">

            {post.tags.map((tag) => (

              <button
                key={tag}
                type="button"
                onClick={() =>
                  navigate(
                    `/search?q=${encodeURIComponent(
                      tag
                    )}`
                  )
                }
              >
                #{tag}
              </button>

            ))}

          </div>

        )}

      </div>


      {/* =====================================================
          POLL / MEDIA
      ===================================================== */}

      {post.poll ? (

        <Poll
          post={post}
          onVote={votePoll}
        />

      ) : (

        <PostMedia
          media={post.media}
          image={post.image}
        />

      )}


      {/* =====================================================
          ENGAGEMENT SUMMARY
      ===================================================== */}

      <div className="post-engagement-summary">

        <div className="post-reaction-stack">

          {post.likes > 0 && (
            <span className="reaction-heart">
              <Heart
                size={11}
                fill="currentColor"
              />
            </span>
          )}

          <span>
            {post.likes}{" "}
            {post.likes === 1
              ? "like"
              : "likes"}
          </span>

        </div>


        <div className="post-summary-right">

          <span>
            {post.comments} comments
          </span>

          <span>
            {post.reposts} reposts
          </span>

        </div>

      </div>


      {/* =====================================================
          ACTION BAR
      ===================================================== */}

      <div className="professional-post-actions">


        <button
          type="button"
          onClick={() =>
            toggleLike(post.id)
          }
          className={`post-action ${
            post.liked
              ? "liked"
              : ""
          }`}
        >

          <Heart
            size={19}
            fill={
              post.liked
                ? "currentColor"
                : "none"
            }
          />

          <span>
            Like
          </span>

        </button>


        <button
          type="button"
          onClick={focusComposer}
          className="post-action"
        >

          <MessageCircle size={19} />

          <span>
            Comment
          </span>

        </button>


        <button
          type="button"
          onClick={() =>
            toggleRepost(post.id)
          }
          className={`post-action ${
            post.reposted
              ? "reposted"
              : ""
          }`}
        >

          <Repeat2 size={19} />

          <span>
            Repost
          </span>

        </button>


        <button
          type="button"
          onClick={handleShare}
          className="post-action"
        >

          <Share2 size={19} />

          <span>
            Share
          </span>

        </button>


        <button
          type="button"
          onClick={() =>
            toggleBookmark(post.id)
          }
          className={`post-bookmark ${
            post.bookmarked
              ? "bookmarked"
              : ""
          }`}
          aria-label="Bookmark"
        >

          <Bookmark
            size={19}
            fill={
              post.bookmarked
                ? "currentColor"
                : "none"
            }
          />

        </button>

      </div>


      {/* =====================================================
          COMMENTS
      ===================================================== */}

      <div className="professional-comments">


        {commentsList.length > 0 ? (

          <>

            <div className="comments-heading">

              <span>
                Discussion
              </span>

              <span>
                {commentsList.length}
              </span>

            </div>


            <div className="comments-list">

              {commentsList.map((c) => (

                <div
                  key={c.id}
                  className="professional-comment"
                >

                  <div className="comment-avatar">
                    {c.user
                      .charAt(0)
                      .toUpperCase()}
                  </div>


                  <div className="comment-content">

                    <div className="comment-top">

                      <strong>
                        {c.user}
                      </strong>

                      <span>
                        {c.time}
                      </span>

                    </div>


                    <p>
                      {c.text}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </>

        ) : (

          <div className="empty-comments">

            <MessageCircle size={18} />

            <span>
              No comments yet. Start the conversation.
            </span>

          </div>

        )}


        {/* COMMENT COMPOSER */}

        <form
          onSubmit={handleAddComment}
          className="professional-comment-form"
        >

          <div className="comment-user-avatar">
            Y
          </div>


          <input
            ref={commentInputRef}
            type="text"
            value={commentText}
            onChange={(e) =>
              setCommentText(
                e.target.value
              )
            }
            placeholder="Share your thoughts..."
          />


          <button
            type="submit"
            disabled={!commentText.trim()}
            aria-label="Post comment"
          >
            <Send size={16} />
          </button>

        </form>

      </div>

    </article>
  );
}