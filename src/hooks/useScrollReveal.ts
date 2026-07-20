"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Reusable scroll motion for a section. Returns a ref to attach to a container:
 *  - `[data-reveal]` descendants fade + rise + un-skew into place, staggered.
 *  - `[data-parallax="<n>"]` descendants drift by n% as they pass through view.
 *
 * Reduced motion is respected via gsap.matchMedia — the reduce branch leaves
 * elements at their final, fully-visible state and skips parallax.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(options?: {
  y?: number;
  stagger?: number;
  start?: string;
  duration?: number;
}) {
  const ref = useRef<T>(null);
  const { y = 60, stagger = 0.08, start = "top 82%", duration = 1.1 } =
    options ?? {};

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll("[data-reveal]")
        );
        if (targets.length) {
          gsap.set(targets, { opacity: 0, y, skewY: 3 });
          ScrollTrigger.batch(targets, {
            start,
            onEnter: (batch) =>
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                skewY: 0,
                duration,
                ease: "power4.out",
                stagger,
                overwrite: true,
              }),
          });
        }

        const parallax = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll("[data-parallax]")
        );
        parallax.forEach((el) => {
          const speed = parseFloat(el.dataset.parallax || "0");
          gsap.to(el, {
            yPercent: speed,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        const targets = root.querySelectorAll("[data-reveal]");
        gsap.set(targets, { opacity: 1, y: 0, skewY: 0 });
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return ref;
}
