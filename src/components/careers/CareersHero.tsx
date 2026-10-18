import { Icon } from '../ui/Icon';
import { SectionLabel } from '../ui/SectionLabel';

export function CareersHero() {
  return (
    <section className="careers-hero dark-section">
      <img className="careers-hero-photo" src="/careers-hero.webp" alt="" />
      <div className="page-width careers-hero-copy">
        <SectionLabel>Careers at Yuice Labs</SectionLabel>
        <h1>
          Build the future of <span className="title-accent">financial infrastructure.</span>
        </h1>
        <p>
          We’re a team of builders, thinkers, and doers, working at the intersection of real-world assets, stablecoin
          payments, and AI. If you’re passionate about making a real impact in global finance, we’d love to have you
          on our team.
        </p>
        <a className="button button-primary" href="#open-positions">
          View Open Positions <Icon name="arrow" size={16} />
        </a>
      </div>
    </section>
  );
}
