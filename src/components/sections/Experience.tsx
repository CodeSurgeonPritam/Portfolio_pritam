"use client";

import { Briefcase, MapPin } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { experience } from "@/lib/data";

export default function Experience() {
  const ref = useScrollReveal<HTMLElement>({ y: 50, stagger: 0.08 });

  return (
    <section
      id="experience"
      ref={ref}
      className="relative scroll-mt-20 border-y border-line bg-surface/30 py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading overline="Career" lead="Where I've" accent="worked" />

        <div className="mt-16 md:pl-4">
          {experience.map((job) => (
            <div
              key={job.company}
              className="relative border-l border-line pl-8 md:pl-12"
            >
              {/* node */}
              <span
                data-reveal
                className="absolute -left-[9px] top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-accent bg-bg"
              >
                <span className="h-2 w-2 rounded-full bg-accent" />
              </span>

              <div
                data-reveal
                className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h3 className="font-display text-2xl font-semibold uppercase tracking-tight text-fg md:text-3xl">
                    {job.role}
                  </h3>
                  <p className="mt-1 flex items-center gap-2 text-base text-accent">
                    <Briefcase size={15} />
                    {job.company}
                  </p>
                </div>
                <div className="flex flex-col gap-1 font-mono text-xs uppercase tracking-[0.15em] text-muted md:items-end">
                  <span>{job.period}</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} />
                    {job.location}
                  </span>
                </div>
              </div>

              <ul className="mt-6 space-y-3 pb-4">
                {job.bullets.map((b) => (
                  <li
                    key={b}
                    data-reveal
                    className="flex gap-3 text-sm leading-relaxed text-fg/80 md:text-base"
                  >
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
