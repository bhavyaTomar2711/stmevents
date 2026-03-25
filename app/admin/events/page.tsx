import { createServerSupabase } from "@/lib/supabase/server";
import Link from "next/link";
import DeleteButton from "../_components/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const supabase = await createServerSupabase();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: false });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Events</h1>
          <p className="mt-1 text-sm text-white/40">Manage your events</p>
        </div>
        <Link
          href="/admin/events/new"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wider text-white shadow-lg shadow-purple-500/20 transition-all hover:shadow-purple-500/30"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Event
        </Link>
      </div>

      {events && events.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <div key={event.id} className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] transition-all duration-300 hover:border-purple-500/20 hover:bg-white/[0.05]">
              {/* Image */}
              {event.image_url && (
                <div className="relative h-44 overflow-hidden">
                  <img src={event.image_url} alt={event.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07070d] via-[#07070d]/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${
                      event.ticket_status === "sold-out" ? "bg-red-500/20 text-red-300" :
                      event.ticket_status === "limited" ? "bg-amber-500/20 text-amber-300" :
                      "bg-emerald-500/20 text-emerald-300"
                    }`}>
                      {event.ticket_status}
                    </span>
                    {event.published && (
                      <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-sm">Live</span>
                    )}
                    {!event.published && (
                      <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/50 backdrop-blur-sm">Draft</span>
                    )}
                  </div>
                </div>
              )}
              {!event.image_url && (
                <div className="flex h-32 items-center justify-center bg-gradient-to-br from-purple-500/10 to-violet-500/5">
                  <svg className="h-10 w-10 text-purple-500/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              {/* Content */}
              <div className="p-4">
                <h3 className="mb-2 text-[15px] font-bold text-white">{event.title}</h3>
                <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1">
                  <span className="flex items-center gap-1.5 text-[11px] text-white/40">
                    <svg className="h-3.5 w-3.5 text-purple-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] text-white/40">
                    <svg className="h-3.5 w-3.5 text-purple-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/events/${event.id}`}
                    className="flex-1 rounded-xl bg-white/[0.06] py-2 text-center text-[11px] font-semibold uppercase tracking-wider text-white/60 transition-all hover:bg-white/[0.1] hover:text-white"
                  >
                    Edit
                  </Link>
                  <DeleteButton table="events" id={event.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.02] py-16">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10">
            <svg className="h-8 w-8 text-purple-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="mb-1 text-sm font-medium text-white/50">No events yet</p>
          <p className="mb-5 text-[12px] text-white/25">Create your first event to get started</p>
          <Link href="/admin/events/new" className="rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white">
            Create Event
          </Link>
        </div>
      )}
    </div>
  );
}
