"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { useFlightApi } from "@/hooks/useFlightApi";

// Context type definition
interface FlightContextType {
  // Search state
  searchParams: SearchParams;
  updateSearchParams: (params: SearchParams) => void;

  // Flight results
  flights: any[];
  loading: boolean;
  error: string | null;

  // Cities for dropdowns
  originCities: any[];
  destinationCities: any[];

  // API functions
  searchFlights: (params?: SearchParams) => Promise<any>;
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

// Define booking data interface
export interface BookingData {
  flightId: string;
  from: string;
  to: string;
  tripType: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass: string;
  passengerDetails: {
    fullName: string;
    phoneNumber: string;
    idNumber: string;
  }[];
  paymentDetails: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    nameOnCard: string;
  };
  [key: string]: any; // Allow for additional properties
}

// Near the top of the file, add this interface:
export interface SearchParams {
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  passengers: string;
  cabinClass: string;
  tripType: string;
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
  const [flights, setFlights] = useState([]);
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

  // Use the API hook
  const flightApi = useFlightApi();

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

  // Search flights with current params
  const searchFlights = async (params?: SearchParams) => {
    const searchData = params || searchParams;
    const results = await apiSearchFlights(searchData);
    setFlights(results);
    return results;
  };

  // Book selected flight
  const bookFlight = async (data: BookingData) => {
    const bookingResult = await apiBookFlight(data);
    // await refreshUserBookings();
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
