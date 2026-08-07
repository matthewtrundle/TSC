import { NextResponse } from "next/server";
import {
  sendToPractice,
  requireText,
  requireEmail,
  requirePhone,
  oneOf,
  type FieldErrors,
} from "@/lib/email";

// Values must stay in sync with the selects in AppointmentForm.tsx.
const VISIT_TYPES = ["new-patient", "returning-patient"] as const;

// Ordered by how often each reason brings patients in.
const REASONS = [
  "skin-cancer",
  "follow-up",
  "cyst-lipoma",
  "pilonidal",
  "keloid",
  "prp-hair-loss",
  "skin-biopsy",
  "laser-chemical-peel",
  "nail-issue",
  "other",
] as const;

const REASON_LABELS: Record<(typeof REASONS)[number], string> = {
  "skin-cancer": "Skin cancer",
  "follow-up": "Follow-up / wound check",
  "cyst-lipoma": "Cyst or lipoma",
  pilonidal: "Pilonidal cyst",
  keloid: "Keloids",
  "prp-hair-loss": "PRP / hair loss",
  "skin-biopsy": "Skin biopsy",
  "laser-chemical-peel": "Laser or chemical peel",
  "nail-issue": "Nail issue",
  other: "Other",
};
const REFERRAL_SOURCES = [
  "",
  "doctor-referral",
  "friend-family",
  "google",
  "insurance",
  "other",
] as const;

const VISIT_TYPE_LABELS: Record<(typeof VISIT_TYPES)[number], string> = {
  "new-patient": "New patient",
  "returning-patient": "Returning patient",
};

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

  const firstName = requireText(errors, "firstName", data.firstName, "First name", 80);
  const lastName = requireText(errors, "lastName", data.lastName, "Last name", 80);
  const email = requireEmail(errors, "email", data.email);
  const phone = requirePhone(errors, "phone", data.phone);

  const visitType = oneOf(data.visitType, VISIT_TYPES, "new-patient");
  const referralSource = oneOf(data.referralSource, REFERRAL_SOURCES, "");

  // Required — this is the triage key for the callback.
  const reason =
    typeof data.reason === "string" && (REASONS as readonly string[]).includes(data.reason)
      ? (data.reason as (typeof REASONS)[number])
      : null;
  if (!reason) {
    errors.reason = "Please select a reason for your visit.";
  }

  // Optional free-text message. May contain patient-provided health context —
  // permitted because transport is the practice's BAA-covered Workspace (see
  // src/lib/email.ts). Never log it. Length enforced here regardless of client.
  const message = typeof data.message === "string" ? data.message.trim() : "";
  if (message.length > 1000) {
    errors.message = "Message must be under 1000 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const body = [
    "New appointment request from planoderm.com",
    "",
    `Name:            ${firstName} ${lastName}`,
    `Phone:           ${phone}`,
    `Email:           ${email}`,
    `Visit type:      ${VISIT_TYPE_LABELS[visitType]}`,
    `Reason:          ${REASON_LABELS[reason!]}`,
    `Heard about us:  ${referralSource || "Not specified"}`,
    "",
    "Message from the patient:",
    message || "(none)",
    "",
    "May contain patient health information — handle per practice policy and",
    "do not forward outside the practice.",
  ].join("\n");

  const result = await sendToPractice({
    subject: `Appointment request — ${firstName} ${lastName}`,
    body,
    replyTo: email,
  });

  if (!result.ok) {
    // Log the real cause server-side; never leak configuration detail to the client.
    console.error("[appointment] send failed:", result.reason, result.detail);
    return NextResponse.json(
      {
        ok: false,
        message:
          "We couldn't submit your request. Please call us at (972) 378-0620 and we'll get you scheduled.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
