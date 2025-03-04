"use client";

import { useState, useEffect } from "react";
import { Flight, FlightResultsProps } from "@/types/flight";
import { FlightFilterState } from "./FlightFilters";
import {
  generateFlights,
  applyFilters,
  sortFlights,
} from "./flights/FlightUtils";
import FlightSkeleton from "./flights/FlightSkeleton";
import EmptyResults from "./flights/EmptyResults";
import FlightCard from "./flights/FlightCard";
import FlightFilters from "./FlightFilters";

export default function FlightResults({
  loading,
  from,
  to,
  departureDate,
  returnDate,
  passengers,
  cabinClass,
  tripType,
  flights: propFlights,
}: FlightResultsProps) {
  const [allFlights, setAllFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [sortOption, setSortOption] = useState<string>("price_asc");
  const [filters, setFilters] = useState<FlightFilterState>({
    priceRange: [0, 2000],
    stops: {
      direct: true,
      oneStop: true,
      multiStop: true,
    },
    airlines: {
      delta: true,
      united: true,
      american: true,
      spirit: true,
      jetBlue: true,
    },
    departureTime: {
      morning: true,
      afternoon: true,
      evening: true,
    },
  });

  // Extract price range and airlines for filter initializations
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [availableAirlines, setAvailableAirlines] = useState<
    Record<string, boolean>
  >({});

  // Generate dynamic filters based on available flights
  const generateDynamicFilters = (flights: Flight[]) => {
    if (!flights.length) return;

    // Extract price range
    const prices = flights.map((flight) => flight.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // Extract unique airlines
    const airlinesObject: Record<string, boolean> = {};
    flights.forEach((flight) => {
      airlinesObject[flight.airline.toLowerCase()] = true;
    });

    // Update filters and metadata
    setFilters((prev) => ({
      ...prev,
      priceRange: [minPrice, maxPrice],
      airlines: airlinesObject,
    }));
    setPriceRange([minPrice, maxPrice]);
    setAvailableAirlines(airlinesObject);
  };

  // Use flights from props if available, otherwise generate mock flights
  useEffect(() => {
    if (!loading) {
      let flightsToUse: Flight[] = [];

      if (propFlights && propFlights.length > 0) {
        flightsToUse = propFlights;
      } else {
        flightsToUse = generateFlights(from, to, departureDate, 15);
      }

      setAllFlights(flightsToUse);
      generateDynamicFilters(flightsToUse);
    }
  }, [loading, from, to, departureDate, propFlights]);

  // Listen for sort option changes from FlightSortOptions
  useEffect(() => {
    const handleSortChange = (e: CustomEvent) => {
      if (e.detail && e.detail.sortOption) {
        setSortOption(e.detail.sortOption);
      }
    };

    window.addEventListener(
      "flightSortChanged",
      handleSortChange as EventListener
    );

    return () => {
      window.removeEventListener(
        "flightSortChanged",
        handleSortChange as EventListener
      );
    };
  }, []);

  // Handle filter changes from FlightFilters component
  const handleFilterChange = (newFilters: FlightFilterState) => {
    setFilters(newFilters);
  };

  // Apply filters and sorting to flights
  useEffect(() => {
    if (allFlights.length > 0) {
      let filtered = applyFilters(allFlights, filters);
      filtered = sortFlights(filtered, sortOption);
      setFilteredFlights(filtered);
    }
  }, [allFlights, filters, sortOption]);

  if (loading) {
    return <FlightSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-1">
        <FlightFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          availableAirlines={availableAirlines}
          priceRange={priceRange}
        />
      </div>
      {filteredFlights.length === 0 && (
        <div className="md:col-span-2 space-y-4">
          <EmptyResults />
        </div>
      )}
      {filteredFlights.length > 0 && (
        <div className="md:col-span-2 space-y-4">
          {filteredFlights.map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              passengerCount={parseInt(passengers)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
