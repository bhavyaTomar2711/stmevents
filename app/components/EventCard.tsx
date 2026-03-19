"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  image?: string;
  href?: string;
  index: number;
}

export default function EventCard({
  title,
  date,
  location,
  image,
  href = "#",
  index,
}: EventCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="h-full"
    >
      <a href={href} className="group block h-full">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-500 hover:-translate-y-2.5 hover:border-purple-500/25 hover:shadow-[0_20px_60px_-15px_rgba(124,58,237,0.15)]"
        >
          {/* Mouse-follow light effect */}
          <div
            className="pointer-events-none absolute -inset-px z-20 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(500px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(124,58,237,0.1), transparent 40%)`,
            }}
          />

          {/* Hover border glow */}
          <div className="pointer-events-none absolute -inset-px z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(400px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(157,78,221,0.15), transparent 40%)`,
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
              padding: "1px",
              borderRadius: "1rem",
            }}
          />

          {/* Image Area — fixed aspect ratio */}
          <div className="relative aspect-square w-full flex-shrink-0 overflow-hidden">
            {image ? (
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-zinc-900 via-zinc-950 to-black transition-transform duration-700 ease-out group-hover:scale-110">
                {/* Animated gradient placeholder */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(124,58,237,0.12),transparent_70%)]" />
                {/* Grid lines for premium empty feel */}
                <div className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
              </div>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Hover purple wash */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-950/40 via-purple-900/10 to-transparent opacity-0 transition-opacity duration-600 group-hover:opacity-100" />

            {/* Date badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-black/60 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-xl">
                <span className="h-1 w-1 rounded-full bg-purple-400 shadow-sm shadow-purple-400/50" />
                {date}
              </span>
            </div>
          </div>

          {/* Content — fills remaining space */}
          <div className="relative z-10 flex flex-1 flex-col justify-between px-5 pb-5 pt-4">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-white sm:text-[15px]">
                {title}
              </h3>
              <p className="mt-1.5 text-[12px] tracking-wider text-white/35">
                {location}
              </p>
            </div>

            {/* CTA */}
            <div className="mt-5 flex items-center justify-between border-t border-white/[0.04] pt-4 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-purple-400/80">
                View Event
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.08] transition-all duration-300 group-hover:border-purple-500/30 group-hover:bg-purple-500/10">
                <svg
                  className="h-3 w-3 text-purple-400 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}
