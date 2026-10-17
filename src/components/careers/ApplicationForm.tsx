import { useImperativeHandle, useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent, type Ref } from 'react';
import { roles } from '../../data/careersPage';
import { Icon } from '../ui/Icon';
import { SectionLabel } from '../ui/SectionLabel';

type FieldName = 'name' | 'email' | 'role' | 'location' | 'link' | 'note';
type FormValues = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;

const FIELD_ORDER: FieldName[] = ['name', 'email', 'role', 'location', 'link', 'note'];
const EMPTY_VALUES: FormValues = { name: '', email: '', role: '', location: '', link: '', note: '' };
const NOTE_MIN = 30;
const NOTE_MAX = 1500;

const NAME_PATTERN = /^[\p{L}][\p{L}\p{M} '.-]*$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function isWebUrl(value: string) {
  try {
    const url = new URL(value);
    return (url.protocol === 'https:' || url.protocol === 'http:') && url.hostname.includes('.');
  } catch {
    return false;
  }
}

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
      if (!value) return 'Please enter your email.';
      if (value.length > 254) return 'Email must be 254 characters or fewer.';
      if (!EMAIL_PATTERN.test(value)) return 'Enter a valid email address, like you@example.com.';
      return undefined;
    case 'role':
      if (!value) return 'Please choose the role you’re applying for.';
      return undefined;
    case 'location':
      if (!value) return 'Please tell us where you’re based.';
      if (value.length < 2) return 'Location must be at least 2 characters.';
      if (value.length > 80) return 'Location must be 80 characters or fewer.';
      return undefined;
    case 'link':
      if (!value) return 'Please add your LinkedIn, GitHub, or portfolio link.';
      if (!isWebUrl(value)) return 'Enter a full link starting with https://';
      return undefined;
    case 'note':
      if (!value) return 'Please tell us a little about yourself.';
      if (value.length < NOTE_MIN) return `Please write at least ${NOTE_MIN} characters.`;
      if (value.length > NOTE_MAX) return `Please keep it to ${NOTE_MAX} characters or fewer.`;
      return undefined;
  }
}

export interface ApplicationFormHandle {
  /** Pre-fills the role field (from a role card's "Apply" button) and focuses the form. */
  prefillRole: (roleId: string) => void;
}

interface ApplicationFormProps {
  ref?: Ref<ApplicationFormHandle>;
}

export function ApplicationForm({ ref }: ApplicationFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submittedRole, setSubmittedRole] = useState<string | null>(null);

  useImperativeHandle(ref, () => ({
    prefillRole(roleId) {
      setValues((current) => ({ ...current, role: roleId }));
      setErrors((current) => ({ ...current, role: undefined }));
      setSubmittedRole(null);
      formRef.current?.querySelector<HTMLInputElement>('[name="name"]')?.focus({ preventScroll: true });
    },
  }));

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const field = event.target.name as FieldName;
    const { value } = event.target;
    setValues((current) => ({ ...current, [field]: value }));
    setSubmittedRole(null);
    if (touched[field]) setErrors((current) => ({ ...current, [field]: validateField(field, value) }));
  }

  function handleBlur(event: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const field = event.target.name as FieldName;
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({ ...current, [field]: validateField(field, event.target.value) }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    for (const field of FIELD_ORDER) {
      const error = validateField(field, values[field]);
      if (error) nextErrors[field] = error;
    }
    setErrors(nextErrors);
    setTouched(Object.fromEntries(FIELD_ORDER.map((field) => [field, true])));

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const roleTitle = roles.find((role) => role.id === values.role)?.title ?? 'a general application';
    setSubmittedRole(roleTitle);
    setValues(EMPTY_VALUES);
    setTouched({});
    setErrors({});
  }

  function fieldProps(field: FieldName) {
    const error = errors[field];
    return {
      name: field,
      value: values[field],
      onChange: handleChange,
      onBlur: handleBlur,
      'aria-invalid': error ? true : undefined,
      'aria-describedby': error ? `apply-${field}-error` : undefined,
    };
  }

  function errorText(field: FieldName) {
    const error = errors[field];
    return error ? (
      <small className="field-error" id={`apply-${field}-error`}>
        {error}
      </small>
    ) : null;
  }

  function label(text: string) {
    return (
      <span>
        {text} <em aria-hidden="true">*</em>
      </span>
    );
  }

  const noteLength = values.note.trim().length;

  return (
    <section className="apply light-section" id="apply">
      <div className="page-width apply-grid">
        <div className="careers-intro">
          <SectionLabel>Apply</SectionLabel>
          <h2>Let’s talk.</h2>
          <p>
            Tell us a little about yourself and what you’d like to build. We reply to every application within five
            working days.
          </p>
          <ul className="apply-points">
            <li>
              <span>
                <Icon name="check" size={14} />
              </span>
              No cover letter needed
            </li>
            <li>
              <span>
                <Icon name="check" size={14} />
              </span>
              Paid take-home exercises only
            </li>
            <li>
              <span>
                <Icon name="check" size={14} />
              </span>
              Feedback at every stage
            </li>
          </ul>
        </div>

        <form className="contact-form" ref={formRef} onSubmit={handleSubmit} noValidate>
          {submittedRole && (
            <div className="form-success" role="status">
              Thanks! Your application for {submittedRole} is in. We’ll be in touch within five working days.
            </div>
          )}
          <div className="form-row">
            <label>
              {label('Full name')}
              <input {...fieldProps('name')} required autoComplete="name" placeholder="Your name" />
              {errorText('name')}
            </label>
            <label>
              {label('Email')}
              <input
                {...fieldProps('email')}
                required
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
              />
              {errorText('email')}
            </label>
          </div>
          <div className="form-row">
            <label>
              {label('Role')}
              <select {...fieldProps('role')} required>
                <option value="" disabled>
                  Select a role
                </option>
                {roles.map(({ id, title }) => (
                  <option value={id} key={id}>
                    {title}
                  </option>
                ))}
                <option value="general">General application</option>
              </select>
              {errorText('role')}
            </label>
            <label>
              {label('Location')}
              <input {...fieldProps('location')} required autoComplete="address-level2" placeholder="City, country" />
              {errorText('location')}
            </label>
          </div>
          <label>
            {label('LinkedIn, GitHub, or portfolio')}
            <input
              {...fieldProps('link')}
              required
              type="url"
              inputMode="url"
              placeholder="https://"
            />
            {errorText('link')}
          </label>
          <label>
            {label('Why Yuice?')}
            <textarea
              {...fieldProps('note')}
              required
              rows={5}
              placeholder="A few sentences about you and what you’d like to work on…"
            />
            <span className="message-meta">
              {errorText('note') ?? <span />}
              <span className={noteLength > NOTE_MAX ? 'char-count is-over' : 'char-count'}>
                {noteLength}/{NOTE_MAX}
              </span>
            </span>
          </label>
          <button className="button button-primary form-submit" type="submit">
            Submit application <Icon name="arrow" size={16} />
          </button>
        </form>
      </div>
    </section>
  );
}
