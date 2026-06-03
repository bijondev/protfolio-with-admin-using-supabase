import { Section } from "./Section";
import { Icon } from "./Icon";
import type { Profile, Stat } from "@/lib/types";

export function About({ profile, stats }: { profile: Profile; stats: Stat[] }) {
  const recentTech = [
    "TypeScript",
    "Next.js",
    "Django",
    "PostgreSQL",
    "React Native",
    "Tailwind CSS",
  ];

  return (
    <Section id="about" number="01" title="About Me">
      <div className="grid gap-12 md:grid-cols-5">
        <div className="md:col-span-3 space-y-4 text-base leading-relaxed text-[var(--color-fg-muted)]">
          <p>
            Hello! I&apos;m {profile.short_name}, a passionate developer based in{" "}
            {profile.location}. My journey into web development started back in
            2018 when I built my first HTML page — turns out hacking together a
            custom site taught me a lot about code.
          </p>
          <p>
            Fast-forward to today, and I&apos;ve had the privilege of working with
            startups, agencies, and founders to ship products used by thousands of
            people. My main focus these days is building accessible,
            inclusive products and digital experiences for a variety of clients.
          </p>
          <p>
            I believe great software sits at the intersection of{" "}
            <span className="text-[var(--color-accent)]">design</span>,{" "}
            <span className="text-[var(--color-accent)]">engineering</span>, and{" "}
            <span className="text-[var(--color-accent)]">empathy</span>. When
            I&apos;m not coding, you&apos;ll find me exploring new coffee shops,
            reading design blogs, or contributing to open source.
          </p>
          <p className="pt-2">
            Here are a few technologies I&apos;ve been working with recently:
          </p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2 font-mono text-sm">
            {recentTech.map((tech) => (
              <li
                key={tech}
                className="flex items-center gap-2 text-[var(--color-fg-muted)]"
              >
                <Icon name="arrow-up-right" className="h-3.5 w-3.5 text-[var(--color-accent)]" />
                {tech}
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-md bg-gradient-to-br from-[var(--color-accent)] via-rose-400 to-orange-300">
            <div className="absolute inset-0 flex items-center justify-center text-7xl font-bold text-white/90">
              {profile.initials}
            </div>
          </div>
        </div>
      </div>

      {stats.length > 0 && (
        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.id}
              className="bg-[var(--color-bg)] p-6 transition-colors hover:bg-[var(--color-bg-alt)]"
            >
              <div className="mb-1 text-3xl font-bold tracking-tight text-[var(--color-fg)] md:text-4xl">
                {s.value}
              </div>
              <div className="text-sm text-[var(--color-fg-muted)]">{s.label}</div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
