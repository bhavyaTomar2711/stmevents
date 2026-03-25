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
    { label: "Total Events", count: events, href: "/admin/events", gradient: "from-purple-600 via-purple-500 to-violet-500", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", trend: "+12%" },
    { label: "Gallery Items", count: gallery, href: "/admin/gallery", gradient: "from-cyan-600 via-cyan-500 to-teal-500", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z", trend: "+5%" },
    { label: "Equipment", count: equipment, href: "/admin/equipment", gradient: "from-emerald-600 via-emerald-500 to-green-500", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z", trend: "+3%" },
    { label: "Resident DJs", count: djs, href: "/admin/djs", gradient: "from-pink-600 via-pink-500 to-rose-500", icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z", trend: "+2%" },
    { label: "Messages", count: newInquiries, href: "/admin/inquiries", gradient: "from-red-600 via-red-500 to-orange-500", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", trend: "new" },
  ];

  const quickActions = [
    { label: "Create Event", desc: "Add a new event to the calendar", href: "/admin/events/new", gradient: "from-purple-600 to-violet-600", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { label: "Add Equipment", desc: "List new equipment for rental", href: "/admin/equipment/new", gradient: "from-emerald-600 to-green-600", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35" },
    { label: "Upload Media", desc: "Add photos or videos to gallery", href: "/admin/gallery/new", gradient: "from-cyan-600 to-teal-600", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" },
  ];

  const managementLinks = [
    { label: "Events", desc: "Manage all events and schedules", href: "/admin/events", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", color: "purple" },
    { label: "Equipment", desc: "Manage equipment inventory", href: "/admin/equipment", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37", color: "emerald" },
    { label: "Gallery", desc: "Manage media and content", href: "/admin/gallery", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z", color: "cyan" },
    { label: "Resident DJs", desc: "Manage DJ profiles", href: "/admin/djs", icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z", color: "pink" },
    { label: "Contact Submissions", desc: "View and manage form submissions", href: "/admin/inquiries", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", color: "amber" },
  ];

  const mIconColors: Record<string, string> = {
    purple: "bg-purple-500/15 text-purple-400",
    emerald: "bg-emerald-500/15 text-emerald-400",
    cyan: "bg-cyan-500/15 text-cyan-400",
    pink: "bg-pink-500/15 text-pink-400",
    amber: "bg-amber-500/15 text-amber-400",
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Dashboard</h1>
        <p className="mt-1 text-sm text-white/40">Welcome back! Here&apos;s what&apos;s happening with your platform.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05]"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                </svg>
              </div>
              <span className="text-[10px] font-medium text-emerald-400/60">
                <svg className="mr-0.5 inline h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                {stat.trend}
              </span>
            </div>
            <p className="text-3xl font-bold text-white">{stat.count}</p>
            <p className="mt-0.5 text-[11px] font-medium text-white/35">{stat.label}</p>
            {/* Glow effect on hover */}
            <div className={`pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br ${stat.gradient} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20`} />
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-10">
        <h2 className="mb-4 text-lg font-bold text-white">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${action.gradient} p-5 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10`}
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={action.icon} />
                </svg>
              </div>
              <h3 className="text-[15px] font-bold text-white">{action.label}</h3>
              <p className="mt-0.5 text-[12px] text-white/60">{action.desc}</p>
              {/* Shine effect */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>

      {/* Management */}
      <div className="mt-10">
        <h2 className="mb-4 text-lg font-bold text-white">Management</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {managementLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
            >
              <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${mIconColors[item.color]}`}>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[14px] font-semibold text-white">{item.label}</h3>
                <p className="text-[12px] text-white/35">{item.desc}</p>
              </div>
              <svg className="h-5 w-5 flex-shrink-0 text-white/15 transition-all duration-200 group-hover:translate-x-1 group-hover:text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
