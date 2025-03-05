// Common interface definitions for profile components

export interface UserProfile {
  id: string;
  email: string;
  avatar_url?: string;
  created_at?: string;
  full_name?: string;
}

export interface PassengerDetail {
  fullName: string;
  idNumber: string;
  phoneNumber: string;
}

export interface PaymentDetail {
  cvv: string;
  cardNumber: string;
  expiryDate: string;
  nameOnCard: string;
}

export interface FlightDetail {
  id: string;
  price: number;
  stops: number;
  airline: string;
  duration: string;
  destination: string;
  airline_code: string;
  airline_logo: string;
  arrival_time: string;
  flight_number: string;
  departure_date: string;
  departure_time: string;
  stop_locations: string[];
  arrival_airport: string;
  duration_minutes: number;
  departure_airport: string;
}

export interface Booking {
  id: string;
  booking_id: string;
  user_id: string;
  flight_id: string;
  booking_date: string;
  departure_date: string;
  total_price: number;
  from: string;
  to: string;
  departure_time: string;
  arrival_time: string;
  duration: string;
  stops: number;
  airline: string;
  flight_number: string;
  cabin_class: string;
  trip_type: string;
  passengers: number;
  price: number;
  created_at: string;
  status: string;
  passenger_details: PassengerDetail[];
  flight_details: FlightDetail;
  payment_details: PaymentDetail;
  return_flight_id: string | null;
  return_departure_date: string | null;
  return_departure_time: string | null;
  return_arrival_time: string | null;
}

// Props interfaces for components
export interface ProfileHeaderProps {
  user: UserProfile;
  bookings: Booking[];
}

export interface UserInfoCardProps {
  user: UserProfile;
}

export interface TravelHistoryProps {
  trips: Booking[];
}

export interface UpcomingTripsProps {
  trips: Booking[];
}

export interface ProfileClientContainerProps {
  profile: UserProfile;
  bookings: Booking[];
}
