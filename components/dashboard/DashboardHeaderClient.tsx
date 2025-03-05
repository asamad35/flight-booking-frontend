"use client";

import { PieChart, Users, Activity } from "lucide-react";
import { Booking, UserProfile } from "@/types/profile";

interface DashboardHeaderClientProps {
  users: UserProfile[];
  bookings: Booking[];
}

export default function DashboardHeaderClient({
  users,
  bookings,
}: DashboardHeaderClientProps) {
  // Calculate current month bookings
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const currentMonthBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.booking_date);
    return (
      bookingDate.getMonth() === currentMonth &&
      bookingDate.getFullYear() === currentYear
    );
  });

  // Count active bookings (future bookings)
  const activeBookings = bookings.filter((booking) => {
    const departureDate = new Date(booking.departure_date);
    return departureDate > currentDate;
  });

  const stats = [
    {
      label: "Total Users",
      value: users.length.toString(),
      icon: <Users className="h-5 w-5 text-blue-500" />,
    },
    {
      label: "Active Bookings",
      value: activeBookings.length.toString(),
      icon: <Activity className="h-5 w-5 text-green-500" />,
    },
    {
      label: "This Month",
      value: `+${currentMonthBookings.length}`,
      icon: <PieChart className="h-5 w-5 text-indigo-500" />,
    },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="mt-1 text-gray-500">
            Manage users and monitor system activity
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="inline-flex items-center rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-800 ring-1 ring-inset ring-blue-600/20">
            <span className="mr-1.5 h-2 w-2 rounded-full bg-blue-600"></span>
            Admin View
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-lg border bg-white p-5 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-center">
              <div className="rounded-md bg-gray-50 p-2">{stat.icon}</div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  {stat.label}
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
