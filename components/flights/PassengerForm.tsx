"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

interface PassengerFormProps {
  index: number;
}

export default function PassengerForm({ index }: PassengerFormProps) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={control}
        name={`passengers.${index}.fullName`}
        rules={{
          required: "Full name is required",
          minLength: {
            value: 3,
            message: "Name must be at least 3 characters",
          },
        }}
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="text-gray-900">Full Name</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`passengers.${index}.phoneNumber`}
        rules={{
          required: "Phone number is required",
          pattern: {
            value: /^\+?[0-9]{10,15}$/,
            message: "Please enter a valid phone number",
          },
        }}
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="text-gray-900">Phone Number</FormLabel>
            <FormControl>
              <Input placeholder="+1 234 567 8900" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`passengers.${index}.idNumber`}
        rules={{
          required: "ID number is required",
          minLength: { value: 5, message: "ID must be at least 5 characters" },
        }}
        render={({ field }) => (
          <FormItem className="md:col-span-2 space-y-1">
            <FormLabel className="text-gray-900">
              ID Number (Passport/National ID)
            </FormLabel>
            <FormControl>
              <Input placeholder="AB123456" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
