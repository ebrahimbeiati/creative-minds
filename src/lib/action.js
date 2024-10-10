"use server";
import { signIn, signOut } from "next-auth/react";
import { connectToDb } from "./utils";
import { User } from "./models";
import bcrypt from 'bcryptjs'

export const handleGoogleLogin = async () => {
    "use server"
  // Indicates this function is a server action
  await signIn("google"); // Change "github" to "google"
};

export const handleLogout = async () => {
   // Indicates this function is a server action
  await signOut(); // No change needed here
};

export const register = async (formData) => {
  const { username, email, password, confirmPassword, img } =
    Object.fromEntries(formData);

  if (password !== confirmPassword) {
    return { error: "Passwords do not match!" };
  }

  try {
    await connectToDb(); // Make sure you await the connection if it's async

    const user = await User.findOne({ username }); // Use await here
    if (user) {
      return { error: "User already exists!" };
    }
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      username,
        email,
        password: hashedPassword,
      
      img,
    });

    await newUser.save();
    console.log("Saved to db");

    return { success: "User registered successfully!" }; // Return a success message
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};



export const login = async (formData) => {
  const { username, password } =
    Object.fromEntries(formData);


    try {
      await signIn('credentials',{username, password});
    
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};
