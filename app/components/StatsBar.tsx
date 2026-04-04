"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useSiteContent } from "@/lib/hooks/useSiteContent";
import type { TranslationKey } from "@/lib/i18n/translations";

const STATS: { valueKey: TranslationKey; valueFallback: string; labelKey: TranslationKey; fieldKey: string; valueFieldKey: string }[] = [
  { valueKey: "stats.eventsProducedValue", valueFallback: "50+", labelKey: "stats.eventsProduced", fieldKey: "events_produced", valueFieldKey: "events_produced_value" },
  { valueKey: "stats.peopleMovedValue", valueFallback: "10K+", labelKey: "stats.peopleMoved", fieldKey: "people_moved", valueFieldKey: "people_moved_value" },
  { valueKey: "stats.artistsFeaturedValue", valueFallback: "30+", labelKey: "stats.artistsFeatured", fieldKey: "artists_featured", valueFieldKey: "artists_featured_value" },
  { valueKey: "stats.venuesValue", valueFallback: "15+", labelKey: "stats.venues", fieldKey: "venues", valueFieldKey: "venues_value" },
];

// Parse "10K+" → { num: 10, suffix: "K+" }, "50+" → { num: 50, suffix: "+" }
function parseStatValue(raw: string): { num: number; suffix: string } {
  const match = raw.match(/^(\d+)(.*)/);
  if (match) return { num: parseInt(match[1], 10), suffix: match[2] };
  return { num: 0, suffix: raw };
}

function CountUpNumber({ target, suffix, triggered }: { target: number; suffix: string; triggered: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered) return;

    let frame: number;
    const duration = 2000;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [triggered, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  const { t } = useLanguage();
  const { tc } = useSiteContent();
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  // Use IntersectionObserver directly instead of framer-motion useInView
  useEffect(() => {
    if (!ref.current || triggered) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-50px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [triggered]);

  return (
    <div
      ref={ref}
      className="relative border-t border-b border-white/[0.06] bg-black/80 backdrop-blur-xl"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px sm:grid-cols-4">
        {STATS.map((stat, i) => {
          const rawValue = tc("stats", stat.valueFieldKey, stat.valueKey);
          const { num, suffix } = parseStatValue(rawValue);
          return (
            <div
              key={stat.labelKey}
              className={`group relative flex flex-col items-center justify-center px-6 py-10 transition-colors duration-500 hover:bg-white/[0.02] sm:py-12 ${
                i < STATS.length - 1 ? "sm:border-r sm:border-white/[0.06]" : ""
              } ${i < 2 ? "border-b border-white/[0.06] sm:border-b-0" : ""}`}
            >
              <span className="text-4xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-purple-100 sm:text-5xl">
                <CountUpNumber target={num} suffix={suffix} triggered={triggered} />
              </span>
              <span className="mt-2 text-[10px] font-medium uppercase tracking-[0.25em] text-purple-400/70 transition-colors duration-300 group-hover:text-purple-400">
                {tc("stats", stat.fieldKey, stat.labelKey)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
