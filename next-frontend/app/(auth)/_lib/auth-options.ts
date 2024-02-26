import { Api } from "@/api/axiosInstance";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account?.provider === "google") {
        const data = await Api().users.loginWithGoogle(
          account.id_token as string
        );

        if (data.token) {
          token.user = data;
        }
      } else if (account?.provider === "credentials") {
        token.user = user as any;
      }

      return token;
    },
    async signIn({ user, account, profile, email }) {
      if (account?.provider === "credentials") {
        return true;
      }

      const existingUser = await Api().users.getUserIfExists(user.email);

      if (existingUser) {
        return true;
      }
      return "/signup";
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
