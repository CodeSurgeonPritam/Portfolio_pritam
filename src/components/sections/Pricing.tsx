"use client";

import { useState } from "react";
import { Check, CircleDot, ArrowUpRight, PhoneCall, Users } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SpotlightButton from "@/components/ui/SpotlightButton";
import { profile } from "@/lib/data";

/**
 * Real rates. Update here whenever they change.
 */
const PRICING: { monthly: number | null; perProject: number | null } = {
  monthly: 3000,
  perProject: 1500,
};

type Mode = "monthly" | "project";

const INCLUDED: Record<Mode, string[]> = {
  monthly: [
    "Full-stack build (UI + API + database)",
    "Regular progress updates",
    "Clean, typed code you fully own",
    "Pause or cancel anytime",
  ],
  project: [
    "Full-stack build (UI + API + database)",
    "Fixed scope & timeline",
    "Clean, typed code you fully own",
    "Post-launch support window",
  ],
};

export default function Pricing() {
  const ref = useScrollReveal<HTMLElement>();
  const [mode, setMode] = useState<Mode>("monthly");

  const value = mode === "monthly" ? PRICING.monthly : PRICING.perProject;
  const helper =
    mode === "monthly"
      ? "Ongoing retainer — pause or cancel anytime."
      : "Fixed scope, fixed timeline, agreed upfront.";

  return (
    <section
      id="pricing"
      ref={ref}
      className="relative scroll-mt-20 py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* centered header */}
        <div className="text-center">
          <span
            data-reveal
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-muted"
          >
            <CircleDot size={13} className="text-accent" />
          <span className="shimmer-text">Pricing</span>
          </span>
          <h2
            data-reveal
            className="mt-6 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl md:text-6xl"
          >
            Straightforward <em className="serif-italic">pricing</em>
          </h2>
          <p
            data-reveal
            className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted"
          >
            One flat rate for ongoing work, or a fixed price for a defined
            project — whichever fits how you want to work.
          </p>
        </div>

        {/* card */}
        <div
          data-reveal
          className="glass relative mt-16 overflow-hidden rounded-3xl p-6 md:p-10"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-40 [background:linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent)]"
          />
          <div className="relative grid gap-10 md:grid-cols-2 md:gap-14">
            {/* left — toggle, price, CTA */}
            <div>
              <div>
                <div className="inline-flex gap-1 rounded-full border border-line bg-bg/40 p-1">
                  {(
                    [
                      { id: "monthly", label: "Monthly" },
                      { id: "project", label: "Per Project" },
                    ] as const
                  ).map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setMode(t.id)}
                      className={`rounded-full px-4 py-2 text-sm transition-colors ${
                        mode === t.id
                          ? "bg-white/10 font-medium text-fg"
                          : "text-muted hover:text-fg"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
                <div className="mt-2 h-px w-full max-w-[220px] bg-gradient-to-r from-white/60 via-white/15 to-transparent" />
              </div>

              <div className="mt-8">
                {value && mode === "project" && (
                  <p className="mb-1 font-mono text-xs uppercase tracking-[0.15em] text-muted">
                    Starting at
                  </p>
                )}
                <div className="flex items-baseline gap-2">
                  {value ? (
                    <>
                      <span className="font-display text-6xl font-bold tracking-tight text-fg sm:text-7xl">
                        ${value.toLocaleString()}
                      </span>
                      <span className="text-lg text-muted">
                        {mode === "monthly" ? "/month" : "/project"}
                      </span>
                    </>
                  ) : (
                    <span className="font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">
                      Contact for a rate
                    </span>
                  )}
                </div>
              </div>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-muted">
                {helper}
              </p>

              <div className="relative mt-8 inline-block">
                <SpotlightButton
                  href="#contact"
                  className="relative z-[1] rounded-full bg-[#0e0e0e] px-6 py-3.5 font-mono text-xs uppercase tracking-[0.12em] text-fg ring-1 ring-white/10 transition duration-300 hover:ring-white/25"
                >
                  <ArrowUpRight size={15} />
                  Get Started
                </SpotlightButton>
                {/* ambient glow beneath the button */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-3 -bottom-1 h-3 [background:radial-gradient(50%_100%_at_50%_100%,rgba(255,255,255,0.5),transparent_75%)]"
                />
              </div>

              {/* secondary — low-commitment option */}
              <div className="mt-8 rounded-2xl border border-line bg-bg/40 p-6">
                <h4 className="font-display text-xl font-semibold tracking-tight text-fg">
                  Not sure yet?
                </h4>
                <p className="mt-3 max-w-sm text-base leading-relaxed text-muted">
                  Book a free intro call — we&apos;ll talk through your project
                  and I&apos;ll give you a scoped estimate, no pressure.
                </p>
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-5 inline-flex items-center gap-2 text-fg transition-colors hover:text-accent"
                >
                  <PhoneCall size={16} className="shrink-0" />
                  <span className="text-sm font-medium">Schedule a call</span>
                </a>
              </div>
            </div>

            {/* right — what's included (whole card slides on tab switch) */}
            <div className="overflow-hidden rounded-2xl border border-line bg-bg/40 p-6 md:p-8">
              <div key={mode} className="animate-[slideInLR_0.5s_ease]">
                <h3 className="font-display text-xl font-semibold text-fg">
                  What&apos;s included
                </h3>
                <ul className="mt-8 space-y-7">
                  {INCLUDED[mode].map((item) => (
                    <li key={item} className="flex items-center gap-3.5">
                      <Check
                        size={20}
                        strokeWidth={2}
                        className="shrink-0 text-fg/60"
                      />
                      <span className="text-base text-fg/90">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* proof — real numbers + real employer, no fabricated testimonial */}
                <div className="mt-10">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg/60 text-fg">
                    <Users size={18} />
                  </span>
                  <p className="mt-4 max-w-md pl-4 text-base italic leading-relaxed text-muted">
                    &ldquo;Production tooling used by 1,000+ active users,
                    with 15+ reusable components shipped across 2 live
                    products.&rdquo;
                  </p>
                  <p className="mt-3 pl-4 text-sm text-fg/80">
                    FullCircle Technologies Inc.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
