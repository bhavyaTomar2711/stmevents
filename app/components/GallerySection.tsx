"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { GalleryItem } from "@/lib/gallery";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface GallerySectionProps {
  items: GalleryItem[];
}

/* ── Lightbox ── */
function Lightbox({
  item,
  onClose,
}: {
  item: GalleryItem;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-6 backdrop-blur-xl sm:p-10"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950 shadow-2xl shadow-black/50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/60 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:text-white"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Media */}
        <div className="relative w-full overflow-hidden bg-black">
          {item.mediaType === "video" && item.videoUrl ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="max-h-[65vh] w-full object-contain"
            >
              <source src={item.videoUrl} type="video/mp4" />
            </video>
          ) : (
            <div className="relative flex items-center justify-center">
              <Image
                src={item.imageUrl || ""}
                alt={item.title}
                width={1200}
                height={800}
                className="max-h-[65vh] w-full object-contain"
                priority
              />
            </div>
          )}
        </div>

        {/* Info bar */}
        <div className="border-t border-white/[0.06] px-7 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold uppercase tracking-wide text-white">
                {item.title}
              </h3>
              {item.description && (
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-white/40">
                  {item.description}
                </p>
              )}
            </div>
            <div className="flex flex-shrink-0 items-center gap-2">
              {item.category && (
                <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[10px] font-medium tracking-wider text-purple-400 uppercase">
                  {item.category}
                </span>
              )}
            </div>
          </div>
          {item.relatedEvent && (
            <p className="mt-2 text-[11px] text-white/25">
              from {item.relatedEvent.title}
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Skeleton Placeholder ── */
function SkeletonBlock({ aspect = "aspect-square", className = "" }: { aspect?: string; className?: string }) {
  return (
    <div className={`animate-pulse overflow-hidden rounded-2xl bg-white/[0.04] ${aspect} ${className}`}>
      <div className="h-full w-full bg-gradient-to-br from-white/[0.02] to-white/[0.06]" />
    </div>
  );
}

/* ── Media Block ── */
function MediaBlock({
  item,
  index,
  aspect = "aspect-square",
  className,
  onClick,
}: {
  item: GalleryItem;
  index: number;
  aspect?: string;
  className?: string;
  onClick: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const src = item.mediaType === "video"
    ? (item.videoUrl || "")
    : (item.imageUrl || "");
  const thumb = item.thumbnailUrl || item.imageUrl || "";

  const handleLoad = useCallback(() => setLoaded(true), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm ${aspect} ${className ?? ""}`}
      onClick={onClick}
    >
      {/* Skeleton while loading */}
      {!loaded && (
        <div className="absolute inset-0 z-10 animate-pulse bg-white/[0.04]">
          <div className="h-full w-full bg-gradient-to-br from-white/[0.02] via-white/[0.05] to-white/[0.02]" />
        </div>
      )}

      {item.mediaType === "video" && item.videoUrl ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={handleLoad}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={thumb || src}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={handleLoad}
        />
      )}

      {/* Hover overlay — simple dark to bright, no purple glow */}
      <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/0" />

      {/* Subtle border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border border-white/0 transition-all duration-500 group-hover:border-white/10" />

      {/* Video play icon */}
      {item.mediaType === "video" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 scale-75 items-center justify-center rounded-full border border-white/20 bg-black/30 opacity-0 backdrop-blur-md transition-all duration-400 group-hover:scale-100 group-hover:opacity-100">
            <svg className="ml-1 h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Bottom gradient + title */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-4 left-4 translate-y-3 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70">
          {item.title}
        </span>
      </div>
    </motion.div>
  );
}

/* ── Main Section ── */
export default function GallerySection({ items }: GallerySectionProps) {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const video = items.find((i) => i.mediaType === "video") || items[0];
  const images = items.filter((i) => i.id !== video?.id);
  const grid1 = images[0] || null;
  const grid2 = images[1] || null;
  const grid3 = images[2] || null;
  const grid4 = images[3] || null;

  const marqueeItems = [...items, ...items];

  // Check if items are loaded (from CMS vs empty)
  const hasItems = items.length > 0;

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative overflow-hidden bg-black pt-12 pb-28 sm:pt-16 sm:pb-32 md:pt-20 md:pb-40"
    >
      {/* Noise texture — lightweight, no animated orbs */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {/* Header */}
        <div ref={headerRef} className="mb-14 md:mb-20">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-purple-400"
          >
            <span className="inline-block h-px w-10 bg-gradient-to-r from-purple-500 to-transparent" />
            {t("gallery.label")}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 text-[clamp(2.5rem,5.5vw,5.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.03em]"
          >
            <span className="block text-white">{t("gallery.heading1")}</span>
            <span className="block text-white">{t("gallery.heading2")}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/30"
          >
            {t("gallery.description")}
          </motion.p>
        </div>

        {/* Gallery Grid — with skeleton fallback */}
        {hasItems ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {/* Row 1: large feature + tall right that stretches to match */}
            {video && (
              <div className="sm:col-span-1 lg:col-span-2">
                <MediaBlock item={video} index={0} aspect="aspect-[16/9]" onClick={() => setLightboxItem(video)} />
              </div>
            )}
            {grid1 && (
              <MediaBlock item={grid1} index={1} aspect="" className="h-full" onClick={() => setLightboxItem(grid1)} />
            )}
            {/* Row 2: three equal columns */}
            {grid2 && (
              <MediaBlock item={grid2} index={2} aspect="aspect-[16/9]" onClick={() => setLightboxItem(grid2)} />
            )}
            {grid3 && (
              <MediaBlock item={grid3} index={3} aspect="aspect-[16/9]" onClick={() => setLightboxItem(grid3)} />
            )}
            {grid4 && (
              <MediaBlock item={grid4} index={4} aspect="aspect-[16/9]" onClick={() => setLightboxItem(grid4)} />
            )}
          </div>
        ) : (
          /* Skeleton grid while data loads */
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
            <div className="sm:col-span-2 lg:col-span-2">
              <SkeletonBlock aspect="aspect-[16/9]" />
            </div>
            <SkeletonBlock aspect="aspect-[16/9]" />
            <SkeletonBlock aspect="aspect-[16/9]" />
            <SkeletonBlock aspect="aspect-[16/9]" />
            <SkeletonBlock aspect="aspect-[16/9]" />
          </div>
        )}

        {/* Marquee Strip */}
        <div className="mt-16 md:mt-20">
          <div className="relative overflow-hidden rounded-xl">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-black to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-black to-transparent" />
            <div className="animate-marquee flex gap-4">
              {marqueeItems.map((item, i) => (
                <div
                  key={`marquee-${i}`}
                  className="group relative h-28 w-48 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border border-white/[0.04] sm:h-32 sm:w-56 md:h-40 md:w-72"
                  onClick={() => setLightboxItem(item)}
                >
                  <Image
                    src={item.thumbnailUrl || item.imageUrl || ""}
                    alt={item.title}
                    fill
                    sizes="288px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/25 transition-colors duration-500 group-hover:bg-black/5" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* View Full Gallery Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 flex justify-center md:mt-16"
        >
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-3 rounded-full border border-white/[0.06] bg-white/[0.02] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50 backdrop-blur-sm transition-all duration-400 hover:border-purple-500/20 hover:bg-purple-500/5 hover:text-white"
          >
            <span>{t("gallery.viewAll")}</span>
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

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />}
      </AnimatePresence>
    </section>
  );
}
