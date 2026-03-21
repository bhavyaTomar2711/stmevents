export const revalidate = 30; // revalidate every 30 seconds

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import UpcomingEvents from "./components/UpcomingEvents";
import GallerySection from "./components/GallerySection";
import ServicesSection from "./components/ServicesSection";
import AboutSection from "./components/AboutSection";
import ResidentDJs from "./components/ResidentDJs";
import EquipmentRental from "./components/EquipmentRental";
import ContactSection from "./components/ContactSection";
import StatsBar from "./components/StatsBar";
import { getFeaturedEvents } from "@/lib/events";
import { getFeaturedGallery } from "@/lib/gallery";
import { getResidentDJs } from "@/lib/djs";
import { getFeaturedEquipment } from "@/lib/equipment";

export default async function Home() {
  const [featuredEvents, galleryItems, residentDJs, featuredEquipment] =
    await Promise.all([
      getFeaturedEvents(4),
      getFeaturedGallery(6),
      getResidentDJs(),
      getFeaturedEquipment(6),
    ]);

  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <UpcomingEvents events={featuredEvents} />
      <GallerySection items={galleryItems} />
      <ResidentDJs djs={residentDJs} />
      <ServicesSection />
      <EquipmentRental equipment={featuredEquipment} />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
