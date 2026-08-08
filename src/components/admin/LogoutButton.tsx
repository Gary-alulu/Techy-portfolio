"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin-login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="flex items-center gap-3 px-3 py-2 rounded-md text-red-400 hover:bg-red-500/10 transition-colors mt-auto w-full text-left"
    >
      <LogOut className="w-4 h-4" /> Secure Logout
    </button>
  );
}
