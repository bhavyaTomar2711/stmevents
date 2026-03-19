import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import UpcomingEvents from "./components/UpcomingEvents";
import GallerySection from "./components/GallerySection";
import ServicesSection from "./components/ServicesSection";
import AboutSection from "./components/AboutSection";
import ResidentDJs from "./components/ResidentDJs";
import EquipmentRental from "./components/EquipmentRental";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <UpcomingEvents />
      <GallerySection />
      <ResidentDJs />
      <ServicesSection />
      <EquipmentRental />
      <AboutSection />
      <div id="contact" />
    </main>
  );
}
