import { createServerSupabase } from "@/lib/supabase/server";
import EquipmentForm from "../EquipmentForm";

export const dynamic = "force-dynamic";

export default async function EditEquipmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (id === "new") return <EquipmentForm />;

  const supabase = await createServerSupabase();
  const { data: item } = await supabase.from("equipment").select("*").eq("id", id).single();
  if (!item) return <p className="text-white/50">Equipment not found</p>;

  return <EquipmentForm item={item} />;
}
