import { Link } from 'react-router';
import { companyHighlights } from '../../data/careersPage';
import { Icon } from '../ui/Icon';
import { SectionLabel } from '../ui/SectionLabel';

export function CompanySection() {
  return (
    <section className="careers-company light-section">
      <div className="page-width careers-split">
        <div className="careers-intro">
          <SectionLabel>Our company</SectionLabel>
          <h2>We’re building the financial infrastructure for a tokenized world.</h2>
          <p>
            Yuice Labs is a technology company focused on RWA tokenization, stablecoin payments, and AI-powered asset
            operations. Our mission is to make real-world assets more accessible, transparent, and financially
            programmable.
          </p>
          <Link className="careers-link" to="/about">
            Learn more about Yuice Labs <Icon name="arrow" size={16} />
          </Link>
        </div>
        <ul className="highlight-grid">
          {companyHighlights.map(({ icon, title, body }) => (
            <li key={title}>
              <span className="careers-icon">
                <Icon name={icon} size={24} />
              </span>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
