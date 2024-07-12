import { getUserByEmail } from "@/utils/data";
import { db } from "@/utils/db";
import { buyModalSchema } from "@/utils/schema";
import { z } from "zod";

export const makeTransaction = async (
  values: z.infer<typeof buyModalSchema>,
  email: string,
  totalPrice: number
) => {
  const validateFields = buyModalSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }
  const price = Number(validateFields.data?.quantity);
  const cost = Number(totalPrice);

  const user = await getUserByEmail(email);

  if (!user) return { error: "Authentication failed!" };

  //Todo: IMPLEMENT PAYSTACK UI HERE

  const transaction = await db.transaction.create({
    data: {
      userId: user.id,
      commodityName: validateFields.data.commodityName,
      price: cost,
      type: "BOUGHT",
    },
  });
  console.log(transaction);

  // Todo: Send notification to the customer

  return { success: true, message: "Transaction successful!" };
};
