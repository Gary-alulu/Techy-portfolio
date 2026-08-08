"use client";

import { useState, useEffect } from "react";
import BentoGallery from "@/components/gallery/BentoGallery";
import { IProject } from "@/models/Project";
import { Loader2 } from "lucide-react";

export default function GalleryPage() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects", { cache: "no-store" });
        const data = await res.json();
        if (data.success) {
          setProjects(data.projects);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-accent-orange)]" />
      </div>
    );
  }

  return (
    <div className="bg-black pt-16">
      <BentoGallery projects={projects} />
    </div>
  );
}
