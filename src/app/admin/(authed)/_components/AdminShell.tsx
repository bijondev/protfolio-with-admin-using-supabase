import Link from "next/link";
import { signOut } from "@/app/admin/(authed)/_actions/auth";
import { Icon, type IconName } from "@/components/Icon";

export const adminNav = [
  { href: "/admin", label: "Overview", icon: "globe" as IconName },
  { href: "/admin/profile", label: "Profile", icon: "briefcase" as IconName },
  { href: "/admin/stats", label: "Stats", icon: "check" as IconName },
  { href: "/admin/experience", label: "Experience", icon: "briefcase" as IconName },
  { href: "/admin/services", label: "Services", icon: "server" as IconName },
  { href: "/admin/skills", label: "Skills", icon: "wrench" as IconName },
  { href: "/admin/projects", label: "Projects", icon: "cart" as IconName },
  { href: "/admin/testimonials", label: "Testimonials", icon: "mail" as IconName },
];

export function AdminShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-fg)]">
      <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-[var(--color-accent)] to-rose-300 font-bold text-[var(--color-accent-fg)] text-sm">
              A
            </div>
            <span className="font-semibold tracking-tight">Admin</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-accent)]"
            >
              View site ↗
            </Link>
            <span className="hidden text-sm text-[var(--color-fg-subtle)] sm:inline">
              {email}
            </span>
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-8 px-6 py-10">
        <aside className="hidden w-56 shrink-0 md:block">
          <nav className="sticky top-24 space-y-1">
            {adminNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-[var(--color-fg-muted)] transition-colors hover:bg-[var(--color-bg-alt)] hover:text-[var(--color-fg)]"
              >
                <Icon name={item.icon} className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
