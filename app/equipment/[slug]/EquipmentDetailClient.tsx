"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { EquipmentData } from "@/lib/equipment";
import RentalModal from "@/app/components/RentalModal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function EquipmentDetailClient({ item }: { item: EquipmentData }) {
  const { t, locale } = useLanguage();
  const [activeImage, setActiveImage] = useState(0);
  const [rentalOpen, setRentalOpen] = useState(false);
  const hasMultipleImages = item.images.length > 1;
  const displayName = (locale === "de" && item.name_de) ? item.name_de : item.name;
  const displayShortDesc = (locale === "de" && item.shortDescription_de) ? item.shortDescription_de : item.shortDescription;
  const displayFullDesc = (locale === "de" && item.fullDescription_de) ? item.fullDescription_de : item.fullDescription;
  const displayDesc = displayFullDesc || displayShortDesc;

  return (
    <main className="relative min-h-screen bg-black">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-0 left-1/4 h-[800px] w-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(157,78,221,0.06) 0%, transparent 70%)",
            filter: "blur(140px)",
          }}
        />
        <div
          className="absolute right-0 bottom-1/3 h-[600px] w-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(123,44,191,0.05) 0%, transparent 70%)",
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
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            href="/equipment"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-medium tracking-[0.2em] text-white/50 uppercase backdrop-blur-sm transition-all duration-300 hover:border-purple-500/30 hover:text-white"
          >
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t("rental.allEquipment")}
          </Link>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Image Gallery ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Main image */}
            <div className="glass-card relative overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-[4/3] w-full"
                >
                  <Image
                    src={item.images[activeImage] || ""}
                    alt={`${item.name} — image ${activeImage + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Image counter */}
              {hasMultipleImages && (
                <div className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[10px] font-medium text-white/50 backdrop-blur-sm">
                  {activeImage + 1} / {item.images.length}
                </div>
              )}

              {/* Availability badge */}
              {!item.available && (
                <div className="absolute top-4 left-4 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-red-400 backdrop-blur-sm">
                  {t("rental.unavailable")}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {hasMultipleImages && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {item.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border transition-all duration-300 ${
                      activeImage === i
                        ? "border-purple-500/50 ring-1 ring-purple-500/30"
                        : "border-white/[0.06] opacity-50 hover:opacity-80"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${item.name} thumbnail ${i + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* ── Details ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Category */}
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/5 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-purple-400">
              {item.categoryLabel}
            </span>

            {/* Name */}
            <h1 className="mt-5 text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl">
              {displayName}
            </h1>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-4xl font-bold tracking-tight text-white">
                {item.price}
              </span>
              <span className="text-lg text-white/30">{item.pricePer}</span>
            </div>

            {/* Divider */}
            <div className="my-8 h-px bg-white/[0.06]" />

            {/* Description */}
            <div>
              <h2 className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white/30">
                {t("rental.description")}
              </h2>
              <div
                className="text-[15px] leading-relaxed text-white/50"
                dangerouslySetInnerHTML={{ __html: displayDesc || "" }}
              />
            </div>

            {/* Specs */}
            {item.specs.length > 0 && (
              <div className="mt-10">
                <h2 className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-white/30">
                  {t("rental.specifications")}
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {item.specs.map((spec, i) => (
                    <motion.div
                      key={spec.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                      className="glass-card rounded-xl px-5 py-4"
                    >
                      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-purple-400/70">
                        {spec.label}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white/80">
                        {spec.value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-10 space-y-4">
              <button
                onClick={() => setRentalOpen(true)}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-[#7B2CBF] to-[#9D4EDD] px-8 py-4 text-sm font-semibold tracking-[0.15em] text-white uppercase transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(157,78,221,0.3)]"
              >
                <span className="relative z-10">{t("rental.inquire")}</span>
                <svg className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 transition-transform duration-700 group-hover:translate-x-full" />
              </button>

              <Link
                href="/equipment"
                className="glass-card flex w-full items-center justify-center gap-2 rounded-lg px-8 py-4 text-[11px] font-semibold tracking-[0.2em] text-white/50 uppercase transition-all duration-300 hover:text-white/70"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                {t("rental.allEquipment")}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Rental Inquiry Modal */}
      <RentalModal
        isOpen={rentalOpen}
        onClose={() => setRentalOpen(false)}
        equipmentName={item.name}
      />
    </main>
  );
}
