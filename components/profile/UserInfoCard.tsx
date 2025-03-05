"use client";

import { Mail, User } from "lucide-react";
import { UserProfile, UserInfoCardProps } from "@/types/profile";

export default function UserInfoCard({
  user,
  completedTripsCount = 0,
  upcomingTripsCount = 0,
}: UserInfoCardProps & {
  completedTripsCount?: number;
  upcomingTripsCount?: number;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden ">
      <div className="p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Personal Information
          </h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm text-gray-500 block">Full Name</label>
            <p className="text-gray-700">{user.full_name || "User"}</p>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-500 block">Email Address</label>
            <div className="flex items-center text-gray-700">
              <Mail className="h-4 w-4 mr-2 text-gray-400" />
              <p>{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 border-t">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-gray-500">
            Account Statistics
          </h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-lg font-semibold text-blue-600">
                {completedTripsCount}
              </p>
              <p className="text-sm text-gray-600">Completed Trips</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-lg font-semibold text-green-600">
                {upcomingTripsCount}
              </p>
              <p className="text-sm text-gray-600">Upcoming Trips</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
