import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { deleteImage } from "@/lib/cloudinary";
import connectToDatabase from "@/lib/mongodb";
import BehindTheScenes from "@/models/BehindTheScenes";
import BTSMediaItem from "@/models/BTSMediaItem";

const CATEGORIES = ["workspace", "sketches", "wireframes", "moodboards"];

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const item = await BehindTheScenes.findById(id).lean();
    if (!item) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }
    const media = await BTSMediaItem.find({ bts_id: item._id }).sort({ display_order: 1 }).lean();
    return NextResponse.json(
      {
        success: true,
        item: {
          ...item,
          _id: item._id.toString(),
          media: media.map((m: any) => ({ ...m, _id: m._id.toString(), bts_id: m.bts_id.toString() })),
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const data = await req.json();

    if (data.category && !CATEGORIES.includes(data.category)) {
      return NextResponse.json(
        { success: false, error: `Category must be one of: ${CATEGORIES.join(", ")}.` },
        { status: 400 }
      );
    }

    const update: any = {};
    if (data.title !== undefined) update.title = data.title;
    if (data.slug !== undefined) update.slug = data.slug;
    if (data.category !== undefined) update.category = data.category;
    if (data.short_description !== undefined) update.short_description = data.short_description;
    if (data.description !== undefined) update.description = data.description;
    if (data.cover_image !== undefined) update.cover_image = data.cover_image;
    if (data.published !== undefined) update.published = !!data.published;
    if (data.display_order !== undefined) update.display_order = Number(data.display_order);

    const item = await BehindTheScenes.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }

    revalidatePath("/about", "layout");
    return NextResponse.json({ success: true, item });
  } catch (error: any) {
    console.error("Behind The Scenes Update Error:", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: "A Behind The Scenes item with this slug already exists." },
        { status: 400 }
      );
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const item = await BehindTheScenes.findByIdAndDelete(id);
    if (!item) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }

    // Delete associated media records + their storage files
    const media = await BTSMediaItem.find({ bts_id: item._id }).lean();
    const storageWarnings: string[] = [];
    for (const m of media) {
      await BTSMediaItem.deleteOne({ _id: m._id });
      if (m.media_url?.startsWith("http")) {
        try {
          await deleteImage(m.media_url);
        } catch (e: any) {
          storageWarnings.push(`Could not delete ${m.media_url}: ${e?.message}`);
        }
      }
    }
    // Also attempt to delete cover image from storage
    if (item.cover_image?.startsWith("http")) {
      try {
        await deleteImage(item.cover_image);
      } catch (e: any) {
        storageWarnings.push(`Could not delete cover ${item.cover_image}: ${e?.message}`);
      }
    }

    revalidatePath("/about", "layout");
    return NextResponse.json({ success: true, warnings: storageWarnings });
  } catch (error: any) {
    console.error("Behind The Scenes Delete Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
