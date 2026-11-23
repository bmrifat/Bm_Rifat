import { NextRequest, NextResponse } from "next/server";
import { getAnalyticsStats, resetAnalytics } from "@/lib/analytics";

const DEFAULT_ADMIN_KEY = process.env.ADMIN_KEY || "rifat2026";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const key =
    req.headers.get("x-admin-key") ||
    url.searchParams.get("key") ||
    "";

  // Allow passcode check (default: rifat2026)
  if (key !== DEFAULT_ADMIN_KEY) {
    return NextResponse.json(
      { error: "Unauthorized. Please provide valid admin key." },
      { status: 401 }
    );
  }

  const stats = getAnalyticsStats();
  return NextResponse.json(stats);
}

export async function DELETE(req: NextRequest) {
  const key = req.headers.get("x-admin-key") || "";
  if (key !== DEFAULT_ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  resetAnalytics();
  return NextResponse.json({ ok: true, message: "Analytics cache reset to default baseline." });
}
