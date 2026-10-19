import { useEffect, useImperativeHandle, useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent, type Ref } from 'react';
import { roles } from '../../data/careersPage';
import { sendCompanyEmail, wait } from '../../lib/companyEmail';
import { Icon } from '../ui/Icon';
import {
  CV_ACCEPT,
  NOTE_MAX,
  formatLinkedin,
  formatPhone,
  validateCv,
  validateField,
  type FieldName,
  type FormValues,
} from './applicationValidation';

/** Text fields plus the CV upload, which is held as a File rather than a string. */
type ErrorKey = FieldName | 'cv';
type FormErrors = Partial<Record<ErrorKey, string>>;

const FIELD_ORDER: FieldName[] = ['name', 'email', 'phone', 'linkedin', 'role', 'note'];
/** Order in which problems are reported, so the first one on screen gets focus. */
const ERROR_ORDER: ErrorKey[] = ['name', 'email', 'phone', 'linkedin', 'cv', 'role', 'note'];
/** The loading state shows for at least this long, even when the email goes out faster. */
const SUBMIT_MIN_MS = 3000;
/** How long the thank-you notification stays on screen. */
const NOTICE_MS = 6000;

const EMPTY_VALUES: FormValues = { name: '', email: '', linkedin: '', phone: '', role: '', note: '' };

function formatFileSize(bytes: number) {
  return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

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
  const cvInputRef = useRef<HTMLInputElement>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [values, setStateValues] = useState<FormValues>(EMPTY_VALUES);
  // Latest values, so quick successive changes (autofill, the role pre-fill) never build on a stale copy.
  const latestValues = useRef(values);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const noticeTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(noticeTimer.current), []);

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
      return updated;
    });
  }

  function handleBlur(event: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const field = event.target.name as FieldName;
    const current = latestValues.current;
    let next = current;
    // Tidy valid entries into a standard form once the person leaves the field.
    if (field === 'phone') next = { ...current, phone: formatPhone(current.phone) };
    if (field === 'linkedin') next = { ...current, linkedin: formatLinkedin(current.linkedin) };
    if (next !== current) setValues(next);
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({ ...current, [field]: validateField(field, next) }));
  }

  /** Takes a chosen or dropped file and checks it straight away. */
  function chooseCv(file: File | null) {
    setCvFile(file);
    setErrors((current) => ({ ...current, cv: file ? validateCv(file) : undefined }));
  }

  function removeCv() {
    chooseCv(null);
    if (cvInputRef.current) cvInputRef.current.value = '';
    cvInputRef.current?.focus();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSendError(false);
    const nextErrors: FormErrors = {};
    for (const field of FIELD_ORDER) {
      const error = validateField(field, latestValues.current);
      if (error) nextErrors[field] = error;
    }
    const cvError = validateCv(cvFile);
    if (cvError) nextErrors.cv = cvError;
    setErrors(nextErrors);
    setTouched(Object.fromEntries(FIELD_ORDER.map((field) => [field, true])));

    const firstInvalid = ERROR_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const submitted = latestValues.current;
    const roleTitle = roles.find((role) => role.id === submitted.role)?.title;
    setSubmitting(true);
    try {
      await Promise.all([
        sendCompanyEmail('Job application', {
          from_name: submitted.name,
          from_email: submitted.email,
          phone: submitted.phone,
          linkedin: submitted.linkedin,
          role: roleTitle ?? 'General application',
          message: submitted.note,
        }),
        wait(SUBMIT_MIN_MS),
      ]);
    } catch (error) {
      console.error('Job application could not be sent', error);
      setSubmitting(false);
      setSendError(true);
      return;
    }

    // Clear the form, close it, then thank the applicant.
    setSubmitting(false);
    setValues(EMPTY_VALUES);
    setCvFile(null);
    if (cvInputRef.current) cvInputRef.current.value = '';
    setTouched({});
    setErrors({});
    dialogRef.current?.close();
    showNotice(
      roleTitle
        ? `Thanks for applying for ${roleTitle}! We’ll get back to you within five working days.`
        : 'Thanks for your application! We’ll get back to you within five working days.',
    );
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

  function errorText(field: ErrorKey) {
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
              {sendError && (
                <div className="form-error" role="alert">
                  We couldn’t send your application. Please try again in a moment, or email us at{' '}
                  <a href="mailto:hello@yuice-labs.com">hello@yuice-labs.com</a>.
                </div>
              )}
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
                  {label('Phone number')}
                  <input
                    {...fieldProps('phone')}
                    required
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+1 415 555 0132"
                  />
                  {errorText('phone')}
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
              <div className="cv-field">
                <span className="cv-label" id="apply-cv-label">
                  {label('Upload CV')}
                </span>
                {/* Visually hidden but focusable; the drop zone below is its label */}
                <input
                  ref={cvInputRef}
                  className="cv-input"
                  id="apply-cv"
                  name="cv"
                  type="file"
                  accept={CV_ACCEPT}
                  aria-labelledby="apply-cv-label"
                  aria-invalid={errors.cv ? true : undefined}
                  aria-describedby={errors.cv ? 'apply-cv-error' : 'apply-cv-hint'}
                  onChange={(event) => chooseCv(event.target.files?.[0] ?? null)}
                />
                {cvFile ? (
                  <div className={errors.cv ? 'cv-file is-invalid' : 'cv-file'}>
                    <span className="cv-file-icon" aria-hidden="true">
                      <Icon name="file" size={22} />
                    </span>
                    <span className="cv-file-text">
                      <b>{cvFile.name}</b>
                      <small>{formatFileSize(cvFile.size)}</small>
                    </span>
                    <label className="cv-replace" htmlFor="apply-cv">
                      Replace
                    </label>
                    <button type="button" className="cv-remove" aria-label={`Remove ${cvFile.name}`} onClick={removeCv}>
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                ) : (
                  <label
                    className={['cv-drop', dragging && 'is-dragging', errors.cv && 'is-invalid'].filter(Boolean).join(' ')}
                    htmlFor="apply-cv"
                    onDragOver={(event) => {
                      event.preventDefault();
                      setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(event) => {
                      event.preventDefault();
                      setDragging(false);
                      chooseCv(event.dataTransfer.files[0] ?? null);
                    }}
                  >
                    <span className="cv-drop-icon" aria-hidden="true">
                      <Icon name="file" size={22} />
                    </span>
                    <span>
                      <b>Click to upload</b> or drag and drop
                    </span>
                    <small id="apply-cv-hint">PDF, DOC, or DOCX · up to 5 MB</small>
                  </label>
                )}
                {errorText('cv')}
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
