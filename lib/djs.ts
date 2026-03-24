import { createServerSupabase } from "@/lib/supabase/server";
import type { DbDJ } from "@/lib/supabase/types";

// ─── Types ─────────────────────────────────────────────────────────

export interface DJData {
  id: string;
  name: string;
  slug: string;
  photo: string;
  logo: string | null;
  genre: string;
  bio: string | null;
  instagramUrl: string | null;
  soundcloudUrl: string | null;
  resident: boolean;
  order: number;
}

// ─── Transform ─────────────────────────────────────────────────────

function transformDJ(row: DbDJ): DJData {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    photo: row.photo_url || "",
    logo: row.logo_url || null,
    genre: row.genre || "Techno",
    bio: row.bio || null,
    instagramUrl: row.instagram_url || null,
    soundcloudUrl: row.soundcloud_url || null,
    resident: row.resident || false,
    order: row.display_order || 0,
  };
}

// ─── Public API ────────────────────────────────────────────────────

export async function getAllDJs(): Promise<DJData[]> {
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("djs")
      .select("*")
      .eq("published", true)
      .order("display_order", { ascending: true });
    if (error || !data) return [];
    return data.map(transformDJ);
  } catch {
    return [];
  }
}

export async function getResidentDJs(): Promise<DJData[]> {
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("djs")
      .select("*")
      .eq("published", true)
      .eq("resident", true)
      .order("display_order", { ascending: true });
    if (error || !data) return [];
    return data.map(transformDJ);
  } catch {
    return [];
  }
}

export async function getDJSlugs(): Promise<string[]> {
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("djs")
      .select("slug")
      .eq("published", true);
    if (error || !data) return [];
    return data.map((d) => d.slug);
  } catch {
    return [];
  }
}

export async function getDJBySlug(slug: string): Promise<DJData | null> {
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("djs")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();
    if (error || !data) return null;
    return transformDJ(data);
  } catch {
    return null;
  }
}
