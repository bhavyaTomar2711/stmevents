"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

/* ── DJ Data (placeholders — replace images after photoshoot) ── */
const DJS = [
  { name: "KRYPTIC", genre: "Dark Techno", image: "/pexels-edotommo99-2034851.jpg" },
  { name: "NOVA", genre: "Melodic House", image: "/pexels-caleboquendo-34611985.jpg" },
  { name: "VORTEX", genre: "Industrial", image: "/pexels-aleksmagnusson-30968497.jpg" },
  { name: "SPECTRA", genre: "Minimal Techno", image: "/pexels-paggiarofrancesco-2111015.jpg" },
  { name: "PHANTOM", genre: "Acid Techno", image: "/pexels-edotommo99-2034851.jpg" },
];

/* ── Card Component ── */
function DJCard({
  dj,
  index,
  isActive,
  isDimmed,
  onHover,
  onLeave,
}: {
  dj: (typeof DJS)[0];
  index: number;
  isActive: boolean;
  isDimmed: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.div
      className="group relative flex-shrink-0 cursor-grab select-none active:cursor-grabbing"
      style={{ width: "clamp(280px, 22vw, 380px)" }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`relative overflow-hidden rounded-2xl transition-all duration-500 ease-out will-change-transform ${
          isActive ? "scale-[1.03]" : isDimmed ? "scale-[0.97] opacity-60" : ""
        }`}
        style={{ aspectRatio: "3 / 4" }}
      >
        {/* Purple glow behind card on hover */}
        <div
          className={`pointer-events-none absolute -inset-4 rounded-3xl bg-purple-600/20 blur-2xl transition-opacity duration-500 ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Card container */}
        <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-black">
          <Image
            src={dj.image}
            alt={dj.name}
            fill
            sizes="(max-width: 768px) 280px, 380px"
            className={`object-cover transition-transform duration-700 ease-out will-change-transform ${
              isActive ? "scale-110 brightness-110" : "scale-100 brightness-75"
            }`}
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
          <div
            className={`absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent transition-opacity duration-500 ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Top accent line */}
          <div
            className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent transition-opacity duration-500 ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            <span
              className={`mb-3 inline-flex w-fit items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-purple-300 backdrop-blur-sm transition-all duration-400 ${
                isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
            >
              {dj.genre}
            </span>

            <h3
              className={`text-2xl font-bold uppercase tracking-tight text-white transition-transform duration-400 sm:text-3xl ${
                isActive ? "translate-y-0" : "translate-y-1"
              }`}
            >
              {dj.name}
            </h3>

            <div
              className={`mt-3 h-[1px] bg-gradient-to-r from-purple-500 to-transparent transition-all duration-500 ${
                isActive ? "w-16 opacity-100" : "w-0 opacity-0"
              }`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Section ── */
export default function ResidentDJs() {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
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

  /* Drag-to-scroll */
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const el = sliderRef.current;
    if (!el) return;
    setIsDragging(true);
    dragStart.current = { x: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      const el = sliderRef.current;
      if (!el) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - dragStart.current.x) * 1.5;
      el.scrollLeft = dragStart.current.scrollLeft - walk;
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

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
      {/* ── Background — pure CSS ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="dj-orb-1 absolute h-[500px] w-[500px] rounded-full will-change-transform"
          style={{
            background: "radial-gradient(circle, #7B2CBF 0%, transparent 70%)",
            opacity: 0.06,
            top: "33%",
            left: "25%",
          }}
        />
        <div
          className="dj-orb-2 absolute h-[400px] w-[400px] rounded-full will-change-transform"
          style={{
            background: "radial-gradient(circle, #9D4EDD 0%, transparent 70%)",
            opacity: 0.04,
            bottom: "25%",
            right: "25%",
          }}
        />
        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ── Header ── */}
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
                <span className="bg-gradient-to-r from-white/50 to-white/80 bg-clip-text text-transparent">
                  ARTISTS
                </span>
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
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 transition-all duration-300 hover:border-purple-500/50 hover:bg-purple-500/10 disabled:opacity-20 disabled:hover:border-white/10 disabled:hover:bg-transparent"
              >
                <svg className="h-4 w-4 text-white transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={() => scrollBy(1)}
                disabled={!canScrollRight}
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 transition-all duration-300 hover:border-purple-500/50 hover:bg-purple-500/10 disabled:opacity-20 disabled:hover:border-white/10 disabled:hover:bg-transparent"
              >
                <svg className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Slider ── */}
      <div className="relative z-10 mt-14 sm:mt-20">
        <div
          className={`pointer-events-none absolute top-0 bottom-0 left-0 z-20 w-16 bg-gradient-to-r from-black to-transparent transition-opacity duration-300 sm:w-24 ${
            canScrollLeft ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`pointer-events-none absolute top-0 right-0 bottom-0 z-20 w-16 bg-gradient-to-l from-black to-transparent transition-opacity duration-300 sm:w-24 ${
            canScrollRight ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          ref={sliderRef}
          className="scrollbar-hide flex gap-5 overflow-x-auto px-6 sm:gap-6 sm:px-10 lg:gap-8 lg:px-16 xl:px-24"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            cursor: isDragging ? "grabbing" : "grab",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {DJS.map((dj, i) => (
            <div key={dj.name + i} style={{ scrollSnapAlign: "center" }}>
              <DJCard
                dj={dj}
                index={i}
                isActive={activeIndex === i}
                isDimmed={activeIndex !== null && activeIndex !== i}
                onHover={() => setActiveIndex(i)}
                onLeave={() => setActiveIndex(null)}
              />
            </div>
          ))}
          <div className="w-4 flex-shrink-0 sm:w-10" />
        </div>
      </div>

      {/* ── Bottom progress bar ── */}
      <div className="relative z-10 mx-auto mt-12 max-w-[1800px] px-6 sm:mt-16 sm:px-10 lg:px-16 xl:px-24">
        <div className="h-px w-full bg-white/[0.06]">
          <ScrollProgress sliderRef={sliderRef} />
        </div>
      </div>

      <style jsx>{`
        @keyframes dj-orb-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(60px, -40px) scale(1.1); }
          66% { transform: translate(-40px, 30px) scale(0.95); }
        }
        @keyframes dj-orb-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-50px, 30px) scale(1.08); }
          66% { transform: translate(35px, -25px) scale(0.92); }
        }
        .dj-orb-1 {
          animation: dj-orb-drift-1 20s ease-in-out infinite;
        }
        .dj-orb-2 {
          animation: dj-orb-drift-2 25s ease-in-out infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

/* ── Scroll Progress Indicator ── */
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
