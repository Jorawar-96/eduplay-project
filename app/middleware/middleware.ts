import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('role')?.value;
  const path = request.nextUrl.pathname;

  // Redirect to login if trying to access protected routes without a token
  if (!token && (path.startsWith('/dashboard') || path.startsWith('/map') || path.startsWith('/boss-fight') || path.startsWith('/teacher') || path.startsWith('/shop') || path.startsWith('/oracle') || path.startsWith('/leaderboard'))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Block students from accessing the teacher dashboard
  if (token && role === 'student' && path.startsWith('/teacher')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Block teachers from accessing student game routes (optional, but good practice)
  if (token && role === 'teacher' && (path.startsWith('/boss-fight') || path.startsWith('/map'))) {
    return NextResponse.redirect(new URL('/teacher', request.url));
  }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = { matcher: ['/dashboard/:path*', '/map/:path*', '/boss-fight/:path*', '/teacher/:path*', '/shop/:path*', '/oracle/:path*', '/leaderboard/:path*'] };
