import { AuthenticatedUser } from "@/lib/users/types";
import "next-auth";
import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: AuthenticatedUser & DefaultSession["user"];
  }
}

declare module "next-auth" {
  interface User extends AuthenticatedUser {}
}

declare module "next-auth/jwt" {
  interface JWT {
    user: AuthenticatedUser;
  }
}
