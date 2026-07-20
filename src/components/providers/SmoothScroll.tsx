"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global smooth-scroll provider. Syncs Lenis with the GSAP ticker so
 * ScrollTrigger stays in lockstep with the smoothed scroll position
 * (the standard recipe from the build-prompt library).
 *
 * Respects prefers-reduced-motion: when set, we skip Lenis entirely and
 * let the browser scroll natively while GSAP tweens are disabled elsewhere.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Let content lay out, then recalc trigger positions.
    const refresh = () => ScrollTrigger.refresh();
    const id = window.setTimeout(refresh, 200);

    // Expose for anchor navigation (Navbar uses lenis.scrollTo).
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      window.clearTimeout(id);
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <>{children}</>;
}
