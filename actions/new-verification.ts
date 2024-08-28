"use server";

import { getUserByEmail, getVerificationTokenByToken } from "@/utils/data";
import { db } from "@/utils/db";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) return { error: "Invalid or expired token!" };

  const hasExpiredToken = new Date(existingToken.expires) < new Date();

  if (hasExpiredToken) return { error: "Token has expired" };

  const existingUser = await getUserByEmail(existingToken.email as string);

  if (!existingUser) return { error: "User not found!" };

  // Update user's emailVerified field to true
  await db.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: existingToken.email as string },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email verified!" };
};
