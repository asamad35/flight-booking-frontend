import DashboardHeaderClient from "./DashboardHeaderClient";
import { Booking, UserProfile } from "@/types/profile";

interface DashboardHeaderProps {
  users: UserProfile[];
  bookings: Booking[];
}

export default function DashboardHeader({
  users,
  bookings,
}: DashboardHeaderProps) {
  return <DashboardHeaderClient users={users} bookings={bookings} />;
}
