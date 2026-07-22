"use client";

import { useRef } from "react";
import { ArrowUpRight, CircleDot, Mail, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Counter from "@/components/ui/Counter";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { profile, stats, socials } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SOCIAL_ICONS: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  Email: Mail,
};

const SOCIAL_BLURB: Record<string, string> = {
  GitHub: "Code, repos & contributions",
  LinkedIn: "Professional profile & network",
  Email: "Get in touch directly",
};

export default function About() {
  const ref = useScrollReveal<HTMLElement>();
  const fillWrapRef = useRef<HTMLDivElement>(null);
  const fillTextRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const el = fillTextRef.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const state = { p: 0 };
        gsap.to(state, {
          p: 100,
          ease: "none",
          scrollTrigger: {
            trigger: fillWrapRef.current,
            start: "top 88%",
            end: "bottom 62%",
            scrub: true,
          },
          onUpdate: () => {
            el.style.clipPath = `inset(0 ${100 - state.p}% 0 0)`;
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        el.style.clipPath = "inset(0 0% 0 0)";
      });

      return () => mm.revert();
    },
    { scope: fillWrapRef }
  );

  return (
    <section
      id="about"
      ref={ref}
      className="relative mx-auto max-w-7xl scroll-mt-20 px-6 py-28 md:px-10 md:py-36"
    >
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
          About
        </span>
        <h2
          data-reveal
          className="relative mt-6 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl md:text-6xl"
        >
          Full-stack, <em className="serif-italic">end to end</em>
        </h2>
        <p
          data-reveal
          className="relative mx-auto mt-5 max-w-md text-base leading-relaxed text-muted"
        >
          A closer look at how I work, what I&apos;ve built, and the numbers
          behind it.
        </p>
      </div>

      <div className="mt-20 grid gap-16 md:grid-cols-12 md:gap-8">
        {/* left — narrative */}
        <div data-reveal data-parallax="-6" className="md:col-span-6 lg:col-span-7">
          <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            {profile.role}
            <span className="h-1 w-1 rounded-full bg-fg/25" />
            <span className="flex items-center gap-1.5">
              <MapPin size={12} className="text-accent" />
              {profile.location}
            </span>
          </p>

          {/* intro — fills from dim to full color as you scroll */}
          <div ref={fillWrapRef} className="relative mt-7">
            <p className="font-display text-2xl leading-[1.5] tracking-tight text-fg/20 sm:text-[1.75rem]">
              {profile.intro}
            </p>
            <p
              ref={fillTextRef}
              aria-hidden
              style={{ clipPath: "inset(0 100% 0 0)" }}
              className="pointer-events-none absolute inset-0 font-display text-2xl leading-[1.5] tracking-tight text-fg sm:text-[1.75rem]"
            >
              {profile.intro}
            </p>
          </div>

          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-fg transition-colors hover:border-accent/50 hover:text-accent"
          >
            Read résumé
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* right — the numbers, plain and typographic */}
        <div data-reveal className="md:col-span-6 lg:col-span-5">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 border-t border-line pt-8">
            {stats.map((s) => (
              <div key={s.label} className="border-l border-line pl-5">
                <Counter
                  value={s.value}
                  suffix={s.suffix}
                  className="font-display text-4xl font-semibold tracking-tight text-fg md:text-5xl"
                />
                <p className="mt-2.5 font-mono text-[11px] uppercase leading-snug tracking-[0.15em] text-muted">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* elsewhere — social links, hover for a card */}
      <div data-reveal className="mt-16 border-t border-line pt-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Elsewhere
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {socials.map((s, i) => {
            const Icon = SOCIAL_ICONS[s.label] ?? Mail;
            const tilt = i % 2 === 0 ? "-rotate-2" : "rotate-2";
            const avatar =
              s.label === "GitHub" ? `${s.href.replace(/\/$/, "")}.png` : null;
            return (
              <div key={s.label} className="group relative">
                <a
                  href={s.href}
                  target={s.label === "Email" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:border-accent/50 hover:text-fg"
                >
                  <Icon size={14} />
                  {s.label}
                </a>

                {/* unique hover preview */}
                <div
                  aria-hidden
                  className={`pointer-events-none absolute left-1/2 top-full z-20 mt-4 w-56 -translate-x-1/2 ${tilt} -translate-y-2 scale-75 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:scale-100 [@media(hover:hover)]:group-hover:opacity-100`}
                >
                  <div className="glass relative overflow-hidden rounded-2xl p-5 text-center shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)]">
                    <span
                      aria-hidden
                      className="absolute left-1/2 bottom-full -mb-1.5 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-line bg-surface"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-14 [background:linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent)]"
                    />
                    {avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={avatar}
                        alt=""
                        width={48}
                        height={48}
                        className="relative mx-auto h-12 w-12 rounded-full ring-1 ring-line"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                        <Icon size={20} />
                      </span>
                    )}
                    <p className="relative mt-3 font-display text-sm font-semibold text-fg">
                      {s.label}
                    </p>
                    <p className="relative mt-0.5 truncate font-mono text-[10px] text-muted">
                      {s.handle}
                    </p>
                    <p className="relative mt-2.5 text-[11px] leading-snug text-fg/60">
                      {SOCIAL_BLURB[s.label]}
                    </p>
                    <span className="relative mt-3 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.15em] text-accent">
                      Visit
                      <ArrowUpRight size={11} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
