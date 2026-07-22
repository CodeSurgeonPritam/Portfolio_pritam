"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";
import { Asterisk, ArrowUpRight, Dot, X } from "lucide-react";
import type { Project } from "@/lib/data";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled])'
          )
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={project.name}
    >
      <div
        aria-hidden
        onClick={onClose}
        className="modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        className="modal-panel glass relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-8 md:p-10"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-32 rounded-t-3xl [background:linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent)]"
        />

        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Close"
          className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-fg"
        >
          <X size={18} />
        </button>

        <div className="relative">
          <span className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-accent">
            <Dot size={16} className="-mx-1.5" />
            {project.status}
          </span>

          <h3 className="mt-5 pr-10 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-fg md:text-4xl">
            {project.name}
          </h3>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-muted">
            {project.meta}
          </p>

          <p className="mt-6 text-base leading-relaxed text-fg/80">
            {project.summary}
          </p>

          <ul className="mt-8 space-y-4">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm leading-relaxed md:text-base">
                <Asterisk size={16} className="mt-0.5 shrink-0 text-white" />
                <span className="text-muted">{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-fg/70"
              >
                {s}
              </span>
            ))}
          </div>

          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-accent-fg transition-transform hover:scale-[1.03]"
            >
              Visit live
              <ArrowUpRight size={15} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
