"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { CreditCard, Calendar, LockKeyhole, User } from "lucide-react";

export default function PaymentForm() {
  const { control } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-md mb-4">
        <p className="text-sm text-blue-800">
          <span className="font-medium">Secure Payment:</span> Your payment
          information is encrypted and secure.
        </p>
      </div>

      <div className="space-y-4">
        <FormField
          control={control}
          name="payment.cardNumber"
          rules={{
            required: "Card number is required",
            pattern: {
              value: /^[0-9]{13,19}$/,
              message: "Please enter a valid card number",
            },
          }}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-gray-900">Card Number</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input placeholder="4111 1111 1111 1111" {...field} />
                  <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="payment.expiryDate"
            rules={{
              required: "Expiry date is required",
              pattern: {
                value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                message: "Format: MM/YY",
              },
            }}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-gray-900">Expiry Date</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="MM/YY" {...field} />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="payment.cvv"
            rules={{
              required: "CVV is required",
              pattern: { value: /^[0-9]{3,4}$/, message: "Invalid CVV" },
            }}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-gray-900">CVV</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="123" type="password" {...field} />
                    <LockKeyhole className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="payment.nameOnCard"
          rules={{ required: "Name on card is required" }}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-gray-900">Name on Card</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input placeholder="John Doe" {...field} />
                  <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
