import { signIn, signInWithGoogle } from "@/utils/db/servicefirebase";
import bcrypt from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    // 🔐 LOGIN EMAIL & PASSWORD
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null;

          const user: any = await signIn(credentials.email);

          if (user) {
            const isPasswordValid = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isPasswordValid) {
              return {
                id: user.id,
                email: user.email,
                fullname: user.fullname,
                role: user.role,
              };
            }
          }

          return null;
        } catch (error) {
          console.error("AUTH ERROR:", error);
          return null;
        }
      },
    }),

    // 🔐 GOOGLE LOGIN
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    // 🔐 GITHUB LOGIN
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],

  callbacks: {
    async jwt({ token, account, user }: any) {
      try {
        if (account?.provider === "credentials" && user) {
          token.email = user.email;
          token.fullname = user.fullname;
          token.role = user.role;
        }

        if (account?.provider === "google" && user) {
          const data = {
            fullname: user.name,
            email: user.email,
            image: user.image,
            type: account.provider,
          };

          try {
            await signInWithGoogle(data, (result: any) => {
              if (result?.status) {
                token.fullname = result.data.fullname;
                token.email = result.data.email;
                token.image = result.data.image;
                token.type = result.data.type;
                token.role = result.data.role;
              }
            });
          } catch (err) {
            console.error("Google SignIn Error:", err);
          }
        }

        if (account?.provider === "github" && user) {
          token.email = user.email;
          token.fullname = user.name;
          token.image = user.image;
          token.type = "github";
        }

        return token;
      } catch (error) {
        console.error("JWT CALLBACK ERROR:", error);
        return token || {};
      }
    },

    async session({ session, token }: any) {
      try {
        if (token?.email) session.user.email = token.email;
        if (token?.fullname) session.user.fullname = token.fullname;
        if (token?.image) session.user.image = token.image;
        if (token?.role) session.user.role = token.role;
        if (token?.type) session.user.type = token.type;

        return session;
      } catch (error) {
        console.error("SESSION ERROR:", error);
        return session;
      }
    },
  },

  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);