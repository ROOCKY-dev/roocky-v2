# Accessibility & WCAG — The Non-Negotiables

> This file should be loaded for EVERY project. Accessibility is not a feature — it is a baseline.
> Current standard: WCAG 2.2 (W3C Recommendation, October 2023, updated December 2024).
> Legal context: WCAG 2.2 is now ISO/IEC 40500:2025. ADA Title II requires WCAG 2.1 AA compliance by April 2026 for US public entities. The European Accessibility Act (EAA) enforces EN 301 549. Design for WCAG 2.2 AA as the minimum to be future-proof.

## Table of Contents
1. [WCAG 2.2 — Quick Reference](#wcag-22-quick-reference)
2. [Colour Contrast](#colour-contrast)
3. [Typography & Readability](#typography-and-readability)
4. [Touch & Click Targets](#touch-and-click-targets)
5. [Keyboard Navigation & Focus](#keyboard-navigation-and-focus)
6. [Screen Reader Design](#screen-reader-design)
7. [Motion & Animation](#motion-and-animation)
8. [Forms & Input](#forms-and-input)
9. [WCAG 2.2 New Criteria](#wcag-22-new-criteria)
10. [Testing Checklist](#testing-checklist)

---

## WCAG 2.2 — Quick Reference

WCAG organises criteria under four principles: **POUR**

**Perceivable** — Can users perceive all content?
- Text alternatives for images (alt text)
- Captions for video/audio
- Content adaptable to different presentations (reflow, zoom)
- Sufficient colour contrast

**Operable** — Can users operate all interactive elements?
- Keyboard accessible (all functionality)
- Enough time to read and interact
- No content that could cause seizures (flashing)
- Navigable (clear headings, focus order, link purpose)
- Pointer accessible (target size, dragging alternatives)

**Understandable** — Can users understand the content and interface?
- Readable text (language declared, clear language)
- Predictable behaviour (consistent navigation, no unexpected context changes)
- Input assistance (error identification, labels, error prevention)

**Robust** — Is the content compatible with assistive technologies?
- Valid, semantic HTML
- ARIA used correctly (or not at all — improper ARIA is worse than no ARIA)
- Status messages communicated programmatically

### Conformance Levels
- **Level A:** Minimum accessibility. The bare floor.
- **Level AA:** The standard legal and professional target. This is what you should design for.
- **Level AAA:** Enhanced accessibility. Aspirational for most products; required for government/healthcare in some jurisdictions.

---

## Colour Contrast

### Requirements (WCAG 2.2, SC 1.4.3 & 1.4.6)

```
Level AA:
  Normal text (<24px / <18.5px bold):     4.5:1 contrast ratio minimum
  Large text (≥24px / ≥18.5px bold):      3:1 contrast ratio minimum
  UI components and graphical objects:     3:1 contrast ratio minimum

Level AAA:
  Normal text:                             7:1 contrast ratio
  Large text:                              4.5:1 contrast ratio
```

### Practical Application

**Text on backgrounds:**
```
✅ PASSES AA:
  #1E293B on #FFFFFF  → 12.5:1  (excellent)
  #4B5563 on #FFFFFF  → 6.3:1   (good)
  #6B7280 on #FFFFFF  → 4.6:1   (barely passes for normal text)

❌ FAILS AA:
  #9CA3AF on #FFFFFF  → 2.9:1   (common "light grey text" mistake)
  #94A3B8 on #F1F5F9  → 2.4:1   (grey on grey — very common failure)
  #FFFFFF on #FACC15  → 1.8:1   (white on yellow — always fails)
```

**Interactive state contrast:**
- Focus indicators must have 3:1 contrast against adjacent colours (SC 1.4.11)
- Hover states must be distinguishable from default states
- Disabled states are exempt from contrast requirements BUT should still be visually identifiable as disabled

### Common Failures
1. **Placeholder text:** Often set to light grey (#9CA3AF) which fails contrast. Solution: use visible labels (not placeholders) as the primary label mechanism.
2. **Coloured buttons with white text:** Test EVERY coloured button. Yellow, lime, and cyan backgrounds almost always fail with white text. Use dark text on light-coloured buttons.
3. **Glassmorphism text:** Translucent backgrounds create variable contrast depending on what's behind the glass. Solution: add a semi-opaque backing layer behind text, or use text-shadow for legibility.
4. **Gradient backgrounds:** Contrast must pass at the worst point in the gradient, not the best.
5. **Dark mode greys:** #FFFFFF on #1E1E1E is fine (16:1), but many dark mode designs use medium greys for text (#9CA3AF on #1E1E1E → 4.8:1, barely passing).

### Tools
- Contrast checker: WebAIM Contrast Checker (webaim.org/resources/contrastchecker)
- Figma plugin: Stark, A11y - Color Contrast Checker
- Browser DevTools: Chrome Lighthouse, Firefox Accessibility Inspector
- Programmatic: `getComputedStyle()` + luminance calculation

---

## Typography and Readability

### Requirements
- **SC 1.4.4 (Resize Text):** Text must be resizable up to 200% without loss of content or functionality.
- **SC 1.4.10 (Reflow):** Content must reflow at 320px CSS width (mobile) without horizontal scrolling.
- **SC 1.4.12 (Text Spacing):** Users must be able to override: line height to 1.5×, paragraph spacing to 2× font size, word spacing to 0.16× font size, letter spacing to 0.12× font size — without breaking the UI.

### Design Rules
- Use `rem` or `em` for font sizes, NEVER `px` for body text (prevents user scaling)
- Set a base font size of at least 16px. Anything smaller for body text creates readability issues.
- Maximum line length: 80 characters (ideally 65-75ch). Use `max-width: 65ch` on text containers.
- Minimum line height for body text: 1.5 (150%)
- Do NOT justify text (`text-align: justify`) — it creates uneven word spacing that harms readability, especially for users with dyslexia
- Avoid ALL CAPS for more than a few words — it reduces readability by 13-18% for continuous text
- Ensure sufficient paragraph spacing (at least 1.5× the font size between paragraphs)

### Font Choice for Accessibility
- Sans-serif fonts are generally easier to read on screens for body text
- Avoid thin/ultralight weights (below 300) for text smaller than 24px
- Fonts with clear letter differentiation (distinct Il1, O0) are more accessible: Inter, Atkinson Hyperlegible, Lexend, Open Sans
- For maximum accessibility, consider Atkinson Hyperlegible (designed specifically for low-vision readers by the Braille Institute)

---

## Touch and Click Targets

### Requirements
- **SC 2.5.8 (Target Size - Minimum, Level AA, NEW in WCAG 2.2):** Interactive targets must be at least 24×24 CSS pixels, with some exceptions
- **SC 2.5.5 (Target Size - Enhanced, Level AAA):** Targets should be at least 44×44 CSS pixels

### Platform-Specific Minimums

```
WCAG 2.2 AA:      24×24 CSS px minimum
WCAG 2.2 AAA:     44×44 CSS px
Apple HIG:         44×44 pt (points)
Material Design:   48×48 dp (density-independent pixels)
```

### Implementation

```css
/* Ensuring minimum touch target without visual enlargement */
.small-icon-button {
  /* Visual size */
  width: 24px;
  height: 24px;
  
  /* Touch target expansion via padding */
  padding: 12px;
  margin: -12px;              /* Compensate for padding to maintain visual position */
  
  /* OR use ::before/::after for invisible hit area */
  position: relative;
}

.small-icon-button::before {
  content: '';
  position: absolute;
  top: -12px;
  right: -12px;
  bottom: -12px;
  left: -12px;
}
```

### Spacing Between Targets
- Minimum 8px gap between adjacent interactive elements
- If targets are at the WCAG minimum (24px), spacing becomes critical — 8px gap prevents adjacent activation
- Inline links within text: ensure the line height provides enough vertical target area (line-height ≥ 1.5 helps)

### Common Failures
1. **Icon-only buttons at 16×16px** — far below any standard
2. **Tightly packed table row actions** — delete, edit, share icons with 4px gaps
3. **Navigation links with no padding** — the text IS the target, and a 12px-tall text link on mobile is impossible to tap reliably
4. **Checkbox and radio inputs** — native HTML checkboxes are tiny. Use custom styled inputs with at least a 44×44px hit area.

---

## Keyboard Navigation and Focus

### Requirements
- **SC 2.1.1 (Keyboard):** ALL functionality must be accessible via keyboard alone
- **SC 2.1.2 (No Keyboard Trap):** Users must be able to navigate away from any element using keyboard
- **SC 2.4.3 (Focus Order):** Focus order must match the visual reading order
- **SC 2.4.7 (Focus Visible):** Focus indicators must be visible
- **SC 2.4.11 (Focus Not Obscured - Minimum, Level AA, NEW in WCAG 2.2):** When an element receives focus, it must not be entirely hidden by other content (like sticky headers)
- **SC 2.4.12 (Focus Not Obscured - Enhanced, Level AAA, NEW in WCAG 2.2):** No part of the focused element should be hidden

### Focus Indicator Specification

```css
/* WCAG-compliant focus indicator */
:focus-visible {
  outline: 2px solid #2563EB;          /* Visible colour */
  outline-offset: 2px;                  /* Gap between outline and element */
  border-radius: 4px;                   /* Match element rounding if applicable */
}

/* Requirements for the focus indicator: */
/* - Must have 3:1 contrast against adjacent colours */
/* - Must be at least 2px wide if solid, or enclose the element */
/* - Must not be hidden by other content (sticky headers, overlays) */

/* DO NOT DO THIS: */
:focus { outline: none; }              /* NEVER remove focus outlines globally */
```

### Keyboard Patterns

**Tab navigation:**
- `Tab` moves forward through interactive elements
- `Shift + Tab` moves backward
- Focus order must follow visual reading order (left-to-right, top-to-bottom for LTR languages)

**Component-specific keyboard patterns:**
```
Modals/Dialogs:
  - Tab cycles ONLY within the modal (focus trap)
  - Escape closes the modal
  - Focus moves to the first focusable element on open
  - Focus returns to the trigger element on close

Dropdown Menus:
  - Enter/Space opens the menu
  - Arrow keys navigate options
  - Enter selects
  - Escape closes

Tabs:
  - Arrow Left/Right moves between tabs
  - Tab moves to the tab panel content
  - Home/End jumps to first/last tab

Accordion:
  - Enter/Space toggles section
  - Arrow Up/Down moves between headers
```

### Focus Management for SPAs
Single-page applications must manually manage focus when content changes:
- After route change: move focus to the main content area or page heading
- After form submission: move focus to the success/error message
- After modal close: return focus to the element that opened it
- After dynamic content load: announce the new content to screen readers via `aria-live`

---

## Screen Reader Design

### Semantic HTML First
The best screen reader experience comes from proper HTML, not ARIA:

```html
<!-- GOOD: Semantic HTML that screen readers understand natively -->
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

<main>
  <article>
    <h1>Page Title</h1>
    <p>Content...</p>
  </article>
</main>

<!-- BAD: Divs pretending to be semantic -->
<div class="nav">
  <div class="nav-item" onclick="navigate('/home')">Home</div>
</div>
```

### ARIA When Needed

**Key ARIA attributes:**
- `aria-label`: Provides an accessible name when visible text is insufficient (icon-only buttons)
- `aria-describedby`: Links an element to a description (error messages, help text)
- `aria-expanded`: Communicates open/closed state (accordions, dropdowns)
- `aria-hidden="true"`: Hides decorative elements from screen readers
- `aria-live="polite"`: Announces dynamic content changes (notifications, status updates)
- `role`: Defines the semantic role when HTML alone isn't sufficient

**The first rule of ARIA: Don't use ARIA.** If there's a native HTML element or attribute that provides the semantics you need, use it instead. `<button>` is always better than `<div role="button">`.

### Image Alt Text Rules
- **Informative images:** Describe the content and function: `alt="Bar chart showing revenue growth from £2M to £5M over 2024"`
- **Decorative images:** Use empty alt: `alt=""` (NOT omitting alt entirely — that's worse)
- **Functional images (links/buttons):** Describe the action: `alt="Search"`, `alt="Close dialog"`
- **Complex images (charts, diagrams):** Provide a brief alt + link to a longer description
- **Text in images:** Reproduce the text in alt. Better: don't put text in images at all.

### Heading Structure
- ONE `<h1>` per page (the page title)
- Heading levels must not skip (no `<h1>` followed by `<h3>`)
- Headings should be descriptive ("Your Order Summary" not "Section 3")
- Screen reader users navigate by heading — headings are the primary navigation mechanism for non-visual users

---

## Motion and Animation

### Requirements
- **SC 2.3.1 (Three Flashes or Below):** Nothing flashes more than 3 times per second
- **SC 2.2.2 (Pause, Stop, Hide):** Any auto-playing, blinking, or scrolling content that lasts more than 5 seconds must be pausable
- **Respect `prefers-reduced-motion`:** Users can request reduced motion at the OS level. Honour this.

### Implementation

```css
/* Default: animations enabled */
.animated-element {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

/* Respect user preference */
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    transition: none;
    animation: none;
  }
  
  /* OR provide a gentler alternative: */
  .animated-element {
    transition: opacity 0.1s ease;   /* Keep opacity, remove transform */
  }
}
```

### Design Rules
- Essential motion (loading indicators, progress) should remain even in reduced-motion mode but be simplified (a spinner → a static loading text)
- Decorative motion (parallax, hover effects, page transitions) should be fully disabled in reduced-motion mode
- Never auto-play video with sound
- Looping animations must be pausable or stop after 5 seconds
- Avoid vestibular-triggering patterns: full-screen zoom, parallax with multiple speed layers, rapid colour changes

---

## Forms and Input

### Requirements (Including WCAG 2.2 New Criteria)
- **SC 3.3.2 (Labels or Instructions):** Every input must have a visible label
- **SC 3.3.7 (Redundant Entry, Level A, NEW in WCAG 2.2):** Don't ask users to re-enter information they've already provided in the same process
- **SC 3.3.8 (Accessible Authentication - Minimum, Level AA, NEW in WCAG 2.2):** Don't rely on cognitive function tests (like CAPTCHAs requiring memory/transcription) unless alternatives exist
- **SC 3.3.9 (Accessible Authentication - Enhanced, Level AAA, NEW in WCAG 2.2):** No cognitive function tests at all for authentication

### Label Best Practices
- Labels ABOVE inputs (not to the side — reduces cognitive load and works better on mobile)
- Use `<label for="input-id">` — ALWAYS. Clicking the label should focus the input.
- Placeholder text is NOT a substitute for labels (it disappears on focus, fails contrast, and users forget what the field was for)
- Required fields: mark with asterisk (*) and provide a legend explaining the asterisk

### Error Handling
- Show errors inline, next to the field that caused them
- Use both colour AND text to indicate errors (never colour alone — colourblind users)
- Error messages must be specific: "Email address must include an @ symbol" not "Invalid input"
- Link `aria-describedby` from the input to the error message
- After form submission fails, move focus to the first error

### Autocomplete
Use `autocomplete` attributes to help password managers and assistive tech:
```html
<input type="email" autocomplete="email">
<input type="text" autocomplete="given-name">
<input type="text" autocomplete="family-name">
<input type="text" autocomplete="street-address">
<input type="text" autocomplete="postal-code">
<input type="tel" autocomplete="tel">
<input type="password" autocomplete="new-password"> <!-- or current-password -->
```

---

## WCAG 2.2 New Criteria

Key additions in WCAG 2.2 that you must know:

### SC 2.4.11 — Focus Not Obscured (Minimum) [Level AA]
When an element receives keyboard focus, at least part of it must not be hidden by sticky headers, footers, or overlays. Account for sticky elements in your scroll-padding and focus management.

### SC 2.4.13 — Focus Appearance [Level AAA]
Focus indicators must have a minimum area (2px thick outline or equivalent) and 3:1 contrast against both the unfocused state and adjacent colours.

### SC 2.5.7 — Dragging Movements [Level AA]
Any functionality that uses dragging (drag-and-drop, sliders) must have a non-dragging alternative (e.g., up/down buttons for reordering, text input for sliders).

### SC 2.5.8 — Target Size (Minimum) [Level AA]
Interactive targets must be at least 24×24 CSS pixels. Exceptions: inline text links, targets where the spacing around them provides sufficient area, targets controlled by the user agent.

### SC 3.3.7 — Redundant Entry [Level A]
If information was entered earlier in a multi-step process, either auto-populate it or let users select previously entered values. Don't ask for the shipping address twice.

### SC 3.3.8 — Accessible Authentication (Minimum) [Level AA]
Authentication must not require users to memorise, transcribe, or manipulate information (like solving a puzzle or remembering a password without paste support). Allow password managers, passkeys, and biometric authentication.

---

## Testing Checklist

Use this checklist for every design review:

### Automated (Catches ~30% of issues)
- [ ] Run Lighthouse Accessibility audit (Chrome DevTools)
- [ ] Run axe DevTools browser extension
- [ ] Validate HTML (validator.w3.org)
- [ ] Check colour contrast for all text/background combinations

### Manual (Catches the other ~70%)
- [ ] Navigate the entire interface using only keyboard (Tab, Enter, Space, Arrows, Escape)
- [ ] Verify focus is always visible and never trapped
- [ ] Verify focus order matches visual order
- [ ] Test with screen reader (VoiceOver on Mac/iOS, NVDA on Windows, TalkBack on Android)
- [ ] Verify all images have appropriate alt text
- [ ] Verify heading hierarchy (no skipped levels)
- [ ] Verify all form inputs have associated labels
- [ ] Verify error messages are specific and associated with their fields
- [ ] Test at 200% browser zoom — does content reflow without horizontal scrolling?
- [ ] Test at 320px viewport width — is all content accessible?
- [ ] Enable `prefers-reduced-motion: reduce` and verify animations respect it
- [ ] Test with colour blindness simulators (protanopia, deuteranopia, tritanopia)
- [ ] Verify touch targets meet 24×24px minimum (44×44px for AAA)
- [ ] Check that information is not conveyed by colour alone
- [ ] Verify draggable interactions have non-drag alternatives
