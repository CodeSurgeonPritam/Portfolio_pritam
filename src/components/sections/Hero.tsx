"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, ChevronDown, SquareStack, Mail } from "lucide-react";
import { profile } from "@/lib/data";
import SpotlightButton from "@/components/ui/SpotlightButton";
import CircularBadge from "@/components/ui/CircularBadge";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const left = useRef<HTMLDivElement>(null);
  const silkScrub = useRef<HTMLDivElement>(null);
  const silkMouse = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const linesEls = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
        const fades = gsap.utils.toArray<HTMLElement>("[data-hero-fade]");
        const overline =
          section.current?.querySelector<HTMLElement>("[data-hero-overline]") ??
          null;

        gsap.set(linesEls, { yPercent: 115 });
        gsap.set(fades, { opacity: 0, y: 30 });
        if (overline) gsap.set(overline, { opacity: 0, y: 16 });

        const intro = gsap.timeline({ paused: true });
        if (overline)
          intro.to(overline, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          });
        intro
          .to(
            linesEls,
            {
              yPercent: 0,
              duration: 1.1,
              ease: "power4.out",
              stagger: 0.12,
            },
            overline ? "-=0.3" : 0
          )
          .to(
            fades,
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.09,
            },
            "-=0.7"
          );

        const ready = (window as unknown as { __appReady?: boolean }).__appReady;
        if (ready) intro.play();
        else {
          const onReady = () => intro.play();
          window.addEventListener("app:ready", onReady, { once: true });
          gsap.delayedCall(3, () => intro.play());
        }

        // scroll parallax
        const scrub = {
          trigger: section.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        };
        gsap.to(left.current, {
          yPercent: -12,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: scrub,
        });
        gsap.to(silkScrub.current, {
          yPercent: 16,
          ease: "none",
          scrollTrigger: scrub,
        });

        // subtle mouse parallax on the silk + floating photo card
        if (window.matchMedia("(pointer: fine)").matches) {
          const sx = gsap.quickTo(silkMouse.current, "xPercent", {
            duration: 1.1,
            ease: "power3",
          });
          const sy = gsap.quickTo(silkMouse.current, "yPercent", {
            duration: 1.1,
            ease: "power3",
          });
          const cards = gsap.utils.toArray<HTMLElement>("[data-depth]");
          const movers = cards.map((c) => ({
            x: gsap.quickTo(c, "x", { duration: 1, ease: "power3" }),
            y: gsap.quickTo(c, "y", { duration: 1, ease: "power3" }),
            d: parseFloat(c.dataset.depth || "1"),
          }));

          const onMove = (e: MouseEvent) => {
            const px = e.clientX / window.innerWidth - 0.5;
            const py = e.clientY / window.innerHeight - 0.5;
            sx(px * 6);
            sy(py * 6);
            movers.forEach((m) => {
              m.x(px * m.d * -26);
              m.y(py * m.d * -20);
            });
          };
          window.addEventListener("mousemove", onMove);
          return () => window.removeEventListener("mousemove", onMove);
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ["[data-hero-line]", "[data-hero-fade]", "[data-hero-overline]"],
          { opacity: 1, y: 0, yPercent: 0 }
        );
      });

      return () => mm.revert();
    },
    { scope: section }
  );

  return (
    <section
      id="top"
      ref={section}
      className="relative flex min-h-screen items-end overflow-hidden"
    >
      {/* backdrops — silky hero image (drifts with scroll + cursor) */}
      <div ref={silkScrub} className="absolute inset-0">
        <div ref={silkMouse} className="absolute -inset-[8%]">
          <Image
            src="/hero-bg.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-contain mt-10 object-left-[58%] blur-[4px]"
          />
        </div>
      </div>
      {/* darken the left so the headline stays legible over the light streak */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg via-bg/55 to-transparent" />
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/20 via-transparent to-bg" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-6 pt-28 pb-14 md:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        {/* left column */}
        <div ref={left} className="will-change-transform">
          <p
            data-hero-overline
            className="mb-8 inline-flex items-center gap-2.5 font-mono text-xs lowercase tracking-[0.02em] text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            available for work
          </p>

          <h1 className="font-display font-semibold leading-[0.95] tracking-tight text-fg">
            <span className="line-mask">
              <span
                data-hero-line
                className="block will-change-transform"
                style={{ fontSize: "clamp(2.75rem, 6.5vw, 5.75rem)" }}
              >
                Building products
              </span>
            </span>
            <span className="line-mask">
              <span
                data-hero-line
                className="block will-change-transform"
                style={{ fontSize: "clamp(2.75rem, 6.5vw, 5.75rem)" }}
              >
                people{" "}
                <em className="serif-italic text-muted">rely on</em>
              </span>
            </span>
          </h1>

          <p
            data-hero-fade
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted"
          >
            I build fast, reliable web products end-to-end — production tools
            trusted by 1,000+ users and the teams that rely on them every day.
          </p>

          <div data-hero-fade className="mt-9 flex flex-wrap items-center gap-3">
            <SpotlightButton
              href="#projects"
              className="rounded-full bg-[#0e0e0e] px-6 py-3.5 font-mono text-xs uppercase tracking-[0.12em] text-fg ring-1 ring-white/10 shadow-[0_10px_36px_-12px_rgba(0,0,0,0.9)] transition duration-300 hover:ring-white/25"
            >
              <SquareStack size={15} />
              View Projects
            </SpotlightButton>
            <SpotlightButton
              href="#contact"
              className="rounded-full bg-[#0e0e0e] px-6 py-3.5 font-mono text-xs uppercase tracking-[0.12em] text-fg ring-1 ring-white/10 shadow-[0_10px_36px_-12px_rgba(0,0,0,0.9)] transition duration-300 hover:ring-white/25"
            >
              <ArrowUpRight size={15} />
              Get in touch
            </SpotlightButton>
          </div>

          <div
            data-hero-fade
            className="mt-10 flex items-center gap-5 text-muted"
          >
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="transition-colors hover:text-fg"
            >
              <GithubIcon size={18} />
            </a>
            <span className="h-4 w-px bg-line" />
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-fg"
            >
              <LinkedinIcon size={18} />
            </a>
            <span className="h-4 w-px bg-line" />
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="transition-colors hover:text-fg"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* right column — portrait card + rotating badge + proof */}
        <div data-hero-fade className="flex flex-col items-center lg:items-end">
          <div data-depth="0.7" className="relative w-full max-w-sm will-change-transform">
            {/* rotating circular badge */}
            <CircularBadge
              text="PRITAM KUMAR • FULL STACK DEVELOPER • "
              className="absolute -right-6 -top-10 z-10 h-28 w-28 md:-right-10 md:h-32 md:w-32"
            />

            {/* portrait card */}
            <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] bg-[#ece9e3] ring-1 ring-white/10 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)]">
              {profile.photo ? (
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  fill
                  sizes="(max-width: 1024px) 90vw, 34vw"
                  className="object-cover grayscale"
                  priority
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#efece6] to-[#d9d5cc]">
                  <span className="font-display text-8xl font-bold tracking-tight text-[#15130f]">
                    {profile.initials}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#15130f]/50">
                    your photo → public/profile.jpg
                  </span>
                </div>
              )}
            </div>

            {/* honest proof row (replaces Fade's fabricated star rating) */}
            <div className="mt-5 flex items-center gap-2.5 font-mono text-[13px] tracking-tight text-muted">
              <span className="flex items-center gap-1.5 text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              1,000+ users · 2 products in production
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-muted transition-colors hover:text-fg lg:block"
      >
        <ChevronDown size={22} className="animate-bounce" />
      </a>
    </section>
  );
}
