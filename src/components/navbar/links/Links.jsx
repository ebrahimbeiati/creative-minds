"use client";

import { useState } from "react";
import styles from "./Links.module.css";
import NavItems from "./navItems/navItems";
import Image from "next/image";

const links = [
  {
    title: "Homepage",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Blog",
    path: "/blog",
  },
];

const Links = ({ session }) => {
  const [open, setOpen] = useState(false);

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
            <form >
              <button className={styles.logout}>Logout</button>
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
