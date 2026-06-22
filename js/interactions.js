import { buildHomeDetailLookup, renderLedgerDetail } from "./renderers.js";
import { PorcelainParticleHero } from "./particle-hero.js";

let particleHeroInstance = null;
let eraSubNavDelegationBound = false;

function activateTab(buttons, panels, target) {
  buttons.forEach((button) => {
    const selected = button.dataset.tabTarget === target;
    button.setAttribute("aria-selected", String(selected));
  });

  panels.forEach((panel) => {
    const active = panel.dataset.tabPanel === target;
    panel.hidden = !active;
  });
}

function initTabGroups() {
  const groups = [...document.querySelectorAll(".tab-group")];
  groups.forEach((group) => {
    const buttons = [...group.querySelectorAll(".tab-button")];
    const panels = [...group.querySelectorAll(".tab-panel")];

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        activateTab(buttons, panels, button.dataset.tabTarget);
      });
    });
  });
}

function initProcessSteps() {
  const buttons = [...document.querySelectorAll(".process-step")];
  const panels = [...document.querySelectorAll(".process-panel")];

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.stepIndex;
      buttons.forEach((item) => item.classList.toggle("is-active", item === button));
      panels.forEach((panel) => {
        const active = panel.dataset.processPanel === target;
        panel.classList.toggle("is-active", active);
        panel.hidden = !active;
      });
    });
  });
}

function initScrollableNav() {
  const strip = document.querySelector("[data-nav-strip]");
  const scroller = strip?.querySelector(".site-nav__links");

  if (!strip || !scroller) return;

  // 移动端导航改为横向滑动后，需要用边缘状态提示“还有内容”，避免用户误以为导航已经结束。
  const syncEdgeState = () => {
    const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
    const scrollable = maxScrollLeft > 4;
    const atStart = scroller.scrollLeft <= 4;
    const atEnd = maxScrollLeft - scroller.scrollLeft <= 4;

    strip.classList.toggle("is-scrollable", scrollable);
    strip.classList.toggle("is-at-start", atStart);
    strip.classList.toggle("is-at-end", atEnd);
  };

  window.requestAnimationFrame(() => {
    scroller.querySelector(".site-nav__link.is-active")?.scrollIntoView({
      block: "nearest",
      inline: "center"
    });
    syncEdgeState();
  });

  scroller.addEventListener("scroll", syncEdgeState, { passive: true });
  window.addEventListener("resize", syncEdgeState);
}

function initCollapsibleSections() {
  const sections = [...document.querySelectorAll("[data-collapsible-section]")];
  if (!sections.length) return;

  const mobileQuery = window.matchMedia("(max-width: 640px)");

  const setSectionState = (section, expanded) => {
    const toggle = section.querySelector("[data-collapsible-toggle]");
    const content = section.querySelector("[data-collapsible-content]");
    if (!toggle || !content) return;

    section.dataset.collapsed = expanded ? "false" : "true";
    toggle.setAttribute("aria-expanded", String(expanded));
    toggle.textContent = expanded ? "收起" : "展开";
    content.hidden = !expanded;
  };

  // 页面切到手机宽度时默认收起长段，桌面端则恢复展开，保持两端阅读节奏各自稳定。
  const syncViewportState = () => {
    sections.forEach((section) => {
      if (!mobileQuery.matches) {
        setSectionState(section, true);
        return;
      }

      const expanded = section.dataset.collapsed !== "true";
      setSectionState(section, expanded);
    });
  };

  const openSectionFromHash = (hash) => {
    if (!hash) return;

    const target = document.querySelector(hash);
    const section =
      (target instanceof HTMLElement && target.closest("[data-collapsible-section]")) ||
      (target instanceof HTMLElement && target.matches("[data-collapsible-section]") ? target : null);

    if (!section || !mobileQuery.matches) return;
    setSectionState(section, true);
  };

  sections.forEach((section) => {
    const toggle = section.querySelector("[data-collapsible-toggle]");
    if (!toggle) return;

    if (mobileQuery.matches) {
      section.dataset.collapsed = "true";
    }

    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") !== "true";
      setSectionState(section, expanded);
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      openSectionFromHash(link.getAttribute("href"));
    });
  });

  window.addEventListener("hashchange", () => openSectionFromHash(window.location.hash));
  mobileQuery.addEventListener("change", syncViewportState);

  syncViewportState();
  openSectionFromHash(window.location.hash);
}

function initCategoryTabRail() {
  const rails = [...document.querySelectorAll(".category-tabs .tab-buttons")];
  if (!rails.length) return;

  // 分类页四个 tab 在手机端改成横向分段条后，需要把当前 tab 保持在可见区域中心附近。
  const alignActiveTab = (rail) => {
    const active = rail.querySelector('.tab-button[aria-selected="true"]');
    if (!(active instanceof HTMLElement)) return;

    active.scrollIntoView({
      block: "nearest",
      inline: "center"
    });
  };

  rails.forEach((rail) => {
    const buttons = [...rail.querySelectorAll(".tab-button")];

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        window.requestAnimationFrame(() => alignActiveTab(rail));
      });
    });

    window.requestAnimationFrame(() => alignActiveTab(rail));
  });
}

function getCategoryOptionLabel(target, index) {
  const heading = target.querySelector?.("h3")?.textContent?.trim();
  const eyebrow = target.querySelector?.(".eyebrow")?.textContent?.trim();
  return heading || eyebrow || `选项 ${index + 1}`;
}

function getDirectCategoryFilterTargets(container) {
  return [...(container.children ?? [])].filter((child) =>
    child.matches?.("[data-category-filter-target], .research-card, .path-card, .reference-card, .ledger-row, .matrix-row, .collection-list__item, .research-fact-card, .network-panel, .institution-card")
  );
}

function getCategoryVisibleOptionIds(matchedTargets, currentId) {
  const visibleCount = Math.min(3, matchedTargets.length);
  const currentIndex = Math.max(0, matchedTargets.findIndex((target) => target.dataset.categoryOptionId === currentId));
  const start = Math.min(Math.max(currentIndex - 1, 0), Math.max(matchedTargets.length - visibleCount, 0));
  return new Set(matchedTargets.slice(start, start + visibleCount).map((target) => target.dataset.categoryOptionId));
}

function syncCategoryOptionGroup(group, label) {
  const { container, targets, buttons } = group;
  const matchedTargets = targets.filter((target) => {
    const facets = target.dataset.categoryFacets ?? "";
    return !facets || facets.includes(label);
  });
  const currentVisible = matchedTargets.some((target) => target.dataset.categoryOptionId === container.dataset.categoryOptionCurrent);

  if (!currentVisible) {
    container.dataset.categoryOptionCurrent = matchedTargets[0]?.dataset.categoryOptionId ?? "";
  }

  const visibleIds = getCategoryVisibleOptionIds(matchedTargets, container.dataset.categoryOptionCurrent);

  targets.forEach((target) => {
    const matched = matchedTargets.includes(target);
    const selected = matched && target.dataset.categoryOptionId === container.dataset.categoryOptionCurrent;
    const visible = matched && visibleIds.has(target.dataset.categoryOptionId);
    target.hidden = !visible;
    target.setAttribute("data-category-filter-state", selected ? "active" : matched ? "queued" : "hidden");
    target.setAttribute("data-category-option-state", selected ? "active" : visible ? "visible" : "hidden");
  });

  buttons.forEach((button) => {
    const target = targets.find((item) => item.dataset.categoryOptionId === button.dataset.categoryOptionTarget);
    const matched = target ? matchedTargets.includes(target) : false;
    const selected = button.dataset.categoryOptionTarget === container.dataset.categoryOptionCurrent;
    button.hidden = !matched;
    button.setAttribute("aria-selected", String(selected && matched));
  });
}

function createCategoryOptionButton(target, index, groupIndex, group, shell) {
  const id = `category-option-${groupIndex}-${index}`;
  const button = document.createElement("button");
  target.dataset.categoryOptionId = id;
  button.type = "button";
  button.className = "category-option-chip";
  button.dataset.categoryOptionTarget = id;
  button.textContent = getCategoryOptionLabel(target, index);
  button.addEventListener("click", () => {
    group.container.dataset.categoryOptionCurrent = id;
    syncCategoryOptionGroup(group, shell.dataset.categoryActiveFilter);
  });
  return button;
}

// 分类页资料量较大，同一组内容改为选项驱动展示，避免所有卡片同时铺开。
function setupCategoryOptionGroups(shell) {
  if (!shell || !document.createElement) return [];

  return [...shell.querySelectorAll(".category-module-grid, .reading-grid[data-inline-detail-root], .institution-grid, .ledger-list, .protocol-ledger, .collection-list, .research-strip")]
    .map((container, groupIndex) => {
      const targets = getDirectCategoryFilterTargets(container);
      if (targets.length < 2 || container.dataset.categoryOptionReady === "true") return null;

      const group = { container, targets, buttons: [] };
      const strip = document.createElement("div");
      container.dataset.categoryOptionReady = "true";
      strip.className = "category-option-strip";
      strip.setAttribute("aria-label", "内容选项");
      group.buttons = targets.map((target, index) => createCategoryOptionButton(target, index, groupIndex, group, shell));
      group.buttons.forEach((button) => strip.append(button));
      container.before(strip);
      return group;
    })
    .filter(Boolean);
}

function applyCategoryDirectoryFilter(state, label) {
  const { shell, buttons, targets, groupedTargets, optionGroups, summary } = state;
  if (shell) shell.dataset.categoryActiveFilter = label;

  buttons.forEach((button) => {
    button.setAttribute("aria-selected", String(button.dataset.categoryFilterLabel === label));
  });

  targets.forEach((target) => {
    if (groupedTargets.has(target)) return;
    const matched = (target.dataset.categoryFacets ?? "").includes(label);
    target.hidden = !matched;
    target.setAttribute("data-category-filter-state", matched ? "active" : "hidden");
  });

  optionGroups.forEach((group) => syncCategoryOptionGroup(group, label));
  if (summary) summary.textContent = `正在查看：${label}`;
}

export function initCategoryDirectoryFilters() {
  const directories = [...document.querySelectorAll("[data-category-directory]")];
  if (!directories.length) return;

  directories.forEach((directory) => {
    const buttons = [...directory.querySelectorAll("[data-category-filter-label]")];
    const summary = directory.querySelector("[data-category-filter-summary]");
    const shell = typeof directory.closest === "function" ? directory.closest(".category-page-shell") : null;
    const targets = [...((shell ?? directory).querySelectorAll("[data-category-filter-target]") ?? [])];
    if (!buttons.length || !targets.length) return;

    const optionGroups = setupCategoryOptionGroups(shell ?? directory);
    const groupedTargets = new Set(optionGroups.flatMap((group) => group.targets));
    const state = { shell, buttons, targets, groupedTargets, optionGroups, summary };
    const selected = buttons.find((button) => button.getAttribute("aria-selected") === "true") ?? buttons[0];

    buttons.forEach((button) => {
      button.addEventListener("click", () => applyCategoryDirectoryFilter(state, button.dataset.categoryFilterLabel));
    });
    applyCategoryDirectoryFilter(state, selected.dataset.categoryFilterLabel);
  });
}

// 首页与专题页共用 detail deck：点击左侧索引时，只在当前容器内切换激活态和详情面板。
function initDetailDecks() {
  const decks = [...document.querySelectorAll("[data-detail-root]")];
  if (!decks.length) return;

  decks.forEach((deck) => {
    const triggers = [...deck.querySelectorAll("[data-detail-trigger]")];
    const panels = [...deck.querySelectorAll("[data-detail-panel]")];

    const activate = (target) => {
      triggers.forEach((trigger) => {
        const active = trigger.dataset.detailTarget === target;
        trigger.classList.toggle("is-active", active);
        trigger.setAttribute("aria-selected", String(active));
        trigger.setAttribute("aria-expanded", String(active));
      });

      panels.forEach((panel) => {
        const active = panel.dataset.detailPanel === target;
        panel.classList.toggle("is-active", active);
        panel.hidden = !active;
      });
    };

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => activate(trigger.dataset.detailTarget));
    });

    const initialTarget = triggers.find((trigger) => trigger.getAttribute("aria-selected") === "true")?.dataset.detailTarget;
    initialTarget && activate(initialTarget);
  });
}

function initInlineDetails() {
  const roots = [...document.querySelectorAll("[data-inline-detail-root]")];
  if (!roots.length) return;

  roots.forEach((root) => {
    // 共享 detail deck 同时暴露了 inline-detail 的样式钩子，但具体激活逻辑应由
    // `initDetailDecks()` 接管，否则这里会把左侧索引按钮误当作“展开资料”按钮重写文本。
    if (root.hasAttribute("data-detail-root")) return;

    const triggers = [...root.querySelectorAll("[data-inline-detail-trigger]")];
    const panels = [...root.querySelectorAll("[data-inline-detail-panel]")];

    const setState = (targetId) => {
      triggers.forEach((trigger) => {
        const active = trigger.dataset.inlineDetailTrigger === targetId;
        trigger.setAttribute("aria-expanded", String(active));
        trigger.textContent = active ? "收起资料" : "展开资料";
      });

      panels.forEach((panel) => {
        panel.hidden = panel.dataset.inlineDetailPanel !== targetId;
      });
    };

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const active = trigger.getAttribute("aria-expanded") === "true";
        setState(active ? "" : trigger.dataset.inlineDetailTrigger);
      });
    });

    const initialId = triggers.find((trigger) => trigger.getAttribute("aria-expanded") === "true")?.dataset.inlineDetailTrigger;
    if (initialId) {
      setState(initialId);
    }
  });
}

export function filterResearchItems(items, filters) {
  const selectedTag = filters.tag?.trim();
  const selectedPeriod = filters.period?.trim();
  const selectedSourceType = filters.sourceType?.trim();
  const selectedQuery = filters.query?.trim();
  const selectedIds = filters.ids?.length ? new Set(filters.ids) : null;

  // 研究索引允许按主题、时段和术语联动结果做复合筛选，保证数据增多后仍能快速收敛结果。
  return items.filter((item) => {
    const matchTag = !selectedTag || item.tags?.includes(selectedTag);
    const matchPeriod = !selectedPeriod || item.periods?.includes(selectedPeriod);
    const matchSourceType = !selectedSourceType || item.sourceType === selectedSourceType;
    const haystack = `${item.title} ${item.summary} ${item.tags?.join(" ")} ${item.sourceName} ${item.sourceType}`.toLowerCase();
    const matchQuery = !selectedQuery || haystack.includes(selectedQuery.toLowerCase());
    const matchIds = !selectedIds || selectedIds.has(item.id);
    return matchTag && matchPeriod && matchSourceType && matchQuery && matchIds;
  });
}

export function getResearchIdFromLocation(href) {
  const url = new URL(href);
  return url.searchParams.get("id");
}

function initHomeSectionNav() {
  const nav = document.querySelector("[data-home-section-nav]");
  if (!nav) return;

  const links = [...nav.querySelectorAll("[data-home-nav-link]")];
  const targets = links.map((link) => document.getElementById(link.dataset.homeNavLink)).filter(Boolean);
  if (!links.length || !targets.length) return;

  let activeId = "";
  let frameId = 0;

  // 首页固定索引随滚动更新当前分区，编号导航在长页面里保持“我在哪”的状态反馈。
  const setActive = (targetId) => {
    if (!targetId || activeId === targetId) return;
    activeId = targetId;

    links.forEach((link) => {
      const active = link.dataset.homeNavLink === targetId;
      if (active) {
        link.setAttribute("aria-current", "true");
        link.scrollIntoView({ block: "nearest", inline: "center" });
        return;
      }

      link.removeAttribute("aria-current");
    });
  };

  const syncActiveLink = () => {
    const anchorLine = window.innerHeight * 0.32;
    const current = targets.reduce((match, target) => {
      return target.getBoundingClientRect().top <= anchorLine ? target : match;
    }, targets[0]);
    setActive(current.id);
  };

  const requestSync = () => {
    if (frameId) return;
    frameId = window.requestAnimationFrame(() => {
      frameId = 0;
      syncActiveLink();
    });
  };

  links.forEach((link) => link.addEventListener("click", () => setActive(link.dataset.homeNavLink)));
  window.addEventListener("scroll", requestSync, { passive: true });
  window.addEventListener("resize", requestSync);
  window.addEventListener("hashchange", requestSync);
  requestSync();
}

// 首页资料台账：点击 ledger-row 更新右侧详情面板
function initHomeDetailPanel(home, researchItems, categories) {
  const rows = [...document.querySelectorAll(".ledger-row")];
  const panel = document.querySelector("[data-home-detail-panel]");

  if (!rows.length || !panel) return;

  const detailLookup = buildHomeDetailLookup(home, researchItems, categories);

  const setActive = (targetId) => {
    const detail = detailLookup.get(targetId);
    if (!detail) return;

    rows.forEach((row) => {
      const active = row.dataset.ledgerId === targetId;
      row.classList.toggle("is-active", active);
      row.setAttribute("aria-selected", String(active));
    });

    panel.classList.remove("is-updating");
    panel.innerHTML = renderLedgerDetail(detail);
    void panel.offsetWidth;
    panel.classList.add("is-updating");
  };

  rows.forEach((row) => {
    row.addEventListener("click", () => {
      setActive(row.dataset.ledgerId);
      if (window.matchMedia("(max-width: 960px)").matches) {
        panel.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  setActive(home.defaultDetailId);
}

// 研究维度 tabs 切换
function initResearchTabs() {
  const nav = document.querySelector(".research-tabs__nav");
  if (!nav) return;

  const tabs = [...nav.querySelectorAll("[data-research-tab]")];
  const panels = [...document.querySelectorAll("[data-research-panel]")];

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.researchTab;
      tabs.forEach((t) => t.setAttribute("aria-selected", String(t === tab)));
      panels.forEach((p) => {
        p.hidden = p.dataset.researchPanel !== target;
      });
    });
  });
}

// 移动端 ledger-row 手风琴详情
function initLedgerRows() {
  const rows = [...document.querySelectorAll(".ledger-row")];
  if (!rows.length) return;

  const mobileQuery = window.matchMedia("(max-width: 720px)");

  rows.forEach((row) => {
    row.addEventListener("click", () => {
      if (!mobileQuery.matches) return;
      const expanded = row.dataset.ledgerExpanded === "true";
      rows.forEach((r) => delete r.dataset.ledgerExpanded);
      if (!expanded) {
        row.dataset.ledgerExpanded = "true";
      }
    });
  });
}

function initResearchFilters(researchItems) {
  const buttons = [...document.querySelectorAll(".index-filter")];
  const cards = [...document.querySelectorAll("[data-research-card]")];
  const status = document.querySelector("[data-research-status]");
  const emptyState = document.querySelector("[data-research-empty]");
  const searchInput = document.querySelector("[data-research-search]");

  if (!buttons.length || !cards.length) return;

  const state = {
    tag: "",
    period: "",
    sourceType: "",
    query: "",
    ids: []
  };

  const applyVisibility = () => {
    const visibleIds = new Set(filterResearchItems(researchItems, state).map((item) => item.id));

    cards.forEach((card) => {
      const visible = visibleIds.has(card.dataset.researchCard);
      card.hidden = !visible;
    });

    if (emptyState) {
      emptyState.hidden = visibleIds.size > 0;
    }

    if (!status) return;

    const activeFlags = [
      state.tag && `主题：${state.tag}`,
      state.period && `时段：${state.period}`,
      state.sourceType && `来源：${state.sourceType}`,
      state.query && `检索：${state.query}`,
      state.ids.length && `术语联动：${state.ids.length} 篇`
    ].filter(Boolean);

    if (!activeFlags.length) {
      status.hidden = true;
      status.innerHTML = "";
      return;
    }

    status.hidden = false;
    status.innerHTML = `
      <span>${activeFlags.join(" / ")}，当前匹配 ${visibleIds.size} 篇专题。</span>
      <button class="link-button" type="button" data-clear-related>清除条件</button>
    `;

    status.querySelector("[data-clear-related]")?.addEventListener("click", () => {
      state.tag = "";
      state.period = "";
      state.sourceType = "";
      state.query = "";
      state.ids = [];
      searchInput && (searchInput.value = "");
      buttons.forEach((item) => {
        const group = item.dataset.filterGroup ?? "tag";
        const firstId = group === "tag" ? "all" : group === "period" ? "all-periods" : "all-sources";
        const active = item.dataset.filterId === firstId;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", String(active));
      });
      applyVisibility();
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.dataset.filterGroup ?? "tag";
      if (group === "period") {
        state.period = button.dataset.filterPeriod ?? "";
      } else if (group === "sourceType") {
        state.sourceType = button.dataset.filterSourceType ?? "";
      } else {
        state.tag = button.dataset.filterTag ?? "";
      }

      buttons.forEach((item) => {
        const sameGroup = (item.dataset.filterGroup ?? "tag") === group;
        const active = sameGroup && item === button;
        if (!sameGroup) return;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", String(active));
      });

      applyVisibility();
    });
  });

  searchInput?.addEventListener("input", () => {
    state.query = searchInput.value;
    applyVisibility();
  });

  document.querySelectorAll("[data-related-research-ids]").forEach((button) => {
    button.addEventListener("click", () => {
      state.ids = (button.dataset.relatedResearchIds ?? "").split("|").filter(Boolean);
      applyVisibility();
      document.getElementById("research-index")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function openResearchDialog(item) {
  const dialog = document.getElementById("researchDialog");
  if (!dialog || !item) return;

  dialog.querySelector("[data-dialog-title]").textContent = item.title;
  dialog.querySelector("[data-dialog-summary]").textContent = item.summary;
  dialog.querySelector("[data-dialog-source]").href = item.sourceUrl;
  dialog.querySelector("[data-dialog-source]").textContent = item.sourceName;
  dialog.querySelector("[data-dialog-image]").src = item.imagePath;
  dialog.querySelector("[data-dialog-image]").alt = item.title;
  dialog.showModal();
}

function initResearchLinks(researchItems) {
  const lookup = new Map(researchItems.map((item) => [item.id, item]));
  document.querySelectorAll("[data-research-id]").forEach((button) => {
    button.addEventListener("click", () => {
      openResearchDialog(lookup.get(button.dataset.researchId));
    });
  });

  document.getElementById("researchDialogClose")?.addEventListener("click", () => {
    document.getElementById("researchDialog")?.close();
  });
}

function initRevealMotion() {
  const nodes = [
    ...document.querySelectorAll(
      ".research-card, .glossary-card, .object-card, .path-card, .timeline-node, .detail-trigger, .detail-panel, .inline-detail, .network-panel, .institution-card, .summary-stat, .brief-card, .hero-focus-card, .ledger-row, .matrix-row, .portal-row, .highlight-card, .detail-card, .category-guide-card"
    )
  ];

  if (!nodes.length) return;

  if (!("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  document.body.classList.add("has-card-motion");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18 }
  );

  nodes.forEach((node) => observer.observe(node));

  // 某些内嵌浏览器里 IntersectionObserver 触发不稳定，超时后统一回退为可见，避免整块内容长期空白。
  window.setTimeout(() => {
    nodes.forEach((node) => node.classList.add("is-visible"));
  }, 800);
}

export function buildCategoryLookup(categories) {
  return new Map(categories.map((item) => [item.slug, item]));
}


function initEraScrollAnimation() {
  if (!("IntersectionObserver" in window)) return;

  var sections = [...document.querySelectorAll(".era-section")];
  if (!sections.length) return;

  document.body.classList.add("has-motion");

  var observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
  );

  sections.forEach(function(s) { observer.observe(s); });

  // 内嵌浏览器若延迟触发观察器，快速回退为可见状态，避免首页朝代内容长时间空白。
  window.setTimeout(function() {
    sections.forEach(function(s) { s.classList.add("is-visible"); });
  }, 900);

  // Parallax effect for era-visual images
  var visualImgs = document.querySelectorAll(".era-visual img");
  if (visualImgs.length) {
    var parallaxTick = false;
    window.addEventListener("scroll", function() {
      if (parallaxTick) return;
      parallaxTick = true;
      window.requestAnimationFrame(function() {
        var vh = window.innerHeight;
        visualImgs.forEach(function(img) {
          var section = img.closest(".era-section");
          if (!section) return;
          var rect = section.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > vh) return;
          var offset = ((rect.top + rect.height / 2) / vh - 0.5) * 100;
          img.style.setProperty("--scroll-offset", offset);
        });
        parallaxTick = false;
      });
    }, { passive: true });
  }
}

function initEraNavHighlight() {
  var nav = document.querySelector("[data-era-nav]");
  if (!nav) return;

  var items = [...nav.querySelectorAll("[data-era-item]")];
  var sections = items
    .map(function(item) { return document.getElementById("era-" + item.dataset.eraItem); })
    .filter(Boolean);

  if (!sections.length) return;

  var currentActive = "";

  /* 全量朝代背景切换 */
  var bgLayers = [...document.querySelectorAll("[data-era-bg]")];
  var setBg = function(eraSlug) {
    bgLayers.forEach(function(layer) {
      layer.classList.toggle("is-active", layer.dataset.eraBg === eraSlug);
    });
  };

  var setActive = function(eraSlug) {
    if (currentActive === eraSlug) return;
    currentActive = eraSlug;
    items.forEach(function(item) {
      var active = item.dataset.eraItem === eraSlug;
      item.classList.toggle("is-active", active);
    });
    setBg(eraSlug);
  };

  var sync = function() {
    var anchorLine = window.innerHeight * 0.35;
    var current = sections.reduce(function(match, sec) {
      return sec.getBoundingClientRect().top <= anchorLine ? sec : match;
    }, null);
    if (current) {
      var era = current.dataset.era;
      if (era) setActive(era);
    } else {
      // 在诗词区（粒子画布）不激活任何朝代
      setActive("");
    }
  };

  // Click to scroll
  items.forEach(function(item) {
    var btn = item.querySelector("[data-era-target]");
    if (!btn) return;
    btn.addEventListener("click", function() {
      var target = document.getElementById(btn.dataset.eraTarget);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  var ticking = false;
  window.addEventListener("scroll", function() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function() {
      sync();
      ticking = false;
    });
  }, { passive: true });

  window.addEventListener("resize", sync);
  sync();
}

function findEraExplorerTrigger(explorer, triggers) {
  return triggers.find(function(trigger) {
    return trigger.dataset.explore === explorer.id || trigger.dataset.explore === explorer.dataset.eraExplorer;
  });
}

function setEraExplorerTriggerState(trigger, open) {
  if (!trigger) return;
  trigger.setAttribute("aria-expanded", String(open));
  trigger.textContent = open ? "\u5173\u95ed\u63a2\u7d22" : "\u6df1\u5165\u63a2\u7d22";
}

function activateEraExplorerTab(explorer, targetId) {
  var tabs = [...explorer.querySelectorAll("[data-era-explorer-tab]")];
  var panels = [...explorer.querySelectorAll("[data-era-explorer-panel]")];
  if (!tabs.length || !panels.length) return;

  tabs.forEach(function(tab) {
    tab.setAttribute("aria-selected", String(tab.dataset.eraExplorerTab === targetId));
  });

  panels.forEach(function(panel) {
    panel.hidden = panel.dataset.eraExplorerPanel !== targetId;
  });
}

function syncEraExplorerBodyState(explorers) {
  document.body?.classList?.toggle("has-era-explorer-open", explorers.some(function(explorer) {
    return !explorer.hidden;
  }));
}

function closeEraExplorer(explorer, triggers, explorers) {
  explorer.hidden = true;
  explorer.classList?.toggle("is-open", false);
  setEraExplorerTriggerState(findEraExplorerTrigger(explorer, triggers), false);
  syncEraExplorerBodyState(explorers);
}

function openEraExplorer(explorer, triggers, explorers) {
  explorers.forEach(function(item) {
    if (item !== explorer) closeEraExplorer(item, triggers, explorers);
  });

  explorer.hidden = false;
  explorer.classList?.toggle("is-open", true);
  setEraExplorerTriggerState(findEraExplorerTrigger(explorer, triggers), true);
  syncEraExplorerBodyState(explorers);
  explorer.focus?.({ preventScroll: true });
}

function resetEraExplorer(explorer, triggers, explorers) {
  var selectedTab = [...explorer.querySelectorAll("[data-era-explorer-tab]")].find(function(tab) {
    return tab.getAttribute("aria-selected") === "true";
  });
  if (selectedTab) activateEraExplorerTab(explorer, selectedTab.dataset.eraExplorerTab);
  closeEraExplorer(explorer, triggers, explorers);
}

export function initEraExplorePanels() {
  var triggers = [...document.querySelectorAll("[data-explore]")];
  var explorers = [...document.querySelectorAll("[data-era-explorer]")];
  if (!triggers.length || !explorers.length) return;

  triggers.forEach(function(trigger) {
    trigger.addEventListener("click", function(event) {
      event.preventDefault();
      var explorer = document.getElementById(trigger.dataset.explore);
      if (!explorer) return;

      if (explorer.hidden) openEraExplorer(explorer, triggers, explorers);
      else closeEraExplorer(explorer, triggers, explorers);
    });
  });

  document.querySelectorAll("[data-era-explorer-close]").forEach(function(button) {
    button.addEventListener("click", function(event) {
      event.preventDefault();
      var explorer = button.closest("[data-era-explorer]");
      if (explorer) closeEraExplorer(explorer, triggers, explorers);
    });
  });

  document.querySelectorAll("[data-era-explorer-tab]").forEach(function(tab) {
    tab.addEventListener("click", function(event) {
      event.preventDefault();
      var explorer = tab.closest("[data-era-explorer]");
      if (explorer) activateEraExplorerTab(explorer, tab.dataset.eraExplorerTab);
    });
  });

  explorers.forEach(function(explorer) {
    resetEraExplorer(explorer, triggers, explorers);
  });
}

function activateEraNodePanel(section, targetId, shouldScroll) {
  if (!section || !targetId) return;

  var items = [...section.querySelectorAll("[data-era-node-target]")];
  var panels = [...section.querySelectorAll("[data-era-node-panel]")];
  if (!items.length || !panels.length) return;

  items.forEach(function(item) {
    if (item.dataset.eraNodeTarget === targetId) item.setAttribute("aria-current", "true");
    else item.removeAttribute("aria-current");
  });

  panels.forEach(function(panel) {
    var active = panel.dataset.eraNodePanel === targetId;
    panel.hidden = !active;
    panel.classList.toggle("is-active", active);
    if (active && shouldScroll) panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

function bindEraSubNavDelegation(root) {
  if (eraSubNavDelegationBound || !root?.addEventListener) return;

  // 首页朝代段落由 innerHTML 动态生成，文档级委托能保证后生成的节点按钮也能切换面板。
  root.addEventListener("click", function(event) {
    var target = event.target?.nodeType === 1 ? event.target : event.target?.parentElement;
    var trigger = target?.closest?.("[data-era-node-target]");
    var section = trigger?.closest?.(".era-section");
    if (!trigger || !section) return;

    event.preventDefault();
    activateEraNodePanel(section, trigger.dataset.eraNodeTarget, true);
  });

  eraSubNavDelegationBound = true;
}

if (typeof document !== "undefined") {
  bindEraSubNavDelegation(document);
}

export function initEraSubNav() {
  if (typeof document !== "undefined") bindEraSubNavDelegation(document);

  var sections = [...document.querySelectorAll(".era-section")];
  if (!sections.length) return;

  sections.forEach(function(section) {
    var items = [...section.querySelectorAll("[data-era-node-target]")];
    var panels = [...section.querySelectorAll("[data-era-node-panel]")];
    if (!items.length || !panels.length) return;

    // 测试桩或旧浏览器若不支持文档级委托，则回退为给当前节点逐个绑定点击事件。
    if (!document.addEventListener) {
      items.forEach(function(item) {
        item.addEventListener("click", function(event) {
          event.preventDefault();
          activateEraNodePanel(section, item.dataset.eraNodeTarget, true);
        });
      });
    }

    var initialTarget = items.find(function(item) {
      return item.getAttribute("aria-current") === "true";
    })?.dataset.eraNodeTarget || items[0].dataset.eraNodeTarget;
    activateEraNodePanel(section, initialTarget, false);
  });
}

export function initAnnotationDiagram() {
  var roots = [...document.querySelectorAll("[data-annotation-root]")];
  if (!roots.length) return;

  roots.forEach(function(root) {
    var triggers = [...root.querySelectorAll("[data-annotation-trigger]")];
    var panels = [...root.querySelectorAll("[data-annotation-panel]")];
    if (!triggers.length || !panels.length) return;

    // 注释图热点需要同步图上选中态与右侧说明，保证用户点击标注后能直接看到对应工艺解释。
    var activate = function(target) {
      triggers.forEach(function(trigger) {
        var active = trigger.dataset.annotationTrigger === target;
        trigger.setAttribute("aria-selected", String(active));
      });

      panels.forEach(function(panel) {
        panel.hidden = panel.dataset.annotationPanel !== target;
      });
    };

    triggers.forEach(function(trigger) {
      trigger.addEventListener("click", function() {
        activate(trigger.dataset.annotationTrigger);
      });
    });

    var initial = triggers.find(function(trigger) {
      return trigger.getAttribute("aria-selected") === "true";
    });
    if (initial) activate(initial.dataset.annotationTrigger);
  });
}

function initScrollRestore() {
  var key = "fk_scroll_" + (window.location.pathname.replace(/[^a-zA-Z0-9]/g, "_") || "index");

  // Restore on load
  var savedY = sessionStorage.getItem(key);
  if (savedY !== null) {
    var y = parseInt(savedY, 10);
    if (!isNaN(y) && y > 0) {
      setTimeout(function() {
        window.scrollTo({ top: y, behavior: "instant" });
      }, 120);
    }
  }

  // 点击首页导航 → 清除保存的滚动位置，回到词区顶部
  var homeLink = document.querySelector('.site-nav__link[href="index.html"]');
  if (homeLink) {
    homeLink.addEventListener("click", function() {
      sessionStorage.removeItem(key);
    });
  }

  // Save on scroll (throttled)
  var ticking = false;
  window.addEventListener("scroll", function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        sessionStorage.setItem(key, String(window.scrollY));
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

function initDetailDeckCollapse() {
  var decks = [...document.querySelectorAll(".detail-deck-section")];
  if (!decks.length) return;

  decks.forEach(function(section) {
    var heading = section.querySelector(".section-heading");
    if (!heading) return;

    // Only add toggle if not already present
    if (heading.querySelector("[data-collapse-toggle]")) return;

    var toggle = document.createElement("button");
    toggle.className = "section-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "折叠区段");
    toggle.setAttribute("data-collapse-toggle", "");
    toggle.textContent = "折叠";

    var content = section.querySelector(".detail-deck");
    if (!content) return;

    var isCollapsed = false;

    toggle.addEventListener("click", function() {
      isCollapsed = !isCollapsed;
      toggle.setAttribute("aria-expanded", String(!isCollapsed));
      toggle.textContent = isCollapsed ? "展开" : "折叠";
      section.classList.toggle("is-collapsed", isCollapsed);
      content.hidden = isCollapsed;
    });

    heading.appendChild(toggle);
  });
}

function initParticleHero() {
  const container = document.querySelector("[data-particle-hero]");
  if (!container) return;

  if (particleHeroInstance) {
    particleHeroInstance.destroy();
  }

  particleHeroInstance = new PorcelainParticleHero(container, {
    count: 160,
    particleSizeMin: 2,
    particleSizeMax: 8,
    attractionRadius: 180,
    attractionStrength: 0.015,
  });
}

export function initNavToggle() {
  const toggles = [...document.querySelectorAll(".site-nav__toggle")];
  if (!toggles.length) return;

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const group = toggle.closest(".site-nav__group");
      const sub = group?.querySelector(".site-nav__sub");
      if (!sub) return;

      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      sub.hidden = expanded;
    });
  });
}

export function initInteractions(page, siteContent) {
  initScrollableNav();
  initNavToggle();
  initCollapsibleSections();
  initCategoryTabRail();
  initCategoryDirectoryFilters();
  initDetailDecks();
  initInlineDetails();
  initTabGroups();
  initProcessSteps();
  initResearchTabs();
  initLedgerRows();
  initResearchFilters(siteContent.research.items);
  initResearchLinks(siteContent.research.items);
  initRevealMotion();
  buildCategoryLookup(siteContent.categories).get(page);

  // Timeline narrative interactions (only on home page)
  if (page === "home") {
    initParticleHero();
    initEraScrollAnimation();
    initEraNavHighlight();
    initEraExplorePanels();
    initEraSubNav();
    initAnnotationDiagram();
    initScrollRestore();
  } else {
    // Keep old home interactions for non-home pages
    initHomeSectionNav();
    initHomeDetailPanel(siteContent.home, siteContent.research.items, siteContent.categories);
  }

  initDetailDeckCollapse();
}

