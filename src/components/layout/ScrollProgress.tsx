"use client";

import { useEffect, useRef } from "react";

/** Thin vertical progress bar pinned to the right edge of the viewport. */
export default function ScrollProgress() {
  const fill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (fill.current) fill.current.style.transform = `scaleY(${p})`;
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed right-0 top-0 z-50 hidden h-screen w-[3px] bg-line/40 md:block">
      <div
        ref={fill}
        className="h-full w-full origin-top bg-accent"
        style={{ transform: "scaleY(0)" }}
      />
    </div>
  );
}
