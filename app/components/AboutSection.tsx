"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: "50+", label: "Events Produced" },
  { value: "10K+", label: "People Moved" },
  { value: "30+", label: "Artists Featured" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const textInView = useInView(textRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-28 sm:py-32 md:py-40"
    >
      {/* ── Background ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Purple gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-transparent to-violet-950/10" />

        {/* Orb — pure CSS */}
        <div
          className="about-orb absolute h-[600px] w-[600px] rounded-full will-change-transform"
          style={{
            background: "radial-gradient(circle, rgba(157,78,221,0.07) 0%, transparent 70%)",
            filter: "blur(120px)",
            top: "30%",
            left: "20%",
          }}
        />

        {/* Noise */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 items-center gap-12 md:gap-16 lg:grid-cols-2 lg:gap-20 xl:gap-28">

          {/* ── Left — Text ── */}
          <div ref={textRef} className="max-w-xl">
            {/* Label */}
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={textInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-purple-400"
            >
              <motion.span
                className="inline-block h-px bg-gradient-to-r from-purple-500 to-transparent"
                initial={{ width: 0 }}
                animate={textInView ? { width: 40 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              />
              About STM Events
            </motion.span>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={textInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 text-[clamp(1.8rem,3.5vw,3.2rem)] font-bold uppercase leading-[1] tracking-[-0.02em] text-white"
            >
              Creating underground experiences that{" "}
              <span className="text-purple-400">move</span> people
            </motion.h2>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={textInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 space-y-4"
            >
              <p className="text-[15px] leading-[1.75] text-white/40">
                STM Events is more than just nightlife — it&apos;s a curated
                journey into sound, energy, and connection. We craft immersive
                experiences where music, visuals, and atmosphere collide to
                create unforgettable nights.
              </p>
              <p className="text-[15px] leading-[1.75] text-white/40">
                From warehouse raves to intimate club sets, every event is
                designed to blur the line between artist and audience. No
                barriers. No boundaries. Just raw, unfiltered energy.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={textInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex gap-10 border-t border-white/[0.06] pt-8"
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={textInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.55 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <span className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-[11px] font-medium uppercase tracking-[0.2em] text-white/30">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={textInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10"
            >
              <a
                href="/about"
                className="group inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.25em] text-white/50 transition-colors duration-300 hover:text-white"
              >
                <span>Learn Our Story</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:border-purple-500/30 group-hover:bg-purple-500/10">
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

          {/* ── Right — Visual ── */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Purple glow behind image */}
            <div className="absolute -inset-8 rounded-3xl bg-purple-600/[0.04] blur-3xl" />

            {/* Accent line (left edge) */}
            <motion.div
              className="absolute -left-3 top-8 bottom-8 hidden w-px lg:block"
              style={{
                background: "linear-gradient(to bottom, transparent, rgba(157,78,221,0.3) 30%, rgba(157,78,221,0.3) 70%, transparent)",
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />

            <div className="relative overflow-hidden rounded-2xl border border-white/[0.05]">
              <div className="aspect-[4/5] w-full overflow-hidden">
                <img
                  src="/about us.png"
                  alt="STM Events atmosphere"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />

              {/* Purple tint */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-transparent" />

              {/* Corner accent */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="h-px flex-1 bg-gradient-to-r from-purple-500/40 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{ transformOrigin: "left" }}
                  />
                  <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/30">
                    Est. 2023
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <style jsx>{`
        @keyframes about-orb-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30%, -20%) scale(1.1); }
          66% { transform: translate(-10%, 15%) scale(0.9); }
        }
        .about-orb {
          animation: about-orb-drift 20s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
