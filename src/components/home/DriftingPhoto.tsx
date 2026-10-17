import { useEffect, useRef } from 'react';

interface DriftingPhotoProps {
  src: string;
  alt: string;
}

const MOVE_MS = 6000;

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

/** Photo that keeps slowly zooming toward a new random point (a randomized Ken Burns effect). */
export function DriftingPhoto({ src, alt }: DriftingPhotoProps) {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    function drift() {
      if (!image) return;
      image.style.transformOrigin = `${randomBetween(10, 90)}% ${randomBetween(10, 90)}%`;
      image.style.transform = `scale(${randomBetween(1.08, 1.28).toFixed(3)})`;
    }

    // Let the first frame paint at rest so the first move animates too.
    const start = window.setTimeout(drift, 50);
    const timer = window.setInterval(drift, MOVE_MS);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div className="drifting-photo">
      <img ref={imageRef} src={src} alt={alt} />
    </div>
  );
}
