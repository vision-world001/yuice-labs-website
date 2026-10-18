import { useEffect, useImperativeHandle, useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent, type Ref } from 'react';
import { roles } from '../../data/careersPage';
import { Icon } from '../ui/Icon';
import {
  NOTE_MAX,
  countries,
  formatLinkedin,
  formatPhone,
  validateField,
  type FieldName,
  type FormValues,
} from './applicationValidation';

type FormErrors = Partial<Record<FieldName, string>>;

const FIELD_ORDER: FieldName[] = ['name', 'email', 'country', 'phone', 'city', 'linkedin', 'role', 'note'];
/** How long the (simulated) submission takes before the form closes. */
const SUBMIT_DELAY_MS = 3500;
/** How long the thank-you notification stays on screen. */
const NOTICE_MS = 6000;

const EMPTY_VALUES: FormValues = { name: '', email: '', linkedin: '', phone: '', city: '', country: '', role: '', note: '' };

export interface ApplicationFormHandle {
  /** Opens the dialog with the role field pre-filled (from a role's "Apply" button). */
  open: (roleId: string) => void;
}

interface ApplicationFormProps {
  ref?: Ref<ApplicationFormHandle>;
}

export function ApplicationForm({ ref }: ApplicationFormProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setStateValues] = useState<FormValues>(EMPTY_VALUES);
  // Latest values, so quick successive changes (autofill, the role pre-fill) never build on a stale copy.
  const latestValues = useRef(values);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const submitTimer = useRef<number | undefined>(undefined);
  const noticeTimer = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      window.clearTimeout(submitTimer.current);
      window.clearTimeout(noticeTimer.current);
    },
    [],
  );

  function setValues(next: FormValues) {
    latestValues.current = next;
    setStateValues(next);
  }

  useImperativeHandle(ref, () => ({
    open(roleId) {
      setValues({ ...latestValues.current, role: roleId });
      setErrors((current) => ({ ...current, role: undefined }));
      if (!dialogRef.current?.open) dialogRef.current?.showModal();
      formRef.current?.querySelector<HTMLInputElement>('[name="name"]')?.focus({ preventScroll: true });
    },
  }));

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const field = event.target.name as FieldName;
    const next = { ...latestValues.current, [field]: event.target.value };
    setValues(next);
    setErrors((current) => {
      const updated = { ...current };
      if (touched[field]) updated[field] = validateField(field, next);
      // The phone number is checked against the chosen country, so re-check it when the country changes.
      if (field === 'country' && touched.phone) updated.phone = validateField('phone', next);
      return updated;
    });
  }

  function handleBlur(event: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const field = event.target.name as FieldName;
    const current = latestValues.current;
    let next = current;
    // Tidy valid entries into a standard form once the person leaves the field.
    if (field === 'phone') next = { ...current, phone: formatPhone(current.phone, current.country) };
    if (field === 'linkedin') next = { ...current, linkedin: formatLinkedin(current.linkedin) };
    if (next !== current) setValues(next);
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({ ...current, [field]: validateField(field, next) }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    for (const field of FIELD_ORDER) {
      const error = validateField(field, latestValues.current);
      if (error) nextErrors[field] = error;
    }
    setErrors(nextErrors);
    setTouched(Object.fromEntries(FIELD_ORDER.map((field) => [field, true])));

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const roleTitle = roles.find((role) => role.id === latestValues.current.role)?.title;
    setSubmitting(true);
    submitTimer.current = window.setTimeout(() => {
      // Clear the form, close it, then thank the applicant.
      setSubmitting(false);
      setValues(EMPTY_VALUES);
      setTouched({});
      setErrors({});
      dialogRef.current?.close();
      showNotice(
        roleTitle
          ? `Thanks for applying for ${roleTitle}! We’ll get back to you within five working days.`
          : 'Thanks for your application! We’ll get back to you within five working days.',
      );
    }, SUBMIT_DELAY_MS);
  }

  function showNotice(message: string) {
    window.clearTimeout(noticeTimer.current);
    setNotice(message);
    noticeTimer.current = window.setTimeout(() => setNotice(null), NOTICE_MS);
  }

  function dismissNotice() {
    window.clearTimeout(noticeTimer.current);
    setNotice(null);
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

  function label(text: string, required = true) {
    return (
      <span>
        {text} {required ? <em aria-hidden="true">*</em> : <small className="field-optional">(optional)</small>}
      </span>
    );
  }

  const noteLength = values.note.trim().length;
  const selectedCountry = countries.find(({ code }) => code === values.country);

  return (
    <>
      <dialog
        className="apply-dialog"
        ref={dialogRef}
        aria-labelledby="apply-title"
        // Only the × button closes the form: ignore Escape and clicks on the backdrop.
        onCancel={(event) => event.preventDefault()}
        onKeyDown={(event) => {
          if (event.key === 'Escape') event.preventDefault();
        }}
      >
        <div className="apply-panel">
          <div className="apply-head">
            <div>
              <h2 id="apply-title">Apply to Yuice Labs</h2>
              <p>Tell us a little about yourself. We reply to every application within five working days.</p>
            </div>
            <button
              type="button"
              className="apply-close"
              aria-label="Close"
              disabled={submitting}
              onClick={() => dialogRef.current?.close()}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <form className="contact-form" ref={formRef} onSubmit={handleSubmit} noValidate aria-busy={submitting}>
            <fieldset className="apply-fields" disabled={submitting}>
              <div className="form-row">
                <label>
                  {label('Full name')}
                  <input {...fieldProps('name')} required autoComplete="name" placeholder="Jane Doe" />
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
                  {label('Country')}
                  <select {...fieldProps('country')} required autoComplete="country">
                    <option value="" disabled>
                      Select your country
                    </option>
                    {countries.map(({ code, name, dial }) => (
                      <option value={code} key={code}>
                        {name} ({dial})
                      </option>
                    ))}
                  </select>
                  {errorText('country')}
                </label>
                <label>
                  {label('Phone number')}
                  <input
                    {...fieldProps('phone')}
                    required
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder={selectedCountry ? `${selectedCountry.dial} …` : '+1 415 555 0132'}
                  />
                  {errorText('phone')}
                </label>
              </div>
              <div className="form-row">
                <label>
                  {label('City')}
                  <input {...fieldProps('city')} required autoComplete="address-level2" placeholder="e.g. Lisbon" />
                  {errorText('city')}
                </label>
                <label>
                  {label('LinkedIn profile')}
                  <input
                    {...fieldProps('linkedin')}
                    required
                    type="url"
                    inputMode="url"
                    autoComplete="url"
                    placeholder="linkedin.com/in/your-name"
                  />
                  {errorText('linkedin')}
                </label>
              </div>
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
                {label('Why Yuice?', false)}
                <textarea
                  {...fieldProps('note')}
                  rows={4}
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
                {submitting ? (
                  <>
                    <span className="spinner" aria-hidden="true" /> Submitting…
                  </>
                ) : (
                  <>
                    Submit application <Icon name="arrow" size={16} />
                  </>
                )}
              </button>
            </fieldset>
          </form>
        </div>
      </dialog>

      <div className="toast-region" role="status" aria-live="polite">
        {notice && (
          <div className="toast">
            <span className="toast-icon" aria-hidden="true">
              <Icon name="check" size={16} />
            </span>
            <p>
              <b>Application submitted</b>
              {notice}
            </p>
            <button type="button" className="toast-close" aria-label="Dismiss notification" onClick={dismissNotice}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
