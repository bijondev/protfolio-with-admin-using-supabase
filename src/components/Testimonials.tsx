import { Section } from "./Section";
import type { Testimonial } from "@/lib/types";

export function Testimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;
  return (
    <Section id="testimonials" number="06" title="Kind Words">
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((t) => (
          <figure
            key={t.id}
            className="flex flex-col rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 transition-colors hover:border-[var(--color-accent)]"
          >
            <svg
              className="mb-4 h-7 w-7 text-[var(--color-accent)]"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
            </svg>
            <blockquote className="mb-6 flex-1 text-sm leading-relaxed text-[var(--color-fg-muted)]">
              {t.quote}
            </blockquote>
            <figcaption className="flex items-center gap-3 border-t border-[var(--color-border)] pt-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent-soft)] font-semibold text-[var(--color-accent)]">
                {t.initials}
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--color-fg)]">{t.name}</div>
                <div className="text-xs text-[var(--color-fg-subtle)]">{t.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
