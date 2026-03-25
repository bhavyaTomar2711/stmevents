"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminShell from "./AdminShell";
import type { User } from "@supabase/supabase-js";

export default function AdminLayoutRouter({ children, user }: { children: React.ReactNode; user: User }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  // If logged in admin and on login page, redirect to dashboard
  useEffect(() => {
    if (isLoginPage && user) {
      router.replace("/admin");
    }
  }, [isLoginPage, user, router]);

  // Don't show shell on login page
  if (isLoginPage) {
    return <>{children}</>;
  }

  return <AdminShell user={user}>{children}</AdminShell>;
}
