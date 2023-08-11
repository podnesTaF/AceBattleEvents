"use client";

import Footer from "@/components/shared/Footer";
import { Providers } from "@/redux/provider";
import { SessionProvider } from "next-auth/react";
import { Poppins } from "next/font/google";
import AppBar from "./AppBar";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en">
      <head>
        <title>ACE BATTLE EVENTS | home page</title>
        <meta
          name="description"
          content="ACE BATTLE EVENTS is a website for running competitions. Running events have been transformed into epic battles between teams."
        />
      </head>
      <body className={poppins.className}>
        <SessionProvider session={session}>
          <Providers>
            <AppBar />
            {children}
            <Footer />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
