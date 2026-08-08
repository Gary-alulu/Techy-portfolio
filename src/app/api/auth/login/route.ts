import { NextResponse } from "next/server";
import { setSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    // Clean up the env variable just in case it has spaces or quotes
    const rawEnv = process.env.ADMIN_PASSWORD || "garyadmin";
    const adminPassword = rawEnv.trim().replace(/^["']|["']$/g, '').toLowerCase();
    const submittedPassword = password.trim().toLowerCase();

    // Check against the cleaned env variable OR the hardcoded default
    if (submittedPassword === adminPassword || submittedPassword === "garyadmin") {
      await setSession();
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
