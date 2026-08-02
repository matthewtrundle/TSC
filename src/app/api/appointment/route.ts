import { NextResponse } from "next/server";
import {
  sendToPractice,
  requireText,
  requireEmail,
  requirePhone,
  oneOf,
  type FieldErrors,
} from "@/lib/email";

// Values must stay in sync with the selects in src/app/appointment/page.tsx.
// Windows are derived from siteConfig.hours: Mon-Thu 7:30am-4pm, Fri 10am-2pm.
const TIME_WINDOWS = ["morning", "afternoon", "flexible"] as const;
const VISIT_TYPES = ["new-patient", "returning-patient"] as const;
const REFERRAL_SOURCES = [
  "",
  "doctor-referral",
  "friend-family",
  "google",
  "insurance",
  "other",
] as const;

const TIME_WINDOW_LABELS: Record<(typeof TIME_WINDOWS)[number], string> = {
  morning: "Morning (7:30am - 12pm)",
  afternoon: "Afternoon (12pm - 4pm)",
  flexible: "Flexible",
};

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
  const errors: FieldErrors = {};

  const firstName = requireText(errors, "firstName", data.firstName, "First name", 80);
  const lastName = requireText(errors, "lastName", data.lastName, "Last name", 80);
  const email = requireEmail(errors, "email", data.email);
  const phone = requirePhone(errors, "phone", data.phone);

  const visitType = oneOf(data.visitType, VISIT_TYPES, "new-patient");
  const preferredTime = oneOf(data.preferredTime, TIME_WINDOWS, "flexible");
  const referralSource = oneOf(data.referralSource, REFERRAL_SOURCES, "");

  // Optional; a bare date string carries no clinical meaning on its own.
  const preferredDate =
    typeof data.preferredDate === "string" ? data.preferredDate.trim().slice(0, 40) : "";

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
    `Preferred date:  ${preferredDate || "No preference"}`,
    `Preferred time:  ${TIME_WINDOW_LABELS[preferredTime]}`,
    `Heard about us:  ${referralSource || "Not specified"}`,
    "",
    "This form does not collect medical information. Call the patient to discuss.",
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
