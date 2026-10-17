import { useState } from 'react';
import { Brand } from '../ui/Brand';
import { Icon } from '../ui/Icon';

const navigationLinks = [
  { label: 'About', href: '#about' },
  { label: 'What we’re building', href: '#approach' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Use Cases', href: '#use-cases' },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
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
          {navigationLinks.map(({ label, href }) => (
            <a
              href={href}
              key={href}
              onClick={closeMenu}
            >
              {label}
            </a>
          ))}
          <a className="nav-cta nav-cta-menu" href="#contact" onClick={closeMenu}>
            Talk to our team <Icon name="arrow" size={18} />
          </a>
        </nav>
        <a className="nav-cta" href="#contact">
          Talk to our team <Icon name="arrow" size={18} />
        </a>
      </div>
    </header>
  );
}
