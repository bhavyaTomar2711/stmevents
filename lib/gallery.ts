import { createPublicSupabase } from "@/lib/supabase/server";
import type { DbGalleryItem } from "@/lib/supabase/types";
import type { GalleryItem, GalleryCategory } from "@/lib/gallery-shared";

// Re-export types and constants from shared file (safe for client components)
export type { GalleryItem, GalleryCategory } from "@/lib/gallery-shared";
export { CATEGORY_LABELS } from "@/lib/gallery-shared";

// ─── Transform ─────────────────────────────────────────────────────

function transformGalleryItem(row: DbGalleryItem): GalleryItem {
  return {
    id: row.id,
    title: row.title,
    title_de: row.title_de || "",
    mediaType: row.media_type || "image",
    imageUrl: row.image_url || null,
    videoUrl: row.video_url || null,
    thumbnailUrl: row.thumbnail_url || null,
    category: row.category || null,
    description: row.description || null,
    description_de: row.description_de || "",
    featured: row.featured || false,
    date: row.date || null,
    relatedEvent: null,
  };
}

// ─── Public API ────────────────────────────────────────────────────

export async function getAllGalleryItems(): Promise<GalleryItem[]> {
  try {
    const supabase = await createPublicSupabase();
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .eq("published", true)
      .order("date", { ascending: false });
    if (error || !data) return [];
    return data.map(transformGalleryItem);
  } catch {
    return [];
  }
}

export async function getGalleryByCategory(category: GalleryCategory): Promise<GalleryItem[]> {
  try {
    const supabase = await createPublicSupabase();
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .eq("published", true)
      .eq("category", category)
      .order("date", { ascending: false });
    if (error || !data) return [];
    return data.map(transformGalleryItem);
  } catch {
    return [];
  }
}

export async function getGalleryByEvent(eventId: string): Promise<GalleryItem[]> {
  try {
    const supabase = await createPublicSupabase();
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .eq("published", true)
      .eq("related_event_id", eventId);
    if (error || !data) return [];
    return data.map(transformGalleryItem);
  } catch {
    return [];
  }
}

export async function getFeaturedGallery(count = 6): Promise<GalleryItem[]> {
  try {
    const supabase = await createPublicSupabase();
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .eq("published", true)
      .eq("featured", true)
      .order("date", { ascending: false })
      .limit(count);
    if (error || !data) return [];
    return data.map(transformGalleryItem);
  } catch {
    return [];
  }
}
