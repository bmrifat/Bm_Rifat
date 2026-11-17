import { NextRequest, NextResponse } from "next/server";
import { ContactSubmissionSchema } from "@/lib/validators";
import { rateLimit } from "@/lib/rate-limit";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP determination & Rate limit
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    const limiter = await rateLimit(ip, 5, 60 * 1000); // 5 requests per minute

    if (!limiter.success) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    // 2. Parse and validate payload
    const body = await req.json();
    const result = ContactSubmissionSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, organization, intent, message, honeypot, turnstileToken } = result.data;

    // 3. Honeypot check
    if (honeypot && honeypot.length > 0) {
      // Bot detected, silently acknowledge
      return NextResponse.json({ success: true });
    }

    // 4. Cloudflare Turnstile check (if secret configured)
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret && turnstileToken) {
      const verifyRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `secret=${encodeURIComponent(turnstileSecret)}&response=${encodeURIComponent(
            turnstileToken
          )}&remoteip=${encodeURIComponent(ip)}`,
        }
      );
      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        return NextResponse.json(
          { error: "Turnstile challenge failed. Please refresh and try again." },
          { status: 403 }
        );
      }
    }

    // 5. Email dispatch via Resend
    const resendKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_TO_EMAIL || "rifat@bmrifat.com";
    const senderEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

    const escapedName = escapeHtml(name);
    const escapedEmail = escapeHtml(email);
    const escapedOrg = organization ? escapeHtml(organization) : "N/A";
    const escapedMessage = escapeHtml(message).replace(/\n/g, "<br/>");

    if (resendKey) {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: senderEmail,
          to: recipientEmail,
          reply_to: email,
          subject: `[Portfolio Inquiry] ${intent.toUpperCase()} from ${name}`,
          html: `
            <h2>New Inquiry from BM Rifat Portfolio</h2>
            <p><strong>Intent:</strong> ${intent}</p>
            <p><strong>Name:</strong> ${escapedName}</p>
            <p><strong>Email:</strong> ${escapedEmail}</p>
            <p><strong>Organization:</strong> ${escapedOrg}</p>
            <hr/>
            <p><strong>Message:</strong></p>
            <p>${escapedMessage}</p>
          `,
        }),
      });

      if (!emailRes.ok) {
        console.error("Resend API delivery error:", await emailRes.text());
      }
    } else {
      // In development / demo when no Resend key is provided, log non-PII acknowledgment
      console.log(`[Contact API] Received valid inquiry: intent=${intent}`);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Contact API internal error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
