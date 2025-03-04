"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FlightResults from "@/components/FlightResults";
import FlightFilters from "@/components/FlightFilters";
import FlightSortOptions from "@/components/FlightSortOptions";
import FlightAlternatives from "@/components/flights/FlightAlternatives";

export default function SearchFlightPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  // Get search parameters from URL
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const departureDate = searchParams.get("departureDate") || "";
  const returnDate = searchParams.get("returnDate") || "";
  const passengers = searchParams.get("passengers") || "1";
  const cabinClass = searchParams.get("class") || "economy";
  const tripType = searchParams.get("tripType") || "roundTrip";

  // Simulating loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-sky-50 to-white">
      <Toaster position="bottom-center" />
      <Navigation />

      <main className="flex-1 container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Flight Results</h1>
          <p className="text-gray-500 mt-2">
            {from} to {to} • {departureDate}{" "}
            {returnDate ? `- ${returnDate}` : ""} • {passengers} passenger
            {parseInt(passengers) > 1 ? "s" : ""} •{" "}
            {cabinClass.charAt(0).toUpperCase() + cabinClass.slice(1)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with filters */}
          <div className="lg:col-span-1">
            <FlightFilters />
          </div>

          {/* Main content with sorting and results */}
          <div className="lg:col-span-3">
            {/* Only show alternatives, not insights */}
            {!loading && (
              <>
                <FlightAlternatives from={from} to={to} />
              </>
            )}

            <FlightSortOptions />
            <FlightResults
              loading={loading}
              from={from}
              to={to}
              departureDate={departureDate}
              returnDate={returnDate}
              passengers={passengers}
              cabinClass={cabinClass}
              tripType={tripType}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
