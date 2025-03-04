"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Flight } from "@/types/flight";
import BookingModal from "./BookingModal";

interface FlightCardProps {
  flight: Flight;
  passengerCount: number;
}

export default function FlightCard({
  flight,
  passengerCount,
}: FlightCardProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-gray-200 p-3 rounded-md mr-4">
              <span className="font-bold">{flight.airlineCode}</span>
            </div>
            <div>
              <p className="font-bold">{flight.airline}</p>
              <p className="text-sm text-gray-500">{flight.flightNumber}</p>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-center flex-1 md:px-4">
            <div className="text-center">
              <p className="text-xl font-bold">{flight.departureTime}</p>
              <p className="text-sm">{flight.departureAirport}</p>
            </div>

            <div className="flex flex-col items-center mx-4">
              <p className="text-xs text-gray-500 mb-1">{flight.duration}</p>
              <div className="relative w-24 md:w-32">
                <div className="border-t-2 border-gray-300 absolute w-full top-1/2"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {flight.stops === 0
                  ? "Direct"
                  : `${flight.stops} ${flight.stops === 1 ? "Stop" : "Stops"}`}
              </p>
            </div>

            <div className="text-center">
              <p className="text-xl font-bold">{flight.arrivalTime}</p>
              <p className="text-sm">{flight.arrivalAirport}</p>
            </div>
          </div>

          <div className="mt-4 md:mt-0 md:ml-4 text-center">
            <p className="text-2xl font-bold text-blue-600">${flight.price}</p>
            <p className="text-sm text-gray-500">per passenger</p>
            <Button
              className="mt-2 w-full bg-blue-600 hover:bg-blue-700"
              variant="default"
              onClick={() => setIsBookingModalOpen(true)}
            >
              Select
            </Button>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        flight={flight}
        passengerCount={passengerCount}
      />
    </>
  );
}
