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
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

// Custom middleware to protect admin routes
const adminMiddleware = async (req) => {
  const session = await getSession({ req });

  // If no session, redirect to login
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If user is not admin, redirect to a forbidden page
  if (!session.user.isAdmin) {
    return NextResponse.redirect(new URL("/403", req.url));
  }

  // If user is authenticated and is admin, allow the request to proceed
  return NextResponse.next();
};

// Export the middleware function
export default adminMiddleware;

// Configuration for the middleware
export const config = {
  matcher: [
    "/admin/:path*", // Protect all /admin routes
    "/blog/:path*", // You can include this if needed
  ],
};
