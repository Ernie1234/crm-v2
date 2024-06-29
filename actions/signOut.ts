"use server";

import { signOut } from "@/auth";

export const handleSignOut = async () => {
  await signOut();
  return { redirect: { destination: "/auth/login" } };
};
