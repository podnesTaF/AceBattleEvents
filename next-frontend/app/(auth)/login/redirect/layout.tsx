"use client";

import { SessionProvider } from "next-auth/react";

const RedirectLayout = ({ children }: any) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default RedirectLayout;
