"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Save, Loader2, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

type Stat = { label: string; value: string };

const categoryTitles: Record<string, string> = {
  product: "Digital Product Designer",
  uiux: "UI/UX Designer",
  frontend: "Frontend Developer",
};

export default function EditResume({ params }: { params: Promise<{ category: string }> }) {
  const router = useRouter();
  const { category } = use(params);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Form State
  const [title, setTitle] = useState(categoryTitles[category] || "");
  const [availability, setAvailability] = useState("");
  const [stats, setStats] = useState<Stat[]>([]);
  const [expertise, setExpertise] = useState("");
  const [highlights, setHighlights] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/resumes");
        const json = await res.json();
        if (json.success) {
          const resume = json.resumes.find((r: any) => r.category === category);
          if (resume) {
            if (resume.title) setTitle(resume.title);
            if (resume.availability) setAvailability(resume.availability);
            if (resume.stats && resume.stats.length > 0) setStats(resume.stats);
            if (resume.expertise) setExpertise(resume.expertise.join(", "));
            if (resume.highlights) setHighlights(resume.highlights.join(", "));
          }
        }
      } catch (e) {
        console.error("Failed to load resume details");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [category]);

  const handleStatChange = (index: number, field: keyof Stat, val: string) => {
    const newStats = [...stats];
    newStats[index][field] = val;
    setStats(newStats);
  };

  const removeStat = (index: number) => {
    setStats(stats.filter((_, i) => i !== index));
  };

  const addStat = () => {
    if (stats.length >= 6) {
      alert("Maximum 6 stats allowed.");
      return;
    }
    setStats([...stats, { label: "New Stat", value: "100+" }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    formData.append("category", category);
    formData.append("title", title);
    formData.append("availability", availability);
    formData.append("stats", JSON.stringify(stats));
    formData.append("expertise", JSON.stringify(expertise.split(",").map(s => s.trim()).filter(Boolean)));
    formData.append("highlights", JSON.stringify(highlights.split(",").map(s => s.trim()).filter(Boolean)));
    
    if (pdfFile) {
      formData.append("file", pdfFile);
    }

    try {
      const res = await fetch("/api/resumes", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        router.push("/admin/resumes");
        router.refresh();
      } else {
        alert("Failed to save: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Error occurred while saving");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-secondary)]" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/resumes" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold capitalize">Edit {category} Profile</h1>
          <p className="text-[var(--color-secondary)] text-sm">This data powers the Resume Modal on the public site.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-neutral-900 border border-white/10 rounded-xl p-6 sm:p-8">
        
        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Role Title</label>
            <input 
              value={title} onChange={e => setTitle(e.target.value)} 
              required className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2 text-sm" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Availability Status</label>
            <input 
              value={availability} onChange={e => setAvailability(e.target.value)} 
              required className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2 text-sm" 
            />
          </div>
        </div>

        {/* Arrays */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Expertise (Comma separated)</label>
            <textarea 
              value={expertise} onChange={e => setExpertise(e.target.value)} 
              rows={3} className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2 text-sm" 
              placeholder="React, UI/UX, Figma..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Highlights (Comma separated)</label>
            <textarea 
              value={highlights} onChange={e => setHighlights(e.target.value)} 
              rows={3} className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2 text-sm" 
              placeholder="Design Systems, Mobile Apps..."
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium">Quick Stats (Max 6)</label>
            <button type="button" onClick={addStat} className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded flex items-center gap-1">
              <Plus className="w-3 h-3" /> Add Stat
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="flex gap-2 items-center bg-neutral-950 border border-white/10 p-3 rounded-md">
                <div className="flex-1 space-y-2">
                  <input 
                    value={stat.value} onChange={e => handleStatChange(i, "value", e.target.value)} 
                    placeholder="Value (e.g. 4+)" className="w-full bg-transparent border-b border-white/10 px-1 text-sm pb-1 outline-none font-bold" 
                  />
                  <input 
                    value={stat.label} onChange={e => handleStatChange(i, "label", e.target.value)} 
                    placeholder="Label (e.g. Years)" className="w-full bg-transparent px-1 text-xs text-[var(--color-secondary)] outline-none" 
                  />
                </div>
                <button type="button" onClick={() => removeStat(i)} className="p-2 hover:bg-red-500/20 text-red-400 rounded transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* PDF Upload */}
        <div className="pt-6 border-t border-white/10">
          <label className="block text-sm font-medium mb-2">Upload Resume PDF (Optional if only changing text)</label>
          <input 
            type="file" accept="application/pdf"
            onChange={e => setPdfFile(e.target.files?.[0] || null)}
            className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20" 
          />
        </div>

        <button 
          disabled={saving}
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-[var(--color-accent-blue)] text-white px-6 py-4 rounded-xl font-bold hover:brightness-110 transition-all text-lg disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {saving ? "Saving..." : "Save Profile & Resume"}
        </button>
      </form>
    </div>
  );
}
