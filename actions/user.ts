import { db } from "@/utils/db";

export const getUserById = async (userId: string) => {
  if (!userId) return { error: "Invalids User" };
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      image: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      // commodities: true, // if you want to include commodities in the response
      //   commodities: {
      //   commodity: {
      //     include: {
      //       price: true,
      //     },
      //   },
    },
  });
  if (!user) return { error: "User not found" };
  return user;
};
