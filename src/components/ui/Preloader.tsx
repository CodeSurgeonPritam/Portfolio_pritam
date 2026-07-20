"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { profile } from "@/lib/data";

gsap.registerPlugin(useGSAP);

/**
 * Cinematic intro: counts 00 → 100 while a progress line fills, then the
 * whole panel wipes upward to reveal the site. Fires `app:ready` so the hero
 * plays its entrance as the panel lifts. Skipped under reduced motion.
 */
export default function Preloader() {
  const panel = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const brand = useRef<HTMLDivElement>(null);

  const fireReady = () => {
    (window as unknown as { __appReady?: boolean }).__appReady = true;
    window.dispatchEvent(new Event("app:ready"));
  };

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduce) {
        gsap.set(panel.current, { display: "none" });
        fireReady();
        return;
      }

      const proxy = { v: 0 };
      const tl = gsap.timeline();

      tl.to(
        proxy,
        {
          v: 100,
          duration: 1.5,
          ease: "power2.inOut",
          onUpdate: () => {
            if (count.current)
              count.current.textContent = String(Math.round(proxy.v)).padStart(
                2,
                "0"
              );
          },
        },
        0
      )
        .to(bar.current, { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, 0)
        .to(
          [brand.current, count.current, bar.current],
          { opacity: 0, y: -20, duration: 0.5, ease: "power2.in" },
          ">-0.1"
        )
        .add(fireReady)
        .to(
          panel.current,
          { yPercent: -100, duration: 1, ease: "power4.inOut" },
          "<"
        )
        .set(panel.current, { display: "none" });
    },
    { scope: panel }
  );

  return (
    <div
      ref={panel}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
    >
      <div ref={brand} className="flex flex-col items-center gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-muted">
          Portfolio
        </span>
        <span className="font-display text-5xl font-bold uppercase tracking-tight text-fg md:text-7xl">
          {profile.firstName}
          <span className="text-accent">.</span>
        </span>
      </div>

      <div className="absolute bottom-10 left-6 right-6 flex items-end justify-between md:left-10 md:right-10">
        <div className="h-px w-40 origin-left overflow-hidden bg-line md:w-72">
          <div
            ref={bar}
            className="h-full w-full origin-left scale-x-0 bg-accent"
          />
        </div>
        <span className="font-display text-4xl font-bold text-fg md:text-6xl">
          <span ref={count}>00</span>
          <span className="text-accent">%</span>
        </span>
      </div>
    </div>
  );
}
