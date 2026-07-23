'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './AboutMe.module.css';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
};

export default function AboutMe() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };
  return (
    <section className={styles.section} id="about-me">
      <div className={styles.container}>
        {/* Left Column: Cybernetic HUD / Profile Frame */}
        <div className={styles.visualCol}>
          <div className={styles.hudFrame} onMouseMove={handleMouseMove}>
            {/* Corner registration marks */}
            <span className={`${styles.corner} ${styles.tl}`} />
            <span className={`${styles.corner} ${styles.tr}`} />
            <span className={`${styles.corner} ${styles.bl}`} />
            <span className={`${styles.corner} ${styles.br}`} />

            {/* Profile Picture */}
            <div className={styles.imageWrapper}>
              <Image 
                src="/award-photo.jpg"
                alt="Receiving Award for Excellence in Academics"
                fill
                className={styles.profileImage}
                sizes="(max-width: 768px) 320px, 400px"
              />
              <div className={styles.imageOverlay} />
            </div>

          </div>
        </div>

        {/* Right Column: Profile & Copy */}
        <motion.div
          className={styles.contentCol}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span className={styles.sectionLabel} variants={itemVariants}>
            ABOUT ME
          </motion.span>

          <motion.h2 className={styles.title} variants={itemVariants}>
            Computer Science Student &amp; <span className={styles.gradientText}>AI Researcher</span>
          </motion.h2>

          <motion.p className={styles.description} variants={itemVariants}>
            Computer Science student specializing in Artificial Intelligence and Machine Learning with experience in research-driven engineering, machine learning systems, backend development, and process optimization.
          </motion.p>

          <motion.p className={styles.description} variants={itemVariants}>
            Worked on AI applications in supply chain analytics, computer vision, autonomous systems, and distributed platforms through research collaborations, industrial internships, and scalable software projects.
          </motion.p>

          {/* Quick Stats Grid */}
          <motion.div className={styles.statsGrid} variants={itemVariants}>
            <div className={styles.statBox}>
              <span className={styles.statVal}>AI & ML</span>
              <span className={styles.statLabel}>Specialization</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statVal}>Manipal University Jaipur</span>
              <span className={styles.statLabel}>B.Tech CS</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statVal}>The GameOn Co.</span>
              <span className={styles.statLabel}>Founder</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
