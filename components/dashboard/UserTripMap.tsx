"use client";

import { Globe } from "lucide-react";

interface Booking {
  id: string;
  from: string;
  to: string;
  date: string;
  status: "completed" | "upcoming" | "cancelled";
  amount: number;
  flightNumber: string;
}

interface UserTripMapProps {
  bookings: Booking[];
}

export default function UserTripMap({ bookings }: UserTripMapProps) {
  // In a real application, you would use a mapping library like react-map-gl, mapbox, or google maps
  // Here, we'll create a simplified visual representation

  // Get unique locations from bookings
  const locations = new Set<string>();
  bookings.forEach((booking) => {
    locations.add(booking.from);
    locations.add(booking.to);
  });

  return (
    <div className="relative">
      {/* Placeholder for an actual map */}
      <div className="h-52 bg-blue-50 rounded-lg flex items-center justify-center">
        <div className="text-center p-4">
          <Globe className="h-10 w-10 text-blue-500 mx-auto mb-2" />
          <p className="text-sm text-gray-600">
            {locations.size} unique destinations visited
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Map visualization would appear here
          </p>
        </div>
      </div>

      {/* Flight route indicators */}
      <div className="mt-4 text-xs text-gray-600">
        <p className="mb-2 font-medium">Recent Routes:</p>
        <div className="space-y-2">
          {bookings.slice(0, 3).map((booking) => (
            <div key={booking.id} className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
              <span>
                {booking.from} → {booking.to}
                <span className="ml-2 text-gray-400">
                  (
                  {new Date(booking.date).toLocaleDateString(undefined, {
                    month: "short",
                    year: "numeric",
                  })}
                  )
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
