import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("base stylesheet uses the unified system font stack", () => {
  const stylesheet = readFileSync(new URL("../css/base.css", import.meta.url), "utf8");

  assert.match(
    stylesheet,
    /-apple-system,\s*BlinkMacSystemFont,\s*"Segoe UI",\s*Roboto,\s*"Helvetica Neue",\s*Arial,\s*"PingFang SC",\s*"Microsoft YaHei",\s*sans-serif/
  );
});

test("styles import artifact refinements after core page styles", () => {
  const stylesheet = readFileSync(new URL("../css/styles.css", import.meta.url), "utf8");

  assert.match(stylesheet, /@import "\.\/pages\.css";\s*@import "\.\/artifacts\.css\?v=20260609-guide-panel1";/);
});

test("pages stylesheet defines era layout, navigation, and responsive rules", () => {
  const stylesheet = readFileSync(new URL("../css/pages.css", import.meta.url), "utf8");
  const balance = [...stylesheet].reduce((count, char) => {
    if (char === "{") return count + 1;
    if (char === "}") return count - 1;
    return count;
  }, 0);

  assert.equal(balance, 0);
  assert.match(stylesheet, /\.era-section/);
  assert.match(stylesheet, /\.era-layout/);
  assert.match(stylesheet, /\.era-visual/);
  assert.match(stylesheet, /\.era-nav/);
  assert.match(stylesheet, /@media \(max-width: 768px\)/);
  assert.match(stylesheet, /@media \(max-width: 480px\)/);
});

test("artifact stylesheet defines particle hero and era background layers", () => {
  const stylesheet = readFileSync(new URL("../css/artifacts.css", import.meta.url), "utf8");

  assert.match(stylesheet, /--era-tang-bg/);
  assert.match(stylesheet, /--era-song-bg/);
  assert.match(stylesheet, /--era-yuan-bg/);
  assert.match(stylesheet, /--era-ming-bg/);
  assert.match(stylesheet, /--era-qing-bg/);
  assert.match(stylesheet, /\.era-bg-layer\.is-active/);
  assert.match(stylesheet, /\.hero-section--particle/);
  assert.match(stylesheet, /\.particle-hero__canvas/);
  assert.match(stylesheet, /\.hero-verse/);
  assert.match(stylesheet, /\.era-visual__annotations/);
  assert.match(stylesheet, /@keyframes eraImageBreathe/);
  assert.match(stylesheet, /\.era-section\.is-visible\s+\.era-visual::after/);
  assert.match(stylesheet, /@keyframes eraHotspotPulse/);
  assert.match(stylesheet, /@keyframes eraAnnotationPanelIn/);
  assert.match(stylesheet, /animation:\s*eraAnnotationPanelIn/);
  assert.match(stylesheet, /\.era-annotation-marker\[aria-selected="true"\]/);
  assert.match(stylesheet, /\.era-annotation-panel/);
  assert.match(stylesheet, /\.era-explorer/);
  assert.match(stylesheet, /\.era-explorer__tabs/);
  assert.match(stylesheet, /\.era-explorer__panel\[hidden\]/);
  assert.match(stylesheet, /animation:\s*eraNodePanelIn 220ms/);
  assert.match(stylesheet, /\.era-section\s*\{[\s\S]*transition:\s*opacity 0\.45s/);
  assert.doesNotMatch(stylesheet, /clip-path:\s*inset\(0 0 100% 0\)/);
  assert.match(stylesheet, /prefers-reduced-motion:\s*reduce/);
  assert.match(stylesheet, /animation:\s*none/);
});

test("layout stylesheet keeps navigation scrollable on narrow screens", () => {
  const stylesheet = readFileSync(new URL("../css/layout.css", import.meta.url), "utf8");

  assert.match(stylesheet, /overflow-x:\s*auto/);
  assert.match(stylesheet, /scrollbar-width:\s*none/);
  assert.match(stylesheet, /\.site-nav__links-wrap\s*\{[\s\S]*min-width:\s*0/);
  assert.match(stylesheet, /scroll-snap-type:\s*x proximity/);
});

test("category pages define unified directory layout and responsive interaction rules", () => {
  const pagesStylesheet = readFileSync(new URL("../css/pages.css", import.meta.url), "utf8");
  const artifactStylesheet = readFileSync(new URL("../css/artifacts.css", import.meta.url), "utf8");

  assert.match(pagesStylesheet, /\.category-page-shell/);
  assert.match(pagesStylesheet, /\.category-hero/);
  assert.match(pagesStylesheet, /\.category-hero\s*\{[\s\S]*border-radius:\s*0\.9rem/);
  assert.match(pagesStylesheet, /\.category-page-shell > \.category-hero\s*\{[\s\S]*max-width:\s*calc\(100% - var\(--category-rail-width\) - var\(--category-rail-gap\)\)/);
  assert.match(pagesStylesheet, /\.category-hero__grid/);
  assert.match(pagesStylesheet, /\.category-hero__media/);
  assert.match(pagesStylesheet, /\.category-hero-guide/);
  assert.match(pagesStylesheet, /\.category-hero-guide__actions/);
  assert.match(pagesStylesheet, /\.category-guide-card/);
  assert.match(pagesStylesheet, /\.category-content-stack/);
  assert.match(pagesStylesheet, /\.category-section-nav/);
  assert.match(pagesStylesheet, /\.category-section-nav[\s\S]*grid-area:\s*rail/);
  assert.match(pagesStylesheet, /\.category-section-nav::before/);
  assert.match(pagesStylesheet, /\.category-section-nav[\s\S]*position:\s*sticky/);
  assert.match(pagesStylesheet, /\.category-section-nav__item/);
  assert.match(pagesStylesheet, /\.category-section-nav__item::before/);
  assert.match(pagesStylesheet, /\.category-tabs--directory/);
  assert.match(pagesStylesheet, /\.category-filter-summary/);
  assert.match(pagesStylesheet, /\.category-tabs__panel-wrap/);
  assert.match(pagesStylesheet, /\.category-module/);
  assert.match(pagesStylesheet, /\.category-module-grid/);
  assert.match(pagesStylesheet, /\.detail-panel__content-grid/);
  assert.match(pagesStylesheet, /\.reference-card/);
  assert.match(pagesStylesheet, /\.system-card__body/);
  assert.match(pagesStylesheet, /\.tableware-roster-card__body/);
  assert.match(pagesStylesheet, /\[data-category-filter-target\]\[data-category-filter-state="active"\]/);
  assert.match(pagesStylesheet, /@media \(max-width: 960px\)[\s\S]*\.category-hero__grid/);
  assert.match(pagesStylesheet, /@media \(max-width: 720px\)[\s\S]*\.category-content-stack/);
  assert.match(pagesStylesheet, /@media \(max-width: 720px\)[\s\S]*\.category-section-nav[\s\S]*overflow-x:\s*auto/);
  assert.match(pagesStylesheet, /@media \(max-width: 640px\)[\s\S]*\.category-hero-guide__actions/);
  assert.match(pagesStylesheet, /@media \(max-width: 640px\)[\s\S]*\.category-section-nav/);
  assert.match(artifactStylesheet, /@keyframes categoryPanelReveal/);
  assert.match(artifactStylesheet, /\.category-tabs--directory\s+\.tab-panel:not\(\[hidden\]\)/);
  assert.match(artifactStylesheet, /\.category-section-nav/);
  assert.match(artifactStylesheet, /\.category-option-strip/);
  assert.match(artifactStylesheet, /\.category-option-chip\[aria-selected="true"\]/);
  assert.match(artifactStylesheet, /\[data-category-filter-target\]\[data-category-filter-state="active"\][\s\S]*background:\s*transparent/);
  assert.match(artifactStylesheet, /prefers-reduced-motion:\s*reduce[\s\S]*categoryPanelReveal/);
});

test("artifact stylesheet adds layered card motion with reduced-motion fallback", () => {
  const stylesheet = readFileSync(new URL("../css/artifacts.css", import.meta.url), "utf8");

  assert.match(stylesheet, /@keyframes artifactCardMaterialize/);
  assert.match(stylesheet, /@keyframes artifactCardScan/);
  assert.match(stylesheet, /@keyframes artifactPorcelainGlaze/);
  assert.match(stylesheet, /\.research-card::before/);
  assert.match(stylesheet, /\.research-card::after/);
  assert.match(stylesheet, /\.portal-row::before/);
  assert.match(stylesheet, /\.timeline-node::before/);
  assert.match(stylesheet, /\.stat-card:hover/);
  assert.match(stylesheet, /\.reference-card:hover/);
  assert.match(stylesheet, /\.tableware-roster-card:hover/);
  assert.doesNotMatch(stylesheet, /\.has-card-motion\s+\.research-card:not\(\.is-visible\)/);
  assert.match(stylesheet, /\.research-card:hover/);
  assert.match(stylesheet, /\.category-guide-card:hover/);
  assert.match(stylesheet, /\.artifact-motion-card:hover/);
  assert.match(stylesheet, /aria-selected="true"[\s\S]*artifactCardScan/);
  assert.match(stylesheet, /data-category-filter-state="active"[\s\S]*artifactCardScan/);
  assert.match(stylesheet, /prefers-reduced-motion:\s*reduce[\s\S]*artifactCardMaterialize/);
  assert.match(stylesheet, /prefers-reduced-motion:\s*reduce[\s\S]*\.timeline-node::before/);
  assert.match(stylesheet, /prefers-reduced-motion:\s*reduce[\s\S]*\.artifact-motion-card::before/);
});
