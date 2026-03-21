"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { DJData } from "@/lib/djs";

/* ── Card Component ── */
function DJCard({
  dj,
  isActive,
  isDimmed,
  onActivate,
}: {
  dj: DJData;
  isActive: boolean;
  isDimmed: boolean;
  onActivate: () => void;
}) {
  return (
    <Link
      href={`/djs/${dj.slug}`}
      className="block flex-shrink-0 select-none"
      style={{ width: "clamp(260px, 22vw, 360px)" }}
      onMouseEnter={onActivate}
      onClick={onActivate}
    >
      <div
        className={`relative overflow-hidden rounded-2xl border transition-all duration-500 ease-out ${
          isActive
            ? "scale-[1.03] border-purple-500/30 shadow-[0_0_25px_rgba(124,58,237,0.12)]"
            : isDimmed
              ? "scale-[0.97] border-white/[0.04] opacity-50"
              : "border-white/[0.06]"
        }`}
        style={{ aspectRatio: "3 / 4" }}
      >
        <Image
          src={dj.photo}
          alt={dj.name}
          fill
          sizes="(max-width: 768px) 260px, 360px"
          className={`object-cover transition-all duration-500 ease-out ${
            isDimmed ? "brightness-50" : "brightness-90"
          } ${isActive ? "scale-105 brightness-110" : ""}`}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          {/* Genre */}
          <span
            className={`mb-2 inline-block text-[10px] font-medium uppercase tracking-[0.2em] transition-all duration-400 ${
              isActive ? "text-purple-300 opacity-100" : "text-white/40 opacity-70"
            }`}
          >
            {dj.genre}
          </span>

          {/* Name */}
          <h3 className="text-xl font-bold uppercase tracking-tight text-white sm:text-2xl">
            {dj.name}
          </h3>

          {/* Accent line */}
          <div
            className={`mt-2 h-[1px] bg-purple-500 transition-all duration-500 ${
              isActive ? "w-12 opacity-100" : "w-0 opacity-0"
            }`}
          />
        </div>
      </div>
    </Link>
  );
}

/* ── Main Section ── */
export default function ResidentDJs({ djs }: { djs: DJData[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  const scrollBy = useCallback((dir: number) => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 400, behavior: "smooth" });
  }, []);

  return (
    <section
      id="djs"
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-28 sm:py-32 md:py-40"
    >
      {/* Noise — no animated orbs */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Header */}
      <div className="relative z-10 mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-4 flex items-center gap-4">
            <div className="h-px w-8 bg-purple-500" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-purple-400">
              Resident DJs
            </span>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-5xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
                MEET THE
                <br />
                ARTISTS
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/40 sm:text-base">
                The sound behind the experience.
              </p>
            </div>

            {/* Navigation arrows */}
            <div className="hidden items-center gap-3 sm:flex">
              <button
                onClick={() => scrollBy(-1)}
                disabled={!canScrollLeft}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 transition-all duration-300 hover:border-purple-500/50 hover:bg-purple-500/10 disabled:opacity-20"
              >
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={() => scrollBy(1)}
                disabled={!canScrollRight}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 transition-all duration-300 hover:border-purple-500/50 hover:bg-purple-500/10 disabled:opacity-20"
              >
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Slider */}
      <div className="relative z-10 mt-14 sm:mt-20">
        {/* Edge fades */}
        <div
          className={`pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-black to-transparent transition-opacity duration-300 sm:w-24 ${
            canScrollLeft ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-black to-transparent transition-opacity duration-300 sm:w-24 ${
            canScrollRight ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto px-6 sm:gap-5 sm:px-10 lg:gap-6 lg:px-16 xl:px-24"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          onMouseLeave={() => setActiveIndex(null)}
        >
          {djs.map((dj, i) => (
            <div key={dj.id} style={{ scrollSnapAlign: "start" }}>
              <DJCard
                dj={dj}
                isActive={activeIndex === i}
                isDimmed={activeIndex !== null && activeIndex !== i}
                onActivate={() => setActiveIndex(i)}
              />
            </div>
          ))}
          <div className="w-4 flex-shrink-0 sm:w-10" />
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 mx-auto mt-12 max-w-[1800px] px-6 sm:mt-16 sm:px-10 lg:px-16 xl:px-24">
        <div className="h-px w-full bg-white/[0.06]">
          <ScrollProgress sliderRef={sliderRef} />
        </div>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

/* ── Scroll Progress ── */
function ScrollProgress({ sliderRef }: { sliderRef: React.RefObject<HTMLDivElement | null> }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sliderRef.current;
    const bar = barRef.current;
    if (!el || !bar) return;

    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      const pct = max > 0 ? el.scrollLeft / max : 0;
      bar.style.width = `${Math.max(10, pct * 100)}%`;
    };

    el.addEventListener("scroll", update, { passive: true });
    update();
    return () => el.removeEventListener("scroll", update);
  }, [sliderRef]);

  return (
    <div
      ref={barRef}
      className="h-full rounded-full bg-gradient-to-r from-purple-600 to-purple-400"
      style={{ width: "10%", transition: "width 0.1s linear" }}
    />
  );
}
