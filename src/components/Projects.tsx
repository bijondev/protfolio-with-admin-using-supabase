import { Section } from "./Section";
import { Icon } from "./Icon";
import type { Project } from "@/lib/types";

export function Projects({ items }: { items: Project[] }) {
  if (items.length === 0) return null;
  return (
    <Section id="projects" number="05" title="Some Things I've Built">
      <div className="space-y-20">
        {items.map((project, i) => (
          <article
            key={project.id}
            className="grid items-center gap-6 md:grid-cols-12 md:gap-8"
          >
            <div
              className={`relative aspect-video overflow-hidden rounded-md bg-gradient-to-br from-[var(--color-accent)] to-orange-300 md:col-span-7 ${
                i % 2 === 1 ? "md:order-2" : ""
              }`}
            >
              <div className="absolute inset-0 flex items-center justify-center font-mono text-2xl text-white/80 md:text-3xl">
                {project.title}
              </div>
            </div>
            <div
              className={`md:col-span-5 ${i % 2 === 1 ? "md:order-1 md:text-right" : ""}`}
            >
              <p className="mb-1 font-mono text-xs text-[var(--color-accent)]">
                Featured Project
              </p>
              <h3 className="mb-3 text-xl font-semibold text-[var(--color-fg)]">
                {project.subtitle || project.title}
              </h3>
              <div
                className={`mb-5 rounded-md bg-[var(--color-bg-elevated)] p-5 text-sm leading-relaxed text-[var(--color-fg-muted)] shadow-sm ring-1 ring-[var(--color-border)] ${
                  i % 2 === 1 ? "md:text-left" : ""
                }`}
              >
                {project.description}
              </div>
              {project.tags.length > 0 && (
                <ul
                  className={`mb-3 flex flex-wrap gap-2 font-mono text-xs text-[var(--color-fg-subtle)] ${
                    i % 2 === 1 ? "md:justify-start" : ""
                  }`}
                >
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              )}
              <div
                className={`flex items-center gap-4 ${
                  i % 2 === 1 ? "md:justify-start" : ""
                }`}
              >
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-accent)]"
                    aria-label="GitHub repository"
                  >
                    <Icon name="github" className="h-5 w-5" />
                  </a>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-accent)]"
                    aria-label="External link"
                  >
                    <Icon name="arrow-up-right" className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
