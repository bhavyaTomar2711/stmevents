import { createServerSupabase } from "@/lib/supabase/server";
import Link from "next/link";
import DeleteButton from "../_components/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminDJsPage() {
  const supabase = await createServerSupabase();
  const { data: djs } = await supabase.from("djs").select("*").order("display_order", { ascending: true });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Resident DJs</h1>
          <p className="mt-1 text-sm text-white/40">Manage your artists</p>
        </div>
        <Link href="/admin/djs/new" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wider text-white shadow-lg shadow-pink-500/20 transition-all hover:shadow-pink-500/30">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          Add DJ
        </Link>
      </div>

      {djs && djs.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {djs.map((dj) => (
            <div key={dj.id} className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] transition-all duration-300 hover:border-pink-500/20 hover:bg-white/[0.05]">
              {/* Avatar */}
              <div className="relative aspect-square overflow-hidden">
                {dj.photo_url ? (
                  <img src={dj.photo_url} alt={dj.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-pink-500/15 to-rose-500/10">
                    <svg className="h-16 w-16 text-pink-500/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07070d] via-transparent to-transparent" />
                {/* Badges */}
                <div className="absolute bottom-3 left-3 flex gap-1.5">
                  {dj.resident && (
                    <span className="rounded-full bg-pink-500/25 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-pink-300 backdrop-blur-sm">Resident</span>
                  )}
                  {dj.published ? (
                    <span className="rounded-full bg-emerald-500/25 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-sm">Live</span>
                  ) : (
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white/50 backdrop-blur-sm">Draft</span>
                  )}
                </div>
              </div>
              <div className="p-3">
                <h3 className="mb-0.5 text-[14px] font-bold text-white">{dj.name}</h3>
                <p className="mb-3 text-[11px] text-pink-400/60">{dj.genre}</p>
                <div className="flex gap-2">
                  <Link href={`/admin/djs/${dj.id}`} className="flex-1 rounded-lg bg-white/[0.06] py-1.5 text-center text-[10px] font-semibold uppercase tracking-wider text-white/60 transition-all hover:bg-white/[0.1] hover:text-white">
                    Edit
                  </Link>
                  <DeleteButton table="djs" id={dj.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.02] py-16">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-500/10">
            <svg className="h-8 w-8 text-pink-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
            </svg>
          </div>
          <p className="mb-1 text-sm font-medium text-white/50">No DJs yet</p>
          <p className="mb-5 text-[12px] text-white/25">Add your first resident DJ</p>
          <Link href="/admin/djs/new" className="rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 px-6 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white">
            Add DJ
          </Link>
        </div>
      )}
    </div>
  );
}
