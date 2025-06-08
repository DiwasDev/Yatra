import { sendEmails } from "@/helper/sendEmails";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { event, potentialVisitors } = await request.json();

  const result = await sendEmails(event, potentialVisitors);
  return NextResponse.json(result);
}

export async function GET() {
    return NextResponse.json({ message: "This endpoint is for sending emails, not for GET requests." });
}