
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
import { getSession } from "next-auth/react";

export const auth = async () => {
  const session = await getSession();

  if (!session || !session.user.isAdmin) {
    throw new Error("Unauthorized"); // Handle unauthorized access
  }

  return session; // Return session if user is authorized
};


// Function to handle login for credentials provider
const login = async (credentials) => {
  try {
    await connectToDb();
    const user = await User.findOne({ username: credentials.username });

    if (!user) throw new Error("Wrong credentials!");

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) throw new Error("Wrong credentials!");

    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
};

// NextAuth configuration
const authOptions = {
  ...authConfig,
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
    try {
      const existingUser = await User.findOne({ email: profile.email });
      console.log("Existing user:", existingUser);

      if (!existingUser) {
        const newUser = new User({
          username: profile.name, // Ensure this is a unique username
          email: profile.email,
          img: profile.picture, // This is the profile picture from Google
        });

        await newUser.save();
        console.log("New user created:", newUser);
      } else {
        console.log("User already exists:", existingUser);
      }
    } catch (err) {
      console.log("Error during user creation:", err);
      return false; // Prevent sign in on error
    }
  }
  return true; // Allow sign in
},

    ...authConfig.callbacks,
  },
};

// Default export for NextAuth handler
export default NextAuth(authOptions);
export { signIn, signOut } from "next-auth/react";
