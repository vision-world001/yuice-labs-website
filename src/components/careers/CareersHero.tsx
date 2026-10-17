import { roles, teamFacts } from '../../data/careersPage';
import { Icon } from '../ui/Icon';
import { SectionLabel } from '../ui/SectionLabel';

export function CareersHero() {
  return (
    <section className="careers-hero dark-section">
      <div className="page-width careers-hero-grid">
        <div className="careers-hero-copy">
          <SectionLabel>Careers at Yuice Labs</SectionLabel>
          <h1>
            Build the financial rails for <span className="title-accent">real-world assets.</span>
          </h1>
          <p>
            We’re a small, senior team connecting asset ownership, cash flows, and programmable payments. Join us
            early and help shape how real-world assets are operated and financed.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#open-roles">
              View open roles <Icon name="arrow" size={16} />
            </a>
            <a className="button button-outline" href="#life-at-yuice">
              Life at Yuice
            </a>
          </div>
        </div>

        <aside className="team-card" aria-label="Team at a glance">
          <div className="team-card-head">
            <span className="team-card-status" aria-hidden="true" />
            <span>Now hiring</span>
            <b>{roles.length} open roles</b>
          </div>
          <ul className="team-facts">
            {teamFacts.map(({ value, label }) => (
              <li key={value}>
                <b>{value}</b>
                <span>{label}</span>
              </li>
            ))}
          </ul>
          <ul className="team-roles">
            {roles.map(({ id, title, department }) => (
              <li key={id}>
                <a href={`#role-${id}`}>
                  <span>{title}</span>
                  <small>{department}</small>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
