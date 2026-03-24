// Shared types and constants for gallery — safe to import from client components

export interface GalleryItem {
  id: string;
  title: string;
  mediaType: "image" | "video";
  imageUrl: string | null;
  videoUrl: string | null;
  thumbnailUrl: string | null;
  category: string | null;
  description: string | null;
  featured: boolean;
  date: string | null;
  relatedEvent: { title: string; slug: string } | null;
}

export type GalleryCategory = "event" | "aftermovie" | "djset" | "bts" | "promo";

export const CATEGORY_LABELS: Record<string, string> = {
  event: "Event Photos",
  aftermovie: "Aftermovies",
  djset: "DJ Sets",
  bts: "Behind the Scenes",
  promo: "Promo / Trailers",
};
