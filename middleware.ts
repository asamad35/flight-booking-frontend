import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  // First update the session (existing functionality)
  const response = await updateSession(request);

  // Now check if user is logged in and trying to access login page
  const requestUrl = new URL(request.url);
  const isLoginPage = requestUrl.pathname === "/login";

  if (isLoginPage) {
    // Create Supabase client to check auth status
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name) {
            return request.cookies.get(name)?.value;
          },
          set() {}, // We don't need to set cookies here
          remove() {}, // We don't need to remove cookies here
        },
      }
    );

    // Check if user is logged in
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // If user is logged in and trying to access login page, redirect to home
    if (session) {
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
