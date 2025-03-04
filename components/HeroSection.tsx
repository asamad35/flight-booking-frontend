"use client";

import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1536226351486-8aa640c8b9f1?q=80&w=2000')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.6,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900/70 to-transparent" />

      <div className="container relative z-10 py-20 md:py-32">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Discover the World with SkyWings
          </h1>
          <p className="mt-6 text-lg text-white/90">
            Find and book your perfect flight to destinations worldwide. Best
            prices and exclusive deals available.
          </p>
          <div className="mt-8 flex gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Book Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white bg-blue-600/30 hover:bg-white hover:text-blue-600"
            >
              View Offers
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
