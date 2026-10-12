import dynamic from "next/dynamic";
import HomeHero from "@/components/home/HomeHero";
import FeaturedWorkSection from "@/components/home/FeaturedWorkSection";
import PortfolioPopup from "@/components/home/PortfolioPopup";
import { getProjects } from "@/lib/getProjects";
import { getSettings } from "@/lib/getSettings";

const HomeProcess = dynamic(() => import("@/components/home/HomeProcess"));

export const revalidate = 60;

export default async function Home() {
  const settings = await getSettings();
  const priorityCategory = settings?.priorityCategory || "";

  let projects = priorityCategory
    ? await getProjects(priorityCategory, 4, undefined, "Print Media")
    : [];
  if (projects.length === 0) {
    projects = await getProjects(undefined, 4, undefined, "Print Media");
  }

  return (
    <div className="flex flex-col gap-16 md:gap-32 pb-16 md:pb-24">
      {/* HERO SECTION */}
      <HomeHero />

      {/* FEATURED WORK */}
      <FeaturedWorkSection
        initialProjects={projects.length > 0 ? projects : undefined}
        priorityCategory={priorityCategory}
      />

      {/* CREATIVE PROCESS */}
      <HomeProcess />

      {/* PORTFOLIO DOWNLOAD POPUP */}
      <PortfolioPopup />
    </div>
  );
}
