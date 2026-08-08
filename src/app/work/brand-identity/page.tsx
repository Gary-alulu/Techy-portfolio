import { WorkContent } from "@/components/work/WorkContent";
import { getProjects } from "@/lib/getProjects";

export const revalidate = 60;

export default async function BrandIdentityPage() {
  const projects = await getProjects();
  return <WorkContent activeCategory="Brand Identity" projects={projects} />;
}
