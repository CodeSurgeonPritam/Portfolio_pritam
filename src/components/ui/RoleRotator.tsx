"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const ROLES = [
  "Full Stack Developer",
  "React & TypeScript Engineer",
  "Shopify App Developer",
  "Product-minded Builder",
];

/** Cycles job titles with a masked flip-up transition. */
export default function RoleRotator({ className = "" }: { className?: string }) {
  const word = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = word.current;
      if (!el) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) {
        el.textContent = ROLES[0];
        return;
      }

      let i = 0;
      el.textContent = ROLES[0];
      const tl = gsap.timeline({ repeat: -1 });
      ROLES.forEach(() => {
        tl.to(el, {
          yPercent: -100,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
          delay: 2,
        })
          .add(() => {
            i = (i + 1) % ROLES.length;
            el.textContent = ROLES[i];
          })
          .fromTo(
            el,
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.55, ease: "power3.out" }
          );
      });

      return () => tl.kill();
    },
    { scope: word }
  );

  return (
    <span className={`inline-flex overflow-hidden align-bottom ${className}`}>
      <span ref={word} className="inline-block will-change-transform">
        {ROLES[0]}
      </span>
    </span>
  );
}
