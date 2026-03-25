"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

interface RentalInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  equipment_name: string | null;
  rental_date: string | null;
  duration: string | null;
  location: string | null;
  requirements: string | null;
  status: string;
  created_at: string;
}

export default function RentalsPage() {
  const [rentals, setRentals] = useState<RentalInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("inquiries")
        .select("*")
        .eq("type", "rental")
        .eq("email", user.email)
        .order("created_at", { ascending: false });

      setRentals(data || []);
      setLoading(false);
    }
    load();
  }, []);

  const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
    new: { bg: "bg-amber-500/15", text: "text-amber-400", label: "Pending" },
    read: { bg: "bg-blue-500/15", text: "text-blue-400", label: "Reviewed" },
    replied: { bg: "bg-emerald-500/15", text: "text-emerald-400", label: "Replied" },
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">My Rentals</h1>
        <p className="mt-1 text-sm text-white/40">Your equipment rental requests</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500/30 border-t-cyan-500" />
        </div>
      ) : rentals.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.02] py-16">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10">
            <svg className="h-8 w-8 text-cyan-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <p className="mb-1 text-sm font-medium text-white/50">No rental requests</p>
          <p className="mb-5 text-[12px] text-white/25">Inquire about equipment to see your requests here</p>
          <Link href="/#services" className="rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 px-6 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg shadow-cyan-500/20">
            Browse Equipment
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rentals.map((rental) => {
            const style = statusStyles[rental.status] || statusStyles.new;
            return (
              <div key={rental.id} className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] transition-all duration-300 hover:border-cyan-500/20 hover:bg-white/[0.05]">
                {/* Colored top bar */}
                <div className="h-1 w-full bg-gradient-to-r from-cyan-500 to-teal-500" />

                <div className="p-5">
                  {/* Icon + Status */}
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 shadow-lg shadow-cyan-500/20">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35" />
                      </svg>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${style.bg} ${style.text}`}>
                      {style.label}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-1 text-[16px] font-bold text-white">{rental.equipment_name || "Equipment Rental"}</h3>
                  <p className="mb-4 text-[11px] text-white/25">
                    Submitted {new Date(rental.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>

                  {/* Detail chips */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {rental.rental_date && (
                      <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1.5">
                        <svg className="h-3 w-3 text-cyan-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-[11px] font-medium text-white/50">{rental.rental_date}</span>
                      </div>
                    )}
                    {rental.duration && (
                      <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1.5">
                        <svg className="h-3 w-3 text-cyan-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-[11px] font-medium text-white/50">{rental.duration}</span>
                      </div>
                    )}
                    {rental.location && (
                      <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1.5">
                        <svg className="h-3 w-3 text-cyan-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span className="text-[11px] font-medium text-white/50">{rental.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Requirements */}
                  {rental.requirements && (
                    <div className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-3">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/20">Requirements</p>
                      <p className="mt-1 line-clamp-3 text-[12px] leading-relaxed text-white/45">{rental.requirements}</p>
                    </div>
                  )}
                </div>

                {/* Glow on hover */}
                <div className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-15" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
