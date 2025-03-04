"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { addDays, format, isAfter, isBefore } from "date-fns";
import { CalendarDays, MapPin, Search } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

// Define the form data type
type FlightFormData = {
  from: string;
  to: string;
  departureDate: Date;
  returnDate: Date;
  passengers: string;
  class: string;
  tripType: string;
};

export default function FlightSearch() {
  // Initialize today's date but set time to beginning of day for consistent comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = addDays(today, 1);

  // Set up React Hook Form with default values
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FlightFormData>({
    defaultValues: {
      tripType: "roundTrip",
      from: "",
      to: "",
      departureDate: today,
      returnDate: tomorrow,
      passengers: "1",
      class: "economy",
    },
    mode: "onChange",
  });

  const tripType = watch("tripType");
  const departureDate = watch("departureDate");
  const returnDate = watch("returnDate");

  // Form submission handler
  const onSubmit = (data: FlightFormData) => {
    console.log("Form submitted:", data);
    // Handle the flight search logic here
  };

  return (
    <section className="container -mt-16 relative z-20 mb-20">
      <Card className="border-none shadow-xl">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <Controller
                control={control}
                name="tripType"
                rules={{ required: "Trip type is required" }}
                render={({ field }) => (
                  <RadioGroup
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="roundTrip" id="roundTrip" />
                      <Label htmlFor="roundTrip">Round Trip</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="oneWay" id="oneWay" />
                      <Label htmlFor="oneWay">One Way</Label>
                    </div>
                  </RadioGroup>
                )}
              />
              {errors.tripType && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.tripType.message}
                </p>
              )}
            </div>

            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">From</label>
                  <div className="flex items-center border rounded-md pl-3 bg-white">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <Input
                      {...register("from", {
                        required: "Origin location is required",
                      })}
                      placeholder="City or Airport"
                      className="border-0 focus-visible:ring-0"
                    />
                  </div>
                  {errors.from && (
                    <p className="text-xs text-red-500">
                      {errors.from.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">To</label>
                  <div className="flex items-center border rounded-md pl-3 bg-white">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <Input
                      {...register("to", {
                        required: "Destination location is required",
                        validate: (value, formValues) =>
                          value !== formValues.from ||
                          "Origin and destination cannot be the same",
                      })}
                      placeholder="City or Airport"
                      className="border-0 focus-visible:ring-0"
                    />
                  </div>
                  {errors.to && (
                    <p className="text-xs text-red-500">{errors.to.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Departure</label>
                  <Controller
                    control={control}
                    name="departureDate"
                    rules={{
                      required: "Departure date is required",
                      validate: (value) => {
                        // Create date objects with time set to midnight for proper comparison
                        const dateToCheck = new Date(value);
                        dateToCheck.setHours(0, 0, 0, 0);
                        const todayDate = new Date();
                        todayDate.setHours(0, 0, 0, 0);

                        // Allow today or future dates
                        return (
                          !isBefore(dateToCheck, todayDate) ||
                          "Departure date cannot be in the past"
                        );
                      },
                    }}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left font-normal ${
                              errors.departureDate ? "border-red-500" : ""
                            }`}
                          >
                            <CalendarDays className="mr-2 h-4 w-4" />
                            {field.value
                              ? format(field.value, "PPP")
                              : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);

                              // If return date is before departure date, update it
                              if (
                                tripType === "roundTrip" &&
                                date &&
                                returnDate &&
                                isBefore(returnDate, date)
                              ) {
                                const newReturnDate = new Date(date);
                                newReturnDate.setDate(date.getDate() + 1);
                                setValue("returnDate", newReturnDate);
                              }
                            }}
                            disabled={(date) => isBefore(date, today)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                  {errors.departureDate && (
                    <p className="text-xs text-red-500">
                      {errors.departureDate.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Return</label>
                  <Controller
                    control={control}
                    name="returnDate"
                    rules={{
                      required:
                        tripType === "roundTrip"
                          ? "Return date is required for round trips"
                          : false,
                      validate: (value) => {
                        if (tripType === "oneWay") return true;
                        if (!value) return "Return date is required";
                        if (!departureDate) return true;
                        return (
                          isAfter(value, departureDate) ||
                          "Return date must be after departure date"
                        );
                      },
                    }}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left font-normal ${
                              errors.returnDate ? "border-red-500" : ""
                            }`}
                            disabled={tripType === "oneWay"}
                          >
                            <CalendarDays className="mr-2 h-4 w-4" />
                            {field.value && tripType !== "oneWay"
                              ? format(field.value, "PPP")
                              : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => {
                              // Disable dates before departure date
                              return departureDate
                                ? isBefore(date, departureDate)
                                : isBefore(date, today);
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                  {errors.returnDate && tripType === "roundTrip" && (
                    <p className="text-xs text-red-500">
                      {errors.returnDate.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Passengers</label>
                  <div className="relative rounded-md border border-gray-300 overflow-hidden">
                    <Controller
                      control={control}
                      name="passengers"
                      rules={{ required: "Number of passengers is required" }}
                      render={({ field }) => (
                        <select
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          className="w-full appearance-none bg-transparent py-2 pl-3 pr-10 focus:outline-none focus:ring-0"
                        >
                          <option value="1">1 Passenger</option>
                          <option value="2">2 Passengers</option>
                          <option value="3">3 Passengers</option>
                          <option value="4">4 Passengers</option>
                          <option value="5">5 Passengers</option>
                        </select>
                      )}
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.passengers && (
                    <p className="text-xs text-red-500">
                      {errors.passengers.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Class</label>
                  <div className="relative rounded-md border border-gray-300 overflow-hidden">
                    <Controller
                      control={control}
                      name="class"
                      rules={{ required: "Travel class is required" }}
                      render={({ field }) => (
                        <select
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          className="w-full appearance-none bg-transparent py-2 pl-3 pr-10 focus:outline-none focus:ring-0"
                        >
                          <option value="economy">Economy</option>
                          <option value="premium">Premium Economy</option>
                          <option value="business">Business</option>
                          <option value="first">First Class</option>
                        </select>
                      )}
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.class && (
                    <p className="text-xs text-red-500">
                      {errors.class.message}
                    </p>
                  )}
                </div>

                <div className="flex items-end">
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Search className="mr-2 h-4 w-4" /> Search Flights
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
