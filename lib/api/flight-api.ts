"use client";

import axios, { InternalAxiosRequestConfig } from "axios";
import { SearchParams, BookingData } from "@/types/flight";
import { extractSupabaseSession } from "../utils";
import { getFlights } from "@/utils/indexedDB";

// Configure base API
const API_URL =
  process.env.NEXT_PUBLIC_API_URL + "/api" || "http://localhost:3333/api";
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth interceptor to include JWT token in requests
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== "undefined") {
    // Extract token from cookies instead of localStorage
    const cookies = document.cookie.split(";");
    const token = extractSupabaseSession(cookies);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Flight API endpoints
export const flightApi = {
  // 1. Get origin and destination cities (Indian airports)
  getOriginCities: async () => {
    const response = await api.get("/flights/cities/origin");
    return response.data.cities;
  },

  getDestinationCities: async () => {
    const response = await api.get("/flights/cities/destination");
    return response.data.cities;
  },

  // 2. Search flights with all filters
  searchFlights: async (searchParams: SearchParams) => {
    try {
      // throw new Error("test");
      const response = await api.get("/flights", { params: searchParams });
      return response.data.flights;
    } catch (error) {
      console.error(
        "Flight API search failed, attempting IndexedDB fallback",
        error
      );
      // Try to use IndexedDB as fallback
      try {
        // Only attempt IndexedDB fallback in the browser environment
        if (typeof window !== "undefined" && window.indexedDB) {
          const offlineFlights = await getFlights(searchParams);
          if (offlineFlights && offlineFlights.length > 0) {
            console.log("Using IndexedDB fallback data");
            return offlineFlights;
          }
        }
      } catch (dbError) {
        console.error("IndexedDB fallback also failed", dbError);
      }

      // Re-throw the original error if IndexedDB fallback fails
      throw error;
    }
  },

  // 3. Book a flight with passenger details and payment info
  bookFlight: async (bookingData: BookingData) => {
    const response = await api.post("/flights/booking", bookingData);
    return response.data.booking;
  },

  // 4. Generate ticket for a booking
  generateTicket: async (bookingId: string) => {
    const response = await api.get(`/flights/bookings/${bookingId}/ticket`);
    return response.data.ticketDetails;
  },

  // 5. Get all user bookings for profile page
  getUserBookings: async () => {
    const response = await api.get("/flights/bookings");
    return response.data.bookings;
  },

  // Get specific booking details
  getBookingDetails: async (bookingId: string) => {
    const response = await api.get(`/flights/bookings/${bookingId}`);
    return response.data.booking;
  },

  // Get public flights (featured destinations)
  getPublicFlights: async () => {
    const response = await api.get("/flights/public");
    return response.data.flights;
  },
};
