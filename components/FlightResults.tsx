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

export default function FlightResults({
  loading,
  from,
  to,
  departureDate,
  returnDate,
  passengers,
  cabinClass,
  tripType,
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

  // Generate mock flights when component mounts
  useEffect(() => {
    if (!loading) {
      const generatedFlights = generateFlights(from, to, departureDate, 15);
      setAllFlights(generatedFlights);
    }
  }, [loading, from, to, departureDate]);

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

  // Listen for filter changes from FlightFilters
  useEffect(() => {
    const handleFilterChange = (e: CustomEvent) => {
      if (e.detail && e.detail.filters) {
        setFilters(e.detail.filters);
      }
    };

    window.addEventListener(
      "flightFiltersChanged",
      handleFilterChange as EventListener
    );

    return () => {
      window.removeEventListener(
        "flightFiltersChanged",
        handleFilterChange as EventListener
      );
    };
  }, []);

  // Apply filters and sorting whenever dependencies change
  useEffect(() => {
    if (allFlights.length > 0) {
      const filtered = applyFilters(allFlights, filters);
      const sorted = sortFlights(filtered, sortOption);
      setFilteredFlights(sorted);
    }
  }, [allFlights, filters, sortOption]);

  if (loading) {
    return <FlightSkeleton />;
  }

  if (filteredFlights.length === 0) {
    return <EmptyResults />;
  }

  return (
    <div className="space-y-4">
      {filteredFlights.map((flight) => (
        <FlightCard
          key={flight.id}
          flight={flight}
          passengerCount={parseInt(passengers)}
        />
      ))}
    </div>
  );
}
