'use client';

import styles from './Arsenal.module.css';

/* ── Skill Data ──────────────────────────────────── */

type Category = 'languages' | 'frameworks' | 'aiMath' | 'cloudDevops';

interface Skill {
  label: string;
  category: Category;
}

const SKILLS: Skill[] = [
  // Languages
  { label: 'Python', category: 'languages' },
  { label: 'C++20 / CUDA', category: 'languages' },
  { label: 'Go', category: 'languages' },
  { label: 'C', category: 'languages' },
  { label: 'JavaScript', category: 'languages' },
  { label: 'TypeScript', category: 'languages' },
  { label: 'SQL', category: 'languages' },

  // Frameworks & Tools
  { label: 'FastAPI', category: 'frameworks' },
  { label: 'Node.js', category: 'frameworks' },
  { label: 'PyTorch', category: 'frameworks' },
  { label: 'PyTorch Geometric', category: 'frameworks' },
  { label: 'Ray RLlib', category: 'frameworks' },
  { label: 'LangGraph', category: 'frameworks' },
  { label: 'React', category: 'frameworks' },
  { label: 'Next.js', category: 'frameworks' },
  { label: 'Linux', category: 'frameworks' },
  { label: 'VS Code', category: 'frameworks' },
  { label: 'REST APIs', category: 'frameworks' },

  // AI & Applied Math
  { label: 'Deep Learning', category: 'aiMath' },
  { label: 'NLP', category: 'aiMath' },
  { label: 'Computer Vision (YOLO)', category: 'aiMath' },
  { label: 'Graph Neural Networks (GNNs)', category: 'aiMath' },
  { label: 'Reinforcement Learning (PPO)', category: 'aiMath' },
  { label: 'Process Mining', category: 'aiMath' },
  { label: 'Differential Geometry', category: 'aiMath' },
  { label: 'Numerical PDEs', category: 'aiMath' },

  // Cloud, DevOps & Databases
  { label: 'AWS EC2', category: 'cloudDevops' },
  { label: 'Docker', category: 'cloudDevops' },
  { label: 'Kubernetes', category: 'cloudDevops' },
  { label: 'Git', category: 'cloudDevops' },
  { label: 'eBPF', category: 'cloudDevops' },
  { label: 'gRPC', category: 'cloudDevops' },
  { label: 'PostgreSQL', category: 'cloudDevops' },
  { label: 'MongoDB', category: 'cloudDevops' },
  { label: 'Supabase', category: 'cloudDevops' },
  { label: 'Firebase', category: 'cloudDevops' },
];

const CATEGORY_META: Record<Category, { label: string; labelClass: string }> = {
  languages: { label: 'Programming', labelClass: styles.languagesLabel },
  frameworks: { label: 'Frameworks & Tools', labelClass: styles.frameworksLabel },
  aiMath: { label: 'Machine Learning & Applied Math', labelClass: styles.aiMathLabel },
  cloudDevops: { label: 'Cloud, DevOps & Databases', labelClass: styles.cloudDevopsLabel },
};

export default function Arsenal() {
  const groups: Record<Category, Skill[]> = {
    languages: [],
    frameworks: [],
    aiMath: [],
    cloudDevops: [],
  };
  
  SKILLS.forEach((s) => groups[s.category].push(s));

  return (
    <section className={styles.section} id="skills">
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.sectionLabel}>SKILLS &amp; TECHNOLOGIES</span>
        <h2 className={styles.sectionTitle}>Technical Expertise</h2>
      </div>

      <div className={styles.layout}>
        {(Object.keys(groups) as Category[]).map((cat) => (
          <div key={cat} className={styles.group}>
            <h3 className={`${styles.categoryLabel} ${CATEGORY_META[cat].labelClass}`}>
              {CATEGORY_META[cat].label}
            </h3>
            <div className={styles.skills}>
              {groups[cat].map((skill) => (
                <span
                  key={skill.label}
                  className={`${styles.node} ${styles[skill.category]}`}
                >
                  {skill.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
