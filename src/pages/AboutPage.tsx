import { useEffect } from 'react';
import { aboutFacts, keyFeatures, missionVision, roadmap } from '../data/aboutPage';
import { Icon } from '../components/ui/Icon';
import { SectionLabel } from '../components/ui/SectionLabel';
import { SiteLayout } from '../layouts/SiteLayout';

export function AboutPage() {
  useEffect(() => {
    document.title = 'About — Yuice Labs';
  }, []);

  return (
    <SiteLayout>
      <section className="about-hero dark-section">
        <div className="page-width">
          <SectionLabel>About Yuice Labs</SectionLabel>
          <h1>
            We make real-world assets <span className="title-accent">programmable.</span>
          </h1>
          <p>Financial infrastructure that connects ownership, cash flows, and payments.</p>
          <ul className="about-facts">
            {aboutFacts.map(({ value, label }) => (
              <li key={value}>
                <b>{value}</b>
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-mission light-section">
        <div className="page-width mission-grid">
          {missionVision.map(({ label, title }) => (
            <article className="mission-card" key={label}>
              <SectionLabel>{label}</SectionLabel>
              <h2>{title}</h2>
            </article>
          ))}
        </div>
      </section>

      <section className="about-features dark-section">
        <div className="page-width">
          <SectionLabel>What we do</SectionLabel>
          <h2>Four things, done well.</h2>
          <ul className="feature-grid">
            {keyFeatures.map(({ icon, title, body }) => (
              <li className="feature-card" key={title}>
                <span className="benefit-icon">
                  <Icon name={icon} size={24} />
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-roadmap light-section">
        <div className="page-width">
          <SectionLabel>Where we’re going</SectionLabel>
          <h2>Start focused. Grow broad.</h2>
          <div className="step-grid roadmap-grid">
            {roadmap.map(({ number, title, body }, index) => (
              <article className="step" key={number}>
                <span className="step-number">{number}</span>
                {index < roadmap.length - 1 && (
                  <span className="step-arrow" aria-hidden="true">
                    →
                  </span>
                )}
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta dark-section">
        <div className="page-width cta-band">
          <h2>Let’s build it together.</h2>
          <div className="hero-actions">
            <a className="button button-primary" href="/#contact">
              Get in touch <Icon name="arrow" size={16} />
            </a>
            <a className="button button-outline" href="/careers">
              Join the team
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
