import { prisma } from "./prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import type { User } from "next-auth";
import { generateUsername } from "./utils/generateUserName";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  // session: {
  // strategy: "database",
  // maxAge: 60 * 60 * 24,
  // },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        // ✅ Explicitly cast to User to satisfy TS
        return {
          id: user.id,
          email: user.email ?? "",
          name: user.name ?? "",
        } as User;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persist user ID on token
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const googleProfile = profile as {
          email?: string;
          name?: string;
          picture?: string;
        };

        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (existingUser) {
          const updateData: Record<string, any> = {};

          if (!existingUser.image && googleProfile?.picture) {
            updateData.image = googleProfile.picture;
          }

          if (existingUser.username == null) {
            updateData.username = generateUsername(user.name);
          }

          if (Object.keys(updateData).length > 0) {
            await prisma.user.update({
              where: { id: existingUser.id },
              data: updateData,
            });
          }
          // Link this Google account to the existing credentials user
          await prisma.account.upsert({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
            create: {
              userId: existingUser.id,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              type: account.type,
              access_token: account.access_token,
              refresh_token: account.refresh_token,
            },
            update: {},
          });

          return true;
        }
      }

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
