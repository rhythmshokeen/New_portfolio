'use client';

import { useRef, useCallback } from 'react';

const CHARS = '01ABCDEF0123456789abcdef!@#$%^&*';

export function useScrambleText() {
  const frameRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = useCallback(
    (
      element: HTMLElement,
      finalText: string,
      progress: number // 0 → 1
    ) => {
      const len = finalText.length;
      const revealedCount = Math.floor(progress * len);

      let result = '';
      for (let i = 0; i < len; i++) {
        if (i < revealedCount) {
          result += finalText[i];
        } else if (finalText[i] === ' ') {
          result += ' ';
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      element.textContent = result;
    },
    []
  );

  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    }
  }, []);

  return { scramble, cleanup };
}
