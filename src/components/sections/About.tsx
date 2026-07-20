"use client";

import { ArrowUpRight, CircleDot, MapPin } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Counter from "@/components/ui/Counter";
import { profile, stats } from "@/lib/data";

export default function About() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      className="relative mx-auto max-w-7xl scroll-mt-20 overflow-hidden px-6 py-28 md:px-10 md:py-36"
    >
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
          About
        </span>
        <h2
          data-reveal
          className="relative mt-6 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl md:text-6xl"
        >
          Full-stack, <em className="serif-italic">end to end</em>
        </h2>
        <p
          data-reveal
          className="relative mx-auto mt-5 max-w-md text-base leading-relaxed text-muted"
        >
          A closer look at how I work, what I&apos;ve built, and the numbers
          behind it.
        </p>
      </div>

      <div className="mt-20 grid gap-16 lg:grid-cols-12 lg:gap-8">
        {/* left — narrative */}
        <div data-reveal data-parallax="-6" className="lg:col-span-7">
          <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            {profile.role}
            <span className="h-1 w-1 rounded-full bg-fg/25" />
            <span className="flex items-center gap-1.5">
              <MapPin size={12} className="text-accent" />
              {profile.location}
            </span>
          </p>
          <p className="mt-7 font-display text-2xl leading-[1.5] tracking-tight text-fg/85 sm:text-[1.75rem]">
            {profile.intro}
          </p>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-fg transition-colors hover:border-accent/50 hover:text-accent"
          >
            Read résumé
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* right — the numbers, plain and typographic */}
        <div data-reveal className="lg:col-span-5">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 border-t border-line pt-8">
            {stats.map((s) => (
              <div key={s.label} className="border-l border-line pl-5">
                <Counter
                  value={s.value}
                  suffix={s.suffix}
                  className="font-display text-4xl font-semibold tracking-tight text-fg md:text-5xl"
                />
                <p className="mt-2.5 font-mono text-[11px] uppercase leading-snug tracking-[0.15em] text-muted">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
