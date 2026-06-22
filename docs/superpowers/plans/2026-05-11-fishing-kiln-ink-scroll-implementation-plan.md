# Fishing Kiln Ink Scroll Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 4-image ink-scroll homepage layout and a site-wide blue-and-white ink diffusion cursor effect for the existing static site.

**Architecture:** Keep the current static HTML structure, remove the 5th homepage image, and layer the new visual system as late CSS overrides plus one small DOM-driven effect in `js/main.js`. This avoids risky refactors in a file set that already has duplicated homepage CSS and some encoding noise.

**Tech Stack:** Static HTML, CSS animations, vanilla JavaScript, Node syntax check

---

### Task 1: Save the final implementation shape

**Files:**
- Create: `docs/superpowers/plans/2026-05-11-fishing-kiln-ink-scroll-implementation-plan.md`
- Reference: `docs/superpowers/specs/2026-05-11-fishing-kiln-ink-scroll-design.md`

- [ ] **Step 1: Confirm the implementation surface**

Use these exact files only:

```text
index.html
css/styles.css
js/main.js
```

- [ ] **Step 2: Keep the change scoped**

Do not rewrite unrelated page content. Only:

```text
1. Remove homepage image 5
2. Add homepage ink-scroll structure hooks
3. Append final CSS overrides
4. Add cursor ink diffusion logic
```

### Task 2: Update homepage markup

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Remove the 5th image block**

Delete this exact block:

```html
<div class="image-irregular img-5 animate-ink" style="animation-delay: 0.8s;">
  <img src="img/涓荤晫闈?5.png" alt="娓旂獞鎵嬪伐闈掕姳-5">
</div>
```

- [ ] **Step 2: Add one ambient layer wrapper inside the image area**

Insert this block as the first child of `.hero-images-irregular`:

```html
<div class="ink-scroll-ambience" aria-hidden="true">
  <span class="ink-orbit ink-orbit-1"></span>
  <span class="ink-orbit ink-orbit-2"></span>
  <span class="ink-orbit ink-orbit-3"></span>
</div>
```

- [ ] **Step 3: Mark images for per-card motion**

Update the 4 remaining image blocks so each card keeps `image-irregular` and gains a motion class:

```html
<div class="image-irregular img-1 animate-ink ink-card ink-card-1">
```

Repeat with `ink-card-2`, `ink-card-3`, `ink-card-4`.

### Task 3: Append final homepage CSS

**Files:**
- Modify: `css/styles.css`

- [ ] **Step 1: Add the homepage ink-scroll override block at the end of the file**

Append CSS that:

```css
.home-page .hero-images-irregular {
  flex: 0 0 min(52vw, 760px);
  max-width: min(52vw, 760px);
  min-height: 720px;
  display: block;
  position: relative;
  padding: 44px 24px 40px 32px;
}
```

- [ ] **Step 2: Add ambient ink layers and card styling**

Append CSS that:

```css
.ink-scroll-ambience {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.home-page .image-irregular {
  position: absolute;
  overflow: visible;
  background: transparent;
  padding: 0;
  border-radius: 18px;
  box-shadow: none;
}

.home-page .image-irregular::before {
  content: "";
  position: absolute;
  inset: 10% -8% -10%;
  background:
    radial-gradient(circle at 30% 40%, rgba(63, 101, 166, 0.22), transparent 58%),
    radial-gradient(circle at 70% 60%, rgba(22, 52, 110, 0.16), transparent 62%);
  filter: blur(24px);
  opacity: 0.9;
  z-index: -1;
}
```

- [ ] **Step 3: Add 4-card irregular positions and motion**

Append CSS that defines exact sizes and positions for `.img-1` to `.img-4`, plus unique animation durations and hover lift.

- [ ] **Step 4: Add mobile downgrade and reduced-motion rules**

Append CSS that collapses the absolute layout into a simple vertical stack under `max-width: 900px` and disables animation in:

```css
@media (prefers-reduced-motion: reduce) {
  .ink-cursor-layer,
  .ink-cursor-bloom,
  .home-page .image-irregular,
  .ink-orbit {
    animation: none !important;
    transition: none !important;
  }
}
```

### Task 4: Add site-wide cursor ink diffusion

**Files:**
- Modify: `css/styles.css`
- Modify: `js/main.js`

- [ ] **Step 1: Append cursor effect CSS**

Append styles for:

```css
.ink-cursor-layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 30;
  overflow: hidden;
}

.ink-cursor-bloom {
  position: absolute;
  border-radius: 999px;
  transform: translate(-50%, -50%);
  animation: inkCursorBloom 1400ms ease-out forwards;
}
```

- [ ] **Step 2: Add the cursor effect implementation in `js/main.js`**

Implement a small initializer that:

```js
function initInkCursor() {
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!canHover || reduceMotion) return;
}
```

Then create one fixed layer, throttle `pointermove`, create 2-3 bloom nodes per burst, and remove them on animation end.

- [ ] **Step 3: Call the initializer once**

Add:

```js
initInkCursor();
```

near the bottom of `js/main.js`.

### Task 5: Verify the change

**Files:**
- Verify: `index.html`
- Verify: `css/styles.css`
- Verify: `js/main.js`

- [ ] **Step 1: Run JavaScript syntax check**

Run:

```bash
node --check js/main.js
```

Expected: no output

- [ ] **Step 2: Run repo tests if present**

Run:

```bash
npm test
```

Expected: either pass, or fail only for unrelated pre-existing gaps. Record the actual result.

- [ ] **Step 3: Review final diff**

Run:

```bash
git diff -- index.html css/styles.css js/main.js
```

Expected: only homepage structure, homepage CSS overrides, and cursor effect logic changed.
