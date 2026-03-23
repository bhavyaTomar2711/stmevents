"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TicketStatus } from "@/lib/events";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface EventCTAStickyProps {
  ticketUrl: string;
  ticketStatus: TicketStatus;
  eventTitle: string;
}

export default function EventCTASticky({ ticketUrl, ticketStatus, eventTitle }: EventCTAStickyProps) {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide if sold out or no ticket URL
  if (ticketStatus === "sold-out" || !ticketUrl) return null;

  const isUrgent = ticketStatus === "limited" || ticketStatus === "final-release";
  const urgentLabel =
    ticketStatus === "limited" ? t("cta.limitedTickets") : t("cta.finalRelease");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          {/* Blur backdrop */}
          <div className="border-t border-white/[0.06] bg-black/80 backdrop-blur-lg">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 sm:px-10 lg:px-16">
              {/* Left: event info */}
              <div className="mr-4 hidden min-w-0 flex-col sm:flex">
                <span className="truncate text-sm font-semibold uppercase tracking-tight text-white">
                  {eventTitle}
                </span>
                <div className="flex items-center gap-2">
                  {isUrgent && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-400">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
                      </span>
                      {urgentLabel}
                    </span>
                  )}
                  <span className="text-[11px] text-white/25">
                    {t("cta.poweredBy")}
                  </span>
                </div>
              </div>

              {/* Right: CTA button */}
              <a
                href={ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex flex-shrink-0 items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-purple-500 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-all duration-400 hover:shadow-[0_0_25px_rgba(124,58,237,0.3)] sm:px-8 sm:py-3.5"
              >
                <svg className="relative z-10 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
                </svg>
                <span className="relative z-10">{t("cta.getTickets")}</span>
                <svg className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 transition-transform duration-700 group-hover:translate-x-full" />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
