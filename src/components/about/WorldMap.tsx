import { useId, useMemo } from 'react';
import type { Office } from '../../data/aboutPage';

/** Map bounds in degrees (equirectangular), cropped to the inhabited world between the Americas and Australia. */
const LON_MIN = -135;
const LON_MAX = 158;
const LAT_MAX = 74;
const LAT_MIN = -46;
/** Viewbox units per degree, and degrees between dots. */
const SCALE = 4;
const STEP = 2.5;
const WIDTH = (LON_MAX - LON_MIN) * SCALE;
const HEIGHT = (LAT_MAX - LAT_MIN) * SCALE;

/** Coarse land outline: for each 5° latitude band, the longitude ranges that are land. */
const LAND: Record<number, Array<[number, number]>> = {
  80: [[-95, -65], [-60, -20], [15, 25], [50, 65], [95, 105]],
  75: [[-120, -75], [-70, -20], [15, 25], [55, 65], [85, 115], [135, 150]],
  70: [[-165, -140], [-130, -60], [-55, -22], [18, 30], [40, 180]],
  65: [[-165, -60], [-52, -38], [-24, -13], [12, 30], [30, 180]],
  60: [[-160, -95], [-78, -64], [-48, -43], [5, 30], [30, 165]],
  55: [[-130, -92], [-80, -58], [-10, -6], [-6, 0], [8, 140], [155, 162]],
  50: [[-128, -55], [-5, 1], [-4, 142]],
  45: [[-124, -65], [-1, 29], [41, 47], [54, 135], [141, 145]],
  40: [[-124, -74], [-9, 3], [8, 18], [20, 49], [54, 122], [125, 129], [139, 142]],
  35: [[-120, -77], [-6, 11], [33, 120], [126, 129], [130, 140]],
  30: [[-115, -112], [-110, -82], [-82, -80], [-10, 32], [35, 48], [50, 122]],
  25: [[-112, -110], [-110, -97], [-81, -80], [-15, 35], [37, 56], [57, 90], [90, 120], [120, 122]],
  20: [[-105, -87], [-84, -68], [-17, 37], [40, 58], [70, 87], [93, 110], [120, 123]],
  15: [[-92, -83], [-17, 40], [43, 52], [74, 80], [95, 109], [120, 125]],
  10: [[-85, -77], [-75, -62], [-15, 51], [76, 80], [98, 107], [122, 126]],
  5: [[-77, -52], [-8, 48], [100, 104], [115, 119], [124, 126]],
  0: [[-80, -50], [9, 42], [99, 104], [109, 118], [120, 125]],
  [-5]: [[-81, -35], [12, 39], [105, 114], [110, 116], [120, 123], [132, 150]],
  [-10]: [[-78, -37], [13, 40], [115, 125], [132, 137], [141, 150]],
  [-15]: [[-75, -39], [12, 40], [44, 50], [125, 145]],
  [-20]: [[-70, -40], [13, 35], [44, 48], [114, 149]],
  [-25]: [[-70, -47], [15, 33], [44, 47], [113, 153]],
  [-30]: [[-71, -51], [17, 31], [115, 153]],
  [-35]: [[-72, -57], [18, 23], [116, 119], [135, 150], [173, 175]],
  [-40]: [[-73, -62], [145, 148], [172, 177]],
  [-45]: [[-74, -65], [167, 171]],
  [-50]: [[-75, -68]],
  [-55]: [[-72, -66]],
};

function project(lat: number, lon: number) {
  return { x: (lon - LON_MIN) * SCALE, y: (LAT_MAX - lat) * SCALE };
}

function isLand(lat: number, lon: number) {
  const band = LAND[Math.round(lat / 5) * 5];
  return band?.some(([from, to]) => lon >= from && lon <= to) ?? false;
}

/** Repeatable 0–1 noise so dots vary in brightness without changing between renders. */
function noise(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

/** Degrees from an office within which land dots light up, like city glow seen from orbit. */
const GLOW_RADIUS = 22;

/** Land dots, brighter and slightly larger the closer they are to an office. */
function buildDots(offices: Office[]) {
  const dots: Array<{ x: number; y: number; r: string; opacity: string }> = [];
  for (let lat = LAT_MAX - STEP / 2; lat > LAT_MIN; lat -= STEP) {
    for (let lon = LON_MIN + STEP / 2; lon < LON_MAX; lon += STEP) {
      if (!isLand(lat, lon)) continue;
      const nearest = Math.min(...offices.map((office) => Math.hypot(office.lat - lat, office.lon - lon)));
      const glow = Math.max(0, 1 - nearest / GLOW_RADIUS);
      const { x, y } = project(lat, lon);
      dots.push({
        x,
        y,
        r: (2.6 + glow * 1.2).toFixed(2),
        opacity: Math.min(1, 0.3 + 0.35 * noise(x * 7 + y) + glow * 0.55).toFixed(2),
      });
    }
  }
  return dots;
}

/** A gentle arc between two offices, bowed upward like a flight path. */
function arcPath(from: Office, to: Office) {
  const a = project(from.lat, from.lon);
  const b = project(to.lat, to.lon);
  const lift = Math.hypot(b.x - a.x, b.y - a.y) * 0.3;
  return `M${a.x} ${a.y} Q${(a.x + b.x) / 2} ${Math.min(a.y, b.y) - lift} ${b.x} ${b.y}`;
}

interface WorldMapProps {
  offices: Office[];
  /** City to highlight, e.g. while its row in the office list is hovered. */
  activeCity?: string | null;
  onActiveCityChange?: (city: string | null) => void;
}

/**
 * Dotted world map: land glows around each office, flight arcs link the offices with light
 * travelling along them, and each office has a pulsing beacon with a label.
 */
export function WorldMap({ offices, activeCity = null, onActiveCityChange }: WorldMapProps) {
  const id = useId();
  const dots = useMemo(() => buildDots(offices), [offices]);
  // Chain the offices west to east so the arcs read as one route around the world.
  const route = useMemo(() => [...offices].sort((a, b) => a.lon - b.lon), [offices]);
  const arcs = route.slice(1).map((office, index) => ({ key: office.city, d: arcPath(route[index], office) }));

  return (
    <div className={activeCity ? 'world-map has-active' : 'world-map'}>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} aria-hidden="true">
        <defs>
          <radialGradient id={`${id}-halo`}>
            <stop offset="0" stopColor="#64e5bf" stopOpacity=".7" />
            <stop offset=".45" stopColor="#3fb8c9" stopOpacity=".25" />
            <stop offset="1" stopColor="#3fb8c9" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}-arc`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#a4ffe7" />
            <stop offset=".5" stopColor="#58e2dc" />
            <stop offset="1" stopColor="#72a7ff" />
          </linearGradient>
          <filter id={`${id}-blur`} x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
          <filter id={`${id}-spark`} x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Faint latitude / longitude grid every 30° */}
        <g className="world-map-graticule">
          {[60, 30, 0, -30].map((lat) => (
            <line x1="0" x2={WIDTH} y1={project(lat, 0).y} y2={project(lat, 0).y} key={`lat${lat}`} />
          ))}
          {[-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150].map((lon) => (
            <line y1="0" y2={HEIGHT} x1={project(0, lon).x} x2={project(0, lon).x} key={`lon${lon}`} />
          ))}
        </g>

        {offices.map((office) => {
          const { x, y } = project(office.lat, office.lon);
          return <circle cx={x} cy={y} r="90" fill={`url(#${id}-halo)`} className="world-map-halo" key={office.city} />;
        })}

        <g className="world-map-land">
          {dots.map(({ x, y, r, opacity }) => (
            <circle cx={x} cy={y} r={r} fillOpacity={opacity} key={`${x}-${y}`} />
          ))}
        </g>

        <g className="world-map-arcs" stroke={`url(#${id}-arc)`}>
          {arcs.map(({ key, d }) => (
            <g key={key}>
              <path d={d} className="world-map-arc-glow" filter={`url(#${id}-blur)`} />
              <path d={d} className="world-map-arc" id={`${id}-${key.replace(/\s/g, '')}`} />
            </g>
          ))}
        </g>

        {/* A spark of light travelling along each arc, staggered so they never move in lockstep */}
        <g className="world-map-sparks" filter={`url(#${id}-spark)`}>
          {arcs.map(({ key }, index) => (
            <circle r="4.5" key={key}>
              <animateMotion dur="3.6s" begin={`${index * 0.9}s`} repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines=".45 0 .55 1">
                <mpath href={`#${id}-${key.replace(/\s/g, '')}`} />
              </animateMotion>
            </circle>
          ))}
        </g>
      </svg>

      <ul className="world-map-pins" aria-label="Office locations on the map">
        {offices.map((office) => {
          const { x, y } = project(office.lat, office.lon);
          return (
            <li
              className={`world-map-pin is-${office.labelSide}${activeCity === office.city ? ' is-active' : ''}`}
              style={{ left: `${(x / WIDTH) * 100}%`, top: `${(y / HEIGHT) * 100}%` }}
              onMouseEnter={() => onActiveCityChange?.(office.city)}
              onMouseLeave={() => onActiveCityChange?.(null)}
              key={office.city}
            >
              <span className="world-map-beacon" aria-hidden="true" />
              <span className="world-map-label">
                <b>{office.city}</b>
                <small>{office.country}</small>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
