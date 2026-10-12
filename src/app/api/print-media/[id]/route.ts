import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/mongodb";
import PrintMedia from "@/models/PrintMedia";
import { deleteImage } from "@/lib/cloudinary";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const item = await PrintMedia.findById(id);
    if (!item)
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 }
      );
    return NextResponse.json({ success: true, item });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const { title, order } = await req.json();

    const update: any = {};
    if (typeof title === "string") update.title = title;
    if (typeof order === "number") update.order = order;

    const item = await PrintMedia.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });
    if (!item)
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 }
      );

    revalidatePath("/work", "layout");

    return NextResponse.json({ success: true, item });
  } catch (error: any) {
    console.error("Print Media Update Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const item = await PrintMedia.findByIdAndDelete(id);
    if (!item)
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 }
      );

    // Best-effort cleanup of the stored image.
    if (item.imageUrl) {
      await deleteImage(item.imageUrl).catch(() => {});
    }

    revalidatePath("/work", "layout");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
