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
    // return {
    //   statusCode: 500,
    //   body: JSON.stringify({ error: "Failed to fetch portfolio commodities" }),
    // };
  }
};
export const getCommodityByName = async (name: string) => {
  try {
    if (!name) return { error: "Commodity not available!" };
    const portfolioCommodity = await db.commodity.findUnique({
      where: { name },
      include: { price: true },
    });
    if (!portfolioCommodity)
      return { error: "Commodity not found in portfolio" };
    const price = portfolioCommodity?.price;
    return price;
  } catch (error) {
    console.log(error);
    // return {
    //   statusCode: 500,
    //   body: JSON.stringify({ error: "Failed to fetch commodity price" }),
    // };
  }
};
// export const getPortfolioCommodityByUserEmail = async (email: string) => {
//   try {
//     if (!email) return { error: "Commodity not available!" };

//     const user =
//     const portfolioCommodity = await db.portfolio.findUnique({
//       where: { email },
//     });
//     console.log(portfolioCommodity);

//     return portfolioCommodity;
//   } catch (error) {
//     console.log(error);
//     // return {
//     //   statusCode: 500,
//     //   body: JSON.stringify({ error: "Failed to fetch commodity price" }),
//     // };
//   }
// };
