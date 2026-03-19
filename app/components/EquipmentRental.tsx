"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";

/* ── Equipment Data (placeholders — replace images later) ── */
const EQUIPMENT = [
  {
    name: "Pioneer CDJ-3000",
    category: "DJ Equipment",
    description: "Industry-standard media player with a 9-inch touchscreen, advanced playback features, and studio-grade audio quality.",
    price: "€120",
    pricePer: "/ day",
    image: "/1.png",
    featured: true,
  },
  {
    name: "Allen & Heath Xone:96",
    category: "DJ Equipment",
    description: "Premium analogue DJ mixer with dual soundcards, crunch drive, and unmatched warm sound character.",
    price: "€95",
    pricePer: "/ day",
    image: "/2.png",
    featured: false,
  },
  {
    name: "QSC KLA Series",
    category: "Sound System",
    description: "Active line array system delivering crystal-clear audio up to 2000+ capacity venues with deep, controlled bass.",
    price: "€350",
    pricePer: "/ day",
    image: "/3.png",
    featured: false,
  },
  {
    name: "Martin MAC Aura XB",
    category: "Lighting",
    description: "Compact LED wash light with an innovative backlight system for stunning colour mixing and beam effects.",
    price: "€80",
    pricePer: "/ day",
    image: "/4.png",
    featured: false,
  },
  {
    name: "Chauvet Rogue R2X",
    category: "Lighting",
    description: "High-output LED spot fixture with motorised focus, prism effects, and ultra-smooth movement for dynamic shows.",
    price: "€65",
    pricePer: "/ day",
    image: "/5.png",
    featured: false,
  },
  {
    name: "JBL VTX A12",
    category: "Sound System",
    description: "Tour-grade line array with patented D2 drivers delivering pristine highs and powerful low-end for any venue.",
    price: "€420",
    pricePer: "/ day",
    image: "/6.png",
    featured: false,
  },
];

/* ── Category icon ── */
function CategoryIcon({ category }: { category: string }) {
  if (category === "DJ Equipment") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" strokeLinecap="round" />
      </svg>
    );
  }
  if (category === "Sound System") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <circle cx="12" cy="14" r="4" />
        <circle cx="12" cy="14" r="1" />
        <circle cx="12" cy="6" r="1.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Product Card ── */
function ProductCard({
  item,
  index,
  activeIndex,
  onHover,
  onLeave,
}: {
  item: (typeof EQUIPMENT)[0];
  index: number;
  activeIndex: number | null;
  onHover: (i: number) => void;
  onLeave: () => void;
}) {
  const isActive = activeIndex === index;
  const isDimmed = activeIndex !== null && !isActive;
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    onLeave();
  }, [onLeave]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => onHover(index)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative transition-all duration-500 ${isDimmed ? "opacity-50 scale-[0.98]" : ""
        }`}
      style={{
        perspective: "800px",
      }}
    >
      <div
        className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm transition-all duration-500 group-hover:border-purple-500/15 group-hover:bg-white/[0.04]"
        style={{
          transform: isActive
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-4px)`
            : "rotateX(0) rotateY(0) translateY(0)",
          transition: "transform 0.3s ease-out, border-color 0.5s, background-color 0.5s",
        }}
      >
        {/* Purple glow underneath */}
        <div
          className={`pointer-events-none absolute -bottom-6 left-1/2 h-32 w-3/4 -translate-x-1/2 rounded-full bg-purple-600/15 blur-3xl transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"
            }`}
        />

        {/* Top accent line */}
        <div
          className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"
            }`}
        />

        {/* Image area */}
        <div className="relative overflow-hidden">
          <div
            className={`relative w-full transition-transform duration-700 will-change-transform ${isActive ? "scale-105" : "scale-100"
              }`}
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[16/10] w-full items-center justify-center bg-gradient-to-b from-white/[0.03] to-transparent">
                <div className="relative h-24 w-24">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 via-white/[0.03] to-transparent" />
                  <div className="absolute inset-2 rounded-xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center text-white/15">
                    <CategoryIcon category={item.category} />
                  </div>
                </div>
              </div>
            )}

            {/* Subtle reflection */}
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"
                }`}
              style={{
                transform: `translate(${tilt.y * 3}px, ${tilt.x * 3}px)`,
                transition: "transform 0.2s ease-out, opacity 0.5s",
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pt-6 pb-8">
          {/* Category */}
          <div className="mb-3 flex items-center gap-2">
            <span className="text-purple-400/70">
              <CategoryIcon category={item.category} />
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-purple-400/70">
              {item.category}
            </span>
          </div>

          {/* Name */}
          <h3 className="text-lg font-bold uppercase tracking-tight text-white sm:text-xl">
            {item.name}
          </h3>

          {/* Description */}
          <p className="mt-2 text-[13px] leading-relaxed text-white/35">
            {item.description}
          </p>

          {/* Price + CTA row */}
          <div className="mt-6 flex items-end justify-between">
            <div>
              <span className="text-2xl font-bold tracking-tight text-white">
                {item.price}
              </span>
              <span className="ml-1 text-sm text-white/30">{item.pricePer}</span>
            </div>

            <a
              href="#contact"
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-400 ${isActive
                ? "border-purple-500/30 bg-purple-500/10 text-purple-300"
                : "border-white/[0.06] bg-transparent text-white/40"
                } hover:border-purple-500/40 hover:bg-purple-500/15 hover:text-purple-200`}
            >
              <span>Inquire</span>
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Section ── */
export default function EquipmentRental() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      id="equipment"
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-28 sm:py-32 md:py-40"
    >
      {/* ── Background — pure CSS ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="equip-orb-1 absolute h-[700px] w-[700px] rounded-full will-change-transform"
          style={{
            background: "radial-gradient(circle, rgba(157,78,221,0.08) 0%, transparent 70%)",
            filter: "blur(140px)",
            top: "10%",
            right: "-10%",
          }}
        />
        <div
          className="equip-orb-2 absolute h-[500px] w-[500px] rounded-full will-change-transform"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
            filter: "blur(100px)",
            bottom: "10%",
            left: "-5%",
          }}
        />
        {/* Noise */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {/* Header */}
        <div ref={headerRef} className="mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-purple-400"
          >
            <span className="inline-block h-px w-10 bg-gradient-to-r from-purple-500 to-transparent" />
            Equipment Rentals
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-[clamp(2rem,4.5vw,4.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.03em]"
          >
            <span className="block text-white">Professional</span>
            <span className="block text-white/50">Sound & Lighting</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/35"
          >
            High-performance gear designed to elevate every event. No direct online booking — contact us for availability and custom packages.
          </motion.p>
        </div>

        {/* ── Product Grid ── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
          {EQUIPMENT.map((item, i) => (
            <ProductCard
              key={item.name}
              item={item}
              index={i}
              activeIndex={activeIndex}
              onHover={setActiveIndex}
              onLeave={() => setActiveIndex(null)}
            />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 flex flex-col items-center gap-6 md:mt-20"
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <p className="max-w-md text-center text-[13px] leading-relaxed text-white/30">
            Need a custom setup? We build tailored sound and lighting packages for events of any scale.
          </p>

          <a
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.02] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/60 transition-all duration-400 hover:border-purple-500/25 hover:bg-purple-500/5 hover:text-white"
          >
            <span>Get a Custom Quote</span>
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
          </a>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes equip-orb-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(1.08); }
          66% { transform: translate(25px, -20px) scale(0.94); }
        }
        @keyframes equip-orb-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(35px, -25px) scale(1.05); }
          66% { transform: translate(-20px, 15px) scale(0.96); }
        }
        .equip-orb-1 {
          animation: equip-orb-drift-1 22s ease-in-out infinite;
        }
        .equip-orb-2 {
          animation: equip-orb-drift-2 26s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
