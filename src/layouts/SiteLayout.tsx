import { useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigationType } from 'react-router';
import { SiteFooter } from '../components/layout/SiteFooter';
import { SiteHeader } from '../components/layout/SiteHeader';
import { ScrollEffects } from '../components/layout/ScrollEffects';

/** Scrolls to the element named in a URL hash (e.g. "#contact"); returns false when it isn't on the page. */
function scrollToHash(hash: string, behavior: ScrollBehavior) {
  const element = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
  element?.scrollIntoView({ behavior });
  return Boolean(element);
}

/**
 * Scroll handling for client-side navigation:
 * - a link with a hash scrolls to that section (smoothly when it is on the current page);
 * - a new page starts at the top;
 * - Back / Forward return to where the reader was on that page.
 */
function useRouteScroll() {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();
  const positions = useRef(new Map<string, number>());
  const previousPath = useRef<string | null>(null);

  // Remember the scroll position of the current history entry.
  useEffect(() => {
    const save = () => positions.current.set(key, window.scrollY);
    window.addEventListener('scroll', save, { passive: true });
    return () => window.removeEventListener('scroll', save);
  }, [key]);

  useEffect(() => {
    const firstLoad = previousPath.current === null;
    const samePage = previousPath.current === pathname;
    previousPath.current = pathname;

    if (navigationType === 'POP' && !firstLoad && positions.current.has(key)) {
      window.scrollTo({ top: positions.current.get(key), behavior: 'instant' });
      return undefined;
    }
    if (hash && scrollToHash(hash, samePage && !firstLoad ? 'smooth' : 'instant')) {
      // On a first load, images above the section can shift it once they arrive; jump again when they have.
      if (!firstLoad || document.readyState === 'complete') return undefined;
      const settle = () => scrollToHash(hash, 'instant');
      window.addEventListener('load', settle, { once: true });
      return () => window.removeEventListener('load', settle);
    }
    if (!samePage && !firstLoad) window.scrollTo({ top: 0, behavior: 'instant' });
    return undefined;
  }, [pathname, hash, key, navigationType]);
}

/** Shell shared by every route: header, page content, footer, and site-wide scroll effects. */
export function SiteLayout() {
  const { pathname } = useLocation();
  useRouteScroll();

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" className="min-h-screen">
        <Outlet />
      </main>
      <SiteFooter />
      {/* Re-mounted per page so reveal-on-scroll picks up the new page's sections */}
      <ScrollEffects key={pathname} />
    </>
  );
}
