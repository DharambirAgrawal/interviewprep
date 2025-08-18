import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define public routes that don't require authentication
const PUBLIC_ROUTES = [
  "/",
  "/auth/login",
  "/auth/signup",
  "/auth/forgot-password",
];

// Define dashboard routes that require authentication
const PROTECTED_ROUTES = [
  "/dashboard",
  "/dashboard/home",
  "/dashboard/profile",
  "/dashboard/settings",
  "/dashboard/create-post",
  "/dashboard/posts/upload",
  "/dashboard/posts/view",
  "/dashboard/images/upload",
  "/dashboard/images/gallery",
  "/dashboard/my-posts",
  "/dashboard/preview/blog",
  "/dashboard/course/upload",
  "/dashboard/course/view",
  "/dashboard/calendar",
  "/dashboard/users",
];

// Function to parse JWT token and get user data
function parseJwt(token: string) {
  try {
    // Get the payload part of the JWT
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));
    return payload;
  } catch (error) {
    console.error("Error parsing JWT:", error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow requests to Next.js assets and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if the path is a public route
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route)
  );

  // If it's a public route, allow access
  if (isPublicRoute) {
    // If user is already authenticated and trying to access login/signup, redirect to dashboard
    if (pathname === "/auth/login" || pathname === "/auth/signup") {
      const token = request.cookies.get("token")?.value;
      if (token) {
        try {
          // Verify the token is valid by checking expiration
          const payload = parseJwt(token);
          if (payload && payload.exp && payload.exp * 1000 > Date.now()) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
          }
        } catch (error) {
          // If token is invalid, continue to login page
          console.error("Token validation error:", error);
        }
      }
    }
    return NextResponse.next();
  }

  // For protected routes, check if user is authenticated
  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    const token = request.cookies.get("token")?.value;

    // If no token is present, redirect to login
    if (!token) {
      const url = new URL("/auth/login", request.url);
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }

    try {
      // Verify the token is valid by checking expiration
      const payload = parseJwt(token);

      if (!payload || !payload.exp || payload.exp * 1000 <= Date.now()) {
        // Token is expired or invalid, redirect to login
        const url = new URL("/auth/login", request.url);
        url.searchParams.set("from", pathname);
        return NextResponse.redirect(url);
      }

      // Token is valid, allow access
      return NextResponse.next();
    } catch (error) {
      console.error("Token validation error:", error);
      const url = new URL("/auth/login", request.url);
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  // For any other routes, default to allowing access
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ files (public image files)
     * - Any files with extensions (.js, .css, etc)
     */
    "/((?!_next/static|_next/image|favicon.ico|images/|.*\\.[^/]*$).*)",
  ],
};
