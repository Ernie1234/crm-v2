import { NextResponse } from "next/server";
import axios from "axios";
import { db } from "@/utils/db";
import { TransactionType } from "@prisma/client";
import { getUserByEmail } from "@/utils/data";

const apiKey = process.env.NEXT_PAYSTACK_API_KEY;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      commodityName,
      quantity,
      paymentMethod,
      cardNumber,
      cardHolderName,
      expiryDate,
      cvc,
      totalPrice,
      email,
      unit,
    } = body;

    const stringPrice = totalPrice.replace(/,/g, "");
    const price = Number(stringPrice);

    const user = await getUserByEmail(email);
    if (!user) return { error: "Authentication failed!" };

    const userId = user.id;

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: price * 100,
        currency: "NGN",
        metadata: {
          commodityName,
          email,
          unit,
          quantity,
          price,
          paymentMethod,
          cardNumber,
          cardHolderName,
          expiryDate,
          cvc,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const ref = response.data.data.reference;

    const trans = await db.transaction.create({
      data: {
        commodityName,
        price,
        unit,
        userId,
        status: "pending",
        quantity: Number(quantity),
        type: TransactionType.BOUGHT,
        reference: ref,
      },
    });

    return NextResponse.json({
      success: `You successfully sent (#${price}) to buy ${quantity} ${unit}`,
      trans,
    });
  } catch (error: any) {
    console.log(error);
    console.error(
      "Error processing payment:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Error processing payment" },
      { status: 500 }
    );
  }
}
