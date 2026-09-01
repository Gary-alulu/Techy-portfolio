import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { deleteImage } from "@/lib/cloudinary";
import connectToDatabase from "@/lib/mongodb";
import BehindTheScenes from "@/models/BehindTheScenes";
import BTSMediaItem from "@/models/BTSMediaItem";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const parent = await BehindTheScenes.findById(id);
    if (!parent) {
      return NextResponse.json(
        { success: false, error: "Behind The Scenes item not found" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const list: { media_url: string; media_type: string; caption?: string }[] = Array.isArray(body)
      ? body
      : Array.isArray(body?.media) ? body.media : [];

    if (list.length === 0) {
      return NextResponse.json(
        { success: false, error: "No media provided" },
        { status: 400 }
      );
    }

    // Determine next available display_order
    const last = await BTSMediaItem.find({ bts_id: id })
      .sort({ display_order: -1 })
      .limit(1)
      .lean();
    let nextOrder = last.length > 0 ? (last[0].display_order ?? 0) + 1 : 0;

    const created = [];
    for (const entry of list) {
      if (!entry.media_url || !entry.media_type) {
        return NextResponse.json(
          { success: false, error: "Each media item requires media_url and media_type" },
          { status: 400 }
        );
      }
      const type = entry.media_type === "video" ? "video" : "image";
      const media = await BTSMediaItem.create({
        bts_id: id,
        media_url: entry.media_url,
        media_type: type,
        caption: entry.caption || "",
        display_order: nextOrder++,
      });
      created.push(media);
    }

    revalidatePath("/about", "layout");
    return NextResponse.json({ success: true, media: created }, { status: 201 });
  } catch (error: any) {
    console.error("BTS Media Add Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Server Error" }, { status: 500 });
  }
}

// Reorder media: body = { ids: string[] } or [{ id, display_order }]
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await req.json();

    if (Array.isArray(body?.ids)) {
      for (let i = 0; i < body.ids.length; i++) {
        await BTSMediaItem.findByIdAndUpdate(body.ids[i], { display_order: i });
      }
    } else if (Array.isArray(body?.reorder)) {
      for (const r of body.reorder) {
        if (r.id !== undefined && r.display_order !== undefined) {
          await BTSMediaItem.findByIdAndUpdate(r.id, { display_order: Number(r.display_order) });
        }
      }
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid reorder payload" },
        { status: 400 }
      );
    }

    revalidatePath("/about", "layout");
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Update a single media item (caption/type): ?id=<mediaId>
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const mediaId = searchParams.get("id");
    if (!mediaId) {
      return NextResponse.json({ success: false, error: "Missing media id" }, { status: 400 });
    }
    const body = await req.json();
    const update: any = {};
    if (body.caption !== undefined) update.caption = body.caption;
    if (body.media_type !== undefined) {
      update.media_type = body.media_type === "video" ? "video" : "image";
    }
    if (body.media_url !== undefined) update.media_url = body.media_url;

    const media = await BTSMediaItem.findByIdAndUpdate(mediaId, update, { new: true });
    if (!media) {
      return NextResponse.json({ success: false, error: "Media not found" }, { status: 404 });
    }

    revalidatePath("/about", "layout");
    return NextResponse.json({ success: true, media });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Delete a media item: ?id=<mediaId>
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const mediaId = searchParams.get("id");
    if (!mediaId) {
      return NextResponse.json({ success: false, error: "Missing media id" }, { status: 400 });
    }

    const media = await BTSMediaItem.findById(mediaId);
    if (!media) {
      return NextResponse.json({ success: false, error: "Media not found" }, { status: 404 });
    }

    await BTSMediaItem.findByIdAndDelete(mediaId);

    // Delete storage file (warning if it fails)
    const warnings: string[] = [];
    if (media.media_url?.startsWith("http")) {
      try {
        await deleteImage(media.media_url);
      } catch (e: any) {
        warnings.push(`Database record deleted, but storage file could not be removed: ${e?.message}`);
      }
    }

    revalidatePath("/about", "layout");
    return NextResponse.json({ success: true, warnings });
  } catch (error: any) {
    console.error("BTS Media Delete Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
