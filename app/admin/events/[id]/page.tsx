import { createServerSupabase } from "@/lib/supabase/server";
import EventForm from "../EventForm";

export const dynamic = "force-dynamic";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (id === "new") {
    return <EventForm />;
  }

  const supabase = await createServerSupabase();
  const { data: event } = await supabase.from("events").select("*").eq("id", id).single();

  if (!event) {
    return <p className="text-white/50">Event not found</p>;
  }

  return <EventForm event={event} />;
}
