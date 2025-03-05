"use client";

import { useEffect, useState } from "react";
import ProfileClientContainer from "@/components/profile/ProfileClientContainer";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { extractSupabaseSession } from "@/lib/utils";

// Client-side function to get user data
async function getUserData() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  try {
    // Get the authentication token from cookies on client side
    const cookies = document.cookie.split(";");
    const token = extractSupabaseSession(cookies);

    if (!token) {
      throw new Error("No authentication token found");
    }

    // Fetch user profile data with authentication
    const userResponse = await fetch(`${API_URL}/api/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error("Failed to fetch user data");
    }

    const userData = await userResponse.json();

    // Fetch user bookings data with authentication
    const bookingsResponse = await fetch(`${API_URL}/api/flights/bookings`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!bookingsResponse.ok) {
      throw new Error("Failed to fetch booking data");
    }

    const bookingsData = await bookingsResponse.json();

    return {
      user: userData,
      bookings: bookingsData.bookings || [],
    };
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return {
      user: null,
      bookings: [],
    };
  }
}

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<{ user: any; bookings: any[] }>({
    user: null,
    bookings: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getUserData();
        setUserData(data);
      } catch (error) {
        console.error("Error in client component:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Show skeleton loader while loading
  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 md:px-6">
        {/* Profile Header Skeleton */}
        <div className="w-full h-64 md:h-72 bg-gray-200 rounded-lg overflow-hidden relative animate-pulse mb-8">
          <div className="absolute bottom-6 left-6 flex flex-col gap-3">
            <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-gray-300"></div>
            <div className="h-6 w-48 bg-gray-300 rounded"></div>
            <div className="h-4 w-32 bg-gray-300 rounded"></div>
          </div>
        </div>

        {/* Profile Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Info Skeleton */}
          <div className="bg-white rounded-lg shadow p-6 h-fit animate-pulse">
            <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Bookings Skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 animate-pulse">
              <div className="h-6 w-48 bg-gray-200 rounded mb-6"></div>

              {/* Booking Item Skeletons */}
              {[1, 2].map((i) => (
                <div key={i} className="border-b border-gray-100 pb-4 mb-4">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="w-full md:w-2/3 space-y-3">
                      <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
                      <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                      <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                    </div>
                    <div className="w-full md:w-1/3 h-24 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle case when user data is not available
  if (!userData.user) {
    return (
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="w-full h-64 md:h-72 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg overflow-hidden relative flex items-center justify-center">
          <p className="text-white text-xl">Unable to load profile data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      {/* Profile header component */}
      <ProfileHeader user={userData.user} bookings={userData.bookings} />

      {/* Client component for interactive parts */}
      <ProfileClientContainer
        profile={userData.user}
        bookings={userData.bookings}
      />
    </div>
  );
}
