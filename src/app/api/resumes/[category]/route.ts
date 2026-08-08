import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Resume from "@/models/Resume";

// GET — serve the raw PDF binary for download
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params;
    await connectToDatabase();
    const resume = await Resume.findOne({ category }).lean();

    if (!resume) {
      return NextResponse.json(
        { success: false, error: "Resume not found" },
        { status: 404 }
      );
    }

    // Decode base64 to binary buffer
    const pdfBuffer = Buffer.from(resume.fileData, "base64");

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${resume.fileName}"`,
        "Content-Length": pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Server Error" },
      { status: 500 }
    );
  }
}

// DELETE — remove a resume for a category
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params;
    await connectToDatabase();
    const result = await Resume.findOneAndDelete({ category });

    if (!result) {
      return NextResponse.json(
        { success: false, error: "Resume not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Server Error" },
      { status: 500 }
    );
  }
}
