export const revalidate = 30;

import type { Metadata } from "next";
import { getAllEquipment } from "@/lib/equipment";
import EquipmentPageClient from "./EquipmentPageClient";

export const metadata: Metadata = {
  title: "Equipment Rental | STM Events",
  description: "Professional DJ and event equipment available for rent.",
};

export default async function EquipmentPage() {
  const equipment = await getAllEquipment();
  return <EquipmentPageClient equipment={equipment} />;
}
