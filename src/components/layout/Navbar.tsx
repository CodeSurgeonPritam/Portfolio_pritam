"use client";

import { useEffect, useRef, useState } from "react";
import type Lenis from "lenis";
import { Menu, X, FileText } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import StyleDock from "@/components/ui/StyleDock";
import WaveText from "@/components/ui/WaveText";
import AppleIcon from "@/app/apple-icon";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  const pillRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight whichever section currently sits in the focus band.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => !!el);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const top = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        setActiveHref(`#${top.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Slide the highlight pill under whichever link is active.
  useEffect(() => {
    const update = () => {
      const el = linkRefs.current[activeHref];
      const container = pillRef.current;
      if (!el || !container) {
        setIndicator((v) => ({ ...v, opacity: 0 }));
        return;
      }
      const cRect = container.getBoundingClientRect();
      const eRect = el.getBoundingClientRect();
      setIndicator({ left: eRect.left - cRect.left, width: eRect.width, opacity: 1 });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [activeHref]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) lenis.scrollTo(target as HTMLElement, { offset: -72 });
    else target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <nav className="relative mx-auto flex h-20 max-w-7xl items-center justify-between pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] md:pl-10 md:pr-10">
          <a
            href="#top"
            onClick={(e) => go(e, "#top")}
            className={`group flex items-center gap-2.5 font-display text-xl font-bold uppercase tracking-wide text-fg transition-all duration-500 ${
              scrolled
                ? "rounded-full border border-line bg-surface/70 py-2 pl-2 pr-4 backdrop-blur-xl"
                : "py-2"
            }`}
          >
            <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-fg text-sm text-bg transition-transform duration-500 ease-[cubic-bezier(0.37,0,0.63,1)] group-hover:-rotate-6 group-hover:scale-105">
              P
              <span className="absolute bottom-[5px] right-[5px] h-[5px] w-[5px] rounded-full bg-accent" />
            </span>
           
            <span>
              {profile.firstName}
              <span className="text-accent">.</span>
            </span>
          </a>

          <div
            ref={pillRef}
            className={`absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-0.5 rounded-full border border-line bg-surface/60 p-1.5 backdrop-blur-xl transition-shadow duration-500 md:flex ${
              scrolled ? "shadow-[0_10px_40px_-16px_rgba(0,0,0,0.65)]" : ""
            }`}
          >
            <span
              aria-hidden
              className="absolute top-1.5 h-[calc(100%-0.75rem)] rounded-full border border-accent/25 bg-accent/10 transition-all duration-[400ms] ease-out"
              style={{
                left: indicator.left,
                width: indicator.width,
                opacity: indicator.opacity,
              }}
            />
            {navLinks.map((l, i) => {
              const isActive = activeHref === l.href;
              return (
                <a
                  key={l.href}
                  ref={(el) => {
                    linkRefs.current[l.href] = el;
                  }}
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  className={`group/wave relative z-10 flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors duration-300 ease-[cubic-bezier(0.37,0,0.63,1)] ${
                    isActive ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 scale-90 rounded-full bg-fg/[0.06] opacity-0 transition-all duration-300 ease-[cubic-bezier(0.37,0,0.63,1)] group-hover/wave:scale-100 group-hover/wave:opacity-100"
                  />
                  <span
                    className={`text-[9px] transition-colors duration-300 ease-[cubic-bezier(0.37,0,0.63,1)] ${
                      isActive ? "text-accent" : "text-muted/50"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <WaveText text={l.label} />
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-accent px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-accent-fg transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              <FileText size={14} />
              Résumé
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface/60 text-fg backdrop-blur-xl md:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-bg/95 backdrop-blur-2xl transition-all duration-500 md:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {navLinks.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={(e) => go(e, l.href)}
            className="flex items-baseline gap-3 font-display text-3xl font-semibold uppercase tracking-tight text-fg"
          >
            <span className="font-mono text-sm font-normal tracking-[0.15em] text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            {l.label}
          </a>
        ))}
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-accent-fg"
        >
          <FileText size={14} />
          Résumé
        </a>
      </div>

      <StyleDock />
    </>
  );
}
