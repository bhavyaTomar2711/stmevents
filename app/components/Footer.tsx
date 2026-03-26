"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const quickLinks = [
  { key: "nav.events" as const, href: "/events" },
  { key: "nav.gallery" as const, href: "/gallery" },
  { key: "nav.djs" as const, href: "/djs" },
  { key: "equipment.label" as const, href: "/equipment" },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "SoundCloud",
    href: "#",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.057-.049-.1-.1-.1zm-.899.828c-.06 0-.091.037-.104.094L0 14.479l.172 1.308c.013.06.045.094.104.094.057 0 .09-.035.099-.094l.198-1.308-.198-1.332c-.01-.058-.042-.094-.099-.094zm1.793-1.515c-.066 0-.12.055-.124.12l-.217 2.82.217 2.726c.005.066.058.12.124.12.064 0 .119-.054.123-.12l.248-2.726-.248-2.82c-.004-.065-.06-.12-.123-.12zm.91-.27c-.073 0-.135.062-.137.135l-.212 3.09.212 2.89c.002.073.064.135.137.135.075 0 .135-.062.139-.135l.241-2.89-.241-3.09c-.004-.073-.064-.135-.139-.135zm.91-.166c-.08 0-.15.07-.151.15l-.197 3.256.197 2.95c.001.082.071.15.151.15.08 0 .15-.07.152-.15l.225-2.95-.225-3.256c-.002-.08-.072-.15-.152-.15zm.91-.06c-.088 0-.16.075-.163.165l-.182 3.316.182 2.98c.003.09.075.163.163.163.087 0 .16-.075.162-.163l.209-2.98-.209-3.316c-.002-.09-.075-.165-.162-.165zm.91.03c-.095 0-.172.08-.175.178l-.168 3.286.168 2.97c.003.1.08.178.175.178.094 0 .172-.08.175-.178l.194-2.97-.194-3.286c-.003-.098-.08-.178-.175-.178zm.91-.12c-.102 0-.185.088-.188.193l-.152 3.406.152 2.93c.003.105.086.193.188.193.1 0 .185-.088.188-.193l.175-2.93-.175-3.406c-.003-.105-.088-.193-.188-.193zm.91-.105c-.11 0-.2.095-.2.21l-.14 3.51.14 2.9c0 .114.09.21.2.21.108 0 .198-.096.2-.21l.163-2.9-.163-3.51c-.002-.115-.092-.21-.2-.21zm.91-.04c-.117 0-.213.103-.214.224l-.127 3.55.127 2.875c.001.12.097.223.214.223.115 0 .213-.103.214-.223l.147-2.875-.147-3.55c-.001-.12-.099-.224-.214-.224zm1.838-.247c-.029-.003-.06-.003-.09-.003-.127 0-.247.024-.357.067a3.35 3.35 0 00-3.198-2.34c-.342 0-.675.063-.99.178-.132.049-.167.098-.167.196v8.312c0 .1.068.188.164.2h4.638a2.388 2.388 0 002.388-2.387 2.39 2.39 0 00-2.388-2.223z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "#",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-.81-.06l-.38.86z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

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
              {t("footer.tagline")}
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="glass-card flex h-10 w-10 items-center justify-center rounded-lg text-white/30 transition-all duration-300 hover:text-purple-400 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]"
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
                info@stmevents.com
              </li>
              <li className="flex items-center gap-3 text-[13px] text-white/40">
                <svg className="h-4 w-4 flex-shrink-0 text-purple-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Berlin, Germany
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
            <p className="text-[11px] tracking-wider text-white/15">
              {t("footer.madeWith")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
