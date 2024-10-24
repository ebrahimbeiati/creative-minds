// "use client";

// import { login } from "@/lib/action"; // Make sure this import is correct
// import styles from "./loginForm.module.css";
// import { useActionState } from "react"; // Update to use useActionState
// import Link from "next/link";

// const LoginForm = () => {
//   // Use useActionState instead of useFormState
//   const [state, formAction] = useActionState(login, undefined);

//   return (
//     <form className={styles.form} action={formAction}>
//       <input type="text" placeholder="username" name="username" required />
//       <input type="password" placeholder="password" name="password" required />
//       <button type="submit">Login</button>
//       {state?.error && <div className={styles.error}>{state.error}</div>}
//       <Link href="/register">
//         {"Don't have an account?"} <b>Register</b>
//       </Link>
//     </form>
//   );
// };

// export default LoginForm;


"use client";

import { useState } from "react";
import { login } from "@/lib/action"; // Import the login function
import styles from "./loginForm.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation"; // For client-side navigation

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const router = useRouter();

  // Your handleSubmit function goes here
const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const result = await login(formData);
    console.log("Login result:", result); // Log the result

    if (result.error) {
      setError(result.error);
    } else if (result.success) {
      console.log("Session data:", await getSession()); // Log the session data
      router.push("/admin");
    }
  } catch (err) {
    setError("An unexpected error occurred.");
    console.error(err);
  }
};




  // Handle changes to form inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
      {error && <div className={styles.error}>{error}</div>}
      <Link href="/register">
        {"Don't have an account?"} <b>Register</b>
      </Link>
    </form>
  );
};

export default LoginForm;
