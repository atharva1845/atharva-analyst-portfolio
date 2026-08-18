import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
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
          <div className="case-hero-copy">
            <p className="case-eyebrow">Case study <span>/</span> {project.eyebrow}</p>
            <h1>{project.title}</h1>
            <p className="case-problem">{project.problem}</p>
            <div className="case-tools">
              {project.tools.map((tool) => <span key={tool}>{tool}</span>)}
            </div>
          </div>

          <aside className="case-brief case-hero-brief">
            <CaseBriefItem icon={<Target size={18} />} label="My role" value={project.role} />
            <CaseBriefItem icon={<Database size={18} />} label="Scope" value={project.scope} />
            <CaseBriefItem icon={<Users size={18} />} label="Stakeholders" value={project.stakeholders.join(", ")} />
          </aside>
        </div>
      </section>

      <div className="case-metrics">
        <div className="section-shell">
          {project.metrics.map(([label, value]) => (
            <div key={label}><span>{label}</span><strong>{value}</strong></div>
          ))}
          <div className="case-impact"><span>Outcome</span><p>{project.impact}</p></div>
        </div>
      </div>

      <div className="case-body">
        <div className="section-shell">
          <CaseSection index="01" label="Context and approach" title="From the business question to an analytical path.">
            <div className="case-narrative">
              {project.story.map((line, index) => (
                <p key={line} style={{ "--story-index": index } as CSSProperties}>
                  <span>0{index + 1}</span>{line}
                </p>
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
                <div key={recommendation}>
                  <span>0{index + 1}</span>
                  <p>{recommendation}</p>
                </div>
              ))}
            </div>
          </CaseSection>
        </div>
      </div>

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

function CaseBriefItem({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
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
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <section className={`case-section${compact ? " case-section-compact" : ""}`}>
      <div className="case-section-heading"><p><span>{index}</span>{label}</p><h2>{title}</h2></div>
      {children}
    </section>
  );
}

function DecisionStep({ icon, title, copy }: { icon: ReactNode; title: string; copy: string }) {
  return <article><div>{icon}</div><span>{title}</span><p>{copy}</p></article>;
}
