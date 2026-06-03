import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, number, title, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 border-t border-[var(--color-border)] py-20 md:py-28 ${className}`}
    >
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-10 flex items-baseline gap-4">
          <span className="font-mono text-sm font-medium text-[var(--color-accent)]">
            {number}
          </span>
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-fg)] md:text-3xl">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
