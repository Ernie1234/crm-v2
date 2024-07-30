import { auth } from "@/auth";
import { getUserByEmail } from "@/utils/data";
import { db } from "@/utils/db";
import axios from "axios";

// const getVerification = async (reference: string) => {
//   const res = await axios.get(
//     `https://api.paystack.co/transaction/verify/${reference}`,
//     {
//       headers: {
//         Authorization: `Bearer sk_test_571a22a4316ab090832bd2e898d8b9535d8d210e`,
//       },
//     }
//   );
//   const verificationStatus = await res;
//   return verificationStatus;
// };

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
