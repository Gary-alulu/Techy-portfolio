"use client";

import { useEffect, useState, useRef } from "react";
import { Upload, Trash2, FileText, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import Link from "next/link";

type ResumeCategory = {
  id: string;
  title: string;
  description: string;
};

const categories: ResumeCategory[] = [
  {
    id: "product",
    title: "Digital Product Designer",
    description: "Full-spectrum resume covering UI/UX, frontend, branding and motion design.",
  },
  {
    id: "uiux",
    title: "UI/UX Designer",
    description: "Focused on wireframing, prototyping, user testing and interaction design.",
  },
  {
    id: "frontend",
    title: "Frontend Developer",
    description: "Technical resume highlighting React, Next.js, TypeScript and web apps.",
  },
];

type ResumeRecord = {
  _id: string;
  category: string;
  fileName: string;
  fileSize: number;
  updatedAt: string;
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminResumes() {
  const [resumes, setResumes] = useState<ResumeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const fetchResumes = async () => {
    try {
      const res = await fetch("/api/resumes");
      const data = await res.json();
      if (data.success) {
        setResumes(data.resumes);
      }
    } catch (e) {
      console.error("Failed to fetch resumes:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const getResumeForCategory = (categoryId: string): ResumeRecord | undefined => {
    return resumes.find((r) => r.category === categoryId);
  };

  const handleUpload = async (categoryId: string, file: File) => {
    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      return;
    }

    setUploading(categoryId);
    const formData = new FormData();
    formData.append("category", categoryId);
    formData.append("file", file);

    try {
      const res = await fetch("/api/resumes", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        await fetchResumes();
      } else {
        alert("Upload failed: " + (data.error || "Unknown error"));
      }
    } catch (e) {
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(null);
    }
  };

  const handleDelete = async (categoryId: string) => {
    if (!confirm("Remove this resume? Visitors won't be able to download it until you upload a new one.")) return;

    setDeleting(categoryId);
    try {
      const res = await fetch(`/api/resumes/${categoryId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        await fetchResumes();
      } else {
        alert("Delete failed: " + (data.error || "Unknown error"));
      }
    } catch (e) {
      alert("Delete failed. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Resumes</h1>
          <p className="text-[var(--color-secondary)] text-sm mt-1">
            Upload resume PDFs for each role. Visitors can download these from the Resume modal.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-[var(--color-secondary)]" />
        </div>
      ) : (
        <div className="grid gap-6">
          {categories.map((cat) => {
            const resume = getResumeForCategory(cat.id);
            const isUploading = uploading === cat.id;
            const isDeleting = deleting === cat.id;

            return (
              <div
                key={cat.id}
                className="bg-neutral-900 border border-white/10 rounded-xl p-6 flex flex-col sm:flex-row gap-6 sm:items-center transition-colors hover:border-white/15"
              >
                {/* Icon + Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        resume
                          ? "bg-green-500/10 border border-green-500/20"
                          : "bg-yellow-500/10 border border-yellow-500/20"
                      }`}
                    >
                      {resume ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-white truncate">{cat.title}</h3>
                      <p className="text-xs text-[var(--color-secondary)] truncate">{cat.description}</p>
                    </div>
                  </div>

                  {/* File Details */}
                  {resume ? (
                    <div className="ml-[52px] flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--color-secondary)]">
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" />
                        {resume.fileName}
                      </span>
                      <span>{formatFileSize(resume.fileSize)}</span>
                      <span>Updated {formatDate(resume.updatedAt)}</span>
                    </div>
                  ) : (
                    <p className="ml-[52px] text-xs text-yellow-400/80">
                      No resume uploaded yet
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 flex-shrink-0 sm:ml-auto">
                  <Link
                    href={`/admin/resumes/${cat.id}`}
                    className="flex items-center gap-2 bg-white text-black px-4 py-2.5 rounded-lg font-medium text-sm hover:bg-neutral-200 transition-colors"
                  >
                    <FileText className="w-4 h-4" /> {resume ? "Edit Profile & Resume" : "Setup Profile & Resume"}
                  </Link>

                  {resume && (
                    <button
                      onClick={() => handleDelete(cat.id)}
                      disabled={isDeleting}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isDeleting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
