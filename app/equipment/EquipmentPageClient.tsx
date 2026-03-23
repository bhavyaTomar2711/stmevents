"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { EquipmentData } from "@/lib/equipment";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { TranslationKey } from "@/lib/i18n/translations";

const CATEGORIES: { value: string; labelKey: TranslationKey }[] = [
  { value: "all", labelKey: "equipmentPage.filterAll" },
  { value: "dj-gear", labelKey: "equipmentPage.filterDJGear" },
  { value: "sound", labelKey: "equipmentPage.filterSound" },
  { value: "lighting", labelKey: "equipmentPage.filterLighting" },
  { value: "stage", labelKey: "equipmentPage.filterStage" },
  { value: "effects", labelKey: "equipmentPage.filterEffects" },
];

function EquipmentCard({ item, index }: { item: EquipmentData; index: number }) {
  const { t } = useLanguage();
  const coverImage = item.images[0] || "/1.png";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/equipment/${item.slug}`} className="group block">
        <div className="glass-card relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(124,58,237,0.08)]">
          {/* Image */}
          <div className="relative overflow-hidden">
            <div className="relative aspect-[16/10] w-full transition-transform duration-700 group-hover:scale-105">
              <Image
                src={coverImage}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>

            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Availability badge */}
            {!item.available && (
              <div className="absolute top-4 right-4 z-10 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-red-400 backdrop-blur-sm">
                {t("equipment.unavailable")}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-purple-400/70">
              {item.categoryLabel}
            </span>

            <h3 className="mt-2 text-lg font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-purple-100 sm:text-xl">
              {item.name}
            </h3>

            <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-white/35">
              {item.shortDescription}
            </p>

            <div className="mt-5 flex items-end justify-between">
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

          {/* Top accent on hover */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      </Link>
    </motion.div>
  );
}

export default function EquipmentPageClient({ equipment }: { equipment: EquipmentData[] }) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? equipment
      : equipment.filter((e) => e.category === activeCategory);

  const categoryCounts = CATEGORIES.map((cat) => ({
    ...cat,
    count: cat.value === "all" ? equipment.length : equipment.filter((e) => e.category === cat.value).length,
  })).filter((c) => c.count > 0 || c.value === "all");

  return (
    <main className="relative min-h-screen bg-black">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute top-0 left-1/4 h-[800px] w-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(157,78,221,0.08) 0%, rgba(123,44,191,0.04) 40%, transparent 70%)",
            filter: "blur(140px)",
          }}
        />
        <div
          className="absolute right-0 bottom-1/4 h-[600px] w-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(123,44,191,0.06) 0%, transparent 70%)",
            filter: "blur(120px)",
          }}
        />
      </div>

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-24 sm:px-10 lg:px-16">
        {/* Back to home */}
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
            {t("common.backToHome")}
          </Link>
        </motion.div>

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-purple-400"
          >
            <span className="inline-block h-px w-10 bg-gradient-to-r from-purple-500 to-transparent" />
            {t("equipmentPage.label")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-3 text-[clamp(2.5rem,6vw,6rem)] font-bold uppercase leading-[0.88] tracking-[-0.03em] text-white"
          >
            {t("equipmentPage.heading")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/30"
          >
            {t("equipmentPage.description")}
          </motion.p>
        </div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-10 flex flex-wrap gap-2"
        >
          {categoryCounts.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`rounded-full border px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                activeCategory === cat.value
                  ? "border-purple-500/40 bg-purple-500/10 text-purple-300"
                  : "border-white/[0.08] bg-white/[0.02] text-white/40 hover:border-white/15 hover:text-white/60"
              }`}
            >
              {t(cat.labelKey)}
              <span className="ml-1.5 text-[9px] opacity-50">{cat.count}</span>
            </button>
          ))}
        </motion.div>

        {/* Equipment Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((item, i) => (
              <EquipmentCard key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-white/30">
            <p className="text-lg">{t("equipmentPage.noItems")}</p>
          </div>
        )}
      </div>
    </main>
  );
}
