"use server";

import { userLoginFormSchema } from "@/utils/schema";
import { z } from "zod";

export const loginAction = async (
  values: z.infer<typeof userLoginFormSchema>
) => {
  const validateFields = userLoginFormSchema.safeParse(values);

  if (!validateFields.success) {
    // return validateFields.error.issues.map((issue) => issue.message);
    return { error: "Invalids fields!" };
  }

  return { success: "working!" };
};
