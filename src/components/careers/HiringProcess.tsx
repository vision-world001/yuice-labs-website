import { hiringSteps } from '../../data/careersPage';
import { SectionLabel } from '../ui/SectionLabel';

export function HiringProcess() {
  return (
    <section className="careers-process light-section">
      <div className="page-width">
        <div className="careers-intro">
          <SectionLabel>Hiring process</SectionLabel>
          <h2>Clear, respectful, and quick.</h2>
          <p>Most processes take two to three weeks from application to offer. We’ll keep you updated at every step.</p>
        </div>
        <div className="step-grid">
          {hiringSteps.map(({ number, title, body }, index) => (
            <article className="step" key={number}>
              <span className="step-number">{number}</span>
              {index < hiringSteps.length - 1 && (
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
  );
}
