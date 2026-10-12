import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/mongodb";
import PrintMedia from "@/models/PrintMedia";

export async function GET() {
  try {
    await connectToDatabase();
    const items = await PrintMedia.find().sort({ order: 1, createdAt: 1 });
    return NextResponse.json({ success: true, items });
  } catch (error: any) {
    console.error("Fetch Print Media Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch print media" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { title, imageUrl, order } = await req.json();

    if (!title || !imageUrl) {
      return NextResponse.json(
        { success: false, error: "Title and image are required." },
        { status: 400 }
      );
    }

    const item = await PrintMedia.create({
      title,
      imageUrl,
      order: typeof order === "number" ? order : 0,
    });

    revalidatePath("/work", "layout");

    return NextResponse.json({ success: true, item }, { status: 201 });
  } catch (error: any) {
    console.error("Print Media Creation Error:", error);
    if (error.name === "ValidationError") {
      return NextResponse.json(
        {
          success: false,
          error: Object.values(error.errors)
            .map((e: any) => e.message)
            .join(", "),
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
