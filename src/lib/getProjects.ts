import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";

export async function getProjects(category?: string, limit?: number) {
  try {
    await connectToDatabase();
    const query: any = { isDraft: false };
    if (category && category !== "All") {
      query.category = category;
    }
    let dbQuery = Project.find(query).sort({ createdAt: -1 });
    if (limit) {
      dbQuery = dbQuery.limit(limit);
    }
    const projects = await dbQuery.lean();
    return projects.map((p: any) => ({
      ...p,
      _id: p._id.toString(),
    }));
  } catch (error) {
    console.error("Failed to fetch projects from database:", error);
    return [];
  }
}
