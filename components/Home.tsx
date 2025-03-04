import CTASection from "@/components/layout/CTASection";
import FeaturedDestinations from "@/components/layout/FeaturedDestinations";
import FeaturesBenefits from "@/components/layout/FeaturesBenefits";
import FlightSearch from "@/components/layout/FlightSearch";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/layout/HeroSection";
import SpecialOffers from "@/components/layout/SpecialOffers";
import Testimonials from "@/components/layout/Testimonials";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-sky-50 to-white">
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
