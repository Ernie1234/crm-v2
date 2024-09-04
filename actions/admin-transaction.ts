"use server";

import serverCurrentUser from "@/app/_components/serverCurrentUser";
import { getUserById, newNotification } from "@/utils/data";
import { db } from "@/utils/db";
import { adminUserFormSchema, sellerFormSchema } from "@/utils/schema";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const getAllSell = async () => {
  try {
    const user = await serverCurrentUser();
    if (!user) return { error: "Authentication failed!" };
    if (user.role !== "ADMIN") return { error: "Unauthorized User" };

    const sell = await db.sell.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
      },
    });

    return sell;
  } catch (error) {
    console.error("Error fetching sells:", error);
  }
};

export const getAllUsers = async () => {
  try {
    const users = await db.user.findMany({
      orderBy: { createdAt: "desc" },
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export const payUser = async (values: z.infer<typeof sellerFormSchema>) => {
  try {
    const validateFields = sellerFormSchema.safeParse(values);

    if (!validateFields.success) {
      return { error: "Invalids fields!" };
    }

    const { userId, commodityName, id } = validateFields.data;

    const user = await serverCurrentUser();
    if (!user) return { error: "Authentication failed!" };
    if (user.role !== "ADMIN") return { error: "Unauthorized User" };

    await db.sell.update({
      where: { id, userId, commodityName },
      data: { status: "success" },
    });

    const title = "Your sold Commodity has been paid!";
    const body = `Your sold ${commodityName} commodity has been paid to your bank account`;

    await newNotification(userId, title, body);

    revalidatePath("/admin/sell");

    return { success: "Payment successful!" };
  } catch (error) {
    console.error("Error paying user:", error);

    return {
      error: `Something went wrong!`,
    };
  }
};
export const changeUserRole = async (
  values: z.infer<typeof adminUserFormSchema>
) => {
  try {
    const validateFields = adminUserFormSchema.safeParse(values);

    if (!validateFields.success) {
      return { error: "Invalids fields!" };
    }
    const { id, roleToggle } = validateFields.data;

    const user = await serverCurrentUser();
    if (!user) return { error: "Authentication failed!" };
    if (user.role !== "ADMIN") return { error: "Unauthorized User" };

    const existingUser = await getUserById(id);
    if (!existingUser) {
      return { error: "Invalids User!" };
    }

    if (roleToggle === true) {
      await db.user.update({
        where: { id },
        data: { role: "ADMIN" },
      });
    } else {
      await db.user.update({
        where: { id },
        data: { role: "USER" },
      });
    }

    const title = "User Role switched";
    const body = `Your user role has been switched`;

    await newNotification(id, title, body);

    revalidatePath("/admin/users");

    return { success: "Role Switched" };
  } catch (error) {
    console.error("Error paying user:", error);

    return {
      error: `Something went wrong!`,
    };
  }
};
