/**
 * Splits text into per-character overlays so a hovering ancestor marked
 * `group/wave` sweeps an accent color across the word, letter by letter.
 * Each letter cross-fades color IN PLACE (no vertical slide) — an earlier
 * version slid a duplicate line up from below, but two overlapping copies
 * at different transition offsets ghosted into a smeared/garbled shape.
 * A same-position color fade can't ghost since the glyph never moves.
 */
export default function WaveText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={`relative flex ${className}`}>
      {text.split("").map((ch, i) => (
        <span key={i} className="relative inline-block">
          <span className="block">{ch}</span>
          <span
            aria-hidden
            className="absolute inset-0 block text-accent opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.37,0,0.63,1)] [@media(hover:hover)]:group-hover/wave:opacity-100"
            style={{ transitionDelay: `${i * 28}ms` }}
          >
            {ch}
          </span>
        </span>
      ))}
    </span>
  );
}
