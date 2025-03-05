import { getTokenFromCookieAtServer } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function GET(request: NextRequest) {
  try {
    // Get the Cookie header from the incoming request
    const token = getTokenFromCookieAtServer(request);
    if (!token) {
      return NextResponse.json(
        { error: "No authentication cookies found" },
        { status: 401 }
      );
    }

    // Forward the request to the backend API with the cookie header
    const response = await fetch(`${API_URL}/api/users/me`, {
      headers: {
        "Content-Type": "application/json",
        // Forward the cookie header
        Cookie: `access_token=${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}
