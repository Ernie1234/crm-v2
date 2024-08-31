"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";

import serverCurrentUser from "@/app/_components/serverCurrentUser";
import { ChangePasswordSchema } from "@/utils/schema";
import { db } from "@/utils/db";
import { error } from "console";

export const changePasswordAction = async (
  values: z.infer<typeof ChangePasswordSchema>
) => {
  const validateFields = ChangePasswordSchema.safeParse(values);

  if (!validateFields.success) {
    // return validateFields.error.issues.map((issue) => issue.message);
    return { error: "Invalids fields!" };
  }

  const { confirmPassword, newPassword, oldPassword } = validateFields.data;

  if (newPassword !== confirmPassword)
    return { error: "Passwords don't match" };

  const user = await serverCurrentUser();
  if (!user) return { error: "Authentication failed!" };
  const userId = user && (user.id as string);

  const userWithPassword = await db.user.findUnique({ where: { id: userId } });
  if (!userWithPassword) {
    return { error: "User not found" };
  }

  if (!userWithPassword.password) {
    return { error: "Password not set. Please try using credentials!" };
  }

  const isMatch = await bcrypt.compare(oldPassword, userWithPassword.password);
  if (!isMatch) {
    return { error: "Old password is incorrect" };
  }

  if (!isMatch) {
    return { error: "Old password is incorrect" };
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update the user's password in the database
  await db.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  return { success: "Password changed successfully" };
};
