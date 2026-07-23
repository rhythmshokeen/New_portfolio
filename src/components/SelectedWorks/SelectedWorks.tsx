'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import styles from './SelectedWorks.module.css';

interface WorkCard {
  category: string;
  title: string;
  description: string;
  imageSrc?: string;
}

const WORKS: WorkCard[] = [
  {
    category: 'QUANTITATIVE ENGINEERING',
    title: 'Ricci Flow Arbitrage Detector',
    description:
      'Built a real-time C++20/CUDA engine treating Implied Volatility surfaces as 3D Riemannian manifolds. Optimized Conjugate Gradient solver on GPU to identify market inefficiencies with sub-10ms inference latency.',
    imageSrc: '/projects/fake_news.png',
  },
  {
    category: 'CLOUD NATIVE & MLOPS',
    title: 'Auto-Agnostic Mesh',
    description:
      'Developed an autonomous orchestration agent using GNNs and PPO to dynamically rewrite Envoy proxy routes in Kubernetes. Built a Go-based eBPF sidecar for kernel-level TCP telemetry.',
    imageSrc: '/projects/cargo_optimization.png',
  },
  {
    category: 'COMPUTER VISION',
    title: 'P&ID Component Detection System',
    description:
      'Developed a computer vision pipeline using YOLO-based object detection for identifying engineering components in P&ID diagrams across PDF and DWG formats, streamlining industrial automation.',
    imageSrc: '/projects/pid_detection.png',
  },
  {
    category: 'RESEARCH & PUBLICATIONS',
    title: 'AI-Driven Process Mining & ADAS',
    description:
      'Contributing to Indo-Swiss Research Initiative. Submitted book chapters on ADAS Features and AI-Driven Process Mining for Sustainable Supply Chain Management.',
    imageSrc: '/projects/indo_swiss.png',
  },
];

/* ───────── 3D Tilt Card ───────── */
interface TiltCardProps {
  work: WorkCard;
  index: number;
  isMobile: boolean;
}

function TiltCard({ work, index, isMobile }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  /* Motion values for mouse position (0-1 range within card) */
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  /* Map mouse position to rotation: ±8 degrees */
  const rawRotateX = useTransform(mouseY, [0, 1], [8, -8]);
  const rawRotateY = useTransform(mouseX, [0, 1], [-8, 8]);

  /* Spring for smooth animation */
  const rotateX = useSpring(rawRotateX, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(rawRotateY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${relativeX}px`);
    card.style.setProperty('--mouse-y', `${relativeY}px`);

    if (isMobile) return;
    const x = relativeX / rect.width;
    const y = relativeY / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: 12 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      className={styles.card}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      style={
        isMobile
          ? undefined
          : {
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >

      {work.imageSrc && (
        <div className={styles.imageContainer}>
          <Image src={work.imageSrc} alt={work.title} fill className={styles.projectImage} />
          <div className={styles.imageOverlay} />
        </div>
      )}

      {/* Content */}
      <div className={styles.cardContent} style={{ transform: isMobile ? 'none' : 'translateZ(30px)' }}>
        <p className={styles.category}>{work.category}</p>
        <h3 className={styles.title}>{work.title}</h3>
        <p className={styles.description}>{work.description}</p>
      </div>
    </motion.div>
  );
}

/* ───────── Main Section ───────── */
export default function SelectedWorks() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className={styles.section} id="selected-works">
      {/* Grid background styling */}
      <div className={styles.ambientLight} aria-hidden="true" />

      {/* Section Header */}
      <div className={styles.header}>
        <span className={styles.sectionLabel}>PROJECTS</span>
        <h2 className={styles.sectionTitle}>Selected Works</h2>
        <p className={styles.subtitle}>
          Deep-tech projects ranging from AI research initiatives to custom WebRTC and vision components.
        </p>
      </div>

      {/* Vertical Staggered Grid */}
      <div className={styles.grid}>
        {WORKS.map((work, i) => (
          <TiltCard key={work.title} work={work} index={i} isMobile={isMobile} />
        ))}
      </div>
    </section>
  );
}
