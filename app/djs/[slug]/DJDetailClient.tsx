"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { DJData } from "@/lib/djs";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function InstagramIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function SoundCloudIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.56 8.87V17h8.76c1.85-.05 2.68-1.54 2.68-2.77 0-1.83-1.39-3.03-2.82-3.14-.28-2.91-2.74-4.26-4.68-4.13a4.47 4.47 0 00-2.15.68c-.45.3-.6.67-.6 1.02V17M8.15 9.98V17M5.82 11.37V17M3.49 12.26V17M1.16 13V17" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export default function DJDetailClient({ dj }: { dj: DJData }) {
  const { locale, t } = useLanguage();
  const displayBio = (locale === "de" && dj.bio_de) ? dj.bio_de : dj.bio;

  return (
    <main className="relative min-h-screen bg-black">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-0 left-0 h-[900px] w-[900px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(123,44,191,0.08) 0%, transparent 60%)",
            filter: "blur(140px)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />
      </div>

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 px-6 pt-8 sm:px-10 lg:px-16"
      >
        <Link
          href="/djs"
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-medium tracking-[0.2em] text-white/50 uppercase backdrop-blur-sm transition-all duration-300 hover:border-purple-500/30 hover:text-white"
        >
          <svg className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          {t("djDetail.allDJs")}
        </Link>
      </motion.div>

      {/* Layout: Image Left / Content Right */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-10 pb-24 sm:px-10 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="glass-card relative overflow-hidden rounded-2xl">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={dj.photo}
                  alt={dj.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            {/* Badges */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/5 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-purple-400">
                {dj.genre}
              </span>
              {dj.resident && (
                <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-400">
                  {t("common.resident")}
                </span>
              )}
            </div>

            {/* Name */}
            <h1 className="mt-6 text-[clamp(2.5rem,5vw,5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white">
              {dj.name}
            </h1>

            {/* Divider */}
            <div className="my-8 h-px bg-white/[0.06]" />

            {/* Bio */}
            {displayBio && (
              <div
                className="prose prose-invert max-w-none text-[15px] leading-relaxed text-white/50"
                dangerouslySetInnerHTML={{ __html: displayBio }}
              />
            )}

            {/* Social Links */}
            {(dj.instagramUrl || dj.soundcloudUrl) && (
              <div className="mt-10">
                <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30">
                  {t("djDetail.follow")}
                </h2>
                <div className="flex gap-3">
                  {dj.instagramUrl && (
                    <a
                      href={dj.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-card flex items-center gap-2.5 rounded-lg px-5 py-3 text-sm font-medium text-white/60 transition-all duration-300 hover:text-white"
                    >
                      <InstagramIcon />
                      <span>Instagram</span>
                    </a>
                  )}
                  {dj.soundcloudUrl && (
                    <a
                      href={dj.soundcloudUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-card flex items-center gap-2.5 rounded-lg px-5 py-3 text-sm font-medium text-white/60 transition-all duration-300 hover:text-white"
                    >
                      <SoundCloudIcon />
                      <span>SoundCloud</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/events"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-lg bg-gradient-to-r from-[#7B2CBF] to-[#9D4EDD] px-7 py-4 text-sm font-semibold tracking-[0.12em] text-white uppercase transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(157,78,221,0.3)]"
              >
                <span className="relative z-10">{t("djDetail.viewEvents")}</span>
                <svg className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 transition-transform duration-700 group-hover:translate-x-full" />
              </Link>

              <Link
                href="/djs"
                className="glass-card inline-flex items-center gap-2 rounded-lg px-7 py-4 text-[11px] font-semibold tracking-[0.2em] text-white/50 uppercase transition-all duration-300 hover:text-white/70"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                {t("djDetail.allArtists")}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
