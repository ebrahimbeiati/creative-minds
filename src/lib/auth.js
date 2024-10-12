
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./utils"; // Make sure to handle database connection properly
import { User } from "./models";
import bcrypt from 'bcryptjs';


const login = async (credentials) => {
    try {
        connectToDb();
        const user = await User.findOne({ username: credentials.username });
        if (!user) {
            throw new Error("User not found");
        }
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");

        }

        return user
        
    } catch (error) {
        console.log(error);
        throw new Error("Failed to sign in");
        
    }
}

// export default NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   secret: process.env.AUTH_SECRET,  // Use the same secret in env variables
//   pages: {
//     signIn: "/auth/login",  // Optional custom sign-in page
//   },
// });


