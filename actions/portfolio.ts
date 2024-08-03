"use serve";

import serverCurrentUser from "@/app/_components/serverCurrentUser";
import { db } from "@/utils/db";

export const portfolioCommodity = async () => {
  try {
    const user = await serverCurrentUser();
    if (!user) return { error: "Authentication failed!" };

    // Fetch portfolio commodities for a given user
    const portfolio = await db.portfolio.findMany({
      where: { userId: user?.id },
    });

    return portfolio;
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch portfolio commodities" }),
    };
  }
};
