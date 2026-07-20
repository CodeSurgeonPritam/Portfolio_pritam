"use client";

import { useRef } from "react";

/**
 * Dark pill button with a cursor-following white glow on hover (Fade-style).
 * Tracks the pointer inside the button and positions a radial highlight at it;
 * the highlight fades in on hover and the ring brightens.
 */
type Props = {
  href: string;
  target?: string;
  className?: string;
  children: React.ReactNode;
};

export default function SpotlightButton({
  href,
  target,
  className = "",
  children,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--bx", `${e.clientX - r.left}px`);
    el.style.setProperty("--by", `${e.clientY - r.top}px`);
  };

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      onMouseMove={onMove}
      data-cursor="hover"
      className={`spotlight-btn group relative inline-flex items-center overflow-hidden ${className}`}
    >
      <span aria-hidden className="spotlight-btn-glow" />
      <span className="relative z-[1] inline-flex items-center gap-2">
        {children}
      </span>
    </a>
  );
}
