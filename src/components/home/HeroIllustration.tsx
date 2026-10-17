import { useEffect, useRef } from 'react';

const MOVE_MS = 3200;

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function HeroIllustration() {
  const imageRef = useRef<HTMLImageElement>(null);

  // Gentle float: every few seconds glide to a new random offset and tilt.
  // The image is shrunk a little first and only moved within the room that frees up,
  // so it never crosses the column (and page margin) edges.
  useEffect(() => {
    const image = imageRef.current;
    if (!image || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    function float() {
      if (!image) return;
      const scale = randomBetween(0.96, 0.99);
      const tilt = randomBetween(-0.8, 0.8);
      // Room left around the shrunk, tilted image's bounding box.
      const w = image.offsetWidth * scale;
      const h = image.offsetHeight * scale;
      const angle = (Math.abs(tilt) * Math.PI) / 180;
      const boundW = w * Math.cos(angle) + h * Math.sin(angle);
      const boundH = w * Math.sin(angle) + h * Math.cos(angle);
      const roomX = Math.max(0, (image.offsetWidth - boundW) / 2 - 2);
      const roomY = Math.max(0, (image.offsetHeight - boundH) / 2 - 2);
      const x = randomBetween(-roomX, roomX);
      const y = randomBetween(-roomY, roomY);
      image.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${tilt.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
    }

    const start = window.setTimeout(float, 50);
    const timer = window.setInterval(float, MOVE_MS);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div className="hero-art">
      <img
        ref={imageRef}
        src="/hero-assets.png"
        width={1300}
        height={1010}
        alt="Real estate, renewable energy, asset data, and stablecoin payments connected through Yuice Protocol"
        fetchPriority="high"
      />
    </div>
  );
}
