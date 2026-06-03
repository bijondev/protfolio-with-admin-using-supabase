import { Section } from "./Section";
import { Icon } from "./Icon";
import type { Profile } from "@/lib/types";

export function Contact({ profile }: { profile: Profile }) {
  const socials = [
    { href: profile.github_url, label: "GitHub", icon: "github" as const },
    { href: profile.linkedin_url, label: "LinkedIn", icon: "linkedin" as const },
    { href: profile.twitter_url, label: "Twitter", icon: "twitter" as const },
  ].filter((s) => s.href);

  return (
    <Section id="contact" number="07" title="Get In Touch">
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-8 md:p-10">
        <p className="mb-6 max-w-xl text-[var(--color-fg-muted)]">
          I&apos;m currently {profile.availability.toLowerCase()}. Whether you
          have a question, a project idea, or just want to say hi — my inbox is
          always open. I&apos;ll do my best to get back to you.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="group inline-flex items-center gap-2 rounded-md border border-[var(--color-accent)] px-6 py-3 text-sm font-medium text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent-soft)]"
        >
          Say Hello
          <Icon
            name="arrow-right"
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
          />
        </a>
      </div>

      <footer className="mt-20 flex flex-col items-center gap-4 border-t border-[var(--color-border)] pt-8">
        {socials.length > 0 && (
          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-accent)]"
                aria-label={s.label}
              >
                <Icon name={s.icon} className="h-5 w-5" />
              </a>
            ))}
          </div>
        )}
        <p className="font-mono text-xs text-[var(--color-fg-subtle)]">
          Designed &amp; built by {profile.short_name} · {new Date().getFullYear()}
        </p>
      </footer>
    </Section>
  );
}
