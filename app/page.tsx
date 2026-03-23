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
import { getAllEvents, getNextEvent } from "@/lib/events";
import { getAllDJs } from "@/lib/djs";
import { getFeaturedGallery } from "@/lib/gallery";
import { getFeaturedEquipment } from "@/lib/equipment";

export default async function Home() {
  const [nextEvent, allEvents, galleryItems, allDJs, featuredEquipment] =
    await Promise.all([
      getNextEvent(),
      getAllEvents(),
      getFeaturedGallery(6),
      getAllDJs(),
      getFeaturedEquipment(6),
    ]);

  return (
    <main className="relative">
      <Navbar />
      <HeroSection nextEvent={nextEvent} />
      <StatsBar />
      <UpcomingEvents events={allEvents} />
      <GallerySection items={galleryItems} />
      <ResidentDJs djs={allDJs} />
      <ServicesSection />
      <EquipmentRental equipment={featuredEquipment} />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
