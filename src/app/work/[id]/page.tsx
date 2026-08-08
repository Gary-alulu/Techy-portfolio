import { ProjectDetail } from "@/components/work/ProjectDetail";
import { notFound } from "next/navigation";
import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";

export const dynamic = "force-dynamic";

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  
  try {
    await connectToDatabase();
    const project = await Project.findOne({ slug: resolvedParams.id }).lean();
    
    if (!project) {
      notFound();
    }

    const serializedProject = {
      ...(project as any),
      _id: (project as any)._id.toString()
    };

    return <ProjectDetail project={serializedProject} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
}
