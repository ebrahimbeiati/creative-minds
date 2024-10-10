// src/components/links/Links.jsx
"use client"; // Ensure this is a client component

import { useState } from "react";
import styles from "./Links.module.css";
import NavItems from "./navItems/navItems";
import Image from "next/image";
import { signOut } from "next-auth/react"; // Import signOut for logout

const links = [
  { title: "Homepage", path: "/" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
  { title: "Blog", path: "/blog" },
];

const Links = ({ session }) => {
  const [open, setOpen] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault(); // Prevent default form submission
    await signOut(); // Call signOut from next-auth
  };

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavItems item={link} key={link.title} />
        ))}
        {session?.user ? (
          <>
            {session.user?.isAdmin && (
              <NavItems item={{ title: "Admin", path: "/admin" }} />
            )}
            <form onSubmit={handleLogout}>
              {" "}
              {/* Use onSubmit for form */}
              <button type="submit" className={styles.logout}>
                Logout
              </button>
            </form>
          </>
        ) : (
          <NavItems item={{ title: "Login", path: "/login" }} />
        )}
      </div>
      <Image
        className={styles.menuButton}
        src="/menu.png"
        alt=""
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavItems item={link} key={link.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Links;
