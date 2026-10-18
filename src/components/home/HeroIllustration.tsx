import { useEffect, useRef, useState } from 'react';
import { Icon, type IconName } from '../ui/Icon';

const STEP_MS = 3200;

type Corner = 'tl' | 'tr' | 'bl' | 'br';

/*
 * Hub drawing space: 600 × 480. Asset images sit in the corners, the Yuice core in the middle (234–366 × 174–306).
 * Rails are right-angled, drawn in the same dotted style as the background grid, and enter the core at ports on its sides.
 * Inputs flow asset → core; the payments rail flows core → asset.
 */
const nodes: { label: string; value: string; image: string; corner: Corner; rail: string }[] = [
  { label: 'Real Estate', value: 'Tokenized ownership', image: '/hero-real-estate.webp', corner: 'tl', rail: 'M164 100 H190 Q198 100 198 108 V206 Q198 214 206 214 H234' },
  { label: 'Renewable Energy', value: 'Cash flows', image: '/hero-renewable-energy.webp', corner: 'tr', rail: 'M436 100 H410 Q402 100 402 108 V206 Q402 214 394 214 H366' },
  { label: 'Asset Data', value: 'AI operations', image: '/hero-asset-data.webp', corner: 'bl', rail: 'M164 380 H190 Q198 380 198 372 V274 Q198 266 206 266 H234' },
  { label: 'Stablecoin Payments', value: 'Instant payouts', image: '/hero-stablecoin.webp', corner: 'br', rail: 'M366 266 H394 Q402 266 402 274 V372 Q402 380 410 380 H436' },
];

// Bends and core ports, marked with small squares.
const joints = [
  [198, 100], [198, 214], [402, 100], [402, 214], [198, 380], [198, 266], [402, 266], [402, 380],
];

// One cycle of the protocol: each step lights the asset it acts on and posts an event to the feed.
// `chip` is the value that visibly travels along that asset's rail during the step.
const steps: { step: string; corner: Corner; icon: IconName; title: string; detail: string; value: string; chip: string }[] = [
  { step: 'Connect', corner: 'tl', icon: 'building', title: 'Asset records connected', detail: 'Harbor Point · 240,000 HPR units', value: 'Synced', chip: 'HPR token' },
  { step: 'Understand', corner: 'bl', icon: 'brain', title: 'Utility variance flagged', detail: 'AI reconciliation · Harbor Point', value: '+18%', chip: 'AI check ✓' },
  { step: 'Govern', corner: 'tr', icon: 'bolt', title: 'Revenue allocated by policy', detail: 'Solar Farm 03 · 15% to reserves', value: '$41,200', chip: '$41.2k' },
  { step: 'Execute', corner: 'br', icon: 'wallet', title: 'Distribution settled', detail: '1,284 holders · USDC', value: '$64,800', chip: '$64.8k USDC' },
];

const CHIP_MS = 2200;

/* A pill that rides the active rail once per step. SMIL motion keeps it on the path at any hub size;
   it is started by hand because an element mounted mid-page would otherwise inherit an already-finished timeline. */
function RailChip({ label, path }: { label: string; path: string }) {
  const motionRef = useRef<SVGAnimateMotionElement>(null);
  useEffect(() => {
    motionRef.current?.beginElement();
  }, []);
  const width = label.length * 6.4 + 22;
  return (
    <g className="hub-chip">
      <animateMotion ref={motionRef} path={path} dur={`${CHIP_MS}ms`} begin="indefinite" fill="freeze" calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines=".45 0 .25 1" />
      <rect x={-width / 2} y={-11} width={width} height={22} rx={11} />
      <text y={4}>{label}</text>
    </g>
  );
}

export function HeroIllustration() {
  const [stepIndex, setStepIndex] = useState(0);
  const [reduceMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const timer = window.setInterval(() => setStepIndex((i) => (i + 1) % steps.length), STEP_MS);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const current = steps[stepIndex];
  const currentRail = nodes.find((n) => n.corner === current.corner)?.rail ?? '';

  return (
    <div
      className="hero-art"
      role="img"
      aria-label="Yuice Protocol connects real estate ownership, renewable energy cash flows, and AI-driven asset data, then settles stablecoin payouts to holders"
    >
      <div className="hub" aria-hidden="true">
        <svg className="hub-lines" viewBox="0 0 600 480">
          {nodes.map(({ corner, rail }) => (
            <g className={`hub-rail${corner === current.corner ? ' is-active' : ''}`} key={corner}>
              <path className="hub-track" d={rail} />
              <path className="hub-packet" d={rail} pathLength={100} />
            </g>
          ))}
          <g className="hub-rail hub-rail-out">
            <path className="hub-track" d="M300 306 V480" />
            <path className="hub-packet" d="M300 306 V480" pathLength={100} />
          </g>
          {joints.map(([x, y]) => (
            <rect className="hub-joint" key={`${x}-${y}`} x={x - 3} y={y - 3} width="6" height="6" rx="1.5" />
          ))}
          {!reduceMotion && <RailChip key={stepIndex} label={current.chip} path={currentRail} />}
        </svg>

        <div className="hub-core">
          {/* One marker per step on the circle's edge, each pointing at the asset that step acts on */}
          {steps.map(({ step, corner }) => (
            <span className={`hub-core-dot hub-core-dot-${corner}${corner === current.corner ? ' is-active' : ''}`} key={step} />
          ))}
          <img src="/yuice-mark.png" alt="" width={768} height={768} />
        </div>

        {nodes.map(({ label, value, image, corner }) => (
          <div className={`hub-node hub-node-${corner}${corner === current.corner ? ' is-active' : ''}`} key={corner}>
            <img className="hub-node-image" src={image} alt="" width={480} height={480} />
            <span className="hub-node-text">
              <b>{label}</b>
              <small>{value}</small>
            </span>
          </div>
        ))}
      </div>

      <div className="hub-feed" aria-hidden="true">
        <p className="hub-feed-head">
          <span className="hub-live-dot" /> Live on Yuice Protocol
        </p>
        <ol className="hub-stepper">
          {steps.map(({ step }, i) => (
            <li className={i < stepIndex ? 'is-done' : i === stepIndex ? 'is-active' : undefined} key={step}>
              <span />
              {step}
            </li>
          ))}
        </ol>
        <div className="hub-event" key={stepIndex}>
          <span className="hub-event-icon">
            <Icon name={current.icon} size={18} />
          </span>
          <span className="hub-event-text">
            <b>{current.title}</b>
            <small>{current.detail}</small>
          </span>
          <strong>{current.value}</strong>
        </div>
      </div>
    </div>
  );
}
