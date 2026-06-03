import { Section } from "./Section";
import type { Skill } from "@/lib/types";

export function Skills({ items }: { items: Skill[] }) {
  if (items.length === 0) return null;
  return (
    <Section id="skills" number="04" title="Skills & Tools">
      <p className="mb-8 text-[var(--color-fg-muted)]">
        Technologies and tools I work with on a regular basis. Always learning,
        always curious.
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((skill) => (
          <span
            key={skill.id}
            className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 font-mono text-sm text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </Section>
  );
}
