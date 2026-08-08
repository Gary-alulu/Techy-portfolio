import HeroSection from "@/components/services/HeroSection";
import ServicesClientWrapper from "@/components/services/ServicesClientWrapper";
import FAQs from "@/components/services/FAQs";
import FinalCTA from "@/components/services/FinalCTA";
import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";

export type ServiceType = "uiux" | "frontend" | "graphic" | "motion";
export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  let fetchedProjects: any[] = [];
  try {
    await connectToDatabase();
    const projects = await Project.find({ isDraft: false }).sort({ createdAt: -1 }).lean();
    fetchedProjects = projects.map((p: any) => ({
      ...p,
      _id: p._id.toString(),
    }));
  } catch (error) {
    console.error("Database connection failed:", error);
  }

  return (
    <div className="pb-24 pt-32">
      <HeroSection />
      <ServicesClientWrapper initialProjects={fetchedProjects} />
      <FAQs />
      <FinalCTA />
    </div>
  );
}
