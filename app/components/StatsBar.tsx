"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useInView } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useSiteContent } from "@/lib/hooks/useSiteContent";
import type { TranslationKey } from "@/lib/i18n/translations";

const STATS: { value: number; suffix: string; labelKey: TranslationKey; fieldKey: string }[] = [
  { value: 50, suffix: "+", labelKey: "stats.eventsProduced", fieldKey: "events_produced" },
  { value: 10, suffix: "K+", labelKey: "stats.peopleMoved", fieldKey: "people_moved" },
  { value: 30, suffix: "+", labelKey: "stats.artistsFeatured", fieldKey: "artists_featured" },
  { value: 15, suffix: "+", labelKey: "stats.venues", fieldKey: "venues" },
];

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
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [triggered, setTriggered] = useState(false);

  const onView = useCallback(() => {
    if (isInView && !triggered) setTriggered(true);
  }, [isInView, triggered]);

  useEffect(() => { onView(); }, [onView]);

  return (
    <div
      ref={ref}
      className="relative border-t border-b border-white/[0.06] bg-black/80 backdrop-blur-xl"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px sm:grid-cols-4">
        {STATS.map((stat, i) => (
          <div
            key={stat.labelKey}
            className={`group relative flex flex-col items-center justify-center px-6 py-10 transition-colors duration-500 hover:bg-white/[0.02] sm:py-12 ${
              i < STATS.length - 1 ? "sm:border-r sm:border-white/[0.06]" : ""
            } ${i < 2 ? "border-b border-white/[0.06] sm:border-b-0" : ""}`}
          >
            <span className="text-4xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-purple-100 sm:text-5xl">
              <CountUpNumber target={stat.value} suffix={stat.suffix} triggered={triggered} />
            </span>
            <span className="mt-2 text-[10px] font-medium uppercase tracking-[0.25em] text-purple-400/70 transition-colors duration-300 group-hover:text-purple-400">
              {tc("stats", stat.fieldKey, stat.labelKey)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
