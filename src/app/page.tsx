import dynamic from "next/dynamic";
import HomeHero from "@/components/home/HomeHero";
import FeaturedWorkSection from "@/components/home/FeaturedWorkSection";
import { getProjects } from "@/lib/getProjects";

const HomeProcess = dynamic(() => import("@/components/home/HomeProcess"));

export const revalidate = 60;

export default async function Home() {
  const projects = await getProjects(undefined, 4);
  return (
    <div className="flex flex-col gap-16 md:gap-32 pb-16 md:pb-24">
      {/* HERO SECTION */}
      <HomeHero />

      {/* FEATURED WORK */}
      <FeaturedWorkSection initialProjects={projects} />

      {/* CREATIVE PROCESS */}
      <HomeProcess />
    </div>
  );
}
