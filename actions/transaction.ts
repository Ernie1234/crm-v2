import serverCurrentUser from "@/app/_components/serverCurrentUser";
import { auth } from "@/auth";
import { getUserByEmail } from "@/utils/data";
import { db } from "@/utils/db";
import axios from "axios";

const apiKey = process.env.NEXT_PAYSTACK_API_KEY;

export const getTransaction = async () => {
  try {
    const session = await auth();
    if (session === null || !session.user)
      return { error: "Authentication failed!" };

    const userEmail = session.user.email;
    if (userEmail === null || !userEmail)
      return { error: "Authentication failed!" };

    const user = await getUserByEmail(userEmail);
    if (!user) return { error: "Authentication failed!" };

    const trans = await db.transaction.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    const ref = trans.map(async (tran) => {
      const res = await axios.get(
        `https://api.paystack.co/transaction/verify/${tran.reference}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      const verificationData = await res.data.data;

      return { ...tran, ...verificationData };
    });

    const finalResult = await Promise.all(ref);
    return finalResult;
  } catch (error) {
    console.log(error);
  }
};

export const getAllTransactions = async () => {
  try {
    const session = await auth();
    if (session === null || !session.user)
      return { error: "Authentication failed!" };

    const user = await serverCurrentUser();
    if (!user) return { error: "Authentication failed!" };

    const userId = user && (user.id as string);

    const trans = await db.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return trans;
  } catch (error) {
    console.log(error);
  }
};

export const getWalletAddress = async () => {
  try {
    const session = await auth();
    if (session === null || !session.user)
      return { error: "Authentication failed!" };

    const user = await serverCurrentUser();
    if (!user) return { error: "Authentication failed!" };
    const userId = user && (user.id as string);

    const wallet = `UID${userId?.replace(/-/g, "").slice(0, 40)}`;

    return wallet;
  } catch (error) {
    console.log(error);
    return {
      error: `Something went wrong!`,
    };
  }
};
