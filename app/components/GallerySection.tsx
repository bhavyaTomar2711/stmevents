"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ── Media items ── */
const FEATURED_VIDEO = "/video/4043988-hd_1920_1080_24fps.mp4";

const GALLERY_ITEMS = [
  { src: "/pexels-aleksmagnusson-30968497.jpg", type: "image" as const, alt: "Event atmosphere" },
  { src: "/pexels-caleboquendo-34611985.jpg", type: "image" as const, alt: "Crowd energy" },
  { src: "/pexels-edotommo99-2034851.jpg", type: "image" as const, alt: "DJ performance" },
  { src: "/pexels-paggiarofrancesco-2111015.jpg", type: "image" as const, alt: "Light show" },
];

const MARQUEE_ITEMS = [...GALLERY_ITEMS, ...GALLERY_ITEMS];

/* ── Media Block ── */
function MediaBlock({
  src,
  type,
  alt,
  className,
  index,
  aspect = "aspect-square",
}: {
  src: string;
  type: "image" | "video";
  alt: string;
  className?: string;
  index: number;
  aspect?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.04] ${aspect} ${className ?? ""}`}
    >
      {type === "video" ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
        />
      )}

      {/* Default dark overlay */}
      <div className="absolute inset-0 bg-black/25 transition-colors duration-500 group-hover:bg-black/5" />

      {/* Hover purple wash */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-purple-800/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Hover border glow */}
      <div className="absolute inset-0 rounded-2xl border border-purple-500/0 transition-all duration-500 group-hover:border-purple-500/20" />

      {/* Video play icon */}
      {type === "video" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 scale-75 items-center justify-center rounded-full border border-white/20 bg-black/30 opacity-0 backdrop-blur-md transition-all duration-400 group-hover:scale-100 group-hover:opacity-100">
            <svg className="ml-1 h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />

      {/* Floating label on hover */}
      <div className="absolute bottom-4 left-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
          {alt}
        </span>
      </div>
    </motion.div>
  );
}

/* ── Main Section ── */
export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative overflow-hidden bg-black pt-12 pb-28 sm:pt-16 sm:pb-32 md:pt-20 md:pb-40"
    >
      {/* ── Background orbs — pure CSS, no JS ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="gallery-orb-1 absolute h-[800px] w-[800px] rounded-full will-change-transform"
          style={{
            background: "radial-gradient(circle, rgba(157,78,221,0.1) 0%, transparent 70%)",
            filter: "blur(140px)",
            top: "15%",
            right: "-15%",
          }}
        />
        <div
          className="gallery-orb-2 absolute h-[500px] w-[500px] rounded-full will-change-transform"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
            filter: "blur(100px)",
            bottom: "5%",
            left: "-8%",
          }}
        />
      </div>

      {/* ── Scan line — pure CSS ── */}
      <div
        className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent will-change-transform"
        style={{ animation: "gallery-scan 8s linear infinite" }}
      />

      {/* ── Noise ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {/* Section Header */}
        <div ref={headerRef} className="mb-14 md:mb-20">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-purple-400"
          >
            <span className="inline-block h-px w-10 bg-gradient-to-r from-purple-500 to-transparent" />
            The Experience
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 text-[clamp(2.5rem,5.5vw,5.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.03em]"
          >
            <span className="block text-white">STEP INSIDE</span>
            <span className="block text-white/50">THE NIGHT</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/30"
          >
            A glimpse into the energy, lights, and moments that define STM Events.
          </motion.p>
        </div>

        {/* ── Asymmetric Gallery Grid ── */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5 lg:gap-6">
          {/* Left — Featured Video */}
          <div className="md:col-span-7 lg:col-span-8">
            <MediaBlock
              src={FEATURED_VIDEO}
              type="video"
              alt="Live footage"
              index={0}
              aspect="aspect-[16/10]"
            />
          </div>

          {/* Right — Stacked portraits */}
          <div className="flex flex-col gap-4 md:col-span-5 md:gap-5 lg:col-span-4 lg:gap-6">
            <MediaBlock
              src={GALLERY_ITEMS[0].src}
              type="image"
              alt="Event atmosphere"
              index={1}
              aspect="aspect-[4/3]"
            />
            <MediaBlock
              src={GALLERY_ITEMS[1].src}
              type="image"
              alt="Crowd energy"
              index={2}
              aspect="aspect-[4/3]"
            />
          </div>

          {/* Bottom row */}
          <div className="md:col-span-4">
            <MediaBlock
              src={GALLERY_ITEMS[2].src}
              type="image"
              alt="DJ performance"
              index={3}
              aspect="aspect-[4/3]"
            />
          </div>

          <div className="md:col-span-8">
            <MediaBlock
              src={GALLERY_ITEMS[3].src}
              type="image"
              alt="Light show"
              index={4}
              aspect="aspect-[21/9]"
            />
          </div>
        </div>

        {/* ── Cinematic Marquee Strip ── */}
        <div className="mt-16 md:mt-20">
          <div className="relative overflow-hidden rounded-xl">
            {/* Edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-black to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-black to-transparent" />

            <div className="animate-marquee flex gap-4">
              {MARQUEE_ITEMS.map((item, i) => (
                <div
                  key={`marquee-${i}`}
                  className="group relative h-28 w-48 flex-shrink-0 overflow-hidden rounded-lg border border-white/[0.04] sm:h-32 sm:w-56 md:h-40 md:w-72"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 transition-colors duration-500 group-hover:bg-purple-900/20" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── View Gallery Link ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 flex justify-center md:mt-16"
        >
          <a
            href="#gallery"
            className="group inline-flex items-center gap-3 rounded-full border border-white/[0.06] bg-white/[0.02] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50 backdrop-blur-sm transition-all duration-400 hover:border-purple-500/20 hover:bg-purple-500/5 hover:text-white"
          >
            <span>Explore Full Gallery</span>
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
          </a>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes gallery-orb-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-60%, 25%) scale(1.15); }
          66% { transform: translate(-25%, -15%) scale(0.85); }
        }
        @keyframes gallery-orb-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50%, -30%) scale(0.8); }
          66% { transform: translate(15%, 12%) scale(1.2); }
        }
        @keyframes gallery-scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        .gallery-orb-1 {
          animation: gallery-orb-drift-1 22s ease-in-out infinite;
        }
        .gallery-orb-2 {
          animation: gallery-orb-drift-2 18s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
