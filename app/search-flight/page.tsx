"use client";

import FlightResults from "@/components/FlightResults";
import FlightSortOptions from "@/components/FlightSortOptions";
import FlightAlternatives from "@/components/flights/FlightAlternatives";
import Footer from "@/components/layout/Footer";
import { useFlightContext } from "@/contexts/FlightContext";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function SearchFlightPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchFlightContent />
    </Suspense>
  );
}

function SearchFlightContent() {
  const { updateSearchParams, searchFlights, flights, loading } =
    useFlightContext();

  const urlSearchParams = useSearchParams();
  const from = urlSearchParams.get("from") || "";
  const to = urlSearchParams.get("to") || "";
  const departureDate = urlSearchParams.get("departureDate") || "";
  const returnDate = urlSearchParams.get("returnDate") || "";
  const passengers = urlSearchParams.get("passengers") || "1";
  const cabinClass = urlSearchParams.get("cabinClass") || "Economy";
  const tripType = urlSearchParams.get("tripType") || "OneWay";

  const extractedParams = {
    from,
    to,
    departureDate,
    returnDate,
    passengers,
    cabinClass,
    tripType,
  };
  useEffect(() => {
    // Create an async function and immediately invoke it
    (async () => {
      await searchFlights(extractedParams);
    })();
  }, [urlSearchParams]);

  const [formData, setFormData] = useState({
    from: from,
    to: to,
    departureDate: departureDate,
    returnDate: returnDate,
    passengers: passengers,
    cabinClass: cabinClass,
    tripType: tripType,
  });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-sky-50 to-white">
      <main className="flex-1 container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Flight Results</h1>
          <p className="text-gray-500 mt-2">
            {formData.from} to {formData.to} • {formData.departureDate}{" "}
            {formData.returnDate ? `- ${formData.returnDate}` : ""} •{" "}
            {formData.passengers} passenger
            {parseInt(formData.passengers) > 1 ? "s" : ""} •{" "}
            {formData.cabinClass.charAt(0).toUpperCase() +
              formData.cabinClass.slice(1)}
          </p>
        </div>

        <div className="w-full">
          {/* Main content with sorting and results */}
          <div>
            {/* Only show alternatives, not insights */}
            {!loading && (
              <>
                <FlightAlternatives from={formData.from} to={formData.to} />
              </>
            )}

            <FlightSortOptions />
            <FlightResults
              loading={loading}
              from={formData.from}
              to={formData.to}
              departure_date={formData.departureDate}
              return_date={formData.returnDate}
              passengers={formData.passengers}
              cabin_class={formData.cabinClass}
              trip_type={formData.tripType}
              flights={flights}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
