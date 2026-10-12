"use client";

import { useState, useEffect } from "react";
import { ImagePlus, Loader2, Trash2, Upload } from "lucide-react";
import { uploadImages } from "@/lib/uploadImages";

interface PrintMediaItem {
  _id: string;
  title: string;
  imageUrl: string;
  order?: number;
}

interface PendingItem {
  data: string;
  title: string;
}

export default function AdminPrintMedia() {
  const [items, setItems] = useState<PrintMediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState<PendingItem[]>([]);
  const [uploading, setUploading] = useState(false);

  async function load() {
    try {
      const res = await fetch("/api/print-media", { cache: "no-store" });
      const json = await res.json();
      if (json.success) setItems(json.items);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    // Read originals as-is — no resize or recompression, so full quality is kept.
    const data = await Promise.all(files.map(readFileAsDataURL));
    setPending((prev) => [...prev, ...data.map((d) => ({ data: d, title: "" }))]);
    e.target.value = "";
  }

  function updateTitle(index: number, title: string) {
    setPending((prev) =>
      prev.map((p, i) => (i === index ? { ...p, title } : p))
    );
  }

  function removePending(index: number) {
    setPending((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleUpload() {
    if (pending.length === 0) return;
    if (pending.some((p) => !p.title.trim())) {
      alert("Please add a title for every image before uploading.");
      return;
    }

    setUploading(true);
    try {
      const results = await uploadImages(
        pending.map((p, i) => ({ name: `print-media-${i}`, data: p.data }))
      );

      for (let i = 0; i < pending.length; i++) {
        const url = results.find((r) => r.name === `print-media-${i}`)?.url;
        if (!url) continue;
        await fetch("/api/print-media", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: pending[i].title.trim(), imageUrl: url }),
        });
      }

      setPending([]);
      await load();
    } catch (e: any) {
      alert(e.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this print media image? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/print-media/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((it) => it._id !== id));
      } else {
        alert("Failed to delete");
      }
    } catch {
      alert("Error deleting print media");
    }
  }

  return (
    <div className="max-w-5xl mx-auto pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Print Media</h1>
        <p className="text-[var(--color-secondary)]">
          Upload print media under Branding &amp; Design. Each image has its own
          title and appears on the Brand Identity page.
        </p>
      </div>

      {/* Upload Panel */}
      <div className="bg-neutral-900 border border-white/10 rounded-xl p-6 sm:p-8 mb-10">
        <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-white/15 rounded-xl py-10 cursor-pointer hover:border-white/30 hover:bg-white/5 transition-colors">
          <ImagePlus className="w-8 h-8 text-[var(--color-secondary)]" />
          <span className="text-sm font-medium">Select images to upload</span>
          <span className="text-xs text-[var(--color-secondary)]">
            You can select multiple images at once. Originals are kept at full quality (no compression).
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFiles}
            className="hidden"
          />
        </label>

        {pending.length > 0 && (
          <div className="mt-6 space-y-4">
            {pending.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-neutral-950 border border-white/10 rounded-lg p-3"
              >
                <img
                  src={item.data}
                  alt="Preview"
                  className="h-20 w-20 object-cover rounded border border-white/10 shrink-0"
                />
                <div className="flex-1">
                  <label className="block text-xs font-medium text-[var(--color-secondary)] mb-1">
                    Title
                  </label>
                  <input
                    value={item.title}
                    onChange={(e) => updateTitle(i, e.target.value)}
                    placeholder="e.g. Poster — Summer Campaign"
                    className="w-full bg-neutral-900 border border-white/10 rounded-md px-3 py-2 text-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removePending(i)}
                  className="p-2 hover:bg-red-500/20 text-red-400 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            <button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-neutral-200 transition-colors disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Upload className="w-5 h-5" />
              )}
              {uploading
                ? "Uploading..."
                : `Upload ${pending.length} Image${pending.length > 1 ? "s" : ""}`}
            </button>
          </div>
        )}
      </div>

      {/* Existing Items */}
      <h2 className="text-xl font-semibold mb-4">
        Uploaded Print Media ({items.length})
      </h2>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="skeleton h-40 rounded-xl" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 border border-white/5 rounded-xl bg-white/5 text-[var(--color-secondary)]">
          No print media uploaded yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="group relative rounded-xl overflow-hidden border border-white/10 bg-neutral-900"
            >
              <div className="relative h-40">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium truncate" title={item.title}>
                  {item.title}
                </p>
              </div>
              <button
                onClick={() => handleDelete(item._id)}
                className="absolute top-2 right-2 p-2 rounded-full bg-black/60 text-red-400 opacity-0 group-hover:opacity-100 hover:bg-red-500/40 transition-all"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
