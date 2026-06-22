import test from "node:test";
import assert from "node:assert/strict";

import { renderHeroActions, renderPage, renderSiteNav } from "../js/renderers.js";
import { buildCategoryLookup, filterResearchItems } from "../js/interactions.js";
import { siteContent } from "../js/siteContentUnified.js";

test("renderHeroActions returns CTA links", () => {
  const html = renderHeroActions([
    { href: "#story", label: "读故事" },
    { href: "#objects", label: "看器物" }
  ]);

  assert.match(html, /读故事/);
  assert.match(html, /看器物/);
});

test("renderSiteNav renders category groups and dynasty child links", () => {
  const html = renderSiteNav(siteContent.navigation, "tea");

  assert.match(html, /data-nav-strip/);
  assert.match(html, /site-nav__links-wrap/);
  assert.match(html, /aria-expanded="false"/);
  assert.doesNotMatch(html, /aria-expanded="true"/);
  assert.match(html, /<div class="site-nav__sub" hidden>/);
  assert.match(html, /href="ming-tea\.html"/);
  assert.match(html, /aria-label="展开茶具朝代"/);
  assert.doesNotMatch(html, />专题</);
});

test("buildCategoryLookup maps page slug to category object", () => {
  const lookup = buildCategoryLookup(siteContent.categories);

  assert.equal(lookup.get("tea").name, "茶具");
  assert.equal(lookup.get("art").href, "art.html");
});

test("renderPage renders the particle hero and dynasty narrative home page", () => {
  const html = renderPage("home", siteContent);

  assert.match(html, /hero-section--particle/);
  assert.doesNotMatch(html, /<section class="annotation-diagram"/);
  assert.match(html, /era-visual__annotations/);
  assert.match(html, /data-annotation-root="era-唐"/);
  assert.match(html, /data-annotation-trigger="胎体"/);
  assert.match(html, /data-annotation-panel/);
  assert.match(html, /aria-selected="true"/);
  assert.match(html, /data-particle-hero/);
  assert.match(html, /hero-verse__text/);
  assert.match(html, /宋 · 姜夔《扬州慢》/);
  assert.match(html, /data-era-nav/);
  assert.match(html, /data-era-bg="唐"/);
  assert.match(html, /data-era-bg="清"/);
  assert.match(html, /id="era-唐"/);
  assert.match(html, /id="era-宋"/);
  assert.match(html, /id="era-元"/);
  assert.match(html, /id="era-明"/);
  assert.match(html, /id="era-清"/);
  assert.match(html, /data-explore="era-明-explorer"/);
  assert.match(html, /data-era-explorer="era-明-explorer"/);
  assert.match(html, /role="dialog"/);
  assert.match(html, /data-era-explorer-tab="era-唐-explorer-nodes"/);
  assert.match(html, /data-era-explorer-panel="era-唐-explorer-nodes"/);
  assert.match(html, /节点脉络/);
  assert.match(html, /工艺要点/);
  assert.match(html, /术语/);
  assert.match(html, /去看分类/);
  assert.doesNotMatch(html, /class="era-explore-panel"/);
  assert.match(html, /era-subnav__item/);
  assert.match(html, /data-era-node-target="era-唐-node-tang-teaware-forms"/);
  assert.match(html, /data-era-node-panel="era-唐-node-tang-teaware-forms"/);
  assert.match(html, /器形组合比单件器物更适合解释唐代分类入口/);
  assert.match(html, /工艺要点/);
  assert.match(html, /关键术语/);
  assert.doesNotMatch(html, /home-section-nav|资料台账|重点对象|data-home-detail-panel/);
});

test("renderPage links era actions to dynasty-specific category pages", () => {
  const html = renderPage("home", siteContent);

  assert.match(html, /href="tang-tea\.html"/);
  assert.match(html, /href="tang-art\.html"/);
  assert.match(html, /href="song-tableware\.html"/);
  assert.match(html, /href="song-tea\.html"/);
  assert.match(html, /href="yuan-tea\.html"/);
  assert.match(html, /href="yuan-coffee\.html"/);
  assert.match(html, /href="ming-vase\.html"/);
  assert.match(html, /href="ming-coffee\.html"/);
  assert.match(html, /href="qing-coffee\.html"/);
  assert.match(html, /href="qing-art\.html"/);
});

test("renderPage uses a blue-and-white porcelain image for the Qing era visual", () => {
  const html = renderPage("home", siteContent);
  const qingSection = html.match(/<section class="era-section" id="era-清"[\s\S]*?<\/section>/)?.[0] ?? "";

  assert.match(qingSection, /img\/era-qing-dragon\.jpg/);
  assert.doesNotMatch(qingSection, /img\/dynasty-pages\/qing-bowl\.jpg/);
});

test("renderPage aligns dynasty action links with navigation child pages", () => {
  const html = renderPage("home", siteContent);
  const dynastyLabels = new Map([
    ["tang", "唐"],
    ["song", "宋"],
    ["yuan", "元"],
    ["ming", "明"],
    ["qing", "清"]
  ]);

  dynastyLabels.forEach((label, pinyin) => {
    const expected = siteContent.navigation
      .filter((item) => item.slug !== "home")
      .filter((item) => item.children?.some((child) => child.label === label))
      .map((item) => `${pinyin}-${item.slug}.html`)
      .sort();
    const rendered = [...html.matchAll(new RegExp(`href="${pinyin}-([^"]+\\.html)"`, "g"))]
      .map((match) => `${pinyin}-${match[1]}`)
      .filter((href, index, list) => list.indexOf(href) === index)
      .sort();

    assert.deepEqual(rendered, expected, label);
  });
});

test("renderPage keeps category pages and shared detail hooks available", () => {
  const pages = ["tea", "tableware", "coffee", "vase", "art"];

  pages.forEach((page) => {
    const html = renderPage(page, siteContent);

    assert.match(html, new RegExp(`category-page-shell category-page-shell--${page}`), page);
    assert.match(html, /category-hero/, page);
    assert.match(html, /category-hero__grid/, page);
    assert.match(html, /category-hero__media/, page);
    assert.match(html, /category-hero-guide/, page);
    assert.match(html, /category-guide-card artifact-motion-card/, page);
    assert.match(html, /aria-label="[^"]+快捷入口"/, page);
    assert.doesNotMatch(html, /category-hero__summary|category-hero-guide__intro|summary-stat-row/, page);
    assert.match(html, /category-section-nav/, page);
    assert.match(html, /data-category-section-nav/, page);
    assert.match(html, /category-tabs category-tabs--directory/, page);
    assert.match(html, /data-category-directory/, page);
    assert.match(html, /category-tabs__panel-wrap/, page);
    assert.match(html, /category-module/, page);
    assert.match(html, /浏览重点/, page);
    assert.match(html, /参考资料|器物细览|冲煮细览|茶具细览|馆藏细览/, page);
    assert.match(html, /data-detail-root/, page);
  });
});

test("renderPage gives each category page a scannable section navigation with matching module anchors", () => {
  const pages = ["tea", "tableware", "coffee", "vase", "art"];

  pages.forEach((page) => {
    const html = renderPage(page, siteContent);
    const directoryLinks = [...html.matchAll(/class="category-section-nav__item" href="#([^"]+)"/g)].map((match) => match[1]);

    assert.ok(directoryLinks.length >= 5, page);
    directoryLinks.forEach((id) => {
      assert.match(html, new RegExp(`id="${id}"`), `${page}:${id}`);
    });
  });
});

test("renderPage removes internal wording from public page copy", () => {
  const pages = ["home", "tea", "tableware", "coffee", "vase", "art"];
  const blockedCopy = /分类判断|文献规则|资料台账|资料模块|观察维度|研究判断|历史档案|来源档案|栏目主目录|栏目摘要|台账|档案|规则|判断|支撑/;

  pages.forEach((page) => {
    const html = renderPage(page, siteContent);

    assert.doesNotMatch(html, blockedCopy, page);
  });
});

test("category browsing tabs expose linked lower-page targets", () => {
  const pages = ["tea", "tableware", "coffee", "vase", "art"];

  pages.forEach((page) => {
    const html = renderPage(page, siteContent);
    const labels = [...html.matchAll(/data-category-filter-label="([^"]+)"/g)].map((match) => match[1]);
    const targetFacets = [...html.matchAll(/data-category-facets="([^"]+)"/g)].map((match) => match[1]);

    assert.match(html, /data-category-filter-summary/, page);
    assert.match(html, /data-category-filter-label="用途"/, page);
    assert.match(html, /data-category-filter-label="器形"/, page);
    assert.match(html, /data-category-filter-target/, page);
    assert.match(html, /data-category-facets="[^"]*器形/, page);
    labels.forEach((label) => {
      assert.ok(targetFacets.some((facet) => facet.includes(label)), `${page}:${label}`);
    });
  });
});

test("category pages expose richer object, detail, collection, and reference content", () => {
  const tea = renderPage("tea", siteContent);
  const tableware = renderPage("tableware", siteContent);
  const coffee = renderPage("coffee", siteContent);
  const vase = renderPage("vase", siteContent);
  const art = renderPage("art", siteContent);
  const collection = tea.match(/id="tea-collection"[\s\S]*?id="tea-ledger"/)?.[0] ?? "";
  const artHighlights = art.match(/id="art-highlights"[\s\S]*?id="art-list"/)?.[0] ?? "";
  const categoryPages = [tea, tableware, coffee, vase, art];

  assert.match(tea, /typology-card__body/);
  assert.match(tea, /阅读重点/);
  assert.match(tea, /detail-panel__content-grid/);
  assert.match(tea, />典籍</);
  assert.match(vase, />典籍</);
  assert.doesNotMatch(vase, /典籍规矩/);
  categoryPages.forEach((html) => {
    assert.match(html, /enriched-brief-card/);
    assert.match(html, /detail-meta-chip/);
    assert.match(html, /enriched-brief-card__facts/);
  });
  assert.match(tea, /reference-card__insight/);
  assert.ok((collection.match(/collection-card/g) ?? []).length >= 6);
  assert.match(tableware, /tableware-roster-card__body/);
  assert.match(coffee, /system-card__body/);
  assert.match(coffee, /history-card__body/);
  assert.match(art, /inline-detail__summary/);
  assert.match(art, /collection-list__body/);
  assert.ok((artHighlights.match(/research-card inline-detail/g) ?? []).length >= 6);
});

test("filterResearchItems supports tag, period, source type, and keyword filters", () => {
  const byTag = filterResearchItems(siteContent.research.items, { tag: "海贸" });
  const compound = filterResearchItems(siteContent.research.items, { tag: "工艺", period: "明清" });
  const bySource = filterResearchItems(siteContent.research.items, { sourceType: "国际机构", query: "景德镇" });
  const empty = filterResearchItems(siteContent.research.items, { query: "不存在的专题关键词" });

  assert.ok(byTag.length > 0);
  assert.ok(byTag.every((item) => item.tags.includes("海贸")));
  assert.ok(compound.length > 0);
  assert.ok(compound.every((item) => item.tags.includes("工艺")));
  assert.ok(compound.every((item) => item.periods?.includes("明清")));
  assert.ok(bySource.length > 0);
  assert.ok(bySource.every((item) => item.sourceType === "国际机构"));
  assert.equal(empty.length, 0);
});
