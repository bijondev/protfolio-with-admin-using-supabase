import { Section } from "./Section";
import { Icon } from "./Icon";
import type { Experience as ExperienceItem } from "@/lib/types";

export function Experience({ items }: { items: ExperienceItem[] }) {
  if (items.length === 0) return null;
  return (
    <Section id="experience" number="02" title="Where I've Worked">
      <div className="space-y-12">
        {items.map((exp) => (
          <article
            key={exp.id}
            className="group relative grid gap-4 md:grid-cols-[200px_1fr] md:gap-8"
          >
            <div className="text-sm text-[var(--color-fg-subtle)]">
              <div className="font-mono">{exp.period}</div>
              {exp.location && (
                <div className="mt-1 flex items-center gap-1.5">
                  <Icon name="map-pin" className="h-3 w-3" />
                  {exp.location}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-fg)]">
                {exp.role}{" "}
                <span className="text-[var(--color-accent)]">@ {exp.company}</span>
              </h3>
              <p className="mt-3 text-[var(--color-fg-muted)]">{exp.description}</p>
              {exp.skills.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1 font-mono text-xs text-[var(--color-fg-muted)]"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
