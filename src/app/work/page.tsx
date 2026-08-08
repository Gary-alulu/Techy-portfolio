import { WorkContent } from "@/components/work/WorkContent";
import { getProjects } from "@/lib/getProjects";

export const metadata = {
  title: "Work",
  description: "Explore my portfolio of premium digital products, UI/UX designs, and brand identities.",
};

export const revalidate = 60;

export default async function WorkPage() {
  const projects = await getProjects();
  return <WorkContent activeCategory="All" projects={projects} />;
}
