"use client";

import { useState } from "react";
import { login } from "@/lib/action"; // Ensure this is your login handler
import styles from "./loginForm.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter for redirection

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Use the router for redirection

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setError(""); // Clear any previous error
    setLoading(true); // Set loading state

    try {
      // Call your login function with the form data
      await login(formData); // Adjust this according to your login logic

      // Handle successful login (redirect the user)
      console.log("Login successful!");
      router.push("/dashboard"); // Redirect to the dashboard or appropriate page
    } catch (err) {
      // Handle login error
      console.error(err); // Log the error for debugging
      setError(err.message || "Login failed!"); // Ensure error is user-friendly
    } finally {
      setLoading(false); // Remove loading state
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <p className={styles.error}>{error}</p>}
      <Link href="/register">
        {"Don't have an account?"} <b>Register</b>
      </Link>
    </form>
  );
};

export default LoginForm;
