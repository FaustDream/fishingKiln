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
