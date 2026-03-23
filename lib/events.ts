import { getClient } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import {
  allEventsQuery,
  featuredEventsQuery,
  eventBySlugQuery,
  eventSlugsQuery,
  nextEventQuery,
} from "@/sanity/queries";

// ─── Hero Event Type ───────────────────────────────────────────────
export interface HeroEvent {
  title: string;
  date: string;
  rawDate: string; // ISO string for countdown
  slug: string;
  image: string;
  ticketUrl: string;
  ticketStatus: string;
}

// ─── Unified Event Type ────────────────────────────────────────────
export type TicketStatus = "available" | "sold-out" | "limited" | "final-release";

export interface EventData {
  slug: string;
  title: string;
  date: string;
  rawDate: string;
  location: string;
  lineup: string[];
  description: string;
  image: string;
  eventbriteLink: string;
  ticketStatus: TicketStatus;
}

// ─── Format Sanity date to display string ──────────────────────────
function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d
    .toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    .toUpperCase()
    .replace(",", "");
}

// ─── Transform Sanity document → EventData ─────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformSanityEvent(doc: any): EventData {
  return {
    slug: doc.slug,
    title: doc.title,
    date: doc.date ? formatDate(doc.date) : "TBA",
    rawDate: doc.date || "",
    location: doc.location || "TBA",
    lineup: doc.lineup || [],
    description: doc.description || "",
    image: doc.mainImage ? urlFor(doc.mainImage).width(800).height(800).url() : "/pexels-aleksmagnusson-30968497.jpg",
    eventbriteLink: doc.eventbriteLink || "",
    ticketStatus: doc.ticketStatus || "available",
  };
}

// ─── Mock data (used when Sanity is not configured) ────────────────
const mockEvents: EventData[] = [
  {
    slug: "techno-night-berlin",
    title: "Techno Night Berlin",
    date: "MAY 15, 2026",
    rawDate: "2026-05-15T22:00:00",
    location: "Warehouse 23, Berlin",
    lineup: ["VNTM", "Klanglos", "DJ M\u00f8rk", "Syna"],
    description:
      "An immersive night of raw, hypnotic techno inside one of Berlin\u2019s most iconic industrial spaces. Warehouse 23 transforms into a pulsating underground cathedral \u2014 expect relentless beats, immersive lighting, and an atmosphere that only Berlin can deliver.",
    image: "/pexels-aleksmagnusson-30968497.jpg",
    eventbriteLink: "https://www.eventbrite.com/e/techno-night-berlin",
    ticketStatus: "available",
  },
  {
    slug: "underground-sessions",
    title: "Underground Sessions",
    date: "JUN 07, 2026",
    rawDate: "2026-06-07T22:00:00",
    location: "Club Void, Munich",
    lineup: ["Rebekah", "SPFDJ", "Introversion", "Somewhen"],
    description:
      "Deep, dark, and uncompromising. Underground Sessions takes over Club Void for a night of stripped-back techno and experimental electronic music.",
    image: "/pexels-caleboquendo-34611985.jpg",
    eventbriteLink: "https://www.eventbrite.com/e/underground-sessions",
    ticketStatus: "limited",
  },
  {
    slug: "neon-rave",
    title: "Neon Rave",
    date: "JUL 19, 2026",
    rawDate: "2026-07-19T22:00:00",
    location: "Bunker, Frankfurt",
    lineup: ["999999999", "I Hate Models", "VTSS", "Parfait"],
    description:
      "Where industrial power meets neon-soaked euphoria. The Bunker opens its doors for a sensory overload of hard-hitting techno, mesmerizing visuals, and an energy that refuses to stop.",
    image: "/pexels-edotommo99-2034851.jpg",
    eventbriteLink: "https://www.eventbrite.com/e/neon-rave",
    ticketStatus: "available",
  },
  {
    slug: "dark-frequency",
    title: "Dark Frequency",
    date: "AUG 02, 2026",
    rawDate: "2026-08-02T22:00:00",
    location: "Substation, Hamburg",
    lineup: ["Dax J", "Kobosil", "Antigone", "AIROD"],
    description:
      "Pure frequency. Pure darkness. Dark Frequency descends on Hamburg\u2019s Substation with a lineup built for the relentless.",
    image: "/pexels-paggiarofrancesco-2111015.jpg",
    eventbriteLink: "https://www.eventbrite.com/e/dark-frequency",
    ticketStatus: "sold-out",
  },
  {
    slug: "pulse-afterhours",
    title: "Pulse Afterhours",
    date: "SEP 13, 2026",
    rawDate: "2026-09-13T22:00:00",
    location: "Tresor Annex, Berlin",
    lineup: ["Phase", "Blawan", "Rrose", "Setaoc Mass"],
    description:
      "When the clubs close, Pulse begins. An afterhours experience designed for the devoted.",
    image: "/pexels-aleksmagnusson-30968497.jpg",
    eventbriteLink: "https://www.eventbrite.com/e/pulse-afterhours",
    ticketStatus: "final-release",
  },
  {
    slug: "void-protocol",
    title: "Void Protocol",
    date: "OCT 25, 2026",
    rawDate: "2026-10-25T22:00:00",
    location: "Kraftwerk, Berlin",
    lineup: ["Surgeon", "Ancient Methods", "Headless Horseman", "UVB"],
    description:
      "Enter the void. A multi-sensory experience combining industrial techno with immersive art installations.",
    image: "/pexels-caleboquendo-34611985.jpg",
    eventbriteLink: "",
    ticketStatus: "available",
  },
];

// ─── Public API ────────────────────────────────────────────────────

export async function getAllEvents(): Promise<EventData[]> {
  const sanity = getClient();
  if (!sanity) return mockEvents;
  try {
    const docs = await sanity.fetch(allEventsQuery);
    const cmsEvents = docs.map(transformSanityEvent);
    // Return CMS events — fall back to mock if CMS is empty
    return cmsEvents.length > 0 ? cmsEvents : mockEvents;
  } catch {
    return mockEvents;
  }
}

export async function getFeaturedEvents(count = 4): Promise<EventData[]> {
  const sanity = getClient();
  if (!sanity) return mockEvents.slice(0, count);
  try {
    const docs = await sanity.fetch(featuredEventsQuery, { count });
    const cmsEvents = docs.map(transformSanityEvent);
    // If CMS has fewer than requested, pad with mock events
    if (cmsEvents.length < count) {
      const cmsSlugSet = new Set(cmsEvents.map((e: EventData) => e.slug));
      const padding = mockEvents
        .filter((e) => !cmsSlugSet.has(e.slug))
        .slice(0, count - cmsEvents.length);
      return [...cmsEvents, ...padding];
    }
    return cmsEvents;
  } catch {
    return mockEvents.slice(0, count);
  }
}

export async function getEventBySlug(
  slug: string,
): Promise<EventData | null> {
  const sanity = getClient();
  // Check mock data first (always available)
  const mockEvent = mockEvents.find((e) => e.slug === slug) ?? null;
  if (!sanity) return mockEvent;
  try {
    const doc = await sanity.fetch(eventBySlugQuery, { slug });
    return doc ? transformSanityEvent(doc) : mockEvent;
  } catch {
    return mockEvent;
  }
}

export async function getEventSlugs(): Promise<string[]> {
  const sanity = getClient();
  const mockSlugs = mockEvents.map((e) => e.slug);
  if (!sanity) return mockSlugs;
  try {
    const docs = await sanity.fetch(eventSlugsQuery);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cmsSlugs: string[] = docs.map((d: any) => d.slug);
    // Merge both sets (no duplicates)
    return [...new Set([...cmsSlugs, ...mockSlugs])];
  } catch {
    return mockSlugs;
  }
}

// ─── Next Upcoming Event (for Hero) ─────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformHeroEvent(doc: any): HeroEvent {
  return {
    title: doc.title,
    date: doc.date ? formatDate(doc.date) : "TBA",
    rawDate: doc.date || "",
    slug: doc.slug,
    image: doc.mainImage ? urlFor(doc.mainImage).width(1920).height(1080).url() : "",
    ticketUrl: doc.eventbriteLink || "",
    ticketStatus: doc.ticketStatus || "available",
  };
}

const mockHeroEvent: HeroEvent = {
  title: mockEvents[0].title,
  date: mockEvents[0].date,
  rawDate: "2026-05-15T22:00:00",
  slug: mockEvents[0].slug,
  image: mockEvents[0].image,
  ticketUrl: mockEvents[0].eventbriteLink,
  ticketStatus: mockEvents[0].ticketStatus,
};

export async function getNextEvent(): Promise<HeroEvent | null> {
  const sanity = getClient();
  if (!sanity) return mockHeroEvent;
  try {
    const doc = await sanity.fetch(nextEventQuery);
    if (!doc) return mockHeroEvent;
    return transformHeroEvent(doc);
  } catch {
    return mockHeroEvent;
  }
}
