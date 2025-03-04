"use client";

import Link from "next/link";
import { ArrowLeft, ConstructionIcon } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-sky-50 to-white">
      <main className="flex-1 container py-16 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <ConstructionIcon className="h-8 w-8 text-blue-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Page Under Development
          </h1>

          <p className="text-gray-600 mb-6">
            We&apos;re working on building this feature. Please check back soon
            for updates.
          </p>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
              </Link>
            </Button>

            <p className="text-sm text-gray-500">
              If you believe this is an error, please contact support.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
