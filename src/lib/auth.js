
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
    import GoogleProvider from "next-auth/providers/google"; // Use GoogleProvider
    import CredentialsProvider from "next-auth/providers/credentials";
    import { connectToDb } from "./utils";
    import { User } from "./models";
    import bcrypt from "bcryptjs";
    import { authConfig } from "./auth.config";

    const login = async (credentials) => {
      try {
        await connectToDb(); // Ensure DB connection is awaited
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

    // NextAuth configuration options
    const authOptions = {
      ...authConfig,
      providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
          async authorize(credentials) {
            try {
              const user = await login(credentials);
              return user;
            } catch (err) {
              return null;
            }
          },
        }),
      ],
      callbacks: {
        async signIn({ user, account, profile }) {
          // This block handles when a user signs in with Google
          if (account.provider === "google") {
            await connectToDb(); // Ensure DB connection is awaited
            try {
              const existingUser = await User.findOne({ email: profile.email });

              // Create a new user if they don't exist
              if (!existingUser) {
                const newUser = new User({
                  username: profile.name, // Use the user's name
                  email: profile.email,
                  image: profile.picture, // Profile picture
                  isAdmin: false, // Set this according to your logic
                });
                await newUser.save();
              }
            } catch (err) {
              console.log(err);
              return false; // Return false to prevent sign-in
            }
          }
          return true; // Allow sign-in
        },
        ...authConfig.callbacks,
      },
    };

    // Default export for NextAuth handler
    export default NextAuth(authOptions);
