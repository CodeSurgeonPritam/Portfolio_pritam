"use client";

import { useEffect, useRef, useState } from "react";
import { Type, Check, ChevronDown } from "lucide-react";

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

const DEFAULT = "sora";

export default function FontSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string>(DEFAULT);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const active = document.documentElement.dataset.font || DEFAULT;
    // ignore any stale/removed font id from a previous version
    const valid = FONTS.some((f) => f.id === active) ? active : DEFAULT;
    if (valid !== active) {
      document.documentElement.dataset.font = valid;
      try {
        localStorage.setItem("display-font", valid);
      } catch {}
    }
    setCurrent(valid);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node))
        setOpen(false);
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [open]);

  const choose = (id: string) => {
    document.documentElement.dataset.font = id;
    try {
      localStorage.setItem("display-font", id);
    } catch {}
    setCurrent(id);
    setOpen(false);
    // fonts change heading line breaks — nudge ScrollTrigger/SplitText to re-measure
    window.dispatchEvent(new Event("resize"));
  };

  const currentLabel = FONTS.find((f) => f.id === current)?.label ?? "Sora";

  return (
    <div ref={wrap} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Change display font"
        className="flex items-center gap-2 rounded-full border border-line px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted transition-colors hover:border-accent/50 hover:text-fg"
      >
        <Type size={13} className="text-accent" />
        <span className="hidden lg:inline">Font</span>
        <ChevronDown
          size={12}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-line bg-surface/95 p-1.5 shadow-2xl backdrop-blur-xl">
          <p className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Display font
          </p>
          {FONTS.map((f) => (
            <button
              key={f.id}
              onClick={() => choose(f.id)}
              className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                current === f.id
                  ? "bg-accent/10 text-fg"
                  : "text-fg/70 hover:bg-white/[0.04] hover:text-fg"
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className="text-xl leading-none"
                  style={{ fontFamily: f.css }}
                >
                  Ag
                </span>
                <span
                  className="text-sm uppercase tracking-tight"
                  style={{ fontFamily: f.css }}
                >
                  {f.label}
                </span>
              </span>
              {current === f.id && <Check size={15} className="text-accent" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
