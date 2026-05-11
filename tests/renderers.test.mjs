import test from "node:test";
import assert from "node:assert/strict";

import { renderHeroActions, renderPage } from "../js/renderers.js";
import { buildCategoryLookup } from "../js/interactions.js";
import { siteContent } from "../js/siteContent.js";

test("renderHeroActions returns two CTA links", () => {
  const html = renderHeroActions([
    { href: "#story", label: "读故事" },
    { href: "#objects", label: "看器物" }
  ]);

  assert.match(html, /读故事/);
  assert.match(html, /看器物/);
});

test("buildCategoryLookup maps page slug to category object", () => {
  const lookup = buildCategoryLookup(siteContent.categories);

  assert.equal(lookup.get("tea").name, "茶具");
  assert.equal(lookup.get("art").href, "art.html");
});

test("renderPage renders home hero and reading sections", () => {
  const html = renderPage("home", siteContent);

  assert.match(html, /渔窑手工青花/);
  assert.match(html, /读故事/);
  assert.match(html, /器物故事/);
});

test("renderPage renders category tabs for tea page", () => {
  const html = renderPage("tea", siteContent);

  assert.match(html, /茶具/);
  assert.match(html, /用途/);
  assert.match(html, /延伸阅读/);
});
