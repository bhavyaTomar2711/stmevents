"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { EventData, TicketStatus } from "@/lib/events";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useSiteContent } from "@/lib/hooks/useSiteContent";
import type { TranslationKey } from "@/lib/i18n/translations";
import { createClient } from "@/lib/supabase/client";

interface UpcomingEventsProps {
  events: EventData[];
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

const AUTO_SLIDE_INTERVAL = 2000;

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  const { t } = useLanguage();
  const { tc } = useSiteContent();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(4);
  const trackRef = useRef<HTMLDivElement>(null);

  // Responsive slides per view
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setSlidesPerView(1);
      else if (w < 1024) setSlidesPerView(2);
      else if (w < 1280) setSlidesPerView(3);
      else setSlidesPerView(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, events.length - slidesPerView);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-slide
  useEffect(() => {
    if (isPaused || events.length <= slidesPerView) return;
    const timer = setInterval(goNext, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, goNext, events.length, slidesPerView]);

  // Clamp index on resize
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const translateX = -(currentIndex * (100 / slidesPerView));

  return (
    <section id="events" className="relative overflow-hidden bg-black pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24">
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="events-orb-1 absolute h-[800px] w-[800px] rounded-full will-change-transform"
          style={{
            background: "radial-gradient(circle, rgba(157,78,221,0.12) 0%, rgba(123,44,191,0.06) 40%, transparent 70%)",
            filter: "blur(140px)",
            top: "-10%",
            left: "-15%",
          }}
        />
        <div
          className="events-orb-2 absolute h-[600px] w-[600px] rounded-full will-change-transform"
          style={{
            background: "radial-gradient(circle, rgba(123,44,191,0.1) 0%, rgba(76,29,149,0.05) 40%, transparent 70%)",
            filter: "blur(120px)",
            bottom: "-10%",
            right: "-10%",
          }}
        />
      </div>

      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Top fade from hero */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {/* Section Header + Arrow Controls */}
        <div className="mb-14 flex items-end justify-between md:mb-20">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-purple-400"
            >
              <span className="inline-block h-px w-10 bg-gradient-to-r from-purple-500 to-transparent" />
              {tc("events", "label", "events.label")}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 text-[clamp(2.5rem,5.5vw,5.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.03em] text-white"
            >
              {tc("events", "heading1", "events.heading1")}
              <br />
              {tc("events", "heading2", "events.heading2")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/30"
            >
              {tc("events", "description", "events.description")}
            </motion.p>
          </div>

          {/* Arrow Controls */}
          {events.length > slidesPerView && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden items-center gap-3 sm:flex"
            >
              <button
                onClick={goPrev}
                aria-label="Previous events"
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/10"
              >
                <svg className="h-5 w-5 text-white/50 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goNext}
                aria-label="Next events"
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/10"
              >
                <svg className="h-5 w-5 text-white/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>
          )}
        </div>

        {/* Slider */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            ref={trackRef}
            className="flex"
            animate={{ x: `${translateX}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          >
            {events.map((event, i) => (
              <div
                key={event.slug}
                className="flex-shrink-0 px-2.5 sm:px-3"
                style={{ width: `${100 / slidesPerView}%` }}
              >
                <SliderCard event={event} index={i} />
              </div>
            ))}
          </motion.div>

          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-black to-transparent" />
        </div>

        {/* Progress dots */}
        {events.length > slidesPerView && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === currentIndex
                    ? "w-8 bg-purple-500"
                    : "w-1.5 bg-white/15 hover:bg-white/30"
                }`}
              />
            ))}
          </div>
        )}

        {/* Mobile arrows (below slider) */}
        {events.length > slidesPerView && (
          <div className="mt-6 flex items-center justify-center gap-3 sm:hidden">
            <button
              onClick={goPrev}
              aria-label="Previous events"
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/10"
            >
              <svg className="h-4 w-4 text-white/50 transition-all duration-300 group-hover:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-[11px] font-medium tracking-wider text-white/30">
              {currentIndex + 1} / {maxIndex + 1}
            </span>
            <button
              onClick={goNext}
              aria-label="Next events"
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/10"
            >
              <svg className="h-4 w-4 text-white/50 transition-all duration-300 group-hover:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 flex justify-center md:mt-20"
        >
          <Link
            href="/events"
            className="glass-card group inline-flex items-center gap-3 rounded-full px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50 transition-all duration-400 hover:text-white hover:shadow-[0_4px_20px_rgba(124,58,237,0.1)]"
          >
            <span>{t("events.viewAll")}</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.06] transition-all duration-300 group-hover:bg-purple-500/20">
              <svg
                className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes events-orb-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(80%, 30%) scale(1.2); }
          66% { transform: translate(40%, -5%) scale(0.9); }
        }
        @keyframes events-orb-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-70%, -40%) scale(0.85); }
          66% { transform: translate(-30%, 15%) scale(1.15); }
        }
        .events-orb-1 {
          animation: events-orb-drift-1 22s ease-in-out infinite;
        }
        .events-orb-2 {
          animation: events-orb-drift-2 28s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

/* ─── Slider Card ─── */
function SliderCard({ event, index }: { event: EventData; index: number }) {
  const { locale, t } = useLanguage();
  const router = useRouter();
  const displayTitle = (locale === "de" && event.title_de) ? event.title_de : event.title;
  const displayLocation = (locale === "de" && event.location_de) ? event.location_de : event.location;
  const isSoldOut = event.ticketStatus === "sold-out";
  const badge = statusConfig[event.ticketStatus || ""];
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
          .eq("event_slug", event.slug)
          .maybeSingle();
        if (data) setIsSaved(true);
      } catch { /* stale token — ignore */ }
    }
    checkSaved();
  }, [event.slug]);

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
    if (!user) { router.push("/account/login"); setSaving(false); return; }

    if (isSaved) {
      await supabase.from("saved_events").delete().eq("user_id", user.id).eq("event_slug", event.slug);
      setIsSaved(false);
    } else {
      await supabase.from("saved_events").insert({
        user_id: user.id,
        event_id: event.slug,
        event_title: event.title,
        event_slug: event.slug,
        event_date: event.date,
        event_location: event.location,
        event_image: event.image || null,
      });
      setIsSaved(true);
    }
    setSaving(false);
  };

  return (
    <Link href={`/events/${event.slug}`} className="group block h-full">
      <div className="glass-card relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(124,58,237,0.15),0_20px_50px_-20px_rgba(0,0,0,0.6)]">
        {/* Image */}
        <div className="relative aspect-[4/5] w-full flex-shrink-0 overflow-hidden">
          {event.image ? (
            <Image
              src={event.image}
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
              {event.date}
            </span>
          </div>

          {/* Save button */}
          <button
            onClick={toggleSave}
            className={`absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-xl transition-all duration-300 ${
              isSaved
                ? "border-pink-500/40 bg-pink-500/20 text-pink-400 shadow-lg shadow-pink-500/20"
                : "border-white/[0.08] bg-black/40 text-white/50 hover:border-pink-500/30 hover:bg-pink-500/10 hover:text-pink-400"
            }`}
            aria-label={isSaved ? "Unsave event" : "Save event"}
          >
            <svg className="h-4 w-4" fill={isSaved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isSaved ? 0 : 2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Ticket status badge */}
          {badge && (
            <div className="absolute bottom-4 left-4 z-10">
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] ${badge.color} ${badge.border} ${badge.bg}`}>
                <span className={`h-1 w-1 rounded-full ${badge.dot}`} />
                {t(badge.labelKey)}
              </span>
            </div>
          )}

          {/* Sold out overlay */}
          {isSoldOut && <div className="absolute inset-0 z-[5] bg-black/40" />}
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

          {/* Bottom row */}
          <div className="mt-5 flex items-center justify-between border-t border-white/[0.04] pt-4">
            {event.eventbriteLink && !isSoldOut ? (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-400/80 transition-colors duration-300 group-hover:text-purple-300">
                {t("eventCard.tickets")}
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </span>
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
              <svg className="h-3 w-3 text-purple-400 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>

        {/* Bottom purple accent on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </Link>
  );
}
