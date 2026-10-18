import { useState } from 'react';
import { Link } from 'react-router';
import { departments, roles, type Department } from '../../data/careersPage';
import { Icon } from '../ui/Icon';
import { SectionLabel } from '../ui/SectionLabel';
import { WaveLines } from './WaveLines';

type Filter = 'All' | Department;

const FILTERS: Filter[] = ['All', ...departments];

export function OpenRoles() {
  const [filter, setFilter] = useState<Filter>('All');

  const visible = filter === 'All' ? roles : roles.filter((role) => role.department === filter);

  return (
    <section className="open-positions dark-section" id="open-positions">
      <WaveLines className="positions-waves" />
      <div className="page-width positions-grid">
        <div className="careers-intro">
          <SectionLabel>Open positions</SectionLabel>
          <h2>Join our team</h2>
          <p>
            We’re looking for curious, driven, and collaborative people who want to build what’s next. Explore our
            current openings and find the role that fits your skills and goals.
          </p>
        </div>

        <div>
          <div className="role-filters" role="group" aria-label="Filter positions by team">
            {FILTERS.map((option) => (
              <button
                type="button"
                key={option}
                className={filter === option ? 'role-filter is-active' : 'role-filter'}
                aria-pressed={filter === option}
                onClick={() => setFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <ul className="role-list">
            {visible.map((role) => (
              <li className="role-row" key={role.id}>
                <Link className="role-summary" to={`/careers/${role.id}`}>
                  <span className="role-main">
                    <span className="role-title">{role.title}</span>
                    <small>{role.team ?? role.department}</small>
                  </span>
                  <span className="role-location">
                    <Icon name="pin" size={16} /> {role.location}
                  </span>
                  <span className="role-arrow">
                    <Icon name="arrow" size={16} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
