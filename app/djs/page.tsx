export const revalidate = 30;

import type { Metadata } from "next";
import { getAllDJs } from "@/lib/djs";
import DJsPageClient from "./DJsPageClient";

export const metadata: Metadata = {
  title: "DJs & Artists | STM Events",
  description: "Meet the resident DJs and artists of STM Events.",
};

export default async function DJsPage() {
  const djs = await getAllDJs();
  return <DJsPageClient djs={djs} />;
}
