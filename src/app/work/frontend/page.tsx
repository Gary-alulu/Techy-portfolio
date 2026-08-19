import { WorkContent } from "@/components/work/WorkContent";
import { getProjects } from "@/lib/getProjects";

export const revalidate = 60;

export default async function FrontendPage() {
  const projects = await getProjects();
  return <WorkContent activeCategory="Front End Design" projects={projects.length > 0 ? projects : undefined} />;
}
