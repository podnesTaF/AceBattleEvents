import { IUser } from "@/models/IUser";
import { User } from "next-auth";

declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}
