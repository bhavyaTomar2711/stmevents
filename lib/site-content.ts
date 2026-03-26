import { createServerSupabase } from "@/lib/supabase/server";

export interface SiteContentRow {
  section_id: string;
  field_key: string;
  value_en: string;
  value_de: string;
}

export type SiteContentMap = Record<string, Record<string, { en: string; de: string }>>;

export async function getSiteContent(): Promise<SiteContentMap> {
  try {
    const supabase = await createServerSupabase();
    const { data } = await supabase.from("site_content").select("section_id, field_key, value_en, value_de");
    if (!data) return {};

    const map: SiteContentMap = {};
    for (const row of data as SiteContentRow[]) {
      if (!map[row.section_id]) map[row.section_id] = {};
      map[row.section_id][row.field_key] = { en: row.value_en, de: row.value_de };
    }
    return map;
  } catch {
    return {};
  }
}
