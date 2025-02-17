// middleware.ts
import { NextRequest, NextResponse } from "next/server";

// This middleware applies to both our dynamic login page and the API routes.
export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // 1. If the request is for a dynamic login page (e.g. /[realm]/login), extract the realm from the URL and store it in a cookie.
  const loginPageMatch = pathname.match(/^\/([^/]+)\/login$/);
  if (loginPageMatch) {
    const realm = loginPageMatch[1];
    const response = NextResponse.next();
    // Set a cookie named "realm" valid for all routes.
    response.cookies.set("realm", realm, { path: "/" });
    return response;
  }

  // 2. For API routes (e.g. /api/auth/...), if the "realm" query parameter is missing, try to get it from the cookie.
  if (pathname.startsWith("/api/")) {
    if (!searchParams.has("realm")) {
      const realmCookie = request.cookies.get("realm")?.value;
      if (realmCookie) {
        searchParams.set("realm", realmCookie);
        request.nextUrl.search = searchParams.toString();
        // Rewrite the request URL so that the realm query parameter is appended.
        return NextResponse.rewrite(request.nextUrl);
      }
    }
  }
  return NextResponse.next();
}

// Configure the matcher so that middleware applies to the dynamic login page and API routes.
export const config = {
  matcher: ["/:realm/login", "/api/:path*"],
};

// Set CORS headers for other API routes
// response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your frontend origin
// response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
// response.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key');
