"use client";

import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAppContext } from "@/contexts/AppContext";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface User {
  id: string;
  email?: string;
  first_name?: string;
  last_name?: string;
}

interface NavigationProps {
  user?: User | null; // Make user optional since we'll get it from context
}

export default function Navigation({ user: userFromProps }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAppContext();

  // Use user from props if provided, otherwise use from context
  const currentUser = userFromProps ?? user;
  const router = useRouter();

  // Check if user is admin (assuming the user object has a role or isAdmin property)
  // const isAdmin = currentUser?.role === "admin" || currentUser?.isAdmin;
  const isAdmin = true;

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
  };

  const handleGoogleLogin = async () => {
    // We'll keep this part the same since it's redirecting to OAuth
    const { createClient } = await import("@/utils/supabase/client");
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast.error("Error logging in with Google");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <div
          onClick={() => router.push("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
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
          <span className="text-xl font-bold text-blue-600">Sky Wings</span>
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
          {!currentUser && (
            <Button
              variant="ghost"
              className="hidden md:flex items-center gap-2"
              onClick={handleGoogleLogin}
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
          )}

          {currentUser && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {currentUser.first_name && currentUser.last_name
                    ? `${currentUser.first_name} ${currentUser.last_name}`
                    : "Profile"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <User className="h-4 w-4 mr-2" />
                  View Profile
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

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
            {currentUser && (
              <>
                <Link
                  href="/profile"
                  className="text-sm font-medium hover:text-blue-600 transition-colors flex items-center"
                >
                  <User className="h-4 w-4 mr-2" />
                  View Profile
                </Link>
                {isAdmin && (
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium hover:text-blue-600 transition-colors flex items-center"
                  >
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                )}
                <Button
                  variant="outline"
                  className="justify-start mt-2 flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
