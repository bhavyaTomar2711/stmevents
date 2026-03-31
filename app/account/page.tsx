"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function AccountDashboard() {
  const { t } = useLanguage();
  const [counts, setCounts] = useState({ bookings: 0, saved: 0, rentals: 0 });
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setUserName(user.user_metadata?.full_name || user.email?.split("@")[0] || "User");

      const [bookings, saved, rentals] = await Promise.all([
        supabase.from("inquiries").select("*", { count: "exact", head: true }).eq("type", "booking").eq("email", user.email),
        supabase.from("saved_events").select("*", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("inquiries").select("*", { count: "exact", head: true }).eq("type", "rental").eq("email", user.email),
      ]);

      setCounts({
        bookings: bookings.count || 0,
        saved: saved.count || 0,
        rentals: rentals.count || 0,
      });
    }
    load();
  }, []);

  const stats = [
    { labelKey: "account.shell.myBookings" as const, count: counts.bookings, href: "/account/bookings", gradient: "from-purple-600 via-purple-500 to-violet-500", icon: "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" },
    { labelKey: "account.shell.savedEvents" as const, count: counts.saved, href: "/account/saved", gradient: "from-pink-600 via-pink-500 to-rose-500", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
    { labelKey: "account.shell.myRentals" as const, count: counts.rentals, href: "/account/rentals", gradient: "from-cyan-600 via-cyan-500 to-teal-500", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
  ];

  const quickLinks = [
    { labelKey: "account.dashboard.browseEvents" as const, descKey: "account.dashboard.browseEventsDesc" as const, href: "/#events", gradient: "from-purple-600 to-violet-600", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { labelKey: "account.dashboard.rentEquipment" as const, descKey: "account.dashboard.rentEquipmentDesc" as const, href: "/#services", gradient: "from-cyan-600 to-teal-600", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35" },
    { labelKey: "account.dashboard.editProfile" as const, descKey: "account.dashboard.editProfileDesc" as const, href: "/account/profile", gradient: "from-emerald-600 to-green-600", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          {t("account.dashboard.welcome")} <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{userName}</span>
        </h1>
        <p className="mt-1 text-sm text-white/40">{t("account.dashboard.overview")}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.href}
            href={stat.href}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05]"
          >
            <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
              </svg>
            </div>
            <p className="text-3xl font-bold text-white">{stat.count}</p>
            <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-white/35">{t(stat.labelKey)}</p>
            <div className={`pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br ${stat.gradient} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20`} />
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div className="mt-10">
        <h2 className="mb-4 text-lg font-bold text-white">{t("account.dashboard.quickLinks")}</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.gradient} p-5 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10`}
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
              </div>
              <h3 className="text-[15px] font-bold text-white">{t(item.labelKey)}</h3>
              <p className="mt-0.5 text-[12px] text-white/60">{t(item.descKey)}</p>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
