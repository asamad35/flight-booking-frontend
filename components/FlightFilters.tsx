"use client";

import { useState } from "react";
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

export default function FlightFilters() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [stops, setStops] = useState({
    direct: true,
    oneStop: true,
    multiStop: false,
  });
  const [airlines, setAirlines] = useState({
    delta: true,
    united: true,
    american: true,
    spirit: true,
    jetBlue: true,
  });
  const [departureTime, setDepartureTime] = useState({
    morning: true,
    afternoon: true,
    evening: true,
  });

  // Apply filters only when the button is clicked
  const applyFilters = () => {
    const filterState: FlightFilterState = {
      priceRange,
      stops,
      airlines,
      departureTime,
    };

    // Dispatch custom event with filter state
    const event = new CustomEvent("flightFiltersChanged", {
      detail: { filters: filterState },
    });
    window.dispatchEvent(event);
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
                  ${priceRange[0]} - ${priceRange[1]}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="2000"
                step="50"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], parseInt(e.target.value)])
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
                  checked={stops.direct}
                  onChange={(e) =>
                    setStops({ ...stops, direct: e.target.checked })
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
                  checked={stops.oneStop}
                  onChange={(e) =>
                    setStops({ ...stops, oneStop: e.target.checked })
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
                  checked={stops.multiStop}
                  onChange={(e) =>
                    setStops({ ...stops, multiStop: e.target.checked })
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
              {Object.entries(airlines).map(([airline, checked]) => (
                <div key={airline} className="flex items-center">
                  <input
                    type="checkbox"
                    id={airline}
                    checked={checked}
                    onChange={(e) =>
                      setAirlines({
                        ...airlines,
                        [airline]: e.target.checked,
                      })
                    }
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <Label htmlFor={airline} className="ml-2 capitalize">
                    {airline === "jetBlue" ? "JetBlue" : airline}
                  </Label>
                </div>
              ))}
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
                  checked={departureTime.morning}
                  onChange={(e) =>
                    setDepartureTime({
                      ...departureTime,
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
                  checked={departureTime.afternoon}
                  onChange={(e) =>
                    setDepartureTime({
                      ...departureTime,
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
                  checked={departureTime.evening}
                  onChange={(e) =>
                    setDepartureTime({
                      ...departureTime,
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
