"use client";

import { ReactNode } from "react";

interface StatCard {
  title: string;
  value: string;
  icon: ReactNode;
  change: string;
}

interface UserStatsCardsProps {
  stats: StatCard[];
}

export default function UserStatsCards({ stats }: UserStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-md bg-gray-50 p-2">{stat.icon}</div>
              <div className="text-xs text-gray-500">{stat.change}</div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">
                {stat.title}
              </h3>
              <p className="text-2xl font-semibold text-gray-900 mt-1">
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
