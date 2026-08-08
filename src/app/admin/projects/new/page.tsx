"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { compressImage } from "@/lib/imageCompression";

export default function NewProject() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [thumbnailBase64, setThumbnailBase64] = useState<string>("");
  const [bannerBase64, setBannerBase64] = useState<string>("");
  const [galleryBase64, setGalleryBase64] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Compress thumbnail aggressively for fast loading
      const base64 = await compressImage(file, 800, 0.7);
      setThumbnailBase64(base64);
    }
  };

  const handleBannerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await compressImage(file, 1920, 0.8);
      setBannerBase64(base64);
    }
  };

  const handleGalleryChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // Compress gallery images a bit larger
    const base64s = await Promise.all(files.map(f => compressImage(f, 1600, 0.8)));
    setGalleryBase64(base64s);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const rawSlug = formData.get("slug") as string || "";
    const sanitizedSlug = rawSlug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const data = {
      title: formData.get("title"),
      slug: sanitizedSlug,
      category: formData.get("category"),
      subCategory: formData.get("subCategory") || undefined,
      shortDescription: formData.get("shortDescription"),
      content: content,
      thumbnailUrl: thumbnailBase64, // using the compressed base64
      bannerUrl: bannerBase64,       // added bannerUrl
      galleryUrls: galleryBase64,    // using the compressed base64s
      liveUrl: formData.get("liveUrl"),
      githubUrl: formData.get("githubUrl"),
      prototypeUrl: formData.get("prototypeUrl"),
      videoUrl: formData.get("videoUrl"),
      technologies: formData.get("technologies")?.toString().split(",").map(s => s.trim()).filter(Boolean),
      toolsUsed: formData.get("toolsUsed")?.toString().split(",").map(s => s.trim()).filter(Boolean),
      isDraft: formData.get("isDraft") === "on",
      featured: formData.get("featured") === "on",
    };

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(errData.error || "Failed to create project");
      }
    } catch (e: any) {
      alert(e.message || "Network Error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <h1 className="text-3xl font-bold mb-8">New Production Project</h1>
      <form onSubmit={handleSubmit} className="space-y-8 bg-neutral-900 p-8 rounded-xl border border-white/10">
        
        {/* Core Information */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold border-b border-white/10 pb-2">Core Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input name="title" required className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2" />
            </div>
            <div>
              <label className="text-sm font-medium text-white/70">Slug (URL)</label>
              <input 
                name="slug" 
                required 
                pattern="^[a-z0-9-]+$"
                title="Only lowercase letters, numbers, and dashes are allowed"
                className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2" 
                placeholder="e.g. my-cool-project" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select 
                name="category" 
                required 
                className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select Category...</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Front End Design">Front End Design</option>
                <option value="Brand Identity">Brand Identity</option>
                <option value="Motion Graphics">Motion Graphics</option>
              </select>
            </div>
            {selectedCategory === "Brand Identity" && (
              <div>
                <label className="block text-sm font-medium mb-2">Sub Category</label>
                <select 
                  name="subCategory" 
                  className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2"
                  required
                >
                  <option value="">Select Subcategory...</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Print Media">Print Media</option>
                </select>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Short Description</label>
            <textarea name="shortDescription" rows={2} className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2" />
          </div>
        </div>

        {/* Media Uploads */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold border-b border-white/10 pb-2">Media Uploads</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Thumbnail Image (Required)</label>
              <input type="file" accept="image/*" required onChange={handleThumbnailChange} className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20" />
              {thumbnailBase64 && <img src={thumbnailBase64} alt="Thumb preview" className="mt-4 h-24 object-cover rounded border border-white/10" />}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Banner Image (Hero Section)</label>
              <input type="file" accept="image/*" onChange={handleBannerChange} className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20" />
              {bannerBase64 && <img src={bannerBase64} alt="Banner preview" className="mt-4 h-24 w-full object-cover rounded border border-white/10" />}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Gallery Images (Multiple)</label>
              <input type="file" accept="image/*" multiple onChange={handleGalleryChange} className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20" />
              {galleryBase64.length > 0 && (
                <div className="flex gap-2 mt-4 flex-wrap">
                  {galleryBase64.map((b64, i) => (
                    <img key={i} src={b64} alt="Gallery preview" className="h-16 w-16 object-cover rounded border border-white/10" />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Links & External */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold border-b border-white/10 pb-2">External Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Live URL</label>
              <input name="liveUrl" className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">GitHub URL</label>
              <input name="githubUrl" className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2" placeholder="https://github.com/..." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Prototype URL (Figma, etc)</label>
              <input name="prototypeUrl" className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2" placeholder="https://figma.com/..." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Video Embed URL (YouTube/Vimeo)</label>
              <input name="videoUrl" className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2" placeholder="https://youtube.com/..." />
            </div>
          </div>
        </div>

        {/* Tech Stack & Detailed Content */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold border-b border-white/10 pb-2">Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Technologies (comma separated)</label>
              <input name="technologies" className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2" placeholder="React, Next.js, Tailwind..." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tools Used (comma separated)</label>
              <input name="toolsUsed" className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2" placeholder="Figma, VS Code, Vercel..." />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Detailed Content</label>
            <textarea 
              name="content" 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              rows={8} 
              className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2 text-white placeholder-neutral-500" 
              placeholder="Write detailed project description or breakdown..."
            />
          </div>
        </div>

        <div className="flex items-center gap-6 pt-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <input type="checkbox" name="isDraft" id="isDraft" className="w-5 h-5" />
            <label htmlFor="isDraft" className="text-sm font-medium">Save as Draft (Hide from public)</label>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" name="featured" id="featured" className="w-5 h-5" />
            <label htmlFor="featured" className="text-sm font-medium text-[var(--color-accent-orange)]">Featured Project (Hero sizing)</label>
          </div>
        </div>
        <button disabled={loading} className="w-full bg-white text-black px-6 py-4 rounded-xl font-bold hover:bg-neutral-200 transition-colors text-lg">
          {loading ? "Compressing & Saving..." : "Publish Project"}
        </button>
      </form>
    </div>
  );
}
