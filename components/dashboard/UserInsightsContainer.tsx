"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/contexts/AppContext";
import { createClient } from "@/utils/supabase/client";
import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  MapPin,
  Clock,
  CreditCard,
  Activity,
  TrendingUp,
  Globe,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import UserActivityChart from "@/components/dashboard/UserActivityChart";
import UserTripMap from "@/components/dashboard/UserTripMap";
import UserStatsCard from "@/components/dashboard/UserStatsCards";
import RecentBookings from "@/components/dashboard/RecentBookings";

interface UserDetail {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  joined_date: string;
  last_active: string;
  total_trips: number;
  upcoming_trips: number;
  total_spent: number;
  preferred_destination: string;
  status: "active" | "inactive";
}

interface Booking {
  id: string;
  from: string;
  to: string;
  date: string;
  status: "completed" | "upcoming" | "cancelled";
  amount: number;
  flightNumber: string;
}

interface UserInsightsContainerProps {
  userId: string;
}

export default function UserInsightsContainer({
  userId,
}: UserInsightsContainerProps) {
  const { user, isLoading } = useAppContext();
  const router = useRouter();
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    // Check if user is admin
    if (!isLoading && (!user || !isAdmin(user))) {
      router.push("/");
      return;
    }

    const fetchUserData = async () => {
      if (!user) return;

      const supabase = createClient();

      try {
        // In a real app, you would fetch real data
        // For example:
        // const { data: userData, error: userError } = await supabase
        //   .from('profiles')
        //   .select('*')
        //   .eq('id', userId)
        //   .single();

        // Mock user data
        setUserDetail({
          id: userId,
          email: "jane.doe@example.com",
          first_name: "Jane",
          last_name: "Doe",
          avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
          joined_date: "2023-01-15",
          last_active: "2023-06-22",
          total_trips: 12,
          upcoming_trips: 3,
          total_spent: 4586.75,
          preferred_destination: "Tokyo",
          status: "active",
        });

        // Mock bookings data
        setBookings([
          {
            id: "b1",
            from: "New York",
            to: "London",
            date: "2023-12-10",
            status: "completed",
            amount: 850.5,
            flightNumber: "SK123",
          },
          {
            id: "b2",
            from: "London",
            to: "Paris",
            date: "2024-01-15",
            status: "completed",
            amount: 320.75,
            flightNumber: "AZ456",
          },
          {
            id: "b3",
            from: "Paris",
            to: "Tokyo",
            date: "2024-06-22",
            status: "upcoming",
            amount: 1200.0,
            flightNumber: "JL789",
          },
          {
            id: "b4",
            from: "Tokyo",
            to: "New York",
            date: "2024-06-30",
            status: "upcoming",
            amount: 1150.25,
            flightNumber: "AA012",
          },
          {
            id: "b5",
            from: "New York",
            to: "Miami",
            date: "2023-10-05",
            status: "completed",
            amount: 450.0,
            flightNumber: "DL345",
          },
        ]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoadingData(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user, isLoading, router, userId]);

  // Function to check if user is admin
  const isAdmin = (user: any) => {
    // In a real app, you would check user roles from database or JWT
    // For demo purposes, we'll hardcode this to true
    return true;
  };

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const navigateBack = () => {
    router.push("/dashboard");
  };

  if (isLoading || isLoadingData) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[70vh]">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-t-blue-600 border-b-blue-600 border-r-transparent border-l-transparent animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading user insights...</p>
        </div>
      </div>
    );
  }

  if (!userDetail) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
          <p className="text-gray-600 mb-6">Unable to load user information</p>
          <Button onClick={navigateBack}>Return to Dashboard</Button>
        </div>
      </div>
    );
  }

  // Prepare activity data for chart (mock data)
  const activityData = [
    { month: "Jan", bookings: 1, spend: 850 },
    { month: "Feb", bookings: 0, spend: 0 },
    { month: "Mar", bookings: 2, spend: 1200 },
    { month: "Apr", bookings: 1, spend: 450 },
    { month: "May", bookings: 3, spend: 1650 },
    { month: "Jun", bookings: 2, spend: 1100 },
    { month: "Jul", bookings: 1, spend: 620 },
    { month: "Aug", bookings: 0, spend: 0 },
    { month: "Sep", bookings: 1, spend: 780 },
    { month: "Oct", bookings: 0, spend: 0 },
    { month: "Nov", bookings: 2, spend: 1520 },
    { month: "Dec", bookings: 1, spend: 850 },
  ];

  // Prepare statistics for the stats cards
  const userStats = [
    {
      title: "Total Trips",
      value: userDetail.total_trips.toString(),
      icon: <Globe className="h-5 w-5 text-blue-500" />,
      change: "+8% vs last year",
    },
    {
      title: "Total Spent",
      value: `$${userDetail.total_spent.toLocaleString()}`,
      icon: <CreditCard className="h-5 w-5 text-green-500" />,
      change: "+12% vs last year",
    },
    {
      title: "Avg. Trip Cost",
      value: `$${Math.round(
        userDetail.total_spent / userDetail.total_trips
      ).toLocaleString()}`,
      icon: <TrendingUp className="h-5 w-5 text-purple-500" />,
      change: "+3% vs last year",
    },
    {
      title: "Upcoming Trips",
      value: userDetail.upcoming_trips.toString(),
      icon: <Activity className="h-5 w-5 text-orange-500" />,
      change: "Next: Jun 22",
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      {/* Back button and header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
          onClick={navigateBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden mr-4">
              {userDetail.avatar_url ? (
                <img
                  src={userDetail.avatar_url}
                  alt={`${userDetail.first_name}'s avatar`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-8 w-8 text-gray-400" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {userDetail.first_name} {userDetail.last_name}
              </h1>
              <div className="flex items-center mt-1 text-gray-500">
                <Mail className="h-4 w-4 mr-1" />
                <span>{userDetail.email}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-0 flex flex-col sm:items-end">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-gray-400" />
              <span className="text-gray-600">
                Member since {formatDate(userDetail.joined_date)}
              </span>
            </div>
            <div className="flex items-center mt-1">
              <Clock className="h-4 w-4 mr-1 text-gray-400" />
              <span className="text-gray-600">
                Last active: {formatDate(userDetail.last_active)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <UserStatsCard stats={userStats} />

      {/* Activity Graph */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="p-5 border-b">
            <h2 className="text-lg font-semibold text-gray-800">
              Booking Activity
            </h2>
          </div>
          <div className="p-5">
            <UserActivityChart data={activityData} />
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="p-5 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Travel Map</h2>
          </div>
          <div className="p-5">
            <UserTripMap bookings={bookings} />
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Preferred Destination
                </div>
                <div className="font-medium flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                  {userDetail.preferred_destination}
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="text-sm text-gray-500">Most Visited Region</div>
                <div className="font-medium">Europe</div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="text-sm text-gray-500">Trip Frequency</div>
                <div className="font-medium">Monthly</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="mt-8">
        <RecentBookings bookings={bookings} />
      </div>

      {/* Risk Assessment */}
      <div className="mt-8 bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            User Risk Assessment
          </h2>
        </div>
        <div className="p-5">
          <div className="flex items-center">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center">
                <span className="text-lg font-bold text-green-600">Low</span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="font-medium">Low Risk User</h3>
              <p className="text-sm text-gray-500 mt-1">
                This user has a consistent booking pattern with no suspicious
                activities.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">
                  No significant risk factors identified. User has completed all
                  previous trips without cancellations and has regular travel
                  patterns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
