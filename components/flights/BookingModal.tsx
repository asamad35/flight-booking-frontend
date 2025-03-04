"use client";

import { useContext, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PassengerForm from "./PassengerForm";
import PaymentForm from "./PaymentForm";
import { Flight } from "@/types/flight";
import { useFlightContext } from "@/contexts/FlightContext";
import { BookingData } from "@/contexts/FlightContext";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { flightApi } from "@/lib/api/flight-api";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  flight: Flight;
  passengerCount: number;
}

type FormValues = {
  passengers: {
    fullName: string;
    phoneNumber: string;
    idNumber: string;
  }[];
  payment: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    nameOnCard: string;
  };
};

export default function BookingModal({
  isOpen,
  onClose,
  flight,
  passengerCount,
}: BookingModalProps) {
  const searchParams = useSearchParams();

  const [step, setStep] = useState<"passengers" | "payment" | "confirmation">(
    "passengers"
  );
  const passengerArray = Array.from(
    { length: passengerCount },
    (_, i) => i + 1
  );

  // Create dummy passenger data
  const dummyPassengerData = [
    { fullName: "John Smith", phoneNumber: "5552347890", idNumber: "US789456" },
    {
      fullName: "Sarah Johnson",
      phoneNumber: "5553456789",
      idNumber: "US456123",
    },
    {
      fullName: "Michael Brown",
      phoneNumber: "5554567890",
      idNumber: "US123789",
    },
    {
      fullName: "Emma Wilson",
      phoneNumber: "5555678901",
      idNumber: "US987654",
    },
  ];

  const methods = useForm<FormValues>({
    defaultValues: {
      // Generate passenger data based on passenger count
      passengers: Array.from({ length: passengerCount }, (_, i) => ({
        fullName: dummyPassengerData[i % dummyPassengerData.length].fullName,
        phoneNumber:
          dummyPassengerData[i % dummyPassengerData.length].phoneNumber,
        idNumber: dummyPassengerData[i % dummyPassengerData.length].idNumber,
      })),

      // Dummy payment data
      payment: {
        cardNumber: "4111111111111111",
        expiryDate: "12/25",
        cvv: "123",
        nameOnCard: "John Smith",
      },
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    trigger,
    formState: { isSubmitting, errors },
  } = methods;

  const nextStep = async () => {
    if (step === "passengers") {
      const isValid = await trigger("passengers");
      if (isValid) setStep("payment");
    } else if (step === "payment") {
      const isValid = await trigger("payment");
      if (isValid) setStep("confirmation");
    }
  };

  const previousStep = () => {
    if (step === "payment") setStep("passengers");
    if (step === "confirmation") setStep("payment");
  };

  const onSubmit = async (data: FormValues) => {
    console.log("Booking submitted:", data);
    const from = searchParams.get("from") || flight.departureAirport;
    const to = searchParams.get("to") || flight.arrivalAirport;
    const tripType = searchParams.get("tripType") || "oneway";
    const departureDate =
      searchParams.get("departureDate") || flight.departureDate;
    const returnDate = searchParams.get("returnDate") || null;
    const cabinClass = searchParams.get("cabinClass") || "economy";
    const bookingData: BookingData = {
      flightId: flight.id,
      from: from,
      to: to,
      tripType: tripType,
      departureDate: departureDate,
      returnDate: returnDate || undefined,
      passengers: passengerCount,
      cabinClass: cabinClass,
      passengerDetails: data.passengers,
      paymentDetails: data.payment,
    };

    try {
      // await bookFlight(bookingData);
      await flightApi.bookFlight(bookingData);
      toast.success("Booking successful, Please check your profile for ticket");
      setStep("passengers");
      onClose();
    } catch (error) {
      toast.error("Booking failed");
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-6">
      <div
        className={`h-2 w-2 rounded-full ${
          step === "passengers" ? "bg-blue-600" : "bg-gray-300"
        }`}
      ></div>
      <div className="h-px w-8 bg-gray-300"></div>
      <div
        className={`h-2 w-2 rounded-full ${
          step === "payment" ? "bg-blue-600" : "bg-gray-300"
        }`}
      ></div>
      <div className="h-px w-8 bg-gray-300"></div>
      <div
        className={`h-2 w-2 rounded-full ${
          step === "confirmation" ? "bg-blue-600" : "bg-gray-300"
        }`}
      ></div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>
            {step === "passengers" && "Passenger Information"}
            {step === "payment" && "Payment Details"}
            {step === "confirmation" && "Confirm Booking"}
          </DialogTitle>
        </DialogHeader>

        {renderStepIndicator()}

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Passenger Information Step */}
            {step === "passengers" && (
              <div className="space-y-6">
                {passengerArray.map((passengerNum) => (
                  <div
                    key={passengerNum}
                    className="border border-gray-200 rounded-md p-4"
                  >
                    <h3 className="font-medium mb-4">
                      Passenger {passengerNum}
                    </h3>
                    <PassengerForm index={passengerNum - 1} />
                  </div>
                ))}
              </div>
            )}

            {/* Payment Step */}
            {step === "payment" && <PaymentForm />}

            {/* Confirmation Step */}
            {step === "confirmation" && (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-md">
                  <h3 className="font-medium text-blue-800">Flight Details</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div>
                      <p className="text-gray-500">From - To</p>
                      <p>
                        {flight.departureAirport} - {flight.arrivalAirport}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Date</p>
                      <p>{flight.departureDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Time</p>
                      <p>
                        {flight.departureTime} - {flight.arrivalTime}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Total Price</p>
                      <p className="font-bold text-blue-600">
                        ${flight.price * passengerCount}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Terms and Conditions</h3>
                  <p className="text-sm text-gray-600">
                    By completing this booking, you agree to our terms and
                    conditions, privacy policy, and cancellation policy. Please
                    review all details above before confirming your booking.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between space-x-3 pt-4 border-t">
              {step !== "passengers" ? (
                <Button type="button" variant="outline" onClick={previousStep}>
                  <ChevronLeft className="h-4 w-4 mr-1" /> Back
                </Button>
              ) : (
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              )}

              {step !== "confirmation" ? (
                <Button type="button" onClick={nextStep}>
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleSubmit(onSubmit)()}
                >
                  {isSubmitting ? "Processing..." : "Complete Booking"}
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
