import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import bcrypt from "bcryptjs";

import { userLoginFormSchema } from "./utils/schema";
import { getUserByEmail } from "./utils/data";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validateFields = userLoginFormSchema.safeParse(credentials);

        if (!validateFields.success) {
          return { error: "Invalids credentials!" };
        }
        // if (validateFields.success) {
        const { email, password } = validateFields.data;

        const user = await getUserByEmail(email);
        if (!user || !user.password) {
          return null;
        }
        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
          return { error: "Invalids credentials!" };
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
