import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import AuthApi from "../api/authApi";

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
        const authApi = new AuthApi();

        const userData = await authApi.login({
          email: credentials?.email,
          password: credentials?.password,
        });

        if (userData) {
          return userData as any;
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
        const authApi = new AuthApi();
        const data = await authApi.loginWithGoogle(account.id_token as string);

        if (data.token) {
          token.user = data;
        }
      } else if (account?.provider === "credentials") {
        token.user = user as any;
      }

      return token;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "credentials") {
        return true;
      }

      const authApi = new AuthApi();
      const existingUser = await authApi.getUserIfExists(user.email);

      if (
        !existingUser &&
        account?.provider === "google" &&
        account?.id_token
      ) {
        try {
          const authApi = new AuthApi();
          await authApi.googleRegister({
            id_token: account.id_token,
          });
        } catch (error) {
          return "/signup";
        }
      }
      return true;
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
