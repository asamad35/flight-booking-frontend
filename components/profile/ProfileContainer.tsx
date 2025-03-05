"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { useRouter } from "next/navigation";
import UserInfoCard from "@/components/profile/UserInfoCard";
import TravelHistory from "@/components/profile/TravelHistory";
import UpcomingTrips from "@/components/profile/UpcomingTrips";
import ProfileHeader from "@/components/profile/ProfileHeader";
import axios from "axios";

interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
}

interface Booking {
  id: string;
  flight: {
    from: string;
    to: string;
    departure_date: string;
    flight_number: string;
  };
  status: string;
  created_at: string;
}

interface Trip {
  id: string;
  from: string;
  to: string;
  date: string;
  status: "completed" | "upcoming" | "cancelled";
  flightNumber: string;
}

export default function ProfileContainer() {
  const { user, isLoading } = useAppContext();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!isLoading && !user) {
      router.push("/");
      return;
    }

    const fetchUserProfile = async () => {
      if (!user) return;
      setIsLoadingProfile(true);
      setError(null);

      try {
        // Fetch user profile data from the backend (cookies will be sent automatically)
        const { data: profileData } = await axios.get("/api/users/me");

        setProfile({
          id: profileData.id,
          email: profileData.email,
          first_name: profileData.firstName || "User", // Mapping from backend DTO
          last_name: profileData.lastName || "", // Mapping from backend DTO
          avatar_url:
            profileData.avatar_url ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData.email}`,
        });

        // Fetch user bookings (cookies will be sent automatically)
        const { data: bookingsData } = await axios.get("/api/flights/bookings");
        console.log(bookingsData, "bookingsData");
        // Transform bookings data to match Trip interface
        const formattedTrips = bookingsData?.map((booking: Booking) => {
          // Determine if the trip is upcoming or completed based on departure date
          const departureDate = new Date(booking.flight.departure_date);
          const today = new Date();
          const status =
            booking.status === "cancelled"
              ? "cancelled"
              : departureDate > today
              ? "upcoming"
              : "completed";

          return {
            id: booking.id,
            from: booking.flight.from,
            to: booking.flight.to,
            date: booking.flight.departure_date,
            status: status,
            flightNumber: booking.flight.flight_number,
          };
        });

        setTrips(formattedTrips);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError(
          "Failed to load profile data. Please try again later. " +
            JSON.stringify(error)
        );
      } finally {
        setIsLoadingProfile(false);
      }
    };

    if (user) {
      fetchUserProfile();
    }
  }, [user, isLoading, router]);

  if (isLoading || isLoadingProfile) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[70vh]">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-t-blue-600 border-b-blue-600 border-r-transparent border-l-transparent animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[70vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => router.refresh()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
          <p className="text-gray-600">Unable to load profile information</p>
        </div>
      </div>
    );
  }

  const completedTrips = trips.filter((trip) => trip.status === "completed");
  const upcomingTrips = trips.filter((trip) => trip.status === "upcoming");

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <ProfileHeader user={profile} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-1">
          <UserInfoCard user={profile} />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <UpcomingTrips trips={upcomingTrips} />
          <TravelHistory trips={completedTrips} />
        </div>
      </div>
    </div>
  );
}
