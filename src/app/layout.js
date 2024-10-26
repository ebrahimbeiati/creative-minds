import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Next.js 14 Homepage",
    template: "%s | Next.js 14",
  },
  description: "Next.js starter app description",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
        <body className={inter.className}>
                <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        <div className="container">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
      </html>
      </ClerkProvider>
  );
}

