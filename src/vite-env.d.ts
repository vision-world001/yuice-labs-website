/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** EmailJS IDs used to deliver form submissions to the company inbox (see .env.example). */
  readonly VITE_EMAILJS_SERVICE_ID: string;
  readonly VITE_EMAILJS_TEMPLATE_ID: string;
  readonly VITE_EMAILJS_PUBLIC_KEY: string;
  /** Company inbox for form submissions, passed to the EmailJS template as {{to_email}}. */
  readonly VITE_COMPANY_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
