"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z", fill: true },
  { label: "Events", href: "/admin/events", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", color: "purple" },
  { label: "Equipment", href: "/admin/equipment", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z", color: "green" },
  { label: "Gallery", href: "/admin/gallery", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z", color: "cyan" },
  { label: "Resident DJs", href: "/admin/djs", icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z", color: "pink" },
  { label: "Contacts", href: "/admin/inquiries", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", color: "amber" },
];

const colorMap: Record<string, { active: string; icon: string }> = {
  purple: { active: "bg-purple-500/15 text-purple-300 border-purple-500/20", icon: "text-purple-400" },
  green: { active: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20", icon: "text-emerald-400" },
  cyan: { active: "bg-cyan-500/15 text-cyan-300 border-cyan-500/20", icon: "text-cyan-400" },
  pink: { active: "bg-pink-500/15 text-pink-300 border-pink-500/20", icon: "text-pink-400" },
  amber: { active: "bg-amber-500/15 text-amber-300 border-amber-500/20", icon: "text-amber-400" },
};

export default function AdminShell({ children, user }: { children: React.ReactNode; user: User }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-[#07070d]">
      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-white/[0.06] bg-[#0b0b14]/95 px-4 py-3 backdrop-blur-xl md:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-violet-600">
            <Image src="https://res.cloudinary.com/dqiuwzvfb/image/upload/v1774434332/logoo_bho6qe.png" alt="STM" width={20} height={20} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">STM Events</h2>
            <p className="text-[9px] font-medium uppercase tracking-wider text-purple-400">Admin Panel</p>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
          aria-label="Toggle sidebar"
        >
          <span className={`h-[1.5px] w-5 rounded-full bg-white transition-all duration-300 ${sidebarOpen ? "translate-y-[6.5px] rotate-45" : ""}`} />
          <span className={`h-[1.5px] w-5 rounded-full bg-white transition-all duration-300 ${sidebarOpen ? "opacity-0" : ""}`} />
          <span className={`h-[1.5px] w-5 rounded-full bg-white transition-all duration-300 ${sidebarOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-white/[0.06] bg-[#0b0b14] transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo section - desktop */}
        <div className="hidden border-b border-white/[0.06] px-5 py-5 md:block">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg shadow-purple-500/20">
              <Image src="https://res.cloudinary.com/dqiuwzvfb/image/upload/v1774434332/logoo_bho6qe.png" alt="STM" width={24} height={24} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">STM Events</h2>
              <p className="text-[10px] font-medium uppercase tracking-wider text-purple-400/80">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* View Website link */}
        <div className="hidden border-b border-white/[0.06] px-5 py-3 md:block">
          <Link href="/" className="flex items-center gap-2 text-[11px] font-medium text-white/40 transition-colors hover:text-white/70">
            View Website
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Spacer for mobile top bar */}
        <div className="h-[53px] md:hidden" />

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              const colors = item.color ? colorMap[item.color] : null;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200 ${
                    isActive
                      ? colors ? colors.active : "bg-purple-500/15 text-purple-300 border border-purple-500/20"
                      : "border border-transparent text-white/45 hover:bg-white/[0.04] hover:text-white/80"
                  } ${isActive && !colors ? "border border-purple-500/20" : ""}`}
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                    isActive
                      ? colors ? `${colors.icon} bg-white/[0.08]` : "bg-purple-500/15 text-purple-400"
                      : "bg-white/[0.04] text-white/40 group-hover:text-white/60"
                  }`}>
                    <svg className="h-[18px] w-[18px] flex-shrink-0" fill={item.fill ? "currentColor" : "none"} viewBox="0 0 24 24" stroke={item.fill ? "none" : "currentColor"} strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  {item.label}
                  {isActive && (
                    <svg className="ml-auto h-4 w-4 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User / Logout */}
        <div className="border-t border-white/[0.06] p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/[0.03] p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/30 to-violet-500/30 text-[12px] font-bold text-purple-300">
              {user.email?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium text-white/50">Logged in as</p>
              <p className="truncate text-[12px] font-semibold text-white/80">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/15 bg-red-500/[0.06] py-2.5 text-[11px] font-semibold uppercase tracking-wider text-red-400/70 transition-all hover:border-red-500/25 hover:bg-red-500/10 hover:text-red-400"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="min-w-0 flex-1 pt-[53px] md:ml-[260px] md:pt-0">
        <div className="p-4 sm:p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
