import test from "node:test";
import assert from "node:assert/strict";

import { siteContent } from "../js/siteContentUnified.js";

test("siteContent exposes the runtime sections used by the static site", () => {
  assert.ok(siteContent.home);
  assert.ok(siteContent.tea);
  assert.ok(siteContent.tableware);
  assert.ok(siteContent.coffee);
  assert.ok(siteContent.vase);
  assert.ok(siteContent.art);
  assert.equal(siteContent.categories.length, 5);
  assert.ok(siteContent.research.items.length >= 20);
});

test("home timeline supports the Tang through Qing era narrative", () => {
  const timeline = siteContent.home.timeline;
  const eraLabels = timeline.map((item) => item.era);
  const requiredIds = [
    "tang-beginnings",
    "qingbai-bridge",
    "yuan-origins",
    "tianbai-yongle",
    "xuande-stem-cup",
    "porcelain-capital",
    "kraak-export",
    "global-export"
  ];

  requiredIds.forEach((id) => assert.ok(timeline.some((item) => item.id === id), id));
  assert.ok(eraLabels.includes("唐代"));
  assert.ok(eraLabels.includes("宋元"));
  assert.ok(eraLabels.includes("元代"));
  assert.ok(eraLabels.includes("永乐"));
  assert.ok(eraLabels.includes("宣德"));
  assert.ok(eraLabels.includes("景德镇"));
  assert.ok(eraLabels.includes("晚明"));
  assert.ok(eraLabels.includes("海贸"));
  assert.ok(timeline.length >= 15);
  assert.ok(timeline.every((item) => item.imagePath));
  assert.ok(timeline.every((item) => item.relatedCategories?.length >= 1));
});

test("home timeline gives each rendered dynasty at least three narrative nodes", () => {
  const groups = new Map([
    ["唐", ["唐代"]],
    ["宋", ["宋元", "宋代"]],
    ["元", ["元代"]],
    ["明", ["永乐", "宣德", "明代", "晚明", "景德镇"]],
    ["清", ["清代", "海贸"]]
  ]);

  groups.forEach((labels, dynasty) => {
    const count = siteContent.home.timeline.filter((item) => labels.includes(item.era)).length;
    assert.ok(count >= 3, `${dynasty}:${count}`);
  });
});

test("home exposes era image annotations without a standalone homepage diagram", () => {
  const diagram = siteContent.home.annotationDiagram;

  assert.equal(diagram?.id, "bluewhite-annotation");
  assert.ok(diagram.items.length >= 5);
  assert.ok(diagram.items.every((item) => item.id));
  assert.ok(diagram.items.every((item) => item.x >= 0 && item.x <= 100));
  assert.ok(diagram.items.every((item) => item.y >= 0 && item.y <= 100));
  assert.ok(diagram.items.every((item) => item.summary.length >= 12));
});

test("navigation exposes dynasty child pages for each category where content exists", () => {
  const bySlug = new Map(siteContent.navigation.map((item) => [item.slug, item]));

  assert.equal(bySlug.get("tea")?.children.length, 5);
  assert.equal(bySlug.get("tableware")?.children.length, 5);
  assert.equal(bySlug.get("coffee")?.children.length, 3);
  assert.equal(bySlug.get("vase")?.children.length, 5);
  assert.equal(bySlug.get("art")?.children.length, 5);
  assert.ok(bySlug.get("tea")?.children.some((item) => item.href === "ming-tea.html"));
  assert.ok(bySlug.get("coffee")?.children.every((item) => ["元", "明", "清"].includes(item.label)));
});

test("category datasets keep detail decks and research ledgers for cross-page reading", () => {
  siteContent.categories.forEach((category) => {
    assert.ok(category.href.endsWith(".html"));
    assert.ok(category.detailDeck?.items?.length >= 5, category.slug);
    assert.ok(category.researchLedger?.length >= 4, category.slug);
  });

  assert.ok(siteContent.art.pageLinks.some((item) => item.label === "看共享详情"));
  assert.ok(siteContent.coffee.systems.length >= 6);
  assert.ok(siteContent.categories.reduce((sum, category) => sum + category.researchLedger.length, 0) >= 30);
});
