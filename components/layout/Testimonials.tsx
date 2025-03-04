"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  name: string;
  photo: string;
  text: string;
}

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

export default function Testimonials({
  testimonials = [
    {
      name: "Emily Johnson",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "Sky Wings made booking my international flight so easy. Their prices were the best I found, and customer service was excellent when I needed to make changes.",
    },
    {
      name: "David Chen",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "I've been using Sky Wings for business travel for years. Their user-friendly interface and reliable service keep me coming back. Highly recommended!",
    },
    {
      name: "Sophia Williams",
      photo: "https://randomuser.me/api/portraits/women/68.jpg",
      text: "The flexible booking options saved me when I had to reschedule my trip last minute. Sky Wings offers great protection plans that are actually worth it.",
    },
  ],
}: TestimonialsProps) {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
          What Our Customers Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  &quot;{testimonial.text}&quot;
                </p>
                <div className="flex items-center">
                  <Image
                    src={testimonial.photo}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">Verified Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
