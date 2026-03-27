"use client";

import { useState } from "react";

interface TranslateButtonProps {
  sourceText: string;
  onTranslated: (text: string) => void;
  from?: "de" | "en";
  to?: "de" | "en";
  label?: string;
}

export default function TranslateButton({
  sourceText,
  onTranslated,
  from = "de",
  to = "en",
  label,
}: TranslateButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: sourceText, from, to }),
      });
      const data = await res.json();
      if (data.translated) onTranslated(data.translated);
    } catch {
      // silent fail
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleTranslate}
      disabled={loading || !sourceText.trim()}
      className="inline-flex items-center gap-1.5 rounded-lg border border-purple-500/20 bg-purple-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-purple-400 transition-all hover:bg-purple-500/20 disabled:opacity-40"
      title={`Translate from ${from.toUpperCase()} to ${to.toUpperCase()}`}
    >
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
      </svg>
      {loading ? "Translating..." : label || `DE → EN`}
    </button>
  );
}
