import axios from "axios";
import { NextResponse } from "next/server";

import { getUserByEmail } from "@/utils/data";

export async function GET(ref: string) {
  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${ref}`,
      {
        headers: {
          Authorization: `Bearer sk_test_571a22a4316ab090832bd2e898d8b9535d8d210e`,
        },
      }
    );

    const verificationStatus = response.data.status;
    const { commodityName, price, email } = response.data.data.metadata;
    const comPrice = Number(price);

    const user = await getUserByEmail(email);
    if (!user) return { error: "Authentication failed!" };

    return NextResponse.json(response.data);
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
