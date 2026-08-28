import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";

export async function getProjects(category?: string, limit?: number, subCategory?: string): Promise<any[]> {
  const fetchPromise = (async () => {
    try {
      await connectToDatabase();
      const query: any = { isDraft: false };
      if (category && category !== "All") {
        query.category = category;
      }
      if (subCategory && subCategory !== "All") {
        query.subCategory = subCategory;
      }
      let dbQuery = Project.find(query).sort({ createdAt: -1 });
      if (limit) {
        dbQuery = dbQuery.limit(limit);
      }
      const projects = await dbQuery.maxTimeMS(2000).lean();
      return projects.map((p: any) => ({
        ...p,
        _id: p._id.toString(),
      }));
    } catch (error) {
      console.error("Failed to fetch projects from database:", error);
      return [];
    }
  })();

  // 2.5s strict timeout so build/render NEVER hangs
  const timeoutPromise = new Promise<any[]>((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 2500);
  });

  return Promise.race([fetchPromise, timeoutPromise]);
}
