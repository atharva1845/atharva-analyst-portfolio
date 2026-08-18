"use client";

import Image from "next/image";
import { type ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  Link2,
  Mail,
  Menu,
  Phone,
  X,
} from "lucide-react";
import {
  achievement,
  contact,
  credibility,
  education,
  experiences,
  profilePillars,
  projects,
  research,
  roles,
  siteMeta,
  skills,
} from "@/lib/portfolio-data";
import styles from "./portfolio.module.css";

const navItems = [
  ["Home", "home"],
  ["About", "about"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Experience", "experience"],
  ["Contact", "contact"],
];

const projectAccents = ["mint", "blue", "coral", "yellow", "violet", "sky"];

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 2400);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className={styles.site}>
      <header className={styles.header}>
        <div className={styles.navShell}>
          <a className={styles.brand} href="#home" aria-label="Atharva Rajoba home">
            <span>AR</span>
            <strong>Atharva Rajoba</strong>
          </a>

          <nav className={styles.desktopNav} aria-label="Primary navigation">
            {navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </nav>

          <a className={styles.navResume} href="/Atharva-Analyst-Resume.pdf" download>
            Resume <Download size={15} />
          </a>

          <button
            className={styles.menuButton}
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {menuOpen ? (
          <motion.nav
            className={styles.mobileNav}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            aria-label="Mobile navigation"
          >
            {navItems.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                {label}<ArrowUpRight size={15} />
              </a>
            ))}
          </motion.nav>
        ) : null}
      </header>

      <section className={styles.hero} id="home">
        <div className={styles.heroWash} />
        <div className={styles.heroGrid} />

        <div className={styles.heroInner}>
          <motion.div
            className={styles.heroCopy}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className={styles.availability}><span />{siteMeta.availability}</div>
            <p className={styles.heroEyebrow}>Business clarity, powered by evidence</p>
            <h1>Atharva<br />Rajoba.</h1>
            <div className={styles.roleLine}>
              <span>I work as a</span>
              <motion.strong
                key={roles[roleIndex]}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {roles[roleIndex]}
              </motion.strong>
            </div>
            <p className={styles.heroSummary}>
              I translate business questions, user needs, and raw data into clear decisions teams can act on.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href="#projects">View selected work <ArrowRight size={18} /></a>
              <a className={styles.secondaryAction} href="/Atharva-Analyst-Resume.pdf" download>
                Download resume <Download size={17} />
              </a>
              <a className={styles.textAction} href="#contact">Let&apos;s talk <ArrowUpRight size={17} /></a>
            </div>
          </motion.div>

          <motion.div
            className={styles.heroNote}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            <span>Current focus</span>
            <strong>Business analysis at the intersection of product, operations, and data.</strong>
            <div className={styles.heroNoteMeta}>
              <div>
                <small>Based in</small>
                <b>{siteMeta.location}</b>
              </div>
              <div>
                <small>Profile</small>
                <b>Business · Product · Data</b>
              </div>
            </div>
          </motion.div>
        </div>

        <div className={styles.heroStats}>
          {credibility.map((item) => (
            <div key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <Section
        id="about"
        eyebrow="About"
        title="A versatile analyst who starts with the business question."
        intro="Computer Science undergraduate specializing in IoT & Intelligent Systems, with experience across business research, product workflows, data analytics, and applied machine learning."
      >
        <div className={styles.aboutLayout}>
          <Reveal>
            <div className={styles.aboutStatement}>
              <p>
                I use SQL, Python, Power BI, market research, and structured problem-solving to turn fragmented information into practical next steps. My work spans customer retention, marketplace performance, procurement risk, product validation, and AI-enabled workflows.
              </p>
              <p>
                A published researcher with international conference recognition, I bring the same evidence-first discipline to business and product decisions.
              </p>
              <a href="#experience">See experience <ArrowRight size={16} /></a>
            </div>
          </Reveal>

          <div className={styles.roleRail}>
            {profilePillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 0.07}>
                <article>
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.focus}</p>
                    <small>{pillar.evidence}</small>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="skills"
        tone="soft"
        eyebrow="Skills"
        title="Tools selected for the problem, not the trend."
        intro="A focused toolkit for understanding requirements, investigating performance, and communicating what should happen next."
      >
        <div className={styles.skillsGrid}>
          {skills.map((skill, index) => (
            <Reveal key={skill.title} delay={index * 0.06}>
              <motion.article className={styles.skillCard} whileHover={{ y: -6 }}>
                <div className={`${styles.skillIcon} ${styles[`accent${index + 1}`]}`}>
                  {index === 0 ? <BriefcaseBusiness size={22} /> : index === 1 ? <ArrowUpRight size={22} /> : index === 2 ? <FileText size={22} /> : <Link2 size={22} />}
                </div>
                <span>0{index + 1}</span>
                <h3>{skill.title}</h3>
                <p>{skill.summary}</p>
                <div className={styles.skillTags}>
                  {skill.items.map((item) => <span key={item}>{item}</span>)}
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="projects"
        eyebrow="Selected projects"
        title="Work that moves from analysis to action."
        intro="Six concise case studies across product, customer, marketplace, marketing, procurement, and operations analytics."
      >
        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={(index % 3) * 0.06}>
              <motion.article className={`${styles.projectCard} ${styles[projectAccents[index]]}`} whileHover={{ y: -7 }}>
                <div className={styles.projectTopline}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <small>{project.eyebrow}</small>
                </div>
                <h3>{project.title}</h3>
                <p>{project.problem}</p>
                <div className={styles.projectImpact}>
                  <strong>Outcome</strong>
                  <span>{project.impact}</span>
                </div>
                <div className={styles.projectTools}>
                  {project.tools.slice(0, 4).map((tool) => <span key={tool}>{tool}</span>)}
                </div>
                <div className={styles.projectLinks}>
                  {project.repository ? (
                    <a href={project.repository} target="_blank" rel="noreferrer" aria-label={`${project.title} repository`}>
                      <FaGithub size={15} /> Repository <ExternalLink size={14} />
                    </a>
                  ) : null}
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="experience"
        tone="soft"
        eyebrow="Experience & education"
        title="Practical experience, supported by research depth."
        intro="Internships across product, machine learning, and business operations, with academic work recognized through two Springer publications."
      >
        <div className={styles.experienceLayout}>
          <div className={styles.timeline}>
            {experiences.map((experience, index) => (
              <Reveal key={experience.company} delay={index * 0.07}>
                <article className={styles.timelineItem}>
                  <div className={styles.timelineMarker}><span>0{index + 1}</span></div>
                  <div className={styles.timelineContent}>
                    <div className={styles.companyLine}>
                      <span className={`${styles.companyLogo} ${experience.logoPresentation === "icon" ? styles.companyLogoIcon : ""}`}>
                        <Image src={experience.logo} alt={experience.logoAlt} width={150} height={80} sizes="110px" />
                      </span>
                      <div>
                        <small>{experience.company}</small>
                        <h3>{experience.role}</h3>
                      </div>
                      <time>{experience.period}</time>
                    </div>
                    <p>{experience.summary}</p>
                    <ul>
                      {experience.points.map((point) => <li key={point}><CheckCircle2 size={15} />{point}</li>)}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.08}>
            <aside className={styles.educationCard}>
              <div className={styles.campusVisual}>
                <Image src="/education/manipal-university-jaipur.png" alt="Manipal University Jaipur campus" fill sizes="(max-width: 900px) 100vw, 420px" />
                <div />
                <span><FileText size={20} /></span>
                <strong>{education.institution}</strong>
              </div>
              <div className={styles.educationBody}>
                <small>Education</small>
                <h3>{education.degree}</h3>
                <p>{education.specialization}</p>
                <div><span>{education.period}</span><strong>CGPA {education.cgpa}</strong></div>
              </div>
            </aside>
          </Reveal>
        </div>

        <div className={styles.researchShowcase}>
          <Reveal>
            <a className={styles.achievementFeature} href={achievement.image} target="_blank" rel="noreferrer">
              <div className={styles.achievementImage}>
                <Image src={achievement.image} alt={achievement.imageAlt} width={1308} height={1179} sizes="(max-width: 780px) calc(100vw - 72px), 390px" />
              </div>
              <div className={styles.achievementCopy}>
                <small>2025 recognition</small>
                <h3>{achievement.title}</h3>
                <p>{achievement.detail}</p>
                <div className={styles.achievementSignals}>
                  {achievement.signals.map((signal) => <span key={signal}>{signal}</span>)}
                </div>
                <span>View certificate <ArrowUpRight size={14} /></span>
              </div>
            </a>
          </Reveal>

          <div className={styles.publicationGrid}>
            {research.map((paper, index) => (
              <Reveal key={paper.doi} delay={index * 0.06}>
                <article className={styles.publicationCard}>
                  <a className={styles.paperPreview} href={paper.pdf} target="_blank" rel="noreferrer" aria-label={`Open ${paper.title} PDF`}>
                    <Image src={paper.preview} alt={`First page of ${paper.title}`} width={612} height={792} sizes="190px" />
                    <span>Open paper <ArrowUpRight size={13} /></span>
                  </a>
                  <div className={styles.paperCopy}>
                    <span>Publication 0{index + 1}</span>
                    <h3>{paper.title}</h3>
                    <p>{paper.detail}</p>
                    <strong>{paper.signal}</strong>
                    <div>
                      <a href={paper.doiUrl} target="_blank" rel="noreferrer">DOI <ArrowUpRight size={14} /></a>
                      <a href={paper.pdf} target="_blank" rel="noreferrer">Full PDF <FileText size={14} /></a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <section className={styles.contact} id="contact">
        <div className={styles.contactInner}>
          <Reveal>
            <p>Contact</p>
            <h2>Let&apos;s turn the next question into a clear decision.</h2>
            <span>I&apos;m open to Business Analyst, Product Analyst, and Data Analyst opportunities.</span>
          </Reveal>

          <Reveal delay={0.08}>
            <div className={styles.contactActions}>
              <a className={styles.contactPrimary} href={`mailto:${contact.email}`}>Start a conversation <Mail size={18} /></a>
              <a href={`tel:${contact.phoneHref}`}><Phone size={17} />{contact.phoneDisplay}</a>
              <a href={contact.linkedin} target="_blank" rel="noreferrer"><FaLinkedinIn size={17} />LinkedIn</a>
              <a href={contact.github} target="_blank" rel="noreferrer"><FaGithub size={17} />GitHub</a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <a className={styles.brand} href="#home"><span>AR</span><strong>Atharva Rajoba</strong></a>
          <p>{siteMeta.location} · Business, product, and data analysis</p>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </div>
      </footer>
    </main>
  );
}

function Section({
  id,
  eyebrow,
  title,
  intro,
  tone,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  tone?: "soft";
  children: ReactNode;
}) {
  return (
    <section className={`${styles.section} ${tone ? styles.sectionSoft : ""}`} id={id}>
      <div className={styles.sectionInner}>
        <Reveal>
          <div className={styles.sectionHeading}>
            <p>{eyebrow}</p>
            <div>
              <h2>{title}</h2>
              <span>{intro}</span>
            </div>
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
