import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/data/siteData";
import {
  sendToPractice,
  requireText,
  requireEmail,
  optionalPhone,
  oneOf,
  type FieldErrors,
} from "@/lib/email";

const CONTACT_METHODS = ["phone", "email"] as const;

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Malformed request." },
      { status: 400 },
    );
  }

  const data = (payload ?? {}) as Record<string, unknown>;
  // Honeypot + timing: pretend success so bots learn nothing; send nothing.
  const hp = typeof data.company === "string" && data.company.trim().length > 0;
  const tooFast = typeof data.startedAt === "number" && Date.now() - data.startedAt < 4000;
  if (hp || tooFast) {
    return NextResponse.json({ ok: true });
  }

  const errors: FieldErrors = {};

  const name = requireText(errors, "name", data.name, "Name", 120);
  const email = requireEmail(errors, "email", data.email);
  // Optional here — the contact form marks phone as optional, unlike the
  // appointment form, where we need a number to call back.
  const phone = optionalPhone(errors, "phone", data.phone);

  // General enquiry text. May contain patient-provided health context —
  // permitted because transport is the practice's BAA-covered Workspace (see
  // src/lib/email.ts). Never log it.
  const message = requireText(errors, "message", data.message, "Message", 2000);
  const preferredContact = oneOf(data.preferredContact, CONTACT_METHODS, "phone");

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const body = [
    "New enquiry from planoderm.com",
    "",
    `Name:              ${name}`,
    `Phone:             ${phone || "Not provided"}`,
    `Email:             ${email}`,
    `Prefers contact by: ${preferredContact}`,
    "",
    "Message:",
    message,
    "",
    "---",
    "May contain patient health information — handle per practice policy and",
    "do not forward outside the practice.",
  ].join("\n");

  const result = await sendToPractice({
    subject: `Website enquiry — ${name}`,
    body,
    replyTo: email,
  });

  if (!result.ok) {
    console.error("[contact] send failed:", result.reason, result.detail);
    return NextResponse.json(
      {
        ok: false,
        message:
          `We couldn't send your message. Please call us at ${siteConfig.contact.phone}.`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
