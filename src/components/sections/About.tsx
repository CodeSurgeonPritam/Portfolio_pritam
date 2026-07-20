"use client";

import Image from "next/image";
import { GraduationCap, ArrowUpRight, CircleDot } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Counter from "@/components/ui/Counter";
import { profile, stats, education } from "@/lib/data";

const proof = ["1,000+ users served", "2 products in production"];

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

      <div className="mt-16 grid gap-14 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
        {/* left — grayscale portrait + proof (Fade editorial) */}
        <div data-reveal data-parallax="-6">
          <div className="glass relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
            {profile.photo ? (
              <Image
                src={profile.photo}
                alt={profile.name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-surface-2 to-bg">
                <span className="name-gradient font-display text-7xl font-bold tracking-tight">
                  {profile.initials}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Drop a photo at public/profile.jpg
                </span>
              </div>
            )}
            <span className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5" />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
            {proof.map((p) => (
              <span key={p} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* right — narrative + education */}
        <div>
          <p data-reveal className="text-lg leading-relaxed text-fg/80">
            {profile.intro}
          </p>

          <a
            data-reveal
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface/40 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-fg transition-colors hover:border-accent/50 hover:text-accent"
          >
            Read résumé
            <ArrowUpRight size={14} />
          </a>

          <div
            data-reveal
            className="glass relative mt-10 flex items-start gap-4 overflow-hidden rounded-2xl p-6"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-16 [background:linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent)]"
            />
            <span className="relative mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <GraduationCap size={20} />
            </span>
            <div className="relative">
              <p className="font-display text-lg font-semibold uppercase tracking-tight text-fg">
                {education.degree}
              </p>
              <p className="mt-1 text-sm text-muted">{education.school}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-accent">
                {education.period} · {education.score}
              </p>
            </div>
          </div>

          {/* animated stat grid */}
          <div
            data-parallax="-8"
            className="relative mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 [background:linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent)]"
            />
            {stats.map((s) => (
              <div
                key={s.label}
                data-reveal
                className="flex flex-col justify-between gap-6 bg-surface p-6 md:p-7"
              >
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                  {s.label}
                </span>
                <Counter
                  value={s.value}
                  suffix={s.suffix}
                  className="font-display text-4xl font-bold leading-none text-fg md:text-5xl"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
