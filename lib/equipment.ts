import { createPublicSupabase } from "@/lib/supabase/server";
import type { DbEquipment } from "@/lib/supabase/types";

// ─── Types ─────────────────────────────────────────────────────────

export interface EquipmentSpec {
  label: string;
  value: string;
}

export interface EquipmentData {
  id: string;
  name: string;
  slug: string;
  images: string[];
  price: string;
  pricePer: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  categoryLabel: string;
  available: boolean;
  featured: boolean;
  specs: EquipmentSpec[];
  order: number;
}

const CATEGORY_LABELS: Record<string, string> = {
  "dj-gear": "DJ Gear",
  sound: "Sound System",
  lighting: "Lighting",
  stage: "Stage & Rigging",
  effects: "Effects",
};

// ─── Transform ─────────────────────────────────────────────────────

function transformEquipment(row: DbEquipment): EquipmentData {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    images: row.images?.length > 0 ? row.images : [],
    price: row.price || "€0",
    pricePer: row.price_per || "/ day",
    shortDescription: row.short_description || "",
    fullDescription: row.full_description || row.short_description || "",
    category: row.category || "dj-gear",
    categoryLabel: CATEGORY_LABELS[row.category] || row.category_label || "Equipment",
    available: row.available !== false,
    featured: row.featured || false,
    specs: row.specs || [],
    order: row.display_order || 0,
  };
}

// ─── Public API ────────────────────────────────────────────────────

export async function getAllEquipment(): Promise<EquipmentData[]> {
  try {
    const supabase = await createPublicSupabase();
    const { data, error } = await supabase
      .from("equipment")
      .select("*")
      .eq("published", true)
      .order("display_order", { ascending: true });
    if (error || !data) return [];
    return data.map(transformEquipment);
  } catch {
    return [];
  }
}

export async function getFeaturedEquipment(count = 6): Promise<EquipmentData[]> {
  try {
    const supabase = await createPublicSupabase();
    const { data, error } = await supabase
      .from("equipment")
      .select("*")
      .eq("published", true)
      .eq("featured", true)
      .order("display_order", { ascending: true })
      .limit(count);
    if (error || !data) return [];
    return data.map(transformEquipment);
  } catch {
    return [];
  }
}

export async function getEquipmentBySlug(slug: string): Promise<EquipmentData | null> {
  try {
    const supabase = await createPublicSupabase();
    const { data, error } = await supabase
      .from("equipment")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();
    if (error || !data) return null;
    return transformEquipment(data);
  } catch {
    return null;
  }
}

export async function getEquipmentSlugs(): Promise<string[]> {
  try {
    const supabase = await createPublicSupabase();
    const { data, error } = await supabase
      .from("equipment")
      .select("slug")
      .eq("published", true);
    if (error || !data) return [];
    return data.map((d) => d.slug);
  } catch {
    return [];
  }
}
