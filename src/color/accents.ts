/**
 * Accent colour palette — single source of truth for the runtime AccentSwitcher.
 *
 * Each entry's `id` maps to an `html[data-accent="<id>"]` rule in
 * `src/app/globals.css` (which sets the CSS vars `--accent` / `--accent-2`).
 * Keep the hex values here in sync with those rules.
 *
 * `orange` is the `:root` default in globals.css (no data-accent rule needed).
 */

export type Accent = {
  /** matches html[data-accent="<id>"] in globals.css */
  id: string;
  /** label shown in the switcher dropdown */
  label: string;
  /** swatch hex — mirrors --accent for this id */
  color: string;
  /** secondary tone — mirrors --accent-2 for this id (glows / silk tint) */
  accent2: string;
};

export const ACCENTS: Accent[] = [
  { id: "orange", label: "Orange", color: "#ff5a1f", accent2: "#16b8a3" },
  { id: "lime", label: "Lime", color: "#c5f04f", accent2: "#7bd389" },
  { id: "emerald", label: "Emerald", color: "#34d399", accent2: "#22d3ee" },
  { id: "cyan", label: "Cyan", color: "#22d3ee", accent2: "#6366f1" },
  { id: "violet", label: "Violet", color: "#a78bfa", accent2: "#f472b6" },
  { id: "amber", label: "Amber", color: "#fbbf24", accent2: "#fb923c" },
  { id: "mono", label: "Mono", color: "#e5e5e5", accent2: "#8a8a8a" },
];

/** Default accent for first-time visitors (the :root value in globals.css). */
export const DEFAULT_ACCENT = "orange";

/** Foreground colour used on top of any accent (dark — all accents are bright). */
export const ACCENT_FG = "#0a0a0a";

/** localStorage key the AccentSwitcher persists the chosen id under. */
export const ACCENT_STORAGE_KEY = "accent";
