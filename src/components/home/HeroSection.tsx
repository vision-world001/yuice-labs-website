import { HeroIllustration } from './HeroIllustration';
import { Icon } from '../ui/Icon';
import { SectionLabel } from '../ui/SectionLabel';

export function HeroSection() {
  return (
    <section className="hero dark-section" id="home">
      <div className="page-width hero-grid">
        <div className="hero-copy">
          <SectionLabel>Introducing Yuice Protocol</SectionLabel>
          <h1>
            Real-world assets.
            <br />
            <span>Programmable finance.</span>
          </h1>
          <p>
            Financial infrastructure for tokenized real-world assets—bringing
            ownership, cash flows, intelligent operations, and stablecoin
            payments into one connected system.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#how-it-works">
              See how it works <Icon name="arrow" size={16} />
            </a>
            <a className="button button-outline" href="#contact">
              Talk to our team
            </a>
          </div>
        </div>
        <HeroIllustration />
      </div>
    </section>
  );
}
