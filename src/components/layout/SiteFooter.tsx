import { Brand } from '../ui/Brand';
import { Icon } from '../ui/Icon';

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Company', href: '#about' },
  { label: 'Technology', href: '#how-it-works' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Our Vision', href: '#approach' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin' as const },
  { label: 'X', href: 'https://x.com/', icon: 'x' as const },
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' as const },
];

export function SiteFooter() {
  return (
    <footer className="site-footer dark-section">
      <div className="page-width">
        <div className="footer-main">
          <div className="footer-brand">
            <Brand />
            <p>Programmable Finance for Real-World Assets.</p>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            {footerLinks.map(({ label, href }) => (
              <a href={href} key={href}>
                {label}
              </a>
            ))}
          </nav>
          <div className="socials">
            {socialLinks.map(({ label, href, icon }) => (
              <a href={href} aria-label={label} key={label}>
                <Icon name={icon} size={20} />
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copyright">© {new Date().getFullYear()} Yuice Labs. All rights reserved.</span>
          <div>
            <a href="#contact">Privacy Policy</a>
            <a href="#contact">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
