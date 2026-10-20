import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router';
import { ApplicationForm, type ApplicationFormHandle } from '../components/careers/ApplicationForm';
import { Icon, type IconName } from '../components/ui/Icon';
import { SectionLabel } from '../components/ui/SectionLabel';
import { findRole, jobCulture, type Role } from '../data/careersPage';

interface JobPageProps {
  role: Role;
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="job-checks">
      {items.map((item) => (
        <li key={item}>
          <span aria-hidden="true">
            <Icon name="check" size={13} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function JobPage({ role }: JobPageProps) {
  const formRef = useRef<ApplicationFormHandle>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = `${role.title} — Careers at Yuice Labs`;
  }, [role.title]);

  const pageUrl = typeof window === 'undefined' ? '' : window.location.href;
  const shareText = `${role.title} at Yuice Labs`;
  const shareLinks: Array<{ label: string; href: string; icon: IconName }> = [
    {
      label: 'Share on LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
      icon: 'linkedin',
    },
    { label: 'Yuice Labs on GitHub', href: 'https://github.com/yuice-labs', icon: 'github' },
    {
      label: 'Share on Telegram',
      href: `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`,
      icon: 'send',
    },
  ];

  const facts: Array<{ icon: IconName; label: string; value: string }> = [
    { icon: 'pin', label: 'Location', value: role.location },
    { icon: 'briefcase', label: 'Employment type', value: role.type },
    { icon: 'coins', label: 'Salary range', value: role.salary },
    { icon: 'badge', label: 'Experience level', value: role.experience },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copy this link:', pageUrl);
    }
  }

  return (
    <>
      <section className="job-hero dark-section">
        <img className="job-hero-art" src="/job-hero-art.webp" alt="" />
        <div className="page-width job-hero-copy">
          <Link className="job-back" to="/careers#open-positions">
            <span aria-hidden="true">←</span> Back to all openings
          </Link>
          <p className="job-tags">
            <span>{role.department}</span>
            <span>{role.location}</span>
            <span>{role.type}</span>
          </p>
          <h1>{role.title}</h1>
          <p className="job-intro">{role.intro}</p>
          <ul className="job-hero-facts">
            <li>
              <Icon name="pin" size={20} /> {role.location}
            </li>
            <li>
              <Icon name="briefcase" size={20} /> {role.type}
            </li>
            <li>
              <Icon name="coins" size={20} /> {role.salary}
            </li>
            <li>
              <Icon name="globe" size={20} /> {role.region}
            </li>
          </ul>
        </div>
      </section>

      <section className="job-body light-section">
        <div className="page-width job-grid">
          <article className="job-content">
            <h2>About the role</h2>
            <p>{role.about}</p>
            <h2>Key responsibilities</h2>
            <CheckList items={role.responsibilities} />
            <h2>Requirements</h2>
            <CheckList items={role.requirements} />
            <h2>Nice to have</h2>
            <CheckList items={role.niceToHave} />
          </article>

          <aside className="job-sidebar dark-section">
            <h2>Apply for this position</h2>
            <p>Tell us about yourself and share your resume. We’ll get back to you as soon as possible.</p>
            <button type="button" className="button button-primary job-apply" onClick={() => formRef.current?.open(role.id)}>
              Apply Now <Icon name="arrow" size={16} />
            </button>

            <h3>Job details</h3>
            <dl className="job-details">
              {facts.map(({ icon, label, value }) => (
                <div key={label}>
                  <Icon name={icon} size={24} />
                  <span>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </span>
                </div>
              ))}
            </dl>

            <h3>Share this job</h3>
            <div className="job-share">
              {shareLinks.map(({ label, href, icon }) => (
                <a href={href} aria-label={label} title={label} key={label} target="_blank" rel="noreferrer">
                  <Icon name={icon} size={18} />
                </a>
              ))}
              <button type="button" aria-label="Copy link" title="Copy link" onClick={copyLink}>
                <Icon name={copied ? 'check' : 'link'} size={18} />
              </button>
              <span className="job-share-status" role="status">
                {copied ? 'Link copied' : ''}
              </span>
            </div>

            <div className="job-fit">
              <h3>Not the right fit?</h3>
              <p>
                We’re always looking for great people. Feel free to send your CV or connect with us on LinkedIn.
              </p>
              <button type="button" className="button button-outline" onClick={() => formRef.current?.open('general')}>
                Send General Application <Icon name="arrow" size={16} />
              </button>
            </div>
          </aside>
        </div>

        <div className="page-width">
          <div className="job-culture dark-section">
            <img src="/job-culture.webp" alt="" loading="lazy" />
            <div className="job-culture-copy">
              <SectionLabel>Our culture</SectionLabel>
              <h2>Build, grow, and make an impact.</h2>
              <p>
                At Yuice Labs, you’ll work with a talented and passionate team on meaningful problems, with the freedom
                to do your best work.
              </p>
              <ul>
                {jobCulture.map(({ icon, title, body }) => (
                  <li key={title}>
                    <Icon name={icon} size={24} />
                    <b>{title}</b>
                    <small>{body}</small>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ApplicationForm ref={formRef} />
    </>
  );
}

/** Route element for /careers/:roleId; unknown or closed roles go back to the list of openings. */
export function JobRoute() {
  const { roleId = '' } = useParams();
  const role = findRole(roleId);
  if (!role) return <Navigate to="/careers#open-positions" replace />;
  // Keyed by role so moving between job pages starts with fresh state.
  return <JobPage role={role} key={role.id} />;
}
