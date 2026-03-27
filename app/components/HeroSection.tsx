"use client";

import CountdownTimer from "./CountdownTimer";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useSiteContent } from "@/lib/hooks/useSiteContent";
import type { HeroEvent } from "@/lib/events";

interface HeroSectionProps {
  nextEvent: HeroEvent | null;
}

export default function HeroSection({ nextEvent }: HeroSectionProps) {
  const { t } = useLanguage();
  const { tc } = useSiteContent();

  const hasEvent = !!nextEvent;
  const isSoldOut = nextEvent?.ticketStatus === "sold-out";
  const hasTicketUrl = !!nextEvent?.ticketUrl && !isSoldOut;

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/video/poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="https://res.cloudinary.com/dqiuwzvfb/video/upload/v1774589028/web_dancing_6.0_zk3wnk.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Purple Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/50 via-black/10 to-violet-900/30" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)]" />

      {/* Bottom Gradient Fade */}
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* Hero Content */}
      <div className="relative z-10 w-full pt-32 pb-20 sm:pt-36 sm:pb-24 md:pt-40 md:pb-28">
        <div className="w-full pl-6 pr-6 sm:pl-10 md:pl-16 lg:pl-24 xl:pl-32">
          <div className="flex max-w-2xl flex-col items-start gap-7 md:gap-8">
            {/* Main Heading */}
            <h1 className="animate-fade-in-up text-[clamp(2.8rem,8vw,7rem)] font-semibold leading-[0.92] tracking-[-0.02em] text-white">
              {tc("hero", "heading_line1", "hero.experience")}
              <br />
              {tc("hero", "heading_line2", "hero.theUnderground")}
            </h1>

            {hasEvent ? (
              <>
                {/* Event Info Card */}
                <div
                  className="animate-fade-in-up flex flex-col gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.04] px-6 py-4 shadow-2xl shadow-purple-500/5 backdrop-blur-xl"
                  style={{ animationDelay: "150ms" }}
                >
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-purple-400">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-purple-400 shadow-sm shadow-purple-400/50" />
                    {t("hero.nextEvent")}
                  </span>
                  <h2 className="text-base font-semibold uppercase tracking-wider text-white sm:text-lg">
                    {nextEvent.title}
                  </h2>
                  <span className="text-[13px] font-normal tracking-wider text-white/50">
                    {nextEvent.date}
                  </span>
                </div>

                {/* Countdown */}
                {nextEvent.rawDate && (
                  <div
                    className="animate-fade-in-up"
                    style={{ animationDelay: "300ms" }}
                  >
                    <CountdownTimer targetDate={new Date(nextEvent.rawDate)} />
                  </div>
                )}

                {/* CTA Button */}
                {hasTicketUrl ? (
                  <a
                    href={nextEvent.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="animate-fade-in-up group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-[#7B2CBF] to-[#9D4EDD] px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.2em] text-white shadow-xl shadow-purple-700/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-purple-600/30"
                    style={{ animationDelay: "450ms" }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    {tc("hero", "button_text", "hero.getTickets")}
                  </a>
                ) : isSoldOut ? (
                  <div
                    className="animate-fade-in-up inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.2em] text-red-400/60"
                    style={{ animationDelay: "450ms" }}
                  >
                    {t("eventDetail.soldOut")}
                  </div>
                ) : null}
              </>
            ) : (
              /* No upcoming event fallback */
              <div
                className="animate-fade-in-up flex flex-col gap-3"
                style={{ animationDelay: "150ms" }}
              >
                <p className="text-lg font-medium tracking-wide text-white/50">
                  {tc("hero", "stay_tuned", "hero.stayTuned")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
