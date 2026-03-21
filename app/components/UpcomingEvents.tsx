"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import EventCard from "./EventCard";
import type { EventData } from "@/lib/events";

interface UpcomingEventsProps {
  events: EventData[];
}

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <section id="events" className="relative overflow-hidden bg-black pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24">
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="events-orb-1 absolute h-[800px] w-[800px] rounded-full will-change-transform"
          style={{
            background: "radial-gradient(circle, rgba(157,78,221,0.12) 0%, rgba(123,44,191,0.06) 40%, transparent 70%)",
            filter: "blur(140px)",
            top: "-10%",
            left: "-15%",
          }}
        />
        <div
          className="events-orb-2 absolute h-[600px] w-[600px] rounded-full will-change-transform"
          style={{
            background: "radial-gradient(circle, rgba(123,44,191,0.1) 0%, rgba(76,29,149,0.05) 40%, transparent 70%)",
            filter: "blur(120px)",
            bottom: "-10%",
            right: "-10%",
          }}
        />
      </div>

      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Top fade from hero */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {/* Section Header */}
        <div className="mb-14 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-purple-400"
          >
            <span className="inline-block h-px w-10 bg-gradient-to-r from-purple-500 to-transparent" />
            Upcoming Experiences
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 text-[clamp(2.5rem,5.5vw,5.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.03em] text-white"
          >
            UPCOMING
            <br />
            EVENTS
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/30"
          >
            Discover our next underground experiences and immersive nights.
          </motion.p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-7">
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

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 flex justify-center md:mt-20"
        >
          <Link
            href="/events"
            className="group inline-flex items-center gap-3 rounded-full border border-white/[0.06] bg-white/[0.02] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50 backdrop-blur-sm transition-all duration-400 hover:border-purple-500/20 hover:bg-purple-500/5 hover:text-white"
          >
            <span>View All Events</span>
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
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes events-orb-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(80%, 30%) scale(1.2); }
          66% { transform: translate(40%, -5%) scale(0.9); }
        }
        @keyframes events-orb-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-70%, -40%) scale(0.85); }
          66% { transform: translate(-30%, 15%) scale(1.15); }
        }
        .events-orb-1 {
          animation: events-orb-drift-1 22s ease-in-out infinite;
        }
        .events-orb-2 {
          animation: events-orb-drift-2 28s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
