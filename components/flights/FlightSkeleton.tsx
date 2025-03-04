import { Card, CardContent } from "@/components/ui/card";

export default function FlightSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="animate-pulse flex flex-col space-y-4">
              <div className="flex justify-between">
                <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                <div className="h-10 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="flex justify-between">
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                <div className="h-10 bg-gray-200 rounded w-1/5"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
