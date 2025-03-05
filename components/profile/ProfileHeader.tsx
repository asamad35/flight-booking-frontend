import Image from "next/image";
import { UserProfile, Booking, ProfileHeaderProps } from "@/types/profile";
import TravelActivityChart, {
  MobileTravelActivityChart,
} from "./TravelActivityChart";

// Format date to display member since
function formatMemberSince(dateString?: string): string {
  if (!dateString) return "Member since January 2023";

  const date = new Date(dateString);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `Member since ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

export default function ProfileHeader({ user, bookings }: ProfileHeaderProps) {
  // Count bookings by month (simplified version without chart)
  const totalBookings = bookings.length;

  return (
    <div className="relative">
      {/* Background banner */}
      <div className="w-full h-64 md:h-72 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg overflow-hidden relative">
        <div className="absolute inset-0 bg-opacity-20 bg-black flex p-6 md:p-8">
          <div className="w-full md:flex items-center justify-between">
            {/* Left side: Title and user info */}
            <div className="flex items-center">
              {/* Profile image */}
              <div className="mr-6">
                <div className="rounded-full h-24 w-24 border-4 border-white overflow-hidden bg-white">
                  {user.avatar_url ? (
                    <Image
                      src={user.avatar_url}
                      alt={`${user.full_name}'s avatar`}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-600 text-3xl font-bold">
                      {user.full_name}
                    </div>
                  )}
                </div>
              </div>

              {/* Title and name */}
              <div>
                <h1 className="text-white text-4xl font-bold mb-2">
                  {user.full_name}
                </h1>
                <p className="text-white/70 text-sm mt-1">
                  {formatMemberSince(user.created_at)}
                </p>
              </div>
            </div>

            {/* Right side: Chart in client component */}
            <div className="hidden md:block h-52 w-80 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <TravelActivityChart bookings={bookings} />
            </div>
          </div>
        </div>

        {/* Abstract pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid)" />
            <defs>
              <pattern
                id="grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
          </svg>
        </div>
      </div>

      {/* Mobile chart component (shown only on small screens) */}
      <div className="md:hidden mt-6 h-40 w-full bg-white rounded-lg shadow-sm border p-4">
        <MobileTravelActivityChart bookings={bookings} />
      </div>
    </div>
  );
}
