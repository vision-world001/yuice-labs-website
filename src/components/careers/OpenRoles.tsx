import { useState } from 'react';
import { roles, type Department } from '../../data/careersPage';
import { Icon } from '../ui/Icon';
import { SectionLabel } from '../ui/SectionLabel';

type Filter = 'All' | Department;

const FILTERS: Filter[] = ['All', 'Engineering', 'Design', 'Business'];

interface OpenRolesProps {
  /** Called with the role id when someone chooses to apply. */
  onApply: (roleId: string) => void;
}

export function OpenRoles({ onApply }: OpenRolesProps) {
  const [filter, setFilter] = useState<Filter>('All');
  const [openId, setOpenId] = useState<string | null>(roles[0]?.id ?? null);

  const visible = filter === 'All' ? roles : roles.filter((role) => role.department === filter);

  return (
    <section className="open-roles light-section" id="open-roles">
      <div className="page-width">
        <div className="roles-head">
          <div className="careers-intro">
            <SectionLabel>Open roles</SectionLabel>
            <h2>Find your place on the team.</h2>
          </div>
          <div className="role-filters" role="group" aria-label="Filter roles by department">
            {FILTERS.map((option) => {
              const count = option === 'All' ? roles.length : roles.filter((r) => r.department === option).length;
              return (
                <button
                  type="button"
                  key={option}
                  className={filter === option ? 'role-filter is-active' : 'role-filter'}
                  aria-pressed={filter === option}
                  onClick={() => setFilter(option)}
                >
                  {option} <span>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <ul className="role-list">
          {visible.map((role) => {
            const isOpen = openId === role.id;
            const panelId = `role-panel-${role.id}`;
            return (
              <li className={isOpen ? 'role-card is-open' : 'role-card'} id={`role-${role.id}`} key={role.id}>
                <button
                  type="button"
                  className="role-summary"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenId(isOpen ? null : role.id)}
                >
                  <span className="role-main">
                    <span className="role-dept">{role.department}</span>
                    <span className="role-title">{role.title}</span>
                    <span className="role-meta">
                      {role.location} · {role.type}
                    </span>
                  </span>
                  <span className="role-toggle" aria-hidden="true" />
                </button>
                <div className="role-panel" id={panelId} hidden={!isOpen}>
                  <p className="role-text">{role.summary}</p>
                  <div className="role-columns">
                    <div>
                      <h3>What you’ll do</h3>
                      <ul>
                        {role.responsibilities.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3>What you’ll bring</h3>
                      <ul>
                        {role.requirements.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="role-foot">
                    <ul className="role-tags" aria-label="Skills">
                      {role.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    <button type="button" className="button button-primary" onClick={() => onApply(role.id)}>
                      Apply for this role <Icon name="arrow" size={16} />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="roles-note">
          Don’t see the right role? We still want to hear from you.{' '}
          <button type="button" className="text-link" onClick={() => onApply('general')}>
            Send a general application
          </button>
        </p>
      </div>
    </section>
  );
}
