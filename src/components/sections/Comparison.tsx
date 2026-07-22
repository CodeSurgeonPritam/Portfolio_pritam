"use client";

import { Asterisk, CircleDot, ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SpotlightButton from "@/components/ui/SpotlightButton";

// 10 items — fills the left card as two columns (5 rows each), column-first.
const mine = [
  "Production-ready code",
  "Clean, typed, documented",
  "End-to-end ownership",
  "Reusable component systems",
  "Transparent, regular updates",
  "Fast iteration",
  "Scales to real usage",
  "Auth & security done right",
  "Shipped to 1,000+ users",
  "Ongoing support after launch",
];

// 5 items — single column, matches the left card's height.
const alt = [
  "Generic, one-size templates",
  "Copy-paste, brittle code",
  "Front-end only, no backend",
  "Breaks as you grow",
  "Hands off after delivery",
];

function Item({ label, dim = false }: { label: string; dim?: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-t-2xl border-t-2 border-white/[0.14] bg-transparent px-4 py-3.5">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-10 [background:radial-gradient(70%_100%_at_50%_0%,rgba(255,255,255,0.07),transparent)]"
      />
      <div className="relative flex items-center gap-3">
        <Asterisk size={17} className={dim ? "text-muted/70" : "text-fg"} />
        <span className={`text-sm ${dim ? "text-muted" : "text-fg/90"}`}>
          {label}
        </span>
      </div>
    </div>
  );
}

/** Soft top-band glow across the card (Fade card detail). */
function CardGlow() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-28 overflow-hidden [background:linear-gradient(to_bottom,rgba(255,255,255,0.055),transparent)]"
    />
  );
}

export default function Comparison() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      id="comparison"
      ref={ref}
      className="relative scroll-mt-20 overflow-hidden py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* centered header */}
        <div className="text-center">
          <span
            data-reveal
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-muted"
          >
           <CircleDot size={13} className="text-accent" />
          <span className="shimmer-text">Comparison</span>
          </span>
          <h2
            data-reveal
            className="mt-6 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl md:text-6xl"
          >
            Why <em className="serif-italic">work with me</em>
          </h2>
          <p
            data-reveal
            className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted"
          >
            How building with me compares to templates and quick fixes — on
            clarity, speed and quality.
          </p>
        </div>

        {/* two cards — left wider (2 cols), right narrower (1 col), equal height */}
        <div className="mt-16 grid gap-5 md:grid-cols-[1.35fr_1fr]">
          {/* left */}
          <div
            data-reveal
            className="relative overflow-hidden rounded-t-3xl border-t-2 border-white/[0.14] bg-transparent p-6 md:p-8"
          >
            <CardGlow />
            <h3 className="relative text-center font-display text-2xl font-semibold tracking-tight text-fg md:text-3xl">
              Working with me
            </h3>
            {/* underline — plain solid line, radial glow above it only */}
            <div className="relative mt-5 h-6 overflow-hidden">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-full [background:radial-gradient(50%_100%_at_50%_100%,rgba(255,255,255,0.6),transparent_75%)]"
              />
              <div className="absolute inset-x-0 bottom-0 h-px bg-white" />
            </div>
            <div className="relative mt-5 grid gap-3 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-5">
              {mine.map((m) => (
                <Item key={m} label={m} />
              ))}
            </div>
          </div>

          {/* right */}
          <div
            data-reveal
            className="relative overflow-hidden rounded-t-3xl border-t-2 border-white/[0.14] bg-transparent p-6 md:p-8"
          >
            <CardGlow />
            <h3 className="relative text-center font-display text-2xl font-semibold tracking-tight text-muted md:text-3xl">
              Templates &amp; quick fixes
            </h3>
            <div className="relative mt-5 h-px w-full bg-line" />
            <div className="relative mt-5 grid gap-3">
              {alt.map((a) => (
                <Item key={a} label={a} dim />
              ))}
            </div>
          </div>
        </div>

        {/* bottom CTA */}
        <div data-reveal className="relative mt-14 pt-10">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-white/20 via-white/[0.06] to-transparent"
          />
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="max-w-md text-center font-display text-2xl font-semibold tracking-tight text-fg sm:text-left">
              Shipping production apps with speed and care.
            </p>
            <SpotlightButton
              href="#contact"
              className="shrink-0 rounded-full bg-[#0e0e0e] px-6 py-3.5 font-mono text-xs uppercase tracking-[0.12em] text-fg shadow-[0_0_30px_-8px_rgba(255,255,255,0.35)] ring-1 ring-white/10 transition duration-300 hover:ring-white/25"
            >
              <ArrowUpRight size={15} />
              Contact me
            </SpotlightButton>
          </div>
        </div>
      </div>
    </section>
  );
}
