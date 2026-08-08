import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Resume from "@/models/Resume";

export const dynamic = "force-dynamic";

// GET — list all resumes (without heavy fileData) for admin panel
export async function GET() {
  try {
    await connectToDatabase();
    const resumes = await Resume.find()
      .select("-fileData")
      .sort({ category: 1 })
      .lean();
    return NextResponse.json({ success: true, resumes });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Server Error" },
      { status: 500 }
    );
  }
}

// POST — upload / upsert a resume PDF for a category
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const category = formData.get("category") as string;
    const file = formData.get("file") as File | null;
    
    const title = formData.get("title") as string || "";
    const availability = formData.get("availability") as string || "";
    const statsStr = formData.get("stats") as string || "[]";
    const expertiseStr = formData.get("expertise") as string || "[]";
    const highlightsStr = formData.get("highlights") as string || "[]";

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category is required" },
        { status: 400 }
      );
    }

    const validCategories = ["product", "uiux", "frontend"];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { success: false, error: "Invalid category" },
        { status: 400 }
      );
    }

    let stats = [];
    let expertise = [];
    let highlights = [];

    try {
      stats = JSON.parse(statsStr);
      expertise = JSON.parse(expertiseStr);
      highlights = JSON.parse(highlightsStr);
    } catch(e) {}

    const updateData: any = {
      category,
      title,
      availability,
      stats,
      expertise,
      highlights
    };

    if (file && file.size > 0) {
      if (file.type !== "application/pdf") {
        return NextResponse.json(
          { success: false, error: "Only PDF files are allowed" },
          { status: 400 }
        );
      }
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      updateData.fileData = buffer.toString("base64");
      updateData.fileName = file.name;
      updateData.fileSize = file.size;
    }

    await connectToDatabase();

    // Upsert — one resume per category
    const resume = await Resume.findOneAndUpdate(
      { category },
      updateData,
      { upsert: true, new: true, select: "-fileData" }
    );

    return NextResponse.json({ success: true, resume }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Server Error" },
      { status: 500 }
    );
  }
}
