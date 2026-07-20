"use client";

import Image from "next/image";
import {
  Layers,
  ShoppingBag,
  Blocks,
  KeyRound,
  CircleDot,
  Code2,
  Braces,
  Boxes,
  Database,
  Cloud,
  Lock,
  Palette,
  GitBranch,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// image: "" → show a grayscale placeholder (drop a real screenshot to fill it).
// Cards WITH an `image` key render wide (media + text); others are text-only.
const services = [
  {
    Icon: Layers,
    title: "Full-Stack Web Apps",
    body: "End-to-end React & Next.js front-ends with Node/Express APIs, databases and clean, typed code — shipped to production.",
    image: "",
  },
  {
    Icon: Blocks,
    title: "Reusable UI Systems",
    body: "Component libraries and design-system-driven interfaces adopted across products to speed up delivery.",
  },
  {
    Icon: KeyRound,
    title: "Auth & Integrations",
    body: "Google OAuth 2.0, RBAC, JWT sessions and third-party REST API integrations wired up securely end-to-end.",
  },
  {
    Icon: ShoppingBag,
    title: "Shopify Apps & Subscriptions",
    body: "Subscription self-service portals, order & ticket tooling and Shopify API integrations that scale to thousands of users.",
    image: "",
  },
] as const;

const tagsA = [
  { Icon: Code2, label: "React" },
  { Icon: Braces, label: "TypeScript" },
  { Icon: Boxes, label: "Next.js" },
  { Icon: Database, label: "Node.js" },
  { Icon: ShoppingBag, label: "Shopify API" },
  { Icon: Layers, label: "Redux Toolkit" },
];
const tagsB = [
  { Icon: Database, label: "MongoDB" },
  { Icon: Code2, label: "Express.js" },
  { Icon: Palette, label: "Tailwind CSS" },
  { Icon: Lock, label: "Google OAuth" },
  { Icon: Cloud, label: "REST APIs" },
  { Icon: GitBranch, label: "CI/CD" },
];

function Tag({ Icon, label }: { Icon: typeof Code2; label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-surface/50 px-4 py-2 font-mono text-xs tracking-tight text-fg/80">
      <Icon size={14} className="text-muted" />
      {label}
    </span>
  );
}

export default function Services() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      id="services"
      ref={ref}
      className="relative scroll-mt-20 overflow-hidden py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* centered header with arc glow */}
        <div className="relative text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[-9rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full border-t border-white/[0.06] [background:radial-gradient(ellipse_at_center,rgba(255,255,255,0.07),transparent_60%)]"
          />
          <span
            data-reveal
            className="relative inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-muted"
          >
            <CircleDot size={13} className="text-accent" />
            Services
          </span>
          <h2
            data-reveal
            className="relative mt-6 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl md:text-6xl"
          >
            What I <em className="serif-italic">do</em>
          </h2>
          <p
            data-reveal
            className="relative mx-auto mt-5 max-w-md text-base leading-relaxed text-muted"
          >
            From a first prototype to production tooling real teams and customers
            depend on.
          </p>
        </div>

        {/* bento grid — diagonal cards carry imagery */}
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {services.map((s) => {
            const isMedia = "image" in s;
            const Icon = s.Icon;
            return (
              <div
                key={s.title}
                data-reveal
                className="glass group relative flex overflow-hidden rounded-3xl p-6 transition-colors duration-300 hover:border-white/20 md:p-7"
              >
                {isMedia ? (
                  <div className="flex w-full flex-col gap-6 sm:flex-row sm:items-center">
                    {/* media (real screenshot if provided, else placeholder) */}
                    <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/10 sm:w-[46%]">
                      {s.image ? (
                        <Image
                          src={s.image}
                          alt={s.title}
                          fill
                          sizes="(max-width: 768px) 90vw, 22vw"
                          className="object-cover grayscale transition duration-700 group-hover:grayscale-0"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#ededed] to-[#b4b4b4]">
                          <Icon
                            size={52}
                            strokeWidth={1.5}
                            className="text-[#15130f]/25"
                          />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <Icon size={24} className="text-fg" strokeWidth={1.75} />
                      <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-fg md:text-2xl">
                        {s.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-muted">
                        {s.body}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col p-2">
                    <Icon size={24} className="text-fg" strokeWidth={1.75} />
                    <h3 className="mt-8 font-display text-xl font-semibold tracking-tight text-fg md:text-2xl">
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                      {s.body}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* scrolling tag rows */}
        <div className="mt-14 space-y-3 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
          <div className="flex w-max gap-3 animate-[marquee_40s_linear_infinite]">
            {[...tagsA, ...tagsA, ...tagsA].map((t, i) => (
              <Tag key={i} Icon={t.Icon} label={t.label} />
            ))}
          </div>
          <div className="flex w-max gap-3 animate-[marquee_48s_linear_infinite_reverse]">
            {[...tagsB, ...tagsB, ...tagsB].map((t, i) => (
              <Tag key={i} Icon={t.Icon} label={t.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
