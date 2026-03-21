export const revalidate = 30;

import { getAllDJs } from "@/lib/djs";
import DJsPageClient from "./DJsPageClient";

export default async function DJsPage() {
  const djs = await getAllDJs();
  return <DJsPageClient djs={djs} />;
}
