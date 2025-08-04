// This file exports middleware that protects routes
export { default } from 'next-auth/middleware';

// This config specifies which routes to protect
export const config = {
  matcher: ['/admin/dashboard/:path*'], // Protect all routes starting with /admin/dashboard
};