// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { connectToDb } from "./utils";
// import { User } from "./models";
// import { credentialProvider } from "next-auth/providers/credentials";



// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
// } ,{
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//       credentialProvider
//   ],
//   callbacks: {
//       async signIn({ user, account, profile }) {
//           console.log(profile);
//       if (account.provider === "google") {
//         connectToDb();
//         try {
//           const user = await User.findOne({ email: profile.email });
//           if (!user) {
//             const newUser = new User({
//               username: profile.name,
//               email: profile.email,
//               image: profile.avatar_url,
//             });
//             await newUser.save();
//             return true;
//           }
//         } catch (error) {
//           console.log(error);
//           throw new Error("Failed to sign in");
//         }
//       }

//       return true;
//     },
//   },
// };
// auth.js



// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials"; // This is fine if you want to add username/password auth later
// import { connectToDb } from "./utils";
// import { User } from "./models";

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code",
//         },
//       },
//     }),
//     CredentialsProvider({
//       // Optional if you want credentials login
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text", placeholder: "jsmith" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         // Your logic for credentials login
//       },
//     }),
//   ],
//   callbacks: {
//     async signIn({ account, profile }) {
//       if (account.provider === "google") {
//         return profile.email_verified && profile.email.endsWith("@example.com");
//       }
//       return true; // Different checks for other providers if needed
//     },
//   },
// };

// export default NextAuth(authOptions);


import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./utils"; // Make sure to handle database connection properly
import { User } from "./models"; // Import your User model

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Ensure the database is connected
        await connectToDb();
        const { username, password } = credentials;

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
          throw new Error("User not found");
        }

        // Validate the password (assumed to be hashed)
        const isPasswordValid = await user.validatePassword(password); // Implement this method in your User model
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        // Return user object if everything is fine
        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        // Optional: Implement any additional checks you need
        return profile.email_verified && profile.email.endsWith("@example.com");
      }
      return true; // Allow other providers
    },
    async jwt({ token, user }) {
      // Persist user info in the token
      if (user) {
        token.id = user.id; // Assuming your user model has an id field
      }
      return token;
    },
    async session({ session, token }) {
      // Add user id to the session object
      if (token) {
        session.user.id = token.id; // Access the user id from the token
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin", // Specify custom sign-in page
    error: "/auth/error", // Error page for sign-in
  },
};

export default NextAuth(authOptions);
