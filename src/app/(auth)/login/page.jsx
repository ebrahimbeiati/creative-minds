// src/app/auth/login/page.jsx
"use client"; // Ensure this component is a client component

import { signIn } from "next-auth/react";

const LoginPage = () => {
  const handleGoogleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const result = await signIn("google"); // Trigger Google sign-in
    console.log(result); // Check the result for debugging

    // Handle the result, e.g., check if login was successful
    if (result.error) {
      console.error("Login failed", result.error);
    } else {
      // Optionally redirect or update state after login
      // e.g., window.location.href = '/'; // Redirect to home
    }
  };

  return (
    <div>
      <form onSubmit={handleGoogleLogin}>
        <button type="submit">Login with Google</button>
      </form>
    </div>
  );
};

export default LoginPage;
