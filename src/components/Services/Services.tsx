'use client';

import { motion } from 'framer-motion';
import styles from './Services.module.css';

interface Service {
  index: string;
  title: string;
  description: string;
  capabilities: string[];
  colorClass: string;
}

const SERVICES: Service[] = [
  {
    index: '01',
    title: 'Intelligent Systems & Neural Engineering',
    description:
      'Designing and deploying deep learning pipelines, optimized computer vision networks (YOLO, object recognition), and sophisticated predictive analytics engines that extract signal from chaotic data streams.',
    capabilities: ['Computer Vision Pipelines', 'Deep Learning Architecture', 'Predictive Modeling', 'Dataset Wrangling & Processing'],
    colorClass: styles.orangeGlow,
  },
  {
    index: '02',
    title: 'Architectural & Full-Stack Synthesis',
    description:
      'Engineering high-concurrency backend services, performant REST APIs (FastAPI, Node.js), robust relational schemas, and beautifully orchestrated Next.js frontends with pixel-perfect responsive logic.',
    capabilities: ['Next.js / React Architecture', 'FastAPI & Node APIs', 'Database Optimization', 'Dockerized Infrastructures'],
    colorClass: styles.blueGlow,
  },
  {
    index: '03',
    title: 'Research-Driven Product Formulation',
    description:
      'Bridging scientific exploration and commercial scale. Translating abstract mathematical proofs and technical specifications into user-friendly, high-performance consumer technologies.',
    capabilities: ['Rapid Technical Prototyping', 'User-Flow Optimization', 'System Architecture Design', 'P2P & WebRTC Architectures'],
    colorClass: styles.greenGlow,
  },
  {
    index: '04',
    title: 'Scientific Documentation & Academic Synthesis',
    description:
      'Drafting technical documentation, scientific articles, co-authoring book chapters (ADAS, Autonomous Driving), and synthesizing complex algorithmic concepts into highly technical prose.',
    capabilities: ['Academic & Research Papers', 'ADAS Stack Research Chapters', 'Grant Proposals & Outlines', 'Deep-Tech Documentation'],
    colorClass: styles.orangeGlow,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function Services() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section className={styles.section} id="services">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.sectionLabel}>WHAT I DO</span>
          <h2 className={styles.sectionTitle}>Services</h2>
          <p className={styles.subtitle}>
            A synergy of deep-tech intelligence, robust engineering, and technical synthesis.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.index}
              className={`${styles.card} ${service.colorClass}`}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              onMouseMove={handleMouseMove}
            >

              {/* Title & Description */}
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>

              {/* Capabilities Bullets */}
              <div className={styles.capabilitiesWrapper}>
                <ul className={styles.capabilitiesList}>
                  {service.capabilities.map((cap, i) => (
                    <li key={i} className={styles.capabilityItem}>
                      <span className={styles.bulletSymbol}>&gt;</span> {cap}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
