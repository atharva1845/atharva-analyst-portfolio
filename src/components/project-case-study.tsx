"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Database,
  ExternalLink,
  FileText,
  Target,
  Users,
  Workflow,
} from "lucide-react";
import { projects } from "@/lib/portfolio-data";

type Project = (typeof projects)[number];

export function ProjectCaseStudy({ project }: { project: Project }) {
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="case-root">
      <header className="case-nav">
        <div className="section-shell">
          <Link href="/#projects"><ArrowLeft size={16} />All projects</Link>
          <Link href="/" className="case-brand"><span>AR</span>Atharva Rajoba</Link>
          {project.repository ? (
            <a href={project.repository} target="_blank" rel="noreferrer">Repository<ExternalLink size={15} /></a>
          ) : <span className="case-private">Portfolio case study</span>}
        </div>
      </header>

      <section className="case-hero">
        <div className="case-grid" />
        <div className="section-shell case-hero-inner">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: [0.72, 1], y: [18, 0] }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="case-eyebrow">Case study <span>/</span> {project.eyebrow}</p>
            <h1>{project.title}</h1>
            <p className="case-problem">{project.problem}</p>
            <div className="case-tools">
              {project.tools.map((tool) => <span key={tool}>{tool}</span>)}
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: [0.72, 1], y: [18, 0] }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="case-brief"
          >
            <CaseBriefItem icon={<Target size={18} />} label="My role" value={project.role} />
            <CaseBriefItem icon={<Database size={18} />} label="Scope" value={project.scope} />
            <CaseBriefItem icon={<Users size={18} />} label="Stakeholders" value={project.stakeholders.join(", ")} />
          </motion.aside>
        </div>
      </section>

      <section className="case-metrics">
        <div className="section-shell">
          {project.metrics.map(([label, value]) => (
            <div key={label}><span>{label}</span><strong>{value}</strong></div>
          ))}
          <div className="case-impact"><span>Outcome</span><p>{project.impact}</p></div>
        </div>
      </section>

      <section className="case-body">
        <div className="section-shell">
          <CaseSection index="01" label="Context and approach" title="From the business question to an analytical path.">
            <div className="case-narrative">
              {project.story.map((line, index) => (
                <motion.p
                  key={line}
                  initial={false}
                  whileInView={{ opacity: [0.72, 1], y: [14, 0] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.07 }}
                >
                  <span>0{index + 1}</span>{line}
                </motion.p>
              ))}
            </div>
          </CaseSection>

          <CaseSection index="02" label="Decision trail" title="The work moves through three connected layers.">
            <div className="decision-trail">
              <DecisionStep icon={<Target size={21} />} title="Frame" copy={project.problem} />
              <DecisionStep icon={<Workflow size={21} />} title="Build" copy={`Create and validate the ${project.artifacts.slice(0, 2).join(" and ").toLowerCase()}.`} />
              <DecisionStep icon={<CheckCircle2 size={21} />} title="Translate" copy={project.impact} />
            </div>
          </CaseSection>

          <div className="case-two-column">
            <CaseSection index="03" label="Findings" title="What the evidence revealed." compact>
              <ul className="case-list findings-list">
                {project.insights.map((insight) => <li key={insight}><CheckCircle2 size={18} />{insight}</li>)}
              </ul>
            </CaseSection>

            <CaseSection index="04" label="Deliverables" title="What I produced." compact>
              <div className="artifact-grid">
                {project.artifacts.map((artifact, index) => (
                  <div key={artifact}><FileText size={18} /><span>0{index + 1}</span><p>{artifact}</p></div>
                ))}
              </div>
            </CaseSection>
          </div>

          <CaseSection index="05" label="Recommendations" title="What I would do next.">
            <div className="recommendation-grid">
              {project.recommendations.map((recommendation, index) => (
                <motion.div key={recommendation} whileHover={{ y: -4 }}>
                  <span>0{index + 1}</span>
                  <p>{recommendation}</p>
                </motion.div>
              ))}
            </div>
          </CaseSection>
        </div>
      </section>

      <section className="next-case">
        <div className="section-shell">
          <div><p>Next case study</p><h2>{nextProject.title}</h2></div>
          <Link href={`/projects/${nextProject.slug}`}>Continue <ArrowRight size={18} /></Link>
        </div>
      </section>

      <footer className="case-footer">
        <div className="section-shell"><span>Atharva Rajoba</span><Link href="/#contact">Discuss an opportunity <ArrowUpRight size={15} /></Link></div>
      </footer>
    </main>
  );
}

function CaseBriefItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div><span>{icon}</span><p><small>{label}</small><strong>{value}</strong></p></div>;
}

function CaseSection({
  index,
  label,
  title,
  children,
  compact = false,
}: {
  index: string;
  label: string;
  title: string;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <section className={`case-section${compact ? " case-section-compact" : ""}`}>
      <div className="case-section-heading"><p><span>{index}</span>{label}</p><h2>{title}</h2></div>
      {children}
    </section>
  );
}

function DecisionStep({ icon, title, copy }: { icon: React.ReactNode; title: string; copy: string }) {
  return <motion.article whileHover={{ y: -5 }}><div>{icon}</div><span>{title}</span><p>{copy}</p></motion.article>;
}
