# Design Philosophies — Visual Style Reference

> Load this file when selecting or recommending a visual direction for a project.
> Each philosophy includes: definition, emotional register, when to use it, when to avoid it, and exact implementation properties.

## Table of Contents
1. [Glassmorphism (Apple-esque)](#glassmorphism)
2. [Material Design 3 Expressive](#material-design-3)
3. [Neobrutalism](#neobrutalism)
4. [Bauhaus Minimalism](#bauhaus-minimalism)
5. [Skeuomorphism & Neumorphism](#skeuomorphism-neumorphism)
6. [Corporate Flat](#corporate-flat)
7. [AI-Native Patterns](#ai-native-patterns)
8. [Bento Grid](#bento-grid)

---

## Glassmorphism

### Definition
A visual style that simulates frosted glass through background blur, transparency, and subtle border highlights. Popularised by Apple's macOS Big Sur (2020) and iOS design language. Creates depth and hierarchy through layered translucent surfaces rather than opaque cards.

### Emotional Register
Premium, sophisticated, calm, futuristic, immersive. Communicates high production value and attention to craft.

### When to Use
- Consumer products targeting design-conscious audiences
- Media players, creative tools, lifestyle apps
- Dark-mode-first interfaces where glass creates dramatic depth
- Landing pages and marketing sites aiming for visual wow
- Products where the background (imagery, gradients, video) is part of the storytelling

### When to Avoid
- Data-dense enterprise dashboards (blur interferes with readability)
- Products requiring maximum text legibility (medical, legal, financial)
- Low-powered devices or contexts where CSS `backdrop-filter` performance is a concern
- Projects requiring IE11 or legacy browser support (backdrop-filter unsupported)

### Implementation Properties

```css
/* Core glassmorphism surface */
.glass-card {
  background: rgba(255, 255, 255, 0.08);      /* 5-15% opacity for dark themes */
  /* background: rgba(255, 255, 255, 0.65);   /* 50-75% for light themes */
  backdrop-filter: blur(12px);                  /* 8px-24px range; 12px is the sweet spot */
  -webkit-backdrop-filter: blur(12px);          /* Safari support */
  border: 1px solid rgba(255, 255, 255, 0.12); /* Simulates edge-light refraction */
  border-radius: 16px;                          /* 12px-24px; larger = softer */
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.12),            /* Ambient shadow for depth */
    inset 0 1px 0 rgba(255, 255, 255, 0.08);   /* Top-edge highlight */
}

/* Background requirement: glassmorphism NEEDS a rich background to blur against */
.glass-container {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  /* OR use a background image / animated gradient mesh */
}
```

**Critical details:**
- The background behind glass *must* have visual complexity (gradients, images, or colour fields). Glass over a flat white background is just a semi-transparent box.
- Nest glass layers for hierarchy: outer container at 8% opacity, inner card at 12%, tooltip at 18%.
- Text on glass must have extra contrast consideration — use text-shadow or a slightly more opaque text container to ensure WCAG AA compliance.
- Pair with subtle `box-shadow` to separate glass layers from each other (pure transparency without shadow loses depth).

---

## Material Design 3

### Definition
Google's design system, now in its "Expressive" evolution (announced Google I/O 2025). Built around dynamic colour, spring-based motion physics, adaptive shapes, and a deeply systematic approach to theming. M3 Expressive emphasises emotional resonance: interfaces that feel alive, with bouncy animations, enhanced haptic feedback, and user-personalised colour derived from wallpapers or brand palettes.

### Emotional Register
Friendly, systematic, approachable, trustworthy. M3 Expressive adds warmth, playfulness, and emotional connection through motion and colour personalisation.

### When to Use
- Android-first or cross-platform apps
- Products that need a systematic, well-documented design foundation
- Teams wanting mature component libraries with built-in accessibility
- Apps where personalisation (dynamic colour) is a differentiator
- Educational, productivity, and lifestyle apps

### When to Avoid
- Products requiring a radically unique visual identity (M3 is recognisably "Google")
- Ultra-premium luxury brands that need bespoke, non-systematic aesthetics
- Projects where the Material component library creates unwanted visual uniformity

### Implementation Properties

```
/* M3 Colour Roles (generate via Material Theme Builder) */
--md-sys-color-primary:           /* Derived from seed colour */
--md-sys-color-on-primary:        /* Text/icons on primary */
--md-sys-color-primary-container: /* Filled container using primary */
--md-sys-color-secondary:         /* Less prominent actions */
--md-sys-color-tertiary:          /* Complementary accents */
--md-sys-color-surface:           /* Base surface */
--md-sys-color-surface-variant:   /* Cards, inputs */
--md-sys-color-outline:           /* Borders, dividers */
--md-sys-color-error:             /* Error states */

/* M3 Typography Scale */
Display Large:   57px / 64 line-height / -0.25 tracking
Display Medium:  45px / 52 line-height / 0 tracking
Display Small:   36px / 44 line-height / 0 tracking
Headline Large:  32px / 40 line-height / 0 tracking
Headline Medium: 28px / 36 line-height / 0 tracking
Headline Small:  24px / 32 line-height / 0 tracking
Title Large:     22px / 28 line-height / 0 tracking
Title Medium:    16px / 24 line-height / +0.15 tracking
Title Small:     14px / 20 line-height / +0.1 tracking
Body Large:      16px / 24 line-height / +0.5 tracking
Body Medium:     14px / 20 line-height / +0.25 tracking
Body Small:      12px / 16 line-height / +0.4 tracking
Label Large:     14px / 20 line-height / +0.1 tracking
Label Medium:    12px / 16 line-height / +0.5 tracking
Label Small:     11px / 16 line-height / +0.5 tracking

/* M3 Shape Scale (5 levels of roundedness) */
Extra-Small:  4px
Small:        8px
Medium:       12px
Large:        16px
Extra-Large:  28px

/* M3 Expressive Motion (spring-based, announced 2025) */
Easing:    cubic-bezier(0.2, 0.0, 0.0, 1.0)  /* Emphasised deceleration */
Duration:  Short: 200ms | Medium: 300ms | Long: 500ms
Spring:    Stiffness ~300, Damping ~25 (for bouncy, organic feel)

/* M3 Elevation (tonal, not shadow-based) */
Level 0:  Surface colour
Level 1:  Surface + primary tint at 5%
Level 2:  Surface + primary tint at 8%
Level 3:  Surface + primary tint at 11%
Level 4:  Surface + primary tint at 12%
Level 5:  Surface + primary tint at 14%
```

**Critical details:**
- M3 Expressive replaces shadow-based elevation with *tonal* elevation: higher surfaces get a progressively stronger tint of the primary colour. This is a major departure from Material 2.
- Dynamic Colour: on Android 12+, the system generates a full colour palette from the user's wallpaper. Design for this by ensuring your layouts work with *any* primary colour, not just your brand colour.
- Use Google's Material Theme Builder (Figma plugin or web tool) to generate token sets from a seed colour.

---

## Neobrutalism

### Definition
A digital rebellion against polished, homogeneous UI. Characterised by raw, unrefined aesthetics: stark black borders, vivid unblended colours, visible grid structure, and deliberate "ugliness" as a design choice. Draws from brutalist architecture and 1990s web design, filtered through a contemporary lens. Think "newspaper meets punk zine meets web app."

### Emotional Register
Bold, rebellious, authentic, youthful, anti-corporate. Communicates confidence, irreverence, and a refusal to conform.

### When to Use
- Gen-Z / youth-oriented products (social, creative tools, communities)
- Personal brands, portfolios, creative agency sites
- Products that want to stand out in a sea of sanitised SaaS
- Projects where "personality" is the primary differentiator
- Indie games, music platforms, underground culture

### When to Avoid
- Financial services, healthcare, government (trust destruction risk)
- Enterprise B2B tools (perception of unprofessionalism)
- Any context where user trust depends on visual polish
- Audiences over 45 who may perceive it as broken rather than intentional

### Implementation Properties

```css
/* Core neobrutalist surface */
.brutalist-card {
  background: #FFDE59;                          /* Vivid, saturated, unapologetic */
  border: 3px solid #000000;                    /* Thick, visible, no subtlety */
  border-radius: 0;                             /* Sharp corners — softness is the enemy */
  box-shadow: 6px 6px 0px #000000;             /* Hard offset shadow, no blur */
  padding: 24px;
  font-family: 'IBM Plex Mono', 'Space Mono', monospace;
}

.brutalist-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0px #000000;             /* Shadow grows on hover = depth shift */
}

.brutalist-button {
  background: #FF6B6B;
  border: 3px solid #000000;
  border-radius: 0;
  box-shadow: 4px 4px 0px #000000;
  padding: 12px 24px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.1s ease;                    /* Snappy, not smooth */
}

.brutalist-button:active {
  transform: translate(4px, 4px);
  box-shadow: 0px 0px 0px #000000;             /* Pressed = shadow collapses */
}
```

**Colour palette approach:**
- Use 3-5 highly saturated, contrasting colours. No gradients. No opacity. Flat and fierce.
- Classic combos: black + electric yellow (#FFDE59), black + hot pink (#FF6B6B), black + electric blue (#4ECDC4)
- White or off-white (#FAFAFA) as breathing space between loud elements

**Typography:**
- Monospace fonts (IBM Plex Mono, Space Mono, JetBrains Mono) for that "raw code" feel
- OR ultra-bold display fonts (Archivo Black, Bebas Neue) for headlines
- Mix weights aggressively: 800 weight headlines next to 400 weight body
- Oversized display text (48-96px) is a signature move

---

## Bauhaus Minimalism

### Definition
Inspired by the Bauhaus school (1919-1933): form follows function, geometric precision, primary colours used sparingly, and a belief that clarity is the highest form of beauty. In digital contexts, this translates to generous whitespace, systematic grids, restrained colour, and typography as the primary design element.

### Emotional Register
Refined, intellectual, confident, timeless, trustworthy. Communicates competence through restraint.

### When to Use
- Portfolio sites, architecture firms, design agencies
- Premium consumer products (luxury, fashion, high-end retail)
- Editorial / publishing platforms
- Any product where content must breathe and readability is paramount
- Products targeting design-literate or professional audiences

### When to Avoid
- Products targeting children or very casual audiences (too austere)
- Data-dense applications where whitespace is a luxury you can't afford
- Products that rely on emotional excitement / dopamine hits (gaming, social)

### Implementation Properties

```css
/* Bauhaus-inspired minimal surface */
.minimal-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 64px 32px;                          /* Generous, breathing space */
}

.minimal-card {
  background: #FFFFFF;
  border: none;                                 /* No visible borders */
  border-bottom: 1px solid #E0E0E0;            /* Only structural dividers */
  padding: 32px 0;
}

/* Typography IS the design in Bauhaus minimalism */
.minimal-display {
  font-family: 'Neue Haas Grotesk', 'Helvetica Neue', sans-serif;
  font-size: clamp(2.5rem, 5vw, 5rem);         /* Fluid, responsive */
  font-weight: 500;                             /* Not bold — medium weight carries authority */
  letter-spacing: -0.02em;                      /* Tight tracking for display sizes */
  line-height: 1.1;
  color: #1A1A1A;                               /* Near-black, not pure black */
}

.minimal-body {
  font-family: 'Neue Haas Grotesk', 'Helvetica Neue', sans-serif;
  font-size: 1rem;                              /* 16px base */
  font-weight: 400;
  line-height: 1.6;                             /* Generous for readability */
  color: #4A4A4A;                               /* Softer than headlines */
  max-width: 65ch;                              /* Optimal reading width */
}
```

**Layout principles:**
- 8px base grid. Everything aligns to it. No exceptions.
- Column grid: 12-column at desktop (1200px), 8-column at tablet, 4-column at mobile
- Whitespace ratios: section spacing should be at least 2× the content block height
- Asymmetric layouts with a clear visual hierarchy: one large element paired with supporting small elements

**Colour:**
- Near-black (#1A1A1A) + white (#FFFFFF) as the foundation
- ONE accent colour, used extremely sparingly (< 10% of visual surface area)
- Classic Bauhaus accents: #DE4B38 (red), #2D5DA1 (blue), #F7C948 (yellow)

---

## Skeuomorphism & Neumorphism

### Definition
**Skeuomorphism** replicates real-world materials and textures in digital interfaces — leather, wood, metal, paper, stitching. Dominated early iOS (pre-iOS 7). **Neumorphism** is its spiritual successor: soft, extruded shapes that appear to emerge from or be pressed into a monochromatic background, using carefully paired light and dark shadows.

### Emotional Register
- Skeuomorphism: Familiar, tangible, warm, nostalgic
- Neumorphism: Soft, futuristic, tactile, serene

### When to Use
- Neumorphism: Smart home controls, music players, calculator apps, fitness trackers — anything with knobs, dials, or toggle states
- Skeuomorphism: Nostalgia-driven products, note-taking apps, digital instrument interfaces
- Both: When you want UI elements to feel physically manipulable

### When to Avoid
- ⚠️ **Neumorphism has severe accessibility issues.** The soft shadows that define elements often fail WCAG contrast requirements. Never use it as the primary design system for information-dense or text-heavy interfaces.
- Complex layouts with many elements (neumorphic shadows create visual mush at density)
- Any context requiring clear interactive affordances (neumorphic buttons can look identical to decorative elements)

### Implementation Properties

```css
/* Neumorphic surface — LIGHT THEME */
.neumorph-card {
  background: #E0E5EC;                          /* Must match or near-match parent bg */
  border-radius: 16px;
  box-shadow:
    8px 8px 16px #B8BEC7,                       /* Dark shadow (bottom-right) */
    -8px -8px 16px #FFFFFF;                      /* Light shadow (top-left) */
  /* NO borders — shape is defined purely by shadow */
}

/* Neumorphic pressed / inset state */
.neumorph-inset {
  background: #E0E5EC;
  border-radius: 16px;
  box-shadow:
    inset 4px 4px 8px #B8BEC7,
    inset -4px -4px 8px #FFFFFF;
}

/* Neumorphic button */
.neumorph-button {
  background: #E0E5EC;
  border: none;
  border-radius: 12px;
  padding: 14px 28px;
  box-shadow:
    6px 6px 12px #B8BEC7,
    -6px -6px 12px #FFFFFF;
  transition: box-shadow 0.2s ease;
}

.neumorph-button:active {
  box-shadow:
    inset 4px 4px 8px #B8BEC7,
    inset -4px -4px 8px #FFFFFF;
}
```

**Critical constraint:** The background colour of the parent container and the neumorphic element MUST be the same (or within 2-3% lightness). If they differ, the illusion of extrusion breaks.

**Accessibility mitigation:**
- Always add a subtle 1px border (`rgba(0,0,0,0.08)`) to neumorphic interactive elements for users who can't perceive the shadow difference
- Use colour fills (not just shadow state changes) to indicate active/selected states
- Pair neumorphic controls with clear text labels — never rely on shape alone

---

## Corporate Flat

### Definition
The pragmatic workhorse of digital design. Clean surfaces, systematic colour coding, clear typographic hierarchy, and maximum information density with minimum visual noise. Evolved from Microsoft's Metro Design and the "flat design" movement of 2013-2014, now refined into the default language of SaaS, enterprise dashboards, and productivity tools.

### Emotional Register
Professional, efficient, trustworthy, reliable. Not exciting, and that's the point — it gets out of the way.

### When to Use
- Enterprise SaaS, admin panels, CMS interfaces
- Financial dashboards, analytics platforms, reporting tools
- Healthcare, government, legal — any domain where trust > aesthetics
- Internal tools where onboarding speed matters more than delight
- Data-dense interfaces where every pixel must carry information

### When to Avoid
- Consumer-facing products competing on brand personality
- Creative tools or lifestyle apps
- Anything targeting audiences under 25 (reads as boring)

### Implementation Properties

```css
/* Corporate flat surface */
.flat-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;                   /* Visible but subtle border */
  border-radius: 8px;                          /* Slightly rounded, not pill-shaped */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);  /* Barely there — just enough lift */
  padding: 24px;
}

/* Corporate flat typography */
--font-family: 'Inter', 'SF Pro Text', -apple-system, sans-serif;
--text-primary:   #1E293B;   /* Slate 800 */
--text-secondary: #64748B;   /* Slate 500 */
--text-tertiary:  #94A3B8;   /* Slate 400 */

/* Semantic colour system */
--color-primary:  #3B82F6;   /* Blue 500 — safe, universal */
--color-success:  #22C55E;   /* Green 500 */
--color-warning:  #F59E0B;   /* Amber 500 */
--color-error:    #EF4444;   /* Red 500 */
--color-info:     #6366F1;   /* Indigo 500 */

/* Data visualisation palette (distinguishable, accessible) */
--chart-1: #3B82F6;
--chart-2: #8B5CF6;
--chart-3: #EC4899;
--chart-4: #F97316;
--chart-5: #14B8A6;
--chart-6: #EAB308;
```

**Layout principles:**
- Sidebar navigation (240-280px) + content area is the canonical layout
- 16px base spacing unit. Dense mode available at 12px for power users.
- Data tables: 48px row height default, 36px compact, 56px comfortable
- Use consistent left-alignment. Centre-aligned text is reserved for empty states and hero sections only.

---

## AI-Native Patterns

### Definition
A new design paradigm emerging for products built around AI interactions: chat-based interfaces, agentic workflows, generative outputs, and intent-driven UX. This is not a visual style per se but a set of interaction and layout patterns unique to AI-first products.

### Core Patterns

**Conversational UI:**
- Message bubbles with clear role distinction (user vs. AI)
- Streaming text rendering (character-by-character or word-by-word)
- Inline rich media (code blocks, charts, images) within conversation flow
- Suggested prompts / follow-up actions below AI responses

**Agentic UX:**
- Progress indicators for multi-step AI tasks
- Transparency panels showing AI reasoning ("Here's what I'm doing...")
- Intervention points where users can redirect, pause, or correct the AI
- Confidence indicators (subtle, not anxious — avoid undermining trust)

**Generative Output:**
- Preview panels for generated content (documents, images, code)
- Version comparison (before/after, multiple variants side by side)
- Inline editing of AI output without regeneration
- "Refine" controls: sliders, toggles, or natural language adjustments

**Layout considerations:**
- Primary interaction zone (chat/prompt) should consume 60-70% of viewport width
- Context panel (references, settings, history) as a collapsible sidebar
- Generated output should render in a distinct visual zone (different surface colour, card treatment, or panel) to clearly separate AI output from user input

---

## Bento Grid

### Definition
Inspired by Japanese bento box design and popularised by Apple's product pages. Content is organised into a grid of rounded rectangular cards of varying sizes, creating a modular, scannable layout that feels satisfying and structured.

### Emotional Register
Organised, modern, scannable, visually satisfying. Communicates clarity and intentional organisation.

### When to Use
- Feature overview pages and product marketing
- Dashboard home screens and overview panels
- Portfolio showcases and case study layouts
- Settings / preferences pages
- Any context where you need to present 6-12 distinct pieces of information at once

### Implementation Properties

```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(200px, auto);
  gap: 16px;
  padding: 16px;
}

.bento-item {
  background: var(--surface);
  border-radius: 20px;                         /* Generous rounding is signature */
  padding: 24px;
  overflow: hidden;
}

/* Spanning patterns */
.bento-item--wide   { grid-column: span 2; }
.bento-item--tall   { grid-row: span 2; }
.bento-item--hero   { grid-column: span 2; grid-row: span 2; }

/* Responsive collapse */
@media (max-width: 768px) {
  .bento-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .bento-grid { grid-template-columns: 1fr; }
}
```

**Design rules:**
- Mix card sizes to avoid monotony: use a 2:1 ratio of standard to oversized cards
- Each card should communicate ONE concept — if you're cramming, the card needs splitting
- Use background colours, illustrations, or large icons inside cards rather than dense text
- Generous internal padding (24-32px) — the content should never touch the rounded corners
