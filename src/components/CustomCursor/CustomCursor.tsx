'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { damping: 25, stiffness: 400 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 400 });

  const [isHoveringText, setIsHoveringText] = useState(false);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Only show custom cursor on desktop with a pointer device
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Magnetic pull for buttons
      const target = e.target as HTMLElement;
      const magneticEl = target.closest('[data-magnetic]') as HTMLElement | null;

      if (magneticEl) {
        const rect = magneticEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const dist = Math.sqrt(distX * distX + distY * distY);

        if (dist < 100) {
          const pull = (100 - dist) / 100;
          magneticEl.style.transform = `translate(${distX * pull * 0.3}px, ${distY * pull * 0.3}px)`;
        } else {
          magneticEl.style.transform = '';
        }
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('h1, h2, h3, h4, p, span, a') &&
        !target.closest('button, [data-magnetic]')
      ) {
        setIsHoveringText(true);
      }
      if (target.closest('button, a, [data-magnetic]')) {
        setIsHoveringButton(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('h1, h2, h3, h4, p, span, a')) {
        setIsHoveringText(false);
      }
      if (target.closest('button, a, [data-magnetic]')) {
        setIsHoveringButton(false);
        // Reset magnetic transform
        const magneticEl = target.closest('[data-magnetic]') as HTMLElement | null;
        if (magneticEl) {
          magneticEl.style.transform = '';
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  const size = isHoveringText ? 60 : isHoveringButton ? 50 : 10;

  return (
    <motion.div
      className={`${styles.cursor} ${isHoveringText ? styles.cursorText : ''}`}
      style={{
        x: springX,
        y: springY,
      }}
      animate={{
        width: size,
        height: size,
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    />
  );
}
