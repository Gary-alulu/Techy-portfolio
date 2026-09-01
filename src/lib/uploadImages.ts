export interface UploadResult {
  name: string;
  url: string | null;
}

export async function uploadImages(files: { name: string; data: string }[]): Promise<UploadResult[]> {
  const res = await fetch("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ files }),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.success) {
    throw new Error(json.error || "Image upload failed. Are Cloudinary credentials configured?");
  }
  return json.uploaded as UploadResult[];
}
