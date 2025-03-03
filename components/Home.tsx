"use client";

import { useAppContext } from "@/contexts/AppContext";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FlightSearch from "@/components/FlightSearch";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import SpecialOffers from "@/components/SpecialOffers";
import FeaturesBenefits from "@/components/FeaturesBenefits";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  const { user, isLoading } = useAppContext();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-sky-50 to-white">
      <Navigation user={user} />

      <main className="flex-1">
        <HeroSection />
        <FlightSearch />
        <FeaturedDestinations />
        <SpecialOffers />
        <FeaturesBenefits />
        <Testimonials />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
