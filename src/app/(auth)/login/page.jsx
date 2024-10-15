"use client";
import { signIn } from "next-auth/react";
import LoginForm from "@/components/loginForm/LoginForm";
import styles from "./login.module.css";

const LoginPage = () => {
  const handleGoogleLogin = async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button className={styles.google} onClick={handleGoogleLogin}>
          Login with Google
        </button>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
