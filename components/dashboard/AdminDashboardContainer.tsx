"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/contexts/AppContext";
import DashboardHeader from "./DashboardHeader";
import UsersList from "./UsersList";
import { createClient } from "@/utils/supabase/client";

interface UserData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  total_trips: number;
  joined_date: string;
  status: "active" | "inactive";
}

export default function AdminDashboardContainer() {
  const { user, isLoading } = useAppContext();
  const router = useRouter();
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  useEffect(() => {
    // Check if user is admin, redirect if not
    if (!isLoading && (!user || !isAdmin(user))) {
      router.push("/");
      return;
    }

    const fetchUsers = async () => {
      if (!user) return;

      const supabase = createClient();

      try {
        // In a real app, you would fetch real data
        // const { data, error } = await supabase.from('profiles').select('*');

        // Mock data for users
        setUsers([
          {
            id: "1",
            email: "jane.doe@example.com",
            first_name: "Jane",
            last_name: "Doe",
            avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
            total_trips: 12,
            joined_date: "2023-01-15",
            status: "active",
          },
          {
            id: "2",
            email: "john.smith@example.com",
            first_name: "John",
            last_name: "Smith",
            avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
            total_trips: 8,
            joined_date: "2023-02-20",
            status: "active",
          },
          {
            id: "3",
            email: "emily.jones@example.com",
            first_name: "Emily",
            last_name: "Jones",
            avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
            total_trips: 5,
            joined_date: "2023-03-10",
            status: "inactive",
          },
          {
            id: "4",
            email: "michael.brown@example.com",
            first_name: "Michael",
            last_name: "Brown",
            avatar_url:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
            total_trips: 15,
            joined_date: "2022-11-05",
            status: "active",
          },
          {
            id: "5",
            email: "sarah.wilson@example.com",
            first_name: "Sarah",
            last_name: "Wilson",
            avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
            total_trips: 3,
            joined_date: "2023-05-22",
            status: "active",
          },
        ]);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoadingUsers(false);
      }
    };

    if (user) {
      fetchUsers();
    }
  }, [user, isLoading, router]);

  // Function to check if user is admin
  const isAdmin = (user: any) => {
    // In a real app, you would check user roles from database or JWT
    // For demo purposes, we'll hardcode this to true
    return true;
  };

  if (isLoading || isLoadingUsers) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[70vh]">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-t-blue-600 border-b-blue-600 border-r-transparent border-l-transparent animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <DashboardHeader />
      <div className="mt-8">
        <UsersList users={users} />
      </div>
    </div>
  );
}
