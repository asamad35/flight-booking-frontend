"use client";

import { ArrowRight, Calendar, CreditCard } from "lucide-react";

interface Booking {
  id: string;
  from: string;
  to: string;
  date: string;
  status: "completed" | "upcoming" | "cancelled";
  amount: number;
  flightNumber: string;
}

interface RecentBookingsProps {
  bookings: Booking[];
}

export default function RecentBookings({ bookings }: RecentBookingsProps) {
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
      <div className="p-5 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Recent Bookings</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-6 py-3 text-left tracking-wider">Route</th>
              <th className="px-6 py-3 text-left tracking-wider">Date</th>
              <th className="px-6 py-3 text-left tracking-wider">Flight</th>
              <th className="px-6 py-3 text-left tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900">
                      {booking.from}
                    </span>
                    <ArrowRight className="h-4 w-4 mx-2 text-gray-400" />
                    <span className="font-medium text-gray-900">
                      {booking.to}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-gray-500">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    {formatDate(booking.date)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900 font-medium">
                    {booking.flightNumber}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-gray-900 font-medium">
                    <CreditCard className="h-4 w-4 mr-1 text-gray-400" />
                    Rs
                    {booking.amount.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {bookings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No bookings found for this user.</p>
        </div>
      )}
    </div>
  );
}
