import { Sidebar } from "@/components/Sidebar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Services } from "@/components/Services";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { getPortfolioData } from "@/lib/portfolio";

export const revalidate = 60;

export default async function Home() {
  const data = await getPortfolioData();

  return (
    <div className="mx-auto flex max-w-7xl">
      <Sidebar profile={data.profile} />
      <main className="min-w-0 flex-1">
        <Hero profile={data.profile} />
        <About profile={data.profile} stats={data.stats} />
        <Experience items={data.experience} />
        <Services items={data.services} />
        <Skills items={data.skills} />
        <Projects items={data.projects} />
        <Testimonials items={data.testimonials} />
        <Contact profile={data.profile} />
      </main>
    </div>
  );
}
