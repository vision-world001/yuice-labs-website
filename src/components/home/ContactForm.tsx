import { useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent } from 'react';
import { Icon } from '../ui/Icon';

type FieldName = 'name' | 'email' | 'company' | 'inquiry' | 'message';
type FormValues = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;

const FIELD_ORDER: FieldName[] = ['name', 'email', 'company', 'inquiry', 'message'];
const EMPTY_VALUES: FormValues = { name: '', email: '', company: '', inquiry: '', message: '' };
const MESSAGE_MAX = 1000;
const MESSAGE_MIN = 10;

const NAME_PATTERN = /^[\p{L}][\p{L}\p{M} '.-]*$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returns the error message for one field, or undefined when it is valid. */
function validateField(field: FieldName, rawValue: string): string | undefined {
  const value = rawValue.trim();

  switch (field) {
    case 'name':
      if (!value) return 'Please enter your full name.';
      if (value.length < 2) return 'Name must be at least 2 characters.';
      if (value.length > 80) return 'Name must be 80 characters or fewer.';
      if (!NAME_PATTERN.test(value)) return 'Use letters, spaces, apostrophes, hyphens, or periods only.';
      return undefined;
    case 'email':
      if (!value) return 'Please enter your work email.';
      if (value.length > 254) return 'Email must be 254 characters or fewer.';
      if (!EMAIL_PATTERN.test(value)) return 'Enter a valid email address, like you@company.com.';
      return undefined;
    case 'company':
      if (!value) return 'Please enter your company name.';
      if (value.length < 2) return 'Company name must be at least 2 characters.';
      if (value.length > 100) return 'Company name must be 100 characters or fewer.';
      return undefined;
    case 'inquiry':
      if (!value) return 'Please choose how we can help.';
      return undefined;
    case 'message':
      if (!value) return 'Please tell us a little about your interest.';
      if (value.length < MESSAGE_MIN) return `Please write at least ${MESSAGE_MIN} characters.`;
      if (value.length > MESSAGE_MAX) return `Message must be ${MESSAGE_MAX} characters or fewer.`;
      return undefined;
  }
}

function validateAll(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  for (const field of FIELD_ORDER) {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
  }
  return errors;
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const field = event.target.name as FieldName;
    const { value } = event.target;
    setValues((current) => ({ ...current, [field]: value }));
    setSubmitted(false);
    // Once a field has been visited, keep its message in sync while typing.
    if (touched[field]) setErrors((current) => ({ ...current, [field]: validateField(field, value) }));
  }

  function handleBlur(event: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const field = event.target.name as FieldName;
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({ ...current, [field]: validateField(field, event.target.value) }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateAll(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, company: true, inquiry: true, message: true });

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setSubmitted(true);
    setValues(EMPTY_VALUES);
    setTouched({});
    setErrors({});
  }

  /** Shared accessibility and state props for each control. */
  function fieldProps(field: FieldName) {
    const error = errors[field];
    return {
      name: field,
      value: values[field],
      onChange: handleChange,
      onBlur: handleBlur,
      'aria-invalid': error ? true : undefined,
      'aria-describedby': error ? `${field}-error` : undefined,
    };
  }

  function errorText(field: FieldName) {
    const error = errors[field];
    return error ? (
      <small className="field-error" id={`${field}-error`}>
        {error}
      </small>
    ) : null;
  }

  const messageLength = values.message.trim().length;

  return (
    <form className="contact-form" ref={formRef} onSubmit={handleSubmit} noValidate>
      {submitted && (
        <div className="form-success" role="status">
          Thanks for reaching out. We’ll be in touch soon.
        </div>
      )}
      <div className="form-row">
        <label>
          <span>
            Full name <em aria-hidden="true">*</em>
          </span>
          <input {...fieldProps('name')} required autoComplete="name" placeholder="Your name" />
          {errorText('name')}
        </label>
        <label>
          <span>
            Work email <em aria-hidden="true">*</em>
          </span>
          <input
            {...fieldProps('email')}
            required
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@company.com"
          />
          {errorText('email')}
        </label>
      </div>
      <div className="form-row">
        <label>
          <span>
            Company <em aria-hidden="true">*</em>
          </span>
          <input {...fieldProps('company')} required autoComplete="organization" placeholder="Your company" />
          {errorText('company')}
        </label>
        <label>
          <span>
            How can we help? <em aria-hidden="true">*</em>
          </span>
          <select {...fieldProps('inquiry')} required>
            <option value="" disabled>
              Select an option
            </option>
            <option>Partnerships</option>
            <option>Business inquiry</option>
            <option>Careers</option>
            <option>Other</option>
          </select>
          {errorText('inquiry')}
        </label>
      </div>
      <div className="message-field">
        <textarea
          {...fieldProps('message')}
          required
          rows={4}
          aria-label="Message (required)"
          placeholder="Tell us more about your interest... *"
        />
        <div className="message-meta">
          {errorText('message') ?? <span />}
          <span className={messageLength > MESSAGE_MAX ? 'char-count is-over' : 'char-count'} aria-live="polite">
            {messageLength}/{MESSAGE_MAX}
          </span>
        </div>
      </div>
      <button className="button button-primary form-submit" type="submit">
        Send Message <Icon name="arrow" size={16} />
      </button>
    </form>
  );
}
