"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { useFlightApi } from "@/hooks/useFlightApi";
import {
  initializeDB,
  storeFlights,
  getFlights,
  hasFlightData,
} from "@/utils/indexedDB";
import { Flight, SearchParams, BookingData } from "@/types/flight";

// Context type definition
interface FlightContextType {
  // Search state
  searchParams: SearchParams;
  updateSearchParams: (params: SearchParams) => void;

  // Flight results
  flights: Flight[];
  loading: boolean;
  error: string | null;

  // Cities for dropdowns
  originCities: any[];
  destinationCities: any[];

  // API functions
  searchFlights: (params?: SearchParams) => Promise<Flight[]>;
  bookFlight: (data: BookingData) => Promise<any>;
  getUserBookings: () => Promise<any>;
  getBookingDetails: (id: string) => Promise<any>;
  generateTicket: (id: string) => Promise<any>;

  // Booking state
  selectedFlight: any;
  setSelectedFlight: (flight: any) => void;
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;

  // User bookings
  userBookings: any[];
  refreshUserBookings: () => Promise<void>;
}

// Create the context
const FlightContext = createContext<FlightContextType | undefined>(undefined);

// Provider component
export const FlightProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State
  const [searchParams, setSearchParams] = useState<SearchParams>({
    from: "",
    to: "",
    departureDate: "",
    passengers: "1",
    cabinClass: "Economy",
    tripType: "OneWay",
  });
  const [flights, setFlights] = useState<Flight[]>([]);
  const [originCities, setOriginCities] = useState([]);
  const [destinationCities, setDestinationCities] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [bookingData, setBookingData] = useState<BookingData>({
    flightId: "",
    from: "",
    to: "",
    tripType: "OneWay",
    departureDate: "",
    returnDate: "",
    passengers: 1,
    cabinClass: "Economy",
    passengerDetails: [],
    paymentDetails: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      nameOnCard: "",
    },
  });
  const [userBookings, setUserBookings] = useState([]);
  const [isIndexedDBInitialized, setIsIndexedDBInitialized] = useState(false);

  // Use the API hook
  const flightApi = useFlightApi();

  // Initialize IndexedDB and store dummy data if necessary
  useEffect(() => {
    const initIndexedDB = async () => {
      try {
        // Initialize IndexedDB
        await initializeDB();

        // Check if we already have data in IndexedDB
        const hasData = await hasFlightData();

        if (!hasData) {
          // Try to fetch real data first
          try {
            const results = await flightApi.searchFlights();

            if (results && results.length > 0) {
              await storeFlights(results);
            } else {
              // Store dummy data if no real data is available
              await storeDummyData();
            }
          } catch (error) {
            console.error(
              "Failed to fetch flight data for IndexedDB, using dummy data:",
              error
            );
            await storeDummyData();
          }
        }

        setIsIndexedDBInitialized(true);
      } catch (error) {
        console.error("IndexedDB initialization failed:", error);
      }
    };

    // Dummy data for offline fallback
    const storeDummyData = async () => {
      const dummyFlights = [
        {
          id: "FL0001",
          airline: "Air India",
          airline_code: "AI",
          airline_logo: "air-india-logo.png",
          flight_number: "AI288",
          departure_airport: "DEL",
          arrival_airport: "BOM",
          departure_time: "08:15",
          arrival_time: "09:16",
          departure_date: "2025-03-05",
          duration: "1h 1m",
          duration_minutes: 61,
          stops: 0,
          stop_locations: [],
          price: 5531,
          destination: "Mumbai",
        },
      ];

      await storeFlights(dummyFlights);
    };

    initIndexedDB();
  }, []);

  // Fetch origin and destination cities on component mount
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const [originData, destinationData] = await Promise.all([
          flightApi.getOriginCities(),
          flightApi.getDestinationCities(),
        ]);
        setOriginCities(originData);
        setDestinationCities(destinationData);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    };

    fetchCities();
  }, []);

  // Get API functions with loading/error states
  const {
    loading,
    error,
    getOriginCities,
    getDestinationCities,
    searchFlights: apiSearchFlights,
    bookFlight: apiBookFlight,
    getUserBookings: apiGetUserBookings,
    getBookingDetails: apiGetBookingDetails,
    generateTicket: apiGenerateTicket,
  } = useFlightApi();

  // Update search parameters
  const updateSearchParams = (params: SearchParams) => {
    setSearchParams((prev) => ({ ...prev, ...params }));
  };

  // Update booking data
  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  // Search flights with current params and use IndexedDB as fallback
  const searchFlights = async (params?: SearchParams) => {
    const searchData = params || searchParams;
    try {
      // First try to get data from API
      const results = await apiSearchFlights(searchData);
      setFlights(results);
      return results;
    } catch (error) {
      console.error("API search failed, using IndexedDB fallback:", error);

      try {
        // If API fails, try to get data from IndexedDB
        if (isIndexedDBInitialized) {
          const offlineResults = await getFlights(searchData);
          setFlights(offlineResults);
          return offlineResults;
        } else {
          throw new Error("IndexedDB not initialized");
        }
      } catch (dbError) {
        console.error("IndexedDB fallback failed:", dbError);
        // If both API and IndexedDB fail, return empty array
        setFlights([]);
        return [];
      }
    }
  };

  // Book selected flight
  const bookFlight = async (data: BookingData) => {
    const bookingResult = await apiBookFlight(data);
    return bookingResult;
  };

  // Refresh user bookings
  const refreshUserBookings = async () => {
    try {
      const bookings = await apiGetUserBookings();
      setUserBookings(bookings);
    } catch (error) {
      console.error("Failed to refresh bookings:", error);
    }
  };

  // Get booking details
  const getBookingDetails = async (id: string) => {
    return apiGetBookingDetails(id);
  };

  // Generate ticket
  const generateTicket = async (id: string) => {
    return apiGenerateTicket(id);
  };

  // Provide context value
  const value = {
    searchParams,
    updateSearchParams,
    flights,
    loading,
    error,
    originCities,
    destinationCities,
    searchFlights,
    bookFlight,
    getUserBookings: apiGetUserBookings,
    getBookingDetails,
    generateTicket,
    selectedFlight,
    setSelectedFlight,
    bookingData,
    updateBookingData,
    userBookings,
    refreshUserBookings,
  };

  return (
    <FlightContext.Provider value={value}>{children}</FlightContext.Provider>
  );
};

// Custom hook to use the flight context
export const useFlightContext = () => {
  const context = useContext(FlightContext);
  if (context === undefined) {
    throw new Error("useFlightContext must be used within a FlightProvider");
  }
  return context;
};
