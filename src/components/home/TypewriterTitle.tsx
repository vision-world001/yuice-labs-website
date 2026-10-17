import { useEffect, useState } from 'react';

interface TypewriterTitleProps {
  /** First line, in the regular title colour. */
  lead: string;
  /** Second line, in the gradient accent. */
  accent: string;
}

const TYPE_MS = 65;
const DELETE_MS = 32;
const HOLD_MS = 2400;
const RESTART_MS = 600;

type Phase = 'typing' | 'holding' | 'deleting' | 'waiting';

/**
 * Types the title out character by character, holds it, erases it, and repeats.
 * The full text is always rendered invisibly underneath so the layout never shifts,
 * and assistive technology reads the complete title via aria-label.
 */
export function TypewriterTitle({ lead, accent }: TypewriterTitleProps) {
  const total = lead.length + accent.length;
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<Phase>('typing');
  const [reduceMotion, setReduceMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reduceMotion) return undefined;

    let delay = TYPE_MS;
    let next: () => void;
    if (phase === 'typing') {
      next = count < total ? () => setCount(count + 1) : () => setPhase('holding');
    } else if (phase === 'holding') {
      delay = HOLD_MS;
      next = () => setPhase('deleting');
    } else if (phase === 'deleting') {
      delay = DELETE_MS;
      next = count > 0 ? () => setCount(count - 1) : () => setPhase('waiting');
    } else {
      delay = RESTART_MS;
      next = () => setPhase('typing');
    }

    const timer = window.setTimeout(next, delay);
    return () => window.clearTimeout(timer);
  }, [count, phase, reduceMotion, total]);

  const shown = reduceMotion ? total : count;
  const leadShown = lead.slice(0, Math.min(shown, lead.length));
  const accentShown = accent.slice(0, Math.max(0, shown - lead.length));
  const caretOnAccent = shown > lead.length;
  const caret = !reduceMotion && <span className="type-caret" aria-hidden="true" />;

  return (
    <h1 className="typewriter-title" aria-label={`${lead} ${accent}`}>
      {/* Invisible full title reserves the final size. */}
      <span className="typewriter-ghost" aria-hidden="true">
        {lead}
        <br />
        <span className="title-accent">{accent}</span>
      </span>
      <span className="typewriter-live" aria-hidden="true">
        {leadShown}
        {!caretOnAccent && caret}
        <br />
        <span className="title-accent">{accentShown}</span>
        {caretOnAccent && caret}
      </span>
    </h1>
  );
}
