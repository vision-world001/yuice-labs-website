import { Fragment } from 'react';
import { trustPrinciples } from '../../data/homePage';
import { Icon } from '../ui/Icon';
import { SectionLabel } from '../ui/SectionLabel';
import { TrustShield } from './TrustShield';

export function TrustSection() {
  return (
    <section className="trust dark-section" id="trust">
      <div className="page-width trust-grid">
        <div className="trust-visual">
          <TrustShield />
        </div>
        <div className="trust-copy">
          <SectionLabel>Trust by design</SectionLabel>
          <h2>
            Programmable finance <span className="line-break">requires clear boundaries.</span>
          </h2>
          <p>
            Financial automation must be designed around accountability from
            the beginning.
          </p>
          <ul className="trust-points">
            {trustPrinciples.map(({ icon, lines }, index) => (
              <Fragment key={lines.join(' ')}>
                {index > 0 && (
                  <li className="trust-arrow" aria-hidden="true">
                    →
                  </li>
                )}
                <li className="trust-point">
                  <span className="trust-icon">
                    <Icon name={icon} size={24} />
                  </span>
                  <b>
                    {lines[0]}{' '}
                    <br />
                    {lines[1]}
                  </b>
                </li>
              </Fragment>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
