"use client";

import { Mail, ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { profile, socials, navLinks } from "@/lib/data";

const iconFor = (label: string) => {
  if (label === "GitHub") return GithubIcon;
  if (label === "LinkedIn") return LinkedinIcon;
  return Mail;
};

export default function Footer() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden border-t border-line bg-bg pt-24"
    >
      {/* Giant faded name */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none text-center font-display font-bold uppercase leading-none tracking-tighter text-fg/[0.04]"
        style={{ fontSize: "clamp(4rem, 20vw, 18rem)" }}
      >
        {profile.firstName}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-10 md:px-10">
        <div
          data-reveal
          className="glass relative grid gap-10 overflow-hidden rounded-3xl p-8 md:grid-cols-[1.5fr_1fr_1fr] md:p-12"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-32 [background:linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent)]"
          />

          <div className="relative">
            <p className="font-display text-2xl font-semibold uppercase tracking-tight text-fg">
              Let&apos;s build something
              <span className="text-accent">.</span>
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Open to full-stack roles and interesting product work. The fastest
              way to reach me is email.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-4 inline-flex items-center gap-1 border-b border-accent/40 pb-0.5 font-mono text-sm text-fg transition-colors hover:text-accent"
            >
              {profile.email}
              <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="relative">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-muted">
              Navigate
            </p>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-fg/80 transition-colors hover:text-accent"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-muted">
              Elsewhere
            </p>
            <ul className="space-y-2">
              {socials.map((s) => {
                const Icon = iconFor(s.label);
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-fg/80 transition-colors hover:text-accent"
                    >
                      <Icon size={15} />
                      {s.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row">
          <p>© {profile.name}.</p>
          <p className="font-mono uppercase tracking-[0.2em]">
            Designed &amp; developed with care
          </p>
        </div>
      </div>
    </footer>
  );
}
