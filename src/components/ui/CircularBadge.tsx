"use client";

/**
 * Rotating circular text badge (Fade-style) — text set along a circle path,
 * slowly spinning. Used behind/around the hero portrait card.
 */
export default function CircularBadge({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className={`circular-badge ${className}`} aria-hidden>
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <defs>
          <path
            id="circular-badge-arc"
            fill="none"
            d="M 100,100 m -74,0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0"
          />
        </defs>
        <text
          className="font-mono"
          style={{
            fill: "#fff",
            fontSize: "16px",
            letterSpacing: "6px",
            textTransform: "uppercase",
          }}
        >
          <textPath href="#circular-badge-arc" startOffset="0">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
