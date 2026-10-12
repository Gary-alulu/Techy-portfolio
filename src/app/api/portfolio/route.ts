import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";

export const dynamic = "force-dynamic";

// GET — portfolio metadata (without the heavy fileData) for admin + public popup
export async function GET() {
  try {
    await connectToDatabase();
    const portfolio = await Portfolio.findOne({ key: "main" })
      .select("-fileData")
      .lean();
    return NextResponse.json({ success: true, portfolio: portfolio || null });
  } catch (error: any) {
    console.error("Portfolio Fetch Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch portfolio" },
      { status: 500 }
    );
  }
}

// POST — upload / replace the portfolio PDF
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const title = (formData.get("title") as string) || "My Portfolio";
    const description = (formData.get("description") as string) || "";

    if (!file || file.size === 0) {
      return NextResponse.json(
        { success: false, error: "A PDF file is required" },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { success: false, error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await connectToDatabase();

    const portfolio = await Portfolio.findOneAndUpdate(
      { key: "main" },
      {
        key: "main",
        title,
        description,
        fileName: file.name,
        fileSize: file.size,
        fileData: buffer.toString("base64"),
      },
      { upsert: true, new: true, select: "-fileData" }
    );

    revalidatePath("/", "layout");

    return NextResponse.json({ success: true, portfolio }, { status: 201 });
  } catch (error: any) {
    console.error("Portfolio Upload Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Server Error" },
      { status: 500 }
    );
  }
}

// DELETE — remove the portfolio
export async function DELETE() {
  try {
    await connectToDatabase();
    const result = await Portfolio.findOneAndDelete({ key: "main" });
    if (!result) {
      return NextResponse.json(
        { success: false, error: "Portfolio not found" },
        { status: 404 }
      );
    }

    revalidatePath("/", "layout");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Portfolio Delete Error:", error);
    return NextResponse.json(
      { success: false, error: "Server Error" },
      { status: 500 }
    );
  }
}
