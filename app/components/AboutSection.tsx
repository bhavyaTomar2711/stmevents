"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useSiteContent } from "@/lib/hooks/useSiteContent";

export default function AboutSection() {
  const { t } = useLanguage();
  const { tc } = useSiteContent();

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-black py-28 sm:py-32 md:py-40"
    >
      {/* Noise only — no orbs */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 items-center gap-12 md:gap-16 lg:grid-cols-2 lg:gap-20 xl:gap-28">

          {/* ── Left — Text ── */}
          <div className="max-w-xl">
            {/* Label */}
            <span
              className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-purple-400"
            >
              <span
                className="inline-block h-px bg-gradient-to-r from-purple-500 to-transparent"
                style={{ width: 40 }}
              />
              {tc("about", "label", "about.label")}
            </span>

            {/* Heading */}
            <h2
              className="mt-4 text-[clamp(1.8rem,3.5vw,3.2rem)] font-bold uppercase leading-[1] tracking-[-0.02em] text-white"
            >
              {tc("about", "heading", "about.heading")}{" "}
              <span className="text-purple-400">{tc("about", "heading_highlight", "about.headingHighlight")}</span> {t("about.headingEnd")}
            </h2>

            {/* Description */}
            <div
              className="mt-6 space-y-4"
            >
              <p className="text-[15px] leading-[1.75] text-white/40">
                {tc("about", "p1", "about.p1")}
              </p>
              <p className="text-[15px] leading-[1.75] text-white/40">
                {tc("about", "p2", "about.p2")}
              </p>
            </div>


          </div>

          {/* ── Right — Visual ── */}
          <div
            className="relative"
          >
            {/* Accent line (left edge) */}
            <div
              className="absolute -left-3 top-8 bottom-8 hidden w-px lg:block"
              style={{
                background: "linear-gradient(to bottom, transparent, rgba(157,78,221,0.3) 30%, rgba(157,78,221,0.3) 70%, transparent)",
              }}
            />

            <div className="glass-card relative overflow-hidden rounded-2xl">
              <div className="aspect-[4/5] w-full overflow-hidden">
                <img
                  src={tc("about", "about_image", "about.image")}
                  alt="STM Events atmosphere"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />

              {/* Purple tint */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-transparent" />

              {/* Corner accent */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3">
                  <div
                    className="h-px flex-1 bg-gradient-to-r from-purple-500/40 to-transparent"
                  />
                  <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/30">
                    {t("about.est")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
