import { NextResponse } from "next/server";
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
  const errors: FieldErrors = {};

  const name = requireText(errors, "name", data.name, "Name", 120);
  const email = requireEmail(errors, "email", data.email);
  // Optional here — the contact form marks phone as optional, unlike the
  // appointment form, where we need a number to call back.
  const phone = optionalPhone(errors, "phone", data.phone);

  // General enquiry text. The form warns against medical detail, but a patient
  // may still type some, so this is capped and the practice is reminded to move
  // any clinical discussion to the phone.
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
    "If this message contains medical detail, continue the conversation by phone",
    "rather than replying by email.",
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
          "We couldn't send your message. Please call us at (972) 378-0620.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
