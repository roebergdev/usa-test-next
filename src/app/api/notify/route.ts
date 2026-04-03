import { NextRequest, NextResponse } from 'next/server';

export interface NotifyPayload {
  phone: string;    // 10 raw digits
  firstName: string;
  score: number;
  totalQuestions: number;
  streak: number;
}

/**
 * POST /api/notify
 *
 * Sends a confirmation + daily-reminder SMS after the user saves their score.
 * Currently a stub — swap in your SMS provider in the section marked below.
 *
 * Supported providers (examples):
 *   • Twilio           https://www.twilio.com/docs/sms
 *   • Attentive        https://docs.attentivemobile.com
 *   • Postscript       https://docs.postscript.io
 *   • SimpleTexting    https://simpletexting.com/api
 *
 * All provider calls should use env vars — never hardcode keys.
 * Required env vars (add to .env.local):
 *   SMS_PROVIDER=twilio          # or attentive, postscript, etc.
 *   SMS_FROM=+15550000000        # your sending number / short code
 *   TWILIO_ACCOUNT_SID=...
 *   TWILIO_AUTH_TOKEN=...
 */
export async function POST(req: NextRequest) {
  let body: NotifyPayload;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const { phone, firstName, score, totalQuestions, streak } = body;

  if (!phone || phone.replace(/\D/g, '').length !== 10) {
    return NextResponse.json({ ok: false, error: 'Invalid phone' }, { status: 400 });
  }

  const e164 = `+1${phone.replace(/\D/g, '')}`;
  const streakLine = streak > 1 ? ` Keep your ${streak}-day streak alive!` : '';
  const message =
    `Hey ${firstName}! You scored ${score}/${totalQuestions} on today's USA Test.${streakLine} ` +
    `Come back tomorrow: https://usatest.com — Reply STOP to cancel.`;

  // ── SMS provider integration ──────────────────────────────────────────────
  // Uncomment and configure the block for your provider.
  //
  // ── Twilio ────────────────────────────────────────────────────────────────
  // import twilio from 'twilio';
  // const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  // await client.messages.create({
  //   body: message,
  //   from: process.env.SMS_FROM,
  //   to: e164,
  // });
  //
  // ── SimpleTexting ─────────────────────────────────────────────────────────
  // await fetch('https://api.simpletexting.com/v2/api/messages', {
  //   method: 'POST',
  //   headers: {
  //     Authorization: `Bearer ${process.env.SIMPLETEXTING_TOKEN}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ contactPhone: e164, text: message, mode: 'SMS' }),
  // });
  //
  // ── Any provider ─────────────────────────────────────────────────────────
  // Follow the same pattern: POST to the provider's API with `e164` and `message`.
  // ─────────────────────────────────────────────────────────────────────────

  // Stub — log only until a real provider is configured
  console.log('[notify] SMS stub →', { to: e164, message });

  return NextResponse.json({ ok: true });
}
