'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Journey.module.css';

/* ─── Data ─── */
interface ExperienceNode {
  title: string;
  role: string;
  date: string;
  description: string;
}

const experiences: ExperienceNode[] = [
  {
    title: 'The GameOn Co.',
    role: 'Founder',
    date: 'Dec 2025 - Present',
    description:
      'Founded a sports technology platform. Designed and built the full-stack platform architecture including backend APIs, competition management systems, and athlete performance tracking.',
  },
  {
    title: 'TechIdeate MUJ',
    role: 'Technical Operations',
    date: 'Dec 2025 - Feb 2026',
    description:
      'Managed technical operations, infrastructure, and event coordination.',
  },
  {
    title: 'IEEE AESS MUJ',
    role: 'Head of Content, Media & Editorial',
    date: 'Jul 2025 - Jan 2026',
    description:
      'Led content strategy, media production, photography, and editorial operations.',
  },
  {
    title: 'MUJHackX',
    role: 'Content and Social Media Team',
    date: 'Apr 2025 - Dec 2025',
    description:
      'Managed content creation and social media outreach campaigns for the MUJHackX event.',
  },
  {
    title: 'Siemens Energy',
    role: 'Research And Development Intern',
    date: 'Jun 2025 - Jul 2025',
    description:
      'Developed machine learning and computer vision solutions for engineering workflow automation. Built Python-based analytical pipelines.',
  },
  {
    title: 'Google Developer Groups - Manipal University Jaipur',
    role: 'Member',
    date: 'Oct 2024 - Apr 2025',
    description:
      'Active member participating in developer events, workshops, and technical community building.',
  },
  {
    title: 'Indian Institute of Technology Delhi',
    role: 'Intern',
    date: 'Oct 2023 - Dec 2023',
    description:
      'Assisted in technical and research-oriented activities involving analytical problem-solving and engineering workflows.',
  },
  {
    title: 'Manipal University Jaipur',
    role: 'B.Tech Computer Science (AI & ML)',
    date: '2024 - 2028',
    description:
      'Pursuing undergraduate degree with specialization in Artificial Intelligence and Machine Learning.',
  },
  {
    title: 'Certifications',
    role: 'Professional Training',
    date: '2024 - 2025',
    description:
      'Accenture Nordics Software Engineering Job Simulation (2025), Deloitte Australia Cyber Security Job Simulation (2025), Trifecta - MUJ ACM Student Chapter (2025), JPMorgan Chase & Co. Excel Skills Job Simulation (2024).',
  },
];

/* ─── Card animation variants (Framer Motion) ─── */
const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 20,
    },
  },
};

export default function Journey() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section className={styles.section} id="experience">
      <div className={styles.container}>
        {/* Section Title */}
        <div className={styles.header}>
          <span className={styles.sectionLabel}>EXPERIENCE &amp; EDUCATION</span>
          <h2 className={styles.sectionTitle}>Journey</h2>
        </div>

        {/* Timeline */}
        <div className={styles.timeline}>
          <div className={styles.verticalLine} />

          {/* Experience Cards */}
          {experiences.map((exp, index) => {
            const isLeft = isMobile ? false : index % 2 === 0;
            return (
              <div
                key={index}
                className={`${styles.nodeContainer} ${isLeft ? styles.nodeLeft : styles.nodeRight}`}
              >
                {/* Center dot */}
                <div className={styles.nodeDot} />

                {/* Card */}
                <motion.div
                  className={styles.card}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={cardVariants}
                >
                  <div className={styles.cardDate}>{exp.date}</div>
                  <h3 className={styles.cardTitle}>{exp.title}</h3>
                  <div className={styles.cardRole}>{exp.role}</div>
                  <p className={styles.cardDescription}>{exp.description}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
