import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";

export const dynamic = "force-dynamic";

// GET — serve the raw portfolio PDF binary for download (public)
export async function GET() {
  try {
    await connectToDatabase();
    const portfolio = await Portfolio.findOne({ key: "main" }).lean();

    if (!portfolio || !portfolio.fileData) {
      return NextResponse.json(
        { success: false, error: "Portfolio not found" },
        { status: 404 }
      );
    }

    const pdfBuffer = Buffer.from(portfolio.fileData, "base64");

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${
          portfolio.fileName || "portfolio.pdf"
        }"`,
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
