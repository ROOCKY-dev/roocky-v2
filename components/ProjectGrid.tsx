"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

const FILTERS = ["all", "game dev", "server", "tool", "cs"] as const;
type Filter = (typeof FILTERS)[number];

export default function ProjectGrid() {
  const [active, setActive] = useState<Filter>("all");
  const prefersReduced = useReducedMotion();

  const filtered: Project[] =
    active === "all"
      ? projects
      : projects.filter((p) => p.tag === active);

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-10 flex flex-wrap gap-2">
        {FILTERS.map((tag) => {
          const isActive = tag === active;
          return (
            <button
              key={tag}
              onClick={() => setActive(tag)}
              className="rounded-full border px-4 py-1.5 font-mono text-[13px] transition-colors duration-200"
              style={{
                color: isActive ? "var(--accent)" : "var(--fg-secondary)",
                borderColor: isActive ? "var(--accent)" : "var(--fg-tertiary)",
                backgroundColor: isActive
                  ? "rgba(255, 214, 10, 0.06)"
                  : "transparent",
              }}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.div
        layout={!prefersReduced}
        className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout={!prefersReduced}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: prefersReduced ? 0 : 0.3 }}
              className={
                project.featured ? "md:col-span-2" : ""
              }
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
