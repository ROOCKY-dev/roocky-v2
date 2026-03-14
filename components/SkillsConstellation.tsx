"use client";

import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { skills } from "@/data/skills";
import type { SkillGroup } from "@/data/skills";

// ── Cluster centre positions ──
const CLUSTER_CENTRES: Record<SkillGroup, { x: number; y: number }> = {
  languages: { x: 220, y: 260 },
  engines: { x: 440, y: 140 },
  systems: { x: 690, y: 200 },
  design: { x: 440, y: 390 },
  tools: { x: 860, y: 350 },
};

const GROUP_ORDER: SkillGroup[] = [
  "languages",
  "engines",
  "systems",
  "design",
  "tools",
];

const GROUP_LABELS: Record<SkillGroup, string> = {
  languages: "LANGUAGES",
  engines: "ENGINES",
  systems: "SYSTEMS",
  design: "DESIGN",
  tools: "TOOLS",
};

const SPREAD_RADIUS = 55;

function nodeRadius(confidence: number): number {
  return 14 + confidence * 5;
}

// ── Confidence dots: ●●●●○ ──
function confidenceDots(level: number): string {
  return "●".repeat(level) + "○".repeat(5 - level);
}

// ── Compute deterministic node positions ──
interface NodePos {
  x: number;
  y: number;
  r: number;
  skill: (typeof skills)[number];
}

function computeNodes(): Record<SkillGroup, NodePos[]> {
  const result = {} as Record<SkillGroup, NodePos[]>;

  for (const group of GROUP_ORDER) {
    const centre = CLUSTER_CENTRES[group];
    const groupSkills = skills.filter((s) => s.group === group);
    const total = groupSkills.length;

    result[group] = groupSkills.map((skill, i) => {
      const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
      return {
        x: centre.x + Math.cos(angle) * SPREAD_RADIUS,
        y: centre.y + Math.sin(angle) * SPREAD_RADIUS,
        r: nodeRadius(skill.confidence),
        skill,
      };
    });
  }

  return result;
}

export default function SkillsConstellation() {
  const prefersReduced = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const nodesByGroup = useMemo(computeNodes, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: prefersReduced ? 0 : 0.4 }}
    >
      <svg
        width="100%"
        viewBox="0 0 1000 520"
        className="overflow-visible"
        role="img"
        aria-label="Skills constellation visualiser"
      >
        {GROUP_ORDER.map((group, gi) => {
          const centre = CLUSTER_CENTRES[group];
          const nodes = nodesByGroup[group];
          const staggerDelay = prefersReduced ? 0 : gi * 0.12;

          return (
            <motion.g
              key={group}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: prefersReduced ? 0 : 0.4,
                delay: staggerDelay,
              }}
            >
              {/* Group label */}
              <text
                x={centre.x}
                y={centre.y - SPREAD_RADIUS - 30}
                fontSize={9}
                fill="var(--accent)"
                fontFamily="var(--font-mono)"
                letterSpacing={1.5}
                textAnchor="middle"
              >
                {GROUP_LABELS[group]}
              </text>

              {/* Spoke lines: centre → each node */}
              {nodes.map((node) => (
                <line
                  key={`line-${node.skill.id}`}
                  x1={centre.x}
                  y1={centre.y}
                  x2={node.x}
                  y2={node.y}
                  stroke="var(--fg-tertiary)"
                  strokeOpacity={0.25}
                  strokeWidth={1}
                />
              ))}

              {/* Nodes */}
              {nodes.map((node) => {
                const isHovered = hovered === node.skill.id;
                const r = isHovered ? node.r * 1.2 : node.r;

                return (
                  <g
                    key={node.skill.id}
                    onMouseEnter={() => setHovered(node.skill.id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{ cursor: "default" }}
                  >
                    {/* Node circle */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={r}
                      fill="var(--bg-secondary)"
                      stroke={
                        isHovered ? "var(--accent)" : "var(--fg-tertiary)"
                      }
                      strokeWidth={isHovered ? 2 : 1}
                      style={{
                        transition:
                          "r 0.2s ease, stroke 0.2s ease, stroke-width 0.2s ease",
                      }}
                    />

                    {/* Node label */}
                    <text
                      x={node.x}
                      y={node.y}
                      dy={node.r + 14}
                      fontSize={10}
                      fill="var(--fg-secondary)"
                      fontFamily="var(--font-mono)"
                      textAnchor="middle"
                    >
                      {node.skill.name}
                    </text>

                    {/* Tooltip on hover */}
                    {isHovered && (
                      <g>
                        {/* Tooltip background */}
                        <rect
                          x={node.x - 52}
                          y={node.y - node.r - 42}
                          width={104}
                          height={30}
                          rx={6}
                          fill="var(--bg-tertiary)"
                          stroke="var(--accent)"
                          strokeWidth={1}
                        />
                        {/* Skill name */}
                        <text
                          x={node.x}
                          y={node.y - node.r - 27}
                          fontSize={10}
                          fill="var(--fg-primary)"
                          fontFamily="var(--font-mono)"
                          textAnchor="middle"
                        >
                          {node.skill.name}
                        </text>
                        {/* Confidence dots */}
                        <text
                          x={node.x}
                          y={node.y - node.r - 16}
                          fontSize={9}
                          fill="var(--accent)"
                          fontFamily="var(--font-mono)"
                          textAnchor="middle"
                        >
                          {confidenceDots(node.skill.confidence)}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </motion.g>
          );
        })}
      </svg>
    </motion.div>
  );
}
