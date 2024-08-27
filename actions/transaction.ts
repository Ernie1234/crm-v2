"use server";

import { auth } from "@/auth";

import { db } from "@/utils/db";
import { TransactionType } from "@prisma/client";
import serverCurrentUser from "@/app/_components/serverCurrentUser";

interface Props {
  commodityName: string;
  quantity: number;
  price: number;
  unit: string;
}

export const createTransaction = async ({
  commodityName,
  quantity,
  price,
  unit,
}: Props) => {
  try {
    const user = await serverCurrentUser();
    if (!user) return { error: "Authentication failed!" };

    const userId = user && (user.id as string);

    const trans = await db.transaction.create({
      data: {
        commodityName,
        price,
        unit,
        userId,
        status: "success",
        quantity: Number(quantity),
        type: TransactionType.BOUGHT,
      },
    });

    const port = await db.portfolio.findFirst({
      where: { userId, commodityName },
    });

    if (port === null) {
      const color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
      await db.portfolio.create({
        data: {
          userId,
          commodityName,
          totalQuantity: Number(quantity),
          balance: price,
          color,
        },
      });
    } else {
      await db.portfolio.update({
        where: { userId, commodityName },
        data: {
          totalQuantity: Number(port?.totalQuantity + quantity),
          balance: port.balance + trans.price,
        },
      });
    }

    await db.notification.create({
      data: {
        userId,
        title: "Bought Commodity",
        body: `You have added a new commodity`,
      },
    });
    await db.user.update({
      where: { id: user.id },
      data: {
        hasNotification: true,
      },
    });

    return {
      success: `You successfully sent (#${price}) to buy ${quantity} ${unit}`,
    };
  } catch (error) {
    console.log(error);
    return {
      error: `Something went wrong here1!`,
    };
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
    // const session = await auth();
    // if (session === null || !session.user)
    //   return { error: "Authentication failed!" };

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

// export const getTransaction = async () => {
//   try {
//     const session = await auth();
//     if (session === null || !session.user)
//       return { error: "Authentication failed!" };

//     const userEmail = session.user.email;
//     if (userEmail === null || !userEmail)
//       return { error: "Authentication failed!" };

//     const user = await getUserByEmail(userEmail);
//     if (!user) return { error: "Authentication failed!" };

//     const trans = await db.transaction.findMany({
//       where: { userId: user.id },
//       orderBy: { createdAt: "desc" },
//     });

//     const ref = trans.map(async (tran) => {
//       const res = await axios.get(
//         `https://api.paystack.co/transaction/verify/${tran.reference}`,
//         {
//           headers: {
//             Authorization: `Bearer ${apiKey}`,
//           },
//         }
//       );
//       const verificationData = await res.data.data;

//       return { ...tran, ...verificationData };
//     });

//     const finalResult = await Promise.all(ref);
//     return finalResult;
//   } catch (error) {
//     console.log(error);
//   }
// };
