"use client";

import { Calendar, Plane } from "lucide-react";
import { Booking, TravelHistoryProps } from "@/types/profile";

export default function TravelHistory({ trips }: TravelHistoryProps) {
  console.log(trips, "trips");
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Travel History
        </h2>

        {trips.length === 0 ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Plane className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-gray-500 font-medium">No Travel History</h3>
            <p className="text-gray-400 text-sm mt-1">
              Your completed trips will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium text-gray-800">
                        {trip.from} to {trip.to}
                      </h3>
                      <span className="ml-3 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {trip.flight_number}
                      </span>
                    </div>
                    <div className="flex items-center mt-2 text-gray-500 text-sm">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{formatDate(trip.departure_date)}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-green-600 text-sm font-medium">
                      Completed
                    </div>
                    <button className="text-blue-600 text-sm hover:underline mt-1">
                      View Details
                    </button>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mr-2"></div>
                      <span className="text-sm text-gray-500">{trip.from}</span>
                    </div>
                    <div className="mx-2 border-t border-dashed w-8 h-0 border-gray-300"></div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-600 mr-2"></div>
                      <span className="text-sm text-gray-500">{trip.to}</span>
                    </div>
                  </div>
                  <div className="text-gray-400 text-xs">
                    Duration: {trip.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
