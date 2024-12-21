// middleware.ts

import { NextRequest, NextResponse } from 'next/server';

// Regular expression to match Auth0's API routes
const AUTH0_API_ROUTE_REGEX = /^\/api\/auth\/.*$/;

export function middleware(request: NextRequest) {

  const { pathname } = request.nextUrl;

  // If the request is to an Auth0 API route, skip CORS handling
  if (AUTH0_API_ROUTE_REGEX.test(pathname)) {
    console.log('Auth0 route accessed:', pathname);
    return NextResponse.next();
  }

  const response = NextResponse.next();

  // Set CORS headers for other API routes
  response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your frontend origin
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key');

  // Handle preflight requests for OPTIONS method
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { headers: response.headers });
  }

  return response;
}

// Apply middleware only to API routes, excluding Auth0 routes
export const config = {
  matcher: [
    '/api/:path*',         // Apply to all API routes
  ],
};
