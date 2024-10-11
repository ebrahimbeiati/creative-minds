// import { handleGoogleLogin } from "@/lib/action";
// import LoginForm from "@/components/loginForm/LoginForm";
// import styles from "./login.module.css";

// const LoginPage = () => {
//   return (
//     <div className={styles.container}>
//       <div className={styles.wrapper}>
//         <button className={styles.google} onClick={handleGoogleLogin}>
//           Login with Google
//         </button>
//         <LoginForm />
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
"use client"
import { signIn } from "next-auth/react";
import LoginForm from "@/components/loginForm/LoginForm";
import styles from "./login.module.css";

const LoginPage = () => {
  const handleGoogleLogin = async () => {
    try {
      // This triggers the Google login
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
