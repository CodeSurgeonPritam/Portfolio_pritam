"use client";

import { useEffect, useState } from "react";
import type Lenis from "lenis";
import { Menu, X, FileText } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import FontSwitcher from "@/components/ui/FontSwitcher";
import AccentSwitcher from "@/components/ui/AccentSwitcher";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-bg/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
          <a
            href="#top"
            onClick={(e) => go(e, "#top")}
            className="font-display text-xl font-bold uppercase tracking-wide text-fg"
          >
            {profile.firstName}
            <span className="text-accent">.</span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  className="group relative font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-fg"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <AccentSwitcher />
            </div>
            <div className="hidden md:block">
              <FontSwitcher />
            </div>
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg md:hidden"
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
        {navLinks.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={(e) => go(e, l.href)}
            className="font-display text-3xl font-semibold uppercase tracking-tight text-fg"
          >
            {l.label}
          </a>
        ))}
        <div className="mt-2 flex items-center gap-3">
          <FontSwitcher />
          <AccentSwitcher />
        </div>
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
    </>
  );
}
