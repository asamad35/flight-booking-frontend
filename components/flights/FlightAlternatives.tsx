"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface FlightAlternativeProps {
  from: string;
  to: string;
}

export default function FlightAlternatives({
  from,
  to,
}: FlightAlternativeProps) {
  // Mock data for alternative flight options
  const alternatives = [
    {
      id: 1,
      departure: from,
      arrival: to,
      date: "Tomorrow",
      price: 198,
      savings: "22%",
      label: "Best Deal",
    },
    {
      id: 2,
      departure: from,
      arrival: to,
      date: "Next Week",
      price: 215,
      savings: "15%",
      label: "Less Crowded",
    },
    {
      id: 3,
      departure: from,
      arrival: "NYC",
      date: "Same Day",
      price: 245,
      savings: "5%",
      label: "Popular Alternative",
    },
  ];

  return (
    <Card className="border-none shadow-md mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-blue-600" />
          Smart Alternatives
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Flexible? Consider these options to save
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
            {alternatives.map((alt) => (
              <div
                key={alt.id}
                className="bg-white border border-gray-100 rounded-md p-3 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {alt.label}
                  </Badge>
                  <span className="text-green-600 text-xs font-medium">
                    Save {alt.savings}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-sm">
                    <span>{alt.departure}</span>
                    <ArrowRight className="h-3 w-3 mx-1" />
                    <span>{alt.arrival}</span>
                  </div>
                  <span className="text-gray-500 text-xs">{alt.date}</span>
                </div>

                <div className="text-lg font-bold text-blue-600">
                  {formatCurrency(alt.price)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
