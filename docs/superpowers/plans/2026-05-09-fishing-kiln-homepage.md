# Fishing Kiln Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static single-page brand homepage for `渔窑手工青花 / fishing kiln` in the approved `A. 展卷式留白` direction, using the existing three image assets and preserving a strong exhibition-poster feel.

**Architecture:** Use a simple static site structure with one HTML entrypoint, one dedicated stylesheet, one small interaction script, and one Node built-in test file. Keep the layout intentionally lean: hero poster first, five-category collection band second, with restrained hover and reveal effects only.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Node.js built-in test runner, local browser verification

---

## File Structure

- Create: `D:\gitHub\fishingKiln\index.html`
- Create: `D:\gitHub\fishingKiln\css\styles.css`
- Create: `D:\gitHub\fishingKiln\js\main.js`
- Create: `D:\gitHub\fishingKiln\tests\homepage.test.mjs`
- Create: `D:\gitHub\fishingKiln\package.json`
- Modify: `D:\gitHub\fishingKiln\README.md`
- Reuse: `D:\gitHub\fishingKiln\img\logo.png`
- Reuse: `D:\gitHub\fishingKiln\img\主图.png`
- Reuse: `D:\gitHub\fishingKiln\img\微信图片_20260508111856_778_263.jpg`

### Responsibility Boundaries

- `index.html`: semantic structure and all page copy
- `css/styles.css`: visual system, layout, responsive rules, motion
- `js/main.js`: minimal progressive enhancement only
- `tests/homepage.test.mjs`: static content and structure verification
- `package.json`: test and preview command aliases
- `README.md`: local run instructions for a zero-context engineer

### Task 1: Scaffold the static site and failing structural tests

**Files:**
- Create: `D:\gitHub\fishingKiln\package.json`
- Create: `D:\gitHub\fishingKiln\tests\homepage.test.mjs`

- [ ] **Step 1: Write the failing test runner config**

Create `D:\gitHub\fishingKiln\package.json` with:

```json
{
  "name": "fishing-kiln-homepage",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "test": "node --test",
    "preview": "python -m http.server 4173"
  }
}
```

- [ ] **Step 2: Write the failing homepage structure tests**

Create `D:\gitHub\fishingKiln\tests\homepage.test.mjs` with:

```js
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const htmlPath = path.join(root, "index.html");

function readHtml() {
  return fs.readFileSync(htmlPath, "utf8");
}

test("homepage file exists", () => {
  assert.equal(fs.existsSync(htmlPath), true);
});

test("homepage declares the core brand copy", () => {
  const html = readHtml();
  assert.match(html, /渔窑手工青花/);
  assert.match(html, /fishing kiln/i);
  assert.match(html, /做自己，生活需要热爱/);
  assert.match(html, /Be yourself, life requires passion\./);
});

test("homepage contains the approved two-part structure", () => {
  const html = readHtml();
  assert.match(html, /<section[^>]*id="hero"/);
  assert.match(html, /<section[^>]*id="collections"/);
});

test("homepage contains all five collection categories", () => {
  const html = readHtml();
  for (const label of ["茶具", "餐具", "咖啡具", "花器", "艺术品"]) {
    assert.match(html, new RegExp(label));
  }
});

test("homepage references the three provided image assets", () => {
  const html = readHtml();
  assert.match(html, /img\/logo\.png/);
  assert.match(html, /img\/主图\.png/);
  assert.match(html, /img\/微信图片_20260508111856_778_263\.jpg/);
});

test("homepage links the dedicated stylesheet and script", () => {
  const html = readHtml();
  assert.match(html, /css\/styles\.css/);
  assert.match(html, /js\/main\.js/);
});
```

- [ ] **Step 3: Run test to verify it fails**

Run:

```bash
npm test
```

Expected: FAIL with an error like `ENOENT: no such file or directory, open '...\\index.html'`.

- [ ] **Step 4: Commit the failing test scaffold**

If the directory has already been initialized as a git repo by execution time, run:

```bash
git add package.json tests/homepage.test.mjs
git commit -m "test: add homepage structural checks"
```

Expected: commit succeeds.

If the directory is still not a git repo, skip the commit and note that repository initialization is still pending.

### Task 2: Implement the semantic single-page HTML shell

**Files:**
- Create: `D:\gitHub\fishingKiln\index.html`
- Test: `D:\gitHub\fishingKiln\tests\homepage.test.mjs`

- [ ] **Step 1: Write the minimal homepage implementation**

Create `D:\gitHub\fishingKiln\index.html` with:

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>渔窑手工青花 | fishing kiln</title>
    <meta
      name="description"
      content="渔窑手工青花，以青花民窑、钓鱼意境与东方留白构成单页品牌展卷。"
    >
    <link rel="stylesheet" href="css/styles.css">
  </head>
  <body>
    <div class="page-shell">
      <header class="site-header">
        <a class="brand" href="#hero" aria-label="渔窑手工青花首页">
          <img src="img/logo.png" alt="渔窑手工青花 logo">
          <span class="brand-copy">
            <strong>渔窑手工青花</strong>
            <small>fishing kiln</small>
          </span>
        </a>
        <nav class="site-nav" aria-label="品牌关键词">
          <a href="#collections">青花民窑</a>
          <a href="#collections">钓鱼意境</a>
          <a href="#collections">古墨留白</a>
        </nav>
      </header>

      <main>
        <section id="hero" class="hero-section">
          <div class="hero-copy hero-copy-left">
            <span class="eyebrow">Brand Scroll</span>
            <h1>做自己，生活需要热爱</h1>
            <p>
              以民窑青花为骨，以垂钓山水为境，让器物不止停留于使用，
              也成为一种缓慢、克制、有温度的日常表达。
            </p>
          </div>

          <div class="hero-art">
            <div class="hero-art-halo" aria-hidden="true"></div>
            <img src="img/主图.png" alt="渔窑主视觉青花器物">
          </div>

          <div class="hero-copy hero-copy-right">
            <span class="eyebrow">Slogan</span>
            <h2>青与白之间，藏一段东方水意</h2>
            <p>
              首页像一张可缓慢阅读的品牌海报，让器物、留白与水意共同建立记忆点。
            </p>
            <p class="hero-copy-en">Be yourself, life requires passion.</p>
          </div>
        </section>

        <section id="collections" class="collections-section" aria-labelledby="collections-title">
          <div class="collections-heading">
            <div>
              <span class="eyebrow">Collection Gate</span>
              <h2 id="collections-title">五个藏品门类</h2>
            </div>
            <p>Five parallel collections, equal in status and calm in presentation.</p>
          </div>

          <div class="collections-grid">
            <article class="collection-card">
              <h3>茶具</h3>
              <p>盏、壶、承与饮茶器型，偏安静、清润、留白。</p>
            </article>
            <article class="collection-card">
              <h3>餐具</h3>
              <p>盘、碗、碟与日常食器，像一桌青花与生活的关系。</p>
            </article>
            <article class="collection-card">
              <h3>咖啡具</h3>
              <p>古意器型与现代饮用场景结合，保持克制的当代感。</p>
            </article>
            <article class="collection-card">
              <h3>花器</h3>
              <p>花瓶、插器与静物氛围，更偏陈设、空间、山水气。</p>
            </article>
            <article class="collection-card">
              <h3>艺术品</h3>
              <p>独立器物与收藏表达，作为品牌美学的压轴收束。</p>
            </article>
          </div>

          <div class="collections-notes">
            <p>
              上半屏先建立渔窑的意境，下半屏再平静展开五个平级门类，
              保持像展览目录而不是商品货架。
            </p>
          </div>
        </section>
      </main>
    </div>

    <img
      class="page-background"
      src="img/微信图片_20260508111856_778_263.jpg"
      alt=""
      aria-hidden="true"
    >
    <script src="js/main.js" defer></script>
  </body>
</html>
```

- [ ] **Step 2: Run test to verify the structure now passes**

Run:

```bash
npm test
```

Expected: PASS for all six tests in `tests/homepage.test.mjs`.

- [ ] **Step 3: Commit the semantic shell**

If git is available, run:

```bash
git add index.html
git commit -m "feat: add fishing kiln homepage structure"
```

Expected: commit succeeds.

If git is unavailable, skip and record the reason.

### Task 3: Implement the approved A-direction visual system

**Files:**
- Create: `D:\gitHub\fishingKiln\css\styles.css`
- Modify: `D:\gitHub\fishingKiln\index.html`
- Test: `D:\gitHub\fishingKiln\tests\homepage.test.mjs`

- [ ] **Step 1: Add the full stylesheet**

Create `D:\gitHub\fishingKiln\css\styles.css` with:

```css
:root {
  --ink-900: #143561;
  --ink-700: #244673;
  --ink-500: #496995;
  --mist-100: #f8f6f0;
  --mist-200: #eef3f8;
  --mist-300: #dfe9f2;
  --line-soft: rgba(20, 53, 97, 0.12);
  --surface-glass: rgba(255, 255, 255, 0.66);
  --shadow-soft: 0 28px 90px rgba(31, 55, 94, 0.12);
  --font-body: "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif;
  --font-ui: "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: var(--font-body);
  color: var(--ink-900);
  background:
    linear-gradient(180deg, rgba(248, 246, 240, 0.94), rgba(238, 243, 248, 0.98));
  overflow-x: hidden;
}

img {
  display: block;
  max-width: 100%;
}

a {
  color: inherit;
  text-decoration: none;
}

.page-background {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.1;
  filter: saturate(0.75) blur(1px);
  z-index: 0;
  pointer-events: none;
}

.page-shell {
  position: relative;
  z-index: 1;
  width: min(1280px, calc(100% - 48px));
  margin: 24px auto;
  padding: 28px;
  border-radius: 32px;
  border: 1px solid var(--line-soft);
  background:
    linear-gradient(180deg, rgba(248, 246, 240, 0.88), rgba(242, 246, 250, 0.94));
  box-shadow: var(--shadow-soft);
  overflow: hidden;
}

.page-shell::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at top center, rgba(39, 86, 159, 0.1), transparent 30%),
    linear-gradient(90deg, rgba(20, 53, 97, 0.03), transparent 14%, transparent 86%, rgba(20, 53, 97, 0.03));
  pointer-events: none;
}

.site-header,
.hero-section,
.collections-section {
  position: relative;
  z-index: 1;
}

.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 28px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 16px;
}

.brand img {
  width: 76px;
  height: 76px;
  object-fit: contain;
}

.brand-copy {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.brand-copy strong {
  font-size: 30px;
  font-weight: 600;
  letter-spacing: 0.12em;
}

.brand-copy small {
  font-family: var(--font-ui);
  font-size: 12px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(20, 53, 97, 0.66);
}

.site-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px;
  font-family: var(--font-ui);
}

.site-nav a {
  padding: 8px 14px;
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.58);
  font-size: 12px;
  letter-spacing: 0.08em;
  transition: transform 220ms ease, background-color 220ms ease, border-color 220ms ease;
}

.site-nav a:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.84);
  border-color: rgba(20, 53, 97, 0.2);
}

.hero-section {
  display: grid;
  grid-template-columns: 1fr minmax(360px, 520px) 1fr;
  gap: 24px;
  align-items: center;
  min-height: 720px;
  padding: 12px 0 40px;
}

.hero-copy {
  max-width: 320px;
}

.hero-copy-right {
  margin-left: auto;
  text-align: right;
}

.eyebrow {
  display: inline-block;
  margin-bottom: 16px;
  font-family: var(--font-ui);
  font-size: 12px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(20, 53, 97, 0.58);
}

.hero-copy h1,
.hero-copy h2 {
  margin: 0 0 18px;
  letter-spacing: 0.12em;
  line-height: 1.15;
}

.hero-copy h1 {
  font-size: clamp(44px, 5vw, 68px);
}

.hero-copy h2 {
  font-size: clamp(28px, 3vw, 34px);
}

.hero-copy p {
  margin: 0;
  font-size: 16px;
  line-height: 1.95;
  color: rgba(20, 53, 97, 0.82);
}

.hero-copy-en {
  margin-top: 16px;
  font-family: var(--font-ui);
  font-size: 13px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(20, 53, 97, 0.66);
}

.hero-art {
  position: relative;
  display: grid;
  place-items: center;
}

.hero-art-halo {
  position: absolute;
  width: 560px;
  height: 560px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(39, 86, 159, 0.14), transparent 68%);
}

.hero-art img {
  position: relative;
  z-index: 1;
  width: min(100%, 500px);
  filter: drop-shadow(0 28px 60px rgba(17, 43, 88, 0.2));
}

.collections-section {
  padding: 24px 0 8px;
}

.collections-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
}

.collections-heading h2 {
  margin: 0;
  font-size: clamp(30px, 3vw, 38px);
  letter-spacing: 0.12em;
}

.collections-heading p {
  margin: 0;
  max-width: 360px;
  text-align: right;
  font-family: var(--font-ui);
  font-size: 14px;
  line-height: 1.8;
  color: rgba(20, 53, 97, 0.72);
}

.collections-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
}

.collection-card {
  min-height: 180px;
  padding: 22px 18px;
  border: 1px solid var(--line-soft);
  border-radius: 22px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.76), rgba(239, 245, 250, 0.82));
  transition: transform 240ms ease, box-shadow 240ms ease, border-color 240ms ease;
}

.collection-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 40px rgba(20, 53, 97, 0.1);
  border-color: rgba(20, 53, 97, 0.18);
}

.collection-card h3 {
  margin: 0 0 12px;
  font-size: 22px;
  letter-spacing: 0.08em;
}

.collection-card p {
  margin: 0;
  font-size: 14px;
  line-height: 1.9;
  color: rgba(20, 53, 97, 0.76);
}

.collections-notes {
  margin-top: 20px;
  padding: 18px 20px;
  border: 1px solid rgba(20, 53, 97, 0.08);
  border-radius: 20px;
  background: var(--surface-glass);
}

.collections-notes p {
  margin: 0;
  font-size: 14px;
  line-height: 1.9;
  color: rgba(20, 53, 97, 0.74);
}

.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 500ms ease, transform 500ms ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1120px) {
  .hero-section {
    grid-template-columns: 1fr;
    min-height: auto;
    padding-top: 8px;
    text-align: center;
  }

  .hero-copy,
  .hero-copy-right {
    max-width: none;
    margin: 0 auto;
    text-align: center;
  }

  .collections-heading,
  .collections-grid {
    grid-template-columns: 1fr;
  }

  .collections-heading {
    display: grid;
  }

  .collections-heading p {
    max-width: none;
    text-align: left;
  }

  .collections-grid {
    display: grid;
  }
}

@media (max-width: 720px) {
  .page-shell {
    width: min(100% - 24px, 100%);
    margin: 12px auto;
    padding: 20px;
    border-radius: 24px;
  }

  .site-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .site-nav {
    justify-content: flex-start;
  }

  .hero-art-halo {
    width: 340px;
    height: 340px;
  }

  .collections-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 2: Add reveal hooks to the HTML**

Update `D:\gitHub\fishingKiln\index.html` so these exact class additions exist:

```html
<section id="hero" class="hero-section reveal">
```

```html
<section id="collections" class="collections-section reveal" aria-labelledby="collections-title">
```

```html
<article class="collection-card reveal">
```

Apply the `reveal` class to all five `.collection-card` elements.

- [ ] **Step 3: Run tests again**

Run:

```bash
npm test
```

Expected: PASS. Structural tests remain green after styling changes.

- [ ] **Step 4: Preview in a browser**

Run:

```bash
npm run preview
```

Open:

```text
http://127.0.0.1:4173
```

Expected:

- first screen reads as a brand poster, not a shopping page
- main vessel is centered with generous white space
- five categories read as equal-status collection cards
- desktop and mobile widths both stay balanced

- [ ] **Step 5: Commit the visual system**

If git is available, run:

```bash
git add index.html css/styles.css
git commit -m "feat: add a-direction homepage visual design"
```

Expected: commit succeeds.

### Task 4: Add restrained interaction and motion polish

**Files:**
- Create: `D:\gitHub\fishingKiln\js\main.js`
- Modify: `D:\gitHub\fishingKiln\index.html`
- Test: `D:\gitHub\fishingKiln\tests\homepage.test.mjs`

- [ ] **Step 1: Write the minimal interaction script**

Create `D:\gitHub\fishingKiln\js\main.js` with:

```js
const revealItems = [...document.querySelectorAll(".reveal")];

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 80}ms`;
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const collectionCards = [...document.querySelectorAll(".collection-card")];

collectionCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    collectionCards.forEach((other) => {
      if (other !== card) other.style.opacity = "0.82";
    });
  });

  card.addEventListener("mouseleave", () => {
    collectionCards.forEach((other) => {
      other.style.opacity = "1";
    });
  });
});
```

- [ ] **Step 2: Run tests to make sure integration still passes**

Run:

```bash
npm test
```

Expected: PASS.

- [ ] **Step 3: Manual interaction verification**

With the preview server still running, confirm in the browser:

- the hero block fades in cleanly
- the collections section fades in after scroll
- cards lift slightly on hover
- hover emphasis stays subtle and does not look like ecommerce UI

- [ ] **Step 4: Commit the interaction polish**

If git is available, run:

```bash
git add js/main.js
git commit -m "feat: add restrained homepage motion"
```

Expected: commit succeeds.

### Task 5: Document local usage and final verification

**Files:**
- Modify: `D:\gitHub\fishingKiln\README.md`
- Test: `D:\gitHub\fishingKiln\tests\homepage.test.mjs`

- [ ] **Step 1: Replace the README with zero-context run instructions**

Update `D:\gitHub\fishingKiln\README.md` to:

```md
# fishingKiln

渔窑手工青花单页品牌官网。

## Local Preview

1. Run `npm test`
2. Run `npm run preview`
3. Open `http://127.0.0.1:4173`

## Project Structure

- `index.html`: 单页首页结构与文案
- `css/styles.css`: A 方向视觉系统与响应式样式
- `js/main.js`: 轻量滚动显现与悬浮交互
- `tests/homepage.test.mjs`: 首页结构与品牌内容校验
- `img/`: 品牌图片素材
```

- [ ] **Step 2: Run final automated verification**

Run:

```bash
npm test
```

Expected: PASS.

- [ ] **Step 3: Run final visual verification**

Run:

```bash
npm run preview
```

Open:

```text
http://127.0.0.1:4173
```

Confirm all of the following:

- hero still feels like an exhibition poster
- the logo, main image, and background image are all present
- the five categories are visually parallel
- mobile layout becomes vertical without collapsing the atmosphere
- no section reads like a transaction or product listing page

- [ ] **Step 4: Commit docs and verification-ready state**

If git is available, run:

```bash
git add README.md
git commit -m "docs: add homepage run instructions"
```

Expected: commit succeeds.

## Self-Review

### Spec coverage

- Single-page brand homepage: covered by Tasks 2 through 5
- Approved A direction: covered by Task 3
- Strong white space and poster-like hero: covered by Task 3 stylesheet and Task 2 structure
- Five equal collection categories: covered by Task 2 structure and Task 3 layout
- Minimal motion only: covered by Task 4
- Desktop and mobile consistency: covered by Task 3 responsive rules and Task 5 visual verification
- Existing three assets reused: covered by Task 2 HTML and Task 5 visual verification

### Placeholder scan

- No `TODO`, `TBD`, or “implement later” placeholders remain
- Every code step includes exact file content or exact edits
- Every verification step includes exact commands and expected outcome

### Type consistency

- `#hero` and `#collections` are the only page sections referenced throughout the plan
- `.reveal`, `.is-visible`, and `.collection-card` naming is consistent across HTML, CSS, and JS
- `npm test` and `npm run preview` are defined once in `package.json` and reused consistently
