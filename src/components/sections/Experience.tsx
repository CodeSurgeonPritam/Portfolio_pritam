"use client";

import { Asterisk, Briefcase, CircleDot, MapPin } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
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
        {/* centered header with arc glow, matching the rest of the site */}
        <div className="relative text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[-8rem] h-[30rem] w-[30rem] max-w-[80vw] -translate-x-1/2 rounded-full [background:radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_60%)]"
          />
          <span
            data-reveal
            className="relative inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-muted"
          >
            <CircleDot size={13} className="text-accent" />
            Career
          </span>
          <h2
            data-reveal
            className="relative mt-6 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl md:text-6xl"
          >
            Where I&apos;ve <em className="serif-italic">worked</em>
          </h2>
          <p
            data-reveal
            className="relative mx-auto mt-5 max-w-md text-base leading-relaxed text-muted"
          >
            The teams and products I&apos;ve shipped for, and what that work
            looked like day to day.
          </p>
        </div>

        <div className="mt-16 space-y-6">
          {experience.map((job) => (
            <div
              key={job.company}
              data-reveal
              className="relative overflow-hidden rounded-t-3xl border-t-2 border-white/[0.14] bg-transparent p-6 md:p-8"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-28 overflow-hidden [background:linear-gradient(to_bottom,rgba(255,255,255,0.055),transparent)]"
              />

              <div className="relative flex flex-col gap-4 border-b border-line pb-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-fg md:text-3xl">
                    {job.role}
                  </h3>
                  <p className="mt-2 flex items-center gap-2 text-base text-accent">
                    <Briefcase size={15} />
                    {job.company}
                  </p>
                </div>
                <div className="flex flex-col gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-muted md:items-end">
                  <span>{job.period}</span>
                  <span className="flex items-center gap-1.5 md:justify-end">
                    <MapPin size={13} />
                    {job.location}
                  </span>
                </div>
              </div>

              <ul className="relative mt-6 space-y-4">
                {job.bullets.map((b) => (
                  <li
                    key={b}
                    className="group flex gap-3 text-sm leading-relaxed md:text-base"
                  >
                    <Asterisk size={16} className="mt-0.5 shrink-0 text-white" />
                    <span className="text-muted transition-colors duration-300 group-hover:text-fg">
                      {b}
                    </span>
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
