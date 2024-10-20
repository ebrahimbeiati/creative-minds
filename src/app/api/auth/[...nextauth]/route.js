// import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
// import CredentialProvider from 'next-auth/providers/credentials';
// import { connectToDb } from '@/lib/utils';
// import { User } from '@/lib/models';
// import bcrypt from 'bcryptjs';


// const login = async (credentials) => {
//   try {
//     connectToDb();
//     const user = await User.findOne({ username: credentials.username });
//     if (!user) {
//       throw new Error("User not found");
//     }
//     const isPasswordValid = await bcrypt.compare(
//       credentials.password,
//       user.password
//     );
//     if (!isPasswordValid) {
//       throw new Error("Invalid password");
//     }

//     return user;
//   } catch (error) {
//     console.log(error);
//     throw new Error("Failed to sign in");
//   }
// };

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     CredentialProvider({
//       async authorize(credentials) {
//         try {
//           const user = await login(credentials);
//           return user

//         } catch (error) {
//           return null
        
//         }
//       }
//     })
//   ],
//   secret: process.env.AUTH_SECRET,
//   session: {
//     strategy: 'jwt', // Use JWT strategy
//   },
//   callbacks: {
//     async session({ session, token }) {
//       session.user.id = token.sub; // Pass user ID to session
//       return session;
//     },
//     async jwt({ token, account }) {
//       if (account) {
//         token.accessToken = account.access_token; // Save access token from Google
//       }
//       return token;
//     },
//   },
//   pages: {
//     signIn: '/auth/login', // Custom sign-in page
//     error: '/auth/error',   // Custom error page
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
// pages/api/auth/[...nextauth].js



import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "@/lib/utils";
import { User } from "@/lib/models"; // Ensure you have a User model imported
import bcrypt from "bcryptjs";

// Login function for Credentials Provider
const login = async (credentials) => {
  try {
    await connectToDb(); // Ensure the DB connection is established
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

    return {
      id: user.id,
      isAdmin: user.isAdmin,
      email: user.email,
    };
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Failed to sign in");
  }
};

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        return await login(credentials); // Use the login function to validate user
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin; // Store isAdmin in the token
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin; // Add isAdmin to session
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        await connectToDb(); // Ensure the DB connection is established
        try {
          // Check for existing user by email
          const existingUser = await User.findOne({ email: profile.email });
          if (!existingUser) {
            // Create a new user if this is a new Google account sign-in
            const newUser = new User({
              username: profile.name,
              email: profile.email,
              img: profile.picture,
              isAdmin: false, // Set to false or any default value you prefer
            });
            await newUser.save(); // Save the new user
          }
        } catch (err) {
          console.log("Error during Google sign-in:", err);
          return false; // Prevent sign-in on error
        }
      }
      return true; // Allow sign-in
    },
  },
  pages: {
    signIn: "/auth/login", // Custom sign-in page
    error: "/auth/error", // Custom error page
  },
};

// NextAuth handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

