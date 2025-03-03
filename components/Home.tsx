"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
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
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log({ user });
      setUser(user);
    };
    fetchUser();
  }, [supabase.auth]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-sky-50 to-white">
      <Navigation user={user} onUserChange={setUser} />

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
