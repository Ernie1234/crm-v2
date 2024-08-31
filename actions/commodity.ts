"use server";

import { getUserByEmail } from "@/utils/data";
import { db } from "@/utils/db";
import { commodityFormSchema, editCommodityFormSchema } from "@/utils/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createCommodity = async (
  values: z.infer<typeof commodityFormSchema>,
  email: string
) => {
  const validateFields = commodityFormSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalids fields!" };
  }
  const price = Number(validateFields.data?.price);
  const minQuantity = Number(validateFields.data?.minQuantity);
  const maxQuantity = Number(validateFields.data?.maxQuantity);

  const user = await getUserByEmail(email);
  if (!user) return { error: "Authentication failed!" };

  const { name, description, unit } = validateFields.data;

  await db.commodity.create({
    data: {
      name,
      description,
      unit,
      minQuantity,
      maxQuantity,
      price: {
        create: [{ price }],
      },
      userId: user.id,
    },
    include: { user: true, price: true },
  });

  const users = await db.user.findMany();

  await db.notification.updateMany({
    where: {
      userId: { in: users.map((user) => user.id) },
    },
    data: {
      userId: user.id,
      title: "New Commodity",
      body: `A new commodity "${name}" has been added`,
    },
  });

  revalidatePath("/dashboard/commodity");

  return { success: "Commodity added successful!" };
};

export const getAllCommodities = async () => {
  const commodities = await db.commodity.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true, price: true },
  });
  return commodities;
};

export const getCommodityById = async (id: string) => {
  const commodities = await db.commodity.findUnique({
    where: {
      id,
    },
    include: { user: true, price: true },
  });
  return commodities;
};
export const getCommodityByName = async (commodityName: string) => {
  const commodities = await db.commodity.findUnique({
    where: {
      name: commodityName,
    },
    select: { price: true },
  });
  return commodities;
};

export const getCommodityName = async () => {
  try {
    const commodities = await db.commodity.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        name: true,
        unit: true,
        minQuantity: true,
        maxQuantity: true,
        price: {
          select: {
            price: true,
          },
        },
      },
    });
    return commodities;
  } catch (error) {
    console.log(error);
  }
};

export const updateCommodity = async (
  values: z.infer<typeof editCommodityFormSchema>,
  role: string
) => {
  const validateFields = editCommodityFormSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalids fields!" };
  }

  const newPrice = Number(validateFields.data?.price);

  const commodity = await db.commodity.findUnique({
    where: {
      name: validateFields.data.name,
    },
    include: { user: true, price: true },
  });

  if (!commodity) return { error: "Commodity not found!" };

  if (role !== "ADMIN") {
    return { error: "Authorized!" };
  }

  await db.commodity.update({
    where: { id: commodity.id },
    data: {
      price: {
        create: [{ price: newPrice }],
      },
    },
    include: { user: true, price: true },
  });

  revalidatePath(`/dashboard/commodity/${commodity.id}`);
  return { success: "Commodity updated successful!" };
};
