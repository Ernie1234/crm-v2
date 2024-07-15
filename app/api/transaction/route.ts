import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "POST") {
//     res.status(200).json({ message: "hello world" });
//   } else {
//     // Handle any other HTTP method
//     res.status(405).end("Method Not Allowed");
//   }
// }

export async function POST(req: Request, res: Response) {
  try {
    const data = await req.body;

    console.log(data);
    return NextResponse.json({ message: "Data received successfully", data });
  } catch (error) {
    console.log(error);
  }
}
