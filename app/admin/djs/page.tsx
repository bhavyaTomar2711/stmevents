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
          <h1 className="text-2xl font-bold uppercase tracking-wider text-white">DJs</h1>
          <p className="text-sm text-white/40">Manage your artists</p>
        </div>
        <Link href="/admin/djs/new" className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wider text-white transition-all hover:bg-purple-500">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          Add DJ
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.02]">
              <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Name</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Genre</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Resident</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Published</th>
              <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Actions</th>
            </tr>
          </thead>
          <tbody>
            {djs && djs.length > 0 ? djs.map((dj) => (
              <tr key={dj.id} className="border-b border-white/[0.04] transition-colors hover:bg-white/[0.02]">
                <td className="px-5 py-4 text-sm font-medium text-white">{dj.name}</td>
                <td className="px-5 py-4 text-sm text-white/60">{dj.genre}</td>
                <td className="px-5 py-4"><span className={`inline-block h-2 w-2 rounded-full ${dj.resident ? "bg-emerald-400" : "bg-white/20"}`} /></td>
                <td className="px-5 py-4"><span className={`inline-block h-2 w-2 rounded-full ${dj.published ? "bg-emerald-400" : "bg-white/20"}`} /></td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/djs/${dj.id}`} className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/50 transition-colors hover:bg-white/[0.05] hover:text-white">Edit</Link>
                    <DeleteButton table="djs" id={dj.id} />
                  </div>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={5} className="px-5 py-12 text-center text-sm text-white/30">No DJs yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
