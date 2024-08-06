import axios from "axios";
import { NextResponse } from "next/server";

const apiKey = process.env.NEXT_PAYSTACK_API_KEY;
const config = {
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
};

const params = {
  perPage: 20, // Number of transactions to return per page
  page: 1, // Page number to retrieve
  customer: 175069997,
};

export async function GET() {
  try {
    const response = await axios.get("https://api.paystack.co/transaction", {
      headers: config.headers,
      params: params,
    });

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
