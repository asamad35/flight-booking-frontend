"use client";

import { createClient } from "@/utils/supabase/client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// Define the shape of our context state
type AppContextType = {
  user: any | null;
  isLoading: boolean;
  setUser: (user: any | null) => void;
  signOut: () => Promise<void>;
  // Add more state properties and functions here in the future
};

// Create the context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component that wraps your app and makes the context available
export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const supabase = createClient();

  useEffect(() => {
    // Function to fetch the user
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const { data } = await supabase.auth.getUser();
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Call the function
    fetchUser();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // Clean up the listener when the component unmounts
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  // Function to sign out
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // The value that will be available to consumers of the context
  const value = {
    user,
    isLoading,
    setUser,
    signOut,
    // Add more state and functions here in the future
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook to use the app context
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
