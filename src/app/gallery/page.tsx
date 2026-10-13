import BentoGallery from "@/components/gallery/BentoGallery";
import { getProjects } from "@/lib/getProjects";

export const revalidate = 60;

export default async function GalleryPage() {
  const projects = await getProjects();

  return (
    <div className="bg-black pt-16">
      <BentoGallery projects={projects} />
    </div>
  );
}