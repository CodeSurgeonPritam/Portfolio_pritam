"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Code2, Rocket } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightButton from "@/components/ui/SpotlightButton";

const steps = [
  {
    Icon: Search,
    label: "Step 1",
    title: "Discover the problem",
    body: "I dig into the users, the goals and the constraints — then scope the smallest thing that ships real value.",
  },
  {
    Icon: Code2,
    label: "Step 2",
    title: "Build it end-to-end",
    body: "Clean, typed, reusable code across UI, APIs, auth and data — with tight feedback loops the whole way through.",
  },
  {
    Icon: Rocket,
    label: "Step 3",
    title: "Ship & iterate",
    body: "Deploy to production, measure how real people use it, and iterate fast on what actually moves the needle.",
  },
];

// Transform per position in the stack (0 = front). Back cards fan down-left,
// scale down and blur out.
const LAYERS = [
  { x: 130, y: 0, scale: 1, blur: 0, opacity: 1, z: 30 },
  { x: -80, y: 48, scale: 0.95, blur: 1.5, opacity: 0.72, z: 20 },
  { x: -280, y: 96, scale: 0.9, blur: 3, opacity: 0.5, z: 10 },
];

export default function Approach() {
  const [active, setActive] = useState(0);
  const paused = useRef(false);
  const n = steps.length;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      if (!paused.current) setActive((a) => (a + 1) % n);
    }, 3600);
    return () => window.clearInterval(id);
  }, [n]);

  return (
    <section
      id="approach"
      className="relative mx-auto max-w-7xl scroll-mt-20 px-6 py-28 md:px-10 md:py-36"
    >
      {/* header row — heading left, CTA right */}
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xl">
          <SectionHeading overline="Process" lead="How I" accent="work" />
          <p className="mt-5 text-base leading-relaxed text-muted">
            Thoughtful, end-to-end engineering is what turns an idea into a
            product people actually rely on.
          </p>
        </div>
        <SpotlightButton
          href="#contact"
          className="hidden shrink-0 rounded-full bg-[#0e0e0e] px-6 py-3.5 font-mono text-xs uppercase tracking-[0.12em] text-fg ring-1 ring-white/10 transition duration-300 hover:ring-white/25 md:inline-flex"
        >
          Start a project
        </SpotlightButton>
      </div>

      {/* stacked, auto-cycling deck */}
      <div
        className="relative mt-16 h-[500px] sm:h-[520px]"
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
      >
        {steps.map(({ Icon, label, title, body }, i) => {
          const order = (i - active + n) % n;
          const L = LAYERS[order];
          const isFront = order === 0;
          return (
            <button
              key={title}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${title}`}
              className="absolute left-1/2 top-0 flex h-[380px] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-line bg-[#101012] text-left shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)] transition-[transform,opacity,filter] duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)] [will-change:transform,opacity,filter] [backface-visibility:hidden] sm:h-[400px]"
              style={{
                transform: `translate(calc(-50% + ${L.x}px), ${L.y}px) scale(${L.scale})`,
                filter: L.blur ? `blur(${L.blur}px)` : "none",
                opacity: L.opacity,
                zIndex: L.z,
                pointerEvents: isFront ? "none" : "auto",
                cursor: isFront ? "default" : "pointer",
              }}
            >
              {/* window chrome bar with pagination dots */}
              <div className="flex items-center justify-end border-b border-line px-6 py-4">
                <div className="flex items-center gap-1.5">
                  {steps.map((_, di) => (
                    <span
                      key={di}
                      className={`h-1.5 w-1.5 rounded-full transition-colors ${
                        di === active ? "bg-fg" : "bg-muted/40"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* body */}
              <div className="flex flex-1 flex-col p-8 md:p-10">
                <Icon size={26} className="text-fg" strokeWidth={1.75} />
                <h3 className="mt-7 font-display text-2xl font-semibold tracking-tight text-fg md:text-3xl">
                  {title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted md:text-base">
                  {body}
                </p>
                <span className="mt-auto inline-flex w-fit rounded-full border border-line px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                  {label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
