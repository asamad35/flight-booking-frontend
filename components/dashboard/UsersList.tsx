"use client";

import { Booking, UserProfile } from "@/types/profile";
import UsersListClient from "./UsersListClient";

interface UsersListProps {
  users: UserProfile[];
  bookings: Booking[];
}

export default function UsersList({ users, bookings }: UsersListProps) {
  // This is now just a wrapper component that passes data to the client component
  return <UsersListClient users={users} bookings={bookings} />;
}
