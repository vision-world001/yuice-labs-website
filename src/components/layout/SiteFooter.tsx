import { Link } from 'react-router';
import { ABOUT_PAGE_ENABLED } from '../../lib/features';
import { Brand } from '../ui/Brand';
import { Icon } from '../ui/Icon';

const quickLinks = [
  { label: 'Home', to: '/' },
  // { label: 'About Us', to: '/about' },
  { label: 'How It Works', to: '/#how-it-works' },
  { label: 'Trust & Security', to: '/#trust' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact Us', to: '/#contact' },
];

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/entia-finance', icon: 'linkedin' as const },
  { label: 'GitHub', href: 'https://github.com/yuice-labs', icon: 'github' as const },
  { label: 'Telegram', href: 'https://t.me/yuice_official', icon: 'send' as const },
];

export function SiteFooter() {
  return (
    <footer className="site-footer dark-section">
      {/* Oversized wordmark spanning the footer behind the content */}
      <span className="footer-watermark" aria-hidden="true">
        YUICE
      </span>

      <div className="page-width footer-grid">
        <div className="footer-col footer-brand">
          <Brand />
          <h2 className="footer-heading">Quick Links</h2>
          <nav className="footer-links" aria-label="Footer">
            {quickLinks.map(({ label, to }) =>
              to === '/about' && !ABOUT_PAGE_ENABLED ? (
                <a href={to} key={to} onClick={(event) => event.preventDefault()}>
                  {label}
                </a>
              ) : (
                <Link to={to} key={to}>
                  {label}
                </Link>
              ),
            )}
          </nav>
        </div>

        <div className="footer-col">
          <h2 className="footer-heading">Connect</h2>
          <p className="footer-subheading">General &amp; Careers</p>
          <a className="footer-line" href="mailto:hello@yuicelabs.com">
            <Icon name="mail" size={18} />
            hello@yuicelabs.com
          </a>
        </div>

        <div className="footer-col">
          <h2 className="footer-heading">Our Office</h2>
          <address className="footer-office">
            <b>
              <Icon name="pin" size={18} />
              USA
            </b>
            <span>
              123 Innovation Drive
              <br />
              New York, NY 10001, USA
            </span>
          </address>
        </div>

        <div className="footer-col">
          <h2 className="footer-heading">Follow Us</h2>
          <p className="footer-text">
            Stay connected and follow us on social media for the latest updates, insights, and innovations.
          </p>
          <div className="socials">
            {socialLinks.map(({ label, href, icon }) => (
              <a href={href} aria-label={label} key={label} target="_blank" rel="noreferrer">
                <Icon name={icon} size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="page-width footer-bottom">
        <p>
          © {new Date().getFullYear()} Yuice Labs. All rights reserved.
          <span aria-hidden="true">|</span>
          <Link to="/#contact">Privacy Policy</Link>
          <span aria-hidden="true">|</span>
          <Link to="/#contact">Terms of Use</Link>
        </p>
      </div>
    </footer>
  );
}
