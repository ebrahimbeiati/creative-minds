// "use client"
// import { signIn } from "next-auth/react";
// import { redirect } from "next/navigation";
// import { useEffect, useState } from "react";
// import styles from "./loginForm.module.css";

// const LoginForm = () => {
//   const [error, setError] = useState(null);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("user"); // "user" by default

//   const handleSubmit = async (e) => {
//     setError(null); // Clear any previous errors

//     const result = await signIn("credentials", {
//       redirect: false, // Prevent automatic redirect
//       username,
//       password,
//     });

//     console.log("signIn result:", result); // Log the result

//   if (!result.error) {
//     if (result.user.isAdmin) {
//       return redirect("/admin");
//     } else {
//       return redirect("/user");
//     }
//   } else {
//     return { error: result.error };
//   }
//   };

//   return (
//     <form className={styles.form} action={handleSubmit}>
//       <select value={role} onChange={(e) => setRole(e.target.value)}>
//         <option value="user">User</option>
//         <option value="admin">Admin</option>
//       </select>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <button type="submit">Login</button>
//       {error && <p>{error}</p>}
//     </form>
//   );
// };

// export default LoginForm;


"use client"; // This makes the component a client component
import styles from "./LoginForm.module.css"; // Import your CSS styles
import { useRouter } from "next/navigation"; // Ensure this is for App Router
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
// Import signIn from NextAuth

const LoginForm = () => {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is "user"
  const router = useRouter();

 const handleSubmit = async (e) => {
   e.preventDefault();
   setError(null);

   // Attempt to sign in with credentials
   const result = await signIn("credentials", {
     redirect: false, // Prevent automatic redirection
     username,
     password,
   });

   console.log("signIn result:", result); // Debugging line

   if (result.error) {
     setError("Invalid username or password");
   } else if (result.ok && result.user) {
     // Ensure result.user exists
     if (result.user.isAdmin) {
       router.push("/admin"); // Redirect if admin
     } else {
       router.push("/user"); // Redirect if regular user
     }
   }
 };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      {error && <p className={styles.error}>{error}</p>}{" "}
      <Link href="/register">
        {"Don't have an account?"} <b>Register</b>
      </Link>
    </form>
  );
};

export default LoginForm;
