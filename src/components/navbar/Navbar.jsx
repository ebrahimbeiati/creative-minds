import Link from "next/link";
import Links from "./links/Links";
import { SignedIn } from "@clerk/nextjs";

const Navbar = async () => {
  return (
    <nav className="py-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">CM</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Creative Minds</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Links />
        </div>

        <SignedIn>
          <Link 
            href="/admin"
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Admin
          </Link>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
