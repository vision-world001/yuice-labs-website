import { getCountries, getCountryCallingCode, parsePhoneNumberFromString, type CountryCode } from 'libphonenumber-js';

export type FieldName = 'name' | 'email' | 'linkedin' | 'phone' | 'city' | 'country' | 'role' | 'note';
export type FormValues = Record<FieldName, string>;

export const NOTE_MAX = 1500;

/** Every country the phone library knows, with its English name, sorted by name. */
const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
export const countries: Array<{ code: CountryCode; name: string; dial: string }> = getCountries()
  .map((code) => ({ code, name: regionNames.of(code) ?? code, dial: `+${getCountryCallingCode(code)}` }))
  .sort((a, b) => a.name.localeCompare(b.name));

const NAME_PATTERN = /^[\p{L}][\p{L}\p{M} '.-]*[\p{L}.]$/u;
const CITY_PATTERN = /^[\p{L}][\p{L}\p{M} '.,()-]*[\p{L}.)]$/u;
const EMAIL_LOCAL = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/;
const EMAIL_LABEL = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/;
const LINKEDIN_SLUG = /^[\p{L}\p{N}_-][\p{L}\p{N}_%-]{1,98}[\p{L}\p{N}_-]$/u;

/** Frequent misspellings of big email providers, so we can suggest the right one. */
const EMAIL_TYPOS: Record<string, string> = {
  'gmial.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gmail.co': 'gmail.com',
  'gmail.con': 'gmail.com',
  'hotmial.com': 'hotmail.com',
  'hotmail.con': 'hotmail.com',
  'yahooo.com': 'yahoo.com',
  'yaho.com': 'yahoo.com',
  'outlok.com': 'outlook.com',
  'outlook.con': 'outlook.com',
  'iclod.com': 'icloud.com',
};

function emailError(value: string): string | undefined {
  if (!value) return 'Please enter your email.';
  if (value.length > 254) return 'Email must be 254 characters or fewer.';
  const at = value.lastIndexOf('@');
  if (at < 1 || value.indexOf('@') !== at) return 'Enter a valid email address, like you@example.com.';
  const local = value.slice(0, at);
  const domain = value.slice(at + 1).toLowerCase();
  const labels = domain.split('.');
  const tld = labels[labels.length - 1];
  if (
    local.length > 64 ||
    !EMAIL_LOCAL.test(local) ||
    labels.length < 2 ||
    !labels.every((label) => EMAIL_LABEL.test(label)) ||
    !/^[a-z]{2,}$/.test(tld)
  ) {
    return 'Enter a valid email address, like you@example.com.';
  }
  const suggestion = EMAIL_TYPOS[domain];
  if (suggestion) return `Did you mean ${local}@${suggestion}?`;
  return undefined;
}

/** Accepts linkedin.com/in/<name> with or without https:// and www. or a country subdomain. */
function linkedinError(value: string): string | undefined {
  if (!value) return 'Please add your LinkedIn profile.';
  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
  } catch {
    return 'Enter your LinkedIn profile link, like linkedin.com/in/your-name.';
  }
  const host = url.hostname.toLowerCase();
  if (host !== 'linkedin.com' && !host.endsWith('.linkedin.com')) {
    return 'This must be a linkedin.com link.';
  }
  const parts = url.pathname.split('/').filter(Boolean);
  if (parts[0] !== 'in' || parts.length !== 2) {
    return 'Use your personal profile link, like linkedin.com/in/your-name.';
  }
  if (!LINKEDIN_SLUG.test(decodeURIComponent(parts[1]))) {
    return 'That LinkedIn profile name doesn’t look right.';
  }
  return undefined;
}

function phoneError(value: string, country: string): string | undefined {
  if (!value) return 'Please enter your phone number.';
  if (/[^\d\s()+.-]/.test(value)) return 'Use digits, spaces, and + ( ) - only.';
  const defaultCountry = country ? (country as CountryCode) : undefined;
  if (!value.startsWith('+') && !defaultCountry) {
    return 'Start with your country code (like +1), or choose your country first.';
  }
  const phone = parsePhoneNumberFromString(value, defaultCountry);
  if (!phone || !phone.isValid()) {
    const where = countries.find((item) => item.code === defaultCountry)?.name;
    return where && !value.startsWith('+')
      ? `Enter a valid phone number for ${where}.`
      : 'Enter a valid phone number, including the country code.';
  }
  return undefined;
}

/** Returns the error message for one field, or undefined when it is valid. */
export function validateField(field: FieldName, values: FormValues): string | undefined {
  const value = values[field].trim();
  switch (field) {
    case 'name':
      if (!value) return 'Please enter your full name.';
      if (value.length < 2) return 'Name must be at least 2 characters.';
      if (value.length > 80) return 'Name must be 80 characters or fewer.';
      if (!NAME_PATTERN.test(value)) return 'Use letters, spaces, apostrophes, hyphens, or periods only.';
      if (!/\S+\s+\S+/.test(value)) return 'Please enter your first and last name.';
      return undefined;
    case 'email':
      return emailError(value);
    case 'linkedin':
      return linkedinError(value);
    case 'phone':
      return phoneError(value, values.country);
    case 'city':
      if (!value) return 'Please enter your city.';
      if (value.length < 2 || value.length > 60) return 'City must be between 2 and 60 characters.';
      if (!CITY_PATTERN.test(value)) return 'Enter a real city name, using letters only.';
      return undefined;
    case 'country':
      if (!value) return 'Please choose your country.';
      if (!countries.some((item) => item.code === value)) return 'Please choose a country from the list.';
      return undefined;
    case 'role':
      if (!value) return 'Please choose the role you’re applying for.';
      return undefined;
    case 'note':
      if (value.length > NOTE_MAX) return `Please keep it to ${NOTE_MAX} characters or fewer.`;
      return undefined;
  }
}

/** Formats a valid phone number in international form (e.g. +44 20 7946 0958); leaves anything else as typed. */
export function formatPhone(value: string, country: string) {
  const phone = parsePhoneNumberFromString(value.trim(), country ? (country as CountryCode) : undefined);
  return phone?.isValid() ? phone.formatInternational() : value;
}

/** Normalises a LinkedIn link to https://www.linkedin.com/in/<name>. */
export function formatLinkedin(value: string) {
  if (linkedinError(value.trim())) return value;
  const url = new URL(/^https?:\/\//i.test(value.trim()) ? value.trim() : `https://${value.trim()}`);
  const slug = url.pathname.split('/').filter(Boolean)[1];
  return `https://www.linkedin.com/in/${slug}`;
}
