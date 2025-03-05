"use client";

import { useState } from "react";
import { flightApi } from "@/lib/api/flight-api";
import { SearchParams, BookingData } from "@/types/flight";

// Define a type for API functions
type ApiFunction<T> = (...args: any[]) => Promise<T>;

export function useFlightApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generic API call handler with loading and error states
  const apiCall = async <T>(
    apiFunction: ApiFunction<T>,
    ...args: any[]
  ): Promise<T> => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunction(...args);
      setLoading(false);
      return result;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : typeof err === "object" && err !== null && "response" in err
          ? (err as any).response?.data?.message
          : "Something went wrong";

      setError(errorMessage);
      setLoading(false);
      throw err;
    }
  };

  // Expose all API methods with loading/error handling
  return {
    loading,
    error,
    getOriginCities: () => apiCall(flightApi.getOriginCities),
    getDestinationCities: () => apiCall(flightApi.getDestinationCities),
    searchFlights: (params?: SearchParams) =>
      apiCall(flightApi.searchFlights, params),
    bookFlight: (data: BookingData) => apiCall(flightApi.bookFlight, data),
    generateTicket: (bookingId: string) =>
      apiCall(flightApi.generateTicket, bookingId),
    getUserBookings: () => apiCall(flightApi.getUserBookings),
    getBookingDetails: (id: string) => apiCall(flightApi.getBookingDetails, id),
    getPublicFlights: () => apiCall(flightApi.getPublicFlights),
  };
}
