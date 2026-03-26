"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { sections, type SectionConfig } from "./sections";
import translations from "@/lib/i18n/translations";
import type { TranslationKey } from "@/lib/i18n/translations";

type Device = "desktop" | "tablet" | "mobile";

interface FieldValues {
  [fieldKey: string]: { en: string; de: string };
}

const deviceWidths = { desktop: "100%", tablet: "768px", mobile: "375px" };

export default function VisualEditorClient() {
  const [activeSection, setActiveSection] = useState<SectionConfig>(sections[0]);
  const [device, setDevice] = useState<Device>("desktop");
  const [fields, setFields] = useState<FieldValues>({});
  const [saving, setSaving] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Load saved values for active section
  const loadSection = useCallback(async (section: SectionConfig) => {
    try {
      const res = await fetch(`/api/site-content?section=${section.sectionId}`);
      const { data } = await res.json();

      const vals: FieldValues = {};
      for (const field of section.fields) {
        const saved = data?.find((r: { field_key: string }) => r.field_key === field.key);
        const defaultEn = translations[field.translationKey as TranslationKey]?.en || "";
        const defaultDe = translations[field.translationKey as TranslationKey]?.de || "";
        vals[field.key] = {
          en: saved?.value_en || defaultEn,
          de: saved?.value_de || defaultDe,
        };
      }
      setFields(vals);
      setHasChanges(false);
    } catch {
      // fallback to defaults
      const vals: FieldValues = {};
      for (const field of section.fields) {
        vals[field.key] = {
          en: translations[field.translationKey as TranslationKey]?.en || "",
          de: translations[field.translationKey as TranslationKey]?.de || "",
        };
      }
      setFields(vals);
    }
  }, []);

  useEffect(() => {
    loadSection(activeSection);
  }, [activeSection, loadSection]);

  // Scroll iframe to section
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const handleLoad = () => {
      iframe.contentWindow?.postMessage(
        { type: "scrollToSection", anchor: activeSection.anchorId },
        "*"
      );
    };
    iframe.addEventListener("load", handleLoad);
    // Also send immediately if already loaded
    try {
      iframe.contentWindow?.postMessage(
        { type: "scrollToSection", anchor: activeSection.anchorId },
        "*"
      );
    } catch { /* cross-origin before load */ }
    return () => iframe.removeEventListener("load", handleLoad);
  }, [activeSection]);

  const updateField = (key: string, locale: "en" | "de", value: string) => {
    const updated = { ...fields[key], [locale]: value };
    setFields((prev) => ({
      ...prev,
      [key]: updated,
    }));
    setHasChanges(true);
    setMessage(null);

    // Send live preview to iframe
    try {
      iframeRef.current?.contentWindow?.postMessage(
        {
          type: "livePreviewUpdate",
          section_id: activeSection.sectionId,
          field_key: key,
          value_en: locale === "en" ? value : (fields[key]?.en || ""),
          value_de: locale === "de" ? value : (fields[key]?.de || ""),
        },
        "*"
      );
    } catch { /* iframe not ready */ }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const promises = Object.entries(fields).map(([key, val]) =>
        fetch("/api/site-content", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            section_id: activeSection.sectionId,
            field_key: key,
            value_en: val.en,
            value_de: val.de,
          }),
        })
      );
      await Promise.all(promises);
      setMessage({ type: "success", text: "Changes saved! Preview will refresh." });
      setHasChanges(false);
      // Reload iframe to show changes
      setTimeout(() => {
        iframeRef.current?.contentWindow?.location.reload();
      }, 500);
    } catch {
      setMessage({ type: "error", text: "Failed to save. Try again." });
    } finally {
      setSaving(false);
    }
  };

  const handleRestore = async () => {
    if (!confirm(`Restore "${activeSection.label}" to defaults? This will remove all your edits for this section.`)) return;
    setRestoring(true);
    setMessage(null);
    try {
      await fetch(`/api/site-content?section=${activeSection.sectionId}`, { method: "DELETE" });
      // Reset to defaults
      const vals: FieldValues = {};
      for (const field of activeSection.fields) {
        vals[field.key] = {
          en: translations[field.translationKey as TranslationKey]?.en || "",
          de: translations[field.translationKey as TranslationKey]?.de || "",
        };
      }
      setFields(vals);
      setHasChanges(false);
      setMessage({ type: "success", text: "Restored to defaults! Preview will refresh." });
      setTimeout(() => {
        iframeRef.current?.contentWindow?.location.reload();
      }, 500);
    } catch {
      setMessage({ type: "error", text: "Failed to restore. Try again." });
    } finally {
      setRestoring(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-0px)] flex-col bg-[#08080e]">
      {/* Top Bar */}
      <div className="flex flex-shrink-0 items-center justify-between border-b border-white/[0.06] bg-[#0c0c14]/80 px-4 py-3 backdrop-blur-xl">
        {/* Left: Section dropdown */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 ring-1 ring-violet-500/20">
            <svg className="h-4 w-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <select
            value={activeSection.sectionId}
            onChange={(e) => {
              const s = sections.find((s) => s.sectionId === e.target.value);
              if (s) setActiveSection(s);
            }}
            className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm font-medium text-white outline-none transition-colors focus:border-violet-500/40"
          >
            {sections.map((s) => (
              <option key={s.sectionId} value={s.sectionId} className="bg-[#0c0c14] text-white">
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Center: Device Switcher */}
        <div className="flex items-center gap-1 rounded-lg border border-white/[0.06] bg-white/[0.02] p-1">
          {(["desktop", "tablet", "mobile"] as Device[]).map((d) => (
            <button
              key={d}
              onClick={() => setDevice(d)}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-all ${
                device === d
                  ? "bg-violet-500/15 text-violet-400 shadow-sm"
                  : "text-white/35 hover:text-white/60"
              }`}
            >
              {d === "desktop" && (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
                </svg>
              )}
              {d === "tablet" && (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5h3M6.75 3h10.5a2.25 2.25 0 012.25 2.25v13.5a2.25 2.25 0 01-2.25 2.25H6.75a2.25 2.25 0 01-2.25-2.25V5.25A2.25 2.25 0 016.75 3z" />
                </svg>
              )}
              {d === "mobile" && (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
              )}
              {d}
            </button>
          ))}
        </div>

        {/* Right: Save / Restore */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRestore}
            disabled={restoring}
            className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[11px] font-medium uppercase tracking-wider text-white/40 transition-all hover:border-amber-500/30 hover:text-amber-400 disabled:opacity-50"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
            </svg>
            {restoring ? "Restoring..." : "Restore Default"}
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !hasChanges}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white transition-all disabled:opacity-40 ${
              hasChanges
                ? "bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg shadow-violet-500/20 hover:shadow-[0_0_25px_rgba(124,58,237,0.3)]"
                : "bg-white/[0.06]"
            }`}
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            {saving ? "Saving..." : "Publish Changes"}
          </button>
        </div>
      </div>

      {/* Message bar */}
      {message && (
        <div className={`flex items-center justify-center gap-2 py-2 text-[12px] font-medium ${
          message.type === "success"
            ? "bg-emerald-500/10 text-emerald-400"
            : "bg-red-500/10 text-red-400"
        }`}>
          {message.type === "success" ? (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          )}
          {message.text}
        </div>
      )}

      {/* Main: Preview + Fields Panel */}
      <div className="flex flex-1 overflow-hidden">
        {/* Preview */}
        <div className="flex flex-1 items-start justify-center overflow-auto bg-[#060609] p-4">
          <div
            className={`overflow-hidden rounded-xl border border-white/[0.06] shadow-2xl shadow-black/50 transition-all duration-500 ${
              device !== "desktop" ? "h-[85vh]" : "h-full w-full"
            }`}
            style={{
              width: device === "desktop" ? "100%" : deviceWidths[device],
              maxWidth: "100%",
            }}
          >
            <iframe
              ref={iframeRef}
              src="/?preview=true"
              className="h-full w-full border-0 bg-black"
              title="Site Preview"
            />
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex w-[380px] flex-shrink-0 flex-col border-l border-white/[0.06] bg-[#0a0a12]">
          {/* Panel Header */}
          <div className="border-b border-white/[0.06] px-5 py-4">
            <h2 className="text-sm font-bold text-white">{activeSection.label}</h2>
            <p className="mt-1 text-[11px] text-white/30">Edit the text content for this section</p>
          </div>

          {/* Fields */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <div className="space-y-6">
              {activeSection.fields.map((field) => (
                <div key={field.key} className="group">
                  <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">
                    {field.label}
                  </label>

                  {/* EN */}
                  <div className="mb-2">
                    <div className="mb-1 flex items-center gap-1.5">
                      <span className="rounded bg-violet-500/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-violet-400">EN</span>
                    </div>
                    {field.type === "textarea" ? (
                      <textarea
                        value={fields[field.key]?.en || ""}
                        onChange={(e) => updateField(field.key, "en", e.target.value)}
                        rows={3}
                        className="w-full resize-none rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2.5 text-[13px] text-white/80 outline-none transition-all focus:border-violet-500/30 focus:bg-white/[0.05]"
                      />
                    ) : (
                      <input
                        type="text"
                        value={fields[field.key]?.en || ""}
                        onChange={(e) => updateField(field.key, "en", e.target.value)}
                        className="w-full rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2.5 text-[13px] text-white/80 outline-none transition-all focus:border-violet-500/30 focus:bg-white/[0.05]"
                      />
                    )}
                  </div>

                  {/* DE */}
                  <div>
                    <div className="mb-1 flex items-center gap-1.5">
                      <span className="rounded bg-amber-500/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-400">DE</span>
                    </div>
                    {field.type === "textarea" ? (
                      <textarea
                        value={fields[field.key]?.de || ""}
                        onChange={(e) => updateField(field.key, "de", e.target.value)}
                        rows={3}
                        className="w-full resize-none rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2.5 text-[13px] text-white/80 outline-none transition-all focus:border-amber-500/30 focus:bg-white/[0.05]"
                      />
                    ) : (
                      <input
                        type="text"
                        value={fields[field.key]?.de || ""}
                        onChange={(e) => updateField(field.key, "de", e.target.value)}
                        className="w-full rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2.5 text-[13px] text-white/80 outline-none transition-all focus:border-amber-500/30 focus:bg-white/[0.05]"
                      />
                    )}
                  </div>

                  {/* Divider */}
                  <div className="mt-5 h-px bg-white/[0.04]" />
                </div>
              ))}
            </div>
          </div>

          {/* Panel Footer */}
          <div className="border-t border-white/[0.06] px-5 py-4">
            <div className="flex gap-2">
              <button
                onClick={handleRestore}
                disabled={restoring}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/[0.08] py-2.5 text-[11px] font-medium uppercase tracking-wider text-white/40 transition-all hover:border-amber-500/30 hover:text-amber-400 disabled:opacity-50"
              >
                {restoring ? "..." : "Restore Default"}
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !hasChanges}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2.5 text-[11px] font-bold uppercase tracking-wider text-white transition-all disabled:opacity-40 ${
                  hasChanges
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                    : "bg-white/[0.06]"
                }`}
              >
                {saving ? "Saving..." : "Publish"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
