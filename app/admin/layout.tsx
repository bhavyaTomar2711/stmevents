import { createServerSupabase } from "@/lib/supabase/server";
import AdminShell from "./AdminShell";
import AdminLayoutRouter from "./AdminLayoutRouter";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  // Not logged in — render children without shell (login page)
  if (!user) {
    return <>{children}</>;
  }

  // Logged in — use client component to check if we're on login page
  return (
    <AdminLayoutRouter user={user}>
      {children}
    </AdminLayoutRouter>
  );
}
