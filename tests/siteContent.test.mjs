import test from "node:test";
import assert from "node:assert/strict";

import { siteContent } from "../js/siteContentUnified.js";

test("siteContent exposes home, categories, about, and research sections", () => {
  assert.ok(siteContent.home);
  assert.ok(siteContent.tea);
  assert.ok(siteContent.tableware);
  assert.ok(siteContent.coffee);
  assert.ok(siteContent.vase);
  assert.ok(siteContent.art);
  assert.equal(siteContent.categories.length, 5);
  assert.ok(siteContent.about.sections.length >= 4);
  assert.ok(siteContent.research.items.length >= 20);
});

test("siteContent exposes portal home metadata instead of first-level topic routing", () => {
  assert.equal(siteContent.home.hero.subtitle, "青花历史、馆藏来源与器物栏目首页");
  assert.deepEqual(
    siteContent.home.hero.actions.map((item) => item.label),
    ["查看资料台账", "进入器物栏目"]
  );
  assert.equal(siteContent.home.featureSpotlight?.sectionId, "home-orientation");
  assert.equal(siteContent.home.featuredResearch, null);
  assert.equal(siteContent.home.researchIndex, null);
  assert.equal(siteContent.home.portalTitle, "来源与对象");
  assert.equal(siteContent.home.sourceDeck?.title, "资料台账");
  assert.equal(siteContent.home.featuredRecordTitle, "重点对象");
  assert.equal(siteContent.home.defaultDetailId, siteContent.home.sourceDeck.items[0]?.id);
  assert.equal(siteContent.home.categoryOverview.length, siteContent.categories.length);
  assert.ok(siteContent.home.sourceDeck?.items?.length >= 8);
  assert.ok(siteContent.home.sourceDeck.items.every((item) => item.sourceLinks?.length >= 1));
  assert.ok(siteContent.home.featuredRecords?.length >= 5);
  assert.ok(siteContent.home.featuredRecords.every((item) => item.sourceName));
  assert.ok(siteContent.home.featuredRecords.every((item) => item.sourceUrl));
  assert.ok(siteContent.home.institutionSignals?.length >= 5);
  assert.equal(siteContent.home.researchPaths.length, 0);
  assert.equal(siteContent.home.readingCards.length, 0);
  assert.equal(siteContent.home.glossaryTitle, "术语索引");
  assert.ok(siteContent.home.networkPanels.some((item) => item.title.includes("城市系统")));
  assert.ok(siteContent.home.timeline.some((item) => item.title.includes("景德镇")));
});

test("siteContent keeps tea and tableware category detail decks available for cross-page navigation", () => {
  const tea = siteContent.categories.find((item) => item.slug === "tea");
  const tableware = siteContent.categories.find((item) => item.slug === "tableware");

  assert.ok(tea?.historyNote?.length >= 20);
  assert.ok(tea?.summaryStats?.length >= 4);
  assert.ok(tea?.classificationBands?.length >= 3);
  assert.ok(tea?.typologyList?.length >= 6);
  assert.ok(tea?.detailDeck?.items?.length >= 6);
  assert.ok(tea?.detailDeck.items.every((item) => item.sourceLinks?.length >= 1));
  assert.ok(tea?.collectionHighlights?.length >= 4);
  assert.ok(tea?.researchLedger?.length >= 6);
  assert.equal(tea?.sectionHeadings?.typology?.title, "茶具体系");
  assert.ok(tableware?.roster?.length >= 5);
  assert.ok(tableware?.detailDeck?.items?.length >= 5);
  assert.ok(tableware?.researchLedger?.length >= 7);
});

test("other category datasets remain available for cross-category navigation", () => {
  const coffee = siteContent.categories.find((item) => item.slug === "coffee");
  const vase = siteContent.categories.find((item) => item.slug === "vase");
  const art = siteContent.categories.find((item) => item.slug === "art");

  assert.ok(coffee?.classificationBands?.length >= 3);
  assert.ok(coffee?.systemCards?.length >= 6);
  assert.ok(coffee?.detailDeck?.items?.length >= 5);
  assert.ok(siteContent.coffee.systems?.length >= 6);
  assert.ok(vase?.summaryStats?.length >= 4);
  assert.ok(vase?.typologyList?.length >= 6);
  assert.ok(vase?.detailDeck?.items?.length >= 6);
  assert.ok(vase?.detailDeck.items.every((item) => item.sourceLinks?.length >= 1));
  assert.ok(art?.collectionHighlights?.length >= 4);
  assert.ok(art?.collectionList?.length >= 5);
  assert.ok(art?.detailDeck?.items?.length >= 5);
  assert.ok(art?.researchLedger?.length >= 8);
  assert.ok(art?.pageLinks.some((item) => item.label === "看共享详情"));
  assert.ok(art?.sourceInstitutions?.some((item) => item.title === "UNESCO WHC"));
});

test("research ids remain resolvable from the shared research library", () => {
  const ids = new Set(siteContent.research.items.map((item) => item.id));

  assert.ok(ids.has("qingbai-bridge"));
  assert.ok(ids.has("yuan-origins"));
  assert.ok(ids.has("tianbai-yongle"));
  assert.ok(ids.has("global-export"));
  assert.ok(ids.has("manual-brewing-protocol"));
  assert.ok(ids.has("espresso-pressure-workflow"));
});
