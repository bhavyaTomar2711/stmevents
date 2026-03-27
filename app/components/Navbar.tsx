"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { TranslationKey } from "@/lib/i18n/translations";

const navLinks: { key: TranslationKey; href: string }[] = [
  { key: "nav.events", href: "#events" },
  { key: "nav.gallery", href: "#gallery" },
  { key: "nav.djs", href: "#djs" },
  { key: "nav.services", href: "#services" },
  { key: "nav.contact", href: "#contact" },
];

export default function Navbar() {
  const { locale, setLocale, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const scrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        const offset = 0;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
      setMenuOpen(false);
    },
    []
  );

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navLinks.map((l) => l.href.replace("#", ""));
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
          ? "bg-black/60 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "bg-transparent"
          }`}
      >
        <div className="mx-auto flex items-center justify-between px-6 py-5 md:px-10 lg:px-16 xl:px-24">
          {/* Logo */}
          <a
            href="#"
            onClick={scrollToTop}
            className="group select-none transition-opacity hover:opacity-80"
          >
            <Image
              src="https://res.cloudinary.com/dqiuwzvfb/image/upload/v1774434332/logoo_bho6qe.png"
              alt="STM Events"
              width={120}
              height={40}
              className="h-10 w-auto md:h-9"
              priority
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-9 md:flex lg:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`relative text-[12px] font-medium tracking-[0.2em] transition-colors duration-300 hover:text-white ${activeSection === link.href.replace("#", "")
                  ? "text-white"
                  : "text-white/60"
                  }`}
              >
                {t(link.key)}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-purple-500 transition-all duration-300 ${activeSection === link.href.replace("#", "")
                    ? "w-full opacity-100"
                    : "w-0 opacity-0"
                    }`}
                />
              </a>
            ))}

            {/* Divider */}
            <div className="h-4 w-px bg-white/15" />

            {/* Language Switch */}
            <div className="flex items-center gap-1.5 text-[12px] tracking-[0.15em]">
              <button
                onClick={() => setLocale("de")}
                className={`font-medium transition-colors ${locale === "de" ? "text-white" : "text-white/40 hover:text-white"}`}
              >
                DE
              </button>
              <span className="text-white/25">|</span>
              <button
                onClick={() => setLocale("en")}
                className={`font-medium transition-colors ${locale === "en" ? "text-white" : "text-white/40 hover:text-white"}`}
              >
                EN
              </button>
            </div>

            {/* Account */}
            <div className="h-4 w-px bg-white/15" />
            <Link
              href="/account"
              className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70 transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {t("nav.myAccount")}
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-[1000] flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`h-[1.5px] w-5 rounded-full bg-white transition-all duration-300 ${menuOpen ? "translate-y-[6.5px] rotate-45" : ""
                }`}
            />
            <span
              className={`h-[1.5px] w-5 rounded-full bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""
                }`}
            />
            <span
              className={`h-[1.5px] w-5 rounded-full bg-white transition-all duration-300 ${menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
                }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay — outside nav to avoid stacking context issues */}
      <div
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-all duration-500 md:hidden ${menuOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
          }`}
      >
        {/* Close button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-5 right-6 z-10 flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
          aria-label="Close menu"
        >
          <span className="h-[1.5px] w-5 translate-y-[3px] rotate-45 rounded-full bg-white" />
          <span className="h-[1.5px] w-5 -translate-y-[3px] -rotate-45 rounded-full bg-white" />
        </button>

        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.key}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={`text-xl font-medium tracking-[0.25em] hover:text-white ${activeSection === link.href.replace("#", "")
                ? "text-white"
                : "text-white/70"
                }`}
              style={{
                transitionProperty: "opacity, transform, color",
                transitionDuration: "0.4s, 0.4s, 0.2s",
                transitionTimingFunction: "ease",
                transitionDelay: menuOpen ? `${i * 50}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(12px)",
              }}
            >
              {t(link.key)}
            </a>
          ))}

          <div
            className="mt-6 flex items-center gap-3 text-base tracking-[0.2em]"
            style={{
              transitionProperty: "opacity, transform",
              transitionDuration: "0.4s",
              transitionTimingFunction: "ease",
              transitionDelay: menuOpen ? `${navLinks.length * 50}ms` : "0ms",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(12px)",
            }}
          >
            <button
              onClick={() => setLocale("de")}
              className={`font-medium transition-colors ${locale === "de" ? "text-white" : "text-white/40 hover:text-white"}`}
            >
              DE
            </button>
            <span className="text-white/25">|</span>
            <button
              onClick={() => setLocale("en")}
              className={`font-medium transition-colors ${locale === "en" ? "text-white" : "text-white/40 hover:text-white"}`}
            >
              EN
            </button>
          </div>

          <Link
            href="/account"
            onClick={() => setMenuOpen(false)}
            className="mt-6 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.15em] text-white/80 transition-all duration-300 hover:border-white/40 hover:bg-white/20"
            style={{
              transitionProperty: "opacity, transform",
              transitionDuration: "0.4s",
              transitionTimingFunction: "ease",
              transitionDelay: menuOpen ? `${(navLinks.length + 1) * 50}ms` : "0ms",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(12px)",
            }}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            My Account
          </Link>
        </div>
      </div>
    </>
  );
}
