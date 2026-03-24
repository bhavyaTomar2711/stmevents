import { createServerSupabase } from "@/lib/supabase/server";
import Link from "next/link";
import DeleteButton from "../_components/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const supabase = await createServerSupabase();
  const { data: items } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-wider text-white">Gallery</h1>
          <p className="text-sm text-white/40">Manage photos and videos</p>
        </div>
        <Link href="/admin/gallery/new" className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wider text-white transition-all hover:bg-purple-500">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          Add Item
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/[0.08]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.02]">
              <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Title</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Type</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Category</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Featured</th>
              <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? items.map((item) => (
              <tr key={item.id} className="border-b border-white/[0.04] transition-colors hover:bg-white/[0.02]">
                <td className="px-5 py-4 text-sm font-medium text-white">{item.title}</td>
                <td className="px-5 py-4 text-sm text-white/60">{item.media_type}</td>
                <td className="px-5 py-4 text-sm text-white/60">{item.category}</td>
                <td className="px-5 py-4"><span className={`inline-block h-2 w-2 rounded-full ${item.featured ? "bg-emerald-400" : "bg-white/20"}`} /></td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/gallery/${item.id}`} className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/50 transition-colors hover:bg-white/[0.05] hover:text-white">Edit</Link>
                    <DeleteButton table="gallery" id={item.id} />
                  </div>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={5} className="px-5 py-12 text-center text-sm text-white/30">No gallery items yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
