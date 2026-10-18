import { useId } from 'react';

interface WaveLinesProps {
  className?: string;
  /** Number of strands in the main ribbon. */
  count?: number;
  /** Ribbon colours from left to right. */
  colors?: [string, string, string];
  /** Colour of the soft shadow / glow cast under the ribbon. */
  shadow?: string;
}

const WIDTH = 1200;
const HEIGHT = 400;
const SAMPLES = 64;

interface RibbonShape {
  /** Height of the main wave. */
  amplitude: number;
  /** Number of half-waves across the width. */
  waves: number;
  phase: number;
  /** Thickest and thinnest ribbon width; the ribbon pinches and swells between them. */
  maxSpread: number;
  minSpread: number;
  /** Vertical position of the ribbon's centre line, 0–1. */
  baseline: number;
}

const MAIN: RibbonShape = { amplitude: 85, waves: 2.2, phase: 0.4, maxSpread: 130, minSpread: 26, baseline: 0.52 };
const ECHO: RibbonShape = { amplitude: 60, waves: 1.7, phase: 2.2, maxSpread: 70, minSpread: 14, baseline: 0.42 };

/**
 * One strand of a silk ribbon: all strands share a slow wave, and their spacing swells and pinches
 * so the ribbon appears to twist; a small per-strand ripple keeps it from looking mechanical.
 */
function strandPath(t: number, shape: RibbonShape) {
  const points: string[] = [];
  for (let step = 0; step <= SAMPLES; step += 1) {
    const u = step / SAMPLES;
    const centre = HEIGHT * shape.baseline + shape.amplitude * Math.sin(u * Math.PI * shape.waves + shape.phase);
    const swell = (1 + Math.cos(u * Math.PI * 1.8 - 0.5 + shape.phase)) / 2;
    const spread = shape.minSpread + (shape.maxSpread - shape.minSpread) * swell;
    const ripple = 10 * Math.sin(u * Math.PI * 4.5 + t * 2.4 + shape.phase);
    const y = centre + (t - 0.5) * spread + ripple * (0.4 + t * 0.6);
    points.push(`${step === 0 ? 'M' : 'L'}${(u * WIDTH).toFixed(1)} ${y.toFixed(1)}`);
  }
  return points.join(' ');
}

/** Strand opacity: bright through the middle, fading at the edges, so the ribbon reads as rounded. */
function strandOpacity(t: number) {
  return (0.25 + 0.75 * Math.pow(Math.sin(Math.PI * t), 1.4)).toFixed(2);
}

function Ribbon({ shape, count }: { shape: RibbonShape; count: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => {
        const t = index / (count - 1);
        return <path d={strandPath(t, shape)} strokeOpacity={strandOpacity(t)} key={index} />;
      })}
    </>
  );
}

/** Decorative, slowly flexing silk ribbon with a soft cast shadow; scales to fill its box. */
export function WaveLines({
  className,
  count = 34,
  colors = ['#64e5bf', '#58e2dc', '#72a7ff'],
  shadow = 'rgba(100, 229, 191, .55)',
}: WaveLinesProps) {
  const id = useId();
  const gradientId = `${id}-stroke`;
  const shadowId = `${id}-shadow`;

  return (
    <svg
      className={className ? `wave-lines ${className}` : 'wave-lines'}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={colors[0]} />
          <stop offset=".55" stopColor={colors[1]} />
          <stop offset="1" stopColor={colors[2]} />
        </linearGradient>
        <filter id={shadowId} x="-10%" y="-40%" width="120%" height="180%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {/* Cast shadow: a blurred, offset copy of the main ribbon */}
      <g className="wave-lines-shadow wave-lines-main" stroke={shadow} strokeWidth="12" filter={`url(#${shadowId})`}>
        <Ribbon shape={MAIN} count={10} />
      </g>
      <g className="wave-lines-echo" stroke={`url(#${gradientId})`}>
        <Ribbon shape={ECHO} count={Math.round(count * 0.55)} />
      </g>
      <g className="wave-lines-main" stroke={`url(#${gradientId})`}>
        <Ribbon shape={MAIN} count={count} />
      </g>
    </svg>
  );
}
