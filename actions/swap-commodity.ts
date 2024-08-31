"use server";

import { z } from "zod";

import { swapModalSchema } from "@/utils/schema";
import serverCurrentUser from "@/app/_components/serverCurrentUser";
import { db } from "@/utils/db";
import { TransactionType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { newNotification } from "@/utils/data";

export const swapCommodity = async (
  values: z.infer<typeof swapModalSchema>
) => {
  try {
    const validateFields = swapModalSchema.safeParse(values);
    if (!validateFields.success) {
      return { error: "Invalids fields!" };
    }
    const { commodityName, transferTo, amount } = validateFields.data;
    const price = Number(amount);

    const user = await serverCurrentUser();
    if (!user) return { error: "Authentication failed!" };
    const userId = user && (user.id as string);

    const userPortfolio = await db.portfolio.findFirst({
      where: { userId, commodityName },
    });
    if (!userPortfolio) return { error: "commodity not found!" };

    const currentCommodity = await db.commodity.findUnique({
      where: { name: commodityName },
      include: { price: true },
    });
    const transferToCommodity = await db.commodity.findUnique({
      where: { name: transferTo },
      include: { price: true },
    });
    const currentPrice = currentCommodity?.price.at(-1)?.price;
    const transferToPrice = transferToCommodity?.price.at(-1)?.price;
    const quantity = (currentPrice && price / currentPrice)?.toFixed(6);
    const transferToQuantity = (
      transferToPrice && price / transferToPrice
    )?.toFixed(6);
    if (!quantity || !currentPrice || !transferToPrice)
      return { error: "Commodity not found or price not available!" };

    const purchase = Number(quantity) && Number(quantity) * price;
    const transferToPurchase =
      Number(transferToQuantity) && Number(transferToQuantity) * price;

    if (userPortfolio?.balance < price)
      return {
        error: "You are low on this commodity to complete this transaction!",
      };
    const color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;

    await db.portfolio.update({
      where: { userId, commodityName },
      data: { balance: userPortfolio.balance - price },
    });
    await db.portfolio.upsert({
      where: { userId, commodityName: transferTo },
      update: {
        balance: userPortfolio.balance + price,
        totalQuantity:
          Number(userPortfolio.totalQuantity) + Number(transferToQuantity),
      },
      create: {
        userId,
        commodityName: transferTo,
        balance: price,
        color,
        totalQuantity:
          Number(userPortfolio.totalQuantity) + Number(transferToQuantity),
      },
    });
    await db.transaction.create({
      data: {
        userId,
        reference: transferTo,
        commodityName,
        price,
        quantity: transferToPurchase,
        unit: "per ton",
        status: "success",
        type: TransactionType.SWAP,
      },
    });

    const title = "Swap Commodity";
    const body = `You have swap ${commodityName} commodity for ${transferTo} commodity`;

    await newNotification(userId, title, body);

    // console.log(price);
    // console.log(purchase);
    // console.log(transferToPurchase);
    // console.log(quantity);
    // console.log(transferToQuantity);
    // console.log(commodityName, ": ", currentPrice);
    // console.log(transferTo, ": ", transferToPrice);

    revalidatePath(`/dashboard/transaction`);
    revalidatePath(`/dashboard/portfolio`);

    return {
      success: `You successfully swap ${quantity} TON to ${transferToQuantity} TON`,
    };
  } catch (error) {
    console.log(error);
    return {
      error: `Something went wrong!`,
    };
  }
};
