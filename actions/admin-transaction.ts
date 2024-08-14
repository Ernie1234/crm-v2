"use server";

import { z } from "zod";

import { sellModalSchema, sendModalSchema } from "@/utils/schema";
import serverCurrentUser from "@/app/_components/serverCurrentUser";
import { db } from "@/utils/db";
import { TransactionType } from "@prisma/client";
import { formatPrice, getUIDFromAddress } from "@/utils/fnLib";
import { getUserById } from "@/utils/data";
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

export const sendCommodity = async (
  values: z.infer<typeof sendModalSchema>
) => {
  try {
    const validateFields = sendModalSchema.safeParse(values);
    if (!validateFields.success) {
      return { error: "Invalids fields!" };
    }
    const user = await serverCurrentUser();
    if (!user) return { error: "Authentication failed!" };
    const userId = user && (user.id as string);

    const { commodityName, amount, address, note } = validateFields.data;
    const price = Number(amount);
    const color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;

    const recipientAddress = getUIDFromAddress(address);
    const recipient = await getUserById(recipientAddress);
    if (!recipient) return { error: "Recipient not found!" };

    const quant = await db.commodity.findUnique({
      where: { name: commodityName },
      include: { price: true },
    });
    const quantity = quant?.price.at(-1)?.price;
    const totalQuantity = quantity && price / quantity;

    console.log(totalQuantity);

    const userPortfolio = await db.portfolio.findFirst({
      where: {
        userId,
        commodityName,
      },
    });
    if (!userPortfolio) return { error: "commodity not found!" };
    if (userPortfolio?.balance < price)
      return {
        error: "You are low on this commodity to complete this transaction!",
      };

    const recipientPortfolio = await db.portfolio.findFirst({
      where: {
        userId: recipientAddress,
      },
    });

    if (!recipientPortfolio?.userId) return { error: "Recipient not found!" };

    await db.portfolio.update({
      where: {
        userId,
        commodityName,
      },
      data: {
        balance: userPortfolio.balance - price,
        totalQuantity,
      },
    });

    if (recipientPortfolio.commodityName === commodityName) {
      await db.portfolio.update({
        where: {
          userId: recipientAddress,
          commodityName: recipientPortfolio.commodityName,
        },
        data: {
          balance: recipientPortfolio?.balance
            ? recipientPortfolio.balance + price
            : recipientPortfolio.balance,
          totalQuantity,
        },
      });
    } else {
      await db.portfolio.create({
        data: {
          userId: recipientAddress,
          commodityName,
          totalQuantity,
          balance: price,
          color,
        },
      });
    }

    await db.transaction.create({
      data: {
        userId,
        reference: recipientAddress,
        commodityName,
        price,
        unit: "per ton",
        status: "success",
        type: TransactionType.SEND,
      },
    });
    await db.transaction.create({
      data: {
        userId: recipientAddress,
        reference: userId,
        commodityName,
        price,
        unit: "per ton",
        status: "success",
        type: TransactionType.RECEIVED,
      },
    });

    console.log(recipient, recipientAddress);

    revalidatePath(`/dashboard/transaction`);
    revalidatePath(`/dashboard/portfolio`);
    return {
      success: `You have successfully sent ${totalQuantity} (N${formatPrice(
        price
      )}) to ${address} wallet address`,
    };
  } catch (error) {
    console.log(error);
    return {
      error: `Something went wrong!`,
    };
  }
};
