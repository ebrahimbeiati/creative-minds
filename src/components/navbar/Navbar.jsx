// import Link from "next/link";
// import Links from "./links/Links";
// import styles from "./navbar.module.css";
// import { auth } from "@/lib/auth";

// const Navbar = async () => {
//   const session = await auth();

//   return (
//     <div className={styles.container}>
//       <Link href="/" className={styles.logo}>
//         Logo
//       </Link>
//       <div>
//         <Links session={session} />
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import Link from "next/link";
import Links from "./links/Links";
import styles from "./navbar.module.css";
import { getServerSession } from "next-auth/next"; // Correct import for server-side session fetching
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Your authOptions configuration

const Navbar = async () => {
  const session = await getServerSession(authOptions); // Server-side session fetching

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        Logo
      </Link>
      <div>
        <Links session={session} />
      </div>
    </div>
  );
};

export default Navbar;
