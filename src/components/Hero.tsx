import { Icon } from "./Icon";
import type { Profile } from "@/lib/types";

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="min-h-[calc(100vh-1px)] flex flex-col justify-center py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <p className="mb-6 font-mono text-sm text-[var(--color-accent)]">
          Hi, my name is
        </p>
        <h1 className="mb-3 text-5xl font-bold tracking-tight text-[var(--color-fg)] md:text-6xl lg:text-7xl">
          {profile.short_name}.
        </h1>
        <h2 className="mb-6 text-4xl font-bold tracking-tight text-[var(--color-fg-muted)] md:text-5xl lg:text-6xl">
          I build things for the web.
        </h2>
        <p className="mb-10 max-w-xl text-base leading-relaxed text-[var(--color-fg-muted)] md:text-lg">
          {profile.tagline} Currently focused on building accessible,
          human-centered products at the intersection of design and engineering.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-md border border-[var(--color-accent)] px-6 py-3 text-sm font-medium text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent-soft)]"
          >
            Check out my work
            <Icon
              name="arrow-right"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-md px-2 py-3 text-sm font-medium text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-accent)]"
          >
            <Icon name="mail" className="h-4 w-4" />
            {profile.email}
          </a>
        </div>
      </div>
    </section>
  );
}
