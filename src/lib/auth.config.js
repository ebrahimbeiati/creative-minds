// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { connectToDb } from "@/lib/utils"; // Ensure you import your DB connection
// import { User } from "@/lib/models"; // Ensure you have a User model for your database

// export const authConfig = {
//   pages: {
//     signIn: "/login", // Redirect to login page when unauthenticated
//   },
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       async profile(profile) {
//         return {
//           id: profile.id,
//           email: profile.email,
//           name: profile.name,
//           image: profile.picture,
//         };
//       },
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.isAdmin = user.isAdmin || false;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id;
//         session.user.isAdmin = token.isAdmin;
//       }
//       return session;
//     },
//     async signIn({ user, account, profile }) {
//       if (account.provider === "google") {
//         await connectToDb(); // Ensure the DB connection is established
//         const existingUser = await User.findOne({ email: profile.email });

//         if (!existingUser) {
//           // Create a new user if they do not exist
//           const newUser = new User({
//             username: profile.name, // Use the Google name as username
//             email: profile.email,
//             img: profile.picture,
//           });
//           await newUser.save();
//         }
//       }
//       return true; // Allow sign-in
//     },
//   },
// };

// // NextAuth handler
// const handler = NextAuth(authConfig);
// export { handler as GET, handler as POST };

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    // FOR MORE DETAIL ABOUT CALLBACK FUNCTIONS CHECK https://next-auth.js.org/configuration/callbacks
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    authorized({ auth, request }) {
      const user = auth?.user;
      const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
      const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog");
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

      // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD

      if (isOnAdminPanel && !user?.isAdmin) {
        return false;
      }

      // ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE

      if (isOnBlogPage && !user) {
        return false;
      }

      // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE

      if (isOnLoginPage && user) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return true;
    },
  },
};