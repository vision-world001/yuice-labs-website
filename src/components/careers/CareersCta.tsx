import { Icon } from '../ui/Icon';
import { SectionLabel } from '../ui/SectionLabel';
import { WaveLines } from './WaveLines';

interface CareersCtaProps {
  /** Opens the application form as a general application. */
  onGetInTouch: () => void;
}

export function CareersCta({ onGetInTouch }: CareersCtaProps) {
  return (
    <section className="careers-cta light-section">
      <WaveLines
        className="cta-waves"
        count={30}
        colors={['#3fcba6', '#46d3cf', '#6fa8ff']}
        shadow="rgba(18, 104, 92, .5)"
      />
      <div className="page-width careers-cta-grid">
        <div className="careers-intro">
          <SectionLabel>Ready to join?</SectionLabel>
          <h2>Help us build what’s next.</h2>
          <p>
            If you’re excited about real-world assets, financial infrastructure, and the power of technology, we’d love
            to hear from you.
          </p>
        </div>
        <div className="careers-cta-actions">
          <a className="button button-primary" href="#open-positions">
            View Open Positions <Icon name="arrow" size={16} />
          </a>
          <button type="button" className="button button-outline-dark" onClick={onGetInTouch}>
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
}
