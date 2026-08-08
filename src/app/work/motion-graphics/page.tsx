import { WorkContent } from "@/components/work/WorkContent";
import { getProjects } from "@/lib/getProjects";

export const revalidate = 60;

export default async function MotionGraphicsPage() {
  const projects = await getProjects();
  return <WorkContent activeCategory="Motion Graphics" projects={projects} />;
}
