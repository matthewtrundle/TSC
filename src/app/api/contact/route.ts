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
  const hp = typeof data.company === "string" && data.company.trim().length > 0;
  // Elapsed time comes from the browser's monotonic stopwatch
  // (performance.now delta) — immune to a wrong device clock, unlike the
  // old server-vs-client Date.now comparison that misfired on fast clocks.
  // Old pages may still send startedAt; without elapsedMs there is simply
  // no timing signal.
  const tooFast =
    typeof data.elapsedMs === "number" && data.elapsedMs >= 0 && data.elapsedMs < 4000;
  // Spam signals FLAG the email for staff instead of silently dropping the
  // request (Dr. Modi, 2026-08-11): a misclassified patient must never be
  // lost. Bots still learn nothing — see the validation-failure path.
  const spamSignals = [
    hp ? "hidden honeypot field was filled (can be browser autofill)" : "",
    tooFast ? `form submitted ${Math.round(data.elapsedMs as number)}ms after opening` : "",
  ].filter(Boolean);

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
    // A flagged submission that also fails validation is junk: pretend
    // success so bots learn nothing, log it, send nothing.
    if (spamSignals.length > 0) {
      console.warn("[spam-guard] dropped invalid flagged submission:", spamSignals.join("; "));
      return NextResponse.json({ ok: true });
    }
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

  const flagged = spamSignals.length > 0;
  if (flagged) {
    console.warn("[spam-guard] delivering flagged enquiry:", spamSignals.join("; "));
  }
  const result = await sendToPractice({
    subject: flagged ? `[POSSIBLE SPAM — verify before replying] Website enquiry — ${name}` : `Website enquiry — ${name}`,
    body: flagged
      ? `FLAGGED AS POSSIBLE SPAM (${spamSignals.join("; ")}).\nReal patients can trip these checks — please verify rather than discard.\n\n${body}`
      : body,
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
