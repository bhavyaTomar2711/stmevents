import { createServerSupabase } from "@/lib/supabase/server";
import Link from "next/link";
import DeleteButton from "../_components/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminEquipmentPage() {
  const supabase = await createServerSupabase();
  const { data: items } = await supabase.from("equipment").select("*").order("display_order", { ascending: true });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Equipment</h1>
          <p className="mt-1 text-sm text-white/40">Manage rental equipment</p>
        </div>
        <Link href="/admin/equipment/new" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wider text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/30">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          Add Equipment
        </Link>
      </div>

      {items && items.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] transition-all duration-300 hover:border-emerald-500/20 hover:bg-white/[0.05]">
              {item.images?.[0] && (
                <div className="relative h-44 overflow-hidden">
                  <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07070d] via-[#07070d]/40 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${
                      item.available ? "bg-emerald-500/25 text-emerald-300" : "bg-red-500/25 text-red-300"
                    }`}>
                      {item.available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                  {item.price && (
                    <div className="absolute top-3 right-3 rounded-full bg-black/50 px-3 py-1 text-[11px] font-bold text-emerald-300 backdrop-blur-sm">
                      {item.price} / {item.price_per}
                    </div>
                  )}
                </div>
              )}
              {!item.images?.[0] && (
                <div className="flex h-32 items-center justify-center bg-gradient-to-br from-emerald-500/10 to-green-500/5">
                  <svg className="h-10 w-10 text-emerald-500/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35" />
                  </svg>
                </div>
              )}
              <div className="p-4">
                <h3 className="mb-1 text-[15px] font-bold text-white">{item.name}</h3>
                <p className="mb-3 text-[12px] text-white/35">{item.category_label}</p>
                <div className="flex gap-2">
                  <Link href={`/admin/equipment/${item.id}`} className="flex-1 rounded-xl bg-white/[0.06] py-2 text-center text-[11px] font-semibold uppercase tracking-wider text-white/60 transition-all hover:bg-white/[0.1] hover:text-white">
                    Edit
                  </Link>
                  <DeleteButton table="equipment" id={item.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.02] py-16">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
            <svg className="h-8 w-8 text-emerald-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37" />
            </svg>
          </div>
          <p className="mb-1 text-sm font-medium text-white/50">No equipment yet</p>
          <p className="mb-5 text-[12px] text-white/25">Add your first equipment item</p>
          <Link href="/admin/equipment/new" className="rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white">
            Add Equipment
          </Link>
        </div>
      )}
    </div>
  );
}
