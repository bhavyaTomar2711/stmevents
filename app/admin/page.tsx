import { createServerSupabase } from "@/lib/supabase/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getCount(table: string) {
  try {
    const supabase = await createServerSupabase();
    const { count } = await supabase.from(table).select("*", { count: "exact", head: true });
    return count || 0;
  } catch {
    return 0;
  }
}

async function getNewInquiries() {
  try {
    const supabase = await createServerSupabase();
    const { count } = await supabase.from("inquiries").select("*", { count: "exact", head: true }).eq("status", "new");
    return count || 0;
  } catch {
    return 0;
  }
}

export default async function AdminOverview() {
  const [events, djs, gallery, equipment, newInquiries] = await Promise.all([
    getCount("events"),
    getCount("djs"),
    getCount("gallery"),
    getCount("equipment"),
    getNewInquiries(),
  ]);

  const stats = [
    { label: "Events", count: events, href: "/admin/events", color: "from-purple-600 to-purple-400" },
    { label: "DJs", count: djs, href: "/admin/djs", color: "from-violet-600 to-violet-400" },
    { label: "Gallery", count: gallery, href: "/admin/gallery", color: "from-indigo-600 to-indigo-400" },
    { label: "Equipment", count: equipment, href: "/admin/equipment", color: "from-fuchsia-600 to-fuchsia-400" },
    { label: "New Inquiries", count: newInquiries, href: "/admin/inquiries", color: "from-emerald-600 to-emerald-400" },
  ];

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold uppercase tracking-wider text-white sm:text-3xl">Dashboard</h1>
      <p className="mb-6 text-sm text-white/40 sm:mb-10">Welcome to the STM Events admin panel</p>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 transition-all duration-300 hover:border-purple-500/30 hover:bg-white/[0.05] sm:p-6"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">{stat.label}</p>
            <p className={`mt-2 bg-gradient-to-r ${stat.color} bg-clip-text text-3xl font-bold text-transparent sm:text-4xl`}>
              {stat.count}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8 sm:mt-12">
        <h2 className="mb-4 text-base font-bold uppercase tracking-wider text-white/80 sm:mb-6 sm:text-lg">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3">
          {[
            { label: "Add Event", href: "/admin/events/new" },
            { label: "Add DJ", href: "/admin/djs/new" },
            { label: "Add Gallery Item", href: "/admin/gallery/new" },
            { label: "Add Equipment", href: "/admin/equipment/new" },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-500/10 px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-purple-300 transition-all duration-200 hover:bg-purple-500/20 sm:px-5 sm:text-[12px]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
