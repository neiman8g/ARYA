import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value?.trim() ?? "");
}

export async function POST(request: NextRequest) {
  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  if (!resend) {
    console.warn("RESEND_API_KEY not set — waitlist signup skipped:", email);
    return NextResponse.json(
      { error: "Waitlist is not configured" },
      { status: 503 }
    );
  }

  const notifyTo = process.env.WAITLIST_NOTIFY_EMAIL || "hello@arya.clothing";
  const from = process.env.RESEND_FROM || "Arya Waitlist <onboarding@resend.dev>";

  try {
    await resend.emails.send({
      from,
      to: [notifyTo],
      subject: `Arya Waitlist: ${email}`,
      html: `
        <p><strong>New waitlist signup</strong></p>
        <p>Email: <a href="mailto:${email}">${email}</a></p>
        <p>Time: ${new Date().toISOString()}</p>
      `.trim(),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Waitlist email error:", err);
    return NextResponse.json(
      { error: "Could not add you to the waitlist. Please try again." },
      { status: 500 }
    );
  }
}
