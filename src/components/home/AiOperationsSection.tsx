import { operationalCapabilities } from '../../data/homePage';
import { CashFlowDashboard } from './CashFlowDashboard';
import { Icon } from '../ui/Icon';
import { SectionLabel } from '../ui/SectionLabel';

export function AiOperationsSection() {
  return (
    <section className="ai-operations dark-section" id="ai-operations">
      <div className="page-width ai-grid">
        <div className="ai-copy">
          <SectionLabel>AI-powered asset operations</SectionLabel>
          <h2>Intelligence that connects insight to action.</h2>
          <p>
            We envision AI systems that help asset operators understand
            financial activity and coordinate routine work with greater
            precision.
          </p>
          <ul className="check-list">
            {operationalCapabilities.map((capability) => (
              <li key={capability}>
                <span>
                  <Icon name="check" size={14} />
                </span>
                {capability}
              </li>
            ))}
          </ul>
        </div>
        <CashFlowDashboard />
      </div>
    </section>
  );
}
