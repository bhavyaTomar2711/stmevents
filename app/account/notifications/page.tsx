"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  link: string | null;
  created_at: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setNotifications(data || []);
      setLoading(false);
    }
    load();
  }, []);

  const markAsRead = async (id: string) => {
    const supabase = createClient();
    await supabase.from("notifications").update({ read: true }).eq("id", id);
    setNotifications(notifications.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("notifications").update({ read: true }).eq("user_id", user.id).eq("read", false);
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const typeConfig: Record<string, { icon: string; gradient: string }> = {
    event: { icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", gradient: "from-purple-500 to-violet-500" },
    booking: { icon: "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z", gradient: "from-emerald-500 to-green-500" },
    rental: { icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10", gradient: "from-cyan-500 to-teal-500" },
    system: { icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", gradient: "from-amber-500 to-orange-500" },
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Notifications</h1>
          <p className="mt-1 text-sm text-white/40">{unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white/40 transition-all hover:bg-white/[0.07] hover:text-white/60"
          >
            Mark all read
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500/30 border-t-amber-500" />
        </div>
      ) : notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.02] py-16">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10">
            <svg className="h-8 w-8 text-amber-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <p className="mb-1 text-sm font-medium text-white/50">No notifications</p>
          <p className="text-[12px] text-white/25">You&apos;re all caught up!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => {
            const config = typeConfig[notif.type] || typeConfig.system;
            return (
              <div
                key={notif.id}
                className={`group flex gap-4 rounded-2xl border p-4 transition-all duration-300 sm:p-5 ${
                  notif.read
                    ? "border-white/[0.04] bg-white/[0.015]"
                    : "border-purple-500/15 bg-purple-500/[0.04]"
                }`}
              >
                <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${config.gradient} shadow-lg ${notif.read ? "opacity-40" : ""}`}>
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={config.icon} />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`text-[14px] font-semibold ${notif.read ? "text-white/40" : "text-white"}`}>{notif.title}</h3>
                    <span className="flex-shrink-0 text-[10px] text-white/20">
                      {new Date(notif.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className={`mt-1 text-[12px] ${notif.read ? "text-white/25" : "text-white/45"}`}>{notif.message}</p>
                  {!notif.read && (
                    <button
                      onClick={() => markAsRead(notif.id)}
                      className="mt-2.5 rounded-lg bg-purple-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-purple-400/70 transition-all hover:bg-purple-500/20 hover:text-purple-400"
                    >
                      Mark as read
                    </button>
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
