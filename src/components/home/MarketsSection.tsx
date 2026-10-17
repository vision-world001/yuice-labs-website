import { sectors } from '../../data/homePage';
import { SectionLabel } from '../ui/SectionLabel';

export function MarketsSection() {
  return (
    <section className="markets light-section" id="use-cases">
      <div className="page-width markets-grid">
        <div className="markets-intro">
          <SectionLabel>Where we start</SectionLabel>
          <h2>
            Real estate is the starting point.{' '}
            <span className="line-break">The opportunity is broader.</span>
          </h2>
          <p>
            We begin with commercial real estate, then expand to renewable
            energy, equipment financing, and receivables.
          </p>
        </div>
        <div className="sector-list">
          {sectors.map(({ title, body, image }) => (
            <article className="sector-card" key={title}>
              <img
                src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=720&h=480&q=80`}
                srcSet={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=480&h=320&q=80 480w, https://images.unsplash.com/${image}?auto=format&fit=crop&w=960&h=640&q=80 960w`}
                sizes="(max-width: 640px) 80vw, (max-width: 1180px) 40vw, 27vw"
                width={720}
                height={480}
                loading="lazy"
                alt=""
              />
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
