"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ChartData {
  month: string;
  bookings: number;
  spend: number;
}

interface UserActivityChartProps {
  data: ChartData[];
}

export default function UserActivityChart({ data }: UserActivityChartProps) {
  const [viewMode, setViewMode] = useState<"bookings" | "spend">("bookings");

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-500">
          {viewMode === "bookings"
            ? "Number of bookings by month"
            : "Spending amount by month ($)"}
        </div>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant={viewMode === "bookings" ? "default" : "outline"}
            onClick={() => setViewMode("bookings")}
          >
            Bookings
          </Button>
          <Button
            size="sm"
            variant={viewMode === "spend" ? "default" : "outline"}
            onClick={() => setViewMode("spend")}
          >
            Spending
          </Button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {viewMode === "bookings" ? (
            <BarChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => [`${value} bookings`, "Bookings"]}
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "0.375rem",
                  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                  border: "1px solid #e5e7eb",
                }}
              />
              <Bar
                dataKey="bookings"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                barSize={30}
                name="Bookings"
              />
            </BarChart>
          ) : (
            <LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => [`$${value}`, "Spending"]}
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "0.375rem",
                  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                  border: "1px solid #e5e7eb",
                }}
              />
              <Line
                type="monotone"
                dataKey="spend"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                activeDot={{
                  fill: "#10b981",
                  stroke: "#fff",
                  strokeWidth: 2,
                  r: 6,
                }}
                name="Spending"
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
