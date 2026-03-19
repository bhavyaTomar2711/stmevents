"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";

/* ───────────────────── Service Data ───────────────────── */

const SERVICES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V4.846a2.25 2.25 0 00-1.632-2.163l-7.5-2.143A2.25 2.25 0 007.5 2.69v11.357" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 14.25a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
      </svg>
    ),
    title: "DJ Bookings",
    description:
      "Curated DJ lineups featuring top-tier underground and mainstream talent, tailored to your crowd and vision.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.047 8.287 8.287 0 009 9.601a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.468 5.99 5.99 0 00-1.925 3.547 5.975 5.975 0 01-2.133-1.001A3.75 3.75 0 0012 18z" />
      </svg>
    ),
    title: "Private Events",
    description:
      "Exclusive, invite-only experiences designed for high-end clients — from luxury launches to private celebrations.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    title: "Club Events",
    description:
      "High-energy club nights with immersive production, cutting-edge sound, and atmospheres that keep people moving.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: "Event Production",
    description:
      "Full-scale event production — lighting, sound, stage design, and visuals engineered for maximum impact.",
  },
];

/* ───────────────────── Cursor-glow Card ───────────────────── */

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setGlowPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    [],
  );

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/20 hover:bg-white/[0.06]"
    >
      {/* ── Cursor-following glow ── */}
      <div
        className="pointer-events-none absolute -inset-px z-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `radial-gradient(320px circle at ${glowPos.x}px ${glowPos.y}px, rgba(157,78,221,0.12), transparent 60%)`
            : "none",
        }}
      />

      {/* ── Card border glow on hover ── */}
      <div className="pointer-events-none absolute -inset-px z-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: isHovered
              ? `radial-gradient(320px circle at ${glowPos.x}px ${glowPos.y}px, rgba(157,78,221,0.25), transparent 60%)`
              : "none",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "xor",
            WebkitMaskComposite: "xor",
            padding: "1px",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col p-8 sm:p-10">
        {/* Icon */}
        <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04] text-purple-400 transition-all duration-500 group-hover:scale-110 group-hover:border-purple-500/20 group-hover:bg-purple-500/10 group-hover:text-purple-300 group-hover:shadow-[0_0_20px_rgba(157,78,221,0.15)]">
          {service.icon}
        </div>

        {/* Title */}
        <h3 className="text-[15px] font-bold uppercase tracking-[0.2em] text-white/90 transition-colors duration-300 group-hover:text-white">
          {service.title}
        </h3>

        {/* Divider */}
        <motion.div
          className="mt-4 h-px w-8 bg-gradient-to-r from-purple-500/40 to-transparent"
          whileInView={{ width: "2rem" }}
          viewport={{ once: true }}
        />

        {/* Description */}
        <p className="mt-4 text-[14px] leading-[1.8] text-white/35 transition-colors duration-300 group-hover:text-white/50">
          {service.description}
        </p>

        {/* Arrow indicator */}
        <div className="mt-6 flex items-center gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-purple-400/70">
            Learn more
          </span>
          <svg
            className="h-3 w-3 text-purple-400/70 transition-transform duration-300 group-hover:translate-x-1"
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
        </div>
      </div>
    </motion.div>
  );
}

/* ───────────────────── Main Section ───────────────────── */

export default function ServicesSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-black py-28 sm:py-32 md:py-40"
    >
      {/* ── Background ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/10 via-black to-purple-950/5" />

        {/* Corner glows */}
        <div
          className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(157,78,221,0.08) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* Floating orb */}
        <motion.div
          className="absolute h-[400px] w-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(157,78,221,0.05) 0%, transparent 70%)",
            filter: "blur(100px)",
            top: "50%",
            left: "50%",
            translate: "-50% -50%",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto w-full px-6 sm:px-8 md:px-12 lg:px-16">
        {/* ── Heading cluster ── */}
        <div ref={headingRef} className="mb-16 text-center sm:mb-20 md:mb-24">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-3"
          >
            <motion.span
              className="inline-block h-px bg-gradient-to-r from-transparent to-purple-500"
              initial={{ width: 0 }}
              animate={headingInView ? { width: 32 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-purple-400">
              Services
            </span>
            <motion.span
              className="inline-block h-px bg-gradient-to-r from-purple-500 to-transparent"
              initial={{ width: 0 }}
              animate={headingInView ? { width: 32 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </motion.div>

          {/* Main heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-5 text-[clamp(1.8rem,3.5vw,3.2rem)] font-bold uppercase leading-[1.05] tracking-[-0.02em] text-white"
          >
            What We{" "}
            <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              Offer
            </span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mx-auto mt-5 max-w-md text-[14px] leading-[1.7] text-white/35"
          >
            From curated DJ lineups to full-scale event production.
          </motion.p>
        </div>

        {/* ── Card grid ── */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* ── Bottom accent ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 flex items-center justify-center gap-4 sm:mt-20"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/[0.06]" />
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/20">
            Tailored to your vision
          </span>
          <div className="h-px w-16 bg-gradient-to-r from-white/[0.06] to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
