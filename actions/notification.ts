"use server";

import { revalidatePath } from "next/cache";

import serverCurrentUser from "@/app/_components/serverCurrentUser";
import { db } from "@/utils/db";
import { UpdateUserNotification } from "@/utils/data";

export const getUserNotification = async () => {
  try {
    const user = await serverCurrentUser();
    if (!user) return { error: "Authentication failed!" };
    const userId = user && (user.id as string);

    const notifications = await db.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    await UpdateUserNotification(userId);

    return notifications;
  } catch (error) {
    console.log(error);
    return Response.json({
      error: `Something went wrong!`,
    });
  }
};

export const hasNotification = async () => {
  try {
    const user = await serverCurrentUser();
    if (!user) return { error: "Authentication failed!" };
    const userId = user && (user.id as string);
    const unreadCount = await db.notification.count({
      where: { userId },
    });

    const unRead = unreadCount > 0;

    revalidatePath(`/dashboard/commodity`);
    revalidatePath(`/dashboard/notification`);

    return unRead;
  } catch (error) {
    console.log(error);
    return Response.json({
      error: `Something went wrong!`,
    });
  }
};
