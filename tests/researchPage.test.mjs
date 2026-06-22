import test from "node:test";
import assert from "node:assert/strict";

import { renderResearchDetailPage, resolveResearchItem } from "../js/renderers.js";
import { getResearchIdFromLocation } from "../js/interactions.js";
import { siteContent } from "../js/siteContentUnified.js";

test("resolveResearchItem returns the matching entry by id", () => {
  const item = resolveResearchItem("yuan-origins", siteContent.research.items);

  assert.equal(item.title, "元代定型");
});

test("renderResearchDetailPage returns fallback content for unknown ids", () => {
  const html = renderResearchDetailPage(undefined, siteContent);

  assert.match(html, /研究专题|专题导览/);
  assert.match(html, /研究路径/);
});

test("renderResearchDetailPage renders observation and source sections for a valid topic", () => {
  const html = renderResearchDetailPage("global-export", siteContent);

  assert.match(html, /观察笔记/);
  assert.match(html, /延伸阅读/);
  assert.match(html, /出处与参考/);
  assert.match(html, /关联图谱/);
  assert.doesNotMatch(html, /来源档案|档案|规则|判断|台账|支撑/);
});

test("getResearchIdFromLocation reads the id query parameter", () => {
  const id = getResearchIdFromLocation("https://example.com/research.html?id=global-export");

  assert.equal(id, "global-export");
});
