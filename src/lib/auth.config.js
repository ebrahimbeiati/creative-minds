// export const authConfig = {
//   pages: {
//     signIn: "/login",
//   },
//   providers: [],
//   callbacks: {
//     // FOR MORE DETAIL ABOUT CALLBACK FUNCTIONS CHECK https://next-auth.js.org/configuration/callbacks
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.isAdmin = user.isAdmin;
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
//     authorized({ auth, request }) {
//       const user = auth?.user;
//       const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
//       const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog");
//       const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

//       // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD

//       if (isOnAdminPanel && !user?.isAdmin) {
//         return false;
//       }

//       // ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE

//       if (isOnBlogPage && !user) {
//         return false;
//       }

//       // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE

//       if (isOnLoginPage && user) {
//         return Response.redirect(new URL("/", request.nextUrl));
//       }

//       return true;
//     },
//   },
// };

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"; // If you are using Google Auth

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await login(credentials); // Your login logic here
        if (user) {
          return user; // Return user object on success
        } else {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
  async jwt({ token, user }) {
    // Add user info to token if available
    if (user) {
      token.id = user._id; // Make sure to use the correct field from the user object
      token.isAdmin = user.isAdmin; // Make sure this field is available in the user object
    }
    return token;
  },
  async session({ session, token }) {
    // Add token info to session if available
    if (token) {
      session.user.id = token.id; // Use the id from the token
      session.user.isAdmin = token.isAdmin; // Ensure this is populated
    }
    return session;
  },
},

    async authorized({ auth, request }) {
      const user = auth?.user;
      const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
      const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog");
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

      // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD
      if (isOnAdminPanel && !user?.isAdmin) {
        return false; // Not authorized
      }

      // ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE
      if (isOnBlogPage && !user) {
        return false; // Not authorized
      }

      // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE
      if (isOnLoginPage && user) {
        return Response.redirect(new URL("/", request.nextUrl)); // Redirect if already authenticated
      }

      return true; // Authorized
  },
};




