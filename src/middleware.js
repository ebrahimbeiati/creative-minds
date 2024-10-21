// import { withAuth } from "next-auth/middleware";

// export default withAuth({
//   pages: {
//     signIn: "/login", // Redirect unauthenticated users to /login
//   },
// });

// export const config = {
//   matcher: [
//     "/admin/:path*", // Protect all /admin routes
//     "/blog/:path*", // Protect all /blog routes
//   ],
// };

// middleware.js
// middleware.js


// src/middleware/adminMiddleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;
  const isOnAdminPanel = pathname.startsWith("/admin");
  const isOnLoginPage = pathname.startsWith("/login");

  // If user is not logged in, redirect to login page
  if (!token && !isOnLoginPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If user is not an admin, block access to admin panel
  if (isOnAdminPanel && !token?.isAdmin) {
    return NextResponse.redirect(new URL("/403", req.url));
  }

  // Prevent logged-in users from visiting login page
  if (isOnLoginPage && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/blog/:path*", "/login"],
};
