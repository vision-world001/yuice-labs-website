import { useEffect } from 'react';
import { Link } from 'react-router';
import { WorldMap } from '../components/about/WorldMap';
import { WaveLines } from '../components/careers/WaveLines';
import { Icon } from '../components/ui/Icon';
import { SectionLabel } from '../components/ui/SectionLabel';
import { cultureValues, leaders, offices, teamTraits } from '../data/aboutPage';

/** "Alex Carter" → "AC", shown when a leader has no photo yet. */
function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('');
}

export function AboutPage() {
  useEffect(() => {
    document.title = 'About — Yuice Labs';
  }, []);

  return (
    <>
      <section className="about-hero dark-section">
        <img className="about-hero-photo" src="/job-culture.webp" alt="" />
        <div className="page-width about-hero-copy">
          <SectionLabel>Our team</SectionLabel>
          <h1>
            A global team building the financial infrastructure{' '}
            <span className="title-accent">for real-world assets.</span>
          </h1>
          <p>
            We’re builders, thinkers, and doers — united by a shared vision to make real-world assets more accessible,
            transparent, and financially programmable.
          </p>
        </div>
      </section>

      <section className="about-team light-section">
        <div className="page-width about-team-grid">
          <div className="careers-intro">
            <SectionLabel>The Yuice team</SectionLabel>
            <h2>
              Different backgrounds.
              <br />
              One mission.
            </h2>
            <p>
              We’re a diverse team of builders, operators, and problem-solvers with deep expertise in blockchain,
              finance, product, design, and operations. United by a shared mission to create real-world financial
              infrastructure that works for everyone.
            </p>
          </div>
          <ul className="trait-grid">
            {teamTraits.map(({ icon, title, body }) => (
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

      <section className="about-leaders dark-section">
        <div className="page-width leaders-head">
          <div>
            <SectionLabel>Leadership</SectionLabel>
            <h2>Meet our leadership team</h2>
          </div>
          <p>
            Our leadership team brings deep experience in blockchain, finance, product and technology, with a shared
            commitment to building sustainable, long-term value.
          </p>
        </div>
        <div className="page-width">
          <ul className="leader-grid">
            {leaders.map(({ name, role, bio, linkedin, photo }) => (
              <li className="leader-card" key={name}>
                <div className="leader-photo">
                  {photo ? (
                    <img src={photo} alt={name} loading="lazy" />
                  ) : (
                    <span aria-hidden="true">{initials(name)}</span>
                  )}
                </div>
                <div className="leader-body">
                  <h3>{name}</h3>
                  <p className="leader-role">{role}</p>
                  <p>{bio}</p>
                  <a className="leader-social" href={linkedin} target="_blank" rel="noreferrer">
                    <Icon name="linkedin" size={18} />
                    <span className="sr-only">{name} on LinkedIn</span>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-presence light-section">
        <div className="page-width presence-grid">
          <div className="careers-intro">
            <SectionLabel>Where we are</SectionLabel>
            <h2>
              A global presence.
              <br />
              A unified team.
            </h2>
            <p>
              Our team works from key hubs around the world, combining local expertise with global collaboration, to
              build the future of real-world asset finance.
            </p>
            <a className="button button-primary" href="#office-locations">
              Our Offices <Icon name="arrow" size={16} />
            </a>
          </div>
          <div className="presence-panel dark-section">
            <WorldMap offices={offices} />
            <ul className="office-list" id="office-locations">
              {offices.map(({ city, country }) => (
                <li key={city}>
                  <Icon name="pin" size={22} />
                  <span>
                    <b>{city}</b>
                    <small>{country}</small>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="about-culture light-section">
        <div className="page-width about-culture-grid">
          <div className="careers-intro">
            <SectionLabel>Our culture</SectionLabel>
            <h2>
              More than a place to work.
              <br />
              A place to build.
            </h2>
            <p>
              We value ownership, curiosity, and collaboration. Our culture is built on trust, open communication, and
              a shared commitment to solving meaningful problems — together.
            </p>
            <Link className="button button-primary" to="/careers">
              View Careers <Icon name="arrow" size={16} />
            </Link>
          </div>
          <ul className="culture-values">
            {cultureValues.map(({ icon, title, body }) => (
              <li key={title}>
                <span className="careers-icon">
                  <Icon name={icon} size={22} />
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ul>
          <img className="about-culture-photo" src="/process-buildings.webp" alt="" loading="lazy" />
        </div>
      </section>

      <section className="about-cta dark-section">
        <WaveLines className="about-cta-waves" count={30} />
        <div className="page-width about-cta-grid">
          <div className="careers-intro">
            <SectionLabel>Join us</SectionLabel>
            <h2>Help us build what’s next.</h2>
            <p>
              We’re always looking for talented people who are passionate about real-world assets, blockchain, and
              creating a more open and efficient financial future.
            </p>
          </div>
          <Link className="button button-primary" to="/careers#open-positions">
            Explore Open Positions <Icon name="arrow" size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
