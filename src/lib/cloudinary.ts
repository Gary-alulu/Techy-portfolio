import { v2 as cloudinary } from "cloudinary";

// Configure once on first import
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a base64 data URI to Cloudinary.
 * Returns the public secure URL.
 */
export async function uploadImage(
  dataUri: string,
  fileName?: string
): Promise<string> {
  const result = await cloudinary.uploader.upload(dataUri, {
    folder: "portfolio",
    public_id: fileName,
    overwrite: false,
    resource_type: "auto",
  });
  return result.secure_url;
}

/**
 * Delete an image from Cloudinary by its URL.
 * Silently ignores errors if the image doesn't exist.
 */
export async function deleteImage(url: string): Promise<void> {
  const publicId = extractPublicId(url);
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch {
    // Ignore – image may already be gone
  }
}

/**
 * Extract the Cloudinary public_id from a secure_url.
 * e.g. "https://res.cloudinary.com/<cloud>/image/upload/v123/portfolio/my-image.jpg"
 *  → "portfolio/my-image"
 */
export function extractPublicId(url: string): string | null {
  if (!url || !url.includes("res.cloudinary.com")) return null;
  try {
    const pathname = new URL(url).pathname;
    // pathname: /cloud/image/upload/v123456/portfolio/my-image.jpg
    // We need everything after /upload/vNNN/  without the file extension
    const uploadIdx = pathname.indexOf("/upload/");
    if (uploadIdx === -1) return null;
    const afterUpload = pathname.slice(uploadIdx + "/upload/".length);
    // Strip version segment (v1234567890/)
    const withoutVersion = afterUpload.replace(/^v\d+\//, "");
    // Strip file extension
    return withoutVersion.replace(/\.[^/.]+$/, "");
  } catch {
    return null;
  }
}

export function isCloudinaryConfigured(): boolean {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}

export default cloudinary;
