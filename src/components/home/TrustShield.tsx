import { useEffect, useRef } from 'react';

/*
 * Drawing space: 560 × 340 for both layers. Behind: a 3D neural brain on a canvas, turning around its vertical axis.
 * In front: the shield as SVG, centred at (280, 170).
 *
 * The brain is a point cloud in brain units (front–back length 1): two hemispheres split by a fissure, with gyri
 * ripples on their surface, plus the cerebellum and brain stem. Neurons are wired to their nearest neighbours,
 * and signals walk that wiring from neuron to neuron.
 */
const VIEW_W = 560;
const VIEW_H = 340;
const BRAIN_X = 280;
const BRAIN_Y = 174;
const SCALE = 330;
const CAMERA = 2.6;
const TILT = 0.32;
const SPIN = 0.32; // radians per second, about 20 s per turn
const WALKERS = 20;

type Vec = [number, number, number];

function seeded(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildBrain() {
  const rand = seeded(5);
  const points: Vec[] = [];
  const direction = (): Vec => {
    const u = rand() * 2 - 1;
    const theta = rand() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    return [s * Math.cos(theta), u, s * Math.sin(theta)];
  };

  // Hemispheres: shell points on two ellipsoids with gyri ripples, flattened underneath, kept apart at the fissure.
  while (points.length < 330) {
    const [dx, dy, dz] = direction();
    const side = dx >= 0 ? 1 : -1;
    const ripple = 1 + 0.06 * Math.sin(dz * 14 + dy * 6) * Math.sin(dy * 11 - dz * 5 + 1.3);
    const x = side * 0.19 + dx * 0.25 * ripple;
    let y = dy * 0.33 * ripple + 0.04;
    const z = dz * 0.5 * ripple;
    if (side * x < 0.025) continue;
    if (y < -0.16) y = -0.16 + (y + 0.16) * 0.35;
    points.push([x, y, z]);
  }
  // A sparser layer inside the hemispheres gives the cloud depth.
  while (points.length < 390) {
    const [dx, dy, dz] = direction();
    const depth = 0.35 + rand() * 0.45;
    const side = dx >= 0 ? 1 : -1;
    points.push([side * 0.19 + dx * 0.25 * depth, dy * 0.3 * depth, dz * 0.48 * depth]);
  }
  // Cerebellum tucked under the back, then the brain stem running down from it.
  while (points.length < 445) {
    const [dx, dy, dz] = direction();
    if (dz > 0.4) continue;
    points.push([dx * 0.27, -0.22 + dy * 0.1, -0.32 + dz * 0.15]);
  }
  for (let i = 0; i < 12; i += 1) {
    const t = i / 11;
    points.push([(rand() - 0.5) * 0.06, -0.24 - t * 0.22, -0.12 - t * 0.05 + (rand() - 0.5) * 0.05]);
  }

  // Each neuron links to its three nearest neighbours.
  const neighbours = points.map(() => new Set<number>());
  const links: { a: number; b: number; lit: boolean }[] = [];
  points.forEach((p, i) => {
    points
      .map((q, j) => ({ j, d: Math.hypot(q[0] - p[0], q[1] - p[1], q[2] - p[2]) }))
      .filter(({ j, d }) => j !== i && d < 0.16)
      .sort((m, n) => m.d - n.d)
      .slice(0, 3)
      .forEach(({ j }) => {
        if (neighbours[i].has(j)) return;
        neighbours[i].add(j);
        neighbours[j].add(i);
        links.push({ a: i, b: j, lit: rand() < 0.15 });
      });
  });

  const phases = points.map(() => rand() * Math.PI * 2);
  return { points, links, neighbours: neighbours.map((set) => [...set]), phases };
}

const brain = buildBrain();

type Walker = { from: number; to: number; t: number; speed: number };

function newWalker(rand: () => number): Walker {
  let from = Math.floor(rand() * brain.points.length);
  while (brain.neighbours[from].length === 0) from = Math.floor(rand() * brain.points.length);
  const options = brain.neighbours[from];
  return { from, to: options[Math.floor(rand() * options.length)], t: rand(), speed: 1.4 + rand() * 1.2 };
}

function BrainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return undefined;
    const ctx = context;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rand = Math.random;
    const walkers = Array.from({ length: WALKERS }, () => newWalker(rand));
    const projected = brain.points.map(() => ({ x: 0, y: 0, depth: 0 }));

    let angle = 0.7;
    let last = performance.now();
    let frame = 0;
    let visible = false;

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      ctx.setTransform(canvas.width / VIEW_W, 0, 0, canvas.height / VIEW_H, 0, 0);
    }

    function draw(now: number) {
      // Rotate around the vertical axis, tilt toward the viewer, then project with perspective.
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const cosT = Math.cos(TILT);
      const sinT = Math.sin(TILT);
      brain.points.forEach(([x, y, z], i) => {
        const rx = x * cosA - z * sinA;
        const rz = x * sinA + z * cosA;
        const ty = y * cosT - rz * sinT;
        const tz = y * sinT + rz * cosT;
        const f = CAMERA / (CAMERA - tz);
        const p = projected[i];
        p.x = BRAIN_X + rx * f * SCALE;
        p.y = BRAIN_Y - ty * f * SCALE;
        p.depth = Math.min(1, Math.max(0, (tz + 0.55) / 1.1));
      });

      ctx.clearRect(0, 0, VIEW_W, VIEW_H);
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineWidth = 0.8;
      for (const { a, b, lit } of brain.links) {
        const pa = projected[a];
        const pb = projected[b];
        const depth = (pa.depth + pb.depth) / 2;
        ctx.strokeStyle = lit ? `rgba(100, 229, 191, ${0.1 + depth * 0.4})` : `rgba(150, 188, 212, ${0.05 + depth * 0.22})`;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }

      // Neurons: nearer ones are larger and brighter; each fires on its own slow beat.
      const time = now / 1000;
      brain.points.forEach((_, i) => {
        const p = projected[i];
        const fire = Math.max(0, Math.sin(time * 1.3 + brain.phases[i]) - 0.9) * 10;
        ctx.fillStyle = `rgba(${Math.round(120 + fire * 44)}, 240, 208, ${0.2 + p.depth * 0.6 + fire * 0.2})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 0.7 + p.depth * 1.5 + fire * 1.2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Signals: a bright head with a short trail, hopping along the wiring.
      for (const w of walkers) {
        const pa = projected[w.from];
        const pb = projected[w.to];
        const head = Math.min(1, w.t);
        const tail = Math.max(0, w.t - 0.35);
        const hx = pa.x + (pb.x - pa.x) * head;
        const hy = pa.y + (pb.y - pa.y) * head;
        const alpha = 0.4 + ((pa.depth + pb.depth) / 2) * 0.6;
        ctx.strokeStyle = `rgba(164, 255, 231, ${alpha * 0.7})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(pa.x + (pb.x - pa.x) * tail, pa.y + (pb.y - pa.y) * tail);
        ctx.lineTo(hx, hy);
        ctx.stroke();
        ctx.fillStyle = `rgba(100, 229, 191, ${alpha * 0.25})`;
        ctx.beginPath();
        ctx.arc(hx, hy, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(234, 255, 248, ${alpha})`;
        ctx.beginPath();
        ctx.arc(hx, hy, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    }

    function step(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      angle += dt * SPIN;
      for (const w of walkers) {
        w.t += dt * w.speed;
        if (w.t >= 1) {
          const options = brain.neighbours[w.to].filter((n) => n !== w.from);
          if (options.length === 0) {
            Object.assign(w, newWalker(rand), { t: 0 });
          } else {
            w.from = w.to;
            w.to = options[Math.floor(rand() * options.length)];
            w.t = 0;
          }
        }
      }
      draw(now);
      if (visible) frame = requestAnimationFrame(step);
    }

    resize();
    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion || !visible) draw(performance.now());
    });
    resizeObserver.observe(canvas);

    if (reduceMotion) {
      draw(performance.now());
      return () => resizeObserver.disconnect();
    }

    // Only animate while the section is on screen.
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) {
        last = performance.now();
        frame = requestAnimationFrame(step);
      }
    });
    visibility.observe(canvas);
    draw(performance.now());

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibility.disconnect();
    };
  }, []);

  return <canvas className="trust-brain-canvas" ref={canvasRef} />;
}

const shield = 'M280 96 L338 117 V166 C338 206 313 233 280 248 C247 233 222 206 222 166 V117 Z';

export function TrustShield() {
  return (
    <div className="trust-art" aria-hidden="true">
      <div className="trust-brain">
        <BrainCanvas />
        <svg className="trust-shield" viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}>
          <defs>
            <linearGradient id="trustStroke" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#a4ffe7" />
              <stop offset=".55" stopColor="#58e2dc" />
              <stop offset="1" stopColor="#72a7ff" />
            </linearGradient>
            <linearGradient id="trustFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#64e5bf" stopOpacity=".38" />
              <stop offset="1" stopColor="#0a2f3a" stopOpacity=".92" />
            </linearGradient>
            <linearGradient id="trustScan" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#a4ffe7" stopOpacity="0" />
              <stop offset="1" stopColor="#a4ffe7" stopOpacity=".45" />
            </linearGradient>
            <clipPath id="trustClip">
              <path d={shield} />
            </clipPath>
          </defs>

          <path className="trust-shield-back" d={shield} transform="translate(0 6)" />
          <path className="trust-shield-body" d={shield} fill="url(#trustFill)" />
          <g clipPath="url(#trustClip)">
            <rect className="trust-scan" x="222" y="60" width="116" height="36" fill="url(#trustScan)" />
            <path d="M280 96 V248" stroke="#a4ffe7" strokeOpacity=".12" />
          </g>
          <path className="trust-shield-edge" d={shield} fill="none" stroke="url(#trustStroke)" strokeWidth="2.5" strokeLinejoin="round" />
          <path
            d="M280 110 L326 127 V166 C326 199 306 222 280 235 C254 222 234 199 234 166 V127 Z"
            fill="none"
            stroke="#a4ffe7"
            strokeOpacity=".22"
          />
          <path
            className="trust-check"
            d="M260 170 L274 184 L302 154"
            fill="none"
            stroke="#e9fff8"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
