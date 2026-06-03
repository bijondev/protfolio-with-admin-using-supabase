import Link from "next/link";
import { getPortfolioData } from "@/lib/portfolio";
import { adminNav } from "./_components/AdminShell";
import { Icon, type IconName } from "@/components/Icon";

export default async function AdminOverview() {
  let data;
  let dbConnected = false;
  let dbError: string | null = null;

  try {
    data = await getPortfolioData();
    dbConnected = true;
  } catch (err) {
    dbError = err instanceof Error ? err.message : "Unknown error";
    data = null;
  }

  const counts = data
    ? {
        stats: data.stats.length,
        experience: data.experience.length,
        services: data.services.length,
        skills: data.skills.length,
        projects: data.projects.length,
        testimonials: data.testimonials.length,
      }
    : null;

  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold tracking-tight">Overview</h1>
      <p className="mb-8 text-sm text-[var(--color-fg-muted)]">
        Manage your portfolio content. Changes appear on the public site within
        60 seconds (or instantly via on-demand revalidation).
      </p>

      {!dbConnected && (
        <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
          <p className="font-medium">Database not connected</p>
          <p className="mt-1 text-xs">
            {dbError ||
              "Supabase environment variables not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local, then run the SQL migration in supabase/migrations/0001_init.sql."}
          </p>
        </div>
      )}

      {counts && (
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {Object.entries(counts).map(([key, value]) => (
            <div
              key={key}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4"
            >
              <div className="text-2xl font-bold">{value}</div>
              <div className="text-xs capitalize text-[var(--color-fg-muted)]">
                {key}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {adminNav
          .filter((item) => item.href !== "/admin")
          .map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5 transition-colors hover:border-[var(--color-accent)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-border)] text-[var(--color-accent)]">
                  <Icon name={item.icon as IconName} className="h-4 w-4" />
                </div>
                <span className="font-medium">{item.label}</span>
              </div>
              <Icon
                name="arrow-right"
                className="h-4 w-4 text-[var(--color-fg-subtle)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--color-accent)]"
              />
            </Link>
          ))}
      </div>
    </div>
  );
}
