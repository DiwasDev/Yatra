import { sendEmails } from "@/helper/sendEmails";
import { NextResponse } from "next/server";

export async function GET() {
  const event = {
    name: "Yatra Summer Fest",
    startingDate: "2025-07-15",
    url: "events/yatra-summer-fest",
    price: 0,
  };

  const potentialVisitors = [
    { username: "Hash", email: "hashzennn@gmail.com" },
    { username: "Echo", email: "echoinbyte@gmail.com" },
    { username: "Flame", email: "flameo.averest@gmail.com" },
  ];

  const result = await sendEmails(event, potentialVisitors);
  return NextResponse.json(result);
}

