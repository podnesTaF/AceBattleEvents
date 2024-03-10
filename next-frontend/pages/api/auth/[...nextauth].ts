import { authOptions } from "@/src/entities/Auth/utils";
import NextAuth from "next-auth";

export default NextAuth(authOptions);
