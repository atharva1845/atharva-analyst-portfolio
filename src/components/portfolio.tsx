"use client";

import { type ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  AtSign,
  BarChart3,
  Brain,
  CheckCircle2,
  Database,
  Download,
  ExternalLink,
  Gauge,
  Link2,
  Mail,
  Menu,
  Moon,
  MousePointer2,
  Phone,
  Send,
  Sparkles,
  Sun,
  Target,
  Workflow,
  X,
} from "lucide-react";
import { experiences, projects, roles, skills } from "@/lib/portfolio-data";

const navItems = [
  ["Home", "home"],
  ["About", "about"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Contact", "contact"],
] as const;

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-90px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

function useTyping(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index];
    const complete = text === current;
    const empty = text.length === 0;

    const timeout = window.setTimeout(
      () => {
        if (!deleting && !complete) {
          setText(current.slice(0, text.length + 1));
          return;
        }

        if (!deleting && complete) {
          setDeleting(true);
          return;
        }

        if (deleting && !empty) {
          setText(current.slice(0, text.length - 1));
          return;
        }

        setDeleting(false);
        setIndex((value) => (value + 1) % words.length);
      },
      complete ? 1200 : deleting ? 38 : 78,
    );

    return () => window.clearTimeout(timeout);
  }, [deleting, index, text, words]);

  return text;
}

export default function Portfolio() {
  const typedRole = useTyping(roles);
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -90]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="aurora-bg" />
      <Navbar
        darkMode={darkMode}
        menuOpen={menuOpen}
        setDarkMode={setDarkMode}
        setMenuOpen={setMenuOpen}
      />

      <section id="home" className="relative min-h-screen pt-28">
        <div className="absolute inset-0 -z-10 opacity-50 premium-grid" />
        <motion.div
          style={{ y: heroY }}
          className="section-shell grid min-h-[calc(100vh-7rem)] items-center gap-12 pb-20 lg:grid-cols-[1.08fr_.92fr]"
        >
          <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-teal-100 backdrop-blur">
              <Sparkles size={16} />
              Turning Data into Business Decisions
            </div>

            <h1 className="mt-8 max-w-5xl text-balance text-6xl font-black leading-[0.88] tracking-tight sm:text-8xl lg:text-9xl">
              Atharva <span className="text-gradient">Rajoba</span>
            </h1>

            <div className="mt-7 flex min-h-12 flex-wrap items-center gap-2 text-2xl font-bold text-slate-300 sm:text-3xl">
              <span>Building as a</span>
              <span className="metric-font rounded-full border border-teal-300/30 bg-teal-300/10 px-4 py-2 text-teal-100">
                {typedRole}
                <span className="animate-pulse">|</span>
              </span>
            </div>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              Computer Science undergraduate specializing in IoT & Intelligent Systems,
              turning raw data into business stories through SQL, Python, Power BI,
              machine learning, and research-backed analysis.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="#projects" icon={<BarChart3 size={18} />} primary>
                View Projects
              </ButtonLink>
              <ButtonLink href="/Atharva-Rajoba-Resume.pdf" icon={<Download size={18} />}>
                Download Resume
              </ButtonLink>
              <ButtonLink href="#contact" icon={<Send size={18} />}>
                Contact Me
              </ButtonLink>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
              {[
                ["4", "Case studies"],
                ["0.9996", "ROC-AUC"],
                ["150+", "Outreach"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                  <p className="metric-font text-2xl font-black text-white">{value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30, rotate: 1 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-6 -z-10 bg-gradient-to-br from-teal-400/25 via-fuchsia-400/20 to-amber-300/20 blur-3xl" />
            <div className="premium-card overflow-hidden p-4">
              <div className="flex items-center justify-between px-2 pb-4">
                <div>
                  <p className="text-xs font-bold uppercase text-slate-400">Live portfolio system</p>
                  <p className="mt-1 text-lg font-black">Recruiter-ready analytics view</p>
                </div>
                <MousePointer2 className="text-teal-200" />
              </div>
              <Image
                src="/analytics-command-view.png"
                width={1200}
                height={760}
                priority
                alt="Analytics portfolio visual"
                className="h-auto w-full rounded-lg border border-white/10 object-cover"
              />
              <div className="grid grid-cols-3 gap-3 pt-4">
                {[
                  ["SQL", "query logic"],
                  ["Power BI", "visual model"],
                  ["Python", "analysis layer"],
                ].map(([title, label], index) => (
                  <motion.div
                    key={title}
                    animate={{ y: [0, index === 1 ? -8 : 8, 0] }}
                    transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
                    className="rounded-lg border border-white/10 bg-white/[0.07] p-3"
                  >
                    <p className="metric-font font-black">{title}</p>
                    <p className="mt-1 text-xs text-slate-400">{label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <Section id="about" eyebrow="About" title="A portfolio that reads like business judgment, not a resume dump.">
        <motion.div {...fadeUp} className="grid gap-5 lg:grid-cols-[1fr_.8fr]">
          <div className="premium-card p-6">
            <p className="text-xl leading-9 text-slate-300">
              Computer Science undergraduate specializing in IoT & Intelligent Systems
              with strong expertise in data analytics, business research, and applied
              machine learning. Experienced in transforming raw data into actionable
              insights through SQL, Python, and Power BI. Published researcher with
              international conference recognition. Strong focus on solving real-world
              business problems using data.
            </p>
          </div>
          <div className="grid gap-4">
            {[
              {
                icon: Database,
                title: "Raw data",
                copy: "Clean, join, model, and validate",
              },
              {
                icon: Target,
                title: "Business question",
                copy: "Frame what decision needs to change",
              },
              {
                icon: Workflow,
                title: "Final story",
                copy: "Deliver action, tradeoffs, and next steps",
              },
            ].map(({ icon: Icon, title, copy }) => (
              <div key={title} className="premium-card flex items-center gap-4 p-5">
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-white/10 text-teal-200">
                  <Icon size={22} />
                </span>
                <span>
                  <span className="block font-black">{title}</span>
                  <span className="mt-1 block text-sm text-slate-400">{copy}</span>
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </Section>

      <Section id="skills" eyebrow="Skills" title="The stack behind the story.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {skills.map((skill, index) => (
            <motion.article
              key={skill.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.05 }}
              whileHover={{ y: -10, rotate: index % 2 ? -1 : 1 }}
              className="premium-card group overflow-hidden p-5"
            >
              <div className={`h-1.5 w-20 rounded-full bg-gradient-to-r ${skill.accent}`} />
              <h3 className="mt-5 text-xl font-black">{skill.title}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1.5 text-sm font-semibold text-slate-200">
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section id="projects" eyebrow="Projects" title="Case studies designed like decisions.">
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.slug}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.06 }}
              whileHover={{ y: -12 }}
              className="premium-card group overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${project.color}`} />
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="label">{project.eyebrow}</p>
                    <h3 className="mt-3 text-2xl font-black tracking-tight">{project.title}</h3>
                  </div>
                  <ArrowUpRight className="shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
                </div>
                <p className="mt-4 leading-7 text-slate-300">{project.problem}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span key={tool} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-black uppercase text-slate-200">
                      {tool}
                    </span>
                  ))}
                </div>
                <ul className="mt-6 space-y-3">
                  {project.insights.slice(0, 3).map((insight) => (
                    <li key={insight} className="flex gap-3 text-sm leading-6 text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                      {insight}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-slate-950 transition hover:-translate-y-1">
                    Open Case Study
                    <ArrowRight size={16} />
                  </Link>
                  <a href="https://github.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-white/10">
                    Repository
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section id="experience" eyebrow="Experience" title="Different contexts, one operating system: research, data, action.">
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-white/10" />
          <div className="space-y-5">
            {experiences.map((experience, index) => (
              <motion.article key={experience.company} {...fadeUp} className="relative pl-12">
                <span className="absolute left-0 top-2 grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-teal-300 to-fuchsia-400 text-sm font-black text-slate-950">
                  {index + 1}
                </span>
                <div className="premium-card p-6">
                  <p className="label">{experience.company}</p>
                  <h3 className="mt-2 text-2xl font-black">{experience.role}</h3>
                  <div className="mt-5 grid gap-3 md:grid-cols-3">
                    {experience.points.map((point) => (
                      <p key={point} className="rounded-lg border border-white/10 bg-white/[0.06] p-4 text-sm leading-6 text-slate-300">
                        {point}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </Section>

      <Section id="research" eyebrow="Research" title="Research credibility with measurable outcomes.">
        <div className="grid gap-5 md:grid-cols-2">
          {[
            {
              icon: Brain,
              title: "Shor's Algorithm",
              detail: "Springer publication with international conference recognition.",
            },
            {
              icon: Gauge,
              title: "Fake News Detection",
              detail: "Applied ML system achieving ROC-AUC 0.9996.",
            },
          ].map(({ icon: Icon, title, detail }) => (
            <motion.article key={title} {...fadeUp} className="premium-card p-6">
              <Icon className="text-teal-200" size={28} />
              <h3 className="mt-5 text-2xl font-black">{title}</h3>
              <p className="mt-4 leading-7 text-slate-300">{detail}</p>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section id="education" eyebrow="Education" title="Academic foundation.">
        <motion.div {...fadeUp} className="premium-card flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-3xl font-black">Manipal University Jaipur</h3>
            <p className="mt-3 text-slate-300">B.Tech CSE, IoT & Intelligent Systems</p>
          </div>
          <span className="metric-font w-fit rounded-full bg-teal-300 px-5 py-3 font-black text-slate-950">
            CGPA 6.81
          </span>
        </motion.div>
      </Section>

      <Section id="contact" eyebrow="Contact" title="Let’s turn messy data into a business answer.">
        <div className="grid gap-6 lg:grid-cols-[.82fr_1.18fr]">
          <motion.div {...fadeUp} className="premium-card p-6">
            <h3 className="text-2xl font-black">Contact Signals</h3>
            <div className="mt-6 space-y-3">
              <ContactLink icon={<Mail size={18} />} label="Email" value="atharva2004.rajoba@gmail.com" href="mailto:atharva2004.rajoba@gmail.com" />
              <ContactLink icon={<Phone size={18} />} label="Phone" value="+91 00000 00000" href="tel:+910000000000" />
              <ContactLink icon={<Link2 size={18} />} label="LinkedIn" value="linkedin.com/in/atharvarajoba" href="https://www.linkedin.com/" />
              <ContactLink icon={<AtSign size={18} />} label="GitHub" value="github.com/atharvarajoba" href="https://github.com/" />
            </div>
          </motion.div>

          <motion.form {...fadeUp} className="premium-card p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" placeholder="Recruiter name" />
              <Field label="Email" placeholder="name@company.com" type="email" />
            </div>
            <div className="mt-4">
              <Field label="Subject" placeholder="Data Analyst opportunity" />
            </div>
            <label className="mt-4 block">
              <span className="text-sm font-bold text-slate-200">Message</span>
              <textarea
                suppressHydrationWarning
                rows={5}
                placeholder="Tell me about the role, team, and analytics problem."
                className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-white/[0.07] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-teal-300/70"
              />
            </label>
            <button
              suppressHydrationWarning
              type="button"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-1"
            >
              <Send size={17} />
              Send Message
            </button>
          </motion.form>
        </div>
      </Section>

      <footer className="section-shell border-t border-white/10 py-8 text-sm text-slate-500">
        Built with Next.js, Tailwind CSS, Framer Motion, Recharts, and Lucide React.
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
    <header className="fixed inset-x-0 top-4 z-50">
      <nav className="section-shell rounded-full border border-white/12 bg-slate-950/65 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-3 font-black">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-white text-sm text-slate-950">AR</span>
            <span className="hidden sm:inline">Atharva Rajoba</span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map(([label, id]) => (
              <a key={id} href={`#${id}`} className="rounded-full px-4 py-2 text-sm font-bold text-slate-300 transition hover:bg-white/10 hover:text-white">
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              suppressHydrationWarning
              type="button"
              aria-label="Toggle theme"
              onClick={() => setDarkMode(!darkMode)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 text-white"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              suppressHydrationWarning
              type="button"
              aria-label="Toggle navigation"
              onClick={() => setMenuOpen(!menuOpen)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 text-white lg:hidden"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="mt-4 grid gap-1 border-t border-white/10 pt-3 lg:hidden">
            {navItems.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-bold text-slate-300"
              >
                {label}
              </a>
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
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 py-16 sm:py-24">
      <div className="section-shell">
        <motion.div {...fadeUp} className="mb-10">
          <p className="label">{eyebrow}</p>
          <h2 className="mt-3 max-w-4xl text-balance text-4xl font-black leading-tight tracking-tight sm:text-6xl">
            {title}
          </h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function ButtonLink({
  href,
  children,
  icon,
  primary = false,
}: {
  href: string;
  children: ReactNode;
  icon: ReactNode;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      className={
        primary
          ? "inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-500/20"
          : "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/15"
      }
    >
      {icon}
      {children}
    </a>
  );
}

function ContactLink({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a href={href} className="group flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.06] p-4 transition hover:-translate-y-1 hover:bg-white/[0.1]">
      <span className="grid h-11 w-11 place-items-center rounded-lg bg-teal-300/15 text-teal-200">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-bold uppercase text-slate-500">{label}</span>
        <span className="block truncate font-bold text-slate-200">{value}</span>
      </span>
    </a>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-200">{label}</span>
      <input
        suppressHydrationWarning
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.07] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-teal-300/70"
      />
    </label>
  );
}
