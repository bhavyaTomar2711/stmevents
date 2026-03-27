"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { DJData } from "@/lib/djs";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useSiteContent } from "@/lib/hooks/useSiteContent";

const AUTO_SLIDE_INTERVAL = 2000;

/* ── Card Component ── */
function DJCard({ dj }: { dj: DJData }) {
  return (
    <Link href={`/djs/${dj.slug}`} className="group block h-full">
      <div className="glass-card relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(124,58,237,0.15),0_20px_50px_-20px_rgba(0,0,0,0.6)]">
        <div className="relative w-full flex-shrink-0 overflow-hidden" style={{ aspectRatio: "3 / 4" }}>
          {dj.photo ? (
            <Image
              src={dj.photo}
              alt={dj.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-500/10 to-violet-500/5">
              <svg className="h-16 w-16 text-purple-500/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-purple-900/15 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Resident badge */}
          {dj.resident && (
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-400 backdrop-blur-xl">
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                Resident
              </span>
            </div>
          )}

          {/* Content overlay */}
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.2em] text-purple-300/70 transition-colors duration-300 group-hover:text-purple-300">
              {dj.genre}
            </span>
            <h3 className="text-xl font-bold uppercase tracking-tight text-white sm:text-2xl">
              {dj.name}
            </h3>
            <div className="mt-2 h-[1px] w-0 bg-purple-500 transition-all duration-500 group-hover:w-12" />
          </div>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </Link>
  );
}

/* ── Main Section ── */
export default function ResidentDJs({ djs }: { djs: DJData[] }) {
  const { t } = useLanguage();
  const { tc } = useSiteContent();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(4);

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

  const maxIndex = Math.max(0, djs.length - slidesPerView);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-slide
  useEffect(() => {
    if (isPaused || djs.length <= slidesPerView) return;
    const timer = setInterval(goNext, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, goNext, djs.length, slidesPerView]);

  // Clamp index on resize
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const translateX = -(currentIndex * (100 / slidesPerView));

  return (
    <section
      id="djs"
      className="relative overflow-hidden bg-black py-24 sm:py-28 md:py-32"
    >
      {/* Noise */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Top divider */}
      <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {/* Section Header + Arrow Controls */}
        <div className="mb-14 flex items-end justify-between md:mb-20">
          <div>
            <span className="mb-4 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-purple-400">
              <span className="inline-block h-px w-10 bg-gradient-to-r from-purple-500 to-transparent" />
              {tc("djs", "label", "djs.label")}
            </span>

            <h2 className="mt-3 text-[clamp(2.5rem,5.5vw,5.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.03em] text-white">
              {tc("djs", "heading1", "djs.heading1")}
              <br />
              {tc("djs", "heading2", "djs.heading2")}
            </h2>

            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/30">
              {tc("djs", "description", "djs.description")}
            </p>
          </div>

          {/* Arrow Controls */}
          {djs.length > slidesPerView && (
            <div
              className="hidden items-center gap-3 sm:flex"
            >
              <button
                onClick={goPrev}
                aria-label="Previous DJs"
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/10"
              >
                <svg className="h-5 w-5 text-white/50 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goNext}
                aria-label="Next DJs"
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/10"
              >
                <svg className="h-5 w-5 text-white/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Slider */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex"
            animate={{ x: `${translateX}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          >
            {djs.map((dj) => (
              <div
                key={dj.id}
                className="flex-shrink-0 px-2.5 sm:px-3"
                style={{ width: `${100 / slidesPerView}%` }}
              >
                <DJCard dj={dj} />
              </div>
            ))}
          </motion.div>

          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-black to-transparent" />
        </div>

        {/* Progress dots */}
        {djs.length > slidesPerView && (
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

        {/* Mobile arrows */}
        {djs.length > slidesPerView && (
          <div className="mt-6 flex items-center justify-center gap-3 sm:hidden">
            <button
              onClick={goPrev}
              aria-label="Previous DJs"
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
              aria-label="Next DJs"
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/10"
            >
              <svg className="h-4 w-4 text-white/50 transition-all duration-300 group-hover:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* View All Link */}
        <div
          className="mt-16 flex justify-center md:mt-20"
        >
          <Link
            href="/djs"
            className="glass-card group inline-flex items-center gap-3 rounded-full px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50 transition-all duration-400 hover:text-white hover:shadow-[0_4px_20px_rgba(124,58,237,0.1)]"
          >
            <span>{t("djs.viewAll")}</span>
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
        </div>
      </div>
    </section>
  );
}
