import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const publicPages = ["index.html", "tea.html", "tableware.html", "coffee.html", "vase.html", "art.html", "research.html"];
const dynastyPages = [
  "tang-tea.html",
  "tang-tableware.html",
  "tang-vase.html",
  "tang-art.html",
  "song-tea.html",
  "song-tableware.html",
  "song-vase.html",
  "song-art.html",
  "yuan-tea.html",
  "yuan-tableware.html",
  "yuan-coffee.html",
  "yuan-vase.html",
  "yuan-art.html",
  "ming-tea.html",
  "ming-tableware.html",
  "ming-coffee.html",
  "ming-vase.html",
  "ming-art.html",
  "qing-tea.html",
  "qing-tableware.html",
  "qing-coffee.html",
  "qing-vase.html",
  "qing-art.html"
];

test("public entry pages load the current interaction bundle", () => {
  publicPages.forEach((page) => {
    const html = readFileSync(join(root, page), "utf8");

    assert.match(html, /js\/main\.js\?v=20260609-guide-panel1/, page);
  });
});

test("all navigation dynasty pages exist as standalone UTF-8 HTML files", () => {
  dynastyPages.forEach((page) => {
    const file = join(root, page);
    const html = readFileSync(file, "utf8");

    assert.ok(html.startsWith("<!DOCTYPE html>"), page);
    assert.match(html, /<meta charset="UTF-8">/, page);
    assert.match(html, /渔窑手工青花/, page);
    assert.match(html, /href="index\.html"/, page);
  });
});

test("standalone dynasty pages reference existing local image assets", () => {
  dynastyPages.forEach((page) => {
    const html = readFileSync(join(root, page), "utf8");
    const srcMatches = [...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)];

    assert.ok(srcMatches.length >= 1, page);
    srcMatches.forEach(([, src]) => {
      if (/^https?:\/\//.test(src)) return;
      assert.ok(existsSync(join(root, src)), `${page} -> ${src}`);
    });
  });
});

test("standalone dynasty pages use public-facing wording", () => {
  const blockedCopy = /分类判断|文献规则|资料台账|资料模块|观察维度|研究判断|历史档案|来源档案|栏目主目录|栏目摘要|台账|档案|规则|判断|支撑/;

  dynastyPages.forEach((page) => {
    const html = readFileSync(join(root, page), "utf8");

    assert.doesNotMatch(html, blockedCopy, page);
  });
});
