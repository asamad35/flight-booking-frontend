import { type ClassValue, clsx } from "clsx";
import { NextRequest } from "next/server";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

// Function to extract and combine multi-part cookies
export const extractSupabaseSession = (cookies: string[]) => {
  try {
    // Find all auth token parts (they're likely named something like sb-<project>-auth-token.0, sb-<project>-auth-token.1)
    const authCookieParts = cookies
      .map((cookie) => cookie.trim())
      .filter((cookie) => cookie.includes("-auth-token"));

    if (authCookieParts.length === 0) return null;

    // Sort by part index and combine
    const sortedParts = authCookieParts.sort((a, b) => {
      const indexA = parseInt(a.split(".").pop() || "0");
      const indexB = parseInt(b.split(".").pop() || "0");
      return indexA - indexB;
    });

    // Extract and combine values
    let combinedValue = "";
    for (const part of sortedParts) {
      const value = part.substring(part.indexOf("=") + 1);
      combinedValue += decodeURIComponent(value);
    }

    // Parse the JSON and extract access_token
    const sessionData = JSON.parse(combinedValue);
    return sessionData.access_token;
  } catch (error) {
    console.error("Error extracting session:", error);
    return null;
  }
};

export const getTokenFromCookieAtServer = (request: NextRequest) => {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = cookieHeader.split(";");
  const token = extractSupabaseSession(cookies);
  return token;
};
