import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

/**
 * variant "switch"  -> pill toggle with sliding knob (used in Settings / menus)
 * variant "icon"    -> single icon button that swaps sun/moon (used in Navbar)
 */
export default function ThemeToggle({ variant = "switch", className = "" }) {
  const { isDark, toggleTheme } = useTheme();

  if (variant === "icon") {
    return (
      <button
        onClick={toggleTheme}
        className={`p-3 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition ${className}`}
        aria-label="Toggle theme"
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 ${
        isDark ? "bg-[var(--accent)]" : "bg-stone-300"
      } ${className}`}
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
    >
      <span
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transform transition-transform duration-300 ${
          isDark ? "translate-x-7" : "translate-x-1"
        }`}
      >
        {isDark ? (
          <Moon size={13} className="text-[var(--accent)]" />
        ) : (
          <Sun size={13} className="text-amber-500" />
        )}
      </span>
    </button>
  );
}
