import React from "react";
import { initialsFromName } from "../utils/formatter";
import { cn } from "../utils/helpers";

/**
 * ui/UserBadge.jsx
 * Avatar circle + name (+ optional handle/subtitle) used across cards,
 * comments, and the community list.
 */

const AVATAR_COLOR_MAP = {
  indigo: "bg-indigo-500",
  teal: "bg-teal-500",
  rose: "bg-rose-500",
  amber: "bg-amber-500",
  sky: "bg-sky-500",
  violet: "bg-violet-500",
  emerald: "bg-emerald-500",
  slate: "bg-slate-500",
};

const SIZE_MAP = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-lg",
};

export default function UserBadge({
  name,
  subtitle,
  avatarColor = "indigo",
  size = "md",
  showName = true,
}) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <div
        className={cn(
          "flex items-center justify-center rounded-full font-semibold text-white shrink-0",
          AVATAR_COLOR_MAP[avatarColor] || AVATAR_COLOR_MAP.indigo,
          SIZE_MAP[size]
        )}
      >
        {initialsFromName(name)}
      </div>
      {showName && (
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-800 truncate">{name}</p>
          {subtitle && <p className="text-xs text-slate-500 truncate">{subtitle}</p>}
        </div>
      )}
    </div>
  );
}