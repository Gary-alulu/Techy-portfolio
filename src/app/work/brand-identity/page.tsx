import { WorkContent } from "@/components/work/WorkContent";
import { getProjects } from "@/lib/getProjects";
import { getPrintMedia } from "@/lib/getPrintMedia";

export const revalidate = 60;

export default async function BrandIdentityPage() {
  const [projects, printMedia] = await Promise.all([
    getProjects(),
    getPrintMedia(),
  ]);
  return (
    <WorkContent
      activeCategory="Brand Identity"
      projects={projects.length > 0 ? projects : undefined}
      initialPrintMedia={printMedia}
    />
  );
}
