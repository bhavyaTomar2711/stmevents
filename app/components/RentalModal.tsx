"use client";

import { useState, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import DatePickerField from "./DatePickerField";

interface RentalModalProps {
  isOpen: boolean;
  onClose: () => void;
  equipmentName: string;
}

export default function RentalModal({ isOpen, onClose, equipmentName }: RentalModalProps) {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    rentalDate: "",
    duration: "",
    location: "",
    requirements: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/rental-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, equipmentName }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");

      setTimeout(() => {
        onClose();
        setStatus("idle");
        setForm({ name: "", email: "", phone: "", rentalDate: "", duration: "", location: "", requirements: "" });
      }, 2500);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const inputClass =
    "w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-purple-500/40 focus:bg-purple-500/[0.03]";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mx-4 w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/95 shadow-2xl shadow-purple-500/5 backdrop-blur-2xl">
              {/* Header */}
              <div className="relative border-b border-white/[0.06] px-7 py-6">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-purple-400">
                  {t("rental.label")}
                </span>
                <h2 className="mt-1.5 text-xl font-bold tracking-tight text-white">
                  {equipmentName}
                </h2>

                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/40 transition-all hover:border-white/20 hover:text-white"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Success State */}
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center px-7 py-16"
                  >
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10">
                      <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-lg font-semibold text-white">{t("rental.successTitle")}</p>
                    <p className="mt-2 text-sm text-white/40">{t("rental.successMessage")}</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5 px-7 py-6"
                  >
                    {/* Name */}
                    <div>
                      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                        {t("rental.name")} <span className="text-purple-400">*</span>
                      </label>
                      <input type="text" required value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder={t("rental.namePlaceholder")} className={inputClass} />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                        {t("rental.email")} <span className="text-purple-400">*</span>
                      </label>
                      <input type="email" required value={form.email} onChange={(e) => updateField("email", e.target.value)} placeholder={t("rental.emailPlaceholder")} className={inputClass} />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                        {t("rental.phone")}
                      </label>
                      <input type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder={t("rental.phonePlaceholder")} className={inputClass} />
                    </div>

                    {/* Rental Date & Duration — side by side */}
                    <div className="grid grid-cols-2 gap-4">
                      <DatePickerField
                        label={t("rental.date")}
                        value={form.rentalDate}
                        onChange={(v) => updateField("rentalDate", v)}
                      />
                      <div>
                        <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                          {t("rental.duration")}
                        </label>
                        <input type="text" value={form.duration} onChange={(e) => updateField("duration", e.target.value)} placeholder={t("rental.durationPlaceholder")} className={inputClass} />
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                        {t("rental.location")}
                      </label>
                      <input type="text" value={form.location} onChange={(e) => updateField("location", e.target.value)} placeholder={t("rental.locationPlaceholder")} className={inputClass} />
                    </div>

                    {/* Additional Requirements */}
                    <div>
                      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                        {t("rental.requirements")}
                      </label>
                      <textarea rows={3} value={form.requirements} onChange={(e) => updateField("requirements", e.target.value)} placeholder={t("rental.requirementsPlaceholder")} className={`${inputClass} resize-none`} />
                    </div>

                    {/* Error */}
                    {status === "error" && (
                      <p className="text-sm text-red-400">{t("rental.error")}</p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-400 hover:shadow-[0_0_35px_rgba(124,58,237,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {status === "loading" ? (
                          <>
                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            {t("rental.sending")}
                          </>
                        ) : (
                          t("rental.submit")
                        )}
                      </span>
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 transition-transform duration-700 group-hover:translate-x-full" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
