"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Menu,
  Search,
  Star,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "react-hot-toast";
export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [user, setUser] = useState<any>(null);
  const [returnDate, setReturnDate] = useState<Date | undefined>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const supabase = createClient();
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error logging out");
    }
    setUser(null);
    toast.success("Logged out successfully");
  };
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast.error("Error logging in with Google");
    }
    toast.success("Logged in successfully");
  };

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log({ user });
      setUser(user);
    };
    fetchUser();
  }, [supabase.auth]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-sky-50 to-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-blue-600"
            >
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
            </svg>
            <span className="text-xl font-bold text-blue-600">SkyWings</span>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/flights"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Flights
            </Link>
            <Link
              href="/deals"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Deals
            </Link>
            <Link
              href="/manage"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Manage
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              About
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="hidden md:flex items-center gap-2"
              onClick={user ? handleLogout : handleGoogleLogin}
            >
              {!user && (
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
              )}
              {user ? "Logout" : "Login with Google"}
            </Button>
            <Button>Book Now</Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="container py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-sm font-medium hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/flights"
                className="text-sm font-medium hover:text-blue-600 transition-colors"
              >
                Flights
              </Link>
              <Link
                href="/deals"
                className="text-sm font-medium hover:text-blue-600 transition-colors"
              >
                Deals
              </Link>
              <Link
                href="/manage"
                className="text-sm font-medium hover:text-blue-600 transition-colors"
              >
                Manage
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium hover:text-blue-600 transition-colors"
              >
                About
              </Link>
              <Button
                variant="outline"
                className="justify-start mt-2 flex items-center gap-2"
                onClick={() => {
                  /* Add your Google login logic here */
                }}
              >
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
                Login with Google
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1536226351486-8aa640c8b9f1?q=80&w=2000')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.6,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900/70 to-transparent" />

          <div className="container relative z-10 py-20 md:py-32">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Discover the World with SkyWings
              </h1>
              <p className="mt-6 text-lg text-white/90">
                Find and book your perfect flight to destinations worldwide.
                Best prices and exclusive deals available.
              </p>
              <div className="mt-8 flex gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Book Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white bg-blue-600/30 hover:bg-white hover:text-blue-600"
                >
                  View Offers
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Search Box */}
        <section className="container -mt-16 relative z-20 mb-20">
          <Card className="border-none shadow-xl">
            <CardContent className="p-6">
              <Tabs defaultValue="roundtrip">
                <TabsList className="mb-6">
                  <TabsTrigger value="roundtrip">Round Trip</TabsTrigger>
                  <TabsTrigger value="oneway">One Way</TabsTrigger>
                  <TabsTrigger value="multicity">Multi-City</TabsTrigger>
                </TabsList>

                <TabsContent value="roundtrip" className="space-y-4 mt-2">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">From</label>
                      <div className="flex items-center border rounded-md pl-3 bg-white">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="City or Airport"
                          className="border-0 focus-visible:ring-0"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">To</label>
                      <div className="flex items-center border rounded-md pl-3 bg-white">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="City or Airport"
                          className="border-0 focus-visible:ring-0"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Departure</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarDays className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Return</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarDays className="mr-2 h-4 w-4" />
                            {returnDate
                              ? format(returnDate, "PPP")
                              : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={returnDate}
                            onSelect={setReturnDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Passengers</label>
                      <Select defaultValue="1">
                        <SelectTrigger>
                          <SelectValue placeholder="Select passengers" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Passenger</SelectItem>
                          <SelectItem value="2">2 Passengers</SelectItem>
                          <SelectItem value="3">3 Passengers</SelectItem>
                          <SelectItem value="4">4 Passengers</SelectItem>
                          <SelectItem value="5">5+ Passengers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Class</label>
                      <Select defaultValue="economy">
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="economy">Economy</SelectItem>
                          <SelectItem value="premium">
                            Premium Economy
                          </SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="first">First Class</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-end">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <Search className="mr-2 h-4 w-4" /> Search Flights
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="oneway">
                  {/* Similar form for one-way flights */}
                  <p className="text-sm text-gray-500">
                    One-way flight search options would appear here.
                  </p>
                </TabsContent>

                <TabsContent value="multicity">
                  {/* Form for multi-city flights */}
                  <p className="text-sm text-gray-500">
                    Multi-city flight search options would appear here.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        {/* Featured Destinations */}
        <section className="container py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Popular Destinations
              </h2>
              <p className="text-gray-500 mt-2">
                Explore our most booked destinations
              </p>
            </div>
            <Button variant="ghost" className="mt-4 md:mt-0">
              View all destinations <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Paris",
                country: "France",
                image:
                  "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=700",
                price: 299,
              },
              {
                name: "New York",
                country: "United States",
                image:
                  "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=700",
                price: 449,
              },
              {
                name: "Tokyo",
                country: "Japan",
                image:
                  "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=700",
                price: 599,
              },
            ].map((destination, index) => (
              <Card key={index} className="group overflow-hidden">
                <div className="relative h-48 w-full overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundImage: `url(${destination.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-semibold text-white">
                      {destination.name}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {destination.country}
                    </p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Starting from</p>
                      <p className="text-xl font-bold">${destination.price}</p>
                    </div>
                    <Button size="sm">Explore</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Special Offers */}
        <section className="bg-blue-50 py-12">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  Special Offers
                </h2>
                <p className="text-gray-500 mt-2">
                  Limited-time deals you don&apos;t want to miss
                </p>
              </div>
              <Button variant="outline" className="mt-4 md:mt-0">
                View all offers <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-none shadow-md overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div
                    className="h-48 md:h-auto md:w-2/5 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=700')",
                    }}
                  />
                  <div className="p-6 md:w-3/5">
                    <Badge className="mb-2 bg-red-500">Limited Time</Badge>
                    <h3 className="text-xl font-bold mb-2">
                      Summer Beach Getaway
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Enjoy 25% off on flights to top beach destinations this
                      summer.
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm">
                        Use code: <span className="font-bold">SUMMER25</span>
                      </p>
                      <Button size="sm">Book Now</Button>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="border-none shadow-md overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div
                    className="h-48 md:h-auto md:w-2/5 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=700')",
                    }}
                  />
                  <div className="p-6 md:w-3/5">
                    <Badge className="mb-2 bg-blue-500">Weekend Special</Badge>
                    <h3 className="text-xl font-bold mb-2">City Break Deals</h3>
                    <p className="text-gray-600 mb-4">
                      Explore popular cities with our weekend flash sale prices.
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm">
                        Use code: <span className="font-bold">CITY20</span>
                      </p>
                      <Button size="sm">Book Now</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Features/Benefits */}
        <section className="container py-16">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
            Why Choose SkyWings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-none shadow-md">
              <CardHeader>
                <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <CardTitle className="mt-4">Best Price Guarantee</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Find a lower price elsewhere within 24 hours, and we&apos;ll
                  refund the difference.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-md">
              <CardHeader>
                <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <CardTitle className="mt-4">Secure Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Your payment and personal information is always protected with
                  advanced encryption.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-md">
              <CardHeader>
                <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                </div>
                <CardTitle className="mt-4">24/7 Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Our dedicated support team is available around the clock to
                  assist you with any questions.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-gray-50 py-16">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
              What Our Customers Say
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Emily Johnson",
                  photo: "https://randomuser.me/api/portraits/women/44.jpg",
                  text: "SkyWings made booking my international flight so easy. Their prices were the best I found, and customer service was excellent when I needed to make changes.",
                },
                {
                  name: "David Chen",
                  photo: "https://randomuser.me/api/portraits/men/32.jpg",
                  text: "I've been using SkyWings for business travel for years. Their user-friendly interface and reliable service keep me coming back. Highly recommended!",
                },
                {
                  name: "Sophia Williams",
                  photo: "https://randomuser.me/api/portraits/women/68.jpg",
                  text: "The flexible booking options saved me when I had to reschedule my trip last minute. SkyWings offers great protection plans that are actually worth it.",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="border-none shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6">
                      &quot;{testimonial.text}&quot;
                    </p>
                    <div className="flex items-center">
                      <Image
                        src={testimonial.photo}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">
                          Verified Customer
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-16">
          <Card className="border-none bg-blue-600 text-white shadow-xl">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold tracking-tight mb-2">
                  Ready for Your Next Adventure?
                </h2>
                <p className="text-blue-100">
                  Sign up for our newsletter and get exclusive flight deals
                  directly to your inbox.
                </p>
              </div>

              <div className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="Enter your email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                  <Button variant="secondary">Subscribe</Button>
                </div>
                <p className="text-xs text-center mt-3 text-blue-100">
                  By subscribing, you agree to our terms and privacy policy.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-blue-400"
                >
                  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                </svg>
                <span className="text-xl font-bold text-white">SkyWings</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Making air travel accessible, affordable, and enjoyable for
                everyone.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Press
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Partners
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Booking Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    COVID-19 Info
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Accessibility
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Fare Rules
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Baggage Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} SkyWings Airlines. All rights
                reserved.
              </p>
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <Image
                  src="/visa.svg"
                  alt="Visa"
                  width={32}
                  height={32}
                  className="h-8"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <Image
                  src="/mastercard.svg"
                  alt="Mastercard"
                  width={32}
                  height={32}
                  className="h-8"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <Image
                  src="/amex.svg"
                  alt="American Express"
                  width={32}
                  height={32}
                  className="h-8"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <Image
                  src="/paypal.svg"
                  alt="PayPal"
                  width={32}
                  height={32}
                  className="h-8"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
