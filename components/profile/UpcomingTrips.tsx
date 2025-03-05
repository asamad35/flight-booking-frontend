"use client";

import { useState } from "react";
import {
  ArrowRight,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  Ticket,
  User,
  CreditCard,
  Plane,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Booking, UpcomingTripsProps } from "@/types/profile";
import { TripType } from "@/enums";
import Link from "next/link";

export default function UpcomingTrips({ trips }: UpcomingTripsProps) {
  // State to track which trip cards are expanded
  const [expandedTrips, setExpandedTrips] = useState<Record<string, boolean>>(
    {}
  );

  // Toggle expanded state for a trip
  const toggleTripDetails = (tripId: string) => {
    setExpandedTrips((prev) => ({
      ...prev,
      [tripId]: !prev[tripId],
    }));
  };

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate days remaining
  const calculateDaysRemaining = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tripDate = new Date(dateString);
    tripDate.setHours(0, 0, 0, 0);

    const differenceInTime = tripDate.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    return differenceInDays;
  };

  // Format card number to show only last 4 digits
  const formatCardNumber = (cardNumber: string) => {
    return `•••• ${cardNumber.slice(-4)}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Upcoming Trips
        </h2>

        {trips.length === 0 ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-gray-500 font-medium">No Upcoming Trips</h3>
            <p className="text-gray-400 text-sm mt-1">
              Book your next adventure today
            </p>
            <Link href="/">
              <Button className="mt-4">Find Flights</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {trips.map((trip) => {
              const daysRemaining = calculateDaysRemaining(trip.departure_date);
              const isExpanded = expandedTrips[trip.id] || false;

              return (
                <div
                  key={trip.id}
                  className="border rounded-lg p-5 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                        {trip.flight_number}
                      </span>
                      {trip.trip_type === TripType.OneWay ? (
                        <h3 className="text-lg font-medium text-gray-800 mt-2">
                          {trip.from}{" "}
                          <ArrowRight className="inline h-4 w-4 mx-1" />{" "}
                          {trip.to}
                        </h3>
                      ) : (
                        <div className="mt-2">
                          <h3 className="text-lg font-medium text-gray-800">
                            {trip.from}{" "}
                            <ArrowRight className="inline h-4 w-4 mx-1" />{" "}
                            {trip.to}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <span className="text-xs bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded mr-1">
                              Return
                            </span>
                            {trip.to}{" "}
                            <ArrowRight className="inline h-3 w-3 mx-1" />{" "}
                            {trip.from}
                          </div>
                        </div>
                      )}
                      <div className="flex items-center mt-1 text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(trip.departure_date)}</span>
                      </div>
                    </div>

                    <div
                      className={`
                      flex items-center justify-center rounded-full h-14 w-14 
                      ${
                        daysRemaining <= 7
                          ? "bg-orange-50 text-orange-600"
                          : "bg-blue-50 text-blue-600"
                      }
                    `}
                    >
                      <div className="text-center">
                        <div className="text-lg font-bold leading-none">
                          {daysRemaining}
                        </div>
                        <div className="text-xs">days</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Manage Trip
                    </Button>
                    <Button size="sm" className="flex-1">
                      Check In
                    </Button>
                  </div>

                  {/* Trip Details Toggle Button */}
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={() => toggleTripDetails(trip.id)}
                      className="text-sm text-blue-600 hover:text-blue-800 inline-flex items-center px-4 py-2 rounded-full 
                        hover:bg-blue-50 transition-colors"
                    >
                      {isExpanded ? "Hide Details" : "View Trip Details"}
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 ml-1" />
                      ) : (
                        <ChevronDown className="h-4 w-4 ml-1" />
                      )}
                    </button>
                  </div>

                  {/* Expandable Trip Details Section */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-dashed animate-in fade-in duration-300">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-6">
                          {/* Booking Information */}
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-sm font-semibold text-gray-700 flex items-center mb-3">
                              <Ticket className="h-4 w-4 mr-2" /> Booking
                              Information
                            </h4>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div className="text-gray-500">Booking ID</div>
                              <div className="font-medium">
                                {trip.booking_id}
                              </div>
                              <div className="text-gray-500">Booking Date</div>
                              <div>{formatDate(trip.booking_date)}</div>
                              <div className="text-gray-500">Status</div>
                              <div>
                                <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                                  {trip.status}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Passenger Details */}
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-sm font-semibold text-gray-700 flex items-center mb-3">
                              <User className="h-4 w-4 mr-2" /> Passenger
                              Details
                            </h4>
                            {trip.passenger_details &&
                              trip.passenger_details.map((passenger, idx) => (
                                <div
                                  key={idx}
                                  className="grid grid-cols-2 gap-3 text-sm"
                                >
                                  <div className="text-gray-500">Name</div>
                                  <div className="font-medium">
                                    {passenger.fullName}
                                  </div>
                                  <div className="text-gray-500">ID Number</div>
                                  <div>{passenger.idNumber}</div>
                                  <div className="text-gray-500">Phone</div>
                                  <div>{passenger.phoneNumber}</div>
                                </div>
                              ))}
                          </div>

                          {/* Payment Information */}
                          {trip.payment_details && (
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="text-sm font-semibold text-gray-700 flex items-center mb-3">
                                <CreditCard className="h-4 w-4 mr-2" /> Payment
                                Information
                              </h4>
                              <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="text-gray-500">Card</div>
                                <div>
                                  {formatCardNumber(
                                    trip.payment_details.cardNumber
                                  )}
                                </div>
                                <div className="text-gray-500">
                                  Name on Card
                                </div>
                                <div>{trip.payment_details.nameOnCard}</div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                          {/* Flight Details */}
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-sm font-semibold text-gray-700 flex items-center mb-3">
                              <Plane className="h-4 w-4 mr-2" /> Flight Details
                            </h4>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div className="text-gray-500">Airline</div>
                              <div className="font-medium">{trip.airline}</div>
                              <div className="text-gray-500">Flight Number</div>
                              <div>{trip.flight_number}</div>
                              <div className="text-gray-500">Cabin Class</div>
                              <div>{trip.cabin_class}</div>
                              <div className="text-gray-500">Trip Type</div>
                              <div>{trip.trip_type}</div>

                              {/* Direction information */}
                              {trip.trip_type === TripType.RoundTrip && (
                                <>
                                  <div className="text-gray-500 col-span-2 mt-2 border-t pt-2 font-medium">
                                    Journey Details
                                  </div>
                                  <div className="text-gray-500">Outbound</div>
                                  <div className="flex items-center">
                                    <span>{trip.from}</span>
                                    <ArrowRight className="h-3 w-3 mx-1" />
                                    <span>{trip.to}</span>
                                  </div>
                                  <div className="text-gray-500">Return</div>
                                  <div className="flex items-center">
                                    <span>{trip.to}</span>
                                    <ArrowRight className="h-3 w-3 mx-1" />
                                    <span>{trip.from}</span>
                                  </div>
                                </>
                              )}

                              <div className="text-gray-500">Duration</div>
                              <div>{trip.duration}</div>
                              <div className="text-gray-500">Stops</div>
                              <div>
                                {trip.stops === 0
                                  ? "Non-stop"
                                  : `${trip.stops} stop(s)`}
                              </div>
                              <div className="text-gray-500">Passengers</div>
                              <div>{trip.passengers}</div>
                              <div className="text-gray-500">Total Price</div>
                              <div className="font-medium">
                                ₹{trip.total_price.toLocaleString()}
                              </div>
                            </div>
                          </div>

                          {/* Return Flight Information (if applicable) */}
                          {trip.return_departure_date &&
                            trip.trip_type !== TripType.OneWay && (
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="text-sm font-semibold text-gray-700 flex items-center mb-3">
                                  <Plane className="h-4 w-4 mr-2 transform rotate-180" />{" "}
                                  Return Flight
                                </h4>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                  <div className="text-gray-500">
                                    Return Date
                                  </div>
                                  <div>
                                    {formatDate(trip.return_departure_date)}
                                  </div>
                                  {trip.return_departure_time && (
                                    <>
                                      <div className="text-gray-500">
                                        Departure Time
                                      </div>
                                      <div>{trip.return_departure_time}</div>
                                    </>
                                  )}
                                  {trip.return_arrival_time && (
                                    <>
                                      <div className="text-gray-500">
                                        Arrival Time
                                      </div>
                                      <div>{trip.return_arrival_time}</div>
                                    </>
                                  )}
                                </div>
                              </div>
                            )}

                          {/* Stop Locations (if any) */}
                          {trip.flight_details &&
                            trip.flight_details.stop_locations &&
                            trip.flight_details.stop_locations.length > 0 && (
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="text-sm font-semibold text-gray-700 flex items-center mb-3">
                                  <Clock className="h-4 w-4 mr-2" /> Stop
                                  Information
                                </h4>
                                <div className="text-sm">
                                  <div className="text-gray-500 mb-1">
                                    Stop Location(s)
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {trip.flight_details.stop_locations.map(
                                      (stop, idx) => (
                                        <span
                                          key={idx}
                                          className="px-2 py-1 bg-gray-100 rounded-md"
                                        >
                                          {stop}
                                        </span>
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm text-gray-600">Departure</div>
                        <div className="text-sm font-medium">
                          {trip.departure_time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm text-gray-600">Arrival</div>
                        <div className="text-sm font-medium">
                          {trip.arrival_time}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
