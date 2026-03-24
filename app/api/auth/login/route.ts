import { createServerSupabase } from "@/lib/supabase/server";

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

    return Response.json({ user: data.user });
  } catch {
    return Response.json({ error: "Login failed" }, { status: 500 });
  }
}
