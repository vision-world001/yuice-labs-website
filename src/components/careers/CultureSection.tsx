import { culturePhotos, perks } from '../../data/careersPage';
import { Icon } from '../ui/Icon';
import { SectionLabel } from '../ui/SectionLabel';

export function CultureSection() {
  return (
    <>
      <section className="careers-perks light-section" id="why-yuice">
        <div className="page-width careers-split">
          <div className="careers-intro">
            <SectionLabel>Why Yuice Labs</SectionLabel>
            <h2>
              More than a job. <span className="accent-dark">It’s a journey.</span>
            </h2>
            <p>
              We offer competitive compensation, flexible work arrangements, and a culture built on trust, ownership,
              and continuous learning. Whether you’re an engineer, designer, or operator, your work will directly
              contribute to building the next generation of financial infrastructure.
            </p>
          </div>
          <ul className="perk-grid">
            {perks.map(({ icon, title, body }) => (
              <li key={title}>
                <span className="careers-icon">
                  <Icon name={icon} size={22} />
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="careers-culture dark-section">
        <div className="page-width culture-grid">
          <div className="careers-intro">
            <SectionLabel>Our culture</SectionLabel>
            <h2>
              Different backgrounds.
              <br />
              One mission.
            </h2>
            <p>
              We’re a global, remote-first team with diverse backgrounds and a shared belief: real-world assets can do
              more with modern technology.
            </p>
            <a className="careers-link" href="#why-yuice">
              See what it’s like to work at Yuice Labs <Icon name="arrow" size={16} />
            </a>
          </div>
          <ul className="culture-photos">
            {culturePhotos.map(({ image, title, body }) => (
              <li key={title}>
                <img src={image} alt="" loading="lazy" />
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
