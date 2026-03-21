"use client";

import { useState, useEffect, useCallback } from "react";

const navLinks = [
  { label: "EVENTS", href: "#events" },
  { label: "GALLERY", href: "#gallery" },
  { label: "SERVICES", href: "#services" },
  { label: "DJS", href: "#djs" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
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
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/60 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex items-center justify-between px-6 py-5 md:px-10 lg:px-16 xl:px-24">
        {/* Logo */}
        <a
          href="#"
          onClick={scrollToTop}
          className="group flex items-baseline gap-[3px] select-none"
        >
          <span className="text-xl font-bold tracking-tight text-white transition-opacity group-hover:opacity-80 md:text-[22px]">
            STM
          </span>
          <span className="text-xl font-extralight tracking-tight text-white/70 transition-opacity group-hover:opacity-80 md:text-[22px]">
            EVENTS
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-9 md:flex lg:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={`relative text-[12px] font-medium tracking-[0.2em] transition-colors duration-300 hover:text-white ${
                activeSection === link.href.replace("#", "")
                  ? "text-white"
                  : "text-white/60"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-purple-500 transition-all duration-300 ${
                  activeSection === link.href.replace("#", "")
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
            <button className="font-medium text-white transition-colors hover:text-white/70">
              EN
            </button>
            <span className="text-white/25">|</span>
            <button className="font-medium text-white/40 transition-colors hover:text-white">
              DE
            </button>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`h-[1.5px] w-5 rounded-full bg-white transition-all duration-300 ${
              menuOpen ? "translate-y-[6.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-5 rounded-full bg-white transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-5 rounded-full bg-white transition-all duration-300 ${
              menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl transition-all duration-500 md:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={`text-xl font-medium tracking-[0.25em] transition-colors hover:text-white ${
                activeSection === link.href.replace("#", "")
                  ? "text-white"
                  : "text-white/70"
              }`}
              style={{
                transitionDelay: menuOpen ? `${i * 50}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(12px)",
                transition:
                  "opacity 0.4s ease, transform 0.4s ease, color 0.2s",
              }}
            >
              {link.label}
            </a>
          ))}

          <div
            className="mt-6 flex items-center gap-3 text-base tracking-[0.2em]"
            style={{
              transitionDelay: menuOpen ? `${navLinks.length * 50}ms` : "0ms",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            <button className="font-medium text-white">EN</button>
            <span className="text-white/25">|</span>
            <button className="font-medium text-white/40 hover:text-white">
              DE
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
