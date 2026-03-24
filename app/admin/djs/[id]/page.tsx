import { createServerSupabase } from "@/lib/supabase/server";
import DJForm from "../DJForm";

export const dynamic = "force-dynamic";

export default async function EditDJPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (id === "new") return <DJForm />;

  const supabase = await createServerSupabase();
  const { data: dj } = await supabase.from("djs").select("*").eq("id", id).single();
  if (!dj) return <p className="text-white/50">DJ not found</p>;

  return <DJForm dj={dj} />;
}
