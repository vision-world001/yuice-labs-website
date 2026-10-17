import { useEffect, useRef, useState } from 'react';
import { Icon } from '../ui/Icon';

/** Show the back-to-top button after scrolling this fraction of the viewport height. */
const SHOW_AFTER_VIEWPORTS = 0.1;
const RING_RADIUS = 22;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

/** Content blocks that fade up into view; the first (hero) section is left alone so it shows instantly. */
const REVEAL_SELECTOR = 'main > section:not(:first-child) > .page-width > *, main > section:not(:first-child) :is(.value-grid, .feature-grid, .pillar-grid, .step-grid, .sector-list, .challenge-list, .benefit-list, .role-list) > *';

/**
 * Site-wide scroll polish: a reading-progress bar, a back-to-top button with a progress ring,
 * and reveal-on-scroll animations. Everything is skipped for users who prefer reduced motion.
 */
export function ScrollEffects() {
  const barRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const [showTop, setShowTop] = useState(false);

  // Progress bar, progress ring, and button visibility, updated once per animation frame.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      if (ringRef.current) ringRef.current.style.strokeDashoffset = String(RING_LENGTH * (1 - progress));
      setShowTop(window.scrollY > window.innerHeight * SHOW_AFTER_VIEWPORTS);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Reveal-on-scroll: tag blocks, then mark each visible once it enters the viewport.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      return undefined;
    }
    const targets = [...document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          element.classList.add('is-revealed');
          observer.unobserve(element);
          // Once settled, drop the helper classes so the element's own hover transforms work again.
          element.addEventListener(
            'transitionend',
            () => {
              element.classList.remove('reveal', 'is-revealed');
              element.style.removeProperty('--reveal-delay');
            },
            { once: true },
          );
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    targets.forEach((element) => {
      // Stagger siblings so groups of cards cascade in.
      const index = element.parentElement ? [...element.parentElement.children].indexOf(element) : 0;
      element.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 80}ms`);
      element.classList.add('reveal');
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
      targets.forEach((element) => element.classList.remove('reveal', 'is-revealed'));
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <div ref={barRef} />
      </div>
      <button
        type="button"
        className={showTop ? 'back-to-top is-visible' : 'back-to-top'}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg className="back-to-top-ring" viewBox="0 0 52 52" aria-hidden="true">
          <circle cx="26" cy="26" r={RING_RADIUS} />
          <circle ref={ringRef} cx="26" cy="26" r={RING_RADIUS} strokeDasharray={RING_LENGTH} strokeDashoffset={RING_LENGTH} />
        </svg>
        <span className="back-to-top-icon">
          <Icon name="arrow" size={20} />
        </span>
      </button>
    </>
  );
}
