"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

type Props = {
  overline?: string;
  /** Full title (fallback). Prefer `lead` + `accent` for the serif-italic look. */
  title?: string;
  /** Sans portion of the title, e.g. "Things I've". */
  lead?: string;
  /** Serif-italic accent word(s), e.g. "shipped". */
  accent?: string;
  align?: "left" | "center";
  className?: string;
};

/**
 * Heading reveal: SplitText breaks the title into lines that ride up out of an
 * overflow mask with a slight un-skew as the heading scrolls into view.
 */
export default function SectionHeading({
  overline,
  title,
  lead,
  accent,
  align = "left",
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const overlineEl = ref.current?.querySelector("[data-overline]");

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (overlineEl) gsap.set(overlineEl, { opacity: 0, y: 12 });

        const split = SplitText.create(titleRef.current, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit: (self) => {
            const tl = gsap.timeline({
              scrollTrigger: { trigger: ref.current, start: "top 85%" },
            });
            if (overlineEl)
              tl.to(overlineEl, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power3.out",
              });
            tl.from(
              self.lines,
              {
                yPercent: 115,
                skewY: 5,
                duration: 1,
                ease: "power4.out",
                stagger: 0.12,
              },
              overlineEl ? "-=0.35" : 0
            );
            return tl;
          },
        });

        return () => split.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        if (overlineEl) gsap.set(overlineEl, { opacity: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className={`${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
      {overline && (
        <div
          data-overline
          className={`mb-5 flex items-center gap-3 ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-8 bg-accent/70" />
          <span className="serif-italic text-base text-muted">{overline}</span>
          {align === "center" && <span className="h-px w-8 bg-accent/70" />}
        </div>
      )}
      <h2
        ref={titleRef}
        className="font-display text-4xl font-semibold uppercase leading-[0.95] tracking-tight text-fg sm:text-5xl md:text-6xl"
      >
        {accent ? (
          <>
            {lead}{lead ? " " : ""}
            <em className="serif-italic">{accent}</em>
          </>
        ) : (
          title
        )}
      </h2>
    </div>
  );
}
