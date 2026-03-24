export const revalidate = 30;
export const dynamicParams = true;

import { notFound } from "next/navigation";
import { getEquipmentBySlug, getEquipmentSlugs } from "@/lib/equipment";
import EquipmentDetailClient from "./EquipmentDetailClient";

export async function generateStaticParams() {
  const slugs = await getEquipmentSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getEquipmentBySlug(slug);
  if (!item) return { title: "Equipment Not Found" };
  return {
    title: `${item.name} — STM Events Equipment`,
    description: item.shortDescription,
  };
}

export default async function EquipmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getEquipmentBySlug(slug);
  if (!item) notFound();
  return <EquipmentDetailClient item={item} />;
}
