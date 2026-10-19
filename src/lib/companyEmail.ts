import emailjs from '@emailjs/browser';

/**
 * Sends form submissions to the company inbox through EmailJS (https://www.emailjs.com).
 * Both forms use one EmailJS template; `message_type` tells the two kinds of email apart.
 * The IDs come from .env (see .env.example). The public key is designed to live in the browser.
 */
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
/** Inbox that receives the forms; sent as {{to_email}} so the template's "To Email" can use it. */
const COMPANY_EMAIL = import.meta.env.VITE_COMPANY_EMAIL?.trim() ?? '';

export type MessageType = 'Job application' | 'Contact message';

/** Fields the template can show; anything not sent appears as "—". */
export interface CompanyEmailFields {
  from_name: string;
  from_email: string;
  phone?: string;
  linkedin?: string;
  role?: string;
  company?: string;
  inquiry?: string;
  message?: string;
}

const TEMPLATE_FIELDS: Array<keyof CompanyEmailFields> = [
  'from_name',
  'from_email',
  'phone',
  'linkedin',
  'role',
  'company',
  'inquiry',
  'message',
];

/** Marker used by the placeholder values in .env / .env.example. */
const PLACEHOLDER = 'REPLACE_ME';

/** True once real EmailJS IDs are set (not missing, not the REPLACE_ME placeholders). */
export function isCompanyEmailConfigured() {
  return [SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY].every((value) => Boolean(value) && !value.includes(PLACEHOLDER));
}

export async function sendCompanyEmail(type: MessageType, fields: CompanyEmailFields) {
  const params: Record<string, string> = {
    message_type: type,
    subject: `[${type}] ${fields.from_name}${fields.role ? ` — ${fields.role}` : ''}`,
    reply_to: fields.from_email,
    sent_at: new Date().toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short', timeZone: 'UTC' }) + ' UTC',
    page_url: window.location.href,
  };
  // Only pass a real address: EmailJS rejects an invalid recipient ("The recipients address is corrupted").
  if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(COMPANY_EMAIL)) params.to_email = COMPANY_EMAIL;
  for (const key of TEMPLATE_FIELDS) params[key] = fields[key]?.trim() || '—';

  if (!isCompanyEmailConfigured()) {
    // Local development without real IDs: show what would be sent and carry on as if it succeeded.
    if (import.meta.env.DEV) {
      console.info(`[EmailJS demo mode] Would send "${type}" email (set real IDs in .env to send):`, params);
      return;
    }
    // A live build must never pretend to send, so the form shows its error instead of losing the message.
    throw new Error('EmailJS is not configured: set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY.');
  }

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, {
      publicKey: PUBLIC_KEY,
      // Basic abuse protection: at most one email per form from this browser every 5 seconds.
      // (Failed attempts count too, so keep this short enough that a retry isn't blocked.)
      limitRate: { id: type === 'Job application' ? 'yuice-apply' : 'yuice-contact', throttle: 5_000 },
    });
  } catch (error) {
    // EmailJS rejects with { status, text }; surface its reason so problems are easy to diagnose.
    const { status, text } = (error ?? {}) as { status?: number; text?: string };
    throw new Error(`EmailJS could not send the "${type}" email${status ? ` (HTTP ${status})` : ''}: ${text ?? String(error)}`);
  }
}

/** Resolves after `ms`, so a quick request still shows the loading state long enough to register. */
export function wait(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}
