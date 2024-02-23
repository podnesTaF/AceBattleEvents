import { authOptions } from "@/app/(auth)/_lib/auth-options";
import NextAuth from "next-auth";

export default NextAuth(authOptions);
