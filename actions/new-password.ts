"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { getForgetPasswordTokenByToken, getUserByEmail } from "@/utils/data";
import { newPasswordSchema } from "@/utils/schema";
import { db } from "@/utils/db";

export const newPassword = async (
  values: z.infer<typeof newPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing token!" };
  }
  const validatedFields = newPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid password!" };
  }
  const { password } = validatedFields.data;

  const existingToken = await getForgetPasswordTokenByToken(token);
  if (!existingToken) return { error: "Invalid token" };

  const hasExpiredToken = new Date(existingToken.expires) < new Date();

  if (hasExpiredToken) return { error: "Token has expired" };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { error: "Email does not exist!" };

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.forgetPasswordToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password updated successfully!" };
};
