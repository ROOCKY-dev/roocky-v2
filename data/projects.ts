export interface Project {
  id: string;
  name: string;
  tag: "game dev" | "server" | "tool" | "cs";
  description: string;
  stack: string[];
  featured: boolean;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: "night-city",
    name: "Night City",
    tag: "server",
    description:
      "Fabric server with Discord bridge (FabricCord), LuckPerms 4-tier permission system, custom Flan–Factions bridging mod",
    stack: ["Fabric", "Java", "Discord", "LuckPerms", "Flan"],
    featured: true,
  },
  {
    id: "planetary-claim",
    name: "Planetary Claim",
    tag: "game dev",
    description:
      "MMO-RTS concept inspired by Rusted Warfare, Unity, AI-first approach",
    stack: ["Unity", "C#", "AI"],
    featured: false,
  },
  {
    id: "flan-factions-bridge",
    name: "Flan–Factions Bridge Mod",
    tag: "tool",
    description:
      "Custom Fabric mod replacing Factions' chunk claiming with Flan's corner-based system",
    stack: ["Fabric", "Java"],
    featured: false,
  },
  {
    id: "alto-clef-fork",
    name: "Alto Clef Fork",
    tag: "tool",
    description:
      '"Legit-looking" Minecraft strip-mining bot — modified Alto Clef',
    stack: ["Java", "Minecraft"],
    featured: false,
  },
  {
    id: "problem-marketplace",
    name: "Problem Marketplace",
    tag: "cs",
    description:
      "Web app connecting problem-posters with developers",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    featured: false,
  },
  {
    id: "sfm-automation",
    name: "SFM Automation",
    tag: "cs",
    description:
      "Super Factory Manager automation — cobblestone-to-lava + copper transfer systems",
    stack: ["Minecraft", "SFM"],
    featured: false,
  },
];
