"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface CTASectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  disclaimer?: string;
}

export default function CTASection({
  title = "Ready for Your Next Adventure?",
  description = "Sign up for our newsletter and get exclusive flight deals directly to your inbox.",
  buttonText = "Subscribe",
  disclaimer = "By subscribing, you agree to our terms and privacy policy.",
}: CTASectionProps) {
  return (
    <section className="container py-16">
      <Card className="border-none bg-blue-600 text-white shadow-xl">
        <CardContent className="p-8 md:p-12">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold tracking-tight mb-2">{title}</h2>
            <p className="text-blue-100">{description}</p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button variant="secondary">{buttonText}</Button>
            </div>
            <p className="text-xs text-center mt-3 text-blue-100">
              {disclaimer}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
