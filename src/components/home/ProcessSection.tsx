import { processSteps } from '../../data/homePage';
import { SectionLabel } from '../ui/SectionLabel';
import { DriftingPhoto } from './DriftingPhoto';

export function ProcessSection() {
  return (
    <section className="process light-section" id="how-it-works">
      <div className="page-width">
        <div className="process-intro">
          <DriftingPhoto
            src="/process-buildings.webp"
            alt="Modern glass office towers against a blue sky"
          />
          <div>
            <SectionLabel>How it works</SectionLabel>
            <h2>From asset data to financial action.</h2>
            <p>
              Our proposed operating model connects asset information,
              financial activity, and programmable payments through a
              structured, transparent workflow.
            </p>
          </div>
        </div>
        <div className="step-grid">
          {processSteps.map(({ number, title, body }, index) => (
            <article className="step" key={number}>
              <span className="step-number">{number}</span>
              {index < processSteps.length - 1 && (
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
