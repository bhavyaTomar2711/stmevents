import { getClient } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { allDJsQuery, residentDJsQuery, djBySlugQuery } from "@/sanity/queries";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformDJ(doc: any): DJData {
  return {
    id: doc._id,
    name: doc.name,
    slug: doc.slug,
    photo: doc.photo
      ? urlFor(doc.photo).width(800).height(1000).url()
      : "/pexels-edotommo99-2034851.jpg",
    logo: doc.logo ? urlFor(doc.logo).width(200).height(200).url() : null,
    genre: doc.genre || "Techno",
    bio: doc.bio || null,
    instagramUrl: doc.instagramUrl || null,
    soundcloudUrl: doc.soundcloudUrl || null,
    resident: doc.resident || false,
    order: doc.order || 0,
  };
}

// ─── Mock data ─────────────────────────────────────────────────────

const mockDJs: DJData[] = [
  {
    id: "mock-dj-1",
    name: "KRYPTIC",
    slug: "kryptic",
    photo: "/pexels-edotommo99-2034851.jpg",
    logo: null,
    genre: "Dark Techno",
    bio: "Berlin-based dark techno selector. Known for relentless energy and hypnotic sets that blur the line between chaos and control.",
    instagramUrl: "https://instagram.com",
    soundcloudUrl: "https://soundcloud.com",
    resident: true,
    order: 1,
  },
  {
    id: "mock-dj-2",
    name: "NOVA",
    slug: "nova",
    photo: "/pexels-caleboquendo-34611985.jpg",
    logo: null,
    genre: "Melodic House",
    bio: "Weaving emotional melodic journeys through deep house and progressive landscapes. Resident since day one.",
    instagramUrl: "https://instagram.com",
    soundcloudUrl: "https://soundcloud.com",
    resident: true,
    order: 2,
  },
  {
    id: "mock-dj-3",
    name: "VORTEX",
    slug: "vortex",
    photo: "/pexels-aleksmagnusson-30968497.jpg",
    logo: null,
    genre: "Industrial",
    bio: "Raw industrial power. VORTEX delivers punishing sets built on distorted kicks and dystopian atmospheres.",
    instagramUrl: "https://instagram.com",
    soundcloudUrl: null,
    resident: true,
    order: 3,
  },
  {
    id: "mock-dj-4",
    name: "SPECTRA",
    slug: "spectra",
    photo: "/pexels-paggiarofrancesco-2111015.jpg",
    logo: null,
    genre: "Minimal Techno",
    bio: "Less is more. SPECTRA crafts hypnotic minimal grooves that let the silence speak as loud as the beat.",
    instagramUrl: "https://instagram.com",
    soundcloudUrl: "https://soundcloud.com",
    resident: true,
    order: 4,
  },
  {
    id: "mock-dj-5",
    name: "PHANTOM",
    slug: "phantom",
    photo: "/pexels-edotommo99-2034851.jpg",
    logo: null,
    genre: "Acid Techno",
    bio: "Acid-drenched techno from the underground. PHANTOM's sets are a relentless surge of 303 squelch and warehouse energy.",
    instagramUrl: null,
    soundcloudUrl: "https://soundcloud.com",
    resident: true,
    order: 5,
  },
];

// ─── Public API ────────────────────────────────────────────────────

export async function getAllDJs(): Promise<DJData[]> {
  const sanity = getClient();
  if (!sanity) return mockDJs;
  try {
    const docs = await sanity.fetch(allDJsQuery);
    const cmsDJs: DJData[] = docs.map(transformDJ);
    if (cmsDJs.length === 0) return mockDJs;
    const cmsIdSet = new Set(cmsDJs.map((d) => d.id));
    const padding = mockDJs.filter((m) => !cmsIdSet.has(m.id));
    return [...cmsDJs, ...padding];
  } catch {
    return mockDJs;
  }
}

export async function getResidentDJs(): Promise<DJData[]> {
  const mockResidents = mockDJs.filter((d) => d.resident);
  const sanity = getClient();
  if (!sanity) return mockResidents;
  try {
    const docs = await sanity.fetch(residentDJsQuery);
    const cmsDJs: DJData[] = docs.map(transformDJ);
    if (cmsDJs.length === 0) return mockResidents;
    const cmsIdSet = new Set(cmsDJs.map((d) => d.id));
    const padding = mockResidents.filter((m) => !cmsIdSet.has(m.id));
    return [...cmsDJs, ...padding];
  } catch {
    return mockResidents;
  }
}

export async function getDJSlugs(): Promise<string[]> {
  const mockSlugs = mockDJs.map((d) => d.slug);
  const sanity = getClient();
  if (!sanity) return mockSlugs;
  try {
    const docs = await sanity.fetch(allDJsQuery);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cmsSlugs: string[] = docs.map((d: any) => d.slug);
    return [...new Set([...cmsSlugs, ...mockSlugs])];
  } catch {
    return mockSlugs;
  }
}

export async function getDJBySlug(slug: string): Promise<DJData | null> {
  const mockDJ = mockDJs.find((d) => d.slug === slug) ?? null;
  const sanity = getClient();
  if (!sanity) return mockDJ;
  try {
    const doc = await sanity.fetch(djBySlugQuery, { slug });
    return doc ? transformDJ(doc) : mockDJ;
  } catch {
    return mockDJ;
  }
}
