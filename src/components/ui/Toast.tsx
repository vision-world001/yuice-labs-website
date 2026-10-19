import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from './Icon';

export interface ToastMessage {
  tone: 'success' | 'error';
  title: string;
  body: ReactNode;
}

/** Errors stay up longer than confirmations, since they may need acting on. */
const DURATION_MS: Record<ToastMessage['tone'], number> = { success: 6000, error: 9000 };

/** Holds the current toast and hides it automatically once its time is up. */
export function useToast() {
  const [toast, setToast] = useState<(ToastMessage & { id: number }) | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const showToast = useCallback((message: ToastMessage) => {
    window.clearTimeout(timer.current);
    // A fresh id restarts the entrance and countdown animations when one toast replaces another.
    setToast({ ...message, id: Date.now() });
    timer.current = window.setTimeout(() => setToast(null), DURATION_MS[message.tone]);
  }, []);

  const dismissToast = useCallback(() => {
    window.clearTimeout(timer.current);
    setToast(null);
  }, []);

  return { toast, showToast, dismissToast };
}

interface ToastRegionProps {
  toast: (ToastMessage & { id: number }) | null;
  onDismiss: () => void;
}

/**
 * Fixed notification area under the header; announces its toast to screen readers.
 * Rendered into <body> so a transformed or blurred ancestor (e.g. a form card) can't trap its fixed position.
 */
export function ToastRegion({ toast, onDismiss }: ToastRegionProps) {
  return createPortal(
    <div className="toast-region" role="status" aria-live="polite">
      {toast && (
        <div
          className={`toast toast-${toast.tone}`}
          style={{ '--toast-duration': `${DURATION_MS[toast.tone]}ms` } as CSSProperties}
          key={toast.id}
        >
          <span className="toast-icon" aria-hidden="true">
            {toast.tone === 'success' ? <Icon name="check" size={16} /> : <span>!</span>}
          </span>
          <p>
            <b>{toast.title}</b>
            {toast.body}
          </p>
          <button type="button" className="toast-close" aria-label="Dismiss notification" onClick={onDismiss}>
            <span aria-hidden="true">×</span>
          </button>
          <span className="toast-timer" aria-hidden="true" />
        </div>
      )}
    </div>,
    document.body,
  );
}
