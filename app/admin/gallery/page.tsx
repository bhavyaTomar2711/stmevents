import { createServerSupabase } from "@/lib/supabase/server";
import AdminGalleryClient from "./AdminGalleryClient";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const supabase = await createServerSupabase();
  const { data: items } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });

  return <AdminGalleryClient items={items ?? []} />;
}
