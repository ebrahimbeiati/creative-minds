"use server";

import { getSession } from "next-auth/react"; // Import getSession to check session data
import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectToDb } from "./utils";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "./auth";

// Adjust if these are being used in another way

// Function to add a new post (Admin only)
export const addPost = async (prevState, formData) => {
  const { title, desc, slug, userId } = Object.fromEntries(formData);

  try {
    const session = await getSession(); // Get session information
    if (!session || !session.user.isAdmin) {
      return { error: "You are not authorized to perform this action." };
    }

    await connectToDb(); // Ensure DB connection

    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
    });

    await newPost.save();
    console.log("Post saved to DB");
    revalidatePath("/blog");
    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

// Function to delete a post (Admin only)
export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    const session = await getSession(); // Get session information
    if (!session || !session.user.isAdmin) {
      return { error: "You are not authorized to perform this action." };
    }

    await connectToDb();

    await Post.findByIdAndDelete(id);
    console.log("Post deleted from DB");
    revalidatePath("/blog");
    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

// Function to add a new user (Admin only)
export const addUser = async (prevState, formData) => {
  const { username, email, password, img } = Object.fromEntries(formData);

  try {
    const session = await getSession(); // Ensure session and admin check
    if (!session || !session.user.isAdmin) {
      return { error: "You are not authorized to perform this action." };
    }

    await connectToDb();

    const newUser = new User({
      username,
      email,
      password,
      img,
    });

    await newUser.save();
    console.log("User saved to DB");
    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

// Function to delete a user (Admin only)
export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    const session = await getSession(); // Ensure session and admin check
    if (!session || !session.user.isAdmin) {
      return { error: "You are not authorized to perform this action." };
    }

    await connectToDb();

    await Post.deleteMany({ userId: id }); // Delete posts associated with the user
    await User.findByIdAndDelete(id); // Delete user
    console.log("User deleted from DB");
    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

// Handle Google login
export const handleGoogleLogin = async () => {
  "use server";
  await signIn("google");
};

// Handle logout
export const handleLogout = async () => {
  "use server";
  await signOut();
};

// Function for user registration (Admin only)
export const register = async (previousState, formData) => {
  const { username, email, password, img, confirmPassword } =
    Object.fromEntries(formData);

  // Check if passwords match
  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  try {
    const session = await getSession(); // Ensure session and admin check
    if (!session || !session.user.isAdmin) {
      return { error: "You are not authorized to perform this action." };
    }

    await connectToDb();

    const user = await User.findOne({ username });

    if (user) {
      return { error: "Username already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
    });

    await newUser.save();
    console.log("User registered and saved to DB");

    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

// Function for user login
export const login = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("Credentials", { username, password });
  } catch (err) {
    console.log(err);

    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};
