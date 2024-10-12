import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialProvider from 'next-auth/providers/credentials';
import { connectToDb } from '@/lib/utils';
import { User } from '@/lib/models';
import bcrypt from 'bcryptjs';


const login = async (credentials) => {
  try {
    connectToDb();
    const user = await User.findOne({ username: credentials.username });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to sign in");
  }
};

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user

        } catch (error) {
          return null
        
        }
      }
    })
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
    signIn: '/auth/login', // Custom sign-in page
    error: '/auth/error',   // Custom error page
  },
};

// Make NextAuth handler work for both GET and POST requests
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };




// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { connectToDb } from "@/lib/utils";
// import { User } from "@/lib/models";
// import bcrypt from "bcryptjs";
// import { authConfig } from "@/lib/auth.config"; // If you have extra configurations

// // Function to handle login with credentials
// const login = async (credentials) => {
//   try {
//     // Ensure we are connected to the database before proceeding
//     await connectToDb();

//     // Find the user by their username (assuming usernames are unique)
//     const user = await User.findOne({ username: credentials.username });
//     if (!user) {
//       throw new Error("User not found"); // If no user is found, throw an error
//     }

//     // Compare the provided password with the hashed password stored in the database
//     const isPasswordValid = await bcrypt.compare(
//       credentials.password,
//       user.password
//     );
//     if (!isPasswordValid) {
//       throw new Error("Invalid password"); // Throw an error if the password is incorrect
//     }

//     // Return the user object if authentication is successful
//     return user;
//   } catch (error) {
//     console.error("Error during login:", error); // Log errors for debugging
//     throw new Error("Failed to sign in");
//   }
// };

// // NextAuth configuration
// export const authOptions = {
//   // Configure the authentication providers
//   providers: [
//     // Google OAuth Provider
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     // Credentials (Username and Password) Provider
//     CredentialsProvider({
//       name: "Credentials", // Name for credentials-based login
//       async authorize(credentials) {
//         try {
//           // Call the login function to validate the user credentials
//           const user = await login(credentials);
//           if (user) {
//             return user; // Return the user object if login is successful
//           } else {
//             return null; // Return null if login fails
//           }
//         } catch (error) {
//           console.error("Authorization error:", error); // Log authorization errors
//           return null; // Return null if an error occurs
//         }
//       },
//     }),
//   ],

//   // Set the secret for JWT encryption
//   secret: process.env.AUTH_SECRET,

//   // Configure JWT-based session management
//   session: {
//     strategy: "jwt", // Using JWT tokens for session management
//   },

//   // Callback functions to manage tokens and sessions
//   callbacks: {
//     // Modify the session object to include the user ID
//     async session({ session, token }) {
//       session.user.id = token.sub; // Attach the user ID to the session object
//       return session;
//     },
//     // Modify the JWT token to include the access token
//     async jwt({ token, account }) {
//       if (account) {
//         token.accessToken = account.access_token; // Store the Google access token if available
//       }
//       return token; // Return the token object
//     },
//   },

//   // Custom pages for authentication flows
//   pages: {
//     signIn: "/auth/signin", // Custom sign-in page
//     error: "/auth/error", // Custom error page
//   },

//   // Additional configuration options from authConfig if you have them
//   ...authConfig,
// };

// // Create NextAuth API route handlers for both GET and POST requests
// const handler = NextAuth(authOptions);

// // Export GET and POST handlers for Next.js API routing
// export { handler as GET, handler as POST };
