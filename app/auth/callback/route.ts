import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Get the code from the URL
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (!code) {
    // If there's no code, redirect to login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const supabase = await createClient();

    // Exchange the code for a session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("Error exchanging code for session:", error.message);
      return NextResponse.redirect(
        new URL("/login?error=auth_error", request.url)
      );
    }

    // Successful login - redirect to home or dashboard
    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.error("Unexpected error during auth callback:", error);
    return NextResponse.redirect(
      new URL("/login?error=unknown_error", request.url)
    );
  }
}
