import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/data/siteData";
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
  "earlobe-repair",
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
  "earlobe-repair": "Earlobe repair",
  "nail-issue": "Nail issue",
  other: "Other",
};
const REFERRAL_SOURCE_LABELS: Record<string, string> = {
  "doctor-referral": "Doctor Referral",
  "friend-family": "Friend or Family",
  google: "Google Search",
  insurance: "Insurance Provider",
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
    // A flagged submission that also fails validation is junk: pretend
    // success so bots learn nothing, log it, send nothing.
    if (spamSignals.length > 0) {
      console.warn("[spam-guard] dropped invalid flagged submission:", spamSignals.join("; "));
      return NextResponse.json({ ok: true });
    }
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
    `Heard about us:  ${REFERRAL_SOURCE_LABELS[referralSource] || "Not specified"}`,
    "",
    "Message from the patient:",
    message || "(none)",
    "",
    "May contain patient health information — handle per practice policy and",
    "do not forward outside the practice.",
  ].join("\n");

  const flagged = spamSignals.length > 0;
  if (flagged) {
    console.warn("[spam-guard] delivering flagged appointment request:", spamSignals.join("; "));
  }
  const result = await sendToPractice({
    subject: flagged
      ? `[POSSIBLE SPAM — verify before calling] Appointment request — ${firstName} ${lastName}`
      : `Appointment request — ${firstName} ${lastName}`,
    body: flagged
      ? `FLAGGED AS POSSIBLE SPAM (${spamSignals.join("; ")}).\nReal patients can trip these checks — please verify rather than discard.\n\n${body}`
      : body,
    replyTo: email,
  });

  if (!result.ok) {
    // Log the real cause server-side; never leak configuration detail to the client.
    console.error("[appointment] send failed:", result.reason, result.detail);
    return NextResponse.json(
      {
        ok: false,
        message:
          `We couldn't submit your request. Please call us at ${siteConfig.contact.phone} and we'll get you scheduled.`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
