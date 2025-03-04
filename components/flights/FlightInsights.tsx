"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, CloudSun, Calendar, Info } from "lucide-react";

interface FlightInsightsProps {
  from: string;
  to: string;
  departureDate: string;
}

export default function FlightInsights({
  from,
  to,
  departureDate,
}: FlightInsightsProps) {
  const [activeTab, setActiveTab] = useState("price");

  // Mock data - in a real app, this would come from an API
  const priceHistory = [65, 70, 68, 73, 80, 85, 79, 76, 72, 68, 65, 63, 62];
  const priceForecasts = [62, 64, 69, 75, 82, 89, 95, 98, 96, 90, 85, 80, 78];
  const weatherData = {
    forecast: [
      { day: "Today", temp: 72, icon: "☀️", condition: "Sunny" },
      { day: "Tomorrow", temp: 68, icon: "⛅", condition: "Partly Cloudy" },
      { day: "Wed", temp: 65, icon: "🌧️", condition: "Light Rain" },
    ],
    current: { temp: 72, humidity: "45%", wind: "8 mph" },
  };

  return (
    <Card className="border-none shadow-md mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Info className="h-5 w-5 mr-2 text-blue-600" />
          Travel Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="price" onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="price" className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Price Trends
            </TabsTrigger>
            <TabsTrigger value="weather" className="flex items-center">
              <CloudSun className="h-4 w-4 mr-2" />
              Destination Weather
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Travel Tips
            </TabsTrigger>
          </TabsList>

          <TabsContent value="price" className="m-0">
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Price trends for {from} to {to}
              </p>

              <div className="relative h-40 w-full mt-4">
                {/* Simple price trend visualization */}
                <div className="absolute inset-0 flex items-end">
                  {priceHistory.concat(priceForecasts).map((price, i) => (
                    <div
                      key={i}
                      className={`w-full h-${Math.floor((price / 100) * 40)}
                        ${
                          i < priceHistory.length
                            ? "bg-blue-500"
                            : "bg-blue-300"
                        }
                        ${
                          i === priceHistory.length - 1
                            ? "border-r-2 border-red-500"
                            : ""
                        }`}
                      style={{ height: `${(price / 100) * 100}%` }}
                    ></div>
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300"></div>
                <div className="absolute bottom-0 left-0 h-8 w-px bg-gray-300"></div>
                <div className="absolute bottom-0 left-0 -mb-6 text-xs text-gray-500">
                  Past 12 days
                </div>
                <div className="absolute bottom-0 right-0 -mb-6 text-xs text-gray-500">
                  Next 12 days
                </div>
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm font-medium text-blue-600">
                  Today
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-md mt-4">
                <p className="text-sm text-blue-800 font-medium">
                  Price Insight
                </p>
                <p className="text-xs text-blue-700">
                  Prices are expected to rise by 30% in the next week. Consider
                  booking now for best rates.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="weather" className="m-0">
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Weather in {to} around your travel date
              </p>

              <div className="grid grid-cols-3 gap-2 mt-2">
                {weatherData.forecast.map((day) => (
                  <div
                    key={day.day}
                    className="bg-gray-50 p-3 rounded-md text-center"
                  >
                    <p className="text-sm font-medium">{day.day}</p>
                    <div className="text-2xl my-1">{day.icon}</div>
                    <p className="text-xl font-bold">{day.temp}°F</p>
                    <p className="text-xs text-gray-500">{day.condition}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between p-3 bg-blue-50 rounded-md mt-2">
                <div>
                  <p className="text-xs text-gray-600">Current</p>
                  <p className="text-lg font-bold">
                    {weatherData.current.temp}°F
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Humidity</p>
                  <p className="text-sm">{weatherData.current.humidity}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Wind</p>
                  <p className="text-sm">{weatherData.current.wind}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tips" className="m-0">
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Smart travel tips for your journey
              </p>

              <div className="mt-2 space-y-2">
                <div className="flex items-start p-3 bg-gray-50 rounded-md">
                  <span className="text-blue-600 mr-2">🧳</span>
                  <div>
                    <p className="text-sm font-medium">Pack light</p>
                    <p className="text-xs text-gray-600">
                      This route typically has strict baggage policies. Consider
                      packing only essentials.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-3 bg-gray-50 rounded-md">
                  <span className="text-blue-600 mr-2">🍽️</span>
                  <div>
                    <p className="text-sm font-medium">Food options</p>
                    <p className="text-xs text-gray-600">
                      Limited food service on most flights. Consider bringing
                      your own snacks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-3 bg-gray-50 rounded-md">
                  <span className="text-blue-600 mr-2">⏱️</span>
                  <div>
                    <p className="text-sm font-medium">Airport advice</p>
                    <p className="text-xs text-gray-600">
                      Security lines can be long at {from}. Arrive at least 2
                      hours before departure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
