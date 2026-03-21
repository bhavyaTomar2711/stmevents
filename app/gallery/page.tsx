export const revalidate = 30;

import { getAllGalleryItems } from "@/lib/gallery";
import GalleryPageClient from "./GalleryPageClient";

export const metadata = {
  title: "Gallery | STM Events",
  description: "Photos, videos, and moments from STM Events productions.",
};

export default async function GalleryPage() {
  const items = await getAllGalleryItems();
  return <GalleryPageClient items={items} />;
}
