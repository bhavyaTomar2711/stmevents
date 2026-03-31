"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface BookingInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  event_name: string | null;
  status: string;
  created_at: string;
}

export default function BookingsPage() {
  const { t, locale } = useLanguage();
  const [bookings, setBookings] = useState<BookingInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("inquiries")
        .select("*")
        .eq("type", "booking")
        .eq("email", user.email)
        .order("created_at", { ascending: false });

      setBookings(data || []);
      setLoading(false);
    }
    load();
  }, []);

  const statusStyles: Record<string, { bg: string; text: string; labelKey: "account.status.pending" | "account.status.reviewed" | "account.status.replied" }> = {
    new: { bg: "bg-amber-500/15", text: "text-amber-400", labelKey: "account.status.pending" },
    read: { bg: "bg-blue-500/15", text: "text-blue-400", labelKey: "account.status.reviewed" },
    replied: { bg: "bg-emerald-500/15", text: "text-emerald-400", labelKey: "account.status.replied" },
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">{t("account.bookings.title")}</h1>
        <p className="mt-1 text-sm text-white/40">{t("account.bookings.subtitle")}</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-500/30 border-t-purple-500" />
        </div>
      ) : bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.02] py-16">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10">
            <svg className="h-8 w-8 text-purple-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
          </div>
          <p className="mb-1 text-sm font-medium text-white/50">{t("account.bookings.empty")}</p>
          <p className="mb-5 text-[12px] text-white/25">{t("account.bookings.emptyDesc")}</p>
          <Link href="/#events" className="rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg shadow-purple-500/20">
            {t("account.bookings.browse")}
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => {
            const style = statusStyles[booking.status] || statusStyles.new;
            return (
              <div key={booking.id} className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] transition-all duration-300 hover:border-purple-500/20 hover:bg-white/[0.05]">
                <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-violet-500" />

                <div className="p-5">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 shadow-lg shadow-purple-500/20">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                      </svg>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${style.bg} ${style.text}`}>
                      {t(style.labelKey)}
                    </span>
                  </div>

                  <h3 className="mb-1 text-[16px] font-bold text-white">{booking.event_name || t("account.bookings.fallback")}</h3>
                  <p className="mb-4 text-[11px] text-white/25">
                    {t("account.status.submitted")} {new Date(booking.created_at).toLocaleDateString(locale === "de" ? "de-DE" : "en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1.5">
                      <svg className="h-3 w-3 text-purple-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-[11px] font-medium text-white/50">{booking.name}</span>
                    </div>
                    {booking.phone && (
                      <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1.5">
                        <svg className="h-3 w-3 text-purple-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-[11px] font-medium text-white/50">{booking.phone}</span>
                      </div>
                    )}
                  </div>

                  {booking.message && (
                    <div className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-3">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/20">{t("account.bookings.yourMessage")}</p>
                      <p className="mt-1 line-clamp-3 text-[12px] leading-relaxed text-white/45">{booking.message}</p>
                    </div>
                  )}
                </div>

                <div className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-purple-500 to-violet-500 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-15" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
