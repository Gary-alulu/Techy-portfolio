import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/mongodb";
import BehindTheScenes from "@/models/BehindTheScenes";
import BTSMediaItem from "@/models/BTSMediaItem";

const CATEGORIES = ["workspace", "sketches", "wireframes", "moodboards"];

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();

    if (!data.title || !data.slug) {
      return NextResponse.json(
        { success: false, error: "Title and slug are required fields." },
        { status: 400 }
      );
    }

    if (data.category && !CATEGORIES.includes(data.category)) {
      return NextResponse.json(
        {
          success: false,
          error: `Category must be one of: ${CATEGORIES.join(", ")}.`,
        },
        { status: 400 }
      );
    }

    const item = await BehindTheScenes.create({
      category: data.category || "workspace",
      title: data.title,
      slug: data.slug,
      short_description: data.short_description || "",
      description: data.description || "",
      cover_image: data.cover_image || "",
      published: !!data.published,
      display_order: Number(data.display_order ?? 0),
    });

    revalidatePath("/about", "layout");
    return NextResponse.json({ success: true, item }, { status: 201 });
  } catch (error: any) {
    console.error("Behind The Scenes Creation Error:", error);
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          error: "A Behind The Scenes item with this slug already exists. Please use a unique slug.",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || "Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    // If "all" is passed, return all items (admin). Otherwise return published only (public).
    const all = searchParams.get("all") === "true";

    const query = all ? {} : { published: true };
    const items = await BehindTheScenes.find(query).sort({ display_order: 1 }).lean();

    // Attach media for each item
    const ids = items.map((i: any) => i._id);
    const media = await BTSMediaItem.find({ bts_id: { $in: ids } })
      .sort({ display_order: 1 })
      .lean();

    const itemsWithMedia = items.map((i: any) => ({
      ...i,
      _id: i._id.toString(),
      media: media
        .filter((m: any) => m.bts_id.toString() === i._id.toString())
        .map((m: any) => ({
          ...m,
          _id: m._id.toString(),
          bts_id: m.bts_id.toString(),
        })),
    }));

    return NextResponse.json({ success: true, items: itemsWithMedia }, { status: 200 });
  } catch (error: any) {
    console.error("Behind The Scenes Fetch Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch Behind The Scenes items" },
      { status: 500 }
    );
  }
}
