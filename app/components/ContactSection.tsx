"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useSiteContent } from "@/lib/hooks/useSiteContent";
import type { TranslationKey } from "@/lib/i18n/translations";

export default function ContactSection() {
  const { t } = useLanguage();
  const { tc } = useSiteContent();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSending(true);
    setError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 3000);
    } finally {
      setSending(false);
    }
  };

  const subjects: { key: TranslationKey; value: string }[] = [
    { key: "contact.eventBooking", value: "Event Booking" },
    { key: "contact.djBooking", value: "DJ Booking" },
    { key: "contact.equipmentRental", value: "Equipment Rental" },
    { key: "contact.generalInquiry", value: "General Inquiry" },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-black py-28 sm:py-32 md:py-40"
    >
      {/* Ambient purple glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute top-1/4 left-1/3 h-[600px] w-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 60%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute right-0 bottom-1/4 h-[400px] w-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(157,78,221,0.06) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Top divider */}
      <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="relative z-10 mx-auto w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <span
            className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-purple-400"
          >
            <span className="inline-block h-px w-10 bg-gradient-to-r from-purple-500 to-transparent" />
            {tc("contact", "label", "contact.label")}
          </span>

          <h2
            className="mt-4 text-[clamp(2rem,4.5vw,4.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.03em]"
          >
            <span className="block text-white">{tc("contact", "heading1", "contact.heading1")}</span>
            <span className="block text-white">{tc("contact", "heading2", "contact.heading2")}</span>
          </h2>

          <p
            className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/50"
          >
            {tc("contact", "description", "contact.description")}
          </p>
        </div>

        {/* Content grid */}
        <div className="grid items-start gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Form — left side */}
          <div
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit}>
              <div className="overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.04] p-7 backdrop-blur-xl sm:p-10">
                <div className="space-y-7">
                  {/* Name & Email row */}
                  <div className="grid gap-7 sm:grid-cols-2">
                    {/* Name */}
                    <div className="relative">
                      <label className="mb-2.5 block text-[10px] font-semibold uppercase tracking-[0.25em] text-purple-400">
                        {t("contact.name")}
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        placeholder={t("contact.namePlaceholder")}
                        className="w-full border-b border-white/[0.15] bg-transparent py-3 text-sm text-white placeholder-white/30 transition-colors duration-300 outline-none focus:border-purple-500/40"
                      />
                      <div
                        className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-purple-500 to-purple-400/50 transition-all duration-500 ${
                          focusedField === "name" ? "w-full opacity-100" : "w-0 opacity-0"
                        }`}
                      />
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <label className="mb-2.5 block text-[10px] font-semibold uppercase tracking-[0.25em] text-purple-400">
                        {t("contact.email")}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        placeholder={t("contact.emailPlaceholder")}
                        className="w-full border-b border-white/[0.15] bg-transparent py-3 text-sm text-white placeholder-white/30 transition-colors duration-300 outline-none focus:border-purple-500/40"
                      />
                      <div
                        className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-purple-500 to-purple-400/50 transition-all duration-500 ${
                          focusedField === "email" ? "w-full opacity-100" : "w-0 opacity-0"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.25em] text-purple-400">
                      {t("contact.subject")}
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {subjects.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setFormData((p) => ({ ...p, subject: opt.value }))}
                          className={`rounded-full border px-4 py-2 text-[11px] font-medium tracking-wide transition-all duration-300 ${
                            formData.subject === opt.value
                              ? "border-purple-500/50 bg-purple-500/20 text-purple-200 shadow-[0_0_15px_rgba(124,58,237,0.15)]"
                              : "border-white/[0.12] bg-white/[0.04] text-white/60 hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-white/80"
                          }`}
                        >
                          {t(opt.key)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <label className="mb-2.5 block text-[10px] font-semibold uppercase tracking-[0.25em] text-purple-400">
                      {t("contact.message")}
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      placeholder={t("contact.messagePlaceholder")}
                      className="w-full resize-none border-b border-white/[0.15] bg-transparent py-3 text-sm text-white placeholder-white/30 transition-colors duration-300 outline-none focus:border-purple-500/40"
                    />
                    <div
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-purple-500 to-purple-400/50 transition-all duration-500 ${
                        focusedField === "message" ? "w-full opacity-100" : "w-0 opacity-0"
                      }`}
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex items-center gap-4 pt-3">
                    <button
                      type="submit"
                      disabled={sending}
                      className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-purple-400 px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_0_20px_rgba(124,58,237,0.2)] transition-all duration-400 hover:shadow-[0_0_40px_rgba(124,58,237,0.4)] hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10">
                        {sending ? t("contact.sending") : submitted ? t("contact.sent") : t("contact.send")}
                      </span>
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 transition-transform duration-700 group-hover:translate-x-full" />
                    </button>
                    {error && (
                      <span className="text-[12px] text-red-400">Failed to send. Please try again.</span>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Right sidebar */}
          <div
            className="space-y-6 lg:col-span-2"
          >
            {/* Contact info cards */}
            {([
              {
                labelKey: "contact.emailLabel" as TranslationKey,
                value: tc("contact", "email_value", "contact.emailValue"),
                href: `mailto:${tc("contact", "email_value", "contact.emailValue")}`,
                icon: (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                ),
              },
              {
                labelKey: "contact.phoneLabel" as TranslationKey,
                value: tc("contact", "phone_value", "contact.phoneValue"),
                href: `tel:${tc("contact", "phone_value", "contact.phoneValue").replace(/[\s\-()]/g, "")}`,
                icon: (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                ),
              },
              {
                labelKey: "contact.locationLabel" as TranslationKey,
                value: tc("contact", "location_value", "contact.locationValue"),
                href: null as string | null,
                icon: (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                ),
              },
            ]).map((item) => (
              <div
                key={item.labelKey}
                className="group flex items-center gap-5 rounded-xl border border-white/[0.1] bg-white/[0.04] p-5 backdrop-blur-sm transition-all duration-400 hover:border-purple-500/30 hover:bg-white/[0.06]"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 text-purple-400 transition-all duration-300 group-hover:border-purple-500/40 group-hover:bg-purple-500/15 group-hover:text-purple-300">
                  {item.icon}
                </div>
                <div>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-purple-400">
                    {t(item.labelKey)}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-1 block text-[15px] font-medium text-white/80 transition-colors duration-300 hover:text-purple-400"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="mt-1 block text-[15px] font-medium text-white/80">
                      {item.value}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-white/[0.04] via-white/[0.06] to-transparent" />

            {/* Socials */}
            <div>
              <span className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.25em] text-purple-400">
                {t("contact.followUs")}
              </span>
              <div className="flex gap-3">
                {[
                  {
                    name: "Instagram",
                    href: tc("contact", "instagram_url", "contact.instagramUrl"),
                    icon: (
                      <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    ),
                  },
                  {
                    name: "TikTok",
                    href: tc("contact", "tiktok_url", "contact.tiktokUrl"),
                    icon: (
                      <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.73a4.85 4.85 0 01-1.01-.04z" />
                      </svg>
                    ),
                  },
                  {
                    name: "Facebook",
                    href: tc("contact", "facebook_url", "contact.facebookUrl"),
                    icon: (
                      <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    ),
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.href !== "#" ? "_blank" : undefined}
                    rel={social.href !== "#" ? "noopener noreferrer" : undefined}
                    aria-label={social.name}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.04] text-white/50 transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/15 hover:text-purple-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.15)]"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-white/[0.04] via-white/[0.06] to-transparent" />

            {/* Quote */}
            <div className="rounded-xl border border-purple-500/15 bg-purple-500/[0.04] p-6">
              <svg className="mb-3 h-5 w-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
              </svg>
              <p className="text-[14px] leading-relaxed text-white/50 italic">
                {tc("contact", "quote", "contact.quote")}
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-px w-6 bg-purple-500/50" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-400/70">
                  {tc("contact", "quote_author", "contact.quoteAuthor")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="mt-24 flex flex-col items-center gap-5 text-center md:mt-28"
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
          <p className="text-[11px] tracking-[0.25em] text-white/20 uppercase">
            STM Events &copy; {new Date().getFullYear()}. {t("footer.rights")}
          </p>
        </div>
      </div>
    </section>
  );
}
