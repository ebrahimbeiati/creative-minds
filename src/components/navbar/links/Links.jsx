"use client";

import Link from "next/link";
import NavLink from "./navLink/navLink";

const Links = () => {
  const links = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Blog",
      path: "/blog",
    },
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Contact",
      path: "/contact",
    },
  ];

  return (
    <div className="flex items-center space-x-6">
      {links.map((link) => (
        <NavLink item={link} key={link.title} />
      ))}
    </div>
  );
};

export default Links;
