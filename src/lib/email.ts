// =============================================================================
// TRANSACTIONAL EMAIL
// Sends form submissions to the practice via Resend.
//
// IMPORTANT — standard email is not a HIPAA-compliant transport. Nothing routed
// through here may carry protected health information. The forms that feed this
// module are deliberately scoped to contact and scheduling details only: no
// diagnosis, no symptoms, no free-text clinical field. If a clinical intake
// field is ever added, this transport has to be replaced with a BAA-covered
// vendor first.
// =============================================================================

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export type SendResult =
  | { ok: true }
  | { ok: false; reason: "unconfigured" | "upstream"; detail: string };

/**
 * Sends a plain-text email to the practice inbox.
 *
 * Returns a discriminated result rather than throwing, so callers can
 * distinguish "the site isn't set up yet" from "the send genuinely failed" and
 * report each honestly. It never resolves successfully unless Resend accepted
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
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.PRACTICE_INBOX;
  const from = process.env.FORM_FROM_ADDRESS;

  if (!apiKey || !to || !from) {
    return {
      ok: false,
      reason: "unconfigured",
      detail:
        "Missing RESEND_API_KEY, PRACTICE_INBOX, or FORM_FROM_ADDRESS. See .env.example.",
    };
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text: body,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });

    if (!response.ok) {
      return {
        ok: false,
        reason: "upstream",
        detail: `Resend responded ${response.status}: ${await response.text()}`,
      };
    }

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
