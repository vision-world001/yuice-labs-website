const upcoming = [
  { label: 'Rental Income', value: '$182,400' },
  { label: 'Operating Expenses', value: '$86,200' },
  { label: 'Distributions', value: '$64,800' },
];

const keyFigures = [
  { label: 'Occupancy', value: '94.2%', change: '+1.8 pts' },
  { label: 'Rent Collected', value: '98.6%', change: '+0.9 pts' },
  { label: 'NOI Margin', value: '61.4%', change: '+2.3 pts' },
];

const insights = [
  { tone: 'alert', title: 'Utility expenses 18% above forecast', meta: 'Review' },
  { tone: 'forecast', title: 'Q3 cash surplus projected at $412,000', meta: 'Forecast' },
  { tone: 'done', title: '248 transactions reconciled this week', meta: 'Done' },
];

const chartLine =
  'M0 104 C18 96 26 88 40 92 S62 72 78 76 104 62 120 68 146 50 162 58 186 64 200 48 226 30 242 40 266 50 282 34 306 18 322 24 346 12 360 10';

export function CashFlowDashboard() {
  return (
    <div className="cashflow-card" aria-label="Cash flow overview dashboard illustration">
      <div className="cash-figures">
        {keyFigures.map(({ label, value, change }) => (
          <div className="cash-panel cash-figure" key={label}>
            <span>{label}</span>
            <b>{value}</b>
            <small>{change}</small>
          </div>
        ))}
      </div>
      <div className="cash-panel cash-overview">
        <span className="cash-label">Cash Flow Overview</span>
        <p className="cash-total">
          $1,280,000 <em>+ 8.2%</em>
        </p>
        <small>+ 6.4% YoY</small>
        <svg
          className="cash-chart"
          viewBox="0 0 360 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="cashArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#4de4bb" stopOpacity=".32" />
              <stop offset="1" stopColor="#4de4bb" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${chartLine} V120 H0 Z`} fill="url(#cashArea)" />
          <path
            d={chartLine}
            fill="none"
            stroke="#59e8c3"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      <div className="cash-panel cash-upcoming">
        <p>Next 30 Days</p>
        {upcoming.map(({ label, value }) => (
          <span key={label}>
            {label} <b>{value}</b>
          </span>
        ))}
      </div>
      <div className="cash-panel action-card">
        <span className="action-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="3.5" />
            <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
          </svg>
        </span>
        <div className="action-body">
          <b>Action Required</b>
          <p>Maintenance invoice requires approval</p>
          <small>$42,000 · Riverside Office Building</small>
          <div className="action-buttons">
            <button type="button" tabIndex={-1}>Review</button>
            <button type="button" tabIndex={-1}>View Details</button>
          </div>
        </div>
      </div>
      <div className="cash-panel cash-insights">
        <p>
          AI Insights <span>Updated 2 min ago</span>
        </p>
        <ul>
          {insights.map(({ tone, title, meta }) => (
            <li key={title}>
              <i className={`insight-dot insight-${tone}`} aria-hidden="true" />
              <b>{title}</b>
              <small>{meta}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
