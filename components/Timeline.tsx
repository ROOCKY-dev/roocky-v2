"use client";

import { motion, useReducedMotion } from "framer-motion";
import { milestones } from "@/data/timeline";

export default function Timeline() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="relative" style={{ paddingLeft: "2rem" }}>
      {/* Vertical line */}
      <div
        className="absolute top-0 bottom-0 w-px bg-[var(--fg-tertiary)]"
        style={{ left: "2rem" }}
        aria-hidden="true"
      />

      <div className="flex flex-col gap-12">
        {milestones.map((milestone, i) => {
          const isNow = milestone.year === "now";
          const delay = prefersReduced ? 0 : i * 0.1;

          return (
            <div key={`${milestone.year}-${milestone.title}`} className="relative flex items-start">
              {/* Dot on the line */}
              <motion.div
                initial={{ scale: prefersReduced ? 1 : 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: prefersReduced ? 0 : 0.3,
                  delay,
                }}
                className="absolute rounded-full bg-[var(--accent)] shrink-0"
                style={{
                  width: 8,
                  height: 8,
                  left: 0,
                  top: 6,
                }}
                aria-hidden="true"
              />

              {/* Horizontal connector */}
              <div
                className="absolute h-px bg-[var(--fg-tertiary)]"
                style={{
                  left: 8,
                  top: 10,
                  width: "2rem",
                }}
                aria-hidden="true"
              />

              {/* Card content */}
              <motion.div
                initial={{
                  opacity: prefersReduced ? 1 : 0,
                  x: prefersReduced ? 0 : -20,
                }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: prefersReduced ? 0 : 0.4,
                  delay,
                }}
                style={{ marginLeft: "calc(8px + 2rem + 0.75rem)" }}
              >
                <span
                  className="block"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: "var(--accent)",
                  }}
                >
                  {milestone.year}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: isNow ? 20 : 18,
                    fontWeight: 500,
                    color: "var(--fg-primary)",
                    marginTop: 2,
                  }}
                >
                  {milestone.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    color: "var(--fg-secondary)",
                    marginTop: 4,
                    fontStyle: isNow ? "italic" : "normal",
                  }}
                >
                  {milestone.description}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
