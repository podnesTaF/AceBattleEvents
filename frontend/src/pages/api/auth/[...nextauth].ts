import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@host.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as any;

        const { data } = await axios.post(
          "http://localhost:4000/api/v1/auth/login",
          { email, password }
        );

        if (data) {
          return data;
        } else {
          return null;
        }
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === "update" && session?.user) {
        token.user.balance = session.user.balance;
      }
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60,
  },

  pages: {
    signIn: "/auth/login",
  },
  debug: true,
  secret: process.env.SECRET,
};
export default NextAuth(authOptions);
