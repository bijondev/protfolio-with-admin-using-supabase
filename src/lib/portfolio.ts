import "server-only";
import { getPublicClient } from "@/lib/supabase/public";
import { siteConfig, stats as fallbackStats, experiences as fallbackExperiences, services as fallbackServices, skills as fallbackSkills, projects as fallbackProjects, testimonials as fallbackTestimonials } from "@/data/portfolio";
import type { PortfolioData } from "@/lib/types";

export const revalidate = 60;

function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );
}

function fallbackProfile(): PortfolioData["profile"] {
  return {
    id: 1,
    full_name: siteConfig.name,
    short_name: siteConfig.shortName,
    role: siteConfig.role,
    tagline: siteConfig.tagline,
    email: siteConfig.email,
    location: siteConfig.location,
    availability: siteConfig.availability,
    initials: siteConfig.initials,
    github_url: siteConfig.socials.github,
    linkedin_url: siteConfig.socials.linkedin,
    twitter_url: siteConfig.socials.twitter,
    website_url: siteConfig.socials.website,
    updated_at: new Date().toISOString(),
  };
}

export async function getPortfolioData(): Promise<PortfolioData> {
  if (!isSupabaseConfigured()) {
    return {
      profile: fallbackProfile(),
      stats: fallbackStats.map((s, i) => ({
        id: `fallback-stat-${i}`,
        label: s.label,
        value: s.value,
        sort_order: i,
      })),
      skills: fallbackSkills.map((s, i) => ({
        id: `fallback-skill-${i}`,
        name: s,
        sort_order: i,
      })),
      experience: fallbackExperiences.map((e, i) => ({
        id: `fallback-exp-${i}`,
        role: e.role,
        company: e.company,
        period: e.period,
        location: e.location,
        description: e.description,
        skills: e.skills,
        sort_order: i,
      })),
      services: fallbackServices.map((s, i) => ({
        id: `fallback-svc-${i}`,
        icon: s.icon,
        title: s.title,
        description: s.description,
        sort_order: i,
      })),
      projects: fallbackProjects.map((p, i) => ({
        id: `fallback-proj-${i}`,
        title: p.title,
        subtitle: p.subtitle,
        description: p.description,
        tags: p.tags,
        highlights: p.highlights,
        year: p.year,
        github_url: "",
        live_url: "",
        sort_order: i,
      })),
      testimonials: fallbackTestimonials.map((t, i) => ({
        id: `fallback-test-${i}`,
        quote: t.quote,
        name: t.name,
        role: t.role,
        initials: t.initials,
        sort_order: i,
      })),
    };
  }

  const supabase = getPublicClient();

  const [profileRes, statsRes, skillsRes, expRes, svcRes, projRes, testRes] =
    await Promise.all([
      supabase.from("profile").select("*").eq("id", 1).maybeSingle(),
      supabase.from("stats").select("*").order("sort_order"),
      supabase.from("skills").select("*").order("sort_order"),
      supabase.from("experience").select("*").order("sort_order"),
      supabase.from("services").select("*").order("sort_order"),
      supabase.from("projects").select("*").order("sort_order"),
      supabase.from("testimonials").select("*").order("sort_order"),
    ]);

  return {
    profile: profileRes.data ?? fallbackProfile(),
    stats: statsRes.data ?? [],
    skills: skillsRes.data ?? [],
    experience: expRes.data ?? [],
    services: svcRes.data ?? [],
    projects: projRes.data ?? [],
    testimonials: testRes.data ?? [],
  };
}
