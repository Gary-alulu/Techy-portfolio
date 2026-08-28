import { NextRequest, NextResponse } from "next/server";
import { put, del } from "@vercel/blob";

export const maxDuration = 60;

interface UploadItem {
  name: string;
  data: string; // base64 data URI, e.g. data:image/jpeg;base64,....
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { success: false, error: "Image storage is not configured. Set the BLOB_READ_WRITE_TOKEN environment variable." },
        { status: 500 }
      );
    }

    let body: { files: UploadItem[] };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
    }

    const files = Array.isArray(body?.files) ? body.files : [];
    if (files.length === 0) {
      return NextResponse.json({ success: false, error: "No files provided" }, { status: 400 });
    }

    const uploaded: { name: string; url: string | null }[] = [];

    for (const file of files) {
      const match = /^data:([^;]+);base64,(.+)$/.exec(file.data || "");
      if (!match) {
        uploaded.push({ name: file.name, url: null });
        continue;
      }

      const mimeType = match[1];
      const buffer = Buffer.from(match[2], "base64");
      const ext = (mimeType.split("/")[1] || "jpg").replace("jpeg", "jpg").split("+")[0];
      const safeName = file.name
        .replace(/[^a-zA-Z0-9-_]/g, "-")
        .toLowerCase()
        .slice(-40) || `image-${Date.now()}`;

      const fileName = `${Date.now()}-${safeName}.${ext}`;
      const blob = await put(fileName, buffer, {
        access: "public",
        contentType: mimeType,
        addRandomSuffix: true,
        cacheControlMaxAge: 60 * 60 * 24 * 365,
      });

      uploaded.push({ name: file.name, url: blob.url });
    }

    return NextResponse.json({ success: true, uploaded });
  } catch (error: any) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest) {
  try {
    const { searchParams } = new URL(_request.url);
    const url = searchParams.get("url");
    if (!url) {
      return NextResponse.json({ success: false, error: "Missing url" }, { status: 400 });
    }
    await del(url);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Delete Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
