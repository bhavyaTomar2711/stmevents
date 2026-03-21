"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { DJData } from "@/lib/djs";

function DJCard({ dj, index }: { dj: DJData; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <Link href={`/djs/${dj.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/25 hover:shadow-[0_0_25px_rgba(124,58,237,0.1)]">
          {/* Image */}
          <div className="relative overflow-hidden" style={{ aspectRatio: "3 / 4" }}>
            <Image
              src={dj.photo}
              alt={dj.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-600 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Resident badge */}
            {dj.resident && (
              <div className="absolute top-4 left-4 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-purple-300 backdrop-blur-sm">
                Resident
              </div>
            )}

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-5">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
                {dj.genre}
              </span>
              <h3 className="mt-1 text-xl font-bold uppercase tracking-tight text-white sm:text-2xl">
                {dj.name}
              </h3>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      </Link>
    </motion.div>
  );
}

export default function DJsPageClient({ djs }: { djs: DJData[] }) {
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
      </div>

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
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <div className="mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-purple-400"
          >
            <span className="inline-block h-px w-10 bg-gradient-to-r from-purple-500 to-transparent" />
            The Artists
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-3 text-[clamp(2.5rem,6vw,6rem)] font-bold uppercase leading-[0.88] tracking-[-0.03em] text-white"
          >
            DJS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/30"
          >
            The sound behind every STM Events experience.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {djs.map((dj, i) => (
            <DJCard key={dj.id} dj={dj} index={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
