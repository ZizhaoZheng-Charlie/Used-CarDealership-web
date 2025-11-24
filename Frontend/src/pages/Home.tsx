import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { SearchSection } from "@/components/SearchSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { VehicleListings } from "@/components/VehicleListings";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { getTestimonials, getVehicles } from "@/lib/api";
import { vehicles } from "@/lib/constants";

export function Home() {
  const [hasVehicles, setHasVehicles] = useState(false);
  const [hasTestimonials, setHasTestimonials] = useState(false);

  useEffect(() => {
    const checkData = async () => {
      // Check VehicleListings data (check both API and constants)
      const apiVehicles = await getVehicles();
      const hasApiVehicles = apiVehicles.length > 0;
      const hasConstantVehicles = vehicles.length > 0;
      setHasVehicles(hasApiVehicles || hasConstantVehicles);

      // Check TestimonialsCarousel data (needs 5-star reviews)
      const testimonials = await getTestimonials();
      const fiveStarTestimonials = testimonials.filter((t) => t.rating === 5);
      setHasTestimonials(fiveStarTestimonials.length > 0);
    };

    checkData();
  }, []);

  return (
    <>
      <SearchBar />
      <main className="flex-1">
        <SearchSection />
        <FeaturesSection />
        {hasVehicles && <VehicleListings />}
        {hasTestimonials && <TestimonialsCarousel />}
      </main>
    </>
  );
}
