# UX Psychology — The Science of Interaction

> Load this file when critiquing layouts, evaluating user flows, or diagnosing why a design "feels off."
> Every principle includes: definition, design implication, measurement heuristic, and concrete examples.

## Table of Contents
1. [Hick's Law](#hicks-law)
2. [Fitts's Law](#fittss-law)
3. [Gestalt Principles](#gestalt-principles)
4. [Cognitive Load Theory](#cognitive-load-theory)
5. [Miller's Law (7±2)](#millers-law)
6. [Jakob's Law](#jakobs-law)
7. [The Von Restorff Effect](#von-restorff-effect)
8. [Zeigarnik Effect](#zeigarnik-effect)
9. [Dark Patterns (Recognition & Avoidance)](#dark-patterns)
10. [Peak-End Rule](#peak-end-rule)

---

## Hick's Law

### Definition
The time it takes to make a decision increases logarithmically with the number of options presented. Formally: `RT = a + b × log₂(n)` where RT is reaction time, n is the number of equally probable choices, and a/b are constants.

### Design Implication
Every additional option you present to a user increases their decision time — and their anxiety. This doesn't mean "fewer options always," it means "present options in digestible stages."

### Application Rules
- **Navigation menus:** Cap primary navigation items at 5-7. If you have more, use progressive disclosure (expandable submenus, categorised sections).
- **Form design:** Break long forms into multi-step wizards. Each step should present 3-5 related fields, not 20 fields on one page.
- **Search vs. browse:** When a catalogue exceeds ~20 items, provide search/filter rather than listing everything. Users scan faster with filters than with scrolling.
- **CTAs:** A screen with one primary CTA converts better than a screen with three competing ones. If multiple actions exist, establish a clear visual hierarchy (primary > secondary > tertiary).

### Measurement Heuristic
Count the number of choices visible on any single screen state. If > 7 competing focal points exist, the screen likely triggers decision paralysis. Test by asking: "If a user glances at this for 3 seconds, can they identify the ONE thing they should do?"

### Concrete Example
**❌ Bad:** A settings page showing 40 toggles in a flat list.
**✅ Good:** Settings grouped into 5 categories (Account, Notifications, Privacy, Appearance, Advanced), each expandable, with the most commonly changed settings surfaced first.

---

## Fitts's Law

### Definition
The time to reach a target is a function of the distance to and size of the target. Formally: `T = a + b × log₂(1 + D/W)` where D is distance from cursor/finger to target and W is the target width.

### Design Implication
Important interactive elements must be large enough and close enough to the user's current focus area. This is especially critical for touch interfaces where imprecise finger input replaces precise cursor input.

### Application Rules
- **Touch targets:** Minimum 44×44px (Apple HIG) or 48×48dp (Material). This is the minimum — larger is always better for primary actions.
- **Button placement:** Place primary CTAs within thumb reach on mobile (bottom 40% of screen in portrait mode). On desktop, place primary actions near the user's current focus, not in a distant toolbar.
- **Corner & edge targets:** Targets against screen edges are infinitely tall/wide (the cursor can't overshoot), making them highly efficient. Use screen edges for navigation (sidebars, bottom tabs) and corners for persistent actions (close, settings).
- **Destructive actions:** Make destructive targets SMALL and DISTANT from primary actions. A "Delete Account" button should be smaller and further from the user's flow than "Save Changes."
- **Spacing between interactive elements:** Minimum 8px gap between clickable/tappable targets to prevent mis-taps. 12-16px is preferred.

### Measurement Heuristic
For any interactive element, check:
1. Is the target at least 44×44px (touch) or 24×24px (cursor)?
2. Is the target within 1 thumb-stretch of the user's resting hand position (mobile)?
3. Are adjacent targets spaced far enough apart to prevent accidental activation?

### Concrete Example
**❌ Bad:** A mobile confirmation dialog with "Cancel" and "Delete" as small text links, 8px apart, centred in the screen.
**✅ Good:** "Cancel" as a full-width secondary button at the bottom, "Delete" as a smaller red button above it. The safe action (Cancel) is easiest to reach; the dangerous action (Delete) requires deliberate aim.

---

## Gestalt Principles

### Definition
A set of principles from perceptual psychology describing how humans group visual elements into coherent patterns. These aren't aesthetic preferences — they're hardwired perceptual shortcuts.

### The Core Principles

**Proximity:** Elements placed close together are perceived as a group. This is the most powerful grouping tool in interface design — more powerful than colour, shape, or borders.

*Application:* Related form fields should be spatially clustered. A label should be closer to its input than to any other element (the label-to-input gap should be ~4-8px; the gap between field groups should be ~24-32px).

**Similarity:** Elements that look alike (colour, shape, size, orientation) are perceived as belonging together.

*Application:* All clickable elements in a view should share visual traits (underline + colour for links, filled shape + shadow for buttons). If two elements look identical but behave differently, you have a UX failure.

**Continuity:** The eye follows smooth lines and curves, preferring paths that don't abruptly change direction.

*Application:* Align elements along clear axes. If your layout has elements scattered without alignment, the eye bounces chaotically. Use a grid. Every element should visually "point to" or "flow into" the next in the reading sequence.

**Closure:** The brain fills in missing visual information to perceive a complete shape, even when elements are incomplete.

*Application:* Icons and logos can be simplified by removing parts of a shape and letting the brain complete it. Circular progress indicators use closure — a partial ring reads as "progress toward completion."

**Figure-Ground:** The brain separates a scene into a foreground figure and a background. One is always perceived as "in front."

*Application:* Modals and overlays work because of figure-ground separation. The dimmed background pushes the modal forward. If a modal lacks a backdrop or shadow, figure-ground separation fails and the user can't focus.

**Common Region:** Elements enclosed within a boundary are perceived as a group, even if they're not proximate.

*Application:* Cards, sections with backgrounds, and bordered containers create grouping. Use this when proximity alone isn't sufficient (e.g., a dashboard tile containing a chart, label, and value).

### Measurement Heuristic
For any screen, squint until you can barely see the details. The blurred shapes that remain are what the user's brain perceives first. If those shapes don't match your intended groups and hierarchy, your Gestalt cues are wrong.

---

## Cognitive Load Theory

### Definition
Working memory has limited capacity. Cognitive load is the total mental effort required to process information and make decisions. Three types:
1. **Intrinsic load:** Inherent complexity of the task itself (unavoidable)
2. **Extraneous load:** Unnecessary complexity imposed by poor design (eliminable)
3. **Germane load:** Mental effort devoted to learning and building mental models (desirable)

### Design Implication
Your job is to minimise extraneous load while supporting germane load. Never make the user think about the *interface* when they should be thinking about their *task*.

### Application Rules

**Reduce extraneous load:**
- Eliminate decorative elements that don't serve function (gratuitous animations, ornamental dividers, background patterns in work zones)
- Use progressive disclosure: show only the information needed for the current step
- Provide defaults for all optional fields (the best decision is the one the user doesn't have to make)
- Group related actions spatially and label groups clearly

**Support germane load:**
- Use familiar patterns (don't reinvent navigation for the sake of innovation)
- Provide feedback for every user action (loading states, success confirmations, error explanations)
- Use consistent language and interaction patterns throughout (if "Save" means "Save" on one screen, don't call it "Submit" on another)
- Enable recognition over recall: show options rather than requiring users to remember and type them

**Measure cognitive load by proxy:**
- Count the number of distinct visual elements on a screen. If > 15, consider grouping or hiding.
- Track "time to first interaction" in usability tests. Hesitation > 5 seconds suggests confusion.
- Count the number of decisions required to complete a core task. Each decision is a load increment.

### Concrete Example
**❌ High extraneous load:** A checkout form with 18 fields on one page, inline marketing messages, a sidebar showing "recommended products," animated confetti when you type your email, and a tooltip that fires on every field hover.
**✅ Low extraneous load:** A 3-step checkout — Shipping, Payment, Review — each showing only the relevant 4-6 fields, with smart defaults (country auto-detected, saved addresses pre-populated), and a clean summary panel that updates in real time.

---

## Miller's Law

### Definition
The average person can hold 7±2 items (practically 4-5 for complex items) in working memory at once.

### Design Implication
Chunking is your most powerful information architecture tool. Don't present 15 items; present 3 groups of 5.

### Application Rules
- **Phone numbers:** `555-123-4567` not `5551234567` — chunking
- **Navigation:** 5-7 top-level items maximum
- **Content sections:** Long-form content should be broken into sections of 3-5 paragraphs
- **Search results:** Show results in pages of 10-20, not infinite scroll (which removes chunking cues)
- **Dashboard KPIs:** Limit to 4-6 primary metrics visible simultaneously. Provide drill-downs for detail.

---

## Jakob's Law

### Definition
Users spend most of their time on *other* sites. They expect your site to work the same way as all the other sites they already know.

### Design Implication
Innovation in interaction patterns is almost always wrong. Users have existing mental models for navigation, forms, ecommerce flows, search interfaces, and settings pages. Violating these models creates confusion, not delight.

### Application Rules
- **Navigation:** Logo top-left (links to home). Primary nav horizontal (desktop) or hamburger (mobile). Search in the header. User account top-right.
- **Ecommerce:** Product grid → product detail → add to cart → cart summary → checkout. Every deviation from this is a conversion risk.
- **Forms:** Labels above inputs. Required fields marked with asterisk (*). Validation on blur or submit, not on every keystroke.
- **Settings:** Toggle switches for on/off. Dropdowns or radio buttons for single-select. Checkboxes for multi-select. Group by category.
- **Modals:** Appear centred with a dimmed backdrop. Close via X button, backdrop click, or Escape key. All three expected.

### When to Break the Rule
Only when your user research explicitly shows that the conventional pattern fails for your specific audience AND you can educate users about the new pattern without friction.

---

## Von Restorff Effect

### Definition
When multiple similar objects are present, the one that differs most from the rest is most likely to be remembered.

### Design Implication
Use visual contrast strategically to make the most important element "pop." This is the psychological basis for the primary CTA being a different colour from everything else.

### Application Rules
- ONE primary CTA per screen. It should be the only element with the brand accent colour.
- Pricing pages: highlight the recommended plan with a different background, scale, or border treatment.
- Notifications / alerts should use a distinct colour (red for errors, amber for warnings) that appears nowhere else in the base UI.
- In lists and tables, highlight the actionable or important row with a subtle background tint.

**Warning:** If everything is emphasised, nothing is. The Von Restorff effect requires a baseline of sameness for the different element to stand out.

---

## Zeigarnik Effect

### Definition
People remember uncompleted tasks better than completed ones. Interrupted activities create a cognitive tension that motivates completion.

### Design Implication
Show users their progress and incomplete state to motivate continuation. This is the psychology behind progress bars, profile completion prompts, and onboarding checklists.

### Application Rules
- **Onboarding:** Show a checklist with completed/pending items. "You're 3 of 5 steps done" is more motivating than "Complete your profile."
- **Forms:** Multi-step forms with a progress indicator reduce abandonment. Showing "Step 2 of 4" creates tension to reach step 4.
- **Learning platforms:** Show course progress as a percentage or fraction.
- **Gamification:** Partial achievements (e.g., a half-filled badge) motivate continued engagement.

**Ethical boundary:** This effect can be weaponised. Using it to compel users to share more personal data than they want ("Your profile is only 60% complete — add your phone number!") is a dark pattern.

---

## Dark Patterns

### Definition
Deceptive design patterns that trick users into actions they didn't intend or wouldn't choose if fully informed. These erode trust, may violate regulations (EU Consumer Rights Directive, California CCPA), and damage long-term retention.

### The Major Dark Patterns to Recognise and Avoid

**Confirmshaming:** Using guilt-laden language on opt-out buttons.
- ❌ "No thanks, I don't want to save money"
- ✅ "No thanks" / "Skip"

**Roach Motel:** Easy to subscribe, deliberately difficult to cancel.
- ❌ Sign up in 1 click, cancel requires phone call
- ✅ Cancel in the same number of steps as signup

**Bait and Switch:** Offering one thing, then delivering another.
- ❌ "Free trial" that auto-charges without clear warning
- ✅ "Free trial — we'll email you 3 days before it ends"

**Hidden Costs:** Revealing fees only at the final checkout step.
- ❌ Price shown without tax/shipping until payment page
- ✅ Show total estimated cost from the start, break down on checkout

**Misdirection:** Using visual design to draw attention away from unfavourable options.
- ❌ Making "Accept All Cookies" bright and prominent while hiding "Manage Preferences" as grey text
- ✅ Give both options equal visual weight

**Forced Continuity:** Silently continuing a paid service after a trial ends.
- ❌ Charging automatically with no warning
- ✅ Send reminders at 3 days, 1 day, and at conversion. Make cancellation obvious.

**Privacy Zuckering:** Tricking users into sharing more personal data than intended.
- ❌ Settings that default to maximum data sharing
- ✅ Default to minimum data sharing; ask explicitly for each level of data access

### Design Audit Checklist
For any flow, ask:
1. Could a user accidentally take an irreversible action?
2. Are opt-out options visually demoted relative to opt-in?
3. Is the cost (financial, data, time) of each action transparent *before* the action?
4. Can a user undo or exit any process as easily as they entered it?
5. Are defaults set in the user's interest or the business's interest?

---

## Peak-End Rule

### Definition
People judge an experience primarily by how they felt at its most intense point (peak) and at its end, rather than by the sum or average of every moment.

### Design Implication
Invest disproportionately in two moments: the single most impactful interaction in your flow, and the final interaction before the user leaves.

### Application Rules
- **Onboarding peak:** The "aha moment" — when the user first sees the product's value. Make this moment visually and emotionally memorable (a celebration animation, a personalised result, a before/after comparison).
- **Checkout end:** After purchase, the confirmation screen should feel like a reward, not a receipt. Thank the user warmly, show them what happens next, and make them feel good about their decision.
- **Error recovery peak:** When something goes wrong, the peak of frustration is inevitable. What you can control is the quality of the recovery: clear error messages, easy retry paths, and proactive help reduce the negative peak intensity.
- **Offboarding end:** Even cancellation and account deletion flows should end respectfully. Don't guilt-trip. Don't hide the button. A user who cancels gracefully may return; a user who feels trapped will not.
