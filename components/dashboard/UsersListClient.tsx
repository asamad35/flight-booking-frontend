"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  ArrowUpDown,
  User,
  Mail,
  Calendar,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Booking, UserProfile } from "@/types/profile";

interface EnhancedUserProfile extends UserProfile {
  total_trips: number;
  status: "active" | "inactive";
}

export default function UsersListClient({
  users,
  bookings,
}: {
  users: UserProfile[];
  bookings: Booking[];
}) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "trips" | "date">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Format date to be more readable
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate total trips per user
  const enhancedUsers: EnhancedUserProfile[] = users.map((user) => {
    const userBookings = bookings.filter(
      (booking) => booking.user_id === user.id
    );
    return {
      ...user,
      full_name: user.full_name || "Unknown User",
      email: user.email || "No email",
      created_at: user.created_at || new Date().toISOString(),
      total_trips: userBookings.length,
      status: "active", // Assuming all users are active for now
    };
  });

  // Filter and sort users
  const filteredUsers = enhancedUsers
    .filter(
      (user) =>
        (user.full_name?.toLowerCase() || "").includes(
          searchTerm.toLowerCase()
        ) ||
        (user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        const nameA = (a.full_name || "").toLowerCase();
        const nameB = (b.full_name || "").toLowerCase();
        return sortDirection === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      } else if (sortBy === "trips") {
        return sortDirection === "asc"
          ? a.total_trips - b.total_trips
          : b.total_trips - a.total_trips;
      } else {
        // date
        const dateA = new Date(a.created_at || 0).getTime();
        const dateB = new Date(b.created_at || 0).getTime();
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      }
    });

  const toggleSort = (column: "name" | "trips" | "date") => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  const navigateToUserInsights = (userId: string) => {
    router.push(`/dashboard/user/${userId}`);
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
      <div className="p-5 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Users Management
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full sm:w-64 pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-6 py-3 text-left tracking-wider">User</th>
              <th className="px-6 py-3 text-left tracking-wider">
                <button
                  onClick={() => toggleSort("name")}
                  className="flex items-center"
                >
                  Name
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </button>
              </th>
              <th className="px-6 py-3 text-left tracking-wider">Email</th>
              <th className="px-6 py-3 text-left tracking-wider">
                <button
                  onClick={() => toggleSort("trips")}
                  className="flex items-center"
                >
                  Total Trips
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </button>
              </th>
              <th className="px-6 py-3 text-left tracking-wider">
                <button
                  onClick={() => toggleSort("date")}
                  className="flex items-center"
                >
                  Joined
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </button>
              </th>
              <th className="px-6 py-3 text-left tracking-wider">Status</th>
              <th className="px-6 py-3 text-right tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => navigateToUserInsights(user.id)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    {user.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        alt={`${user.full_name || "User"}'s avatar`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">
                    {user.full_name || "Unknown User"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-500 flex items-center">
                    <Mail className="h-3 w-3 mr-1 text-gray-400" />
                    {user.email || "No email"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">
                    {user.total_trips}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-500 flex items-center">
                    <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                    {formatDate(user.created_at)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.status === "active" ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <Check className="h-3 w-3 mr-1" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      <X className="h-3 w-3 mr-1" />
                      Inactive
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToUserInsights(user.id);
                    }}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No users found matching your search.</p>
        </div>
      )}
    </div>
  );
}
