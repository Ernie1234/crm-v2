"use server";

import { z } from "zod";

import { sellModalSchema } from "@/utils/schema";
import serverCurrentUser from "@/app/_components/serverCurrentUser";
import { db } from "@/utils/db";
import { TransactionType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const sellCommodity = async (
  values: z.infer<typeof sellModalSchema>
) => {
  try {
    const validateFields = sellModalSchema.safeParse(values);
    if (!validateFields.success) {
      return { error: "Invalids fields!" };
    }
    const { commodityName, amount, acctNumber, bank, bankAcct } =
      validateFields.data;
    const price = Number(amount);
    const accountNumber = Number(acctNumber);

    const user = await serverCurrentUser();
    if (!user) return { error: "Authentication failed!" };

    const userId = user && (user.id as string);

    await db.transaction.create({
      data: {
        commodityName,
        price,
        unit: "per ton",
        userId,
        status: "processing",
        type: TransactionType.SOLD,
      },
    });
    const port = await db.portfolio.findFirst({
      where: { userId, commodityName },
    });

    const portfolioCommodityBalance = port && port?.balance - price;

    if (portfolioCommodityBalance === null)
      return { error: "Error occurred while making transaction!" };

    await db.portfolio.update({
      where: {
        userId,
        commodityName,
      },
      data: {
        balance: portfolioCommodityBalance,
      },
    });

    await db.sell.create({
      data: {
        userId,
        commodityName,
        amount: price,
        bank,
        status: "processing",
        accountNumber,
      },
    });
    revalidatePath(`/dashboard/transaction`);
    revalidatePath(`/dashboard/portfolio`);
    return {
      success: `You successfully sold (#${price}). The amount will be deposited in your bank account shortly!`,
    };
  } catch (error) {
    console.log(error);
    return {
      error: `Something went wrong!`,
    };
  }
};
