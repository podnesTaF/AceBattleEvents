"use client";

import { SessionProvider } from "next-auth/react";

const SignUpLayout = ({ children }: any) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SignUpLayout;
