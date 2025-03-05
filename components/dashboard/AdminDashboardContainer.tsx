import { Booking, UserProfile } from "@/types/profile";
import DashboardHeader from "./DashboardHeader";
import UsersList from "./UsersList";
import { cookies } from "next/headers";
import { getTokenFromCookieAtClient } from "@/lib/utils";

async function AdminDashboardContainer() {
  const token = getTokenFromCookieAtClient(cookies);

  if (!token) {
    throw new Error("No authentication token found");
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  // First fetch all users
  const usersData = await fetchUsers(apiUrl, token);
  // Then fetch bookings for each user
  let allBookings: Booking[] = [];

  for (const user of usersData) {
    const userBookings = await fetchUserBookings(apiUrl, token, user.id);
    allBookings = [...allBookings, ...userBookings];
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <DashboardHeader users={usersData} bookings={allBookings} />
      <div className="mt-8">
        <UsersList users={usersData} bookings={allBookings} />
      </div>
    </div>
  );
}

async function fetchUsers(
  apiUrl: string,
  token: string
): Promise<UserProfile[]> {
  try {
    const userResponse = await fetch(`${apiUrl}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!userResponse.ok) {
      throw new Error(`Failed to fetch users: ${userResponse.status}`);
    }

    const userData = await userResponse.json();
    return userData;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

async function fetchUserBookings(
  apiUrl: string,
  token: string,
  userId: string
): Promise<Booking[]> {
  try {
    // Make a request for bookings filtered by user ID
    const bookingsResponse = await fetch(
      `${apiUrl}/api/flights/bookings/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );
    if (!bookingsResponse.ok) {
      throw new Error(
        `Failed to fetch bookings for user ${userId}: ${bookingsResponse.status}`
      );
    }

    const bookingsData = await bookingsResponse.json();
    return bookingsData || [];
  } catch (error) {
    console.error(`Error fetching bookings for user ${userId}:`, error);
    return [];
  }
}

export default AdminDashboardContainer;
