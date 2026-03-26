import { createServerSupabase } from "@/lib/supabase/server";
import { NextRequest } from "next/server";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";

async function getAdminUser() {
  try {
    const supabase = await createServerSupabase();
    const { data } = await supabase.auth.getUser();
    if (data.user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      return { supabase, user: data.user };
    }
  } catch { /* stale token */ }
  return null;
}

// GET - read all or by section
export async function GET(request: NextRequest) {
  const section = request.nextUrl.searchParams.get("section");

  try {
    const supabase = await createServerSupabase();
    let query = supabase.from("site_content").select("*");
    if (section) query = query.eq("section_id", section);
    const { data, error } = await query;
    if (error) throw error;
    return Response.json({ data: data || [] });
  } catch {
    return Response.json({ data: [] });
  }
}

// PUT - upsert a field (admin only)
export async function PUT(request: NextRequest) {
  const admin = await getAdminUser();
  if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { section_id, field_key, value_en, value_de } = await request.json();
    if (!section_id || !field_key) {
      return Response.json({ error: "section_id and field_key required" }, { status: 400 });
    }

    const { error } = await admin.supabase.from("site_content").upsert(
      {
        section_id,
        field_key,
        value_en: value_en || "",
        value_de: value_de || "",
        updated_at: new Date().toISOString(),
        updated_by: admin.user.email,
      },
      { onConflict: "section_id,field_key" }
    );

    if (error) throw error;
    return Response.json({ success: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Save failed";
    return Response.json({ error: msg }, { status: 500 });
  }
}

// DELETE - restore defaults (admin only)
export async function DELETE(request: NextRequest) {
  const admin = await getAdminUser();
  if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const section = request.nextUrl.searchParams.get("section");
  if (!section) return Response.json({ error: "section required" }, { status: 400 });

  try {
    const { error } = await admin.supabase
      .from("site_content")
      .delete()
      .eq("section_id", section);
    if (error) throw error;
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Delete failed" }, { status: 500 });
  }
}
