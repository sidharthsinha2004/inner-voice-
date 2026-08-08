import React from "react";
import { Heart, MessageCircle, Share2, Flag } from "lucide-react";
import { formatCount } from "../utils/formatter";
import { cn } from "../utils/helpers";

/**
 * ui/SupportButtons.jsx
 * The Like / Comment / Share / Report action row shown under a ThoughtCard.
 * Fully controlled — all state lives in the parent (ThoughtCard), this is
 * purely presentational + click delegation.
 */

export default function SupportButtons({
  liked,
  likeCount,
  commentCount,
  shareCount,
  reported,
  onLike,
  onComment,
  onShare,
  onReport,
}) {
  return (
    <div className="flex items-center justify-between pt-2 text-slate-500">
      <button
        type="button"
        onClick={onLike}
        aria-pressed={liked}
        className={cn(
          "flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm transition-colors hover:bg-rose-50",
          liked ? "text-rose-600" : "text-slate-500"
        )}
      >
        <Heart className="w-4 h-4" fill={liked ? "currentColor" : "none"} />
        <span>{formatCount(likeCount)}</span>
      </button>

      <button
        type="button"
        onClick={onComment}
        className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm transition-colors hover:bg-indigo-50 hover:text-indigo-600"
      >
        <MessageCircle className="w-4 h-4" />
        <span>{formatCount(commentCount)}</span>
      </button>

      <button
        type="button"
        onClick={onShare}
        className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm transition-colors hover:bg-teal-50 hover:text-teal-600"
      >
        <Share2 className="w-4 h-4" />
        <span>{formatCount(shareCount)}</span>
      </button>

      <button
        type="button"
        onClick={onReport}
        disabled={reported}
        aria-pressed={reported}
        className={cn(
          "flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm transition-colors",
          reported
            ? "text-amber-600 cursor-default"
            : "text-slate-500 hover:bg-amber-50 hover:text-amber-600"
        )}
      >
        <Flag className="w-4 h-4" fill={reported ? "currentColor" : "none"} />
        <span>{reported ? "Reported" : "Report"}</span>
      </button>
    </div>
  );
}