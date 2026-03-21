"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { EventData } from "@/lib/events";
import EventCTASticky from "@/app/components/EventCTASticky";

const statusBadge: Record<string, { label: string; color: string; border: string; bg: string }> = {
  "sold-out": { label: "Sold Out", color: "text-red-400", border: "border-red-500/30", bg: "bg-red-500/10" },
  limited: { label: "Limited Tickets", color: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-500/10" },
  "final-release": { label: "Final Release", color: "text-orange-400", border: "border-orange-500/30", bg: "bg-orange-500/10" },
};

export default function EventDetailClient({ event }: { event: EventData }) {
  const isSoldOut = event.ticketStatus === "sold-out";
  const hasTicketUrl = !!event.eventbriteLink;
  const badge = statusBadge[event.ticketStatus];

  return (
    <main className="relative min-h-screen bg-black">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-0 left-0 h-[900px] w-[900px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(123,44,191,0.08) 0%, transparent 60%)",
            filter: "blur(140px)",
          }}
        />
        <div
          className="absolute right-0 bottom-1/4 h-[600px] w-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(157,78,221,0.05) 0%, transparent 70%)",
            filter: "blur(120px)",
          }}
        />
        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.02]"
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
          href="/events"
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-medium tracking-[0.2em] text-white/50 uppercase transition-all duration-300 hover:border-purple-500/30 hover:text-white"
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
          All Events
        </Link>
      </motion.div>

      {/* Main Layout: Image Left / Content Right */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-10 pb-24 sm:px-10 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: Event Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.06]">
              <div className="relative aspect-[3/4] w-full sm:aspect-[4/5]">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Subtle gradient at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* Ticket status badge on image */}
              {badge && (
                <div className="absolute top-5 right-5 z-10">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] ${badge.color} ${badge.border} ${badge.bg}`}
                  >
                    <span className="relative flex h-2 w-2">
                      {!isSoldOut && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-40" />
                      )}
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
                    </span>
                    {badge.label}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            {/* Title */}
            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white">
              {event.title}
            </h1>

            {/* Date */}
            <div className="mt-6 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-500/5">
                <svg className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </span>
              <span className="text-base font-medium text-white/70">{event.date}</span>
            </div>

            {/* Location */}
            <div className="mt-4 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-500/5">
                <svg className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </span>
              <span className="text-base font-medium text-white/70">{event.location}</span>
            </div>

            {/* Divider */}
            <div className="my-8 h-px bg-white/[0.06]" />

            {/* Description */}
            <p className="text-[15px] leading-relaxed text-white/45">
              {event.description}
            </p>

            {/* Lineup */}
            {event.lineup.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30">
                  Lineup
                </h2>
                <div className="flex flex-wrap gap-2">
                  {event.lineup.map((artist) => (
                    <span
                      key={artist}
                      className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white/70 transition-all duration-300 hover:border-purple-500/25 hover:bg-purple-500/5 hover:text-white"
                    >
                      {artist}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              {/* Get Tickets / Sold Out */}
              {isSoldOut ? (
                <div className="inline-flex cursor-not-allowed items-center gap-3 rounded-full border border-red-500/20 bg-red-500/5 px-7 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-red-400/60">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                  Sold Out
                </div>
              ) : hasTicketUrl ? (
                <a
                  href={event.eventbriteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-purple-500 px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-all duration-400 hover:shadow-[0_0_35px_rgba(124,58,237,0.3)]"
                >
                  <svg className="relative z-10 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
                  </svg>
                  <span className="relative z-10">Get Tickets</span>
                  <svg className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 transition-transform duration-700 group-hover:translate-x-full" />
                </a>
              ) : null}

              {/* Book This Event */}
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.02] px-7 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white/60 transition-all duration-400 hover:border-purple-500/25 hover:bg-purple-500/5 hover:text-white"
              >
                <span>Book This Event</span>
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Trust text */}
            {hasTicketUrl && !isSoldOut && (
              <div className="mt-4 flex items-center gap-2 text-[11px] text-white/20">
                <svg className="h-3.5 w-3.5 text-green-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                Secure checkout powered by Eventbrite
              </div>
            )}

            {/* Share */}
            <div className="mt-8">
              <p className="mb-3 text-[10px] font-medium tracking-[0.2em] text-white/25 uppercase">
                Share Event
              </p>
              <div className="flex gap-2">
                {["Instagram", "WhatsApp", "Copy Link"].map((label) => (
                  <button
                    key={label}
                    className="rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-[10px] font-medium tracking-wider text-white/35 uppercase transition-all duration-300 hover:border-purple-500/25 hover:bg-purple-500/5 hover:text-white/60"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sticky CTA */}
      <EventCTASticky
        ticketUrl={event.eventbriteLink}
        ticketStatus={event.ticketStatus}
        eventTitle={event.title}
      />
    </main>
  );
}
