import { WorkContent } from "@/components/work/WorkContent";
import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";

export const metadata = {
  title: "Work",
  description: "Explore my portfolio of premium digital products, UI/UX designs, and brand identities.",
};

export const dynamic = "force-dynamic";

export default async function WorkPage() {
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

  return <WorkContent activeCategory="All" projects={fetchedProjects} />;
}
