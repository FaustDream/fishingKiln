import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("particle hero keeps curl noise octave count stable", () => {
  const source = readFileSync(new URL("../js/particle-hero.js", import.meta.url), "utf8");

  assert.match(source, /function clampPositiveNumber/);
  assert.match(source, /const timeSeed = seed \+ t/);
  assert.match(source, /noise3\(x \+ eps, y, timeSeed, 3\)/);
  assert.doesNotMatch(source, /noise3\(x \+ eps, y, seed, t\)/);
});
