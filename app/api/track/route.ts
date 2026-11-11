import { NextResponse } from "next/server";

// Stub du futur proxy de Server-Side Tracking : log brut, aucun traitement.
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
