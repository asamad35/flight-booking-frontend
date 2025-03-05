"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// Define the filter state interface for better typing
export interface FlightFilterState {
  priceRange: [number, number];
  stops: {
    direct: boolean;
    oneStop: boolean;
    multiStop: boolean;
  };
  airlines: {
    [key: string]: boolean;
  };
  departureTime: {
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
  };
}

export default function FlightFilters({
  filters,
  onFilterChange,
  originalPriceRange = [0, 2000],
}: {
  filters?: FlightFilterState;
  onFilterChange?: (filters: FlightFilterState) => void;
  originalPriceRange?: [number, number];
} = {}) {
  const defaultFilters: FlightFilterState = {
    priceRange: [0, 2000],
    stops: { direct: true, oneStop: true, multiStop: true },
    airlines: {
      delta: true,
      united: true,
      american: true,
      spirit: true,
      jetBlue: true,
    },
    departureTime: { morning: true, afternoon: true, evening: true },
  };

  // Create a single state that derives from filters prop or defaults
  const [localFilters, setLocalFilters] = useState<FlightFilterState>(
    filters || defaultFilters
  );

  useEffect(() => {
    if (filters) {
      setLocalFilters(filters);
    }
  }, [filters]);

  // Apply filters only when the button is clicked
  const applyFilters = () => {
    onFilterChange?.(localFilters);
  };

  // Helper function to update a specific part of the filters
  const updateFilter = (key: keyof FlightFilterState, value: any) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Price Range Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Price Range</h3>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  ${localFilters.priceRange[0]} - ${localFilters.priceRange[1]}
                </span>
              </div>

              {/* Single price slider */}
              <input
                type="range"
                min={originalPriceRange[0]}
                max={originalPriceRange[1]}
                step="1"
                value={localFilters.priceRange[1]}
                onChange={(e) =>
                  updateFilter("priceRange", [
                    localFilters.priceRange[0],
                    parseInt(e.target.value),
                  ])
                }
                className="w-full accent-blue-600"
              />
            </div>
          </div>

          {/* Stops Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Stops</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="direct"
                  checked={localFilters.stops.direct}
                  onChange={(e) =>
                    updateFilter("stops", {
                      ...localFilters.stops,
                      direct: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="direct" className="ml-2">
                  Direct
                </Label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="oneStop"
                  checked={localFilters.stops.oneStop}
                  onChange={(e) =>
                    updateFilter("stops", {
                      ...localFilters.stops,
                      oneStop: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="oneStop" className="ml-2">
                  1 Stop
                </Label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="multiStop"
                  checked={localFilters.stops.multiStop}
                  onChange={(e) =>
                    updateFilter("stops", {
                      ...localFilters.stops,
                      multiStop: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="multiStop" className="ml-2">
                  2+ Stops
                </Label>
              </div>
            </div>
          </div>

          {/* Airlines Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Airlines</h3>
            <div className="space-y-2">
              {Object.entries(localFilters.airlines).map(
                ([airline, checked]) => (
                  <div key={airline} className="flex items-center">
                    <input
                      type="checkbox"
                      id={airline}
                      checked={checked}
                      onChange={(e) =>
                        updateFilter("airlines", {
                          ...localFilters.airlines,
                          [airline]: e.target.checked,
                        })
                      }
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Label htmlFor={airline} className="ml-2 capitalize">
                      {airline}
                    </Label>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Departure Time Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Departure Time</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="morning"
                  checked={localFilters.departureTime.morning}
                  onChange={(e) =>
                    updateFilter("departureTime", {
                      ...localFilters.departureTime,
                      morning: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="morning" className="ml-2">
                  Morning (5:00 AM - 12:00 PM)
                </Label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="afternoon"
                  checked={localFilters.departureTime.afternoon}
                  onChange={(e) =>
                    updateFilter("departureTime", {
                      ...localFilters.departureTime,
                      afternoon: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="afternoon" className="ml-2">
                  Afternoon (12:00 PM - 5:00 PM)
                </Label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="evening"
                  checked={localFilters.departureTime.evening}
                  onChange={(e) =>
                    updateFilter("departureTime", {
                      ...localFilters.departureTime,
                      evening: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="evening" className="ml-2">
                  Evening (5:00 PM - 5:00 AM)
                </Label>
              </div>
            </div>
          </div>

          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={applyFilters}
          >
            Apply Filters
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
