"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ProfilePage() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", bio: "" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();

      setForm({
        full_name: profile?.full_name || user.user_metadata?.full_name || "",
        email: user.email || "",
        phone: profile?.phone || "",
        bio: profile?.bio || "",
      });
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("profiles").upsert({
      id: user.id,
      email: form.email,
      full_name: form.full_name,
      phone: form.phone,
      bio: form.bio,
    });

    await supabase.auth.updateUser({
      data: { full_name: form.full_name },
    });

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-500/30 border-t-purple-500" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">{t("account.profile.title")}</h1>
        <p className="mt-1 text-sm text-white/40">{t("account.profile.subtitle")}</p>
      </div>

      {/* Avatar section */}
      <div className="mb-6 flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 text-2xl font-bold text-white shadow-lg shadow-purple-500/20">
          {form.full_name?.[0]?.toUpperCase() || form.email?.[0]?.toUpperCase() || "U"}
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">{form.full_name || t("account.profile.yourName")}</h3>
          <p className="text-[12px] text-white/35">{form.email}</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-5 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 sm:p-7">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-purple-400">{t("account.profile.fullName")}</label>
            <input
              type="text"
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all focus:border-purple-500/40 focus:bg-white/[0.06]"
              placeholder={t("account.login.namePlaceholder")}
            />
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30">{t("contact.email")}</label>
            <input
              type="email"
              value={form.email}
              disabled
              className="w-full rounded-xl border border-white/[0.04] bg-white/[0.02] px-4 py-3 text-sm text-white/30 outline-none"
            />
            <p className="mt-1.5 text-[11px] text-white/25">{t("account.profile.emailNote")}</p>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-purple-400">{t("account.profile.phone")}</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all focus:border-purple-500/40 focus:bg-white/[0.06]"
            placeholder="+49 123 456 789"
          />
        </div>

        <div>
          <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-purple-400">{t("account.profile.bio")}</label>
          <textarea
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            rows={3}
            className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all focus:border-purple-500/40 focus:bg-white/[0.06]"
            placeholder={t("account.profile.bioPlaceholder")}
          />
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 px-8 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-purple-500/20 transition-all hover:shadow-purple-500/30 disabled:opacity-50"
          >
            {saving ? t("account.profile.saving") : t("account.profile.saveChanges")}
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-[12px] font-medium text-emerald-400">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {t("account.profile.saved")}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
