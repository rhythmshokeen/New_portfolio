'use client';

import { motion } from 'framer-motion';
import styles from './Footer.module.css';

const footerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const bottomVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: 'easeOut' as const,
      delay: 0.6,
    },
  },
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <motion.div
        className={styles.contentBlock}
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* ── Massive Gradient Heading ── */}
        <motion.div className={styles.headingWrapper} variants={itemVariants}>
          <h2 className={styles.heading}>Initialize Contact</h2>
        </motion.div>

        {/* ── Email Pill ── */}
        <motion.a
          href="mailto:imrhythmshokeen@gmail.com"
          className={styles.emailPill}
          data-magnetic
          variants={itemVariants}
        >
          imrhythmshokeen@gmail.com
        </motion.a>

        {/* ── Social Links ── */}
        <motion.div className={styles.socialLinks} variants={itemVariants}>
          <a
            href="https://github.com/imrhythm"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/imrhythm"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            LinkedIn
          </a>
        </motion.div>
      </motion.div>

      {/* ── Bottom Bar ── */}
      <motion.div
        className={styles.bottomBar}
        variants={bottomVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <div className={styles.separator} />
        <p className={styles.copyright}>© 2025 Rhythm Shokeen</p>
      </motion.div>
    </footer>
  );
}
