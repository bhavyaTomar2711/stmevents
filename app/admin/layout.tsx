import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminShell from "./AdminShell";
import AdminLayoutRouter from "./AdminLayoutRouter";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let user = null;
  try {
    const supabase = await createServerSupabase();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    // Invalid or expired token — treat as logged out
  }

  // Not logged in — redirect to the single login page
  if (!user) {
    // Allow the /admin/login page to render (it will redirect client-side)
    // But for all other admin pages, redirect to login
    return <>{children}</>;
  }

  // Logged in but NOT admin — block access, redirect to user account
  const isAdmin = user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
  if (!isAdmin) {
    redirect("/account");
  }

  // Admin user — render with shell
  return (
    <AdminLayoutRouter user={user}>
      {children}
    </AdminLayoutRouter>
  );
}
