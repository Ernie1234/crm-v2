"use server";

import { db } from "@/utils/db";
import { profileFormSchema } from "@/utils/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const getUserById = async (userId: string) => {
  if (!userId) return { error: "Invalids User" };
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      image: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!user) return { error: "User not found" };
  return user;
};

export const updateUserByEmail = async (
  values: z.infer<typeof profileFormSchema>
) => {
  const validateFields = profileFormSchema.safeParse(values);

  if (!validateFields.success) return { error: "Invalids fields!" };
  const user = await db.user.update({
    where: {
      email: validateFields.data.email,
    },
    data: {
      name: validateFields.data.firstName + " " + validateFields.data.lastName,
      firstName: validateFields.data.firstName,
      lastName: validateFields.data.lastName,
    },
  });
  if (!user) return { error: "User not found" };

  revalidatePath("/dashboard/setting");

  return { success: "User details updated successfully!" };
};
