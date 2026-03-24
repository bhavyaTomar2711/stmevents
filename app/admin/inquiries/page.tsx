"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { DbInquiry } from "@/lib/supabase/types";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<DbInquiry[]>([]);
  const [filter, setFilter] = useState<"all" | "booking" | "rental" | "contact">("all");
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    const supabase = createClient();
    let query = supabase.from("inquiries").select("*").order("created_at", { ascending: false });
    if (filter !== "all") query = query.eq("type", filter);
    const { data } = await query;
    setInquiries(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchInquiries();
  }, [filter]);

  const markAsRead = async (id: string) => {
    const supabase = createClient();
    await supabase.from("inquiries").update({ status: "read" }).eq("id", id);
    fetchInquiries();
  };

  const markAsReplied = async (id: string) => {
    const supabase = createClient();
    await supabase.from("inquiries").update({ status: "replied" }).eq("id", id);
    fetchInquiries();
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    const supabase = createClient();
    await supabase.from("inquiries").delete().eq("id", id);
    fetchInquiries();
  };

  const statusColors: Record<string, string> = {
    new: "bg-emerald-500/10 text-emerald-400",
    read: "bg-amber-500/10 text-amber-400",
    replied: "bg-white/[0.06] text-white/40",
  };

  const typeColors: Record<string, string> = {
    booking: "bg-purple-500/10 text-purple-400",
    rental: "bg-blue-500/10 text-blue-400",
    contact: "bg-fuchsia-500/10 text-fuchsia-400",
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold uppercase tracking-wider text-white">Inquiries</h1>
        <p className="text-sm text-white/40">View all form submissions</p>
      </div>

      {/* Filter tabs */}
      <div className="mb-6 flex gap-2">
        {(["all", "booking", "rental", "contact"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`rounded-lg px-4 py-2 text-[11px] font-semibold uppercase tracking-wider transition-all ${
              filter === tab
                ? "bg-purple-500/20 text-purple-300"
                : "text-white/40 hover:bg-white/[0.04] hover:text-white/60"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-white/30">Loading...</p>
      ) : inquiries.length === 0 ? (
        <div className="rounded-xl border border-white/[0.08] p-12 text-center text-sm text-white/30">
          No inquiries yet
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className={`rounded-xl border p-6 transition-all ${
                inq.status === "new"
                  ? "border-purple-500/20 bg-purple-500/[0.03]"
                  : "border-white/[0.06] bg-white/[0.02]"
              }`}
            >
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${typeColors[inq.type]}`}>
                    {inq.type}
                  </span>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${statusColors[inq.status]}`}>
                    {inq.status}
                  </span>
                  <span className="text-[11px] text-white/30">
                    {new Date(inq.created_at).toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-2">
                  {inq.status === "new" && (
                    <button onClick={() => markAsRead(inq.id)} className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/50 hover:bg-white/[0.05]">
                      Mark Read
                    </button>
                  )}
                  {inq.status !== "replied" && (
                    <button onClick={() => markAsReplied(inq.id)} className="rounded-lg border border-emerald-500/20 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400/70 hover:bg-emerald-500/10">
                      Mark Replied
                    </button>
                  )}
                  <button onClick={() => deleteInquiry(inq.id)} className="rounded-lg border border-red-500/20 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-red-400/60 hover:bg-red-500/10">
                    Delete
                  </button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">Name</p>
                  <p className="mt-1 text-sm font-medium text-white">{inq.name}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">Email</p>
                  <a href={`mailto:${inq.email}`} className="mt-1 block text-sm text-purple-400 hover:underline">{inq.email}</a>
                </div>
                {inq.phone && (
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">Phone</p>
                    <p className="mt-1 text-sm text-white/70">{inq.phone}</p>
                  </div>
                )}
                {inq.event_name && (
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">Event</p>
                    <p className="mt-1 text-sm text-white/70">{inq.event_name}</p>
                  </div>
                )}
                {inq.equipment_name && (
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">Equipment</p>
                    <p className="mt-1 text-sm text-white/70">{inq.equipment_name}</p>
                  </div>
                )}
                {inq.subject && (
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">Subject</p>
                    <p className="mt-1 text-sm text-white/70">{inq.subject}</p>
                  </div>
                )}
              </div>

              {inq.message && (
                <div className="mt-4 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">Message</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{inq.message}</p>
                </div>
              )}

              {(inq.rental_date || inq.duration || inq.location) && (
                <div className="mt-3 flex flex-wrap gap-4">
                  {inq.rental_date && <span className="text-[11px] text-white/40">Date: {inq.rental_date}</span>}
                  {inq.duration && <span className="text-[11px] text-white/40">Duration: {inq.duration}</span>}
                  {inq.location && <span className="text-[11px] text-white/40">Location: {inq.location}</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
