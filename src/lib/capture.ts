/**
 * Capture utilities for the post-quiz user info flow.
 *
 * All functions are pure — no side-effects, no network calls.
 * Submission logic lives in useDailyGame; SMS delivery lives in /api/notify.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CaptureFormData {
  firstName: string;
  lastInitial: string;
  phone: string;
  smsConsent: boolean;
}

export interface CaptureErrors {
  firstName?: string;
  lastInitial?: string;
  phone?: string;
  smsConsent?: string;
}

// ─── Normalization ────────────────────────────────────────────────────────────

/** "john " → "John" */
export function normalizeFirstName(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '';
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

/** "smith" → "S" */
export function normalizeLastInitial(value: string): string {
  return value.trim().charAt(0).toUpperCase();
}

/** Build the leaderboard display name, e.g. "John S." */
export function buildDisplayName(firstName: string, lastInitial: string): string {
  return `${normalizeFirstName(firstName)} ${normalizeLastInitial(lastInitial)}.`;
}

// ─── Phone formatting ─────────────────────────────────────────────────────────

/** Format digits as (XXX) XXX-XXXX while user types. Caps at 10 digits. */
export function formatPhoneDisplay(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

/** Strip all non-digit characters → bare 10-digit string */
export function stripPhone(value: string): string {
  return value.replace(/\D/g, '');
}

/** Format a 10-digit string as E.164 (+1XXXXXXXXXX) for SMS providers */
export function toE164(digits: string): string {
  return `+1${digits}`;
}

// ─── Validation ───────────────────────────────────────────────────────────────

export function validateCapture(data: CaptureFormData): CaptureErrors {
  const errors: CaptureErrors = {};

  if (!data.firstName.trim()) {
    errors.firstName = 'First name is required.';
  } else if (data.firstName.trim().length < 2) {
    errors.firstName = 'Enter your full first name.';
  }

  if (!data.lastInitial.trim()) {
    errors.lastInitial = 'Required.';
  } else if (!/^[a-zA-Z]$/.test(data.lastInitial.trim())) {
    errors.lastInitial = 'One letter only.';
  }

  const digits = stripPhone(data.phone);
  if (!digits) {
    errors.phone = 'Phone number is required.';
  } else if (digits.length !== 10) {
    errors.phone = 'Enter a valid 10-digit US number.';
  }

  if (!data.smsConsent) {
    errors.smsConsent = 'Please agree to receive daily reminders.';
  }

  return errors;
}

export function hasErrors(errors: CaptureErrors): boolean {
  return Object.values(errors).some(Boolean);
}

// ─── SMS consent copy ─────────────────────────────────────────────────────────
// Adjust to match your legal/compliance requirements before launch.

export const SMS_CONSENT_TEXT =
  'By checking this box, you agree to receive automated quiz reminders from USA Test ' +
  'via text message. Message & data rates may apply. Reply STOP at any time to cancel.';
