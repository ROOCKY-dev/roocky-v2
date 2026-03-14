"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const prefersReduced = useReducedMotion();
  const isFeatured = project.featured;

  return (
    <motion.div
      layout={!prefersReduced}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: prefersReduced ? 0 : 0.5 }}
      whileHover={prefersReduced ? {} : { y: -4 }}
      className="group relative flex flex-col justify-between rounded-lg border border-[var(--fg-tertiary)] bg-[var(--bg-secondary)] hover:border-[var(--accent)] transition-[border-color] duration-200"
      style={{
        padding: isFeatured ? "2rem" : "1.5rem",
      }}
    >
      {/* Tag pill */}
      <div className="mb-4">
        <span className="inline-block rounded-full border border-[var(--fg-tertiary)] px-3 py-0.5 font-mono text-[11px] text-[var(--fg-secondary)]">
          {project.tag}
        </span>
      </div>

      {/* Name + description */}
      <div className="mb-4 flex-1">
        <h3
          className="font-display font-bold text-[var(--fg-primary)]"
          style={{ fontSize: isFeatured ? "22px" : "18px" }}
        >
          {project.name}
        </h3>
        <p className="mt-1 font-sans text-[13px] leading-relaxed text-[var(--fg-secondary)]">
          {project.description}
        </p>
      </div>

      {/* Stack pills + arrow */}
      <div className="flex items-end justify-between">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="inline-block rounded-md bg-[var(--bg-tertiary)] px-2 py-0.5 font-mono text-[11px] text-[var(--fg-secondary)]"
            >
              {tech}
            </span>
          ))}
        </div>
        <span className="text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-lg leading-none">
          →
        </span>
      </div>
    </motion.div>
  );
}
