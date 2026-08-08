import dynamic from "next/dynamic";
import HomeHero from "@/components/home/HomeHero";
import FeaturedWorkSection from "@/components/home/FeaturedWorkSection";

// Dynamically import the heavy process component to defer loading
const HomeProcess = dynamic(() => import("@/components/home/HomeProcess"));

export default function Home() {
  return (
    <div className="flex flex-col gap-16 md:gap-32 pb-16 md:pb-24">
      {/* HERO SECTION */}
      <HomeHero />

      {/* FEATURED WORK - fetches data client-side */}
      <FeaturedWorkSection />

      {/* CREATIVE PROCESS */}
      <HomeProcess />
    </div>
  );
}
