"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DashboardHeader from "./DashboardHeader";

interface Booking {
  id: string;
  flight_number: string;
  departure_airport: string;
  arrival_airport: string;
  departure_date: string;
  price: number;
  status: "confirmed" | "cancelled" | "completed";
}

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role?: string;
  avatar_url?: string;
  created_at?: string;
  bookings: Booking[];
}

interface AdminUsersDisplayProps {
  users: User[];
}

export default function AdminUsersDisplay({ users }: AdminUsersDisplayProps) {
  const [activeTab, setActiveTab] = useState("users");
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  if (!users || users.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4 md:px-6">
        <DashboardHeader users={users} bookings={[]} />
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-700">
            No users found
          </h2>
          <p className="mt-2 text-gray-500">
            There are no users available in the system.
          </p>
        </div>
      </div>
    );
  }

  // Calculate total bookings by status
  const totalBookings = users.reduce(
    (sum, user) => sum + user.bookings.length,
    0
  );
  const confirmedBookings = users.reduce(
    (sum, user) =>
      sum + user.bookings.filter((b) => b.status === "confirmed").length,
    0
  );
  const cancelledBookings = users.reduce(
    (sum, user) =>
      sum + user.bookings.filter((b) => b.status === "cancelled").length,
    0
  );
  const completedBookings = users.reduce(
    (sum, user) =>
      sum + user.bookings.filter((b) => b.status === "completed").length,
    0
  );

  // Helper function to get badge variant based on status
  const getStatusBadgeVariant = (status: string) => {
    if (status === "confirmed") return "default";
    if (status === "completed") return "secondary";
    return "destructive";
  };

  const toggleUserExpand = (userId: string) => {
    if (expandedUser === userId) {
      setExpandedUser(null);
    } else {
      setExpandedUser(userId);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <DashboardHeader users={users} bookings={[]} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Active Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{confirmedBookings}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedBookings}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="bookings">All Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div
                      className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
                      onClick={() => toggleUserExpand(user.id)}
                    >
                      <div className="flex items-center">
                        {user.avatar_url ? (
                          <Image
                            src={user.avatar_url}
                            alt={`${user.first_name} ${user.last_name}`}
                            width={40}
                            height={40}
                            className="rounded-full mr-4"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                            <span className="text-gray-600 font-medium">
                              {user.first_name?.[0]}
                              {user.last_name?.[0]}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="font-medium">
                            {user.first_name} {user.last_name}
                          </p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge
                          variant={
                            user.role === "admin" ? "destructive" : "default"
                          }
                        >
                          {user.role || "user"}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          {expandedUser === user.id ? "↑" : "↓"}
                        </Button>
                      </div>
                    </div>

                    {expandedUser === user.id && (
                      <div className="p-4 border-t bg-gray-50">
                        <div className="text-sm mb-4">
                          <p>
                            <span className="font-medium">User ID:</span>{" "}
                            {user.id}
                          </p>
                          <p>
                            <span className="font-medium">Joined:</span>{" "}
                            {user.created_at
                              ? format(
                                  new Date(user.created_at),
                                  "MMM dd, yyyy"
                                )
                              : "Unknown"}
                          </p>
                          <p>
                            <span className="font-medium">Total Bookings:</span>{" "}
                            {user.bookings.length}
                          </p>
                        </div>

                        {user.bookings.length > 0 ? (
                          <div className="border rounded-md mt-4 overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead className="bg-gray-100">
                                <tr>
                                  <th className="text-left p-2">Flight</th>
                                  <th className="text-left p-2">Route</th>
                                  <th className="text-left p-2">Date</th>
                                  <th className="text-left p-2">Price</th>
                                  <th className="text-left p-2">Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {user.bookings.map((booking) => (
                                  <tr key={booking.id} className="border-t">
                                    <td className="p-2 font-medium">
                                      {booking.flight_number}
                                    </td>
                                    <td className="p-2">
                                      {booking.departure_airport} →{" "}
                                      {booking.arrival_airport}
                                    </td>
                                    <td className="p-2">
                                      {format(
                                        new Date(booking.departure_date),
                                        "MMM dd, yyyy"
                                      )}
                                    </td>
                                    <td className="p-2">
                                      ${booking.price.toFixed(2)}
                                    </td>
                                    <td className="p-2">
                                      <Badge
                                        variant={getStatusBadgeVariant(
                                          booking.status
                                        )}
                                      >
                                        {booking.status}
                                      </Badge>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 mt-2">
                            No bookings found for this user.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>All Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left p-2">User</th>
                      <th className="text-left p-2">Flight</th>
                      <th className="text-left p-2">Route</th>
                      <th className="text-left p-2">Date</th>
                      <th className="text-left p-2">Price</th>
                      <th className="text-left p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.flatMap((user) =>
                      user.bookings.map((booking) => (
                        <tr
                          key={`${user.id}-${booking.id}`}
                          className="border-t"
                        >
                          <td className="p-2 font-medium">
                            {user.first_name} {user.last_name}
                          </td>
                          <td className="p-2">{booking.flight_number}</td>
                          <td className="p-2">
                            {booking.departure_airport} →{" "}
                            {booking.arrival_airport}
                          </td>
                          <td className="p-2">
                            {format(
                              new Date(booking.departure_date),
                              "MMM dd, yyyy"
                            )}
                          </td>
                          <td className="p-2">${booking.price.toFixed(2)}</td>
                          <td className="p-2">
                            <Badge
                              variant={getStatusBadgeVariant(booking.status)}
                            >
                              {booking.status}
                            </Badge>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
