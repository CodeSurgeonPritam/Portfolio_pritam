"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";

type Props = {
  items: string[];
  baseSpeed?: number; // px per frame at rest
  direction?: 1 | -1;
  className?: string;
};

/**
 * Marquee that auto-scrolls and reacts to scroll velocity: faster + skewed
 * while the page is moving, easing back to base speed when it stops. Reads the
 * Lenis instance exposed on window by SmoothScroll.
 */
export default function VelocityMarquee({
  items,
  baseSpeed = 0.6,
  direction = -1,
  className = "",
}: Props) {
  const track = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    let x = 0;
    let raf = 0;
    let half = 0;

    const measure = () => {
      half = (inner.current?.scrollWidth ?? 0) / 2;
    };
    measure();
    window.addEventListener("resize", measure);

    const tick = () => {
      const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
      const vel = Math.min(Math.abs(lenis?.velocity ?? 0), 60);
      const speed = (baseSpeed + vel * 0.35) * direction;
      x += speed;
      if (half > 0) {
        if (x <= -half) x += half;
        if (x >= 0) x -= half;
      }
      const skew = gsapClamp((lenis?.velocity ?? 0) * -0.4, -8, 8);
      if (track.current)
        track.current.style.transform = `translateX(${x}px) skewX(${skew}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [baseSpeed, direction]);

  const doubled = [...items, ...items];

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div ref={track} className="w-max will-change-transform">
        <div ref={inner} className="flex w-max items-center">
          {doubled.map((m, i) => (
            <span
              key={i}
              className="flex items-center gap-8 whitespace-nowrap px-4 font-display text-2xl font-semibold uppercase tracking-tight text-fg/80 md:text-4xl"
            >
              {m}
              <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function gsapClamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}
