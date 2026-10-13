import connectToDatabase from "@/lib/mongodb";
import PrintMedia from "@/models/PrintMedia";

export async function getPrintMedia(): Promise<any[]> {
  const fetchPromise = (async () => {
    try {
      await connectToDatabase();
      const items = await PrintMedia.find()
        .sort({ order: 1, createdAt: 1 })
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

  // Bounded timeout so build/render never hangs on slow DB connections,
  //   while still giving cold serverless connections time to complete.
  const timeoutPromise = new Promise<any[]>((resolve) => {
    setTimeout(() => resolve([]), 4000);
  });

  return Promise.race([fetchPromise, timeoutPromise]);
}
