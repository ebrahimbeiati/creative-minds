
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { connectToDb } from "./utils";
// import { User } from "./models";
// import bcrypt from "bcryptjs";
// import { authConfig } from "./auth.config";

// // Function to handle login for credentials provider
// const login = async (credentials) => {
//   try {
//     await connectToDb();
//     const user = await User.findOne({ username: credentials.username });

//     if (!user) throw new Error("Wrong credentials!");

//     const isPasswordCorrect = await bcrypt.compare(
//       credentials.password,
//       user.password
//     );

//     if (!isPasswordCorrect) throw new Error("Wrong credentials!");

//     return user;
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to login!");
//   }
// };

// // NextAuth configuration
// export default NextAuth({
//   ...authConfig,
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     CredentialsProvider({
//       async authorize(credentials) {
//         try {
//           const user = await login(credentials);
//           return user;
//         } catch (err) {
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account, profile }) {
//       if (account.provider === "google") {
//         await connectToDb();
//         try {
//           const existingUser = await User.findOne({ email: profile.email });

//           if (!existingUser) {
//             const newUser = new User({
//               username: profile.name, // You can use profile.email or profile.given_name if needed
//               email: profile.email,
//               image: profile.picture, // This is the profile picture from Google
//             });

//             await newUser.save();
//           }
//         } catch (err) {
//           console.log(err);
//           return false;
//         }
//       }
//       return true;
//     },
//     ...authConfig.callbacks,
//   },
// });


import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./utils";
import { User } from "./models";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

// Function to handle login for credentials provider
const login = async (credentials) => {
  await connectToDb(); // Ensure DB connection is established
  const user = await User.findOne({ username: credentials.username });

  if (!user) throw new Error("Wrong credentials!");

  const isPasswordCorrect = await bcrypt.compare(
    credentials.password,
    user.password
  );

  if (!isPasswordCorrect) throw new Error("Wrong credentials!");

  return {
    id: user.id,
    isAdmin: user.isAdmin,
    email: user.email,
  };
};

// NextAuth configuration
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        return await login(credentials);
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        await connectToDb();
        const existingUser = await User.findOne({ email: profile.email });

        if (!existingUser) {
          const newUser = new User({
            username: profile.name,
            email: profile.email,
            img: profile.picture,
            isAdmin: false, // Set this based on your requirements
          });
          await newUser.save();
        }
      }
      return true; // Allow sign in
    },
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
  },
  pages: {
    signIn: "/auth/login", // Custom sign-in page
    error: "/auth/error", // Custom error page
  },
};

// Default export for NextAuth handler
export default NextAuth(authOptions);
export { signIn, signOut } from "next-auth/react";
