"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useInView } from "framer-motion";

const STATS = [
  { value: 50, suffix: "+", label: "Events Produced" },
  { value: 10, suffix: "K+", label: "People Moved" },
  { value: 30, suffix: "+", label: "Artists Featured" },
  { value: 15, suffix: "+", label: "Venues" },
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
      className="relative border-t border-b border-white/[0.06] bg-black"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px sm:grid-cols-4">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`group relative flex flex-col items-center justify-center px-6 py-10 sm:py-12 ${
              i < STATS.length - 1 ? "sm:border-r sm:border-white/[0.06]" : ""
            } ${i < 2 ? "border-b border-white/[0.06] sm:border-b-0" : ""}`}
          >
            <span className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              <CountUpNumber target={stat.value} suffix={stat.suffix} triggered={triggered} />
            </span>
            <span className="mt-2 text-[10px] font-medium uppercase tracking-[0.25em] text-purple-400/70">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
