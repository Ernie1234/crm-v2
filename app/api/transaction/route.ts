// import { type NextRequest } from "next/server";
// import axios from "axios";
// import { db } from "@/utils/db";
// import { TransactionType } from "@prisma/client";
// import { getUserByEmail } from "@/utils/data";

// const apiKey = process.env.NEXT_PAYSTACK_API_KEY;

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const {
//       commodityName,
//       quantity,
//       paymentMethod,
//       cardNumber,
//       cardHolderName,
//       expiryDate,
//       cvc,
//       totalPrice,
//       email,
//       unit,
//     } = body;

//     const stringPrice = totalPrice.replace(/,/g, "");
//     const price = Number(stringPrice);

//     const user = await getUserByEmail(email);
//     if (!user) return { error: "Authentication failed!" };

//     const userId = user.id;

//     const response = await axios.post(
//       "https://api.paystack.co/transaction/initialize",
//       {
//         email,
//         amount: price * 100,
//         currency: "NGN",
//         metadata: {
//           commodityName,
//           email,
//           unit,
//           quantity,
//           price,
//           paymentMethod,
//           cardNumber,
//           cardHolderName,
//           expiryDate,
//           cvc,
//         },
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${apiKey}`,
//         },
//       }
//     );

//     const ref = (await response.data.data.reference) as string;

//     const trans = await db.transaction.create({
//       data: {
//         commodityName,
//         price,
//         unit,
//         userId,
//         status: "pending",
//         quantity: Number(quantity),
//         type: TransactionType.BOUGHT,
//         reference: ref,
//       },
//     });
//     if (!trans) return Response.json({ error: "Transaction failed!" });

//     const port = await db.portfolio.findFirst({
//       where: { userId, commodityName },
//     });

//     if (port === null) {
//       const color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
//       await db.portfolio.create({
//         data: {
//           userId,
//           commodityName,
//           totalQuantity: Number(quantity),
//           balance: price,
//           color,
//         },
//       });
//     } else {
//       await db.portfolio.update({
//         where: { userId, commodityName },
//         data: {
//           totalQuantity: Number(port?.totalQuantity + quantity),
//           balance: port.balance + trans.price,
//         },
//       });
//     }

//     return Response.json({
//       success: `You successfully sent (#${price}) to buy ${quantity} ${unit}`,
//       ...trans,
//     });
//   } catch (error: any) {
//     console.log(error);
//     console.error(
//       "Error processing payment:",
//       error.response?.data || error.message
//     );
//     return Response.json({ error: "Error processing payment" });
//   }
// }
