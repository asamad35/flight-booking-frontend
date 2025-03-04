"use client";

import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
}

interface ProfileHeaderProps {
  user: UserProfile;
}

// Sample travel data for the graph
const travelData = [
  { month: "Jan", trips: 1 },
  { month: "Feb", trips: 2 },
  { month: "Mar", trips: 1 },
  { month: "Apr", trips: 3 },
  { month: "May", trips: 2 },
  { month: "Jun", trips: 4 },
  { month: "Jul", trips: 2 },
  { month: "Aug", trips: 3 },
  { month: "Sep", trips: 1 },
  { month: "Oct", trips: 2 },
  { month: "Nov", trips: 3 },
  { month: "Dec", trips: 1 },
];

export default function ProfileHeader({ user }: ProfileHeaderProps) {
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
                    <img
                      src={user.avatar_url}
                      alt={`${user.first_name}'s avatar`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-600 text-3xl font-bold">
                      {user.first_name[0]}
                      {user.last_name[0]}
                    </div>
                  )}
                </div>
              </div>

              {/* Title and name */}
              <div>
                <h1 className="text-white text-4xl font-bold mb-2">
                  Travel Profile
                </h1>
                <p className="text-white/90 text-xl">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-white/70 text-sm mt-1">
                  Member since January 2023
                </p>
              </div>
            </div>

            {/* Right side: Travel graph */}
            <div className="hidden md:block h-52 w-80 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <h3 className="text-white text-sm font-medium mb-2">
                Travel Activity
              </h3>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={travelData}>
                  <XAxis
                    dataKey="month"
                    stroke="#ffffff80"
                    tick={{ fill: "#ffffff", fontSize: 10 }}
                    axisLine={{ stroke: "#ffffff40" }}
                    tickLine={{ stroke: "#ffffff40" }}
                  />
                  <YAxis
                    stroke="#ffffff80"
                    tick={{ fill: "#ffffff", fontSize: 10 }}
                    axisLine={{ stroke: "#ffffff40" }}
                    tickLine={{ stroke: "#ffffff40" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderRadius: "4px",
                      border: "none",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="trips"
                    stroke="#ffffff"
                    strokeWidth={2}
                    dot={{ fill: "#ffffff", strokeWidth: 2, r: 4 }}
                    activeDot={{
                      fill: "#ffffff",
                      stroke: "#3b82f6",
                      strokeWidth: 2,
                      r: 6,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
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

      {/* Mobile Travel Graph (shown only on small screens) */}
      <div className="md:hidden mt-6 h-40 w-full bg-white rounded-lg shadow-sm border p-4">
        <h3 className="text-gray-700 text-sm font-medium mb-2">
          Travel Activity
        </h3>
        <ResponsiveContainer width="100%" height={120}>
          <LineChart data={travelData}>
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10 }}
              axisLine={{ stroke: "#e5e7eb" }}
              tickLine={{ stroke: "#e5e7eb" }}
            />
            <YAxis
              tick={{ fontSize: 10 }}
              axisLine={{ stroke: "#e5e7eb" }}
              tickLine={{ stroke: "#e5e7eb" }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="trips"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              activeDot={{
                fill: "#3b82f6",
                stroke: "#fff",
                strokeWidth: 2,
                r: 6,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
