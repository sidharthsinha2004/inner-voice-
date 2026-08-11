import { createContext, useContext, useEffect, useState } from "react";

import ACCENT_PALETTES from "../data/accentColors";

const ThemeContext = createContext(null);
const DEFAULT_ACCENT = ACCENT_PALETTES[0].id;

function getInitialTheme() {
  if (typeof window === "undefined") return "light";

  const stored = window.localStorage.getItem("innervoice-theme");
  if (stored === "light" || stored === "dark") return stored;

  const prefersDark = window.matchMedia?.(
    "(prefers-color-scheme: dark)"
  ).matches;

  return prefersDark ? "dark" : "light";
}

function getInitialAccent() {
  if (typeof window === "undefined") return DEFAULT_ACCENT;

  const stored = window.localStorage.getItem("innervoice-accent");
  if (stored && ACCENT_PALETTES.some((p) => p.id === stored)) return stored;

  return DEFAULT_ACCENT;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);
  const [accentColor, setAccentColor] = useState(getInitialAccent);

  // Dark / light mode
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    window.localStorage.setItem("innervoice-theme", theme);
  }, [theme]);

  // Accent color — pushes the chosen palette onto CSS custom properties
  // so every `var(--accent...)` utility across the app updates live.
  useEffect(() => {
    const palette =
      ACCENT_PALETTES.find((p) => p.id === accentColor) || ACCENT_PALETTES[0];
    const root = document.documentElement;

    root.style.setProperty("--accent", palette.accent);
    root.style.setProperty("--accent-hover", palette.accentHover);
    root.style.setProperty("--accent-soft", palette.accentSoft);
    root.style.setProperty("--accent-soft-hover", palette.accentSoftHover);
    root.style.setProperty("--accent-text-dark", palette.accentTextDark);

    window.localStorage.setItem("innervoice-accent", accentColor);
  }, [accentColor]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const value = {
    theme,
    isDark: theme === "dark",
    toggleTheme,
    setTheme,
    accentColor,
    setAccentColor,
    accentPalettes: ACCENT_PALETTES,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
