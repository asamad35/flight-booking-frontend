"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface Destination {
  name: string;
  country: string;
  image: string;
  price: number;
}

interface FeaturedDestinationsProps {
  destinations?: Destination[];
}

export default function FeaturedDestinations({
  destinations = [
    {
      name: "Paris",
      country: "France",
      image:
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=700",
      price: 299,
    },
    {
      name: "New York",
      country: "United States",
      image:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=700",
      price: 449,
    },
    {
      name: "Tokyo",
      country: "Japan",
      image:
        "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=700",
      price: 599,
    },
  ],
}: FeaturedDestinationsProps) {
  return (
    <section className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Popular Destinations
          </h2>
          <p className="text-gray-500 mt-2">
            Explore our most booked destinations
          </p>
        </div>
        <Button variant="ghost" className="mt-4 md:mt-0">
          View all destinations <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination, index) => (
          <Card key={index} className="group overflow-hidden">
            <div className="relative h-48 w-full overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundImage: `url(${destination.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-semibold text-white">
                  {destination.name}
                </h3>
                <p className="text-white/80 text-sm">{destination.country}</p>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Starting from</p>
                  <p className="text-xl font-bold">${destination.price}</p>
                </div>
                <Button size="sm">Explore</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
