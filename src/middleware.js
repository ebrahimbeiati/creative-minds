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
import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
