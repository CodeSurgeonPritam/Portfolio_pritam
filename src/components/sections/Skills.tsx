"use client";

import { useState } from "react";
import {
  Braces,
  LayoutTemplate,
  Database,
  Cloud,
  Sparkles,
  ShoppingBag,
  CircleDot,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { skillGroups } from "@/lib/data";

const ICONS: Record<string, typeof Braces> = {
  Languages: Braces,
  Frontend: LayoutTemplate,
  "Backend & Auth": Database,
  "Cloud & Tools": Cloud,
  "AI & Dev Tools": Sparkles,
  "E-Commerce": ShoppingBag,
};

const BLURB: Record<string, string> = {
  Languages: "The languages I write, day in and day out.",
  Frontend: "Building fast, accessible, production-grade interfaces.",
  "Backend & Auth": "APIs, data and secure access, done right.",
  "Cloud & Tools": "Where I ship, host and collaborate.",
  "AI & Dev Tools": "Working faster with AI in the loop.",
  "E-Commerce": "Shopify-powered commerce, end to end.",
};

export default function Skills() {
  const ref = useScrollReveal<HTMLElement>();
  const [active, setActive] = useState(0);
  const group = skillGroups[active];
  const Icon = ICONS[group.title] ?? Braces;

  return (
    <section
      id="skills"
      ref={ref}
      className="relative scroll-mt-20 overflow-hidden border-y border-line bg-surface/30 py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* centered header with arc glow, matching the rest of the site */}
        <div className="relative text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[-8rem] h-[30rem] w-[30rem] -translate-x-1/2 rounded-full [background:radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_60%)]"
          />
          <span
            data-reveal
            className="relative inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-muted"
          >
            <CircleDot size={13} className="text-accent" />
            Toolkit
          </span>
          <h2
            data-reveal
            className="relative mt-6 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl md:text-6xl"
          >
            Skills &amp; <em className="serif-italic">stack</em>
          </h2>
          <p
            data-reveal
            className="relative mx-auto mt-5 max-w-md text-base leading-relaxed text-muted"
          >
            The technologies I reach for to design, build and ship production
            web applications end-to-end.
          </p>
        </div>

        {/* index list (left) + active category panel (right) */}
        <div
          data-reveal
          className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
        >
          <div className="border-t border-line">
            {skillGroups.map((g, i) => {
              const isActive = i === active;
              return (
                <button
                  key={g.title}
                  onClick={() => setActive(i)}
                  className="group flex w-full items-center gap-6 border-b border-line py-5 text-left"
                >
                  <span
                    className={`font-display text-xl tabular-nums transition-colors duration-300 ${
                      isActive ? "text-accent" : "text-fg/15"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-display text-2xl font-semibold tracking-tight transition-colors duration-300 sm:text-3xl ${
                      isActive
                        ? "text-fg"
                        : "text-muted group-hover:text-fg/70"
                    }`}
                  >
                    {g.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div key={active} className="pt-1 animate-[slideInLR_0.5s_ease]">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <Icon size={22} />
            </span>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-muted">
              {BLURB[group.title]}
            </p>
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {group.skills.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-line bg-bg/50 px-4 py-2 text-sm text-fg/90"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
