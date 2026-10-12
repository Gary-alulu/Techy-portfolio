import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";

export async function getProjects(category?: string, limit?: number, subCategory?: string, excludeSubCategory?: string): Promise<any[]> {
  const fetchPromise = (async () => {
    try {
      await connectToDatabase();
      const conditions: any[] = [{ isDraft: false }];
      if (category && category !== "All") {
        conditions.push({ category });
      }
      if (subCategory && subCategory !== "All") {
        conditions.push({ subCategory });
      }
      if (excludeSubCategory) {
        conditions.push({ subCategory: { $ne: excludeSubCategory } });
      }
      let dbQuery = Project.find({ $and: conditions }).sort({ createdAt: -1 });
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
  })();

  // Bounded timeout so build/render never hangs on slow DB connections,
  //   while still giving cold serverless connections time to complete.
  //   Client components can always refetch real data from /api/projects.
  const timeoutPromise = new Promise<any[]>((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 4000);
  });

  return Promise.race([fetchPromise, timeoutPromise]);
}
