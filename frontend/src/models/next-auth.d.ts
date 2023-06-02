import NextAuth, {DefaultSession, User} from "next-auth"
import {IUser} from "@/models/IUser";

declare module "next-auth" {
    interface User extends IUser {}
    interface Session {
        user: User
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user: User
    }
}