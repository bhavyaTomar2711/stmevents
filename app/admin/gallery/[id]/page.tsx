import { createServerSupabase } from "@/lib/supabase/server";
import GalleryForm from "../GalleryForm";

export const dynamic = "force-dynamic";

export default async function EditGalleryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (id === "new") return <GalleryForm />;

  const supabase = await createServerSupabase();
  const { data: item } = await supabase.from("gallery").select("*").eq("id", id).single();
  if (!item) return <p className="text-white/50">Item not found</p>;

  return <GalleryForm item={item} />;
}
