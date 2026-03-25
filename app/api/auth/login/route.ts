import { createServerSupabase } from "@/lib/supabase/server";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return Response.json({ error: "Email and password are required" }, { status: 400 });
    }

    const supabase = await createServerSupabase();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return Response.json({ error: error.message }, { status: 401 });
    }

    const isAdmin = data.user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

    return Response.json({ user: data.user, isAdmin });
  } catch {
    return Response.json({ error: "Login failed" }, { status: 500 });
  }
}
