"use client";

import { useEffect, useState } from "react";
import { Mail, CheckCircle, Trash2, Loader2, Building2, User, Wallet, Calendar, Tag, Phone } from "lucide-react";

type ContactMessage = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message: string;
  status: string;
  createdAt: string;
};

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (e) {
      console.error("Failed to fetch messages:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkAsRead = async (id: string, currentStatus: string) => {
    setProcessing(id);
    const newStatus = currentStatus === "unread" ? "read" : "unread";
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages(messages.map((m) => (m._id === id ? { ...m, status: newStatus } : m)));
      }
    } catch (e) {
      alert("Failed to update status.");
    } finally {
      setProcessing(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    setProcessing(id);
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setMessages(messages.filter((m) => m._id !== id));
      }
    } catch (e) {
      alert("Failed to delete message.");
    } finally {
      setProcessing(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            Messages
            {messages.filter(m => m.status === 'unread').length > 0 && (
              <span className="bg-[var(--color-accent-blue)] text-white text-xs px-2.5 py-1 rounded-full">
                {messages.filter(m => m.status === 'unread').length} New
              </span>
            )}
          </h1>
          <p className="text-[var(--color-secondary)] text-sm mt-1">
            Inquiries from your portfolio contact form.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-[var(--color-secondary)]" />
        </div>
      ) : messages.length === 0 ? (
        <div className="bg-neutral-900 border border-white/10 rounded-xl p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-[var(--color-secondary)] opacity-50" />
          </div>
          <p className="text-white font-medium">No messages yet</p>
          <p className="text-[var(--color-secondary)] text-sm mt-1">When someone fills out your contact form, it will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => {
            const isUnread = msg.status === "unread";
            return (
              <div
                key={msg._id}
                className={`bg-neutral-900 border rounded-xl overflow-hidden transition-all duration-300 ${
                  isUnread ? "border-[var(--color-accent-blue)]/50 shadow-[0_0_20px_rgba(0,117,255,0.05)]" : "border-white/10"
                }`}
              >
                {/* Header Section */}
                <div className={`p-5 flex flex-col md:flex-row md:items-start justify-between gap-4 border-b ${isUnread ? 'border-[var(--color-accent-blue)]/20 bg-[var(--color-accent-blue)]/5' : 'border-white/5'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-xl font-bold ${
                      isUnread ? "bg-[var(--color-accent-blue)] text-white" : "bg-neutral-800 text-[var(--color-secondary)]"
                    }`}>
                      {msg.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold flex items-center gap-2 ${isUnread ? 'text-white' : 'text-neutral-300'}`}>
                        {msg.name}
                        {isUnread && <span className="w-2 h-2 rounded-full bg-[var(--color-accent-blue)] animate-pulse" />}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm mt-1">
                        <a href={`mailto:${msg.email}`} className="text-[var(--color-secondary)] hover:text-white transition-colors flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5" /> {msg.email}
                        </a>
                        {msg.phone && (
                          <a href={`tel:${msg.phone}`} className="text-[var(--color-secondary)] hover:text-white transition-colors flex items-center gap-1.5">
                            <span className="hidden sm:inline text-white/20">•</span>
                            <Phone className="w-3.5 h-3.5" /> {msg.phone}
                          </a>
                        )}
                        {msg.company && (
                          <span className="text-[var(--color-secondary)] flex items-center gap-1.5">
                            <span className="hidden sm:inline text-white/20">•</span>
                            <Building2 className="w-3.5 h-3.5" /> {msg.company}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 md:flex-col md:items-end flex-shrink-0">
                    <span className="text-xs text-[var(--color-secondary)]">
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleMarkAsRead(msg._id, msg.status)}
                        disabled={processing === msg._id}
                        className={`p-2 rounded-lg transition-colors ${
                          isUnread 
                            ? "bg-white/10 text-white hover:bg-white/20" 
                            : "bg-transparent text-[var(--color-secondary)] hover:bg-white/5 hover:text-white"
                        }`}
                        title={isUnread ? "Mark as read" : "Mark as unread"}
                      >
                        {processing === msg._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleDelete(msg._id)}
                        disabled={processing === msg._id}
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                        title="Delete message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Details Tags */}
                {(msg.projectType || msg.budget || msg.timeline) && (
                  <div className="px-5 py-3 bg-neutral-950/50 flex flex-wrap gap-3 border-b border-white/5">
                    {msg.projectType && (
                      <span className="text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 text-[var(--color-secondary)]">
                        <Tag className="w-3 h-3" /> {msg.projectType}
                      </span>
                    )}
                    {msg.budget && (
                      <span className="text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--color-accent-orange)]/10 text-[var(--color-accent-orange)]">
                        <Wallet className="w-3 h-3" /> {msg.budget}
                      </span>
                    )}
                    {msg.timeline && (
                      <span className="text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--color-accent-purple)]/10 text-[var(--color-accent-purple)]">
                        <Calendar className="w-3 h-3" /> {msg.timeline}
                      </span>
                    )}
                  </div>
                )}

                {/* Message Content */}
                <div className="p-5">
                  <p className={`whitespace-pre-wrap text-sm leading-relaxed ${isUnread ? 'text-neutral-300 font-medium' : 'text-[var(--color-secondary)]'}`}>
                    {msg.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
