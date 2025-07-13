"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ item }) => {
  const pathName = usePathname();

  return (
    <Link
      href={item.path}
      className={`text-sm font-medium transition-colors hover:text-blue-600 ${
        pathName === item.path ? "text-blue-600" : "text-gray-700"
      }`}
    >
      {item.title}
    </Link>
  );
};

export default NavLink;
