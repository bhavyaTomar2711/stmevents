import { getEventBySlug, getEventSlugs } from "@/lib/events";
import { notFound } from "next/navigation";
import EventDetailClient from "./EventDetailClient";

export async function generateStaticParams() {
  const slugs = await getEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Event Not Found | STM Events" };
  return {
    title: `${event.title} | STM Events`,
    description: event.description.slice(0, 160),
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();
  return <EventDetailClient event={event} />;
}
