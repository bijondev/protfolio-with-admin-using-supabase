-- ============================================================================
-- Portfolio Database Schema
-- ============================================================================
-- Run this in Supabase SQL Editor: https://app.supabase.com/project/_/sql
-- ============================================================================

-- ============================================================================
-- 1. PROFILE (single row)
-- ============================================================================
create table if not exists public.profile (
  id integer primary key default 1 check (id = 1),
  full_name text not null default 'Your Name',
  short_name text not null default 'You',
  role text not null default 'Creative Web Developer & Designer',
  tagline text not null default 'Crafting engaging digital experiences.',
  email text not null default 'hello@example.com',
  location text not null default 'Your City, Country',
  availability text not null default 'Available for freelance',
  initials text not null default 'YN',
  github_url text default '',
  linkedin_url text default '',
  twitter_url text default '',
  website_url text default '',
  updated_at timestamptz default now()
);

insert into public.profile (id) values (1) on conflict (id) do nothing;

-- ============================================================================
-- 2. STATS
-- ============================================================================
create table if not exists public.stats (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value text not null,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

alter table public.stats enable row level security;
create policy "stats_public_read" on public.stats for select using (true);
create policy "stats_admin_all" on public.stats for all using (
  auth.role() = 'authenticated'
);

-- ============================================================================
-- 3. SKILLS
-- ============================================================================
create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

alter table public.skills enable row level security;
create policy "skills_public_read" on public.skills for select using (true);
create policy "skills_admin_all" on public.skills for all using (
  auth.role() = 'authenticated'
);

-- ============================================================================
-- 4. EXPERIENCE
-- ============================================================================
create table if not exists public.experience (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  company text not null,
  period text not null,
  location text not null default '',
  description text not null,
  skills text[] not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz default now()
);

alter table public.experience enable row level security;
create policy "experience_public_read" on public.experience for select using (true);
create policy "experience_admin_all" on public.experience for all using (
  auth.role() = 'authenticated'
);

-- ============================================================================
-- 5. SERVICES
-- ============================================================================
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  icon text not null default 'globe',
  title text not null,
  description text not null,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

alter table public.services enable row level security;
create policy "services_public_read" on public.services for select using (true);
create policy "services_admin_all" on public.services for all using (
  auth.role() = 'authenticated'
);

-- ============================================================================
-- 6. PROJECTS
-- ============================================================================
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text not null default '',
  description text not null,
  tags text[] not null default '{}',
  highlights text[] not null default '{}',
  year text not null default '',
  github_url text default '',
  live_url text default '',
  sort_order int not null default 0,
  created_at timestamptz default now()
);

alter table public.projects enable row level security;
create policy "projects_public_read" on public.projects for select using (true);
create policy "projects_admin_all" on public.projects for all using (
  auth.role() = 'authenticated'
);

-- ============================================================================
-- 7. TESTIMONIALS
-- ============================================================================
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  name text not null,
  role text not null,
  initials text not null,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

alter table public.testimonials enable row level security;
create policy "testimonials_public_read" on public.testimonials for select using (true);
create policy "testimonials_admin_all" on public.testimonials for all using (
  auth.role() = 'authenticated'
);

-- ============================================================================
-- 8. PROFILE RLS (the single-row table)
-- ============================================================================
alter table public.profile enable row level security;
create policy "profile_public_read" on public.profile for select using (true);
create policy "profile_admin_all" on public.profile for all using (
  auth.role() = 'authenticated'
);

-- ============================================================================
-- 9. SEED DATA (idempotent - safe to re-run)
-- ============================================================================
insert into public.stats (label, value, sort_order) values
  ('Years of experience', '5+', 0),
  ('Projects shipped', '40+', 1),
  ('Happy clients', '25+', 2),
  ('Technologies', '20+', 3)
on conflict do nothing;

insert into public.skills (name, sort_order) values
  ('React', 0), ('Next.js', 1), ('Vue.js', 2), ('TypeScript', 3),
  ('Tailwind CSS', 4), ('Django', 5), ('Laravel', 6), ('Node.js', 7),
  ('Python', 8), ('PHP', 9), ('React Native', 10), ('Android', 11),
  ('Kotlin', 12), ('Java', 13), ('Flutter', 14), ('PostgreSQL', 15),
  ('MongoDB', 16), ('Redis', 17), ('Docker', 18), ('AWS', 19),
  ('Firebase', 20), ('Git', 21), ('Figma', 22)
on conflict do nothing;

insert into public.experience (role, company, period, location, description, skills, sort_order) values
  ('Senior Full-Stack Developer', 'Freelance', '2023 — Present', 'Remote',
   'Leading end-to-end development of web and mobile applications for international clients.',
   array['React','Next.js','Django','PostgreSQL','AWS'], 0),
  ('Full-Stack Developer', 'Tech Studio', '2021 — 2023', 'Hybrid',
   'Built scalable SaaS products and e-commerce platforms. Led frontend architecture.',
   array['Vue.js','Laravel','React Native','Redis'], 1),
  ('Mobile Developer', 'AppForge', '2019 — 2021', 'On-site',
   'Developed and shipped 10+ Android applications in Kotlin and Java.',
   array['Kotlin','Java','Android','Firebase'], 2)
on conflict do nothing;

insert into public.services (icon, title, description, sort_order) values
  ('globe', 'Web Development', 'Modern, performant web applications built with React, Next.js, and Vue.', 0),
  ('mobile', 'Mobile Apps', 'Cross-platform mobile applications with React Native and native Android.', 1),
  ('server', 'Backend & APIs', 'Robust APIs with Django, Laravel, and Node.js.', 2),
  ('palette', 'UI / UX Design', 'Clean, conversion-focused interfaces in Figma.', 3),
  ('cart', 'E-Commerce', 'Full-stack online stores with payment integration.', 4),
  ('wrench', 'Consulting', 'Technical audits, architecture reviews, and stack migration.', 5)
on conflict do nothing;

insert into public.projects (title, subtitle, description, tags, highlights, year, sort_order) values
  ('Luminary', 'E-Commerce Platform',
   'A full-featured e-commerce platform with Stripe payments, inventory management, and an admin dashboard with real-time analytics.',
   array['Next.js','Django','PostgreSQL','Stripe'],
   array['10K+ monthly orders','99.9% uptime','40% conversion lift'],
   '2024', 0),
  ('Pulse', 'Social Network',
   'Real-time social platform with chat, stories, posts, and notifications.',
   array['React Native','Firebase','Node.js','Redis'],
   array['50K+ active users','Real-time messaging','Story reactions'],
   '2023', 1),
  ('Orbit', 'Project Management',
   'Collaborative project tool with Kanban boards, time tracking, and integrations with Slack and GitHub.',
   array['Vue.js','Laravel','MySQL','WebSockets'],
   array['200+ teams','Slack integration','Custom workflows'],
   '2023', 2),
  ('Reflex', 'AI Analytics',
   'Analytics platform with custom dashboards, automated reports, and AI-powered insights.',
   array['Next.js','TypeScript','Python','OpenAI'],
   array['AI insights','Custom reports','Team collaboration'],
   '2024', 3)
on conflict do nothing;

insert into public.testimonials (quote, name, role, initials, sort_order) values
  ('One of the most talented developers I''ve worked with. Delivered a complex SaaS platform on time, on budget, and with impeccable code quality.',
   'Sarah Chen', 'Product Lead, Tech Studio', 'SC', 0),
  ('Exceptional eye for design and detail. The mobile app exceeded our expectations and our users love it. Highly recommended.',
   'Marcus Rivera', 'CEO, AppForge', 'MR', 1),
  ('Bijon transformed our outdated platform into a modern, fast, and delightful experience. Our conversion rate jumped 40% in the first month.',
   'Aisha Patel', 'Founder, Luminary', 'AP', 2)
on conflict do nothing;
