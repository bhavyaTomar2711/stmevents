"use client";

import { createContext, useContext, useCallback, useState, useEffect, type ReactNode } from "react";
import type { SiteContentMap } from "@/lib/site-content";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { TranslationKey } from "@/lib/i18n/translations";

interface SiteContentContextValue {
  data: SiteContentMap;
  tc: (sectionId: string, fieldKey: string, fallbackKey: TranslationKey) => string;
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export function SiteContentProvider({
  children,
  initialData,
}: {
  children: ReactNode;
  initialData: SiteContentMap;
}) {
  const { locale, t } = useLanguage();
  const [liveData, setLiveData] = useState<SiteContentMap>(initialData);

  // Listen for live preview updates from the visual editor iframe parent
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === "livePreviewUpdate") {
        const { section_id, field_key, value_en, value_de } = event.data;
        setLiveData((prev) => ({
          ...prev,
          [section_id]: {
            ...prev[section_id],
            [field_key]: { en: value_en, de: value_de },
          },
        }));
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const tc = useCallback(
    (sectionId: string, fieldKey: string, fallbackKey: TranslationKey): string => {
      const override = liveData[sectionId]?.[fieldKey];
      if (override) {
        const val = locale === "de" ? override.de : override.en;
        if (val && val.trim() !== "") return val;
      }
      return t(fallbackKey);
    },
    [liveData, locale, t]
  );

  return (
    <SiteContentContext.Provider value={{ data: liveData, tc }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error("useSiteContent must be used within SiteContentProvider");
  }
  return context;
}
