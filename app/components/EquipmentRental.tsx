"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { EquipmentData } from "@/lib/equipment";
import { useLanguage } from "@/lib/i18n/LanguageContext";

/* ── Product Card — lightweight, no tilt/glow/perspective ── */
function ProductCard({ item, index }: { item: EquipmentData; index: number }) {
  const { t, locale } = useLanguage();
  const coverImage = item.images[0] || "";
  const displayName = (locale === "de" && item.name_de) ? item.name_de : item.name;
  const displayShortDesc = (locale === "de" && item.shortDescription_de) ? item.shortDescription_de : item.shortDescription;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/equipment/${item.slug}`} className="group block h-full">
        <div className="glass-card relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_35px_rgba(124,58,237,0.1)]">
          {/* Image — fixed aspect ratio for uniform cards */}
          <div className="relative aspect-[16/10] w-full flex-shrink-0 overflow-hidden">
            <Image
              src={coverImage}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-600 group-hover:scale-105"
            />
            {/* Unavailable badge */}
            {!item.available && (
              <div className="absolute top-4 right-4 z-10 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-red-400">
                {t("equipment.unavailable")}
              </div>
            )}
          </div>

          {/* Content — flex-1 so all cards stretch equally */}
          <div className="flex flex-1 flex-col px-6 pt-5 pb-6">
            {/* Category */}
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-purple-400/70">
              {item.categoryLabel}
            </span>

            {/* Name */}
            <h3 className="mt-2 text-lg font-bold uppercase tracking-tight text-white">
              {displayName}
            </h3>

            {/* Description */}
            <p className="mt-2 line-clamp-2 flex-1 text-[13px] leading-relaxed text-white/35">
              {displayShortDesc}
            </p>

            {/* Price + CTA */}
            <div className="mt-5 flex items-end justify-between border-t border-white/[0.04] pt-5">
              <div>
                <span className="text-2xl font-bold tracking-tight text-white">
                  {item.price}
                </span>
                <span className="ml-1 text-sm text-white/30">{item.pricePer}</span>
              </div>

              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30 transition-colors duration-300 group-hover:text-purple-400">
                {t("equipment.details")}
                <svg className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>

          {/* Bottom accent on hover */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      </Link>
    </motion.div>
  );
}

/* ── Main Section ── */
export default function EquipmentRental({ equipment }: { equipment: EquipmentData[] }) {
  const { t } = useLanguage();
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="equipment"
      className="relative overflow-hidden bg-black py-28 sm:py-32 md:py-40"
    >
      {/* Noise only — no animated orbs */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {/* Header */}
        <div ref={headerRef} className="mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-purple-400"
          >
            <span className="inline-block h-px w-10 bg-gradient-to-r from-purple-500 to-transparent" />
            {t("equipment.label")}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-[clamp(2rem,4.5vw,4.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.03em]"
          >
            <span className="block text-white">{t("equipment.heading1")}</span>
            <span className="block text-white">{t("equipment.heading2")}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/35"
          >
            {t("equipment.description")}
          </motion.p>
        </div>

        {/* Product Grid — uniform height via flex */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
          {equipment.map((item, i) => (
            <ProductCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 flex flex-col items-center gap-6 md:mt-20"
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <p className="max-w-md text-center text-[13px] leading-relaxed text-white/30">
            {t("equipment.customSetup")}
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <Link
              href="/equipment"
              className="group inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.02] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/60 transition-all duration-400 hover:border-purple-500/25 hover:bg-purple-500/5 hover:text-white"
            >
              <span>{t("equipment.viewAll")}</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.06] transition-all duration-300 group-hover:bg-purple-500/20">
                <svg className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>

            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.02] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/60 transition-all duration-400 hover:border-purple-500/25 hover:bg-purple-500/5 hover:text-white"
            >
              <span>{t("equipment.getQuote")}</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.06] transition-all duration-300 group-hover:bg-purple-500/20">
                <svg className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
