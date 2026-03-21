"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const subjects = ["Event Booking", "DJ Booking", "Equipment Rental", "General Inquiry"];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden bg-black py-28 sm:py-32 md:py-40"
    >
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
      <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative z-10 mx-auto w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-purple-400"
          >
            <span className="inline-block h-px w-10 bg-gradient-to-r from-purple-500 to-transparent" />
            Get In Touch
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-[clamp(2rem,4.5vw,4.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.03em]"
          >
            <span className="block text-white">LET&apos;S CREATE</span>
            <span className="block text-white">YOUR NEXT EVENT</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/35"
          >
            From underground nights to full-scale productions — we bring your vision to life.
          </motion.p>
        </div>

        {/* Content grid */}
        <div className="grid items-start gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Form — left side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit}>
              <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 sm:p-10">
                <div className="space-y-7">
                  {/* Name & Email row */}
                  <div className="grid gap-7 sm:grid-cols-2">
                    {/* Name */}
                    <div className="relative">
                      <label className="mb-2.5 block text-[10px] font-semibold uppercase tracking-[0.25em] text-white/25">
                        Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Your name"
                        className="w-full border-b border-white/[0.08] bg-transparent py-3 text-sm text-white placeholder-white/15 transition-colors duration-300 outline-none focus:border-purple-500/40"
                      />
                      <div
                        className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-purple-500 to-purple-400/50 transition-all duration-500 ${
                          focusedField === "name" ? "w-full opacity-100" : "w-0 opacity-0"
                        }`}
                      />
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <label className="mb-2.5 block text-[10px] font-semibold uppercase tracking-[0.25em] text-white/25">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="your@email.com"
                        className="w-full border-b border-white/[0.08] bg-transparent py-3 text-sm text-white placeholder-white/15 transition-colors duration-300 outline-none focus:border-purple-500/40"
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
                    <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.25em] text-white/25">
                      Subject
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {subjects.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setFormData((p) => ({ ...p, subject: opt }))}
                          className={`rounded-full border px-4 py-2 text-[11px] font-medium tracking-wide transition-all duration-300 ${
                            formData.subject === opt
                              ? "border-purple-500/40 bg-purple-500/10 text-purple-300"
                              : "border-white/[0.06] bg-white/[0.02] text-white/40 hover:border-purple-500/25 hover:text-white/60"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <label className="mb-2.5 block text-[10px] font-semibold uppercase tracking-[0.25em] text-white/25">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Tell us about your event or inquiry..."
                      className="w-full resize-none border-b border-white/[0.08] bg-transparent py-3 text-sm text-white placeholder-white/15 transition-colors duration-300 outline-none focus:border-purple-500/40"
                    />
                    <div
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-purple-500 to-purple-400/50 transition-all duration-500 ${
                        focusedField === "message" ? "w-full opacity-100" : "w-0 opacity-0"
                      }`}
                    />
                  </div>

                  {/* Submit */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-purple-500 px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-400 hover:shadow-[0_0_30px_rgba(124,58,237,0.25)]"
                    >
                      <span className="relative z-10">
                        {submitted ? "SENT SUCCESSFULLY !" : "SEND INQUIRY"}
                      </span>
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 transition-transform duration-700 group-hover:translate-x-full" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </motion.div>

          {/* Right sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6 lg:col-span-2"
          >
            {/* Contact info cards */}
            {[
              {
                label: "Email",
                value: "contact@stm-events.com",
                href: "mailto:contact@stm-events.com",
                icon: (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                ),
              },
              {
                label: "Phone",
                value: "+49 123 456 7890",
                href: "tel:+491234567890",
                icon: (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                ),
              },
              {
                label: "Location",
                value: "Berlin, Germany",
                href: null,
                icon: (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div
                key={item.label}
                className="group flex items-center gap-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-400 hover:border-purple-500/20 hover:bg-white/[0.03]"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-white/30 transition-all duration-300 group-hover:border-purple-500/25 group-hover:text-purple-400">
                  {item.icon}
                </div>
                <div>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-white/25">
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-1 block text-[15px] font-medium text-white/70 transition-colors duration-300 hover:text-purple-400"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="mt-1 block text-[15px] font-medium text-white/70">
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
              <span className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.25em] text-white/25">
                Follow Us
              </span>
              <div className="flex gap-3">
                {[
                  {
                    name: "Instagram",
                    icon: (
                      <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    ),
                  },
                  {
                    name: "SoundCloud",
                    icon: (
                      <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.06-.05-.1-.1-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.172 1.308c.013.06.045.094.09.094.053 0 .084-.034.092-.09l.2-1.312-.2-1.334c-.009-.06-.04-.09-.09-.09m1.83-1.229c-.063 0-.112.05-.119.104l-.207 2.411.207 2.336c.007.058.056.104.12.104.063 0 .111-.046.12-.104l.232-2.336-.233-2.411c-.008-.058-.056-.104-.12-.104m.862-.039c-.074 0-.13.06-.137.12l-.194 2.576.194 2.462c.008.06.063.12.137.12s.13-.06.138-.12l.22-2.462-.22-2.576c-.009-.06-.064-.12-.138-.12m.87-.239c-.084 0-.148.065-.155.135l-.178 2.815.178 2.582c.007.07.07.135.155.135.084 0 .148-.065.155-.135l.2-2.582-.2-2.815c-.007-.07-.07-.135-.155-.135m.895-.331c-.094 0-.167.075-.174.15l-.163 3.146.163 2.704c.007.075.08.15.174.15.094 0 .166-.075.174-.15l.183-2.704-.183-3.146c-.008-.075-.08-.15-.174-.15m.893-.186c-.104 0-.184.08-.191.165l-.148 3.332.148 2.78c.007.085.087.165.19.165.104 0 .184-.08.191-.165l.168-2.78-.168-3.332c-.007-.085-.087-.165-.19-.165m.92-.306c-.114 0-.2.09-.208.18l-.133 3.638.133 2.839c.008.09.094.18.208.18s.2-.09.208-.18l.15-2.839-.15-3.638c-.008-.09-.094-.18-.208-.18m.89.073c-.12 0-.213.095-.22.19l-.12 3.57.12 2.867c.007.1.1.19.22.19.12 0 .214-.09.22-.19l.138-2.867-.138-3.57c-.006-.1-.1-.19-.22-.19m.94-.215c-.006-.1-.1-.2-.23-.2-.13 0-.223.1-.23.2l-.106 3.785.106 2.89c.007.11.1.2.23.2.13 0 .223-.09.23-.2l.12-2.89-.12-3.785m1.147.075c-.005-.11-.107-.21-.246-.21-.14 0-.24.1-.246.21l-.09 3.71.09 2.905c.006.115.107.21.246.21.14 0 .24-.095.246-.21l.104-2.905-.104-3.71m.876.32c-.14 0-.253.11-.258.225l-.078 3.39.078 2.917c.005.12.118.225.258.225s.252-.105.258-.225l.088-2.917-.088-3.39c-.006-.12-.118-.225-.258-.225m1.156-1.358c-.15 0-.268.12-.273.24l-.063 4.748.063 2.927c.005.12.123.24.273.24s.268-.12.273-.24l.072-2.927-.072-4.748c-.005-.12-.123-.24-.273-.24m.87.483c-.16 0-.282.13-.288.255l-.048 4.265.048 2.938c.006.13.128.255.288.255.16 0 .282-.125.288-.255l.055-2.938-.055-4.265c-.006-.13-.128-.255-.288-.255m1.17-1.665c-.028-.15-.158-.27-.318-.27-.16 0-.29.12-.318.27l-.038 5.93.038 2.945c.028.15.158.27.318.27.16 0 .29-.12.318-.27l.044-2.945-.044-5.93m.837 1.153c-.17 0-.305.14-.313.285l-.023 4.692.023 2.952c.008.15.143.285.313.285.17 0 .305-.135.313-.285l.026-2.952-.026-4.692c-.008-.15-.143-.285-.313-.285m1.214-2.068c-.02-.165-.166-.3-.342-.3-.175 0-.32.135-.34.3l-.012 6.76.012 2.96c.02.165.165.3.34.3.176 0 .322-.135.342-.3l.013-2.96-.013-6.76m.857.592c-.006-.005-.016-.008-.024-.008-.175 0-.323.14-.34.3l-.004 6.168.004 2.96c.017.16.165.3.34.3.01 0 .018-.002.027-.008.16-.024.283-.155.294-.292l.004-2.96-.004-6.168c-.011-.14-.134-.27-.297-.292m.916 2.485c-.003 0-.006 0-.01.002-.017.002-.033.01-.047.017-.01.006-.02.014-.028.023-.016.014-.028.033-.035.055l-.003 3.614.003 2.96c.008.085.06.16.132.2.042.023.09.037.14.037.04 0 .078-.01.113-.027.073-.038.124-.113.133-.2l.004-2.96-.004-3.614c-.009-.085-.06-.16-.133-.2-.033-.016-.07-.027-.11-.027-.017 0-.038 0-.055.002 0 0 0 0 0 0m3.615-2.13c-.27 0-.526.05-.764.14-.158-1.76-1.655-3.14-3.477-3.14-.474 0-.932.097-1.352.27-.166.068-.21.136-.213.27v8.72c.003.142.115.262.258.272h5.548c1.353 0 2.453-1.11 2.453-2.474 0-1.363-1.1-2.473-2.453-2.473" />
                      </svg>
                    ),
                  },
                  {
                    name: "TikTok",
                    icon: (
                      <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                      </svg>
                    ),
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    aria-label={social.name}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] text-white/30 transition-all duration-300 hover:border-purple-500/25 hover:bg-purple-500/10 hover:text-purple-400"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-white/[0.04] via-white/[0.06] to-transparent" />

            {/* Quote */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
              <svg className="mb-3 h-5 w-5 text-purple-500/40" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
              </svg>
              <p className="text-[14px] leading-relaxed text-white/30 italic">
                We don&apos;t just plan events — we engineer experiences that people remember
                forever.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-px w-6 bg-purple-500/30" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-400/50">
                  STM Events Team
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-24 flex flex-col items-center gap-5 text-center md:mt-28"
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
          <p className="text-[11px] tracking-[0.25em] text-white/20 uppercase">
            STM Events &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
