"use client";

import { useState, useEffect } from "react";
import UserInfoCard from "@/components/profile/UserInfoCard";
import TravelHistory from "@/components/profile/TravelHistory";
import UpcomingTrips from "@/components/profile/UpcomingTrips";
import { Booking, ProfileClientContainerProps } from "@/types/profile";

export default function ProfileClientContainer({
  profile: profileData,
  bookings: bookingsData,
}: ProfileClientContainerProps) {
  const [completedBookings, setCompletedBookings] = useState<Booking[]>([]);
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);

  // Transform profile data to expected format
  const profile = {
    id: profileData.id,
    email: profileData.email,
    full_name: profileData.full_name || "User",
    avatar_url:
      profileData.avatar_url ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData.email}`,
  };

  useEffect(() => {
    console.log(bookingsData, "bookingsData");

    if (bookingsData && bookingsData.length > 0) {
      // Filter bookings by status (completed, upcoming, cancelled)
      const completed: Booking[] = [];
      const upcoming: Booking[] = [];

      bookingsData.forEach((booking) => {
        // Determine if the booking is upcoming or completed based on departure date
        const departureDate = new Date(booking.departure_date);
        const today = new Date();

        if (booking.status.toLowerCase() === "cancelled") {
          // We could add a cancelled array if needed
        } else if (departureDate > today) {
          upcoming.push(booking);
        } else {
          completed.push(booking);
        }
      });

      setCompletedBookings(completed);
      setUpcomingBookings(upcoming);
    }
  }, [bookingsData]);

  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-1">
          <UserInfoCard
            user={profile}
            completedTripsCount={completedBookings.length}
            upcomingTripsCount={upcomingBookings.length}
          />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <UpcomingTrips trips={upcomingBookings} />
          <TravelHistory trips={completedBookings} />
        </div>
      </div>
    </div>
  );
}
