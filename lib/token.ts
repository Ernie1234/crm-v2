import {
  getForgetPasswordTokenByEmail,
  getVerificationTokenByEmail,
} from "@/utils/data";
import { db } from "@/utils/db";
import { v4 as uuidv4 } from "uuid";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000); // 5 minutes

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generateForgetPasswordToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 15 * 60 * 1000); // 15 minutes

  const existingToken = await getForgetPasswordTokenByEmail(email);
  if (existingToken) {
    await db.forgetPasswordToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const forgetPasswordToken = await db.forgetPasswordToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return forgetPasswordToken;
};
