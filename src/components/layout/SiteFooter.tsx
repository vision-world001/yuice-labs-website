import { Link } from 'react-router';
import { Brand } from '../ui/Brand';
import { Icon } from '../ui/Icon';

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin' as const },
  { label: 'GitHub', href: 'https://github.com/', icon: 'github' as const },
  { label: 'Telegram', href: 'https://t.me/', icon: 'send' as const },
];

export function SiteFooter() {
  return (
    <footer className="site-footer dark-section">
      <span className="footer-watermark" aria-hidden="true">
        yuice
      </span>
      <div className="page-width footer-grid">
        <div className="footer-brand">
          <Brand />
          <p>Programmable Finance for Real-World Assets.</p>
        </div>

        <address className="footer-contact">
          <span>
            <Icon name="pin" size={18} />
            <span>
              123 Innovation Drive
              <br />
              New York, NY 10001, USA
            </span>
          </span>
          <a href="mailto:hello@yuicelabs.com">
            <Icon name="mail" size={18} />
            hello@yuicelabs.com
          </a>
        </address>

        <div className="socials">
          {socialLinks.map(({ label, href, icon }) => (
            <a href={href} aria-label={label} key={label} target="_blank" rel="noreferrer">
              <Icon name={icon} size={22} />
            </a>
          ))}
        </div>

        <div className="footer-legal">
          <nav aria-label="Legal">
            <Link to="/#contact">Privacy Policy</Link>
            <Link to="/#contact">Terms of Use</Link>
          </nav>
          <small>© {new Date().getFullYear()} Yuice Labs. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}
