"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

/**
 * Custom cursor: an instant dot + a lagging ring that scales up over
 * interactive elements, plus a text label (e.g. "View Details") that
 * replaces the dot/ring over elements tagged with data-cursor-label.
 * Only activates on fine-pointer, motion-OK devices; everywhere else the
 * native cursor is left untouched.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const labelText = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!fine || reduce) return;

    const root = document.documentElement;
    root.classList.add("cursor-none");

    const xDot = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "power3" });
    const yDot = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "power3" });
    const xRing = gsap.quickTo(ring.current, "x", { duration: 0.4, ease: "power3" });
    const yRing = gsap.quickTo(ring.current, "y", { duration: 0.4, ease: "power3" });
    const xLabel = gsap.quickTo(label.current, "x", { duration: 0.4, ease: "power3" });
    const yLabel = gsap.quickTo(label.current, "y", { duration: 0.4, ease: "power3" });

    gsap.set([dot.current, ring.current], { opacity: 1 });

    const move = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
      xLabel(e.clientX);
      yLabel(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const hoverEl = t?.closest("a, button, [data-cursor='hover']");
      const labelEl = t?.closest<HTMLElement>("[data-cursor-label]");
      const text = labelEl?.dataset.cursorLabel ?? "";

      if (ring.current) {
        ring.current.setAttribute("data-hover", hoverEl && !text ? "true" : "false");
        ring.current.style.opacity = text ? "0" : "1";
      }
      if (dot.current) dot.current.style.opacity = text ? "0" : "1";
      if (text && labelText.current) labelText.current.textContent = text;
      if (label.current) label.current.setAttribute("data-active", text ? "true" : "false");
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      root.classList.remove("cursor-none");
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" style={{ opacity: 0 }} />
      <div ref={dot} className="cursor-dot" style={{ opacity: 0 }} />
      <div ref={label} className="cursor-label">
        <span className="cursor-label-inner">
          <span ref={labelText} />
          <ArrowUpRight size={13} strokeWidth={2.5} />
        </span>
      </div>
    </>
  );
}
