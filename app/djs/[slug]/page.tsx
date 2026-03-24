export const revalidate = 30;
export const dynamicParams = true;

import { notFound } from "next/navigation";
import { getDJBySlug, getDJSlugs } from "@/lib/djs";
import DJDetailClient from "./DJDetailClient";

export async function generateStaticParams() {
  const slugs = await getDJSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dj = await getDJBySlug(slug);
  if (!dj) return { title: "DJ Not Found" };
  return {
    title: `${dj.name} — STM Events`,
    description: dj.bio || `${dj.name} — ${dj.genre}`,
  };
}

export default async function DJDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dj = await getDJBySlug(slug);
  if (!dj) notFound();
  return <DJDetailClient dj={dj} />;
}
