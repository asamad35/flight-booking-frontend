export interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  airlineLogo: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
  departureDate: string;
  duration: string;
  durationMinutes: number;
  stops: number;
  stopLocations?: string[];
  price: number;
}

export interface FlightResultsProps {
  loading: boolean;
  from: string;
  to: string;
  departureDate: string;
  returnDate: string | null;
  passengers: string;
  cabinClass: string;
  tripType: string;
}
