import { createPublicSupabase } from "@/lib/supabase/server";
import type { DbEvent } from "@/lib/supabase/types";

// ─── Hero Event Type ───────────────────────────────────────────────
export interface HeroEvent {
  title: string;
  title_de: string;
  date: string;
  time: string;
  rawDate: string;
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
  title_de: string;
  date: string;
  time: string;
  rawDate: string;
  location: string;
  location_de: string;
  lineup: string[];
  description: string;
  description_de: string;
  image: string;
  eventbriteLink: string;
  ticketStatus: TicketStatus;
}

// ─── Format date to display string ─────────────────────────────────
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

function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  const h = d.getUTCHours();
  const m = d.getUTCMinutes();
  if (h === 0 && m === 0) return "";
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

// ─── Transform DB row → EventData ──────────────────────────────────
function transformEvent(row: DbEvent): EventData {
  return {
    slug: row.slug,
    title: row.title,
    title_de: row.title_de || "",
    date: row.date ? formatDate(row.date) : "TBA",
    time: row.date ? formatTime(row.date) : "",
    rawDate: row.date || "",
    location: row.location || "TBA",
    location_de: row.location_de || "",
    lineup: row.lineup || [],
    description: row.description || "",
    description_de: row.description_de || "",
    image: row.image_url || "",
    eventbriteLink: row.eventbrite_link || "",
    ticketStatus: row.ticket_status || "available",
  };
}

// ─── Public API ────────────────────────────────────────────────────

export async function getAllEvents(): Promise<EventData[]> {
  try {
    const supabase = await createPublicSupabase();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("published", true)
      .order("date", { ascending: true });
    if (error || !data) return [];
    return data.map(transformEvent);
  } catch {
    return [];
  }
}

export async function getFeaturedEvents(count = 4): Promise<EventData[]> {
  try {
    const supabase = await createPublicSupabase();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("published", true)
      .order("date", { ascending: true })
      .limit(count);
    if (error || !data) return [];
    return data.map(transformEvent);
  } catch {
    return [];
  }
}

export async function getEventBySlug(slug: string): Promise<EventData | null> {
  try {
    const supabase = await createPublicSupabase();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();
    if (error || !data) return null;
    return transformEvent(data);
  } catch {
    return null;
  }
}

export async function getEventSlugs(): Promise<string[]> {
  try {
    const supabase = await createPublicSupabase();
    const { data, error } = await supabase
      .from("events")
      .select("slug")
      .eq("published", true);
    if (error || !data) return [];
    return data.map((d) => d.slug);
  } catch {
    return [];
  }
}

// ─── Next Upcoming Event (for Hero) ────────────────────────────────

export async function getNextEvent(): Promise<HeroEvent | null> {
  try {
    const supabase = await createPublicSupabase();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("published", true)
      .gte("date", new Date().toISOString())
      .order("date", { ascending: true })
      .limit(1)
      .single();
    if (error || !data) return null;
    return {
      title: data.title,
      title_de: data.title_de || "",
      date: data.date ? formatDate(data.date) : "TBA",
      time: data.date ? formatTime(data.date) : "",
      rawDate: data.date || "",
      slug: data.slug,
      image: data.image_url || "",
      ticketUrl: data.eventbrite_link || "",
      ticketStatus: data.ticket_status || "available",
    };
  } catch {
    return null;
  }
}
