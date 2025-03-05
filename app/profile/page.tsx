import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileClientContainer from "@/components/profile/ProfileClientContainer";
import { UserProfile, Booking } from "@/types/profile";

// Fetch user and booking data from the API
async function getUserData() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  try {
    // Get the authentication token from the cookie
    const { cookies } = await import("next/headers");
    const token = JSON.parse(
      cookies()
        .getAll()
        .filter((cookie) => cookie.name.includes("auth-token"))
        .map((cookie) => cookie.value)
        .join(" ")
    ).access_token;

    console.log(token, "aaaaaaaaaaaaaaa");

    if (!token) {
      throw new Error("No authentication token found");
    }

    // Fetch user profile data with authentication
    const userResponse = await fetch(`${API_URL}/api/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${token}`,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store", // Don't cache this data
    });

    if (!userResponse.ok) {
      throw new Error("Failed to fetch user data");
    }

    const userData = await userResponse.json();

    // Fetch user bookings data with authentication
    const bookingsResponse = await fetch(`${API_URL}/api/flights/bookings`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${token}`,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store", // Don't cache this data
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

export default async function ProfilePage() {
  // Fetch data from API at the server level
  const { user, bookings } = await getUserData();

  // Handle case when user data is not available
  if (!user) {
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
      {/* Server component for header */}
      <ProfileHeader user={user} bookings={bookings} />

      {/* Client component for interactive parts */}
      <ProfileClientContainer profile={user} bookings={bookings} />
    </div>
  );
}
