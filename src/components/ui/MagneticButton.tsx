"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type Props = {
  children: ReactNode;
  href?: string;
  target?: string;
  className?: string;
  strength?: number;
  onClick?: (e: React.MouseEvent) => void;
};

/**
 * Magnetic hover: the element (and its inner label) drift toward the cursor
 * and spring back on leave. Disabled on coarse pointers / reduced motion.
 */
export default function MagneticButton({
  children,
  href,
  target,
  className = "",
  strength = 0.4,
  onClick,
}: Props) {
  const el = useRef<HTMLAnchorElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const node = el.current;
      if (!node) return;
      if (
        !window.matchMedia("(pointer: fine)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;

      const xTo = gsap.quickTo(node, "x", { duration: 0.5, ease: "power3" });
      const yTo = gsap.quickTo(node, "y", { duration: 0.5, ease: "power3" });
      const lxTo = gsap.quickTo(label.current, "x", {
        duration: 0.6,
        ease: "power3",
      });
      const lyTo = gsap.quickTo(label.current, "y", {
        duration: 0.6,
        ease: "power3",
      });

      const move = (e: MouseEvent) => {
        const r = node.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width / 2);
        const my = e.clientY - (r.top + r.height / 2);
        xTo(mx * strength);
        yTo(my * strength);
        lxTo(mx * strength * 0.35);
        lyTo(my * strength * 0.35);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
        lxTo(0);
        lyTo(0);
      };

      node.addEventListener("mousemove", move);
      node.addEventListener("mouseleave", leave);
      return () => {
        node.removeEventListener("mousemove", move);
        node.removeEventListener("mouseleave", leave);
      };
    },
    { scope: el }
  );

  return (
    <a
      ref={el}
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      onClick={onClick}
      className={`inline-flex will-change-transform ${className}`}
    >
      <span ref={label} className="inline-flex items-center gap-2">
        {children}
      </span>
    </a>
  );
}
