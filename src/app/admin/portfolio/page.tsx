"use client";

import { useEffect, useState, useRef } from "react";
import {
  Upload,
  Trash2,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Download,
} from "lucide-react";

type PortfolioMeta = {
  title?: string;
  description?: string;
  fileName?: string;
  fileSize?: number;
  updatedAt?: string;
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

export default function AdminPortfolio() {
  const [meta, setMeta] = useState<PortfolioMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [title, setTitle] = useState("My Portfolio");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const fetchPortfolio = async () => {
    try {
      const res = await fetch("/api/portfolio", { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        setMeta(data.portfolio);
        if (data.portfolio) {
          setTitle(data.portfolio.title || "My Portfolio");
          setDescription(data.portfolio.description || "");
        }
      }
    } catch (e) {
      console.error("Failed to fetch portfolio:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file first.");
      return;
    }
    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        await fetchPortfolio();
      } else {
        alert("Upload failed: " + (data.error || "Unknown error"));
      }
    } catch {
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Remove the portfolio? Visitors won't be able to download it until you upload a new one."
      )
    )
      return;

    setDeleting(true);
    try {
      const res = await fetch("/api/portfolio", { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setMeta(null);
        setTitle("My Portfolio");
        setDescription("");
      } else {
        alert("Delete failed: " + (data.error || "Unknown error"));
      }
    } catch {
      alert("Delete failed. Please try again.");
    } finally {
      setDeleting(false);
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
    <div className="max-w-3xl mx-auto pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Portfolio</h1>
        <p className="text-[var(--color-secondary)] text-sm mt-1">
          Upload the portfolio PDF. Visitors can download it from the popup on
          the landing page.
        </p>
      </div>

      {/* Current file status */}
      <div className="bg-neutral-900 border border-white/10 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
              meta
                ? "bg-green-500/10 border border-green-500/20"
                : "bg-yellow-500/10 border border-yellow-500/20"
            }`}
          >
            {meta ? (
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-white">
              {meta ? "Portfolio uploaded" : "No portfolio uploaded yet"}
            </h3>
            {meta ? (
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--color-secondary)] mt-1">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  {meta.fileName}
                </span>
                {typeof meta.fileSize === "number" && (
                  <span>{formatFileSize(meta.fileSize)}</span>
                )}
                {meta.updatedAt && (
                  <span>Updated {formatDate(meta.updatedAt)}</span>
                )}
              </div>
            ) : (
              <p className="text-xs text-yellow-400/80 mt-1">
                Upload a PDF below to enable the download popup.
              </p>
            )}
          </div>
        </div>

        {meta && (
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
            <a
              href="/api/portfolio/download"
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <Download className="w-4 h-4" /> Download current
            </a>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-colors disabled:opacity-50"
            >
              {deleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Upload form */}
      <div className="bg-neutral-900 border border-white/10 rounded-xl p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-semibold border-b border-white/10 pb-3">
          {meta ? "Replace Portfolio" : "Upload Portfolio"}
        </h2>

        <div>
          <label className="block text-sm font-medium mb-2">
            Popup Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Download My Portfolio"
            className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Popup Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="A curated collection of my best work, case studies and capabilities."
            className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Portfolio PDF
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
          />
          {file && (
            <p className="text-xs text-[var(--color-secondary)] mt-2">
              {file.name} ({formatFileSize(file.size)})
            </p>
          )}
        </div>

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full flex items-center justify-center gap-2 bg-white text-black px-6 py-4 rounded-xl font-bold hover:bg-neutral-200 transition-colors text-lg disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Upload className="w-5 h-5" />
          )}
          {uploading
            ? "Uploading..."
            : meta
            ? "Replace Portfolio PDF"
            : "Upload Portfolio PDF"}
        </button>
      </div>
    </div>
  );
}
