"use client";

import { Toaster } from "react-hot-toast";
import Home from "@/components/Home";
import FlightSearch from "@/components/FlightSearch";
import HeroSection from "@/components/HeroSection";

export default function App() {
  return (
    <main>
      <Toaster position="bottom-center" />
      <Home />
      <HeroSection />

      <FlightSearch />
    </main>
  );
}
