import { challenges } from '../../data/homePage';
import { Icon } from '../ui/Icon';
import { SectionLabel } from '../ui/SectionLabel';

export function AboutSection() {
  return (
    <section className="about light-section" id="about">
      <div className="page-width about-grid">
        <div className="about-copy">
          <SectionLabel>The challenge</SectionLabel>
          <h2>Assets have value. Their financial systems remain fragmented.</h2>
          <p>
            Real-world assets generate income, support businesses, and power
            economies. Yet managing their financial activity often involves
            disconnected systems, manual processes, and limited visibility.
          </p>
        </div>
        <div className="challenge-list">
          {challenges.map(({ icon, title, body }) => (
            <article className="challenge" key={title}>
              <span className="icon-bubble">
                <Icon name={icon} size={30} />
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
