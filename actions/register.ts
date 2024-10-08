"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";

import { userRegisterFormSchema } from "@/utils/schema";
import { db } from "@/utils/db";
import { getUserByEmail } from "@/utils/data";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const registerAction = async (
  values: z.infer<typeof userRegisterFormSchema>
) => {
  const validateFields = userRegisterFormSchema.safeParse(values);

  if (!validateFields.success) {
    // return validateFields.error.issues.map((issue) => issue.message);
    return { error: "Invalids credentials!" };
  }

  const { firstName, lastName, email, phoneNumber, password } =
    validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 12);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: "Email already exist!" };

  await db.user.create({
    data: {
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email,
      phoneNumber,
      password: hashedPassword,
    },
  });

  //TODO: SEND VERIFICATION TOKEN EMAIL

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(
    verificationToken.email as string,
    verificationToken.token
  );

  return { success: "Confirmation email sent!" };
};
