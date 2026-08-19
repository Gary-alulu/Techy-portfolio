"use client";

import { useState, useEffect } from "react";
import BentoGallery from "@/components/gallery/BentoGallery";
import { IProject } from "@/models/Project";

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
      <div className="bg-black pt-16 min-h-screen">
        <div className="p-4">
          <div className="skeleton h-12 w-48 mx-auto mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="skeleton col-span-2 row-span-2 h-[350px] rounded-3xl" />
            <div className="skeleton h-[200px] rounded-3xl" />
            <div className="skeleton h-[200px] rounded-3xl" />
            <div className="skeleton h-[200px] rounded-3xl" />
            <div className="skeleton h-[200px] rounded-3xl" />
            <div className="skeleton h-[200px] rounded-3xl" />
            <div className="skeleton h-[200px] rounded-3xl" />
            <div className="skeleton h-[200px] rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black pt-16">
      <BentoGallery projects={projects} />
    </div>
  );
}
