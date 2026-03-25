import { createServerSupabase } from "@/lib/supabase/server";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";

export async function GET() {
  try {
    const supabase = await createServerSupabase();
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      return Response.json({ user: null, isAdmin: false });
    }

    const isAdmin = data.user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
    return Response.json({ user: data.user, isAdmin });
  } catch {
    return Response.json({ user: null, isAdmin: false });
  }
}
