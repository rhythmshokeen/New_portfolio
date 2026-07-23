'use client';

import { useEffect, useRef } from 'react';
import styles from './FilmGrain.module.css';

export default function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let lastTime = 0;
    const FPS = 12; // Low FPS for film-like grain
    const interval = 1000 / FPS;

    const resize = () => {
      canvas.width = window.innerWidth / 2; // Half-res for perf
      canvas.height = window.innerHeight / 2;
    };
    resize();
    window.addEventListener('resize', resize);

    const renderGrain = (time: number) => {
      animId = requestAnimationFrame(renderGrain);
      if (time - lastTime < interval) return;
      lastTime = time;

      const w = canvas.width;
      const h = canvas.height;
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 12; // Very low alpha
      }

      ctx.putImageData(imageData, 0, 0);
    };

    animId = requestAnimationFrame(renderGrain);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.grain}
      aria-hidden="true"
    />
  );
}
