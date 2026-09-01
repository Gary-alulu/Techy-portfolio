"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { compressImage } from "@/lib/imageCompression";
import { uploadImages } from "@/lib/uploadImages";

const isDataUri = (s: string) => /^data:/.test(s || "");

export default function EditProject({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [projectData, setProjectData] = useState<any>({});
  const [thumbnailBase64, setThumbnailBase64] = useState<string>("");
  const [bannerBase64, setBannerBase64] = useState<string>("");
  const [galleryBase64, setGalleryBase64] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        setProjectData(json.project);
        setThumbnailBase64(json.project.thumbnailUrl || "");
        setBannerBase64(json.project.bannerUrl || "");
        setGalleryBase64(json.project.galleryUrls || []);
        setSelectedCategory(json.project.category || "");
      } catch (e) {
        alert("Could not load project");
      } finally {
        setFetching(false);
      }
    }
    fetchProject();
  }, [id]);

  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await compressImage(file, 800, 0.95);
      setThumbnailBase64(base64);
    }
  };

  const handleBannerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await compressImage(file, 1920, 0.95);
      setBannerBase64(base64);
    }
  };

  const handleGalleryChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const base64s = await Promise.all(files.map(f => compressImage(f, 1600, 0.95)));
    setGalleryBase64([...galleryBase64, ...base64s]); // Append to existing
  };

  const removeGalleryImage = (index: number) => {
    setGalleryBase64(prev => prev.filter((_, i) => i !== index));
  };

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this project? This cannot be undone.")) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        alert("Failed to delete project");
      }
    } catch (e) {
      alert("Error deleting project");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const rawSlug = formData.get("slug") as string || "";
      const sanitizedSlug = rawSlug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

      // Upload only newly added images (data URIs) to object storage; keep existing URLs
      const newThumb = isDataUri(thumbnailBase64) ? thumbnailBase64 : "";
      const newBanner = isDataUri(bannerBase64) ? bannerBase64 : "";
      const newGallery = galleryBase64.map((g, i) => ({ g, i })).filter(({ g }) => isDataUri(g));

      const uploads: { name: string; data: string }[] = [];
      if (newThumb) uploads.push({ name: "thumbnail", data: newThumb });
      if (newBanner) uploads.push({ name: "banner", data: newBanner });
      newGallery.forEach(({ g, i }) => uploads.push({ name: `gallery-${i}`, data: g }));

      let thumbnailUrl = isDataUri(thumbnailBase64) ? "" : thumbnailBase64;
      let bannerUrl = isDataUri(bannerBase64) ? "" : bannerBase64;
      let galleryUrls = galleryBase64.map((g) => (isDataUri(g) ? "" : g));

      if (uploads.length > 0) {
        const results = await uploadImages(uploads);
        thumbnailUrl = newThumb ? results.find(r => r.name === "thumbnail")?.url || thumbnailUrl : thumbnailUrl;
        bannerUrl = newBanner ? results.find(r => r.name === "banner")?.url || bannerUrl : bannerUrl;
        for (const { i } of newGallery) {
          const r = results.find(x => x.name === `gallery-${i}`);
          if (r?.url) galleryUrls[i] = r.url;
        }
      }

      const data = {
        title: formData.get("title"),
        slug: sanitizedSlug,
        category: formData.get("category"),
        subCategory: formData.get("subCategory") || undefined,
        shortDescription: formData.get("shortDescription"),
        content: formData.get("content"),
        thumbnailUrl,
        bannerUrl,
        galleryUrls: galleryUrls.filter(Boolean),
        liveUrl: formData.get("liveUrl"),
        githubUrl: formData.get("githubUrl"),
        prototypeUrl: formData.get("prototypeUrl"),
        videoUrl: formData.get("videoUrl"),
        technologies: formData.get("technologies")?.toString().split(",").map(s => s.trim()).filter(Boolean),
        toolsUsed: formData.get("toolsUsed")?.toString().split(",").map(s => s.trim()).filter(Boolean),
        isDraft: formData.get("isDraft") === "on",
      };

      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(errData.error || "Failed to update project");
      }
    } catch (e: any) {
      alert(e.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  }

  if (fetching) return <div className="text-center py-20">Loading project data...</div>;

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Edit Project</h1>
        <button 
          onClick={handleDelete}
          type="button" 
          className="bg-red-500/10 text-red-500 hover:bg-red-500/20 px-4 py-2 rounded-md font-medium transition-colors"
        >
          Delete Project
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-neutral-900 p-8 rounded-xl border border-white/10">
        {/* Core Information */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold border-b border-white/10 pb-2">Core Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input name="title" defaultValue={projectData.title} required className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2" />
            </div>
            <div>
              <label className="text-sm font-medium text-white/70">Slug (URL)</label>
              <input 
                name="slug" 
                defaultValue={projectData.slug} 
                required 
                pattern="^[a-z0-9-]+$"
                title="Only lowercase letters, numbers, and dashes are allowed"
                className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select 
                name="category" 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                required 
                className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2"
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
                  defaultValue={projectData.subCategory || ""}
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
            <textarea name="shortDescription" defaultValue={projectData.shortDescription} rows={2} className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2" />
          </div>
        </div>

        {/* Media Uploads */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold border-b border-white/10 pb-2">Media Uploads</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Thumbnail Image</label>
              <input type="file" accept="image/*" onChange={handleThumbnailChange} className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20" />
              <p className="text-xs text-white/50 mt-1">Upload a new image to replace the current one.</p>
              {thumbnailBase64 && <img src={thumbnailBase64} alt="Thumb preview" className="mt-4 h-24 object-cover rounded border border-white/10" />}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Banner Image (Hero Section)</label>
              <input type="file" accept="image/*" onChange={handleBannerChange} className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20" />
              <p className="text-xs text-white/50 mt-1">Upload a new image to replace the current banner.</p>
              {bannerBase64 && <img src={bannerBase64} alt="Banner preview" className="mt-4 h-24 w-full object-cover rounded border border-white/10" />}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Gallery Images</label>
              <input type="file" accept="image/*" multiple onChange={handleGalleryChange} className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20" />
              <p className="text-xs text-white/50 mt-1">Upload images to append to the gallery. Click an image below to remove it.</p>
              {galleryBase64.length > 0 && (
                <div className="flex gap-2 mt-4 flex-wrap">
                  {galleryBase64.map((b64, i) => (
                    <img key={i} src={b64} onClick={() => removeGalleryImage(i)} alt="Gallery preview" className="h-16 w-16 object-cover rounded border border-red-500/50 cursor-pointer hover:opacity-50 transition-opacity" title="Click to remove" />
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
              <input name="liveUrl" defaultValue={projectData.liveUrl} className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">GitHub URL</label>
              <input name="githubUrl" defaultValue={projectData.githubUrl} className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Prototype URL (Figma, etc)</label>
              <input name="prototypeUrl" defaultValue={projectData.prototypeUrl} className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Video Embed URL (YouTube/Vimeo)</label>
              <input name="videoUrl" defaultValue={projectData.videoUrl} className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2" />
            </div>
          </div>
        </div>

        {/* Tech Stack & Detailed Content */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold border-b border-white/10 pb-2">Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Technologies (comma separated)</label>
              <input name="technologies" defaultValue={projectData.technologies?.join(", ")} className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tools Used (comma separated)</label>
              <input name="toolsUsed" defaultValue={projectData.toolsUsed?.join(", ")} className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Detailed Content</label>
            <textarea name="content" defaultValue={projectData.content} rows={8} className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2" />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
          <input type="checkbox" name="isDraft" id="isDraft" defaultChecked={projectData.isDraft} className="w-5 h-5" />
          <label htmlFor="isDraft" className="text-sm font-medium">Save as Draft (Hide from public)</label>
        </div>
        <button disabled={loading} className="w-full bg-[var(--color-accent-blue)] text-white px-6 py-4 rounded-xl font-bold hover:brightness-110 transition-all text-lg">
          {loading ? "Saving Changes..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
