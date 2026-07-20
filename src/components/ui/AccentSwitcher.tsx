"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  ACCENTS,
  DEFAULT_ACCENT as DEFAULT,
  ACCENT_STORAGE_KEY,
} from "@/color/accents";

export default function AccentSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string>(DEFAULT);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const active = document.documentElement.dataset.accent || DEFAULT;
    const valid = ACCENTS.some((a) => a.id === active) ? active : DEFAULT;
    if (valid !== active) {
      document.documentElement.dataset.accent = valid;
      try {
        localStorage.setItem(ACCENT_STORAGE_KEY, valid);
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
    document.documentElement.dataset.accent = id;
    try {
      localStorage.setItem(ACCENT_STORAGE_KEY, id);
    } catch {}
    setCurrent(id);
    setOpen(false);
    // some reveals re-measure on resize — keep parity with the font switcher
    window.dispatchEvent(new Event("resize"));
  };

  const currentColor =
    ACCENTS.find((a) => a.id === current)?.color ?? ACCENTS[0].color;

  return (
    <div ref={wrap} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Change accent colour"
        className="flex items-center gap-2 rounded-full border border-line px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted transition-colors hover:border-accent/50 hover:text-fg"
      >
        <span
          className="h-3 w-3 rounded-full ring-1 ring-white/20"
          style={{ backgroundColor: currentColor }}
        />
        <span className="hidden lg:inline">Color</span>
        <ChevronDown
          size={12}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-line bg-surface/95 p-1.5 shadow-2xl backdrop-blur-xl">
          <p className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Accent colour
          </p>
          {ACCENTS.map((a) => (
            <button
              key={a.id}
              onClick={() => choose(a.id)}
              className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                current === a.id
                  ? "bg-white/[0.06] text-fg"
                  : "text-fg/70 hover:bg-white/[0.04] hover:text-fg"
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className="h-4 w-4 rounded-full ring-1 ring-white/20"
                  style={{ backgroundColor: a.color }}
                />
                <span className="text-sm tracking-tight">{a.label}</span>
              </span>
              {current === a.id && (
                <Check size={15} style={{ color: a.color }} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
