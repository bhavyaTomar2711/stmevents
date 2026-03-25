"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AccountShell from "./AccountShell";
import type { User } from "@supabase/supabase-js";

export default function AccountAuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isPublicPage = pathname === "/account/login" || pathname === "/account/reset-password";

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        // Admin user — always redirect to admin panel
        if (data.user && data.isAdmin) {
          router.replace("/admin");
          return;
        }

        setUser(data.user);

        // Logged in but on login page → go to dashboard
        if (data.user && pathname === "/account/login") {
          router.replace("/account");
          return;
        }

        // Not logged in and not on a public page → go to login
        if (!data.user && !isPublicPage) {
          router.replace("/account/login");
          return;
        }
      } catch {
        if (!isPublicPage) {
          router.replace("/account/login");
        }
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [isPublicPage, pathname, router]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a0f]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-500/30 border-t-purple-500" />
      </div>
    );
  }

  if (isPublicPage) {
    return <>{children}</>;
  }

  if (user) {
    return <AccountShell user={user}>{children}</AccountShell>;
  }

  return null;
}
