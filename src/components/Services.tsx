import { Section } from "./Section";
import { Icon, type IconName } from "./Icon";
import type { Service } from "@/lib/types";

export function Services({ items }: { items: Service[] }) {
  if (items.length === 0) return null;
  return (
    <Section id="services" number="03" title="What I Do">
      <div className="grid gap-px overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2">
        {items.map((s) => (
          <div
            key={s.id}
            className="group relative bg-[var(--color-bg)] p-6 transition-colors hover:bg-[var(--color-bg-alt)]"
          >
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--color-border)] text-[var(--color-accent)] transition-colors group-hover:border-[var(--color-accent)]">
              <Icon name={(s.icon as IconName) || "globe"} className="h-5 w-5" />
            </div>
            <h3 className="mb-2 font-semibold text-[var(--color-fg)]">{s.title}</h3>
            <p className="text-sm leading-relaxed text-[var(--color-fg-muted)]">
              {s.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
