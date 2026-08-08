import { WorkContent } from "@/components/work/WorkContent";
import { getProjects } from "@/lib/getProjects";

export const revalidate = 60;

export default async function UiUxPage() {
  const projects = await getProjects();
  return <WorkContent activeCategory="UI/UX Design" projects={projects} />;
}
