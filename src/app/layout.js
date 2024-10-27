import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/nextjs";


export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      options={{ debug: true }} // Enable debugging
    >
      <html lang="en">
        <body>
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
