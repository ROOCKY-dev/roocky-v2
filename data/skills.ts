export type SkillGroup = "languages" | "engines" | "systems" | "design" | "tools";

export interface Skill {
  id: string;
  name: string;
  group: SkillGroup;
  confidence: 1 | 2 | 3 | 4 | 5;
}

export const skills: Skill[] = [
  // Languages
  { id: "cpp", name: "C++", group: "languages", confidence: 4 },
  { id: "java", name: "Java", group: "languages", confidence: 3 },
  { id: "python", name: "Python", group: "languages", confidence: 4 },
  { id: "javascript", name: "JavaScript", group: "languages", confidence: 4 },
  { id: "typescript", name: "TypeScript", group: "languages", confidence: 3 },

  // Engines
  { id: "unity", name: "Unity", group: "engines", confidence: 4 },
  { id: "unreal", name: "Unreal Engine", group: "engines", confidence: 3 },

  // Systems
  { id: "linux", name: "Linux", group: "systems", confidence: 3 },
  { id: "server-admin", name: "Server Admin", group: "systems", confidence: 4 },
  { id: "mc-modding", name: "MC Modding", group: "systems", confidence: 5 },

  // Design
  { id: "uiux", name: "UI/UX", group: "design", confidence: 4 },
  { id: "figma", name: "Figma", group: "design", confidence: 3 },

  // Tools
  { id: "git", name: "Git", group: "tools", confidence: 4 },
  { id: "nextjs", name: "Next.js", group: "tools", confidence: 4 },
  { id: "tailwind", name: "Tailwind", group: "tools", confidence: 4 },
  { id: "framer-motion", name: "Framer Motion", group: "tools", confidence: 3 },
];
