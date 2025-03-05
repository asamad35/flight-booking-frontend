"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Booking } from "@/types/profile";

interface TravelActivityChartProps {
  bookings: Booking[];
}

// Calculate stats from booking data
function calculateTravelStats(bookings: Booking[]) {
  // Initialize monthly stats for the full year
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthlyTrips = months.map((month) => ({ month, trips: 0 }));

  // Count bookings by month
  bookings.forEach((booking) => {
    if (booking.departure_date) {
      const departureDate = new Date(booking.departure_date);
      const monthIndex = departureDate.getMonth();
      monthlyTrips[monthIndex].trips += 1;
    }
  });

  return monthlyTrips;
}

export default function TravelActivityChart({
  bookings,
}: TravelActivityChartProps) {
  const travelData = calculateTravelStats(bookings);

  return (
    <div className="h-full w-full">
      <h3 className="text-white text-sm font-medium mb-2">Travel Activity</h3>
      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={travelData}>
          <XAxis
            dataKey="month"
            stroke="#ffffff80"
            tick={{ fill: "#ffffff", fontSize: 10 }}
            axisLine={{ stroke: "#ffffff40" }}
            tickLine={{ stroke: "#ffffff40" }}
          />
          <YAxis
            stroke="#ffffff80"
            tick={{ fill: "#ffffff", fontSize: 10 }}
            axisLine={{ stroke: "#ffffff40" }}
            tickLine={{ stroke: "#ffffff40" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: "4px",
              border: "none",
            }}
          />
          <Line
            type="monotone"
            dataKey="trips"
            stroke="#ffffff"
            strokeWidth={2}
            dot={{ fill: "#ffffff", strokeWidth: 2, r: 4 }}
            activeDot={{
              fill: "#ffffff",
              stroke: "#3b82f6",
              strokeWidth: 2,
              r: 6,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MobileTravelActivityChart({
  bookings,
}: TravelActivityChartProps) {
  const travelData = calculateTravelStats(bookings);

  return (
    <div className="h-full w-full">
      <h3 className="text-gray-700 text-sm font-medium mb-2">
        Travel Activity
      </h3>
      <ResponsiveContainer width="100%" height={120}>
        <LineChart data={travelData}>
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10 }}
            axisLine={{ stroke: "#e5e7eb" }}
            tickLine={{ stroke: "#e5e7eb" }}
          />
          <YAxis
            tick={{ fontSize: 10 }}
            axisLine={{ stroke: "#e5e7eb" }}
            tickLine={{ stroke: "#e5e7eb" }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="trips"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
            activeDot={{
              fill: "#3b82f6",
              stroke: "#fff",
              strokeWidth: 2,
              r: 6,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
