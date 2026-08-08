import HeroSection from "@/components/services/HeroSection";
import ServicesClientWrapper from "@/components/services/ServicesClientWrapper";
import FAQs from "@/components/services/FAQs";
import FinalCTA from "@/components/services/FinalCTA";
import { getProjects } from "@/lib/getProjects";

export type ServiceType = "uiux" | "frontend" | "graphic" | "motion";
export const revalidate = 60;

export default async function ServicesPage() {
  const projects = await getProjects();
  return (
    <div className="pb-24 pt-32">
      <HeroSection />
      <ServicesClientWrapper initialProjects={projects} />
      <FAQs />
      <FinalCTA />
    </div>
  );
}
