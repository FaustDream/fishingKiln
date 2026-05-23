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

test("pages stylesheet defines the coffee homepage portal, shared detail modules, and responsive breakpoints", () => {
  const stylesheet = readFileSync(new URL("../css/pages.css", import.meta.url), "utf8");
  const balance = [...stylesheet].reduce((count, char) => {
    if (char === "{") return count + 1;
    if (char === "}") return count - 1;
    return count;
  }, 0);

  assert.equal(balance, 0);
  assert.match(stylesheet, /\.hero-section--portal/);
  assert.match(stylesheet, /\.home-portal/);
  assert.match(stylesheet, /\.detail-dock/);
  assert.match(stylesheet, /\.feature-focus-section/);
  assert.match(stylesheet, /\.research-index-section/);
  assert.match(stylesheet, /\.institution-section/);
  assert.match(stylesheet, /\.detail-deck/);
  assert.match(stylesheet, /\.collection-list/);
  assert.match(stylesheet, /\.coffee-system-grid/);
  assert.match(stylesheet, /\.protocol-ledger/);
  assert.match(stylesheet, /\.coffee-history-grid/);
  assert.match(stylesheet, /\.inline-detail__panel/);
  assert.match(stylesheet, /\.hero-copy h1\s*\{[\s\S]*white-space:\s*nowrap/);
  assert.doesNotMatch(stylesheet, /\.scroll-band/);
  assert.match(stylesheet, /@media \(max-width: 960px\)/);
  assert.match(stylesheet, /@media \(max-width: 720px\)/);
});

test("pages stylesheet defines shared detail deck selection states", () => {
  const stylesheet = readFileSync(new URL("../css/pages.css", import.meta.url), "utf8");

  assert.match(stylesheet, /\.detail-trigger\[aria-selected="true"\]/);
  assert.match(stylesheet, /\.detail-deck__list/);
  assert.match(stylesheet, /\.detail-panel__meta/);
  assert.match(stylesheet, /\.inline-detail__trigger\[aria-expanded="true"\]/);
  assert.match(stylesheet, /\.inline-detail__facts/);
  assert.match(stylesheet, /\.inline-detail__meta/);
});

test("layout stylesheet compresses navigation for narrow screens", () => {
  const stylesheet = readFileSync(new URL("../css/layout.css", import.meta.url), "utf8");

  assert.match(stylesheet, /overflow-x:\s*auto/);
  assert.match(stylesheet, /scrollbar-width:\s*none/);
  assert.match(stylesheet, /min-width:\s*4\.25rem/);
  assert.match(stylesheet, /\.site-nav__links-wrap\s*\{[\s\S]*min-width:\s*0/);
  assert.match(stylesheet, /scroll-snap-type:\s*x proximity/);
  assert.match(stylesheet, /site-nav__links-wrap::before/);
});

test("components stylesheet defines mobile collapsible controls", () => {
  const stylesheet = readFileSync(new URL("../css/components.css", import.meta.url), "utf8");

  assert.match(stylesheet, /\.section-toggle/);
  assert.match(stylesheet, /\.category-collapsible/);
  assert.match(stylesheet, /display:\s*inline-flex/);
  assert.match(stylesheet, /\.hero-actions--compact/);
  assert.match(stylesheet, /\.tag-row--compact/);
});
