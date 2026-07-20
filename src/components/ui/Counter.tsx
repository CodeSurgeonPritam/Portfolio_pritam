"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
  value: number;
  suffix?: string;
  className?: string;
};

/** Counts up from 0 → value once when scrolled into view. */
export default function Counter({ value, suffix = "", className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const obj = { n: 0 };
        el.textContent = "0";
        gsap.to(obj, {
          n: value,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.n).toString();
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        el.textContent = value.toString();
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <span className={className}>
      <span ref={ref}>{value}</span>
      {suffix}
    </span>
  );
}
