import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AppProvider } from "@/contexts/AppContext";
import Navigation from "@/components/layout/Navigation";
import { FlightProvider } from "@/contexts/FlightContext";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sky Wings",
  description: "Book your flight with Sky Wings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={cn("bg-background", inter.className)}>
        <FlightProvider>
          <AppProvider>
            <Navigation />
            <main>{children}</main>
          </AppProvider>
        </FlightProvider>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
