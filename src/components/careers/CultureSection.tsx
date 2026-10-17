import { benefits, values } from '../../data/careersPage';
import { Icon } from '../ui/Icon';
import { SectionLabel } from '../ui/SectionLabel';

export function CultureSection() {
  return (
    <>
      <section className="careers-values light-section" id="life-at-yuice">
        <div className="page-width">
          <div className="careers-intro">
            <SectionLabel>Why Yuice</SectionLabel>
            <h2>Meaningful problems. A team that cares how they’re solved.</h2>
            <p>
              Real-world asset finance is full of manual work and disconnected systems. We’re fixing that with care,
              and we want people who enjoy both the craft and the impact.
            </p>
          </div>
          <div className="value-grid">
            {values.map(({ icon, title, body }) => (
              <article className="value-card" key={title}>
                <span className="icon-bubble">
                  <Icon name={icon} size={24} />
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="careers-benefits dark-section">
        <div className="page-width benefits-grid">
          <div className="careers-intro">
            <SectionLabel>Benefits</SectionLabel>
            <h2>Support to do your best work.</h2>
            <p>Thoughtful benefits for a distributed team, reviewed every year as we grow.</p>
          </div>
          <ul className="benefit-list">
            {benefits.map(({ icon, title, body }) => (
              <li className="benefit" key={title}>
                <span className="benefit-icon">
                  <Icon name={icon} size={22} />
                </span>
                <span>
                  <b>{title}</b>
                  <small>{body}</small>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
