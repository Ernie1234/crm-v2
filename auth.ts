import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/utils/db";
import authConfig from "@/auth.config";
import { getUserById } from "./utils/data";
import { UserRole } from "@prisma/client";

// declare module "@auth/core" {
//   interface Session {
//     user: {
//       hasNotification: boolean;
//     } & DefaultSession["user"];
//   }
// }

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth-error/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if (token.hasNotification && session.user) {
        session.user.hasNotification = token.hasNotification as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.role = existingUser.role;
      token.hasNotification = existingUser.hasNotification;
      // token.hasNotification = existingUser.hasNotification;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  // debug: true,
});
