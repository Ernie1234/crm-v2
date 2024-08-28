"use server";

import { sendForgetPasswordEmail } from "@/lib/mail";
import { generateForgetPasswordToken } from "@/lib/token";
import { getUserByEmail } from "@/utils/data";
import { userForgetFormSchema } from "@/utils/schema";
import { z } from "zod";

export const forgetPassword = async (
  values: z.infer<typeof userForgetFormSchema>
) => {
  const validateField = userForgetFormSchema.safeParse(values);

  if (!validateField.success) return { error: "Invalid email!" };

  const email = validateField.data.email;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) return { error: "Email not found!" };

  const forgetPasswordToken = await generateForgetPasswordToken(email);

  await sendForgetPasswordEmail(
    forgetPasswordToken.email,
    forgetPasswordToken.token
  );

  return { success: "Forget email sent successfully!" };
};
