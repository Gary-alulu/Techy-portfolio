import HeroSection from "@/components/services/HeroSection";
import ServicesClientWrapper from "@/components/services/ServicesClientWrapper";
import FAQs from "@/components/services/FAQs";
import FinalCTA from "@/components/services/FinalCTA";

export type ServiceType = "uiux" | "frontend" | "graphic" | "motion";

export default function ServicesPage() {
  return (
    <div className="pb-24 pt-32">
      <HeroSection />
      <ServicesClientWrapper />
      <FAQs />
      <FinalCTA />
    </div>
  );
}
