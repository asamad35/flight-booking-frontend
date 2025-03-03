import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  // Create a response object that we can modify
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value;
        },
        set(name, value, options) {
          // Set cookie in the request
          request.cookies.set({
            name,
            value,
            ...options,
          });

          // Also set cookie in the response
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name, options) {
          // Remove cookie from request
          request.cookies.set({
            name,
            value: "",
            ...options,
          });

          // Also remove from response
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  return response;
}
