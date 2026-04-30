"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useSiteContent } from "@/lib/hooks/useSiteContent";

const quickLinks = [
  { key: "nav.events" as const, href: "/events" },
  { key: "nav.gallery" as const, href: "/gallery" },
  { key: "nav.djs" as const, href: "/djs" },
  { key: "equipment.label" as const, href: "/equipment" },
];

export default function Footer() {
  const { t } = useLanguage();
  const { tc } = useSiteContent();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Instagram",
      href: tc("footer", "instagram_url", "footer.instagramUrl"),
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      name: "TikTok",
      href: tc("footer", "tiktok_url", "footer.tiktokUrl"),
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.73a4.85 4.85 0 01-1.01-.04z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: tc("footer", "facebook_url", "footer.facebookUrl"),
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative bg-black">
      {/* Top border accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 pt-16 pb-10 sm:px-10 lg:px-16">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <Image
              src="https://res.cloudinary.com/dqiuwzvfb/image/upload/v1774434332/logoo_bho6qe.png"
              alt="STM Events"
              width={100}
              height={34}
              className="h-9 w-auto"
            />
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-white/35">
              {tc("footer", "tagline", "footer.tagline")}
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href !== "#" ? "_blank" : undefined}
                  rel={social.href !== "#" ? "noopener noreferrer" : undefined}
                  aria-label={social.name}
                  className="glass-card flex h-10 flex-1 items-center justify-center rounded-lg text-white/30 transition-all duration-300 hover:text-purple-400 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/25">
              {t("footer.quickLinks")}
            </h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-white/40 transition-colors duration-300 hover:text-purple-400"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-4">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/25">
              {t("footer.contactUs")}
            </h3>
            <ul className="mt-5 space-y-3">
              <li className="flex items-center gap-3 text-[13px] text-white/40">
                <svg className="h-4 w-4 flex-shrink-0 text-purple-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                {tc("footer", "email", "footer.email")}
              </li>
              <li className="flex items-center gap-3 text-[13px] text-white/40">
                <svg className="h-4 w-4 flex-shrink-0 text-purple-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {tc("footer", "location", "footer.location")}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.04] pt-8 sm:flex-row">
          <p className="text-[11px] tracking-wider text-white/20">
            &copy; {currentYear} STM Events. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/impressum"
              className="text-[11px] tracking-wider text-white/20 transition-colors hover:text-purple-400/60"
            >
              Impressum
            </Link>
            <span className="text-white/10">|</span>
            <Link
              href="/privacy-policy"
              className="text-[11px] tracking-wider text-white/20 transition-colors hover:text-purple-400/60"
            >
              Privacy Policy
            </Link>
            <span className="text-white/10">|</span>
            <Link
              href="/terms"
              className="text-[11px] tracking-wider text-white/20 transition-colors hover:text-purple-400/60"
            >
              Terms & Conditions
            </Link>
            <span className="text-white/10">|</span>
            <p className="text-[11px] tracking-wider text-white/15">
              {t("footer.madeWith")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
