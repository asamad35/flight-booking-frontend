import { Card, CardContent } from "@/components/ui/card";

export default function EmptyResults() {
  return (
    <Card className="border-none shadow-md">
      <CardContent className="p-6 text-center">
        <h3 className="text-xl font-semibold mb-2">No flights found</h3>
        <p className="text-gray-500">
          Try adjusting your search criteria or filters.
        </p>
      </CardContent>
    </Card>
  );
}
