"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { Icon } from "./Icon";
import type { Profile } from "@/lib/types";

const subscribe = () => () => {};
const getServerSnapshot = () => false;
const getClientSnapshot = (): boolean => {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
};

const navItems = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#services", label: "Services" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export function Sidebar({ profile }: { profile: Profile }) {
  const [activeSection, setActiveSection] = useState("about");
  const [mobileOpen, setMobileOpen] = useState(false);
  const dark = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefersDark;
    if (document.documentElement.classList.contains("dark") !== isDark) {
      document.documentElement.classList.toggle("dark", isDark);
    }
  }, []);

  function toggleDark() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  useEffect(() => {
    const sections = navItems.map((n) => n.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const socials = [
    { href: profile.github_url, label: "GitHub", icon: "github" as const },
    { href: profile.linkedin_url, label: "LinkedIn", icon: "linkedin" as const },
    { href: profile.twitter_url, label: "Twitter", icon: "twitter" as const },
  ].filter((s) => s.href);

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elevated)] text-[var(--color-fg)] shadow-sm md:hidden"
        aria-label="Open menu"
      >
        <Icon name="menu" className="h-5 w-5" />
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-[var(--color-border)] bg-[var(--color-bg)] transition-transform duration-300 md:sticky md:top-0 md:flex md:h-screen md:w-72 md:flex-col md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto px-8 py-10">
          <div className="mb-10 flex items-start justify-between">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-accent)] to-rose-300 font-semibold text-[var(--color-accent-fg)] shadow-sm">
              {profile.initials}
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden text-[var(--color-fg-muted)]"
              aria-label="Close menu"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>

          <h1 className="mb-2 text-lg font-semibold tracking-tight text-[var(--color-fg)]">
            {profile.full_name}
          </h1>
          <p className="mb-1 text-sm font-medium text-[var(--color-accent)]">
            {profile.role}
          </p>
          <div className="mb-8 flex items-center gap-1.5 text-xs text-[var(--color-fg-subtle)]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            {profile.availability}
          </div>

          <nav className="mb-8 flex-1">
            <ul className="space-y-1">
              {navItems.map((link, i) => {
                const id = link.href.slice(1);
                const isActive = activeSection === id;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "text-[var(--color-accent)]"
                          : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                      }`}
                    >
                      <span className="font-mono text-xs text-[var(--color-fg-subtle)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{link.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {socials.length > 0 && (
            <div className="mb-6 flex items-center gap-4">
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
              <a
                href={`mailto:${profile.email}`}
                className="text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-accent)]"
                aria-label="Email"
              >
                <Icon name="mail" className="h-5 w-5" />
              </a>
            </div>
          )}

          <button
            onClick={toggleDark}
            className="flex items-center gap-2 self-start rounded-md border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            aria-label="Toggle theme"
          >
            <Icon name={dark ? "sun" : "moon"} className="h-3.5 w-3.5" />
            <span>{dark ? "Light" : "Dark"}</span>
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
