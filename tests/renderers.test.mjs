import test from "node:test";
import assert from "node:assert/strict";

import { renderHeroActions, renderPage, renderSiteNav } from "../js/renderers.js";
import { buildCategoryLookup, filterResearchItems } from "../js/interactions.js";
import { siteContent } from "../js/siteContentUnified.js";

test("renderHeroActions returns two CTA links", () => {
  const html = renderHeroActions([
    { href: "#story", label: "读故事" },
    { href: "#objects", label: "看器物" }
  ]);

  assert.match(html, /读故事/);
  assert.match(html, /看器物/);
});

test("renderSiteNav wraps the mobile nav strip for scroll hints", () => {
  const html = renderSiteNav(siteContent.navigation, "home");

  assert.match(html, /data-nav-strip/);
  assert.match(html, /site-nav__links-wrap/);
  assert.doesNotMatch(html, />专题</);
});

test("buildCategoryLookup maps page slug to category object", () => {
  const lookup = buildCategoryLookup(siteContent.categories);

  assert.equal(lookup.get("tea").name, "茶具");
  assert.equal(lookup.get("art").href, "art.html");
});

test("renderPage renders the institutional portal home page with ledger rows, highlight cards, and shared detail panel", () => {
  const html = renderPage("home", siteContent);

  assert.match(html, /渔窑手工青花/);
  assert.match(html, /查看资料台账/);
  assert.match(html, /进入器物栏目/);
  assert.match(html, /来源与对象/);
  assert.match(html, /栏目总览/);
  assert.match(html, /资料台账/);
  assert.match(html, /重点对象/);
  assert.match(html, /资料网络/);
  assert.match(html, /时间脉络/);
  assert.match(html, /术语索引/);
  assert.match(html, /工艺图谱/);
  assert.match(html, /馆藏来源/);
  assert.match(html, /器物栏目/);
  assert.match(html, /home-orientation/);
  assert.match(html, /category-overview/);
  assert.match(html, /home-source-deck/);
  assert.match(html, /data-home-detail-panel/);
  assert.match(html, /data-detail-group="home-detail"/);
  assert.match(html, /portal-row/);
  assert.match(html, /highlight-card/);
  assert.doesNotMatch(html, /进入茶具专题|进入艺术品专题|featured-research|home-reading|data-research-search/);
  assert.doesNotMatch(html, /花器分类总览|咖啡具专题|冲煮术语|器具参数矩阵/);
  assert.doesNotMatch(html, /scroll-band/);
});

test("renderPage renders the art page with curated list, shared detail deck, and research ledger", () => {
  const html = renderPage("art", siteContent);

  assert.match(html, /艺术品/);
  assert.match(html, /重点馆藏/);
  assert.match(html, /策展列表/);
  assert.match(html, /馆藏对象细览/);
  assert.match(html, /资料台账/);
  assert.match(html, /看共享详情/);
  assert.match(html, /data-detail-root/);
  assert.match(html, /data-inline-detail-root/);
});

test("renderPage renders the tea page with typology cards and shared detail deck", () => {
  const html = renderPage("tea", siteContent);

  assert.match(html, /茶具/);
  assert.match(html, /茶具体系/);
  assert.match(html, /文献规则/);
  assert.match(html, /分水/);
  assert.match(html, /看茶具体系/);
  assert.match(html, /茶具详情档案/);
  assert.match(html, /茶具延伸研究/);
  assert.match(html, /资料台账/);
  assert.match(html, /data-detail-root/);
  assert.doesNotMatch(html, /栏目画轴/);
});

test("renderPage renders the coffee page with systems, matrix, archive deck, and research ledger", () => {
  const html = renderPage("coffee", siteContent);

  assert.match(html, /咖啡具/);
  assert.match(html, /冲煮系统/);
  assert.match(html, /参数矩阵/);
  assert.match(html, /历史档案/);
  assert.match(html, /资料台账/);
  assert.match(html, /冲煮档案详情/);
  assert.match(html, /page-header__meta/);
  assert.match(html, /data-detail-root/);
});

test("renderPage renders the tableware page with roster, embedded detail deck, and research ledger", () => {
  const html = renderPage("tableware", siteContent);

  assert.match(html, /桌面谱系/);
  assert.match(html, /馆藏样本/);
  assert.match(html, /研究判断/);
  assert.match(html, /资料台账/);
  assert.match(html, /data-detail-root/);
});

test("renderPage renders the vase page with typology cards and embedded detail deck", () => {
  const html = renderPage("vase", siteContent);

  assert.match(html, /花器谱系/);
  assert.match(html, /典籍规矩/);
  assert.match(html, /馆藏样本/);
  assert.match(html, /资料台账/);
  assert.match(html, /看花器谱系/);
  assert.match(html, /data-detail-root/);
  assert.match(html, /data-inline-detail-root/);
});

test("filterResearchItems returns only items matching the selected theme", () => {
  const result = filterResearchItems(siteContent.research.items, { tag: "海贸" });

  assert.ok(result.length > 0);
  assert.ok(result.every((item) => item.tags.includes("海贸")));
});

test("filterResearchItems supports compound tag and period filtering", () => {
  const result = filterResearchItems(siteContent.research.items, { tag: "工艺", period: "明清" });

  assert.ok(result.length > 0);
  assert.ok(result.every((item) => item.tags.includes("工艺")));
  assert.ok(result.every((item) => item.periods?.includes("明清")));
});

test("filterResearchItems supports source type and keyword search", () => {
  const result = filterResearchItems(siteContent.research.items, { sourceType: "国际机构", query: "景德镇" });

  assert.ok(result.length > 0);
  assert.ok(result.every((item) => item.sourceType === "国际机构"));
  assert.ok(result.every((item) => `${item.title} ${item.summary} ${item.tags.join(" ")}`.includes("景德镇")));
});

test("filterResearchItems returns empty array for unmatched search", () => {
  const result = filterResearchItems(siteContent.research.items, { query: "不存在的专题关键词" });

  assert.equal(result.length, 0);
});

test("renderPage renders category research modules for tea page", () => {
  const html = renderPage("tea", siteContent);

  assert.match(html, /相关历史节点/);
  assert.match(html, /相关术语/);
  assert.match(html, /观察维度/);
  assert.match(html, /茶具延伸研究/);
  assert.match(html, /data-collapsible-section/);
  assert.match(html, /data-collapsible-toggle/);
  assert.match(html, /research-strip--mobile-rail/);
  assert.match(html, /hero-actions--compact/);
  assert.match(html, /tag-row--compact/);
});

test("every category page keeps compact header tools without decorative background images", () => {
  siteContent.categories.forEach((category) => {
    const html = renderPage(category.slug, siteContent);

    assert.match(html, /page-header__meta/);
    assert.match(html, /看观察维度|看冲煮系统|看花器谱系|看茶具体系|看桌面谱系|看重点馆藏|看策展列表|看共享详情|看资料台账|看展陈延伸/);
    assert.doesNotMatch(html, /栏目画轴/);
  });
});

test("home and vase pages expose embedded detail interaction hooks", () => {
  const homeHtml = renderPage("home", siteContent);
  const vaseHtml = renderPage("vase", siteContent);

  assert.match(homeHtml, /data-home-detail-panel/);
  assert.match(homeHtml, /data-detail-group="home-detail"/);
  assert.match(homeHtml, /data-detail-trigger/);
  assert.match(vaseHtml, /data-detail-root/);
  assert.match(vaseHtml, /data-detail-panel/);
  assert.match(vaseHtml, /data-inline-detail-trigger/);
  assert.match(vaseHtml, /data-inline-detail-panel/);
});
