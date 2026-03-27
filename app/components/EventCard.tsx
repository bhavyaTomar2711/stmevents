"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { TicketStatus } from "@/lib/events";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { TranslationKey } from "@/lib/i18n/translations";
import { createClient } from "@/lib/supabase/client";

interface EventCardProps {
  title: string;
  title_de?: string;
  date: string;
  time?: string;
  location: string;
  location_de?: string;
  image?: string;
  slug: string;
  index: number;
  eventbriteLink?: string;
  ticketStatus?: TicketStatus;
}

const statusConfig: Record<
  string,
  { labelKey: TranslationKey; color: string; border: string; bg: string; dot: string }
> = {
  "sold-out": {
    labelKey: "eventCard.soldOut",
    color: "text-red-400",
    border: "border-red-500/30",
    bg: "bg-red-500/10",
    dot: "bg-red-400",
  },
  limited: {
    labelKey: "eventCard.limited",
    color: "text-amber-400",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    dot: "bg-amber-400",
  },
  "final-release": {
    labelKey: "eventCard.finalRelease",
    color: "text-orange-400",
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
    dot: "bg-orange-400",
  },
};

export default function EventCard({
  title,
  title_de,
  date,
  time,
  location,
  location_de,
  image,
  slug,
  index,
  eventbriteLink,
  ticketStatus = "available",
}: EventCardProps) {
  const router = useRouter();
  const { locale, t } = useLanguage();
  const displayTitle = (locale === "de" && title_de) ? title_de : title;
  const displayLocation = (locale === "de" && location_de) ? location_de : location;
  const isSoldOut = ticketStatus === "sold-out";
  const badge = statusConfig[ticketStatus];
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function checkSaved() {
      try {
        const supabase = createClient();
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) return;

        const { data } = await supabase
          .from("saved_events")
          .select("id")
          .eq("user_id", user.id)
          .eq("event_slug", slug)
          .maybeSingle();

        if (data) setIsSaved(true);
      } catch { /* stale token — ignore */ }
    }
    checkSaved();
  }, [slug]);

  const toggleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (saving) return;
    setSaving(true);

    const supabase = createClient();
    let user = null;
    try {
      const { data, error } = await supabase.auth.getUser();
      if (!error) user = data.user;
    } catch { /* stale token */ }

    if (!user) {
      router.push("/account/login");
      setSaving(false);
      return;
    }

    if (isSaved) {
      await supabase
        .from("saved_events")
        .delete()
        .eq("user_id", user.id)
        .eq("event_slug", slug);
      setIsSaved(false);
    } else {
      await supabase.from("saved_events").insert({
        user_id: user.id,
        event_id: slug,
        event_title: title,
        event_slug: slug,
        event_date: date,
        event_location: location,
        event_image: image || null,
      });
      setIsSaved(true);
    }
    setSaving(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <div
        role="link"
        tabIndex={0}
        onClick={() => router.push(`/events/${slug}`)}
        onKeyDown={(e) => { if (e.key === "Enter") router.push(`/events/${slug}`); }}
        className="group block h-full cursor-pointer"
      >
        <div className="glass-card relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(124,58,237,0.15),0_20px_50px_-20px_rgba(0,0,0,0.6)]">
          {/* Image Area */}
          <div className="relative aspect-square w-full flex-shrink-0 overflow-hidden">
            {image ? (
              <Image
                src={image}
                alt={displayTitle}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(124,58,237,0.12),transparent_70%)]" />
              </div>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

            {/* Purple wash on hover */}
            <div className="absolute inset-0 bg-purple-900/15 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Date badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-black/60 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-xl">
                <span className="h-1 w-1 rounded-full bg-purple-400 shadow-sm shadow-purple-400/50" />
                {date}{time ? ` · ${time}` : ""}
              </span>
            </div>

            {/* Save / Heart button */}
            <button
              onClick={toggleSave}
              className={`absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-xl transition-all duration-300 ${
                isSaved
                  ? "border-pink-500/40 bg-pink-500/20 text-pink-400 shadow-lg shadow-pink-500/20"
                  : "border-white/[0.08] bg-black/40 text-white/50 hover:border-pink-500/30 hover:bg-pink-500/10 hover:text-pink-400"
              }`}
              aria-label={isSaved ? "Unsave event" : "Save event"}
            >
              <svg
                className="h-4 w-4"
                fill={isSaved ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={isSaved ? 0 : 2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            {/* Ticket status badge */}
            {badge && (
              <div className="absolute bottom-4 left-4 z-10">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] ${badge.color} ${badge.border} ${badge.bg}`}
                >
                  <span className={`h-1 w-1 rounded-full ${badge.dot}`} />
                  {t(badge.labelKey)}
                </span>
              </div>
            )}

            {/* Sold out overlay */}
            {isSoldOut && (
              <div className="absolute inset-0 z-[5] bg-black/40" />
            )}
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-1 flex-col justify-between px-5 pt-4 pb-5">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors duration-300 group-hover:text-purple-100 sm:text-[15px]">
                {displayTitle}
              </h3>
              <p className="mt-1.5 flex items-center gap-1.5 text-[12px] tracking-wider text-white/35">
                <svg className="h-3 w-3 text-purple-500/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {displayLocation}
              </p>
            </div>

            {/* Bottom row — ticket link + view event */}
            <div className="mt-5 flex items-center justify-between border-t border-white/[0.04] pt-4">
              {/* Ticket CTA */}
              {eventbriteLink && !isSoldOut ? (
                <a
                  href={eventbriteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-400/80 transition-colors duration-300 hover:text-purple-300"
                >
                  {t("eventCard.tickets")}
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              ) : isSoldOut ? (
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-400/60">
                  {t("eventCard.soldOut")}
                </span>
              ) : (
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/20">
                  {t("eventCard.comingSoon")}
                </span>
              )}

              {/* View arrow */}
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.08] opacity-0 transition-all duration-500 group-hover:border-purple-500/30 group-hover:bg-purple-500/10 group-hover:opacity-100">
                <svg
                  className="h-3 w-3 text-purple-400 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* Bottom purple accent on hover */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      </div>
    </motion.div>
  );
}
