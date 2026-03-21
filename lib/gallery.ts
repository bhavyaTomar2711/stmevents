import { getClient } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import {
  allGalleryQuery,
  galleryByCategoryQuery,
  galleryByEventQuery,
  featuredGalleryQuery,
} from "@/sanity/queries";

// ─── Types ─────────────────────────────────────────────────────────

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
  relatedEvent: {
    title: string;
    slug: string;
  } | null;
}

export type GalleryCategory =
  | "event"
  | "aftermovie"
  | "djset"
  | "bts"
  | "promo";

export const CATEGORY_LABELS: Record<string, string> = {
  event: "Event Photos",
  aftermovie: "Aftermovies",
  djset: "DJ Sets",
  bts: "Behind the Scenes",
  promo: "Promo / Trailers",
};

// ─── Transform ─────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformGalleryItem(doc: any): GalleryItem {
  return {
    id: doc._id,
    title: doc.title,
    mediaType: doc.mediaType || "image",
    imageUrl: doc.image
      ? urlFor(doc.image).width(1200).height(800).url()
      : null,
    videoUrl: doc.videoUrl || null,
    thumbnailUrl: doc.thumbnail
      ? urlFor(doc.thumbnail).width(800).height(450).url()
      : null,
    category: doc.category || null,
    description: doc.description || null,
    featured: doc.featured || false,
    date: doc.date || null,
    relatedEvent: doc.relatedEvent
      ? { title: doc.relatedEvent.title, slug: doc.relatedEvent.slug }
      : null,
  };
}

// ─── Mock data ─────────────────────────────────────────────────────

const mockGallery: GalleryItem[] = [
  {
    id: "mock-1",
    title: "Warehouse 23 Crowd",
    mediaType: "image",
    imageUrl: "/pexels-aleksmagnusson-30968497.jpg",
    videoUrl: null,
    thumbnailUrl: null,
    category: "event",
    description: "Raw energy captured at Warehouse 23 during Techno Night Berlin. The crowd lost in sound.",
    featured: true,
    date: "2026-05-15",
    relatedEvent: { title: "Techno Night Berlin", slug: "techno-night-berlin" },
  },
  {
    id: "mock-2",
    title: "Club Void Atmosphere",
    mediaType: "image",
    imageUrl: "/pexels-caleboquendo-34611985.jpg",
    videoUrl: null,
    thumbnailUrl: null,
    category: "event",
    description: "The atmosphere inside Club Void — smoke, lasers, and pure underground energy.",
    featured: true,
    date: "2026-06-07",
    relatedEvent: { title: "Underground Sessions", slug: "underground-sessions" },
  },
  {
    id: "mock-3",
    title: "STM Events Aftermovie",
    mediaType: "video",
    imageUrl: null,
    videoUrl: "/video/4043988-hd_1920_1080_24fps.mp4",
    thumbnailUrl: "/pexels-edotommo99-2034851.jpg",
    category: "aftermovie",
    description: "Relive the night. The official aftermovie from Neon Rave at the Bunker.",
    featured: true,
    date: "2026-07-19",
    relatedEvent: { title: "Neon Rave", slug: "neon-rave" },
  },
  {
    id: "mock-4",
    title: "DJ Booth Setup",
    mediaType: "image",
    imageUrl: "/pexels-paggiarofrancesco-2111015.jpg",
    videoUrl: null,
    thumbnailUrl: null,
    category: "bts",
    description: "Behind the scenes — setting up the DJ booth before doors open.",
    featured: true,
    date: "2026-08-02",
    relatedEvent: null,
  },
  {
    id: "mock-5",
    title: "Bunker Light Show",
    mediaType: "image",
    imageUrl: "/pexels-edotommo99-2034851.jpg",
    videoUrl: null,
    thumbnailUrl: null,
    category: "event",
    description: "The Bunker's legendary light show in full effect during Neon Rave.",
    featured: false,
    date: "2026-07-19",
    relatedEvent: { title: "Neon Rave", slug: "neon-rave" },
  },
];

// ─── Public API ────────────────────────────────────────────────────

export async function getAllGalleryItems(): Promise<GalleryItem[]> {
  const sanity = getClient();
  if (!sanity) return mockGallery;
  try {
    const docs = await sanity.fetch(allGalleryQuery);
    const cmsItems: GalleryItem[] = docs.map(transformGalleryItem);
    // Merge CMS items first, then pad with mock items
    const cmsIdSet = new Set(cmsItems.map((i) => i.id));
    const padding = mockGallery.filter((m) => !cmsIdSet.has(m.id));
    return [...cmsItems, ...padding];
  } catch {
    return mockGallery;
  }
}

export async function getGalleryByCategory(
  category: GalleryCategory,
): Promise<GalleryItem[]> {
  const sanity = getClient();
  if (!sanity) return mockGallery.filter((g) => g.category === category);
  try {
    const docs = await sanity.fetch(galleryByCategoryQuery, { category });
    const items = docs.map(transformGalleryItem);
    return items.length > 0
      ? items
      : mockGallery.filter((g) => g.category === category);
  } catch {
    return mockGallery.filter((g) => g.category === category);
  }
}

export async function getGalleryByEvent(
  eventId: string,
): Promise<GalleryItem[]> {
  const sanity = getClient();
  if (!sanity) return [];
  try {
    const docs = await sanity.fetch(galleryByEventQuery, { eventId });
    return docs.map(transformGalleryItem);
  } catch {
    return [];
  }
}

export async function getFeaturedGallery(
  count = 6,
): Promise<GalleryItem[]> {
  const mockFeatured = mockGallery.filter((g) => g.featured);
  const sanity = getClient();
  if (!sanity) return mockFeatured.slice(0, count);
  try {
    const docs = await sanity.fetch(featuredGalleryQuery, { count });
    const cmsItems: GalleryItem[] = docs.map(transformGalleryItem);
    // Pad with mock items if CMS has fewer than needed
    if (cmsItems.length < count) {
      const cmsIdSet = new Set(cmsItems.map((i) => i.id));
      const padding = mockFeatured
        .filter((m) => !cmsIdSet.has(m.id))
        .slice(0, count - cmsItems.length);
      return [...cmsItems, ...padding];
    }
    return cmsItems;
  } catch {
    return mockFeatured.slice(0, count);
  }
}
