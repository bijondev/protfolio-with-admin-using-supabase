"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signIn } from "@/app/admin/(authed)/_actions/auth";
import { Icon } from "@/components/Icon";

type State = { error?: string } | null;

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction] = useActionState<State, FormData>(
    async (_prev, formData) => {
      formData.set("redirect", redirectTo);
      const result = await signIn(formData);
      return result || null;
    },
    null
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-[var(--color-accent)] to-rose-300 font-bold text-[var(--color-accent-fg)]">
            A
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Admin Login</h1>
            <p className="text-sm text-[var(--color-fg-muted)]">
              Sign in to manage your portfolio
            </p>
          </div>
        </div>

        <form action={formAction} className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Email</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Password</span>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
            />
          </label>

          {state?.error && (
            <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
              <Icon name="close" className="h-4 w-4 shrink-0" />
              {state.error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-md bg-[var(--color-accent)] px-4 py-2.5 text-sm font-medium text-[var(--color-accent-fg)] transition-colors hover:opacity-90"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[var(--color-fg-subtle)]">
          <Link href="/" className="hover:text-[var(--color-accent)]">
            ← Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}
