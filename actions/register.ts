"use server";

import { userRegisterFormSchema } from "@/utils/schema";
import { z } from "zod";

export const registerAction = async (
  values: z.infer<typeof userRegisterFormSchema>
) => {
  const validateFields = userRegisterFormSchema.safeParse(values);

  if (!validateFields.success) {
    // return validateFields.error.issues.map((issue) => issue.message);
    return { error: "Invalids fields!" };
  }

  return { success: "Email sent!" };
};
