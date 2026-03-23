"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import EventCard from "@/app/components/EventCard";
import type { EventData } from "@/lib/events";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function EventsPageClient({ events }: { events: EventData[] }) {
  const { t } = useLanguage();
  return (
    <main className="relative min-h-screen bg-black">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute top-0 left-1/4 h-[800px] w-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(157,78,221,0.08) 0%, rgba(123,44,191,0.04) 40%, transparent 70%)",
            filter: "blur(140px)",
          }}
        />
        <div
          className="absolute right-0 bottom-1/4 h-[600px] w-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(123,44,191,0.06) 0%, transparent 70%)",
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
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t("common.backToHome")}
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
            {t("eventsPage.label")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-3 text-[clamp(2.5rem,6vw,6rem)] font-bold uppercase leading-[0.88] tracking-[-0.03em] text-white"
          >
            {t("eventsPage.heading")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/30"
          >
            {t("eventsPage.description")}
          </motion.p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event, i) => (
            <EventCard
              key={event.slug}
              title={event.title}
              date={event.date}
              location={event.location}
              image={event.image}
              slug={event.slug}
              index={i}
              eventbriteLink={event.eventbriteLink}
              ticketStatus={event.ticketStatus}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
