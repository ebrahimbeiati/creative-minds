import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect((user) => {
      return  user?.publicMetadata?.role === 'admin';
    });
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/(admin)",
  ],
};

// const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/"]);
// export default clerkMiddleware({
// isPublicRoute,
// async afterAuth(req, auth) {
//   if (!auth.userId && !isPublicRoute(req.nextUrl.pathname)) {
//     return NextResponse.redirect(new URL("/sign-in", req.url));
//   }

//   if (auth.userId) {
//     try {
//       const user = await clerkClient.users.getUser(auth.userId);
//       const role = typeof user.publicMetadata.role === "string" ? user.publicMetadata.role : undefined;
//       const isAdmin = role === "admin";

//       if (isAdmin && req.nextUrl.pathname === "/admin") {
//         return NextResponse.redirect(new URL("/admin", req.url));
//       }

//       if (!isAdmin && req.nextUrl.pathname.startsWith("/admin")) {
//         return NextResponse.redirect(new URL("/dashboard", req.url));
//       }

//       if (isPublicRoute(req.nextUrl.pathname)) {
//         return NextResponse.redirect(new URL(isAdmin ? "/admin/dashboard" : "/dashboard", req.url));
//       }
//     } catch (error) {
//       console.error("Error fetching user:", error);
//       return NextResponse.redirect(new URL("/sign-in", req.url));
//     }
//   }
// }

// }
// );

// export const config = {
//   matcher: [
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     "/(api|trpc)(.*)",
//   ],
// };
