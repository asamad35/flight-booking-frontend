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

interface UserData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  total_trips: number;
  joined_date: string;
  status: "active" | "inactive";
}

interface UsersListProps {
  users: UserData[];
}

export default function UsersList({ users }: UsersListProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "trips" | "date">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter and sort users
  const filteredUsers = users
    .filter(
      (user) =>
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
        const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
        return sortDirection === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      } else if (sortBy === "trips") {
        return sortDirection === "asc"
          ? a.total_trips - b.total_trips
          : b.total_trips - a.total_trips;
      } else {
        // date
        const dateA = new Date(a.joined_date).getTime();
        const dateB = new Date(b.joined_date).getTime();
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
                        alt={`${user.first_name}'s avatar`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">
                    {user.first_name} {user.last_name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-500 flex items-center">
                    <Mail className="h-3 w-3 mr-1 text-gray-400" />
                    {user.email}
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
                    {formatDate(user.joined_date)}
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
