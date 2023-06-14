"use client";

import Footer from "@/components/shared/Footer";
import { Providers } from "@/redux/provider";
import { SessionProvider } from "next-auth/react";
import { Poppins } from "next/font/google";
import { MoralisProvider } from "react-moralis";
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
        <title>Ace Battle events</title>
      </head>
      <body className={poppins.className}>
        <SessionProvider session={session}>
          <MoralisProvider initializeOnMount={false}>
            <Providers>
              <AppBar />
              {children}
              <Footer />
            </Providers>
          </MoralisProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
