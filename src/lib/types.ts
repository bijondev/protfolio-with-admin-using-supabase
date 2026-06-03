export type Profile = {
  id: number;
  full_name: string;
  short_name: string;
  role: string;
  tagline: string;
  email: string;
  location: string;
  availability: string;
  initials: string;
  github_url: string;
  linkedin_url: string;
  twitter_url: string;
  website_url: string;
  updated_at: string;
};

export type Stat = {
  id: string;
  label: string;
  value: string;
  sort_order: number;
};

export type Skill = {
  id: string;
  name: string;
  sort_order: number;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  skills: string[];
  sort_order: number;
};

export type Service = {
  id: string;
  icon: string;
  title: string;
  description: string;
  sort_order: number;
};

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  highlights: string[];
  year: string;
  github_url: string;
  live_url: string;
  sort_order: number;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  initials: string;
  sort_order: number;
};

export type PortfolioData = {
  profile: Profile;
  stats: Stat[];
  skills: Skill[];
  experience: Experience[];
  services: Service[];
  projects: Project[];
  testimonials: Testimonial[];
};
