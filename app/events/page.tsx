export const revalidate = 30;

import { getAllEvents } from "@/lib/events";
import EventsPageClient from "./EventsPageClient";

export const metadata = {
  title: "Events | STM Events",
  description:
    "Discover upcoming underground experiences and immersive nights by STM Events.",
};

export default async function EventsPage() {
  const events = await getAllEvents();
  return <EventsPageClient events={events} />;
}
