import { NextResponse } from "next/server";
import cloudinary, { isCloudinaryConfigured } from "@/lib/cloudinary";

export async function POST() {
  if (!isCloudinaryConfigured()) {
    return NextResponse.json(
      {
        error:
          "Image storage is not configured. Set the CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables.",
      },
      { status: 500 }
    );
  }

  const timestamp = Math.round(Date.now() / 1000).toString();
  const folder = "portfolio";

  const signature = cloudinary.utils.api_sign_request(
    { folder, timestamp },
    process.env.CLOUDINARY_API_SECRET as string
  );

  return NextResponse.json({
    cloudName: process.env.CLOUDINARY_CLOUD_NAME as string,
    apiKey: process.env.CLOUDINARY_API_KEY as string,
    folder,
    timestamp,
    signature,
  });
}