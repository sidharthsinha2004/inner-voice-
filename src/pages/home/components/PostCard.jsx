import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Repeat2,
  MoreHorizontal,
  Globe,
  Send,
  Flag,
  Link2,
  EyeOff,
  Music,
  Check,
} from "lucide-react";

import { useAppData } from "../../../context/AppDataContext";

function Poll({ post, onVote }) {
  const poll = post.poll;
  if (!poll) return null;

  const hasVoted = poll.votedOptionId !== null;

  return (
    <div className="px-5 mt-5">
      <p className="font-semibold text-stone-800 dark:text-stone-100 mb-3">
        {poll.question}
      </p>

      <div className="space-y-2">
        {poll.options.map((opt) => {
          const pct =
            poll.totalVotes > 0
              ? Math.round((opt.votes / poll.totalVotes) * 100)
              : 0;
          const isPicked = poll.votedOptionId === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onVote(post.id, opt.id)}
              className={`relative w-full text-left rounded-xl border overflow-hidden transition ${
                isPicked
                  ? "border-[var(--accent)]"
                  : "border-stone-200 dark:border-stone-700 hover:border-[var(--accent)]"
              }`}
            >
              {hasVoted && (
                <div
                  className="absolute inset-y-0 left-0 bg-[var(--accent-soft)] dark:bg-stone-800 transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              )}

              <div className="relative flex items-center justify-between gap-3 px-4 py-2.5">
                <span className="flex items-center gap-2 text-sm font-medium text-stone-700 dark:text-stone-200">
                  {isPicked && (
                    <Check size={14} className="text-[var(--accent)] shrink-0" />
                  )}
                  {opt.text}
                </span>

                {hasVoted && (
                  <span className="text-sm font-semibold text-stone-600 dark:text-stone-300 shrink-0">
                    {pct}%
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-xs text-stone-400 dark:text-stone-500 mt-2">
        {poll.totalVotes} {poll.totalVotes === 1 ? "vote" : "votes"}
        {hasVoted && " · Tap another option to change your vote"}
      </p>
    </div>
  );
}

function PostMedia({ media, image }) {
  const hasMedia = media && media.length > 0;

  if (hasMedia) {
    const images = media.filter((m) => m.type === "image");
    const videos = media.filter((m) => m.type === "video");
    const audios = media.filter((m) => m.type === "audio");

    return (
      <div className="px-5 mt-5 space-y-3">
        {images.length > 0 && (
          <div
            className={`grid gap-2 ${
              images.length === 1 ? "grid-cols-1" : "grid-cols-2"
            }`}
          >
            {images.map((m) => (
              <img
                key={m.id}
                src={m.url}
                alt={m.name || "Post image"}
                className="w-full h-64 object-cover rounded-2xl"
                loading="lazy"
              />
            ))}
          </div>
        )}

        {videos.map((m) => (
          <video
            key={m.id}
            src={m.url}
            controls
            className="w-full max-h-[420px] rounded-2xl bg-black"
          />
        ))}

        {audios.map((m) => (
          <div
            key={m.id}
            className="bg-stone-100 dark:bg-stone-800 rounded-2xl p-4 flex items-center gap-3"
          >
            <div className="h-10 w-10 rounded-full bg-[var(--accent-soft)] dark:bg-stone-700 flex items-center justify-center text-[var(--accent)] dark:text-[var(--accent-text-dark)] shrink-0">
              <Music size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-stone-600 dark:text-stone-300 truncate mb-1">
                {m.name || "Audio"}
              </p>
              <audio src={m.url} controls className="w-full h-9" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (image) {
    return (
      <div className="px-5 mt-5">
        <img
          src={image}
          alt=""
          className="w-full h-[420px] object-cover rounded-2xl"
          loading="lazy"
        />
      </div>
    );
  }

  return null;
}

export default function PostCard({ post }) {
  const {
    toggleLike,
    toggleBookmark,
    toggleRepost,
    addComment,
    showToast,
    votePoll,
  } = useAppData();
  const navigate = useNavigate();

  const [commentText, setCommentText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const commentInputRef = useRef(null);

  const commentsList = post.commentsList || [];

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(post.id, commentText);
    setCommentText("");
  };

  const handleShare = () => {
    const fakeUrl = `${window.location.origin}/post/${post.id}`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(fakeUrl).catch(() => {});
    }
    showToast("Link copied to clipboard");
    setMenuOpen(false);
  };

  const focusComposer = () => {
    commentInputRef.current?.focus();
    commentInputRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <article className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-center justify-between p-5">
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-4 text-left"
        >
          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#3B8069] to-[#5F8CAE] flex items-center justify-center text-white text-lg font-bold shrink-0">
            {post.username.charAt(0)}
          </div>

          <div>
            <h3 className="font-bold text-stone-900 dark:text-stone-50">
              {post.username}
            </h3>

            <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400">
              <Globe size={14} />
              <span>{post.time}</span>
              <span className="text-stone-300 dark:text-stone-600">·</span>
              <span className="text-[var(--accent)] dark:text-[var(--accent-text-dark)]">
                {post.category}
              </span>
            </div>
          </div>
        </button>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition text-stone-600 dark:text-stone-300"
          >
            <MoreHorizontal size={20} />
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-xl z-20 overflow-hidden animate-fade-in">
                <button
                  onClick={handleShare}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 transition"
                >
                  <Link2 size={16} />
                  Copy link
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    showToast("You'll see fewer posts like this");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 transition"
                >
                  <EyeOff size={16} />
                  Not interested
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    showToast("Thanks — we'll review this post");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
                >
                  <Flag size={16} />
                  Report
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="px-5">
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-50">
          {post.title}
        </h2>

        <p className="mt-3 text-stone-600 dark:text-stone-300 leading-7">
          {post.description}
        </p>

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => navigate(`/search?q=${encodeURIComponent(tag)}`)}
                className="text-xs font-medium text-[#5F8CAE] dark:text-sky-400 hover:underline"
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Poll or media — a post carries one or the other */}
      {post.poll ? (
        <Poll post={post} onVote={votePoll} />
      ) : (
        <PostMedia media={post.media} image={post.image} />
      )}

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-5 mt-3 border-t border-stone-100 dark:border-stone-800">
        <button
          onClick={() => toggleLike(post.id)}
          className={`flex items-center gap-2 transition ${
            post.liked
              ? "text-red-500"
              : "text-stone-600 dark:text-stone-300 hover:text-red-500"
          }`}
        >
          <Heart size={21} fill={post.liked ? "currentColor" : "none"} />
          <span>{post.likes}</span>
        </button>

        <button
          onClick={focusComposer}
          className="flex items-center gap-2 text-stone-600 dark:text-stone-300 hover:text-[var(--accent)] dark:hover:text-[var(--accent-text-dark)] transition"
        >
          <MessageCircle size={21} />
          <span>{post.comments}</span>
        </button>

        <button
          onClick={() => toggleRepost(post.id)}
          className={`flex items-center gap-2 transition ${
            post.reposted
              ? "text-[#5F8CAE]"
              : "text-stone-600 dark:text-stone-300 hover:text-[#5F8CAE]"
          }`}
        >
          <Repeat2 size={21} />
          <span>{post.reposts}</span>
        </button>

        <button
          onClick={handleShare}
          className="text-stone-600 dark:text-stone-300 hover:text-[#B87D22] transition"
        >
          <Share2 size={21} />
        </button>

        <button
          onClick={() => toggleBookmark(post.id)}
          className={`transition ${
            post.bookmarked
              ? "text-[#B87D22]"
              : "text-stone-600 dark:text-stone-300 hover:text-[#B87D22]"
          }`}
        >
          <Bookmark size={21} fill={post.bookmarked ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Comments — always shown, no toggle needed */}
      <div className="px-5 pb-5 border-t border-stone-100 dark:border-stone-800 pt-4 space-y-4">
        {commentsList.length > 0 ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 dark:text-stone-500">
              {commentsList.length}{" "}
              {commentsList.length === 1 ? "Comment" : "Comments"}
            </p>

            {commentsList.map((c) => (
              <div key={c.id} className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#3B8069] to-[#5F8CAE] flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {c.user.charAt(0)}
                </div>
                <div className="flex-1 bg-stone-100 dark:bg-stone-800 rounded-2xl px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-stone-800 dark:text-stone-100">
                      {c.user}
                    </p>
                    <p className="text-xs text-stone-400">{c.time}</p>
                  </div>
                  <p className="text-sm text-stone-600 dark:text-stone-300 mt-0.5">
                    {c.text}
                  </p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className="text-sm text-stone-400 text-center py-2">
            No comments yet — be the first to respond.
          </p>
        )}

        <form onSubmit={handleAddComment} className="flex items-center gap-2">
          <input
            ref={commentInputRef}
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 bg-stone-100 dark:bg-stone-800 rounded-full px-4 py-2.5 text-sm outline-none text-stone-800 dark:text-stone-100 placeholder:text-stone-400"
          />
          <button
            type="submit"
            disabled={!commentText.trim()}
            className="p-2.5 rounded-full bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] disabled:opacity-40 transition"
            aria-label="Post comment"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </article>
  );
}
