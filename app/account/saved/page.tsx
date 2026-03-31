"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface SavedEvent {
  id: string;
  event_id: string;
  event_title: string;
  event_slug: string;
  event_date: string;
  event_location: string;
  event_image: string | null;
  created_at: string;
}

export default function SavedEventsPage() {
  const { t, locale } = useLanguage();
  const [saved, setSaved] = useState<SavedEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("saved_events")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setSaved(data || []);
      setLoading(false);
    }
    load();
  }, []);

  const removeSaved = async (id: string) => {
    const supabase = createClient();
    await supabase.from("saved_events").delete().eq("id", id);
    setSaved(saved.filter((s) => s.id !== id));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">{t("account.saved.title")}</h1>
        <p className="mt-1 text-sm text-white/40">{t("account.saved.subtitle")}</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-pink-500/30 border-t-pink-500" />
        </div>
      ) : saved.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.02] py-16">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-500/10">
            <svg className="h-8 w-8 text-pink-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <p className="mb-1 text-sm font-medium text-white/50">{t("account.saved.empty")}</p>
          <p className="mb-5 text-[12px] text-white/25">{t("account.saved.emptyDesc")}</p>
          <Link href="/#events" className="rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 px-6 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg shadow-pink-500/20">
            {t("account.saved.discover")}
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((item) => (
            <div key={item.id} className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] transition-all duration-300 hover:border-pink-500/20 hover:bg-white/[0.05]">
              {item.event_image ? (
                <div className="relative h-40 overflow-hidden">
                  <img src={item.event_image} alt={item.event_title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07070d] via-[#07070d]/40 to-transparent" />
                </div>
              ) : (
                <div className="flex h-28 items-center justify-center bg-gradient-to-br from-pink-500/10 to-rose-500/5">
                  <svg className="h-8 w-8 text-pink-500/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              )}
              <div className="p-4">
                <Link href={`/events/${item.event_slug}`}>
                  <h3 className="mb-1 text-[15px] font-bold text-white transition-colors hover:text-pink-300">{item.event_title}</h3>
                </Link>
                <div className="mb-3 flex flex-wrap gap-x-3 gap-y-1">
                  <p className="flex items-center gap-1 text-[11px] text-white/35">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {item.event_date ? new Date(item.event_date).toLocaleDateString(locale === "de" ? "de-DE" : "en-US", { weekday: "short", month: "short", day: "numeric" }) : "TBA"}
                  </p>
                  <p className="flex items-center gap-1 text-[11px] text-white/35">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {item.event_location}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/events/${item.event_slug}`} className="flex-1 rounded-xl bg-white/[0.06] py-2 text-center text-[10px] font-semibold uppercase tracking-wider text-white/60 transition-all hover:bg-white/[0.1] hover:text-white">
                    {t("account.saved.viewEvent")}
                  </Link>
                  <button onClick={() => removeSaved(item.id)} className="rounded-xl border border-red-500/15 bg-red-500/[0.06] px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-red-400/60 transition-all hover:border-red-500/25 hover:bg-red-500/10 hover:text-red-400">
                    {t("account.saved.remove")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
