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

  const statusConfig: Record<string, { bg: string; text: string }> = {
    new: { bg: "bg-emerald-500/15", text: "text-emerald-400" },
    read: { bg: "bg-amber-500/15", text: "text-amber-400" },
    replied: { bg: "bg-white/[0.06]", text: "text-white/40" },
  };

  const typeConfig: Record<string, { bg: string; text: string; gradient: string }> = {
    booking: { bg: "bg-purple-500/15", text: "text-purple-400", gradient: "from-purple-500 to-violet-500" },
    rental: { bg: "bg-cyan-500/15", text: "text-cyan-400", gradient: "from-cyan-500 to-teal-500" },
    contact: { bg: "bg-pink-500/15", text: "text-pink-400", gradient: "from-pink-500 to-rose-500" },
  };

  const filterTabs = [
    { key: "all" as const, label: "All", count: inquiries.length },
    { key: "booking" as const, label: "Booking", color: "purple" },
    { key: "rental" as const, label: "Rental", color: "cyan" },
    { key: "contact" as const, label: "Contact", color: "pink" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Inquiries</h1>
        <p className="mt-1 text-sm text-white/40">View and manage all form submissions</p>
      </div>

      {/* Filter tabs */}
      <div className="mb-6 flex gap-2">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`rounded-xl px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider transition-all ${
              filter === tab.key
                ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/20"
                : "border border-white/[0.06] bg-white/[0.03] text-white/40 hover:bg-white/[0.06] hover:text-white/60"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-500/30 border-t-purple-500" />
        </div>
      ) : inquiries.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.02] py-16">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10">
            <svg className="h-8 w-8 text-amber-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="mb-1 text-sm font-medium text-white/50">No inquiries yet</p>
          <p className="text-[12px] text-white/25">Form submissions will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => {
            const type = typeConfig[inq.type] || typeConfig.contact;
            const status = statusConfig[inq.status] || statusConfig.new;
            return (
              <div
                key={inq.id}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  inq.status === "new"
                    ? "border-purple-500/15 bg-purple-500/[0.03]"
                    : "border-white/[0.06] bg-white/[0.02]"
                }`}
              >
                <div className="p-5 sm:p-6">
                  {/* Header */}
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${type.gradient}`}>
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8" />
                        </svg>
                      </div>
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${type.bg} ${type.text}`}>
                        {inq.type}
                      </span>
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${status.bg} ${status.text}`}>
                        {inq.status}
                      </span>
                      <span className="text-[11px] text-white/25">
                        {new Date(inq.created_at).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {inq.status === "new" && (
                        <button onClick={() => markAsRead(inq.id)} className="rounded-lg bg-white/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/50 transition-all hover:bg-white/[0.1] hover:text-white">
                          Mark Read
                        </button>
                      )}
                      {inq.status !== "replied" && (
                        <button onClick={() => markAsReplied(inq.id)} className="rounded-lg bg-emerald-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400/70 transition-all hover:bg-emerald-500/20 hover:text-emerald-400">
                          Mark Replied
                        </button>
                      )}
                      <button onClick={() => deleteInquiry(inq.id)} className="rounded-lg border border-red-500/15 bg-red-500/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-red-400/60 transition-all hover:bg-red-500/10 hover:text-red-400">
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Details grid */}
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">Name</p>
                      <p className="mt-1 text-sm font-medium text-white">{inq.name}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">Email</p>
                      <a href={`mailto:${inq.email}`} className="mt-1 block text-sm text-purple-400 hover:underline">{inq.email}</a>
                    </div>
                    {inq.phone && (
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">Phone</p>
                        <p className="mt-1 text-sm text-white/60">{inq.phone}</p>
                      </div>
                    )}
                    {inq.event_name && (
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">Event</p>
                        <p className="mt-1 text-sm text-white/60">{inq.event_name}</p>
                      </div>
                    )}
                    {inq.equipment_name && (
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">Equipment</p>
                        <p className="mt-1 text-sm text-white/60">{inq.equipment_name}</p>
                      </div>
                    )}
                    {inq.subject && (
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">Subject</p>
                        <p className="mt-1 text-sm text-white/60">{inq.subject}</p>
                      </div>
                    )}
                  </div>

                  {inq.message && (
                    <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">Message</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/50">{inq.message}</p>
                    </div>
                  )}

                  {(inq.rental_date || inq.duration || inq.location) && (
                    <div className="mt-3 flex flex-wrap gap-4">
                      {inq.rental_date && (
                        <span className="flex items-center gap-1 text-[11px] text-white/35">
                          <svg className="h-3 w-3 text-cyan-400/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {inq.rental_date}
                        </span>
                      )}
                      {inq.duration && <span className="text-[11px] text-white/35">Duration: {inq.duration}</span>}
                      {inq.location && <span className="text-[11px] text-white/35">Location: {inq.location}</span>}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
