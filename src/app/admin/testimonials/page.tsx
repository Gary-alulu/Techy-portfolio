"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, Star, CheckCircle2, X, Loader2, Sparkles, AlertCircle } from "lucide-react";

type Testimonial = {
  _id: string;
  name: string;
  role: string;
  company?: string;
  quote: string;
  avatarUrl?: string;
  rating: number;
  featured: boolean;
  order: number;
  createdAt?: string;
};

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form State
  const [formName, setFormName] = useState("");
  const [formRole, setFormRole] = useState("");
  const [formCompany, setFormCompany] = useState("");
  const [formQuote, setFormQuote] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formFeatured, setFormFeatured] = useState(true);
  const [formOrder, setFormOrder] = useState(0);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials", { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        setTestimonials(data.testimonials);
      }
    } catch (err) {
      console.error("Failed to fetch testimonials", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormName("");
    setFormRole("");
    setFormCompany("");
    setFormQuote("");
    setFormRating(5);
    setFormFeatured(true);
    setFormOrder(testimonials.length);
    setIsModalOpen(true);
  };

  const openEditModal = (item: Testimonial) => {
    setEditingItem(item);
    setFormName(item.name);
    setFormRole(item.role);
    setFormCompany(item.company || "");
    setFormQuote(item.quote);
    setFormRating(item.rating || 5);
    setFormFeatured(item.featured ?? true);
    setFormOrder(item.order || 0);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      name: formName,
      role: formRole,
      company: formCompany,
      quote: formQuote,
      rating: Number(formRating),
      featured: formFeatured,
      order: Number(formOrder),
    };

    try {
      let res;
      if (editingItem) {
        res = await fetch(`/api/testimonials/${editingItem._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        await fetchTestimonials();
      } else {
        alert("Failed to save: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Error occurred while saving testimonial");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleFeatured = async (item: Testimonial) => {
    try {
      const res = await fetch(`/api/testimonials/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !item.featured }),
      });
      const data = await res.json();
      if (data.success) {
        setTestimonials((prev) =>
          prev.map((t) => (t._id === item._id ? { ...t, featured: !t.featured } : t))
        );
      }
    } catch (err) {
      console.error("Toggle featured error:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setTestimonials((prev) => prev.filter((t) => t._id !== id));
      } else {
        alert("Delete failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Delete failed. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Client Testimonials</h1>
          <p className="text-[var(--color-secondary)] text-sm mt-1">
            Manage client reviews and feedback displayed on the website.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-neutral-200 transition-colors shadow-lg self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--color-secondary)]" />
        </div>
      ) : testimonials.length === 0 ? (
        <div className="bg-neutral-900 border border-white/10 rounded-2xl p-12 text-center flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-[var(--color-secondary)]">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">No Testimonials Yet</h3>
          <p className="text-[var(--color-secondary)] text-sm max-w-sm mb-6">
            Click &quot;Add Testimonial&quot; to create your first client review.
          </p>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium text-sm hover:bg-neutral-200 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Testimonial
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((item) => (
            <div
              key={item._id}
              className="bg-neutral-900 border border-white/10 rounded-2xl p-6 flex flex-col justify-between relative group hover:border-white/20 transition-all shadow-md"
            >
              <div>
                {/* Header info + Star rating */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-bold text-white text-lg">{item.name}</h3>
                    <p className="text-xs text-[var(--color-secondary)]">
                      {item.role} {item.company ? `• ${item.company}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < item.rating ? "fill-amber-400 text-amber-400" : "text-neutral-600"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <p className="text-sm text-neutral-300 italic mb-6 leading-relaxed bg-black/30 p-4 rounded-xl border border-white/5">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <button
                  onClick={() => handleToggleFeatured(item)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    item.featured
                      ? "bg-green-500/10 border-green-500/20 text-green-400"
                      : "bg-neutral-800 border-white/10 text-neutral-400 hover:text-white"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {item.featured ? "Featured on Site" : "Hidden"}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    disabled={deletingId === item._id}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    {deletingId === item._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-white/10 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <h2 className="text-xl font-bold">
                {editingItem ? "Edit Testimonial" : "New Testimonial"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--color-secondary)] uppercase tracking-wider mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-neutral-950 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--color-secondary)] uppercase tracking-wider mb-2">
                    Role / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    placeholder="e.g. CEO, Founder"
                    className="w-full bg-neutral-950 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--color-secondary)] uppercase tracking-wider mb-2">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  value={formCompany}
                  onChange={(e) => setFormCompany(e.target.value)}
                  placeholder="e.g. TechCorp Solutions"
                  className="w-full bg-neutral-950 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--color-secondary)] uppercase tracking-wider mb-2">
                  Quote / Feedback *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formQuote}
                  onChange={(e) => setFormQuote(e.target.value)}
                  placeholder="Gary transformed our vision into an exceptional digital product..."
                  className="w-full bg-neutral-950 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--color-secondary)] uppercase tracking-wider mb-2">
                    Rating (1 - 5 Stars)
                  </label>
                  <select
                    value={formRating}
                    onChange={(e) => setFormRating(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★☆</option>
                    <option value={3}>3 Stars ★★★☆☆</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--color-secondary)] uppercase tracking-wider mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formOrder}
                    onChange={(e) => setFormOrder(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={formFeatured}
                  onChange={(e) => setFormFeatured(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-neutral-950 accent-white cursor-pointer"
                />
                <label htmlFor="featured-check" className="text-sm font-medium cursor-pointer">
                  Feature on website Testimonials strip
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-neutral-200 transition-colors disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {saving ? "Saving..." : editingItem ? "Update Testimonial" : "Create Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
