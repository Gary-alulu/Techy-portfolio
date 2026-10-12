import connectToDatabase from "@/lib/mongodb";
import Setting from "@/models/Setting";

export interface SiteSettings {
  priorityCategory: string;
}

export async function getSettings(): Promise<SiteSettings | null> {
  const fetchPromise = (async (): Promise<SiteSettings | null> => {
    try {
      await connectToDatabase();
      const setting = await Setting.findOne().lean();
      return { priorityCategory: (setting as any)?.priorityCategory || "" };
    } catch (error) {
      console.error("Failed to fetch settings from database:", error);
      return null;
    }
  })();

  // Bounded timeout so build/render never hangs on slow DB connections,
  // while still giving cold serverless connections time to complete.
  const timeoutPromise = new Promise<null>((resolve) => {
    setTimeout(() => resolve(null), 4000);
  });

  return Promise.race([fetchPromise, timeoutPromise]);
}
