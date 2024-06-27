import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { userLoginFormSchema } from "./utils/schema";
import { getUserByEmail } from "./utils/data";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validateFields = userLoginFormSchema.safeParse(credentials);

        if (!validateFields.success) {
          return { error: "Invalids credentials!" };
        }
        if (validateFields.success) {
          const { email, password } = validateFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) {
            return null;
          }
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
