// =============================================================================
// TRANSACTIONAL EMAIL
// Sends form submissions to the practice through its own Google Workspace
// account (Gmail SMTP with an app password).
//
// Why Workspace and not a third-party sender: the practice's Google Workspace
// has a signed HIPAA BAA (in place since 2018), so mail sent from the
// practice's own account to the practice's own inbox stays inside BAA-covered
// infrastructure end to end at rest. That is what permits the forms to accept
// free-text messages that may contain health information. Do NOT swap this for
// a convenience sender (Resend, SendGrid, etc.) without a signed BAA — that
// would silently break the compliance posture the form copy promises.
//
// Two rules for callers:
//   - Never log message bodies. This module and its callers log only
//     error reasons, never content.
//   - The serverless function handles the submission transiently in memory
//     only; keep it that way (no persistence, no analytics on form routes).
// =============================================================================

import nodemailer from "nodemailer";

export type SendResult =
  | { ok: true }
  | { ok: false; reason: "unconfigured" | "upstream"; detail: string };

/**
 * Sends a plain-text email to the practice inbox via the practice's own
 * Workspace account.
 *
 * Returns a discriminated result rather than throwing, so callers can
 * distinguish "the site isn't set up yet" from "the send genuinely failed" and
 * report each honestly. It never resolves successfully unless Gmail accepted
 * the message.
 */
export async function sendToPractice({
  subject,
  body,
  replyTo,
}: {
  subject: string;
  body: string;
  replyTo?: string;
}): Promise<SendResult> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.PRACTICE_INBOX || "office@planoderm.com";

  if (!user || !pass) {
    return {
      ok: false,
      reason: "unconfigured",
      detail: "Missing GMAIL_USER or GMAIL_APP_PASSWORD. See .env.example.",
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: user,
      to,
      subject,
      text: body,
      ...(replyTo ? { replyTo } : {}),
    });

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      reason: "upstream",
      detail: error instanceof Error ? error.message : String(error),
    };
  }
}

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

export type FieldErrors = Record<string, string>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Digits only, so (972) 378-0620 and 972-378-0620 both validate. */
const digitsOf = (value: string) => value.replace(/\D/g, "");

export function requireText(
  errors: FieldErrors,
  field: string,
  value: unknown,
  label: string,
  max = 200,
): string {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) {
    errors[field] = `${label} is required.`;
  } else if (text.length > max) {
    errors[field] = `${label} must be under ${max} characters.`;
  }
  return text;
}

export function requireEmail(
  errors: FieldErrors,
  field: string,
  value: unknown,
): string {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) {
    errors[field] = "Email is required.";
  } else if (!EMAIL_PATTERN.test(text)) {
    errors[field] = "Enter a valid email address.";
  }
  return text;
}

export function requirePhone(
  errors: FieldErrors,
  field: string,
  value: unknown,
): string {
  const text = typeof value === "string" ? value.trim() : "";
  const digits = digitsOf(text);
  if (!text) {
    errors[field] = "Phone number is required.";
  } else if (digits.length < 10 || digits.length > 11) {
    errors[field] = "Enter a 10-digit phone number.";
  }
  return text;
}

/** Same shape check as requirePhone, but an empty value is acceptable. */
export function optionalPhone(
  errors: FieldErrors,
  field: string,
  value: unknown,
): string {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) return "";
  const digits = digitsOf(text);
  if (digits.length < 10 || digits.length > 11) {
    errors[field] = "Enter a 10-digit phone number.";
  }
  return text;
}

/** Constrains a select to its known options, defaulting rather than trusting input. */
export function oneOf<T extends string>(
  value: unknown,
  allowed: readonly T[],
  fallback: T,
): T {
  return typeof value === "string" && (allowed as readonly string[]).includes(value)
    ? (value as T)
    : fallback;
}
