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
          <h1 className="text-2xl font-bold uppercase tracking-wider text-white">Events</h1>
          <p className="text-sm text-white/40">Manage your events</p>
        </div>
        <Link
          href="/admin/events/new"
          className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wider text-white transition-all hover:bg-purple-500"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Event
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.02]">
              <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Title</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Date</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Location</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Status</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Published</th>
              <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events && events.length > 0 ? (
              events.map((event) => (
                <tr key={event.id} className="border-b border-white/[0.04] transition-colors hover:bg-white/[0.02]">
                  <td className="px-5 py-4 text-sm font-medium text-white">{event.title}</td>
                  <td className="px-5 py-4 text-sm text-white/60">{new Date(event.date).toLocaleDateString()}</td>
                  <td className="px-5 py-4 text-sm text-white/60">{event.location}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                      event.ticket_status === "sold-out" ? "bg-red-500/10 text-red-400" :
                      event.ticket_status === "limited" ? "bg-amber-500/10 text-amber-400" :
                      "bg-emerald-500/10 text-emerald-400"
                    }`}>
                      {event.ticket_status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-block h-2 w-2 rounded-full ${event.published ? "bg-emerald-400" : "bg-white/20"}`} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/events/${event.id}`}
                        className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/50 transition-colors hover:bg-white/[0.05] hover:text-white"
                      >
                        Edit
                      </Link>
                      <DeleteButton table="events" id={event.id} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-sm text-white/30">
                  No events yet. Create your first event!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
