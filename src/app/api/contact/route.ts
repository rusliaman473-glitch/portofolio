import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, subject, message, timestamp } = body;

    if (!firstName || !email || !message) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    // Save to local JSON log
    const entry = { firstName, lastName, email, subject, message, timestamp: timestamp || new Date().toISOString() };
    const dataDir = path.join(process.cwd(), "data");
    const logFile = path.join(dataDir, "messages.json");

    // Ensure data directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let messages = [];
    if (fs.existsSync(logFile)) {
      try {
        messages = JSON.parse(fs.readFileSync(logFile, "utf8"));
      } catch (_) {
        messages = [];
      }
    }

    messages.push(entry);
    fs.writeFileSync(logFile, JSON.stringify(messages, null, 2), "utf8");

    console.log("\n📬 New contact message received via Next.js API:");
    console.log(`   From: ${firstName} ${lastName} <${email}>`);
    console.log(`   Type: ${subject}`);

    return NextResponse.json({ success: true, message: "Message received successfully!" });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
