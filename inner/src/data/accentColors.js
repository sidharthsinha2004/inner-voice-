// Each palette drives the CSS custom properties defined in src/index.css.
// ThemeContext writes these onto <html> at runtime based on the user's pick.
const ACCENT_PALETTES = [
  {
    id: "forest",
    name: "Forest",
    accent: "#275a49",
    accentHover: "#1a3b31",
    accentSoft: "#eef5f1",
    accentSoftHover: "#dcece3",
    accentTextDark: "#34d399",
  },
  {
    id: "ocean",
    name: "Ocean",
    accent: "#1d4ed8",
    accentHover: "#1e3a8a",
    accentSoft: "#eff6ff",
    accentSoftHover: "#dbeafe",
    accentTextDark: "#60a5fa",
  },
  {
    id: "amethyst",
    name: "Amethyst",
    accent: "#6d28d9",
    accentHover: "#5b21b6",
    accentSoft: "#f5f3ff",
    accentSoftHover: "#ede9fe",
    accentTextDark: "#a78bfa",
  },
  {
    id: "rose",
    name: "Rose",
    accent: "#be123c",
    accentHover: "#9f1239",
    accentSoft: "#fff1f2",
    accentSoftHover: "#ffe4e6",
    accentTextDark: "#fb7185",
  },
  {
    id: "sunset",
    name: "Sunset",
    accent: "#b45309",
    accentHover: "#92400e",
    accentSoft: "#fffbeb",
    accentSoftHover: "#fef3c7",
    accentTextDark: "#fbbf24",
  },
  {
    id: "teal",
    name: "Teal",
    accent: "#0f766e",
    accentHover: "#115e59",
    accentSoft: "#f0fdfa",
    accentSoftHover: "#ccfbf1",
    accentTextDark: "#2dd4bf",
  },
];

export default ACCENT_PALETTES;
