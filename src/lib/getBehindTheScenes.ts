import connectToDatabase from "@/lib/mongodb";
import BehindTheScenes from "@/models/BehindTheScenes";
import BTSMediaItem from "@/models/BTSMediaItem";

export interface BTSMedia {
  _id: string;
  bts_id: string;
  media_url: string;
  media_type: "image" | "video";
  caption: string | null;
  display_order: number;
}

export interface BehindTheScenesItem {
  _id: string;
  category: string;
  title: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  cover_image: string | null;
  published: boolean;
  display_order: number;
  media: BTSMedia[];
}

export async function getBehindTheScenes(): Promise<BehindTheScenesItem[]> {
  const fetchPromise = (async () => {
    try {
      await connectToDatabase();
      const items = await BehindTheScenes.find({ published: true })
        .sort({ display_order: 1 })
        .lean();

      if (items.length === 0) return [];

      const ids = items.map((i: any) => i._id);
      const media = await BTSMediaItem.find({ bts_id: { $in: ids } })
        .sort({ display_order: 1 })
        .lean();

      return items.map((i: any) => ({
        _id: i._id.toString(),
        category: i.category,
        title: i.title,
        slug: i.slug,
        short_description: i.short_description || null,
        description: i.description || null,
        cover_image: i.cover_image || null,
        published: i.published,
        display_order: i.display_order,
        media: media
          .filter((m: any) => m.bts_id.toString() === i._id.toString())
          .map((m: any) => ({
            _id: m._id.toString(),
            bts_id: m.bts_id.toString(),
            media_url: m.media_url,
            media_type: m.media_type,
            caption: m.caption || null,
            display_order: m.display_order,
          })),
      }));
    } catch (error) {
      console.error("Failed to fetch Behind The Scenes from database:", error);
      return [];
    }
  })();

  const timeoutPromise = new Promise<BehindTheScenesItem[]>((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 1000);
  });

  return Promise.race([fetchPromise, timeoutPromise]);
}
