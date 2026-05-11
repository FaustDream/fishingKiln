import test from "node:test";
import assert from "node:assert/strict";

import { siteContent } from "../js/siteContent.js";

test("siteContent exposes home, categories, about, and research sections", () => {
  assert.ok(siteContent.home);
  assert.equal(siteContent.categories.length, 5);
  assert.ok(siteContent.about.sections.length >= 4);
  assert.ok(siteContent.research.items.length >= 6);
});

