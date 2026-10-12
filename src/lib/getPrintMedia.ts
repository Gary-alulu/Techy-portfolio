import connectToDatabase from "@/lib/mongodb";
import PrintMedia from "@/models/PrintMedia";

export async function getPrintMedia(): Promise<any[]> {
  const fetchPromise = (async () => {
    try {
      await connectToDatabase();
      const items = await PrintMedia.find()
        .sort({ order: 1, createdAt: 1 })
        .maxTimeMS(2000)
        .lean();
      return items.map((item: any) => ({
        ...item,
        _id: item._id.toString(),
      }));
    } catch (error) {
      console.error("Failed to fetch print media from database:", error);
      return [];
    }
  })();

  // Strict timeout so build/render NEVER hangs on slow DB connections.
  const timeoutPromise = new Promise<any[]>((resolve) => {
    setTimeout(() => resolve([]), 1000);
  });

  return Promise.race([fetchPromise, timeoutPromise]);
}
