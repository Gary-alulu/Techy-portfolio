import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/mongodb";
import Setting from "@/models/Setting";
import { PROJECT_CATEGORIES } from "@/lib/categories";

export async function GET() {
  try {
    await connectToDatabase();
    let setting = await Setting.findOne();
    if (!setting) {
      setting = await Setting.create({ priorityCategory: "" });
    }
    return NextResponse.json({ success: true, setting });
  } catch (error: any) {
    console.error("Fetch Settings Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    await connectToDatabase();
    const { priorityCategory } = await req.json();

    if (priorityCategory && !PROJECT_CATEGORIES.includes(priorityCategory)) {
      return NextResponse.json(
        { success: false, error: "Invalid category" },
        { status: 400 }
      );
    }

    const setting = await Setting.findOneAndUpdate(
      {},
      { priorityCategory: priorityCategory || "" },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // Force cache invalidation so the featured list updates immediately.
    revalidatePath("/", "layout");
    revalidatePath("/work", "layout");

    return NextResponse.json({ success: true, setting });
  } catch (error: any) {
    console.error("Update Settings Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Server Error" },
      { status: 500 }
    );
  }
}
