export interface Flight {
  id: string;
  airline: string;
  airline_code: string;
  airline_logo: string;
  flight_number: string;
  departure_airport: string;
  arrival_airport: string;
  departure_time: string;
  arrival_time: string;
  departure_date: string;
  duration: string;
  duration_minutes: number;
  stops: number;
  stop_locations?: string[];
  price: number;
}

export interface FlightResultsProps {
  loading: boolean;
  from: string;
  to: string;
  departure_date: string;
  return_date: string | null;
  passengers: string;
  cabin_class: string;
  trip_type: string;
  flights?: Flight[];
}
