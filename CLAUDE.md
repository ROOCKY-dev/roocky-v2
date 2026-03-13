# roocky.dev v2 — Project Brief for Claude Code

> This file is the single source of truth for the roocky.dev v2 portfolio rebuild.
> Read this at the start of every session. All decisions here are final unless Ahmed explicitly changes them.

---

## Who is Ahmed

- CS student, first semester at UNITEN (Universiti Tenaga Nasional), Kajang, Malaysia
- Born in Seiyun, Yemen (21 May 2006)
- Skills: C++, Java, Python, UI/UX, Unreal Engine, Unity, cybersecurity, server admin
- Previously: Chess Club manager, Sociological Support Team member
- Exploring scholarships in the Netherlands, Germany, or China for 2026–2027
- GitHub: ROOCKY-dev | Domain: roocky.dev

---

## Project Identity

**Tagline (locked):**
> "The foundation you don't see until it's missing."

**Core concept:**
The portfolio must feel like *entering a creative developer's world*, not reading a CV.
Ahmed is not a generic CS student. He builds servers, games, tools, and systems —
and the portfolio itself is proof of that creativity.

**Primary audience:** General personal brand — scholarship committees, future employers,
game dev / indie community, and anyone who lands on the site.

**Aesthetic direction:** Bold & creative. Dark base, yellow accent, motion-forward.
Think: game studio site meets senior engineer's portfolio.

---

## Design System

### Colour palette

```css
/* Base — never changes */
--bg-primary:    #0a0a0a;   /* near-black background */
--bg-secondary:  #111111;   /* card / surface */
--bg-tertiary:   #1a1a1a;   /* subtle lift */
--fg-primary:    #f5f5f5;   /* main text */
--fg-secondary:  #a0a0a0;   /* muted text */
--fg-tertiary:   #555555;   /* hints / disabled */

/* Accent — adaptive, driven by useMoodAccent() hook */
--accent:        #FFD60A;   /* default yellow (active state) */
```

### Mood accent system (CRITICAL FEATURE)

The `--accent` CSS variable is driven by a `useMoodAccent()` hook.
It reads the GitHub API and current time, then sets the accent colour on `<html>`.

**States:**

| State      | Colour    | Hex       | Trigger logic                                              |
|------------|-----------|-----------|-----------------------------------------------------------|
| Pressure   | Red       | `#FF3B30` | >5 open issues OR last commit was within 2 hours           |
| Active     | Yellow    | `#FFD60A` | Normal working hours (9am–midnight), recent activity       |
| Resting    | Green     | `#30D158` | Weekend OR no commits in 12+ hours OR 12am–9am             |

**Implementation rules:**
- Set via `document.documentElement.style.setProperty('--accent', hex)` on load
- Add a smooth CSS transition: `transition: color 1.5s ease, border-color 1.5s ease, background-color 1.5s ease` to `*`
- Display a pulsing status dot in the top-right corner of the nav
- Tooltip on hover: `"Ahmed is currently: under pressure / active / resting"`
- The dot pulses with a CSS `@keyframes` animation using the current accent colour
- Fetch from: `https://api.github.com/repos/ROOCKY-dev/Profile` (public, no auth needed for basic data)
- Re-evaluate every 5 minutes via `setInterval`

**Every coloured element on the site uses `var(--accent)`** — borders, highlights,
cursor glow, terminal `>` prompt, timeline dots, skill node outlines, button hovers.

### Typography

```css
--font-display: 'Space Grotesk', sans-serif;   /* headings — bold, character */
--font-mono:    'JetBrains Mono', monospace;   /* hero terminal, code snippets */
--font-body:    'Inter', sans-serif;           /* all body copy */
```

Load all three from Google Fonts. Space Grotesk for display, JetBrains Mono for
the hero and any code, Inter for everything else.

### Motion principles

- Use **Framer Motion** for all animations
- Scroll-triggered reveals: `whileInView` with `viewport={{ once: true }}`
- Entry animations: fade + translateY(20px) → translateY(0), duration 0.5s
- Stagger children with `staggerChildren: 0.08`
- No animation should feel "decorative" — every motion must communicate something
- Respect `prefers-reduced-motion` — wrap all animations in a `useReducedMotion()` check

---

## Site Architecture

Single page (`/`) with smooth scroll. Persistent sticky nav.
Additional routes: `/projects/[slug]` for detailed project pages (Phase 2, optional).

### Section order

1. **Hero** — terminal effect, tagline reveal
2. **About** — short, human, personality-forward (3–4 sentences max)
3. **Projects** — filterable grid, 4–6 featured projects
4. **Skills** — constellation / bubble visualiser
5. **Journey** — vertical scroll timeline
6. **Contact** — modal (keep from v1, improve styling)

### Nav items

```
roocky.dev  |  projects  skills  journey  contact  [status dot]
```

The logo/name is accent-coloured. Status dot is top-right, always visible.

---

## Section Specs

### 1. Hero

**Concept:** Terminal *effect* — NOT a terminal window. No macOS chrome, no green-on-black.
Raw monospace text appearing directly on the dark background, as if being typed into reality.

**Sequence (Framer Motion staggered reveal):**
```
[blank screen — 0.5s pause]

> Ahmed Husam_          ← accent colour, types character by character
                        ← 0.4s pause
> CS student. Builder. Foundation.   ← near-white, types in
                        ← 0.6s pause
"The foundation you don't see until it's missing."  ← fades in, slightly smaller, italic
                        ← cursor blinks at end, stays forever
```

**Visual details:**
- Font: JetBrains Mono, large (clamp(2rem, 5vw, 4rem) for line 1, smaller for lines 2–3)
- `>` prompt character is `var(--accent)` coloured
- Blinking block cursor: CSS `@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`, 1s loop
- Very subtle scanline overlay: `repeating-linear-gradient` at 2px intervals, 2% opacity max — texture, not retro kitsch
- No background image. Pure `--bg-primary` (#0a0a0a).
- Subtle scroll indicator at bottom (animated chevron or text "scroll ↓") fades in after sequence completes

### 2. About

Short. No bullet points. No skill lists. Just Ahmed talking.

Suggested copy (adjust in Ahmed's voice):
> "I'm a first-year CS student based in Malaysia, originally from Yemen.
> I build things — servers, games, tools, systems — because I find it genuinely satisfying
> to make something that didn't exist before. I'm at my best when there's a hard problem
> and nobody knows the way out yet."

One paragraph. Maybe a subtle accent-coloured quote mark. No more.

### 3. Projects

**Layout:** Responsive CSS grid. One featured card (larger), rest equal size.
**Filter tags:** `[all]` `[game dev]` `[server]` `[tool]` `[cs]`
Clicking a tag filters the grid with Framer Motion layout animation (`layout` prop on each card).

**Projects to include:**

| Project | Tag | Description |
|---------|-----|-------------|
| Night City (Minecraft server) | server | Fabric server with Discord bridge (FabricCord), LuckPerms 4-tier permission system, custom Flan–Factions bridging mod |
| Planetary Claim | game dev | MMO-RTS concept inspired by Rusted Warfare, Unity, AI-first approach |
| Flan–Factions Bridge Mod | tool | Custom Fabric mod replacing Factions' chunk claiming with Flan's corner-based system |
| Alto Clef Fork | tool | "Legit-looking" Minecraft strip-mining bot — modified Alto Clef |
| Problem Marketplace | cs | Web app connecting problem-posters with developers |
| SFM Automation | cs | Super Factory Manager automation — cobblestone-to-lava + copper transfer systems |

**Card anatomy:**
```
┌─────────────────────────────┐
│ [tag pill]                  │
│                             │
│ Project Name                │  ← --font-display, 18px
│ One-line description        │  ← --fg-secondary, 13px
│                             │
│ [stack] [stack] [stack]     │  ← small icon pills
│                        →    │  ← accent arrow on hover
└─────────────────────────────┘
```

Card border becomes `var(--accent)` on hover. Subtle lift (translateY -4px).

### 4. Skills visualiser

**Not a list. Not a progress bar.**

SVG-based constellation layout. Skill nodes are circles, sized by confidence level.
Connected by faint lines within each cluster group.

**Groups / clusters:**
- Languages: C++, Java, Python, JavaScript, TypeScript
- Engines: Unity, Unreal Engine
- Systems: Linux, Server Admin, Minecraft modding
- Design: UI/UX, Figma
- Tools: Git, Next.js, Tailwind, Framer Motion

Entry animation: nodes fade in and drift to position from random offsets (Framer Motion).
On hover: node scales up, accent-coloured ring appears, tooltip shows `"Skill — using since X"`.

### 5. Journey timeline

**Vertical timeline.** Each milestone scrolls into view with a slide-in animation.
The vertical line is `--fg-tertiary`. Each dot on the line is `var(--accent)`.

**Milestones (in order):**

```
2006  Born in Seiyun, Yemen
2022  Chess Club Manager — high school leadership
2023  Started serious programming — C++, game dev
2024  Moved to Malaysia
2025  First semester at UNITEN, Kajang
2025  Built Night City — Fabric Minecraft server
2025  Started Planetary Claim — MMO-RTS in Unity
2026  Actively exploring scholarships (NL / DE / CN)
NOW   Building. Always building.
```

Each milestone card: year (accent colour), title (bold), 1–2 line description.

### 6. Contact

Keep the modal concept from v1. Improve styling to match v2 design system.

**Trigger:** "Contact" in nav, or a floating bottom-right button.
**Modal content:** Name, email, message fields. Submit sends to Ahmed's email via a simple API route.
**Style:** Dark modal (`--bg-secondary`), accent-coloured focus rings on inputs, accent-coloured submit button.

---

## Tech Stack

```json
{
  "framework": "Next.js 15 (App Router)",
  "language": "TypeScript (strict mode)",
  "styling": "Tailwind CSS v4 + CSS custom properties",
  "animation": "Framer Motion",
  "components": "shadcn/ui (base components only, heavily customised)",
  "fonts": "Google Fonts — Space Grotesk, JetBrains Mono, Inter",
  "content": "MDX (for future blog/devlogs)",
  "analytics": "Vercel Analytics + Speed Insights",
  "api": "GitHub REST API (public, no auth) for mood system",
  "deployment": "Vercel (existing account, existing domain roocky.dev)",
  "node": "24.x"
}
```

---

## Build Phases

### Phase 01 — Scaffolding (Day 1, ~2 hrs)
- [ ] `npx create-next-app@latest roocky-v2 --typescript --app --tailwind`
- [ ] Add CSS design tokens to `globals.css`
- [ ] Install: `framer-motion`, `shadcn/ui`, `@vercel/analytics`, `@vercel/speed-insights`
- [ ] Add Google Fonts to `layout.tsx`
- [ ] Connect to Vercel, set up `v2.roocky.dev` preview domain
- [ ] Create folder structure: `components/`, `hooks/`, `lib/`, `data/`

### Phase 02 — Mood accent system (Day 1–2, ~3 hrs)
- [ ] Create `hooks/useMoodAccent.ts`
- [ ] Fetch GitHub API in a Next.js API route (`/api/mood`) to avoid CORS
- [ ] Apply `--accent` to `document.documentElement` on mount
- [ ] Build `<StatusDot />` component for nav
- [ ] Add CSS transition to `*` selector in globals
- [ ] Test all three states manually by mocking the API response

### Phase 03 — Hero (Day 2–3, ~4 hrs)
- [ ] Build `<Hero />` component
- [ ] Implement typewriter sequence with Framer Motion `staggerChildren`
- [ ] Add blinking cursor CSS animation
- [ ] Add scanline overlay (CSS only, no image)
- [ ] Add scroll indicator that fades in after sequence completes
- [ ] Mobile: scale font down gracefully, keep sequence intact

### Phase 04 — Projects (Day 3–4, ~5 hrs)
- [ ] Create `data/projects.ts` with all project data
- [ ] Build `<ProjectCard />` component
- [ ] Build `<ProjectGrid />` with filter tag logic
- [ ] Implement Framer Motion layout animation on filter change
- [ ] Wire up GitHub API for live star counts (optional, nice to have)

### Phase 05 — Skills visualiser (Day 4, ~2 hrs)
- [ ] Create `data/skills.ts` with skill groups and confidence scores
- [ ] Build `<SkillsConstellation />` with SVG + Framer Motion
- [ ] Position nodes in cluster groups with collision avoidance (simple grid + jitter)
- [ ] Add hover tooltip component

### Phase 06 — Journey timeline (Day 5, ~3 hrs)
- [ ] Create `data/timeline.ts` with milestone data
- [ ] Build `<Timeline />` with `whileInView` scroll reveals
- [ ] Style the vertical line, dots, and milestone cards

### Phase 07 — Contact & polish (Day 5–7, ~4 hrs)
- [ ] Improve `<ContactModal />` from v1 concept
- [ ] Add Next.js API route for form submission
- [ ] Implement page-load animation sequence (nav fades in after hero completes)
- [ ] Open Graph image with `@vercel/og`
- [ ] Full mobile pass (375px breakpoint check on every section)
- [ ] Lighthouse audit — target 95+ all metrics
- [ ] Flip DNS from old repo to v2 when ready

---

## File Structure (target)

```
roocky-v2/
├── app/
│   ├── layout.tsx          ← fonts, metadata, Analytics, StatusDot
│   ├── page.tsx            ← all sections in order
│   └── api/
│       ├── mood/route.ts   ← GitHub API proxy for mood system
│       └── contact/route.ts ← email form handler
├── components/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── ProjectCard.tsx
│   ├── ProjectGrid.tsx
│   ├── SkillsConstellation.tsx
│   ├── Timeline.tsx
│   ├── ContactModal.tsx
│   ├── StatusDot.tsx
│   └── Nav.tsx
├── hooks/
│   └── useMoodAccent.ts
├── data/
│   ├── projects.ts
│   ├── skills.ts
│   └── timeline.ts
├── lib/
│   └── utils.ts
├── public/
│   └── (static assets)
├── styles/
│   └── globals.css         ← design tokens, base styles
├── CLAUDE.md               ← this file
└── next.config.ts
```

---

## Constraints & Rules for Claude Code

1. **Always use TypeScript strict mode.** No `any` types. No `// @ts-ignore`.
2. **All colours go through CSS custom properties.** Never hardcode hex values in component styles — use `var(--accent)`, `var(--bg-primary)`, etc.
3. **Framer Motion for all animations.** No raw CSS transitions for anything interactive. CSS transitions only for the global `--accent` colour shift.
4. **Mobile-first.** Write styles for 375px first, scale up. Every component must look intentional on mobile.
5. **No placeholder content in commits.** Every section ships with real content from `data/` files.
6. **Keep components small.** If a component exceeds ~120 lines, split it.
7. **The mood system is non-negotiable.** It must be wired up before the hero is built — everything depends on `--accent`.
8. **Comment the `useMoodAccent` hook thoroughly.** It's the most novel part of the codebase and needs to be maintainable.

---

## Quick Reference — Locked Decisions

| Decision | Value |
|----------|-------|
| Tagline | "The foundation you don't see until it's missing." |
| Default accent | `#FFD60A` (yellow) |
| Pressure accent | `#FF3B30` (red) |
| Resting accent | `#30D158` (green) |
| Background | `#0a0a0a` |
| Hero font | JetBrains Mono |
| Display font | Space Grotesk |
| Hero prompt char | `>` in accent colour |
| Framework | Next.js 15, App Router |
| Animation lib | Framer Motion |
| Deployment | Vercel, roocky.dev |

---

*Generated from planning session with Claude, March 2026.*
*Start with Phase 01 unless otherwise directed.*
