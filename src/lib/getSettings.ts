import connectToDatabase from "@/lib/mongodb";
import Setting from "@/models/Setting";

export interface SiteSettings {
  priorityCategory: string;
}

export async function getSettings(): Promise<SiteSettings | null> {
  const fetchPromise = (async (): Promise<SiteSettings | null> => {
    try {
      await connectToDatabase();
      const setting = await Setting.findOne().maxTimeMS(2000).lean();
      return { priorityCategory: (setting as any)?.priorityCategory || "" };
    } catch (error) {
      console.error("Failed to fetch settings from database:", error);
      return null;
    }
  })();

  // Strict timeout so build/render NEVER hangs on slow DB connections.
  const timeoutPromise = new Promise<null>((resolve) => {
    setTimeout(() => resolve(null), 1000);
  });

  return Promise.race([fetchPromise, timeoutPromise]);
}
