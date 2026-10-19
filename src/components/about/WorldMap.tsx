import type { Office } from '../../data/aboutPage';
import { Icon } from '../ui/Icon';

/** Map bounds in degrees (equirectangular), cropped to where land is. */
const LON_MIN = -170;
const LON_MAX = 180;
const LAT_MAX = 80;
const LAT_MIN = -58;
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

const dots: Array<{ x: number; y: number; opacity: string }> = [];
for (let lat = LAT_MAX - STEP / 2; lat > LAT_MIN; lat -= STEP) {
  for (let lon = LON_MIN + STEP / 2; lon < LON_MAX; lon += STEP) {
    if (!isLand(lat, lon)) continue;
    const { x, y } = project(lat, lon);
    dots.push({ x, y, opacity: (0.3 + 0.55 * noise(x * 7 + y)).toFixed(2) });
  }
}

/** A gentle arc between two offices, bowed upward like a flight path. */
function arcPath(from: Office, to: Office) {
  const a = project(from.lat, from.lon);
  const b = project(to.lat, to.lon);
  const lift = Math.hypot(b.x - a.x, b.y - a.y) * 0.25;
  return `M${a.x} ${a.y} Q${(a.x + b.x) / 2} ${Math.min(a.y, b.y) - lift} ${b.x} ${b.y}`;
}

interface WorldMapProps {
  offices: Office[];
}

/** Dotted world map with a glowing pin and label for each office, linked by arcs. */
export function WorldMap({ offices }: WorldMapProps) {
  // Chain the offices west to east so the arcs read as one route around the world.
  const route = [...offices].sort((a, b) => a.lon - b.lon);

  return (
    <div className="world-map">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} aria-hidden="true">
        <g className="world-map-land">
          {dots.map(({ x, y, opacity }) => (
            <circle cx={x} cy={y} r="3" fillOpacity={opacity} key={`${x}-${y}`} />
          ))}
        </g>
        <g className="world-map-arcs">
          {route.slice(1).map((office, index) => (
            <path d={arcPath(route[index], office)} key={office.city} />
          ))}
        </g>
      </svg>
      <ul className="world-map-pins" aria-label="Office locations on the map">
        {offices.map((office) => {
          const { x, y } = project(office.lat, office.lon);
          return (
            <li
              className={`world-map-pin is-${office.labelSide}`}
              style={{ left: `${(x / WIDTH) * 100}%`, top: `${(y / HEIGHT) * 100}%` }}
              key={office.city}
            >
              <span className="world-map-marker" aria-hidden="true">
                <Icon name="pin" size={22} />
              </span>
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
