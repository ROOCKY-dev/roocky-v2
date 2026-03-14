# Platform Guidelines — Technical Constraints & Native Patterns

> Load this file when the target platform is specified. Each section covers the non-negotiable conventions, layout systems, and native patterns for that platform.

## Table of Contents
1. [Responsive Web](#responsive-web)
2. [iOS — Human Interface Guidelines](#ios-human-interface-guidelines)
3. [Android — Material Design](#android-material-design)
4. [Cross-Platform Considerations](#cross-platform-considerations)

---

## Responsive Web

### The Viewport Spectrum
Design for a fluid continuum, not fixed breakpoints. But use breakpoints as guardrails:

```
Mobile S:    320px   (legacy, but still ~5% of traffic)
Mobile M:    375px   (iPhone SE / standard Android)
Mobile L:    428px   (iPhone Pro Max / large Android)
Tablet:      768px   (iPad Mini, small tablets)
Tablet L:    1024px  (iPad Air / standard tablets)
Desktop:     1280px  (common laptop resolution)
Desktop L:   1440px  (common external monitor)
Desktop XL:  1920px  (full HD monitor)
Ultrawide:   2560px+ (studio displays, ultrawide monitors)
```

### Grid System

**Standard approach: 12-column grid with responsive collapse**

```css
/* Base grid */
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;                                    /* 16px at mobile, 24px at desktop */
  max-width: 1200px;                            /* Content max-width */
  margin: 0 auto;
  padding: 0 24px;                              /* Side margins: 16px mobile, 24px desktop */
}

/* Responsive behaviour */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);      /* 4 columns at mobile */
    gap: 16px;
    padding: 0 16px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(8, 1fr);      /* 8 columns at tablet */
  }
}
```

**Content width constraints:**
- Body text: max 65-75ch (characters) for optimal readability — this is ~600-700px at 16px font size
- Full-width sections (hero, images, feature blocks): edge-to-edge or max 1440px
- Forms: max 480px wide (single column) or 720px (two column)
- Cards in a grid: 280-360px minimum width per card

### Navigation Patterns (Web)

**Desktop (≥1024px):**
- Horizontal top bar with logo (left), primary nav (centre or left-aligned), and utility actions (right: search, account, notifications)
- Sticky header: fine if total height ≤ 64px. Larger headers should collapse on scroll.
- Mega menus for sites with deep IA (ecommerce, news). Keep them under 4 levels deep.

**Tablet (768-1023px):**
- Consider hamburger menu if nav items > 5. Otherwise, horizontal nav with smaller text/spacing.
- Test both: some tablet users are in landscape mode and have desktop-level space.

**Mobile (< 768px):**
- Hamburger menu (top) or bottom tab bar (max 5 items).
- Bottom tab bar is generally superior for engagement — keeps navigation within thumb reach.
- Fixed bottom CTAs (e.g., "Add to Cart") should have a safe padding below for home indicator gestures on modern phones.

### Web Performance Considerations
- **First Contentful Paint (FCP):** Target < 1.8s. Affects perceived load time.
- **Largest Contentful Paint (LCP):** Target < 2.5s. The largest visible element should render quickly.
- **Cumulative Layout Shift (CLS):** Target < 0.1. Reserve space for images, ads, and dynamic content.
- **Font loading:** Use `font-display: swap` to prevent invisible text during web font loading. Consider system font stacks for body text.
- **Image strategy:** WebP/AVIF with `<picture>` element for format fallbacks. Lazy-load below-fold images. Use `aspect-ratio` CSS to prevent layout shift.

---

## iOS — Human Interface Guidelines

### Core Principles (Apple HIG)
Apple's design philosophy centres on: clarity (content is the focus), deference (UI supports content rather than competing with it), and depth (visual layering communicates hierarchy).

### Layout Specifications

**Safe Area:**
- Top: Dynamic Island / notch area — status bar height varies (47pt–59pt depending on device)
- Bottom: Home indicator zone — 34pt on devices without a physical home button
- Never place interactive elements in the safe area margins

**Standard Margins:**
- Default leading/trailing margin: 16pt (compact width), 20pt (regular width)
- Section spacing: 20-35pt between content groups
- Standard table row height: 44pt minimum

**Navigation:**
```
Tab Bar (bottom):
  - Max 5 tabs. 6th tab triggers "More" overflow.
  - Height: 49pt (compact), 83pt (with labels)
  - Icons: SF Symbols recommended, 25×25pt
  - Active tab: tinted, inactive: grey

Navigation Bar (top):
  - Height: 44pt (compact), 96pt (large title)
  - Large titles: 34pt bold, collapse on scroll
  - Back button: always present when in a navigation stack
  - Right side: max 2 action buttons
```

### Typography (SF Pro / SF Pro Rounded)

Apple's system font (SF Pro) uses optical sizing — it automatically adjusts weight and spacing based on point size.

```
Large Title:  34pt / Bold        — Screen headers, collapsible
Title 1:      28pt / Bold        — Section headers
Title 2:      22pt / Bold        — Sub-section headers
Title 3:      20pt / Semibold    — Tertiary headers
Headline:     17pt / Semibold    — List row titles
Body:         17pt / Regular     — Primary content text
Callout:      16pt / Regular     — Secondary description text
Subheadline:  15pt / Regular     — Tertiary text, metadata
Footnote:     13pt / Regular     — Legal text, timestamps
Caption 1:    12pt / Regular     — Annotations
Caption 2:    11pt / Regular     — Smallest readable text
```

### Interaction Patterns

**Gestures:**
- Swipe back (from left edge): ALWAYS support this for navigation. Never hijack this gesture.
- Pull to refresh: standard for lists and feeds
- Long press: context menus (UIContextMenuInteraction)
- Pinch to zoom: standard for images and maps

**Haptic Feedback:**
- UIImpactFeedbackGenerator: for physical collisions or impacts
- UISelectionFeedbackGenerator: for selection changes (e.g., picker wheels)
- UINotificationFeedbackGenerator: for success, warning, error states

**Modals & Sheets:**
- Bottom sheets (`.sheet`): preferred for secondary content, partial-height
- Full-screen modals: reserved for complex flows (compose, creation)
- Alerts: max 2 buttons side-by-side, 3+ buttons stacked vertically
- Destructive actions: red text, positioned last in action sheets

### iOS-Specific Design Rules
1. **No custom back buttons.** Use the system back chevron. Users expect it.
2. **No hamburger menus.** Apple uses tab bars. Hamburger menus hide information and reduce engagement.
3. **Respect Dynamic Type.** All text must scale with the user's preferred text size setting. Test at the largest accessibility size.
4. **Dark mode is mandatory.** Since iOS 13, users expect apps to respect system appearance. Use semantic colours (`.label`, `.systemBackground`, `.secondarySystemGroupedBackground`) that adapt automatically.
5. **SF Symbols for icons.** 5,000+ symbols that automatically match the weight and size of adjacent text.

---

## Android — Material Design

### Core Principles (Material 3 Expressive, 2025+)
Material Design emphasises: meaningful motion, adaptive colour, systematic shape, and accessibility as a foundation (not an afterthought). The "Expressive" evolution adds spring-based animation, emotional colour personalisation, and enhanced component expressiveness.

### Layout Specifications

**System Bars:**
- Status bar: ~24dp (varies with notch/punch-hole)
- Navigation bar (gesture): 48dp bottom inset
- Navigation bar (3-button): 48dp

**Layout Grid:**
```
Phone (0-599dp):
  Columns: 4
  Margins: 16dp
  Gutter: 8dp

Tablet (600-839dp):
  Columns: 8 (or 12)
  Margins: 24dp
  Gutter: 16dp

Desktop / Large Tablet (840dp+):
  Columns: 12
  Margins: 24dp
  Gutter: 24dp
```

**Navigation:**
```
Bottom Navigation Bar:
  - Height: 80dp
  - Max 5 destinations (3-5 recommended)
  - Icons: 24dp, labels below
  - Active indicator: pill shape with primary container colour

Navigation Rail (tablet/foldable):
  - Width: 80dp
  - Positioned on the left edge
  - Top: FAB or menu icon
  - 3-7 destinations

Navigation Drawer:
  - Width: 360dp max
  - Standard or modal variant
  - Group items with section headers
```

### Typography (Roboto / Roboto Flex)

M3's type scale with five categories, each with three sizes:

```
Display Large:   57sp / -0.25 letter-spacing
Display Medium:  45sp / 0 letter-spacing
Display Small:   36sp / 0 letter-spacing

Headline Large:  32sp / 0 letter-spacing
Headline Medium: 28sp / 0 letter-spacing
Headline Small:  24sp / 0 letter-spacing

Title Large:     22sp / 0 letter-spacing
Title Medium:    16sp / +0.15 letter-spacing
Title Small:     14sp / +0.1 letter-spacing

Body Large:      16sp / +0.5 letter-spacing
Body Medium:     14sp / +0.25 letter-spacing
Body Small:      12sp / +0.4 letter-spacing

Label Large:     14sp / +0.1 letter-spacing
Label Medium:    12sp / +0.5 letter-spacing
Label Small:     11sp / +0.5 letter-spacing
```

### Component Specifications

**Buttons:**
```
Filled Button:
  Height: 40dp
  Corner radius: 20dp (full-rounding)
  Horizontal padding: 24dp
  Label: Label Large (14sp, 500 weight)
  Min touch target: 48dp (achieved via padding/margin)

Outlined Button:
  Same dimensions, 1dp border, transparent fill

Text Button:
  Same label specs, no background or border
  Used for low-emphasis actions

FAB (Floating Action Button):
  Small: 40dp
  Standard: 56dp
  Large: 96dp
  Corner radius: relative to size
  Elevation: Level 3 (6dp)
```

**Cards:**
```
Elevated Card:
  Corner radius: 12dp
  Elevation: Level 1 (1dp shadow)
  Padding: 16dp

Filled Card:
  Corner radius: 12dp
  Background: Surface Variant colour
  Elevation: Level 0

Outlined Card:
  Corner radius: 12dp
  Border: 1dp, Outline colour
  Elevation: Level 0
```

### Android-Specific Design Rules
1. **Support system back gesture.** Predictive back (introduced Android 14) lets users preview where back will take them. Design for this.
2. **Dynamic Colour.** On Android 12+, Material You generates a palette from the wallpaper. Design with dynamic colour in mind: your brand colour seeds the palette, but the system may override specific hues.
3. **Adaptive layouts.** Foldables and tablets are first-class citizens. Use canonical layouts: list-detail, supporting pane, and feed. Test at 320dp (compact), 600dp (medium), and 840dp (expanded).
4. **Edge-to-edge.** Draw behind system bars with transparent or translucent backgrounds. Use `WindowInsetsCompat` to handle safe areas.
5. **Notification design.** Follow the notification template system. Custom layouts are discouraged — use the standard title + text + actions template.

---

## Cross-Platform Considerations

### When Building for Both iOS and Android

**What to keep consistent:**
- Core information architecture and task flows
- Brand identity (colours, fonts, tone of voice)
- Feature set and content
- Accessibility standards (both platforms require it)

**What to adapt per platform:**
- Navigation pattern (tab bar position, back navigation behaviour)
- Typography (SF Pro on iOS, Roboto on Android — or a shared brand font)
- Component styling (iOS rounded rect vs. Material shape system)
- System-level features (iOS haptics differ from Android haptics; iOS uses SF Symbols, Android uses Material Icons)
- Gesture conventions (iOS swipe-to-go-back from edge vs. Android system back)

**Common cross-platform pitfalls:**
1. **Using a hamburger menu on iOS.** Android users tolerate it; iOS users expect a tab bar.
2. **Using bottom sheets identically.** iOS sheets have a drag handle and snap points. Android sheets follow the Material bottom sheet spec. They behave similarly but aren't identical.
3. **Ignoring platform typography.** Using the same custom font everywhere is fine for brand consistency, but ensure it respects Dynamic Type (iOS) and text scale settings (Android).
4. **Forgetting safe areas.** iPhone notch/Dynamic Island and Android punch-hole cameras create different safe area shapes. Test on real devices.

### React Native / Flutter Considerations
- Use platform-aware components where available (e.g., Cupertino widgets on iOS, Material widgets on Android in Flutter)
- Don't force Material components onto iOS — users notice and it feels wrong
- Test on physical devices, not just emulators. Performance and gesture feel differ significantly.
- Respect platform animation curves: iOS uses spring-based timing with a specific damping feel; Android M3 Expressive now also uses springs but with different parameters.
