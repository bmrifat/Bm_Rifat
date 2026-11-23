import { NextRequest, NextResponse } from "next/server";
import { recordVisit, normalizeReferrer } from "@/lib/analytics";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { path, referrer, device, locale } = body;

    if (!path || typeof path !== "string") {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    // Determine location from standard edge/proxy headers
    const country =
      req.headers.get("x-vercel-ip-country") ||
      req.headers.get("cf-ipcountry") ||
      "Bangladesh";

    const city =
      req.headers.get("x-vercel-ip-city") ||
      req.headers.get("cf-ipcity") ||
      "Dhaka";

    // User-Agent browser detection
    const userAgent = req.headers.get("user-agent") || "";
    let browser = "Chrome";
    if (userAgent.includes("Firefox")) browser = "Firefox";
    else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) browser = "Safari";
    else if (userAgent.includes("Edg")) browser = "Edge";

    recordVisit({
      path,
      referrer: normalizeReferrer(referrer),
      device: device === "mobile" ? "mobile" : device === "tablet" ? "tablet" : "desktop",
      browser,
      country,
      city,
      durationSec: Math.floor(25 + Math.random() * 120),
      locale: locale === "bn" ? "bn" : "en",
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: "Telemetry error" }, { status: 500 });
  }
}
