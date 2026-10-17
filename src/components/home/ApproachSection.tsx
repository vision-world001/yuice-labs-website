import { approachPillars } from '../../data/homePage';
import { AssetDashboard } from './AssetDashboard';
import { Icon } from '../ui/Icon';
import { SectionLabel } from '../ui/SectionLabel';

export function ApproachSection() {
  return (
    <section className="approach dark-section" id="approach">
      <div className="page-width approach-grid">
        <div className="approach-copy">
          <SectionLabel>What we’re building</SectionLabel>
          <h2>
            Beyond tokenization.
            <br />
            Into real-world utility.
          </h2>
          <p>
            Tokenization is only the beginning. Yuice Protocol is being
            designed to make tokenized assets easier to operate, finance, and
            manage throughout their lifecycle.
          </p>
        </div>
        <div className="approach-visual">
          <AssetDashboard />
        </div>
        <div className="pillar-grid">
          {approachPillars.map(({ icon, title, body }) => (
            <article className="pillar-card" key={title}>
              <span className="icon-bubble">
                <Icon name={icon} size={23} />
              </span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
