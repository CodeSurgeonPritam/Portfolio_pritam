"use client";

import { Mail, Phone, ArrowUpRight, CircleDot } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
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
        className="accent-glow pointer-events-none absolute bottom-0 left-1/2 h-[50vh] w-[70vw] max-w-[560px] -translate-x-1/2 opacity-50"
      />

      <div className="relative">
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
          <span className="shimmer-text">Contact</span>
          </span>
          <h2
            data-reveal
            className="relative mt-6 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl md:text-6xl"
          >
            Let&apos;s build something{" "}
            <em className="serif-italic">together</em>
          </h2>
          <p
            data-reveal
            className="relative mx-auto mt-5 max-w-md text-base leading-relaxed text-muted"
          >
            I&apos;m currently open to full-stack opportunities and freelance
            projects. Drop a line and I&apos;ll get back to you.
          </p>
        </div>

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
              className="group glass relative flex items-center gap-4 overflow-hidden rounded-2xl p-5 transition-colors hover:border-accent/40"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-16 [background:linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent)]"
              />
              <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Icon size={18} />
              </span>
              <span className="relative min-w-0">
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
