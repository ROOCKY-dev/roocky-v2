# Colour & Typography — Systematic Visual Foundations

> Load this file when building colour systems, selecting palettes, defining type scales, or specifying design tokens.

## Table of Contents

### Colour
1. [The 60-30-10 Rule](#the-60-30-10-rule)
2. [Semantic Colour Systems](#semantic-colour-systems)
3. [Algorithmic Palette Generation](#algorithmic-palette-generation)
4. [Dark Mode Systems](#dark-mode-systems)
5. [Palette Archetypes](#palette-archetypes)

### Typography
6. [Modular Type Scales](#modular-type-scales)
7. [Fluid Typography (CSS clamp)](#fluid-typography)
8. [Font Pairing Strategies](#font-pairing-strategies)
9. [Typographic Tokens](#typographic-tokens)
10. [Performance Considerations](#font-performance)

---

## The 60-30-10 Rule

### Definition
A colour distribution framework borrowed from interior design. Allocate your palette as:
- **60% — Dominant:** Background, surfaces, large containers. Sets the overall tone.
- **30% — Secondary:** Cards, navigation, secondary surfaces, supporting elements. Creates visual interest.
- **10% — Accent:** CTAs, active states, highlights, brand moments. Draws the eye to what matters.

### In Practice

```
Light Theme Example:
  60%: #FFFFFF (white background)        — Page background, content areas
  30%: #F1F5F9 (slate 100)              — Cards, sidebars, input backgrounds
  10%: #2563EB (blue 600)               — Primary buttons, links, active indicators

Dark Theme Example:
  60%: #0F172A (slate 900)              — Page background
  30%: #1E293B (slate 800)              — Cards, panels, elevated surfaces
  10%: #38BDF8 (sky 400)               — Accent, active states, links
```

### Common Mistakes
- **50/50 split:** Two colours fighting for dominance. Always establish a clear hierarchy.
- **Too much accent:** When accent exceeds ~15% of visual surface, it stops being an accent and becomes noise. The eye has nowhere to rest.
- **Flat 60%:** The dominant colour doesn't have to be ONE colour — it can be a tight range (e.g., white + very light grey) as long as it reads as a single tonal family.

---

## Semantic Colour Systems

### Definition
Map colours to *meaning*, not to visual preference. Every colour in the system has a defined role, and that role is consistent across every screen.

### Standard Semantic Roles

```
/* Surfaces & Backgrounds */
--color-bg-primary:      /* Main app background */
--color-bg-secondary:    /* Cards, panels, grouped content */
--color-bg-tertiary:     /* Nested containers, input fields */
--color-bg-inverse:      /* Inverse surface (dark on light, light on dark) */

/* Text */
--color-text-primary:    /* Headings, primary content — highest contrast */
--color-text-secondary:  /* Descriptions, metadata — reduced emphasis */
--color-text-tertiary:   /* Placeholders, disabled labels — lowest emphasis */
--color-text-inverse:    /* Text on inverse/coloured backgrounds */
--color-text-link:       /* Hyperlinks — must be distinguishable from body text */

/* Interactive */
--color-interactive-primary:   /* Primary CTA fill */
--color-interactive-hover:     /* Primary CTA hover state */
--color-interactive-active:    /* Primary CTA pressed state */
--color-interactive-disabled:  /* Disabled interactive elements */

/* Feedback */
--color-success:         /* #22C55E — Confirmation, positive states */
--color-success-bg:      /* #F0FDF4 — Success container background */
--color-warning:         /* #F59E0B — Caution, needs attention */
--color-warning-bg:      /* #FFFBEB — Warning container background */
--color-error:           /* #EF4444 — Destructive, error states */
--color-error-bg:        /* #FEF2F2 — Error container background */
--color-info:            /* #3B82F6 — Informational states */
--color-info-bg:         /* #EFF6FF — Info container background */

/* Borders & Dividers */
--color-border-default:  /* Standard borders — subtle */
--color-border-strong:   /* Emphasised borders — inputs, focused elements */
--color-border-subtle:   /* Dividers, hairlines */
```

### Generation Methodology
1. Start with your brand/primary colour
2. Derive surface colours by desaturating and lightening (light mode) or darkening (dark mode)
3. Generate feedback colours independently — don't derive them from the brand colour (red should always look like "error red," not "brand-tinted red")
4. Test every text-on-background combination for WCAG AA contrast (4.5:1 for normal text, 3:1 for large text)

---

## Algorithmic Palette Generation

### HSL-Based Approach
The most predictable method for generating colour scales from a single seed:

```
Given seed colour: hsl(220, 90%, 50%)  — a vivid blue

Generate a 10-step scale by adjusting LIGHTNESS:
  50  (lightest):  hsl(220, 95%, 97%)   — near-white tint
  100:             hsl(220, 92%, 92%)
  200:             hsl(220, 90%, 82%)
  300:             hsl(220, 88%, 70%)
  400:             hsl(220, 86%, 60%)
  500 (seed):      hsl(220, 90%, 50%)   — your primary
  600:             hsl(220, 88%, 42%)
  700:             hsl(220, 85%, 34%)
  800:             hsl(220, 80%, 26%)
  900 (darkest):   hsl(220, 75%, 18%)   — near-black shade

Key: Saturation should DECREASE as lightness approaches extremes.
Pure white and pure black are inherently desaturated.
```

### OKLCH-Based Approach (Recommended for 2025+)
OKLCH is a perceptually uniform colour space. Unlike HSL, equal steps in OKLCH produce colours that *look* equally spaced to the human eye.

```css
/* OKLCH colour generation */
--primary-50:  oklch(0.97 0.01 240);    /* Lightest */
--primary-100: oklch(0.92 0.03 240);
--primary-200: oklch(0.82 0.08 240);
--primary-300: oklch(0.70 0.14 240);
--primary-400: oklch(0.60 0.18 240);
--primary-500: oklch(0.50 0.20 240);    /* Primary */
--primary-600: oklch(0.42 0.18 240);
--primary-700: oklch(0.34 0.15 240);
--primary-800: oklch(0.26 0.12 240);
--primary-900: oklch(0.18 0.08 240);    /* Darkest */
```

### Complementary & Analogous Approaches

**Complementary (maximum contrast):** Rotate hue by 180°. Use for accent vs. primary.
**Analogous (harmonious):** Rotate hue by ±30°. Use for secondary and tertiary roles.
**Triadic (balanced variety):** Rotate hue by ±120°. Use for data visualisation where 3 distinct categories need differentiation.
**Split-complementary (softer contrast):** Rotate hue by ±150°. A safer alternative to pure complementary.

---

## Dark Mode Systems

### It's Not Just Inverting Colours
Dark mode is a distinct design surface with its own rules. Simply swapping black and white creates an illegible, harsh interface.

### Core Rules

**1. Surface Hierarchy (Light on Dark)**
```
Light Mode:                    Dark Mode:
  White (#FFFFFF)      →       Dark 1 (#121212) — base background
  Light Grey (#F5F5F5) →       Dark 2 (#1E1E1E) — elevated surface
  Med Grey (#E0E0E0)   →       Dark 3 (#2C2C2C) — cards, dialogs
  Dark (#333333)       →       Dark 4 (#383838) — highest elevation
```

Higher elevation = lighter in dark mode (the opposite of light mode where elevation adds shadow).

**2. Text Contrast**
- Primary text: use white at 87% opacity (`rgba(255,255,255,0.87)`) rather than pure `#FFFFFF`. Pure white on dark backgrounds causes halation (glow effect) that strains the eyes.
- Secondary text: white at 60% opacity
- Disabled text: white at 38% opacity

**3. Colour Adjustments**
- Desaturate your brand colours by 10-20% for dark mode. Saturated colours on dark backgrounds vibrate and strain the eye.
- Error red: lighten from #EF4444 to #F87171 (red 400) on dark surfaces
- Success green: lighten from #22C55E to #4ADE80 (green 400) on dark surfaces
- Never use pure black (#000000) as the base background — it creates too much contrast with text and makes OLED screens look "inky." Use #121212 or #0F172A (dark slate) minimum.

**4. Shadows in Dark Mode**
Shadows are nearly invisible on dark backgrounds. Replace elevation shadows with:
- Subtle border: `1px solid rgba(255,255,255,0.06)`
- Background colour stepping (lighter = higher)
- A very faint glow: `box-shadow: 0 0 20px rgba(0,0,0,0.5)` (deepens the darkness around, rather than adding light)

---

## Palette Archetypes

Quick-reference palettes for common emotional targets:

### Neutral / Professional (`[HIGH-TRUST]`)
```
Background:  #FFFFFF
Surface:     #F8FAFC
Primary:     #1E40AF (blue 800 — authoritative, stable)
Text:        #1E293B (slate 800)
Accent:      #2563EB (blue 600)
```

### Warm / Friendly (`[WARM]` `[PLAYFUL]`)
```
Background:  #FFFBF5
Surface:     #FFF7ED
Primary:     #EA580C (orange 600 — energetic, approachable)
Text:        #431407 (orange 950)
Accent:      #F97316 (orange 500)
```

### High-Contrast / Edgy (`[EDGY]` `[YOUTHFUL]`)
```
Background:  #000000
Surface:     #18181B
Primary:     #FACC15 (yellow 400 — electric, attention-demanding)
Text:        #FAFAFA
Accent:      #A855F7 (purple 500)
```

### Dark / Immersive (`[IMMERSIVE]` `[DARK]`)
```
Background:  #0A0A0F
Surface:     #13131A
Primary:     #6366F1 (indigo 500 — deep, cinematic)
Text:        rgba(255,255,255,0.87)
Accent:      #818CF8 (indigo 400)
```

### Retro / Nostalgic (`[RETRO]`)
```
Background:  #FDF6E3 (solarised light)
Surface:     #EEE8D5
Primary:     #B58900 (warm gold)
Text:        #073642 (dark teal)
Accent:      #CB4B16 (burnt orange)
```

---

## Modular Type Scales

### Definition
A type scale derived from a consistent mathematical ratio, creating a harmonious visual rhythm across all text sizes.

### Common Ratios

```
Minor Second:    1.067  — Very tight, for dense UIs
Major Second:    1.125  — Subtle, professional. Good for data-heavy apps.
Minor Third:     1.200  — Balanced. The safest general-purpose choice.
Major Third:     1.250  — Expressive but controlled. Great for marketing + app hybrid.
Perfect Fourth:  1.333  — Bold hierarchy. Strong for editorial/magazine layouts.
Augmented Fourth: 1.414 — Dramatic. For hero-driven marketing pages.
Perfect Fifth:   1.500  — Very dramatic. Only for minimal-content pages.
Golden Ratio:    1.618  — Maximum drama. Beautiful but impractical for dense UIs.
```

### Generating a Scale

Base size: 16px (web standard, equals 1rem). Apply the ratio:

```
Using Minor Third (1.200) with 16px base:

Caption:        11px  (16 ÷ 1.2 ÷ 1.2)
Body Small:     13px  (16 ÷ 1.2)
Body:           16px  (base)
Body Large:     19px  (16 × 1.2)
Heading 3:      23px  (16 × 1.2²)
Heading 2:      28px  (16 × 1.2³)
Heading 1:      33px  (16 × 1.2⁴)
Display Medium: 40px  (16 × 1.2⁵)
Display Large:  48px  (16 × 1.2⁶)
```

### Line Height Rules
- Display text (>32px): 1.1–1.2 line height (tight)
- Headings (20-32px): 1.2–1.3 line height
- Body text (14-18px): 1.5–1.7 line height (generous for readability)
- Captions (<14px): 1.4–1.5 line height

### Font Weight Distribution
- Display: 700-900 (bold/black) — pure attention-grabbing
- Headings: 600-700 (semibold/bold) — structural hierarchy
- Body: 400 (regular) — maximum readability
- Emphasis within body: 500-600 (medium/semibold), not 700+ (too heavy in running text)
- Captions/metadata: 400-500

---

## Fluid Typography

### The `clamp()` Approach
Fluid typography scales smoothly between viewport sizes without media query jumps:

```css
/* Syntax: clamp(minimum, preferred, maximum) */

/* Body: 16px at 375px viewport, scales to 18px at 1440px */
body {
  font-size: clamp(1rem, 0.925rem + 0.375vw, 1.125rem);
}

/* Heading 1: 28px at 375px, scales to 48px at 1440px */
h1 {
  font-size: clamp(1.75rem, 1.05rem + 1.875vw, 3rem);
}

/* Display: 36px at 375px, scales to 72px at 1440px */
.display {
  font-size: clamp(2.25rem, 1rem + 3.375vw, 4.5rem);
}
```

### Calculating the `preferred` value
Formula: `preferred = min + (max - min) × ((100vw - min-viewport) / (max-viewport - min-viewport))`

Simplified in CSS: `clamp(MIN, CALC, MAX)` where CALC = `MIN + (MAX - MIN) * (vw-portion)`

**Practical shortcut:** Use a fluid type scale calculator (utopia.fyi, type-scale.com) and export the CSS custom properties. Don't hand-calculate.

---

## Font Pairing Strategies

### The Contrast Principle
Good font pairs create contrast on ONE axis while maintaining harmony on others.

**Contrast axes:**
- Serif vs. sans-serif (most common pairing strategy)
- Geometric vs. humanist
- High x-height vs. low x-height
- Condensed vs. extended
- Light weight vs. heavy weight

### Reliable Pairing Archetypes

**1. Authority + Readability (editorial, premium)**
```
Display: Playfair Display (serif, high contrast, elegant)
Body:    Source Sans 3 (sans-serif, neutral, readable)
```

**2. Modern + Clean (SaaS, tech products)**
```
Display: Outfit (geometric sans, contemporary)
Body:    DM Sans (geometric sans, excellent readability)
```

**3. Expressive + Neutral (creative, portfolio)**
```
Display: Fraunces (variable serif, quirky optical sizing)
Body:    Inter (neo-grotesque sans, highly legible)
```

**4. Monospace + Sans (developer tools, tech)**
```
Display: JetBrains Mono (monospace, code-native)
Body:    IBM Plex Sans (humanist sans, pairs with mono)
```

**5. Bold + Refined (marketing, landing pages)**
```
Display: Clash Display (bold geometric sans)
Body:    Satoshi (clean geometric sans, lighter weight)
```

### Anti-Patterns
- ❌ Two serif fonts from different eras (they'll fight)
- ❌ Two geometric sans fonts at similar weights (indistinguishable)
- ❌ More than 2 font families in a single interface (3 max if one is monospace for code)
- ❌ Pairing fonts with clashing x-heights (the baseline rhythm looks broken)

---

## Typographic Tokens

### Definition
A complete token set for a design system's typography, exportable as CSS custom properties:

```css
:root {
  /* Font Families */
  --font-display: 'Outfit', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Font Sizes (using modular scale) */
  --text-xs:   0.6875rem;   /* 11px */
  --text-sm:   0.8125rem;   /* 13px */
  --text-base: 1rem;        /* 16px */
  --text-lg:   1.1875rem;   /* 19px */
  --text-xl:   1.4375rem;   /* 23px */
  --text-2xl:  1.75rem;     /* 28px */
  --text-3xl:  2.0625rem;   /* 33px */
  --text-4xl:  2.5rem;      /* 40px */
  --text-5xl:  3rem;        /* 48px */

  /* Line Heights */
  --leading-tight:   1.1;
  --leading-snug:    1.3;
  --leading-normal:  1.5;
  --leading-relaxed: 1.65;

  /* Font Weights */
  --weight-regular:  400;
  --weight-medium:   500;
  --weight-semibold: 600;
  --weight-bold:     700;
  --weight-black:    900;

  /* Letter Spacing */
  --tracking-tight:  -0.02em;
  --tracking-normal: 0;
  --tracking-wide:   0.025em;
  --tracking-wider:  0.05em;
  --tracking-widest: 0.1em;
}
```

---

## Font Performance

### Loading Strategy
1. **Preload critical fonts:** `<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>`
2. **Use `font-display: swap`:** Text renders immediately in fallback font, then swaps when the web font loads. Prevents invisible text.
3. **Subset fonts:** Only include the character sets you need. A full Unicode font can be 200KB+. Latin-only subsets are typically 15-30KB.
4. **Use variable fonts:** A single variable font file replaces multiple weight/style files. One 50KB file instead of four 30KB files.
5. **Limit font families:** Each family requires a separate HTTP request (even with HTTP/2). Two families is the practical maximum for performance-sensitive sites.

### Format Priority
```html
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');  /* Modern browsers — smallest, fastest */
  font-display: swap;
  font-weight: 100 900;                    /* Variable font weight range */
}
```

WOFF2 is the only format needed for modern browsers (95%+ global support). Only add WOFF as a fallback if you must support very old browsers.

### System Font Stack (Zero-Load-Time Fallback)
```css
font-family:
  -apple-system,           /* macOS, iOS */
  BlinkMacSystemFont,      /* Chrome on macOS */
  'Segoe UI',              /* Windows */
  Roboto,                  /* Android, Chrome OS */
  'Noto Sans',             /* Linux, CJK support */
  'Helvetica Neue',        /* Older macOS */
  sans-serif;              /* Ultimate fallback */
```
Use this as the body font when load time is the highest priority (internal tools, performance-critical apps).
