"use client";

import { useState, useEffect } from "react";
import { Check, Target } from "lucide-react";
import { PROJECT_CATEGORIES } from "@/lib/categories";

export default function AdminSettings() {
  const [priorityCategory, setPriorityCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.setting) {
          setPriorityCategory(data.setting.priorityCategory || "");
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priorityCategory }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Failed to save settings");
      }
    } catch {
      alert("Network error occurred");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Settings</h1>
      <p className="text-[var(--color-secondary)] mb-8">
        Configure how your featured work is displayed on the homepage.
      </p>

      <div className="bg-neutral-900 border border-white/10 rounded-xl p-8 space-y-6">
        <div className="flex items-start gap-3">
          <Target className="w-5 h-5 text-[var(--color-accent-orange)] mt-1 shrink-0" />
          <div>
            <h2 className="font-semibold text-lg">Priority Category</h2>
            <p className="text-sm text-[var(--color-secondary)]">
              Projects from the selected category will be shown in the Featured /
              Selected Work list on the homepage.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Featured Category
          </label>
          <select
            value={priorityCategory}
            onChange={(e) => setPriorityCategory(e.target.value)}
            disabled={loading}
            className="w-full bg-neutral-950 border border-white/10 rounded-md px-4 py-2 disabled:opacity-50"
          >
            <option value="">None (show most recent work)</option>
            {PROJECT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSave}
          disabled={saving || loading}
          className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-md font-medium hover:bg-neutral-200 transition-colors disabled:opacity-50"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" /> Saved
            </>
          ) : saving ? (
            "Saving..."
          ) : (
            "Save Settings"
          )}
        </button>
      </div>
    </div>
  );
}
