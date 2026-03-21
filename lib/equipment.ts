import { getClient } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import {
  allEquipmentQuery,
  featuredEquipmentQuery,
  equipmentBySlugQuery,
  equipmentSlugsQuery,
} from "@/sanity/queries";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformEquipment(doc: any): EquipmentData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const images = (doc.images || []).map((img: any) =>
    urlFor(img).width(800).height(600).url()
  );

  return {
    id: doc._id,
    name: doc.name,
    slug: doc.slug,
    images: images.length > 0 ? images : ["/1.png"],
    price: doc.price || "€0",
    pricePer: doc.pricePer || "/ day",
    shortDescription: doc.shortDescription || "",
    fullDescription: doc.fullDescription || doc.shortDescription || "",
    category: doc.category || "dj-gear",
    categoryLabel: CATEGORY_LABELS[doc.category] || doc.category || "Equipment",
    available: doc.available !== false,
    featured: doc.featured || false,
    specs: doc.specs || [],
    order: doc.order || 0,
  };
}

// ─── Mock data ─────────────────────────────────────────────────────

const mockEquipment: EquipmentData[] = [
  {
    id: "mock-eq-1",
    name: "Pioneer CDJ-3000",
    slug: "pioneer-cdj-3000",
    images: ["/1.png"],
    price: "€120",
    pricePer: "/ day",
    shortDescription:
      "Industry-standard media player with a 9-inch touchscreen, advanced playback features, and studio-grade audio quality.",
    fullDescription:
      "Industry-standard media player with a 9-inch touchscreen, advanced playback features, and studio-grade audio quality. The CDJ-3000 features MPU processing for stable, high-quality audio playback, a redesigned jog wheel with improved latency, and an intuitive 9-inch HD touchscreen for seamless browsing and track selection.",
    category: "dj-gear",
    categoryLabel: "DJ Gear",
    available: true,
    featured: true,
    specs: [
      { label: "Display", value: '9" HD Touchscreen' },
      { label: "Audio Output", value: "32-bit D/A" },
      { label: "Formats", value: "MP3, AAC, WAV, FLAC, AIFF" },
      { label: "USB", value: "2x USB 3.0" },
    ],
    order: 1,
  },
  {
    id: "mock-eq-2",
    name: "Allen & Heath Xone:96",
    slug: "allen-heath-xone-96",
    images: ["/2.png"],
    price: "€95",
    pricePer: "/ day",
    shortDescription:
      "Premium analogue DJ mixer with dual soundcards, crunch drive, and unmatched warm sound character.",
    fullDescription:
      "Premium analogue DJ mixer with dual soundcards, crunch drive, and unmatched warm sound character. The Xone:96 features 2 USB soundcards for seamless DJ changeovers, an innovative Crunch drive for adding harmonic distortion, and high-quality Innofader-ready crossfader.",
    category: "dj-gear",
    categoryLabel: "DJ Gear",
    available: true,
    featured: true,
    specs: [
      { label: "Channels", value: "6+2" },
      { label: "Soundcards", value: "2x USB" },
      { label: "Filters", value: "Dual VCF" },
      { label: "Effects", value: "Crunch Drive" },
    ],
    order: 2,
  },
  {
    id: "mock-eq-3",
    name: "QSC KLA Series",
    slug: "qsc-kla-series",
    images: ["/3.png"],
    price: "€350",
    pricePer: "/ day",
    shortDescription:
      "Active line array system delivering crystal-clear audio up to 2000+ capacity venues with deep, controlled bass.",
    fullDescription:
      "Active line array system delivering crystal-clear audio up to 2000+ capacity venues with deep, controlled bass. QSC's KLA Series is a professional-grade portable line array with DEEP processing for extended bass response and DMT (Directivity Matched Transition) for consistent coverage.",
    category: "sound",
    categoryLabel: "Sound System",
    available: true,
    featured: true,
    specs: [
      { label: "SPL", value: "131 dB peak" },
      { label: "Coverage", value: "105° x 15°" },
      { label: "Amplifier", value: '2x 500W Class D' },
      { label: "Weight", value: "18.6 kg" },
    ],
    order: 3,
  },
  {
    id: "mock-eq-4",
    name: "Martin MAC Aura XB",
    slug: "martin-mac-aura-xb",
    images: ["/4.png"],
    price: "€80",
    pricePer: "/ day",
    shortDescription:
      "Compact LED wash light with an innovative backlight system for stunning colour mixing and beam effects.",
    fullDescription:
      "Compact LED wash light with an innovative backlight system for stunning colour mixing and beam effects. The MAC Aura XB features an ultra-wide 11°-58° zoom range, Aura backlight effect with 7 individually controlled zones, and a full RGB+Lime LED engine for vibrant colour rendering.",
    category: "lighting",
    categoryLabel: "Lighting",
    available: true,
    featured: true,
    specs: [
      { label: "Source", value: "19x 30W RGBL" },
      { label: "Zoom", value: "11° - 58°" },
      { label: "Backlight", value: "7 zones" },
      { label: "Weight", value: "6.8 kg" },
    ],
    order: 4,
  },
  {
    id: "mock-eq-5",
    name: "Chauvet Rogue R2X",
    slug: "chauvet-rogue-r2x",
    images: ["/5.png"],
    price: "€65",
    pricePer: "/ day",
    shortDescription:
      "High-output LED spot fixture with motorised focus, prism effects, and ultra-smooth movement for dynamic shows.",
    fullDescription:
      "High-output LED spot fixture with motorised focus, prism effects, and ultra-smooth movement for dynamic shows. The Rogue R2X Spot features a 270W LED engine, 8-facet rotating prism, motorized iris and focus, and smooth 16-bit pan/tilt movement.",
    category: "lighting",
    categoryLabel: "Lighting",
    available: true,
    featured: false,
    specs: [
      { label: "Source", value: "270W LED" },
      { label: "Prism", value: "8-facet rotating" },
      { label: "Pan/Tilt", value: "540° / 270°" },
      { label: "Weight", value: "22 kg" },
    ],
    order: 5,
  },
  {
    id: "mock-eq-6",
    name: "JBL VTX A12",
    slug: "jbl-vtx-a12",
    images: ["/6.png"],
    price: "€420",
    pricePer: "/ day",
    shortDescription:
      "Tour-grade line array with patented D2 drivers delivering pristine highs and powerful low-end for any venue.",
    fullDescription:
      "Tour-grade line array with patented D2 drivers delivering pristine highs and powerful low-end for any venue. The VTX A12 features JBL's patented D2 Dual Diaphragm Dual Voice Coil compression driver, Radiation Boundary Integrator, and Differential Drive technology.",
    category: "sound",
    categoryLabel: "Sound System",
    available: true,
    featured: false,
    specs: [
      { label: "SPL", value: "141 dB peak" },
      { label: "Drivers", value: "3x 3.5\" + D2" },
      { label: "Coverage", value: "110° x variable" },
      { label: "Weight", value: "43 kg" },
    ],
    order: 6,
  },
];

// ─── Public API ────────────────────────────────────────────────────

export async function getAllEquipment(): Promise<EquipmentData[]> {
  const sanity = getClient();
  if (!sanity) return mockEquipment;
  try {
    const docs = await sanity.fetch(allEquipmentQuery);
    const cmsItems: EquipmentData[] = docs.map(transformEquipment);
    if (cmsItems.length === 0) return mockEquipment;
    const cmsIdSet = new Set(cmsItems.map((d) => d.id));
    const padding = mockEquipment.filter((m) => !cmsIdSet.has(m.id));
    return [...cmsItems, ...padding];
  } catch {
    return mockEquipment;
  }
}

export async function getFeaturedEquipment(
  count = 6,
): Promise<EquipmentData[]> {
  const mockFeatured = mockEquipment.filter((e) => e.featured);
  const sanity = getClient();
  if (!sanity) return mockFeatured.slice(0, count);
  try {
    const docs = await sanity.fetch(featuredEquipmentQuery, { count });
    const cmsItems: EquipmentData[] = docs.map(transformEquipment);
    if (cmsItems.length >= count) return cmsItems;
    // Pad with mock featured items
    const cmsIdSet = new Set(cmsItems.map((d) => d.id));
    const padding = mockFeatured
      .filter((m) => !cmsIdSet.has(m.id))
      .slice(0, count - cmsItems.length);
    return [...cmsItems, ...padding];
  } catch {
    return mockFeatured.slice(0, count);
  }
}

export async function getEquipmentBySlug(
  slug: string,
): Promise<EquipmentData | null> {
  const mockItem = mockEquipment.find((e) => e.slug === slug) ?? null;
  const sanity = getClient();
  if (!sanity) return mockItem;
  try {
    const doc = await sanity.fetch(equipmentBySlugQuery, { slug });
    return doc ? transformEquipment(doc) : mockItem;
  } catch {
    return mockItem;
  }
}

export async function getEquipmentSlugs(): Promise<string[]> {
  const mockSlugs = mockEquipment.map((e) => e.slug);
  const sanity = getClient();
  if (!sanity) return mockSlugs;
  try {
    const docs = await sanity.fetch(equipmentSlugsQuery);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cmsSlugs: string[] = docs.map((d: any) => d.slug);
    return [...new Set([...cmsSlugs, ...mockSlugs])];
  } catch {
    return mockSlugs;
  }
}
