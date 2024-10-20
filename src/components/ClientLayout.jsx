// src/app/ClientLayout.js

"use client"; // Mark this file as a client component

import { SessionProvider } from "next-auth/react";
import RootLayout from "./RootLayout"; // Import the server layout

export default function ClientLayout({ children }) {
  return (
    <SessionProvider>
      <RootLayout>{children}</RootLayout>
    </SessionProvider>
  );
}
