import { createServerSupabase } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();
    if (!email || !password) {
      return Response.json({ error: "Email and password are required" }, { status: 400 });
    }

    const supabase = await createServerSupabase();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name || "" } },
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    // Create user profile in profiles table
    if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        email: data.user.email,
        full_name: name || "",
      });
    }

    return Response.json({ user: data.user });
  } catch {
    return Response.json({ error: "Signup failed" }, { status: 500 });
  }
}
