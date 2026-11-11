import { NextResponse } from "next/server";

// Stub for the future server-side tracking proxy: raw log, no processing.
export async function POST(request: Request) {
  let body: unknown = null;
  try {
    body = await request.json();
  } catch {
    body = null;
  }
  console.log(body);
  return NextResponse.json({ status: "received_stub" });
}
