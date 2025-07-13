import Link from "next/link";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="/about" className="text-gray-400 hover:text-gray-500">
            About
          </Link>
          <Link href="/blog" className="text-gray-400 hover:text-gray-500">
            Blog
          </Link>
          <Link href="/contact" className="text-gray-400 hover:text-gray-500">
            Contact
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; {new Date().getFullYear()} Creative Minds. Made with{" "}
            <Heart className="inline h-3 w-3 text-red-500" /> by creators for creators.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
