"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface Offer {
  image: string;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  code: string;
}

interface SpecialOffersProps {
  offers?: Offer[];
}

export default function SpecialOffers({
  offers = [
    {
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=700",
      badge: "Limited Time",
      badgeColor: "bg-red-500",
      title: "Summer Beach Getaway",
      description:
        "Enjoy 25% off on flights to top beach destinations this summer.",
      code: "SUMMER25",
    },
    {
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=700",
      badge: "Weekend Special",
      badgeColor: "bg-blue-500",
      title: "City Break Deals",
      description: "Explore popular cities with our weekend flash sale prices.",
      code: "CITY20",
    },
  ],
}: SpecialOffersProps) {
  return (
    <section className="bg-blue-50 py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Special Offers
            </h2>
            <p className="text-gray-500 mt-2">
              Limited-time deals you don&apos;t want to miss
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0">
            View all offers <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map((offer, index) => (
            <Card key={index} className="border-none shadow-md overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div
                  className="h-48 md:h-auto md:w-2/5 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${offer.image})`,
                  }}
                />
                <div className="p-6 md:w-3/5">
                  <Badge className={`mb-2 ${offer.badgeColor}`}>
                    {offer.badge}
                  </Badge>
                  <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                  <p className="text-gray-600 mb-4">{offer.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-sm">
                      Use code: <span className="font-bold">{offer.code}</span>
                    </p>
                    <Button size="sm">Book Now</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
