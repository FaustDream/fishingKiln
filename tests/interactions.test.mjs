import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { initAnnotationDiagram, initCategoryDirectoryFilters, initEraExplorePanels, initEraSubNav, initNavToggle } from "../js/interactions.js";

test("interactions initialize the annotation diagram hotspot state", () => {
  const source = readFileSync(new URL("../js/interactions.js", import.meta.url), "utf8");

  assert.match(source, /function initAnnotationDiagram/);
  assert.match(source, /\[data-annotation-root\]/);
  assert.match(source, /\[data-annotation-trigger\]/);
  assert.match(source, /\[data-annotation-panel\]/);
  assert.match(source, /addEventListener\("click"/);
  assert.match(source, /aria-selected/);
  assert.match(source, /initAnnotationDiagram\(\)/);
});

test("annotation hotspots switch state within their own root", () => {
  const rootA = createAnnotationRoot("era-唐");
  const rootB = createAnnotationRoot("era-宋");
  const previousDocument = globalThis.document;

  globalThis.document = {
    querySelectorAll(selector) {
      return selector === "[data-annotation-root]" ? [rootA, rootB] : [];
    }
  };

  try {
    initAnnotationDiagram();
    rootA.triggers[1].click();

    assert.equal(rootA.triggers[0].getAttribute("aria-selected"), "false");
    assert.equal(rootA.triggers[1].getAttribute("aria-selected"), "true");
    assert.equal(rootA.panels[0].hidden, true);
    assert.equal(rootA.panels[1].hidden, false);
    assert.equal(rootB.triggers[0].getAttribute("aria-selected"), "true");
    assert.equal(rootB.panels[0].hidden, false);
  } finally {
    globalThis.document = previousDocument;
  }
});

test("era sub navigation switches the visible narrative node", () => {
  const section = createEraSection();
  const previousDocument = globalThis.document;

  globalThis.document = {
    querySelectorAll(selector) {
      return selector === ".era-section" ? [section] : [];
    }
  };

  try {
    initEraSubNav();
    section.items[2].click();

    assert.equal(section.items[0].getAttribute("aria-current"), null);
    assert.equal(section.items[2].getAttribute("aria-current"), "true");
    assert.equal(section.panels[0].hidden, true);
    assert.equal(section.panels[1].hidden, true);
    assert.equal(section.panels[2].hidden, false);
    assert.equal(section.panels[2].scrollCount, 1);
  } finally {
    globalThis.document = previousDocument;
  }
});

test("era sub navigation delegation accepts text-node click targets", () => {
  const section = createEraSection();
  const previousDocument = globalThis.document;
  let delegatedClick = null;

  globalThis.document = {
    addEventListener(type, callback) {
      if (type === "click") delegatedClick = callback;
    },
    querySelectorAll(selector) {
      return selector === ".era-section" ? [section] : [];
    }
  };

  try {
    initEraSubNav();
    delegatedClick?.({
      preventDefault() {},
      target: {
        nodeType: 3,
        parentElement: section.items[2]
      }
    });

    assert.equal(section.items[2].getAttribute("aria-current"), "true");
    assert.equal(section.panels[2].hidden, false);
  } finally {
    globalThis.document = previousDocument;
  }
});

test("era explorer opens the current drawer and switches tabs locally", () => {
  const tang = createEraExplorer("era-唐-explorer");
  const song = createEraExplorer("era-宋-explorer");
  const previousDocument = globalThis.document;

  globalThis.document = createEraExplorerDocument([tang, song]);

  try {
    initEraExplorePanels();
    tang.trigger.click();

    assert.equal(tang.explorer.hidden, false);
    assert.equal(song.explorer.hidden, true);
    assert.equal(tang.trigger.getAttribute("aria-expanded"), "true");
    assert.equal(tang.trigger.textContent, "关闭探索");

    tang.tabs[1].click();

    assert.equal(tang.tabs[0].getAttribute("aria-selected"), "false");
    assert.equal(tang.tabs[1].getAttribute("aria-selected"), "true");
    assert.equal(tang.panels[0].hidden, true);
    assert.equal(tang.panels[1].hidden, false);
    assert.equal(song.panels[0].hidden, false);
  } finally {
    globalThis.document = previousDocument;
  }
});

test("era explorer close buttons and other triggers reset open state", () => {
  const tang = createEraExplorer("era-唐-explorer");
  const song = createEraExplorer("era-宋-explorer");
  const previousDocument = globalThis.document;

  globalThis.document = createEraExplorerDocument([tang, song]);

  try {
    initEraExplorePanels();
    tang.trigger.click();
    tang.closeButton.click();

    assert.equal(tang.explorer.hidden, true);
    assert.equal(tang.trigger.getAttribute("aria-expanded"), "false");
    assert.equal(tang.trigger.textContent, "深入探索");

    tang.trigger.click();
    song.trigger.click();

    assert.equal(tang.explorer.hidden, true);
    assert.equal(song.explorer.hidden, false);
    assert.equal(tang.trigger.getAttribute("aria-expanded"), "false");
    assert.equal(song.trigger.getAttribute("aria-expanded"), "true");
  } finally {
    globalThis.document = previousDocument;
  }
});

test("site nav submenus stay closed until the toggle is clicked", () => {
  const navGroup = createSiteNavGroup();
  const previousDocument = globalThis.document;

  globalThis.document = {
    querySelectorAll(selector) {
      return selector === ".site-nav__toggle" ? [navGroup.toggle] : [];
    }
  };

  try {
    initNavToggle();

    assert.equal(navGroup.toggle.getAttribute("aria-expanded"), "false");
    assert.equal(navGroup.sub.hidden, true);

    navGroup.toggle.click();
    assert.equal(navGroup.toggle.getAttribute("aria-expanded"), "true");
    assert.equal(navGroup.sub.hidden, false);

    navGroup.toggle.click();
    assert.equal(navGroup.toggle.getAttribute("aria-expanded"), "false");
    assert.equal(navGroup.sub.hidden, true);
  } finally {
    globalThis.document = previousDocument;
  }
});

test("reveal motion falls back to visible cards without IntersectionObserver", () => {
  const source = readFileSync(new URL("../js/interactions.js", import.meta.url), "utf8");

  assert.match(source, /if \(!\("IntersectionObserver" in window\)\) \{[\s\S]*return;[\s\S]*document\.body\.classList\.add\("has-card-motion"\)/);
  assert.match(source, /nodes\.forEach\(\(node\) => node\.classList\.add\("is-visible"\)\)/);
});

test("category directory buttons synchronize lower content facets", () => {
  const category = createCategoryDirectoryRoot();
  const previousDocument = globalThis.document;

  globalThis.document = {
    querySelectorAll(selector) {
      return selector === "[data-category-directory]" ? [category.root] : [];
    }
  };

  try {
    initCategoryDirectoryFilters();
    category.buttons[1].click();

    assert.equal(category.buttons[1].getAttribute("aria-selected"), "true");
    assert.equal(category.targets[0].getAttribute("data-category-filter-state"), "hidden");
    assert.equal(category.targets[0].hidden, true);
    assert.equal(category.targets[1].getAttribute("data-category-filter-state"), "active");
    assert.equal(category.targets[1].hidden, false);
    assert.equal(category.summary.textContent, "正在查看：器形");
  } finally {
    globalThis.document = previousDocument;
  }
});

test("category option groups show a compact set of repeated cards", () => {
  const category = createCategoryDirectoryRoot({
    targets: [createCategoryFilterTarget("用途")],
    optionTargets: [createCategoryFilterTarget(""), createCategoryFilterTarget("")]
  });
  const previousDocument = globalThis.document;

  globalThis.document = {
    createElement: createTestElement,
    querySelectorAll(selector) {
      return selector === "[data-category-directory]" ? [category.root] : [];
    }
  };

  try {
    initCategoryDirectoryFilters();

    assert.equal(category.optionTargets[0].hidden, false);
    assert.equal(category.optionTargets[1].hidden, false);
    assert.equal(category.optionButtons[0].getAttribute("aria-selected"), "true");
    category.optionButtons[1].click();
    assert.equal(category.optionTargets[0].hidden, false);
    assert.equal(category.optionTargets[1].hidden, false);
  } finally {
    globalThis.document = previousDocument;
  }
});

test("category option groups keep long repeated lists to three visible cards", () => {
  const optionTargets = Array.from({ length: 5 }, () => createCategoryFilterTarget(""));
  const category = createCategoryDirectoryRoot({
    targets: [createCategoryFilterTarget("用途")],
    optionTargets
  });
  const previousDocument = globalThis.document;

  globalThis.document = {
    createElement: createTestElement,
    querySelectorAll(selector) {
      return selector === "[data-category-directory]" ? [category.root] : [];
    }
  };

  try {
    initCategoryDirectoryFilters();

    assert.equal(optionTargets.filter((target) => !target.hidden).length, 3);
    category.optionButtons[4].click();
    assert.equal(optionTargets.filter((target) => !target.hidden).length, 3);
    assert.equal(optionTargets[0].hidden, true);
    assert.equal(optionTargets[4].hidden, false);
  } finally {
    globalThis.document = previousDocument;
  }
});

function createAnnotationRoot(id) {
  const triggers = [createTrigger("胎体", true), createTrigger("青料", false)];
  const panels = [createPanel("胎体", false), createPanel("青料", true)];

  return {
    dataset: { annotationRoot: id },
    triggers,
    panels,
    querySelectorAll(selector) {
      if (selector === "[data-annotation-trigger]") return triggers;
      if (selector === "[data-annotation-panel]") return panels;
      return [];
    }
  };
}

function createEraSection() {
  const items = [
    createEraSubNavItem("era-唐-node-tang-beginnings"),
    createEraSubNavItem("era-唐-node-tang-sancai-tableware"),
    createEraSubNavItem("era-唐-node-tang-teaware-forms")
  ];
  const panels = [
    createEraNodePanel("era-唐-node-tang-beginnings", false),
    createEraNodePanel("era-唐-node-tang-sancai-tableware", true),
    createEraNodePanel("era-唐-node-tang-teaware-forms", true)
  ];

  const section = {
    items,
    panels,
    querySelectorAll(selector) {
      if (selector === "[data-era-node-target]") return items;
      if (selector === "[data-era-node-panel]") return panels;
      return [];
    }
  };

  items.forEach((item) => {
    item.section = section;
  });

  return section;
}

function createEraExplorerDocument(items) {
  const byId = new Map(items.map((item) => [item.explorer.id, item.explorer]));

  return {
    addEventListener() {},
    body: {
      classList: {
        toggle() {}
      }
    },
    getElementById(id) {
      return byId.get(id) ?? null;
    },
    querySelectorAll(selector) {
      if (selector === "[data-explore]") return items.map((item) => item.trigger);
      if (selector === "[data-era-explorer]") return items.map((item) => item.explorer);
      if (selector === "[data-era-explorer-close]") return items.map((item) => item.closeButton);
      if (selector === "[data-era-explorer-tab]") return items.flatMap((item) => item.tabs);
      return [];
    }
  };
}

function createEraExplorer(id) {
  const explorer = createExplorerRoot(id);
  const trigger = createExplorerTrigger(id);
  const tabs = [
    createExplorerTab(id + "-nodes", true),
    createExplorerTab(id + "-process", false)
  ];
  const panels = [
    createExplorerPanel(id + "-nodes", false),
    createExplorerPanel(id + "-process", true)
  ];
  const closeButton = createExplorerClose(explorer);

  explorer.tabs = tabs;
  explorer.panels = panels;
  tabs.forEach((tab) => {
    tab.explorer = explorer;
  });

  return { closeButton, explorer, panels, tabs, trigger };
}

function createSiteNavGroup() {
  const sub = { hidden: true };
  const group = {
    querySelector(selector) {
      return selector === ".site-nav__sub" ? sub : null;
    }
  };
  const attributes = { "aria-expanded": "false" };
  let handler = null;
  const toggle = {
    addEventListener(type, callback) {
      if (type === "click") handler = callback;
    },
    click() {
      handler?.();
    },
    closest(selector) {
      return selector === ".site-nav__group" ? group : null;
    },
    getAttribute(name) {
      return attributes[name] ?? null;
    },
    setAttribute(name, value) {
      attributes[name] = value;
    }
  };

  return { sub, toggle };
}

function createCategoryDirectoryRoot(config = {}) {
  const buttons = [createCategoryFilterButton("用途"), createCategoryFilterButton("器形")];
  const targets = config.targets ?? [createCategoryFilterTarget("用途"), createCategoryFilterTarget("器形|纹样")];
  const optionTargets = config.optionTargets ?? [];
  const optionButtons = [];
  const summary = { textContent: "" };
  const optionContainer = createCategoryOptionContainer(optionTargets, optionButtons);
  const shell = createCategoryShell(targets, optionContainer);
  const root = {
    closest(selector) {
      return selector === ".category-page-shell" ? shell : null;
    },
    querySelectorAll(selector) {
      if (selector === "[data-category-filter-label]") return buttons;
      if (selector === "[data-category-filter-target]") return targets;
      return [];
    },
    querySelector(selector) {
      return selector === "[data-category-filter-summary]" ? summary : null;
    }
  };

  return { buttons, optionButtons, optionTargets, root, summary, targets };
}

function createCategoryFilterButton(label) {
  const attributes = { "aria-selected": "false" };
  let handler = null;

  return {
    dataset: { categoryFilterLabel: label, tabTarget: label },
    addEventListener(type, callback) {
      if (type === "click") handler = callback;
    },
    click() {
      handler?.();
    },
    getAttribute(name) {
      return attributes[name] ?? null;
    },
    setAttribute(name, value) {
      attributes[name] = value;
    }
  };
}

function createCategoryFilterTarget(facets) {
  const attributes = {};

  return {
    dataset: { categoryFacets: facets },
    hidden: false,
    matches(selector) {
      return selector.includes("[data-category-filter-target]");
    },
    querySelector() {
      return null;
    },
    getAttribute(name) {
      return attributes[name] ?? null;
    },
    setAttribute(name, value) {
      attributes[name] = value;
    }
  };
}

function createCategoryOptionContainer(children, optionButtons) {
  return {
    children,
    dataset: {},
    before(strip) {
      optionButtons.push(...strip.children);
    },
    matches() {
      return false;
    }
  };
}

function createCategoryShell(targets, optionContainer) {
  return {
    dataset: {},
    querySelectorAll(selector) {
      if (selector === "[data-category-filter-target]") return targets;
      if (selector.includes(".category-module-grid")) return [optionContainer];
      return [];
    }
  };
}

function createTestElement(tagName) {
  const attributes = {};
  const element = {
    children: [],
    dataset: {},
    hidden: false,
    tagName,
    append(child) {
      this.children.push(child);
    },
    addEventListener(type, callback) {
      if (type === "click") this.click = callback;
    },
    click() {},
    getAttribute(name) {
      return attributes[name] ?? null;
    },
    setAttribute(name, value) {
      attributes[name] = value;
    }
  };

  return element;
}

function createExplorerRoot(id) {
  return {
    id,
    dataset: { eraExplorer: id },
    hidden: true,
    tabs: [],
    panels: [],
    classList: {
      toggle() {}
    },
    focus() {},
    querySelectorAll(selector) {
      if (selector === "[data-era-explorer-tab]") return this.tabs;
      if (selector === "[data-era-explorer-panel]") return this.panels;
      return [];
    }
  };
}

function createExplorerTrigger(target) {
  const attributes = {};
  let handler = null;

  return {
    dataset: { explore: target },
    textContent: "深入探索",
    addEventListener(type, callback) {
      if (type === "click") handler = callback;
    },
    click() {
      handler?.({ preventDefault() {} });
    },
    getAttribute(name) {
      return attributes[name] ?? null;
    },
    setAttribute(name, value) {
      attributes[name] = value;
    }
  };
}

function createExplorerTab(target, selected) {
  const attributes = { "aria-selected": String(selected) };
  let handler = null;

  return {
    dataset: { eraExplorerTab: target },
    addEventListener(type, callback) {
      if (type === "click") handler = callback;
    },
    click() {
      handler?.({ preventDefault() {} });
    },
    closest(selector) {
      return selector === "[data-era-explorer]" ? this.explorer : null;
    },
    getAttribute(name) {
      return attributes[name] ?? null;
    },
    setAttribute(name, value) {
      attributes[name] = value;
    }
  };
}

function createExplorerPanel(target, hidden) {
  return {
    dataset: { eraExplorerPanel: target },
    hidden
  };
}

function createExplorerClose(explorer) {
  let handler = null;

  return {
    addEventListener(type, callback) {
      if (type === "click") handler = callback;
    },
    click() {
      handler?.({ preventDefault() {} });
    },
    closest(selector) {
      return selector === "[data-era-explorer]" ? explorer : null;
    }
  };
}

function createEraSubNavItem(target) {
  const attributes = {};
  let handler = null;

  return {
    dataset: { eraNodeTarget: target },
    addEventListener(type, callback) {
      if (type === "click") handler = callback;
    },
    click() {
      handler?.({ preventDefault() {} });
    },
    getAttribute(name) {
      return attributes[name] ?? null;
    },
    removeAttribute(name) {
      delete attributes[name];
    },
    setAttribute(name, value) {
      attributes[name] = value;
    },
    closest(selector) {
      if (selector === "[data-era-node-target]") return this;
      if (selector === ".era-section") return this.section ?? null;
      return null;
    }
  };
}

function createEraNodePanel(target, hidden) {
  return {
    dataset: { eraNodePanel: target },
    hidden,
    scrollCount: 0,
    classList: {
      toggle() {}
    },
    scrollIntoView() {
      this.scrollCount += 1;
    }
  };
}

function createTrigger(id, selected) {
  const attributes = { "aria-selected": String(selected) };
  let handler = null;

  return {
    dataset: { annotationTrigger: id },
    addEventListener(type, callback) {
      if (type === "click") handler = callback;
    },
    click() {
      handler?.();
    },
    getAttribute(name) {
      return attributes[name] ?? null;
    },
    setAttribute(name, value) {
      attributes[name] = value;
    }
  };
}

function createPanel(id, hidden) {
  return {
    dataset: { annotationPanel: id },
    hidden
  };
}
