import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: "ADMIN" | "USER";
  name: string;
  hasNotification: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
