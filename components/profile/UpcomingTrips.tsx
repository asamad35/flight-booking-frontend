"use client";

import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Booking, UpcomingTripsProps } from "@/types/profile";

export default function UpcomingTrips({ trips }: UpcomingTripsProps) {
  console.log(trips, "upcoming trips");
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate days remaining
  const calculateDaysRemaining = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tripDate = new Date(dateString);
    tripDate.setHours(0, 0, 0, 0);

    const differenceInTime = tripDate.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    return differenceInDays;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Upcoming Trips
        </h2>

        {trips.length === 0 ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-gray-500 font-medium">No Upcoming Trips</h3>
            <p className="text-gray-400 text-sm mt-1">
              Book your next adventure today
            </p>
            <Button className="mt-4">Find Flights</Button>
          </div>
        ) : (
          <div className="space-y-6">
            {trips.map((trip) => {
              const daysRemaining = calculateDaysRemaining(trip.departure_date);
              return (
                <div
                  key={trip.id}
                  className="border rounded-lg p-5 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                        {trip.flight_number}
                      </span>
                      <h3 className="text-lg font-medium text-gray-800 mt-2">
                        {trip.from}{" "}
                        <ArrowRight className="inline h-4 w-4 mx-1" /> {trip.to}
                      </h3>
                      <div className="flex items-center mt-1 text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(trip.departure_date)}</span>
                      </div>
                    </div>

                    <div
                      className={`
                      flex items-center justify-center rounded-full h-14 w-14 
                      ${
                        daysRemaining <= 7
                          ? "bg-orange-50 text-orange-600"
                          : "bg-blue-50 text-blue-600"
                      }
                    `}
                    >
                      <div className="text-center">
                        <div className="text-lg font-bold leading-none">
                          {daysRemaining}
                        </div>
                        <div className="text-xs">days</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Manage Trip
                    </Button>
                    <Button size="sm" className="flex-1">
                      Check In
                    </Button>
                  </div>

                  <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm text-gray-600">Departure</div>
                        <div className="text-sm font-medium">
                          {trip.departure_time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm text-gray-600">Arrival</div>
                        <div className="text-sm font-medium">
                          {trip.arrival_time}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
