"use client";

import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { profile, socials } from "@/lib/data";

export default function Contact() {
  const ref = useScrollReveal<HTMLElement>();

  const contactRows = [
    {
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      Icon: Mail,
    },
    {
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone.replace(/[^+\d]/g, "")}`,
      Icon: Phone,
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="relative mx-auto max-w-7xl scroll-mt-20 px-6 py-28 md:px-10 md:py-40"
    >
      <div
        aria-hidden
        className="accent-glow pointer-events-none absolute bottom-0 left-1/2 h-[50vh] w-[70vh] -translate-x-1/2 opacity-50"
      />

      <div className="relative">
        <SectionHeading
          overline="Contact"
          lead="Let's build something"
          accent="together"
          align="center"
          className="mx-auto max-w-4xl"
        />

        <p
          data-reveal
          className="mx-auto mt-6 max-w-xl text-center text-base leading-relaxed text-muted"
        >
          I&apos;m currently open to full-stack opportunities and freelance
          projects. Drop a line and I&apos;ll get back to you.
        </p>

        <div data-reveal className="mt-10 flex justify-center">
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-display text-lg font-semibold uppercase tracking-tight text-accent-fg transition-transform hover:scale-[1.03]"
          >
            Say Hello
            <ArrowUpRight
              size={20}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        <div className="mx-auto mt-16 grid max-w-3xl gap-4 sm:grid-cols-2">
          {contactRows.map(({ label, value, href, Icon }) => (
            <a
              key={label}
              data-reveal
              href={href}
              className="group flex items-center gap-4 rounded-2xl border border-line bg-surface/50 p-5 transition-colors hover:border-accent/40"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Icon size={18} />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-xs uppercase tracking-[0.2em] text-muted">
                  {label}
                </span>
                <span className="block truncate text-fg transition-colors group-hover:text-accent">
                  {value}
                </span>
              </span>
            </a>
          ))}
        </div>

        <div
          data-reveal
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {socials
            .filter((s) => s.href.startsWith("http"))
            .map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-line px-5 py-2 font-mono text-xs uppercase tracking-[0.15em] text-fg/80 transition-colors hover:border-accent hover:text-accent"
              >
                {s.label}
              </a>
            ))}
        </div>
      </div>
    </section>
  );
}
