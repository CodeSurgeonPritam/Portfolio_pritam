"use client";

import { useState } from "react";
import { Plus, X, ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SpotlightButton from "@/components/ui/SpotlightButton";

const faqs = [
  {
    q: "What do you build?",
    a: "Full-stack web apps end-to-end — React & Next.js front-ends, Node/Express APIs, databases, auth and Shopify integrations. I've shipped production tooling used by 1,000+ users.",
  },
  {
    q: "What's your typical process?",
    a: "Discover the problem and scope the smallest valuable slice, build it with clean, typed code and tight feedback loops, then ship to production and iterate on real usage.",
  },
  {
    q: "What's your tech stack?",
    a: "React, Next.js, TypeScript, Node.js, Express, MongoDB & SQL, Redux Toolkit and Tailwind CSS — plus Google OAuth 2.0, JWT/RBAC and the Shopify API.",
  },
  {
    q: "How long does a project take?",
    a: "It depends on scope — a focused feature can ship in days, a full product in a few weeks. I scope it upfront and keep you updated the whole way through.",
  },
  {
    q: "Are you available for work?",
    a: "Yes — I'm open to full-stack roles and freelance product work. Email is the fastest way to reach me.",
  },
];

export default function Faq() {
  const ref = useScrollReveal<HTMLElement>();
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      ref={ref}
      className="relative scroll-mt-20 py-28 md:py-36"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-[0.85fr_1.15fr] md:gap-16 md:px-10">
        {/* left — heading + CTA */}
        <div>
          <h2
            data-reveal
            className="font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl"
          >
            Your Questions <em className="serif-italic">Answered</em>
          </h2>
          <p
            data-reveal
            className="mt-5 max-w-sm text-base leading-relaxed text-muted"
          >
            The common questions, answered below — if you still need help, just
            reach out.
          </p>
          <div data-reveal className="mt-8">
            <SpotlightButton
              href="#contact"
              className="rounded-full bg-[#0e0e0e] px-6 py-3.5 font-mono text-xs uppercase tracking-[0.12em] text-fg ring-1 ring-white/10 transition duration-300 hover:ring-white/25"
            >
              <ArrowUpRight size={15} />
              Contact me
            </SpotlightButton>
          </div>
        </div>

        {/* right — accordion */}
        <div className="space-y-4">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                data-reveal
                className="glass overflow-hidden rounded-2xl transition-colors"
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-lg font-medium tracking-tight text-fg">
                    {f.q}
                  </span>
                  {isOpen ? (
                    <X size={18} className="shrink-0 text-muted" />
                  ) : (
                    <Plus size={18} className="shrink-0 text-muted" />
                  )}
                </button>
                <div
                  className={`grid transition-all duration-500 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-sm leading-relaxed text-muted">
                      {f.a}
                    </p>
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
