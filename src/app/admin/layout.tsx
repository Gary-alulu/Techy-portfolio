import Link from "next/link";
import { LayoutDashboard, FileText, Settings, Mail, MessageSquare } from "lucide-react";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-black text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-neutral-950 p-6 flex flex-col gap-8">
        <div>
          <h2 className="text-xl font-bold mb-1">Admin Panel</h2>
          <p className="text-xs text-[var(--color-secondary)]">Portfolio Manager</p>
        </div>
        
        <nav className="flex-1 flex flex-col gap-2">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 transition-colors">
            <LayoutDashboard className="w-4 h-4" /> Projects
          </Link>
          <Link href="/admin/resumes" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 transition-colors">
            <FileText className="w-4 h-4" /> Resumes
          </Link>
          <Link href="/admin/testimonials" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 transition-colors">
            <MessageSquare className="w-4 h-4" /> Testimonials
          </Link>
          <Link href="/admin/messages" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 transition-colors">
            <Mail className="w-4 h-4" /> Messages
          </Link>
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 transition-colors text-white/50 cursor-not-allowed">
            <Settings className="w-4 h-4" /> Settings (Soon)
          </Link>
        </nav>
        
        <LogoutButton />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-10 bg-[#0a0a0a]">
        {children}
      </main>
    </div>
  );
}
