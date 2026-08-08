import Link from "next/link";
import { Plus } from "lucide-react";
import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";

export const revalidate = 0; // Never cache the admin page

export default async function AdminProjects() {
  let projects: any[] = [];
  try {
    await connectToDatabase();
    projects = await Project.find().sort({ createdAt: -1 }).lean();
  } catch (e) {
    console.error("No DB connection yet");
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Link 
          href="/admin/projects/new" 
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-neutral-200 transition-colors"
        >
          <Plus className="w-4 h-4" /> New Project
        </Link>
      </div>

      <div className="bg-neutral-900 border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-neutral-950 border-b border-white/10 text-sm text-[var(--color-secondary)]">
            <tr>
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {projects.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-[var(--color-secondary)]">
                  No projects found. Check database connection.
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project._id.toString()} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium">{project.title}</td>
                  <td className="px-6 py-4 text-[var(--color-secondary)]">{project.category}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${project.isDraft ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'}`}>
                      {project.isDraft ? "Draft" : "Published"}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <Link href={`/admin/projects/${project._id}`} className="text-[var(--color-accent-orange)] hover:underline">Edit</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
