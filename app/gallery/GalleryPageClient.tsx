"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { GalleryItem } from "@/lib/gallery-shared";
import { CATEGORY_LABELS } from "@/lib/gallery-shared";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { TranslationKey } from "@/lib/i18n/translations";

/* ── Lightbox ── */
function Lightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-950"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/60 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/30 hover:text-white"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Media */}
        <div className="relative aspect-video w-full overflow-hidden bg-black">
          {item.mediaType === "video" && item.videoUrl ? (
            <video autoPlay muted loop playsInline className="h-full w-full object-contain">
              <source src={item.videoUrl} type="video/mp4" />
            </video>
          ) : (
            <img
              src={item.imageUrl || ""}
              alt={item.title}
              className="h-full w-full object-contain"
            />
          )}
        </div>

        {/* Info */}
        <div className="p-6 sm:p-8">
          <h3 className="text-xl font-semibold uppercase tracking-wide text-white">
            {item.title}
          </h3>
          {item.description && (
            <div
              className="mt-3 max-w-2xl text-sm leading-relaxed text-white/50 [&_p]:m-0 [&_strong]:font-semibold [&_strong]:text-white/70"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          )}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {item.category && (
              <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[10px] font-medium tracking-wider text-purple-400 uppercase">
                {CATEGORY_LABELS[item.category] || item.category}
              </span>
            )}
            {item.relatedEvent && (
              <Link
                href={`/events/${item.relatedEvent.slug}`}
                className="text-[11px] text-white/30 transition-colors hover:text-purple-400"
              >
                from {item.relatedEvent.title} &rarr;
              </Link>
            )}
            {item.date && (
              <span className="text-[11px] text-white/20">{item.date}</span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Gallery Card ── */
function GalleryCard({
  item,
  index,
  onClick,
}: {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}) {
  const src = item.thumbnailUrl || item.imageUrl || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="glass-card group relative cursor-pointer overflow-hidden rounded-2xl"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={src}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-0 rounded-2xl border border-purple-500/0 transition-all duration-500 group-hover:border-purple-500/20" />

        {/* Video icon */}
        {item.mediaType === "video" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-14 w-14 scale-75 items-center justify-center rounded-full border border-white/20 bg-black/40 opacity-0 backdrop-blur-md transition-all duration-400 group-hover:scale-100 group-hover:opacity-100">
              <svg className="ml-1 h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        {/* Category badge */}
        {item.category && (
          <div className="absolute top-3 left-3">
            <span className="rounded-full border border-white/[0.08] bg-black/50 px-3 py-1 text-[9px] font-semibold tracking-[0.15em] text-white/70 uppercase backdrop-blur-xl">
              {CATEGORY_LABELS[item.category] || item.category}
            </span>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      {/* Title */}
      <div className="p-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.06em] text-white/80 transition-colors group-hover:text-white">
          {item.title}
        </h3>
        {item.relatedEvent && (
          <p className="mt-1 text-[11px] text-white/30">
            {item.relatedEvent.title}
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* ── Filter Tabs ── */
const FILTER_TABS: { labelKey: TranslationKey; value: string }[] = [
  { labelKey: "galleryPage.filterAll", value: "all" },
  { labelKey: "galleryPage.filterEvents", value: "event" },
  { labelKey: "galleryPage.filterAftermovies", value: "aftermovie" },
  { labelKey: "galleryPage.filterDJSets", value: "djset" },
  { labelKey: "galleryPage.filterBTS", value: "bts" },
  { labelKey: "galleryPage.filterPromo", value: "promo" },
];

/* ── Main Page ── */
export default function GalleryPageClient({ items }: { items: GalleryItem[] }) {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filtered = activeFilter === "all"
    ? items
    : items.filter((i) => i.category === activeFilter);

  return (
    <main className="relative min-h-screen bg-black">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute top-0 left-1/4 h-[800px] w-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(157,78,221,0.08) 0%, transparent 70%)",
            filter: "blur(140px)",
          }}
        />
        <div
          className="absolute right-0 bottom-1/4 h-[600px] w-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(123,44,191,0.06) 0%, transparent 70%)",
            filter: "blur(120px)",
          }}
        />
      </div>

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-24 sm:px-10 lg:px-16">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="group mb-12 inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-white/40 uppercase transition-colors duration-300 hover:text-purple-400"
          >
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t("common.backToHome")}
          </Link>
        </motion.div>

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-purple-400"
          >
            <span className="inline-block h-px w-10 bg-gradient-to-r from-purple-500 to-transparent" />
            {t("galleryPage.label")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-3 text-[clamp(2.5rem,6vw,6rem)] font-bold uppercase leading-[0.88] tracking-[-0.03em] text-white"
          >
            {t("galleryPage.heading")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/30"
          >
            {t("galleryPage.description")}
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-10 flex flex-wrap gap-2"
        >
          {FILTER_TABS.map((tab) => {
            const count = tab.value === "all"
              ? items.length
              : items.filter((i) => i.category === tab.value).length;
            if (tab.value !== "all" && count === 0) return null;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`rounded-full border px-4 py-2 text-[11px] font-medium tracking-[0.1em] uppercase transition-all duration-300 ${
                  activeFilter === tab.value
                    ? "border-purple-500/40 bg-purple-500/15 text-purple-300 backdrop-blur-sm"
                    : "border-white/[0.06] bg-white/[0.02] text-white/40 backdrop-blur-sm hover:border-purple-500/20 hover:text-white/60"
                }`}
              >
                {t(tab.labelKey)}
                <span className="ml-1.5 text-[9px] opacity-50">{count}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((item, i) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={i}
                onClick={() => setLightboxItem(item)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-white/30">{t("common.noItems")}</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />}
      </AnimatePresence>
    </main>
  );
}
