// Moondream API route for SnapBack
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // TODO: Replace with your Moondream API key
  const MOONDREAM_API_KEY = process.env.MOONDREAM_API_KEY;
  if (!MOONDREAM_API_KEY) {
    return NextResponse.json({ error: "Missing Moondream API key" }, { status: 500 });
  }

  const { prompt } = await req.json();
  // Example Moondream endpoint (update as needed):
  const url = "https://api.moondream.ai/v1/generate";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${MOONDREAM_API_KEY}`
    },
    body: JSON.stringify({ prompt })
  });
  const data = await response.json();
  return NextResponse.json(data);
}
