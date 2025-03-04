"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { useRouter } from "next/navigation";
import UserInfoCard from "@/components/profile/UserInfoCard";
import TravelHistory from "@/components/profile/TravelHistory";
import UpcomingTrips from "@/components/profile/UpcomingTrips";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { createClient } from "@/utils/supabase/client";

interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
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

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!isLoading && !user) {
      router.push("/");
      return;
    }

    const fetchUserProfile = async () => {
      if (!user) return;

      const supabase = createClient();

      try {
        // Mock data - in a real app, you would fetch this from your database
        // For example: const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();

        setProfile({
          id: user.id,
          email: user.email || "",
          first_name: "Jane",
          last_name: "Doe",
          avatar_url:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=" + user.email,
        });

        // Mock travel history data
        setTrips([
          {
            id: "trip1",
            from: "New York",
            to: "London",
            date: "2023-12-10",
            status: "completed",
            flightNumber: "SK123",
          },
          {
            id: "trip2",
            from: "London",
            to: "Paris",
            date: "2024-01-15",
            status: "completed",
            flightNumber: "AZ456",
          },
          {
            id: "trip3",
            from: "Paris",
            to: "Tokyo",
            date: "2024-06-22",
            status: "upcoming",
            flightNumber: "JL789",
          },
          {
            id: "trip4",
            from: "Tokyo",
            to: "New York",
            date: "2024-06-30",
            status: "upcoming",
            flightNumber: "AA012",
          },
        ]);
      } catch (error) {
        console.error("Error fetching profile:", error);
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
