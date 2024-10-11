
// // import { authConfig } from '@/lib/auth.config';
// import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';


// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   secret: process.env.AUTH_SECRET,
//   session: {
//     strategy: "jwt", // Use JWT for session management
//   },
//   callbacks: {
//     async session({ session, token, user }) {
//       // You can pass token or user information to the session
//       session.user.id = token.sub;
//       return session;
//     },
//     async jwt({ token, user, account, profile, isNewUser }) {
//       // Save user details on first login if necessary
//       if (account) {
//         token.accessToken = account.access_token;
//       }
//       return token;
//     },
//   },
//   pages: {
//     signIn: "/auth/signin", // Custom sign-in page
//     error: "/auth/error", // Error page
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

// api/auth/[...nextauth]/route.js

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt', // Use JWT strategy
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub; // Pass user ID to session
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token; // Save access token from Google
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
    error: '/auth/error',   // Custom error page
  },
};

// Make NextAuth handler work for both GET and POST requests
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
