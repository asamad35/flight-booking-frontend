import { updateSession } from "@/utils/supabase/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getTokenFromCookieAtServer } from "./lib/utils";

export async function middleware(request: NextRequest) {
  // First update the session (existing functionality)
  const response = await updateSession(request);

  // Check if the request is for the dashboard route
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    try {
      // Get the authorization token from the request cookies
      const authToken = getTokenFromCookieAtServer(request);

      if (!authToken) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      // Make a direct fetch call to your API
      const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/api/users/me";
      const userResponse = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!userResponse.ok) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      const currentUser = await userResponse.json();

      // If user is not an admin, redirect to home page
      if (currentUser?.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      // If there's an error (like user not authenticated), redirect to home
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Otherwise continue with the updated session response
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
