"use client";

import axios, { InternalAxiosRequestConfig } from "axios";
import { SearchParams, BookingData } from "@/contexts/FlightContext";

// Configure base API
const API_URL =
  process.env.NEXT_PUBLIC_API_URL + "/api" || "http://localhost:3333/api";
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to extract and combine multi-part cookies
const extractSupabaseSession = () => {
  const cookies = document.cookie.split(";");
  try {
    // Find all auth token parts (they're likely named something like sb-<project>-auth-token.0, sb-<project>-auth-token.1)
    const authCookieParts = cookies
      .map((cookie) => cookie.trim())
      .filter((cookie) => cookie.includes("-auth-token"));

    if (authCookieParts.length === 0) return null;

    // Sort by part index and combine
    const sortedParts = authCookieParts.sort((a, b) => {
      const indexA = parseInt(a.split(".").pop() || "0");
      const indexB = parseInt(b.split(".").pop() || "0");
      return indexA - indexB;
    });

    // Extract and combine values
    let combinedValue = "";
    for (const part of sortedParts) {
      const value = part.substring(part.indexOf("=") + 1);
      combinedValue += decodeURIComponent(value);
    }

    // Parse the JSON and extract access_token
    const sessionData = JSON.parse(combinedValue);
    return sessionData.access_token;
  } catch (error) {
    console.error("Error extracting session:", error);
    return null;
  }
};

// Add auth interceptor to include JWT token in requests
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== "undefined") {
    // Extract token from cookies instead of localStorage

    const token = extractSupabaseSession();
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
    const response = await api.get("/flights", { params: searchParams });
    return response.data.flights;
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
