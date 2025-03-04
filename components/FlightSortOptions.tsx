"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface SortOption {
  id: string;
  label: string;
}

export default function FlightSortOptions() {
  const sortOptions: SortOption[] = [
    { id: "price_asc", label: "Price (Lowest)" },
    { id: "price_desc", label: "Price (Highest)" },
    { id: "duration_asc", label: "Duration (Shortest)" },
    { id: "departure_asc", label: "Departure (Earliest)" },
    { id: "departure_desc", label: "Departure (Latest)" },
    { id: "arrival_asc", label: "Arrival (Earliest)" },
  ];

  const [selectedSort, setSelectedSort] = useState("price_asc");

  // Dispatch custom event when sort option changes
  const handleSortChange = (sortOption: string) => {
    setSelectedSort(sortOption);

    // Dispatch custom event with sort option
    const event = new CustomEvent("flightSortChanged", {
      detail: { sortOption },
    });
    window.dispatchEvent(event);
  };

  return (
    <Card className="mb-6 border-none shadow-md">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="text-sm font-medium">Sort by:</div>
          <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
            {sortOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSortChange(option.id)}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                  selectedSort === option.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
