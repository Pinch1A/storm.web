import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key');

  // Handle preflight requests for OPTIONS method
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { headers: response.headers });
  }

  return response;
}

// Apply middleware only to API routes
export const config = {
  matcher: '/api/:path*', // Only apply to API routes
};
