"use client";

import { useEffect, useRef, useState } from "react";
import { Palette, Type, X } from "lucide-react";
import { ACCENTS, DEFAULT_ACCENT, ACCENT_STORAGE_KEY } from "@/color/accents";

const FONTS = [
  { id: "sora", label: "Sora", css: "var(--font-sora)" },
  { id: "bricolage", label: "Bricolage", css: "var(--font-bricolage)" },
  { id: "space-grotesk", label: "Space Grotesk", css: "var(--font-space-grotesk)" },
  { id: "outfit", label: "Outfit", css: "var(--font-outfit)" },
  { id: "dm-sans", label: "DM Sans", css: "var(--font-dm-sans)" },
  { id: "jura", label: "Jura", css: "var(--font-jura)" },
  { id: "fraunces", label: "Fraunces", css: "var(--font-fraunces)" },
  { id: "instrument", label: "Instrument Serif", css: "var(--font-instrument)" },
] as const;

const FONT_DEFAULT = "jura";
const FONT_STORAGE_KEY = "display-font";

/** Fixed right-edge tab that opens a bottom sheet with the font + accent pickers. */
export default function StyleDock() {
  const [open, setOpen] = useState(false);
  const [font, setFont] = useState<string>(FONT_DEFAULT);
  const [accent, setAccent] = useState<string>(DEFAULT_ACCENT);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeFont = document.documentElement.dataset.font || FONT_DEFAULT;
    const validFont = FONTS.some((f) => f.id === activeFont)
      ? activeFont
      : FONT_DEFAULT;
    if (validFont !== activeFont) {
      document.documentElement.dataset.font = validFont;
      try {
        localStorage.setItem(FONT_STORAGE_KEY, validFont);
      } catch {}
    }
    setFont(validFont);

    const activeAccent = document.documentElement.dataset.accent || DEFAULT_ACCENT;
    const validAccent = ACCENTS.some((a) => a.id === activeAccent)
      ? activeAccent
      : DEFAULT_ACCENT;
    if (validAccent !== activeAccent) {
      document.documentElement.dataset.accent = validAccent;
      try {
        localStorage.setItem(ACCENT_STORAGE_KEY, validAccent);
      } catch {}
    }
    setAccent(validAccent);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node))
        setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), 250);
  };

  const chooseFont = (id: string) => {
    document.documentElement.dataset.font = id;
    try {
      localStorage.setItem(FONT_STORAGE_KEY, id);
    } catch {}
    setFont(id);
    window.dispatchEvent(new Event("resize"));
  };

  const chooseAccent = (id: string) => {
    document.documentElement.dataset.accent = id;
    try {
      localStorage.setItem(ACCENT_STORAGE_KEY, id);
    } catch {}
    setAccent(id);
    window.dispatchEvent(new Event("resize"));
  };

  return (
    <>
      <button
        onMouseEnter={() => {
          clearCloseTimer();
          setOpen(true);
        }}
        onMouseLeave={scheduleClose}
        onClick={() => setOpen((v) => !v)}
        aria-label="Open style settings"
        aria-expanded={open}
        className="fixed right-0 top-1/2 z-[110] flex -translate-y-1/2 flex-col items-center gap-2.5 rounded-l-2xl border border-r-0 border-line bg-surface/80 px-2.5 py-4 text-muted backdrop-blur-xl transition-colors hover:text-fg"
      >
        <Palette size={15} className="text-accent" />
        <span className="h-6 w-px bg-line" />
        <Type size={15} />
      </button>

      <div
        aria-hidden={!open}
        onMouseEnter={clearCloseTimer}
        onMouseLeave={scheduleClose}
        className={`fixed inset-x-0 bottom-0 z-[109] flex justify-center px-4 pb-4 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <div
          ref={panelRef}
          className="glass w-full max-w-2xl rounded-3xl border border-line p-6 shadow-2xl md:p-8"
        >
          <div className="flex items-center justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Style settings
            </p>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close style settings"
              className="text-muted transition-colors hover:text-fg"
            >
              <X size={16} />
            </button>
          </div>

          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                <Type size={12} className="text-accent" />
                Display font
              </p>
              <div className="flex flex-wrap gap-2">
                {FONTS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => chooseFont(f.id)}
                    style={{ fontFamily: f.css }}
                    className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                      font === f.id
                        ? "border-accent/50 bg-accent/10 text-fg"
                        : "border-line text-fg/70 hover:text-fg"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                <Palette size={12} className="text-accent" />
                Accent colour
              </p>
              <div className="flex flex-wrap gap-2">
                {ACCENTS.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => chooseAccent(a.id)}
                    aria-label={a.label}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                      accent === a.id ? "border-fg" : "border-line"
                    }`}
                  >
                    <span
                      className="h-5 w-5 rounded-full ring-1 ring-white/20"
                      style={{ backgroundColor: a.color }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
