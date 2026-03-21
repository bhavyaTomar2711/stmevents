export const revalidate = 30;

import { getAllEquipment } from "@/lib/equipment";
import EquipmentPageClient from "./EquipmentPageClient";

export default async function EquipmentPage() {
  const equipment = await getAllEquipment();
  return <EquipmentPageClient equipment={equipment} />;
}
