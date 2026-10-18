import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { Brand } from '../ui/Brand';
import { Icon } from '../ui/Icon';

/** Scroll distance (px) after which the header gets its blurred background. */
const SCROLLED_AFTER = 8;

const navigationLinks = [
  { label: 'Challenges', href: '/#challenges' },
  { label: 'What we’re building', href: '/#approach' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Operation', href: '/#ai-operations' },
  { label: 'Trust', href: '/#trust' },
  { label: 'Careers', href: '/careers' },
  { label: 'About', href: '/about' },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => typeof window !== 'undefined' && window.scrollY > SCROLLED_AFTER);

  // Transparent over the top of the page; frosted once the page scrolls under it.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > SCROLLED_AFTER);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className={scrolled || menuOpen ? 'site-header is-scrolled' : 'site-header'}>
      <div className="page-width nav-wrap">
        <Brand />
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          id="primary-navigation"
          className={menuOpen ? 'main-nav is-open' : 'main-nav'}
          aria-label="Main navigation"
        >
          {navigationLinks.map(({ label, href }) =>
            // Page links get the active underline; links to home-page sections are plain.
            href.includes('#') ? (
              <Link to={href} key={href} onClick={closeMenu}>
                {label}
              </Link>
            ) : (
              <NavLink to={href} key={href} onClick={closeMenu}>
                {label}
              </NavLink>
            ),
          )}
          <Link className="nav-cta nav-cta-menu" to="/#contact" onClick={closeMenu}>
            Talk to our team <Icon name="arrow" size={18} />
          </Link>
        </nav>
        <Link className="nav-cta" to="/#contact">
          Talk to our team <Icon name="arrow" size={18} />
        </Link>
      </div>
    </header>
  );
}
