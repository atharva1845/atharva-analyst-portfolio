"use client";

import Image from "next/image";
import Link from "next/link";
import { type FormEvent, type ReactNode, useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  AtSign,
  BriefcaseBusiness,
  CheckCircle2,
  Database,
  Download,
  ExternalLink,
  FileText,
  Link2,
  Mail,
  Menu,
  Moon,
  Phone,
  Route,
  Send,
  Sun,
  X,
} from "lucide-react";
import {
  certifications,
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

const navItems = [
  ["Profile", "profile"],
  ["Projects", "projects"],
  ["Experience", "experience"],
  ["Capabilities", "capabilities"],
  ["Contact", "contact"],
] as const;

const pillarIcons = [BriefcaseBusiness, Route, Database];

function useTyping(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0] ?? "Business Analyst");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index];
    const isComplete = text === current;
    const isEmpty = text.length === 0;
    const delay = isComplete ? 1550 : deleting ? 36 : 72;

    const timer = window.setTimeout(() => {
      if (!deleting && !isComplete) {
        setText(current.slice(0, text.length + 1));
      } else if (!deleting && isComplete) {
        setDeleting(true);
      } else if (deleting && !isEmpty) {
        setText(current.slice(0, text.length - 1));
      } else {
        setDeleting(false);
        setIndex((value) => (value + 1) % words.length);
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleting, index, text, words]);

  return text;
}

export default function Portfolio() {
  const typedRole = useTyping(roles);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  function handleContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = String(data.get("subject") || "Analyst opportunity");
    const message = String(data.get("message") || "");
    const name = String(data.get("name") || "");
    const sender = String(data.get("email") || "");
    const body = `${message}\n\nFrom: ${name}${sender ? ` (${sender})` : ""}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main className="portfolio-root">
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <Navbar
        darkMode={darkMode}
        menuOpen={menuOpen}
        setDarkMode={setDarkMode}
        setMenuOpen={setMenuOpen}
      />

      <section id="home" className="hero-section">
        <Image
          src="/analyst-workspace-hero.png"
          alt="Business analysis workspace with process maps, data tables, and decision charts"
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-shade" />
        <div className="hero-grid" />

        <div className="section-shell hero-inner">
          <div className="hero-copy">
            <div className="availability-pill">
              <span className="availability-dot" />
              {siteMeta.availability}
            </div>

            <p className="hero-kicker">Business clarity, backed by data</p>
            <h1>Atharva Rajoba</h1>
            <div className="hero-role" aria-live="polite">
              <span>{typedRole}</span>
              <span className="typing-caret" aria-hidden="true" />
            </div>
            <p className="hero-summary">
              I map business problems, examine the evidence, and turn complexity into workflows,
              product decisions, and measurable next steps.
            </p>

            <div className="hero-actions">
              <ActionLink href="#projects" variant="primary" icon={<ArrowRight size={18} />}>
                Explore case studies
              </ActionLink>
              <ActionLink href="/Atharva-Analyst-Resume.pdf" icon={<Download size={18} />} download>
                Resume
              </ActionLink>
              <ActionLink href="#contact" icon={<Mail size={18} />}>
                Start a conversation
              </ActionLink>
            </div>
          </div>

          <div className="hero-note" aria-label="Core approach">
            <span>01</span>
            <p>Question</p>
            <ArrowRight size={15} />
            <p>Evidence</p>
            <ArrowRight size={15} />
            <p>Decision</p>
          </div>
        </div>
      </section>

      <section className="signal-band" aria-label="Selected portfolio evidence">
        <div className="section-shell signal-grid">
          {credibility.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.05}>
              <div className="signal-item">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Section
        id="profile"
        eyebrow="Analyst profile"
        index="02"
        title="One analyst, three useful lenses."
        intro="Business analysis leads the work. Product thinking shapes the experience. Data analysis keeps the recommendation honest."
      >
        <div className="pillar-grid">
          {profilePillars.map((pillar, index) => {
            const Icon = pillarIcons[index];
            return (
              <Reveal key={pillar.title} delay={index * 0.08}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className={`pillar-card pillar-${pillar.accent}`}
                >
                  <div className="pillar-topline">
                    <span>0{index + 1}</span>
                    <Icon size={22} />
                  </div>
                  <h3>{pillar.title}</h3>
                  <p className="pillar-focus">{pillar.focus}</p>
                  <div className="pillar-evidence">
                    <span>Evidence</span>
                    <p>{pillar.evidence}</p>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="approach-row">
            <div>
              <p className="mini-label">How I work</p>
              <h3>Structure the ambiguity before building the answer.</h3>
            </div>
            <div className="approach-steps">
              {[
                ["Frame", "Clarify the user, business question, and decision."],
                ["Investigate", "Map the process and validate the available evidence."],
                ["Translate", "Present findings as actions, tradeoffs, and next steps."],
              ].map(([title, copy], index) => (
                <div key={title}>
                  <span>{index + 1}</span>
                  <p><strong>{title}</strong>{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      <Section
        id="projects"
        dark
        eyebrow="Selected work"
        index="03"
        title="Case studies built around decisions, not decoration."
        intro="Each project starts with the business question, shows my contribution, and ends with what the evidence suggests doing next."
      >
        <div className="featured-projects">
          {projects.filter((project) => project.featured).map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.08}>
              <motion.article
                whileHover={{ y: -5 }}
                transition={{ duration: 0.25 }}
                className="featured-project"
              >
                <div className="project-number">0{index + 1}</div>
                <div className="project-main">
                  <p className="mini-label">{project.eyebrow}</p>
                  <h3>{project.title}</h3>
                  <p className="project-problem">{project.problem}</p>
                  <div className="project-context">
                    <span>{project.role}</span>
                    <span>{project.scope}</span>
                  </div>
                </div>
                <div className="project-proof">
                  <p className="mini-label">What changed</p>
                  <p>{project.impact}</p>
                  <div className="tool-row">
                    {project.tools.map((tool) => <span key={tool}>{tool}</span>)}
                  </div>
                  <div className="project-actions">
                    <Link href={`/projects/${project.slug}`}>
                      Read case study <ArrowRight size={16} />
                    </Link>
                    {project.repository ? (
                      <a href={project.repository} target="_blank" rel="noreferrer" aria-label={`${project.title} repository`}>
                        <ExternalLink size={17} />
                      </a>
                    ) : null}
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>

        <div className="project-grid">
          {projects.filter((project) => !project.featured).map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.06}>
              <motion.article whileHover={{ y: -6 }} className="project-card">
                <div className="project-card-head">
                  <span>{project.eyebrow}</span>
                  <ArrowUpRight size={20} />
                </div>
                <h3>{project.title}</h3>
                <p>{project.problem}</p>
                <div className="tool-row">
                  {project.tools.slice(0, 3).map((tool) => <span key={tool}>{tool}</span>)}
                </div>
                <Link href={`/projects/${project.slug}`}>View analysis <ArrowRight size={15} /></Link>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="experience"
        eyebrow="Experience"
        index="04"
        title="From product discovery to operational execution."
        intro="Three internships, each adding a different layer to how I investigate problems and move work forward."
      >
        <div className="experience-list">
          {experiences.map((experience, index) => (
            <Reveal key={experience.company} delay={index * 0.07}>
              <article className="experience-row">
                <div className="experience-meta">
                  <span>0{index + 1}</span>
                  <p>{experience.period}</p>
                </div>
                <div className="experience-title">
                  <div className="experience-company">
                    <span className="experience-logo">
                      <Image
                        src={experience.logo}
                        alt={experience.logoAlt}
                        width={140}
                        height={72}
                        sizes="140px"
                      />
                    </span>
                    <p>{experience.company}</p>
                  </div>
                  <h3>{experience.role}</h3>
                  <span className="experience-summary">{experience.summary}</span>
                </div>
                <ul>
                  {experience.points.map((point) => (
                    <li key={point}><CheckCircle2 size={16} />{point}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="capabilities"
        tint
        eyebrow="Capabilities"
        index="05"
        title="Tools in service of the question."
        intro="The portfolio is intentionally organized by the work I can do, then by the technologies that support it."
      >
        <div className="capability-grid">
          {skills.map((skill, index) => (
            <Reveal key={skill.title} delay={index * 0.06}>
              <motion.article whileHover={{ y: -5 }} className="capability-card">
                <div className="capability-index">0{index + 1}</div>
                <h3>{skill.title}</h3>
                <p>{skill.summary}</p>
                <div className="capability-tags">
                  {skill.items.map((item) => <span key={item}>{item}</span>)}
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="credentials"
        dark
        eyebrow="Credibility"
        index="06"
        title="Research depth. Practical range."
        intro="Academic work strengthened how I evaluate evidence; professional learning keeps the toolkit current."
      >
        <div className="credentials-layout">
          <div className="research-stack">
            {research.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <article className="research-item">
                  <div className="research-signal">{item.signal}</div>
                  <div>
                    <p className="mini-label">{item.venue}</p>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <aside className="education-panel">
              <div className="education-mark"><FileText size={24} /></div>
              <p className="mini-label">Education</p>
              <h3>{education.institution}</h3>
              <p>{education.degree}</p>
              <p>{education.specialization}</p>
              <div className="education-data">
                <span>{education.period}</span>
                <strong>CGPA {education.cgpa}</strong>
              </div>
              <div className="certification-list">
                <p className="mini-label">Selected certifications</p>
                {certifications.map((certification) => (
                  <span key={certification}><CheckCircle2 size={15} />{certification}</span>
                ))}
              </div>
            </aside>
          </Reveal>
        </div>
      </Section>

      <Section
        id="contact"
        eyebrow="Contact"
        index="07"
        title="Have a business problem worth unpacking?"
        intro="I am open to Business Analyst, Product Analyst, and Data Analyst opportunities where thoughtful analysis leads to action."
      >
        <div className="contact-layout">
          <Reveal>
            <div className="contact-copy">
              <div className="contact-status"><span />Available for conversations</div>
              <h3>Let&apos;s make the next decision clearer.</h3>
              <p>Share the role, team, or business problem. I will get back to you directly.</p>
              <div className="contact-links">
                <ContactLink icon={<Mail size={18} />} label="Email" value={contact.email} href={`mailto:${contact.email}`} />
                <ContactLink icon={<Phone size={18} />} label="Phone" value={contact.phoneDisplay} href={`tel:${contact.phoneHref}`} />
                <ContactLink icon={<Link2 size={18} />} label="LinkedIn" value="atharva-rajoba" href={contact.linkedin} external />
                <ContactLink icon={<AtSign size={18} />} label="GitHub" value="atharva1845" href={contact.github} external />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <form className="contact-form" onSubmit={handleContact}>
              <div className="form-grid">
                <Field name="name" label="Name" placeholder="Your name" required />
                <Field name="email" label="Email" placeholder="name@company.com" type="email" required />
              </div>
              <Field name="subject" label="Subject" placeholder="Business Analyst opportunity" required />
              <label>
                <span>Message</span>
                <textarea suppressHydrationWarning name="message" rows={5} placeholder="Tell me about the role, team, or problem." required />
              </label>
              <button suppressHydrationWarning type="submit">Open email <Send size={17} /></button>
            </form>
          </Reveal>
        </div>
      </Section>

      <footer>
        <div className="section-shell footer-inner">
          <div><strong>AR</strong><span>Atharva Rajoba</span></div>
          <p>Business analysis first. Product and data fluency built in.</p>
          <a href="#home">Back to top <ArrowUpRight size={15} /></a>
        </div>
      </footer>
    </main>
  );
}

function Navbar({
  darkMode,
  menuOpen,
  setDarkMode,
  setMenuOpen,
}: {
  darkMode: boolean;
  menuOpen: boolean;
  setDarkMode: (value: boolean) => void;
  setMenuOpen: (value: boolean) => void;
}) {
  return (
    <header className="site-header">
      <nav className="section-shell nav-shell" aria-label="Primary navigation">
        <a className="brand-mark" href="#home" aria-label="Atharva Rajoba, home">
          <span>AR</span>
          <div><strong>Atharva Rajoba</strong><small>Analyst portfolio</small></div>
        </a>

        <div className="desktop-nav">
          {navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </div>

        <div className="nav-actions">
          <a className="nav-resume" href="/Atharva-Analyst-Resume.pdf" download>
            Resume <Download size={15} />
          </a>
          <button suppressHydrationWarning type="button" onClick={() => setDarkMode(!darkMode)} aria-label={darkMode ? "Use light theme" : "Use dark theme"}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button suppressHydrationWarning className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>

        {menuOpen ? (
          <div className="mobile-nav">
            {navItems.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}<ArrowRight size={16} /></a>
            ))}
          </div>
        ) : null}
      </nav>
    </header>
  );
}

function Section({
  id,
  eyebrow,
  index,
  title,
  intro,
  children,
  dark = false,
  tint = false,
}: {
  id: string;
  eyebrow: string;
  index: string;
  title: string;
  intro: string;
  children: ReactNode;
  dark?: boolean;
  tint?: boolean;
}) {
  return (
    <section id={id} className={`content-section${dark ? " section-dark" : ""}${tint ? " section-tint" : ""}`}>
      <div className="section-shell">
        <Reveal>
          <div className="section-heading">
            <div className="section-label"><span>{index}</span>{eyebrow}</div>
            <div>
              <h2>{title}</h2>
              <p>{intro}</p>
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
      initial={false}
      whileInView={{ opacity: [0.72, 1], y: [16, 0] }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ActionLink({
  href,
  children,
  icon,
  variant = "secondary",
  download = false,
}: {
  href: string;
  children: ReactNode;
  icon: ReactNode;
  variant?: "primary" | "secondary";
  download?: boolean;
}) {
  return <a href={href} download={download || undefined} className={`action-link action-${variant}`}>{children}{icon}</a>;
}

function ContactLink({
  icon,
  label,
  value,
  href,
  external = false,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
      <span>{icon}</span>
      <div><small>{label}</small><strong>{value}</strong></div>
      {external ? <ExternalLink size={15} /> : <ArrowRight size={15} />}
    </a>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label>
      <span>{label}</span>
      <input suppressHydrationWarning name={name} type={type} placeholder={placeholder} required={required} />
    </label>
  );
}
