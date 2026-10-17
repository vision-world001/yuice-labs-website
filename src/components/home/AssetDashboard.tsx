import { Icon } from '../ui/Icon';

const cashFlowBars = [34, 53, 42, 70, 51, 78, 60, 87, 64, 96, 74, 100];

export function AssetDashboard() {
  return (
    <div className="dashboard" aria-label="Asset performance dashboard illustration">
      <div className="dash-main">
        <div className="dash-copy">
          <span className="dash-label">Asset Performance</span>
          <span className="dash-name">Riverside Office Building</span>
          <strong>$2,480,000</strong>
          <span className="dash-up">↗ 8.4% Yoy</span>
        </div>
        <div className="building-photo">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=720&q=85"
            alt="Modern glass office building"
          />
        </div>
        <svg
          className="chart-line"
          viewBox="0 0 320 96"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#4de4bb" stopOpacity=".34" />
              <stop offset="1" stopColor="#4de4bb" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 78 C16 70 20 74 35 59S57 67 74 52s29 7 43-8 24 3 40-12 22 8 40-2 30 10 42-7 26-3 38-14 26 6 43-5v92H0Z"
            fill="url(#area)"
          />
          <path
            d="M0 78 C16 70 20 74 35 59S57 67 74 52s29 7 43-8 24 3 40-12 22 8 40-2 30 10 42-7 26-3 38-14 26 6 43-5"
            fill="none"
            stroke="#58e6c2"
            strokeWidth="2.5"
          />
        </svg>
      </div>
      <div className="dash-bottom">
        <div className="mini-metric">
          <span>Monthly Cash Flow</span>
          <b>$182,400</b>
          <div className="bars">
            {cashFlowBars.map((height, index) => (
              <i key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>
        <div className="mini-metric expense">
          <span>Upcoming Expenses</span>
          <b>$86,200</b>
          <small>
            Maintenance <strong>$42,000</strong>
          </small>
          <small>
            Property Tax <strong>$31,800</strong>
          </small>
          <small>
            Insurance <strong>$12,400</strong>
          </small>
        </div>
      </div>
      <div className="approval">
        <span className="approval-icon">
          <Icon name="check" size={17} />
        </span>
        <span>
          <b>Payment approved</b>
          <small>Maintenance vendor · $42,000</small>
        </span>
        <span className="approval-check">
          <Icon name="check" size={16} />
        </span>
      </div>
    </div>
  );
}
