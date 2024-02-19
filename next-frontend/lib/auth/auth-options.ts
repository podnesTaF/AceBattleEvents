import { Api } from "@/api/axiosInstance";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const data = await Api().users.login({
          email: credentials?.email,
          password: credentials?.password,
        });

        if (data) {
          return data as any;
        } else {
          return null;
        }
      },
    }),
  ],
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      return true;
    },
    async jwt({ token, user }) {
      // If the user object exists, it means authorization was successful
      if (user) {
        token.user = user as any;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  debug: true,
  pages: {
    signIn: "/auth/login",
  },
};
