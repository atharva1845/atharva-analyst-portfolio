"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ExternalLink } from "lucide-react";
import type { projects } from "@/lib/portfolio-data";

type Project = (typeof projects)[number];

export function ProjectCaseStudy({ project }: { project: Project }) {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="aurora-bg" />
      <section className="section-shell py-8">
        <Link href="/#projects" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur">
          <ArrowLeft size={16} />
          Back to portfolio
        </Link>
      </section>

      <section className="section-shell grid gap-8 pb-20 pt-8 lg:grid-cols-[1fr_.72fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <p className="label">{project.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-black leading-none tracking-tight sm:text-7xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            {project.problem}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.tools.map((tool) => (
              <span key={tool} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white">
                {tool}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="premium-card p-6"
        >
          <p className="text-sm font-bold uppercase text-slate-400">Business Impact</p>
          <p className="mt-4 text-2xl font-black leading-tight">{project.impact}</p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {project.metrics.map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/[0.08] p-3">
                <p className="metric-font text-2xl font-black">{value}</p>
                <p className="mt-2 text-xs font-semibold text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </motion.aside>
      </section>

      <section className="section-shell grid gap-6 pb-24 lg:grid-cols-[.82fr_1.18fr]">
        <div className={`min-h-96 rounded-lg bg-gradient-to-br ${project.color} p-1 shadow-2xl shadow-black/30`}>
          <div className="grid h-full place-items-center rounded-lg bg-slate-950/50 p-8 backdrop-blur">
            <div className="w-full max-w-md">
              <div className="h-3 w-28 rounded-full bg-white/70" />
              <div className="mt-8 space-y-4">
                {[78, 54, 91, 66].map((width, index) => (
                  <div key={width} className="rounded-lg border border-white/20 bg-white/15 p-4">
                    <div className="h-3 rounded-full bg-white/75" style={{ width: `${width}%` }} />
                    <div className="mt-4 h-20 rounded-lg bg-slate-950/25" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <article className="premium-card p-6">
            <p className="label">Narrative</p>
            <div className="mt-5 space-y-4 text-base leading-8 text-slate-300">
              {project.story.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </article>

          <article className="premium-card p-6">
            <p className="label">Key Insights</p>
            <ul className="mt-5 space-y-4">
              {project.insights.map((insight) => (
                <li key={insight} className="flex gap-3 text-slate-300">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-teal-300" />
                  <span className="leading-7">{insight}</span>
                </li>
              ))}
            </ul>
          </article>

          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-1"
          >
            View Repository
            <ExternalLink size={16} />
          </a>
        </div>
      </section>
    </main>
  );
}
