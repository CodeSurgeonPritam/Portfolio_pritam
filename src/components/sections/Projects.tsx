"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Dot, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import ProjectModal from "@/components/ui/ProjectModal";
import { projects } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Projects() {
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const trackEl = track.current;
          const vpEl = viewport.current;
          if (!trackEl || !vpEl || !pin.current) return;

          gsap.set(vpEl, { overflow: "hidden" });
          const distance = () =>
            Math.max(0, trackEl.scrollWidth - window.innerWidth);

          const tween = gsap.to(trackEl, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: pin.current,
              start: "top top",
              end: () => "+=" + distance(),
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (bar.current)
                  bar.current.style.transform = `scaleX(${self.progress})`;
              },
            },
          });

          // parallax the giant index number inside each panel
          const panels = gsap.utils.toArray<HTMLElement>(".panel");
          panels.forEach((p) => {
            const num = p.querySelector<HTMLElement>(".panel-index");
            if (!num) return;
            gsap.fromTo(
              num,
              { xPercent: 15 },
              {
                xPercent: -15,
                ease: "none",
                scrollTrigger: {
                  trigger: p,
                  containerAnimation: tween,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              }
            );
          });

          return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
            gsap.set(vpEl, { clearProps: "overflow" });
          };
        }
      );

      return () => mm.revert();
    },
    { scope: section }
  );

  return (
    <section id="projects" ref={section} className="relative scroll-mt-20">
      <div className="px-6 pt-28 md:px-10 md:pt-36">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            overline="Selected Work"
            lead="Things I've"
            accent="shipped"
          />
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Production products used by real teams and thousands of customers.
            <span className="mt-2 hidden items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-accent md:flex">
              Scroll to explore <ArrowRight size={14} />
            </span>
          </p>
        </div>
      </div>

      {/* pinned horizontal gallery (desktop) / native scroll (mobile) */}
      <div
        ref={pin}
        className="relative mt-10 md:mt-16 md:flex md:h-dvh md:flex-col md:justify-center"
      >
        <div
          ref={viewport}
          className="no-scrollbar overflow-x-auto md:overflow-hidden"
        >
          <div
            ref={track}
            className="flex w-max snap-x snap-mandatory gap-6 px-6 pb-4 md:snap-none md:px-10"
          >
            {projects.map((p, i) => {
              return (
                <div
                  key={p.name}
                  data-cursor="hover"
                  data-cursor-label="View Details"
                  role="button"
                  tabIndex={0}
                  aria-label={`View details — ${p.name}`}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(i);
                    }
                  }}
                  className="panel glass group relative flex w-[85vw] shrink-0 cursor-pointer snap-center flex-col justify-between overflow-hidden rounded-3xl p-8 transition-colors hover:border-accent/40 sm:w-[70vw] md:h-[64dvh] md:w-[44vw] md:p-10 lg:w-[38vw]"
                >
                  {/* giant faded index */}
                  <span
                    aria-hidden
                    className="panel-index pointer-events-none absolute -right-4 -top-10 select-none font-display text-[12rem] font-bold leading-none text-fg/[0.04] md:text-[16rem]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative">
                    <span className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-accent">
                      <Dot size={16} className="-mx-1.5" />
                      {p.status}
                    </span>
                    <h3 className="mt-5 font-display text-2xl font-semibold uppercase leading-tight tracking-tight text-fg transition-colors group-hover:text-accent md:text-4xl">
                      {p.name}
                    </h3>
                    <p className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-muted">
                      {p.meta}
                    </p>
                    <p className="mt-5 max-w-md text-sm leading-relaxed text-fg/80 md:text-base">
                      {p.summary}
                    </p>
                  </div>

                  <div className="relative mt-6">
                    <div className="flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-fg/70"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <span className="mt-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-fg">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                </div>
              );
            })}

            {/* closing CTA card */}
            <div className="panel relative flex w-[85vw] shrink-0 snap-center flex-col items-start justify-center gap-6 rounded-3xl border border-dashed border-line px-8 sm:w-[60vw] md:h-[64dvh] md:w-[32vw] md:px-10">
              <p className="font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-fg md:text-5xl">
                Got a project
                <br />
                in mind?
              </p>
              <MagneticButton
                href="#contact"
                className="rounded-full bg-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-accent-fg"
              >
                Let&apos;s talk <ArrowUpRight size={15} />
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* progress line (desktop) */}
        <div className="mx-6 mt-6 hidden h-px bg-line md:mx-10 md:block">
          <div
            ref={bar}
            className="h-full w-full origin-left scale-x-0 bg-accent"
          />
        </div>
      </div>

      {active !== null && (
        <ProjectModal project={projects[active]} onClose={() => setActive(null)} />
      )}
    </section>
  );
}
