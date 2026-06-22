function renderStoryTabButtons(items) {
  return items
    .map(([id, label], index) => {
      const selected = index === 0 ? "true" : "false";
      return `<button class="tab-button" data-tab-target="${id}" aria-selected="${selected}">${label}</button>`;
    })
    .join("");
}

function renderStoryPanels(items) {
  return items
    .map(([id, label, text], index) => {
      const hidden = index === 0 ? "" : " hidden";
      return `
        <article class="tab-panel"${hidden} data-tab-panel="${id}">
          <p class="eyebrow">${label}</p>
          <p>${text}</p>
        </article>
      `;
    })
    .join("");
}

const publicCopyReplacements = [
  ["栏目主目录", "器物导览"],
  ["栏目目录", "页面导览"],
  ["分类判断", "浏览重点"],
  ["观察维度", "欣赏角度"],
  ["资料模块", "内容"],
  ["资料台账", "参考资料"],
  ["来源台账", "参考资料"],
  ["对象台账", "对象一览"],
  ["茶具资料台账", "茶具参考"],
  ["典籍规矩", "典籍"],
  ["文献规则", "古籍摘读"],
  ["典籍规则", "典籍摘读"],
  ["古籍规则", "古籍摘读"],
  ["研究判断", "阅读提示"],
  ["工艺判断", "工艺要点"],
  ["历史档案", "历史脉络"],
  ["来源档案", "出处与参考"],
  ["茶具详情档案", "茶具细览"],
  ["餐具档案详情", "餐具细览"],
  ["冲煮档案详情", "冲煮细览"],
  ["馆藏对象细览", "馆藏细览"],
  ["共享详情", "细览"],
  ["看共享详情", "看细览"],
  ["看资料台账", "看参考资料"],
  ["看文献规则", "看古籍摘读"],
  ["看历史档案", "看历史脉络"],
  ["看来源机构", "看参考出处"],
  ["来源机构", "参考出处"],
  ["机构来源", "参考机构"],
  ["来源体系", "出处体系"],
  ["来源页面", "出处页面"],
  ["原始来源", "原文出处"],
  ["资料来源", "参考资料"],
  ["来源总览", "出处总览"],
  ["来源", "出处"],
  ["支撑内容", "关联内容"],
  ["支撑首页", "关联首页"],
  ["支撑茶具", "关联茶具"],
  ["支撑餐具", "关联餐具"],
  ["支撑花器", "关联花器"],
  ["支撑艺术品", "关联艺术品"],
  ["支撑咖啡具", "关联咖啡具"],
  ["支撑主盘", "关联主盘"],
  ["支撑 Kraak", "关联 Kraak"],
  ["支撑深碗", "关联深碗"],
  ["支撑成组", "关联成组"],
  ["支撑桌面", "关联桌面"],
  ["支撑海贸", "关联海贸"],
  ["支撑城市", "关联城市"],
  ["支撑空间", "关联空间"],
  ["支撑观看", "关联观看"],
  ["支撑具体器型", "关联具体器型"],
  ["支撑", "关联"],
  ["判断线", "线索"],
  ["判断点", "看点"],
  ["判断标准", "看点标准"],
  ["判断条目", "阅读条目"],
  ["判断样本", "参照样本"],
  ["判断顺序", "观看顺序"],
  ["判断维度", "欣赏角度"],
  ["判断逻辑", "欣赏逻辑"],
  ["判断直接", "辨识直接"],
  ["判断茶具", "理解茶具"],
  ["判断盏系", "识别盏系"],
  ["判断主盘", "识别主盘"],
  ["判断从", "欣赏从"],
  ["判断青花", "理解青花"],
  ["规则拉回", "内容接回"],
  ["规则说明", "内容说明"],
  ["规则决定", "参数影响"],
  ["规则网格", "秩序网格"],
  ["档案选读", "专题选读"],
  ["台账中", "列表中"],
  ["台账要", "列表要"],
  ["台账现", "列表现"],
  ["台账，", "列表，"],
  ["台账。", "列表。"],
  ["台账", "列表"],
  ["档案", "专题"],
  ["规则", "要点"],
  ["判断", "辨识"]
];

// 正式页面只输出面向用户的讲解词，保留数据字段和组件命名给工程侧继续复用。
function cleanPublicCopy(html) {
  return publicCopyReplacements.reduce((copy, [from, to]) => copy.replaceAll(from, to), html);
}

function renderCategoryCards(items) {
  return items
    .map(
      ({ href, name, intro, homepageSummary, heroImage }) => `
        <a class="object-card" href="${href}">
          <img src="${heroImage}" alt="${name}">
          <div>
            <h3>${name}</h3>
            ${(homepageSummary ?? intro) ? `<p>${homepageSummary ?? intro}</p>` : ""}
          </div>
        </a>
      `
    )
    .join("");
}

function renderProcessSteps(items) {
  return items
    .map((item, index) => {
      const title = Array.isArray(item) ? item[0] : item.title;
      return `
        <button class="process-step${index === 0 ? " is-active" : ""}" data-step-index="${index}">
          <span>${title}</span>
        </button>
      `;
    })
    .join("");
}

function renderProcessPanels(items) {
  return items
    .map((item, index) => {
      const title = Array.isArray(item) ? item[0] : item.title;
      const text = Array.isArray(item) ? item[1] : item.text;
      return `
        <article class="process-panel${index === 0 ? " is-active" : ""}" data-process-panel="${index}"${index === 0 ? "" : " hidden"}>
          <h3>${title}</h3>
          <p>${text}</p>
        </article>
      `;
    })
    .join("");
}

function renderReadingCards(cards, researchItems) {
  return cards
    .map(([title, text, researchId]) => {
      const item = researchItems.find((entry) => entry.id === researchId);
      return `
        <article class="reading-card">
          <h3>${title}</h3>
          <p>${text}</p>
          <a class="link-button" href="research.html?id=${researchId}">查看专题</a>
          <span class="source-note">${item?.sourceName ?? "研究档案"}</span>
        </article>
      `;
    })
    .join("");
}

// 首页统计卡保持服务内容导览，避免首屏只剩品牌文案而缺少密度。
function renderKeyStats(categories, glossaryItems, timelineItems, processItems) {
  const stats = [
    ["历史节点", `${timelineItems.length} 条`],
    ["工艺步骤", `${processItems.length} 步`],
    ["术语卡", `${glossaryItems.length} 张`],
    ["器类入口", `${categories.length} 类`]
  ];

  return stats
    .map(
      ([label, value]) => `
        <article class="stat-card">
          <strong>${value}</strong>
          <span>${label}</span>
        </article>
      `
    )
    .join("");
}

function renderHeroMetricCards(items) {
  return items
    .map(
      ([value, label]) => `
        <article class="stat-card stat-card--hero">
          <strong>${value}</strong>
          <span>${label}</span>
        </article>
      `
    )
    .join("");
}

function renderSectionLinkStrip(items) {
  return `
    <nav class="section-link-strip" aria-label="首页分区导航">
      ${items.map(({ href, label }) => `<a class="section-link-strip__item" href="${href}">${label}</a>`).join("")}
    </nav>
  `;
}

function renderHomeSectionNav(items = []) {
  if (!items.length) return "";

  // 首页内容跨度较长，固定索引用编号和 aria-current 明确当前位置，避免用户滚动后失去分区方向。
  return `
    <nav class="home-section-nav home-section-nav--fixed" aria-label="首页内容导航" data-home-section-nav>
      <div class="home-section-nav__rail">
        ${items
          .map(({ href, label }, index) => {
            const targetId = href.replace(/^#/, "");
            const navIndex = String(index + 1).padStart(2, "0");
            const current = index === 0 ? ' aria-current="true"' : "";
            return `<a class="home-section-nav__item" href="${href}" data-home-nav-link="${targetId}"${current}><span class="home-section-nav__index">${navIndex}</span><span class="home-section-nav__text">${label}</span></a>`;
          })
          .join("")}
      </div>
    </nav>
  `;
}

function renderFocusBands(items) {
  return items
    .map(
      ({ eyebrow, title, text }) => `
        <article class="brief-card">
          <p class="eyebrow">${eyebrow}</p>
          <h3>${title}</h3>
          <p>${text}</p>
        </article>
      `
    )
    .join("");
}

function renderSourceMetrics(items) {
  return `
    <div class="micro-stat-grid">
      ${items.map(([label, value]) => `<span class="micro-stat"><strong>${value}</strong><span>${label}</span></span>`).join("")}
    </div>
  `;
}

function renderSourceDeckRows(items) {
  return items
    .map(
      ({ id, eyebrow, title, summary, metrics }) => `
        <button class="portal-row" type="button" data-detail-trigger="${id}" data-detail-group="home-detail">
          <div class="portal-row__copy">
            <p class="eyebrow">${eyebrow}</p>
            <h3>${title}</h3>
            <p>${summary}</p>
          </div>
          ${renderSourceMetrics(metrics)}
        </button>
      `
    )
    .join("");
}

function renderSignalCards(items) {
  return items
    .map(
      ({ eyebrow, title, summary, href, stat }) => `
        <a class="brief-card brief-card--link" href="${href}" target="_blank" rel="noreferrer">
          <p class="eyebrow">${eyebrow}</p>
          <h3>${title}</h3>
          <p>${summary}</p>
          <span class="source-note">${stat}</span>
        </a>
      `
    )
    .join("");
}

function renderCategoryOverviewCards(items) {
  return items
    .map(
      ({ href, title, summary, stats }) => `
        <a class="brief-card brief-card--link brief-card--entry" href="${href}">
          <div>
            <p class="eyebrow">栏目入口</p>
            <h3>${title}</h3>
          </div>
          <p>${summary}</p>
          ${renderSourceMetrics(stats)}
        </a>
      `
    )
    .join("");
}

function renderHighlightCards(items) {
  return items
    .map(
      ({ id, eyebrow, title, summary, imagePath, sourceName }) => `
        <button class="highlight-card" type="button" data-detail-trigger="${id}" data-detail-group="home-detail" aria-selected="false">
          ${imagePath ? `<img class="highlight-card__image" src="${imagePath}" alt="${title}">` : ""}
          <div class="highlight-card__copy">
            <p class="eyebrow">${eyebrow}</p>
            <h3>${title}</h3>
            <p>${summary}</p>
            <span class="source-note">${sourceName}</span>
          </div>
        </button>
      `
    )
    .join("");
}

function renderGlossaryDetailCards(items) {
  return items
    .slice(0, 8)
    .map(
      ({ id, title, summary }) => `
        <button class="glossary-card glossary-card--detail" type="button" data-detail-trigger="${id}" data-detail-group="home-detail" aria-selected="false">
          <h3>${title}</h3>
          <p>${summary}</p>
        </button>
      `
    )
    .join("");
}

function renderNetworkCards(items) {
  return items
    .map(
      ({ eyebrow, title, summary }) => `
        <article class="network-panel">
          <p class="eyebrow">${eyebrow}</p>
          <h3>${title}</h3>
          <p>${summary}</p>
        </article>
      `
    )
    .join("");
}

function renderFeaturedResearchCards(ids, researchItems) {
  return ids
    .map((id) => researchItems.find((item) => item.id === id))
    .filter(Boolean)
    .map(
      (item) => `
        <button class="research-card research-card--detail" type="button" data-detail-trigger="${item.id}" data-detail-group="home-detail">
          <img src="${item.imagePath}" alt="${item.title}">
          <div>
            <p class="eyebrow">${item.era}</p>
            <h3>${item.title}</h3>
          </div>
          <p>${item.summary}</p>
          <span class="source-note">${item.sourceName}</span>
        </button>
      `
    )
    .join("");
}

function renderTimeline(items) {
  return items
    .map(
      ({ id, era, title, summary }, index) => `
        <button
          class="timeline-node${index === 0 ? " is-active" : ""}"
          type="button"
          data-detail-trigger="${id}"
          data-detail-group="home-detail"
          aria-selected="${index === 0 ? "true" : "false"}"
        >
          <span class="timeline-node__era">${era}</span>
          <strong>${title}</strong>
          <small>${summary}</small>
        </button>
      `
    )
    .join("");
}

export function renderTimelineFocusPanel(item, categories) {
  return `
    <article class="timeline-focus">
      <p class="eyebrow">时间线焦点</p>
      <h3>${item.title}</h3>
      <p>${item.detail}</p>
      <ul class="context-panel__facts">
        ${item.facts.map((fact) => `<li>${fact}</li>`).join("")}
      </ul>
      <div class="hero-actions">
        ${renderRelatedCategoryLinks(item.relatedCategories, categories)}
      </div>
    </article>
  `;
}

function renderJingdezhenPanel(panel) {
  return `
    <article class="context-panel">
      <p class="eyebrow">${panel.eyebrow}</p>
      <h3>${panel.title}</h3>
      <p>${panel.summary}</p>
      <ul class="context-panel__facts">
        ${panel.facts.map((fact) => `<li>${fact}</li>`).join("")}
      </ul>
    </article>
  `;
}

function renderResearchIndexFilters(filters) {
  return filters
    .map(
      ({ id, label, tag }, index) => `
        <button
          class="index-filter${index === 0 ? " is-active" : ""}"
          data-filter-group="tag"
          data-filter-tag="${tag}"
          data-filter-id="${id}"
          aria-selected="${index === 0 ? "true" : "false"}"
        >
          ${label}
        </button>
      `
    )
    .join("");
}

function renderResearchPeriodFilters(filters) {
  return filters
    .map(
      ({ id, label, period }, index) => `
        <button
          class="index-filter${index === 0 ? " is-active" : ""}"
          data-filter-group="period"
          data-filter-period="${period}"
          data-filter-id="${id}"
          aria-selected="${index === 0 ? "true" : "false"}"
        >
          ${label}
        </button>
      `
    )
    .join("");
}

function renderResearchSourceFilters(filters) {
  return filters
    .map(
      ({ id, label, sourceType }, index) => `
        <button
          class="index-filter${index === 0 ? " is-active" : ""}"
          data-filter-group="sourceType"
          data-filter-source-type="${sourceType}"
          data-filter-id="${id}"
          aria-selected="${index === 0 ? "true" : "false"}"
        >
          ${label}
        </button>
      `
    )
    .join("");
}

function renderResearchIndexCards(items) {
  return items
    .map(
      ({ id, title, summary, sourceName, sourceType, tags, periods }) => `
        <article class="research-card research-card--index" data-research-card="${id}" data-research-tags="${tags.join("|")}" data-research-periods="${periods.join("|")}" data-research-source-type="${sourceType}">
          <div>
            <p class="eyebrow">${tags[0]}</p>
            <h3>${title}</h3>
          </div>
          <p>${summary}</p>
          <div class="tag-row">
            ${tags.map((tag) => `<span class="tag-chip">${tag}</span>`).join("")}
            <span class="tag-chip">${periods[0]}</span>
          </div>
          <div class="research-card__meta">
            <a class="link-button" href="research.html?id=${id}">查看专题</a>
            <span class="source-note">${sourceType} / ${sourceName}</span>
          </div>
        </article>
      `
    )
    .join("");
}

function renderGlossaryCards(items) {
  return items
    .map(
      ({ id, title, summary, relatedResearchIds }) => `
        <article class="glossary-card" data-glossary-id="${id}">
          <h3>${title}</h3>
          <p>${summary}</p>
          <div class="hero-actions">
            ${relatedResearchIds?.[0] ? `<a class="link-button" href="research.html?id=${relatedResearchIds[0]}">关联专题</a>` : ""}
            ${
              relatedResearchIds?.length
                ? `<button class="link-button glossary-filter-trigger" type="button" data-related-research-ids="${relatedResearchIds.join("|")}" data-related-title="${title}">筛到索引</button>`
                : ""
            }
          </div>
        </article>
      `
    )
    .join("");
}

function renderCategoryResearchModules(category) {
  return `
    <section class="category-module category-collapsible" id="category-context" data-collapsible-section>
      <div class="section-heading section-heading--compact">
        <div>
          <h2>观察维度</h2>
        </div>
        <button class="section-toggle" type="button" data-collapsible-toggle aria-expanded="true">收起</button>
      </div>
      <div class="category-context category-module-grid" data-collapsible-content>
        <article class="research-card">
          <h3>相关历史节点</h3>
          <p>${category.historyNote}</p>
        </article>
        <article class="research-card">
          <h3>相关术语</h3>
          <p>${category.glossaryTitles.join(" / ")}</p>
        </article>
        <article class="research-card">
          <h3>观察维度</h3>
          <ul class="context-panel__facts">
            ${category.focusPoints.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </article>
      </div>
    </section>
  `;
}

function renderCategoryResearchCards(cards) {
  return cards
    .map(
      ({ item, spotlight }) => `
        <article class="research-card">
          <img src="${item.imagePath}" alt="${item.title}">
          <div>
            <p class="eyebrow">${spotlight.eyebrow ?? item.era}</p>
            <h3>${item.title}</h3>
          </div>
          <p>${item.summary}</p>
          <a class="link-button" href="research.html?id=${item.id}">查看专题</a>
        </article>
      `
    )
    .join("");
}

function renderSummaryStats(stats) {
  if (!stats?.length) return "";

  return `
    <div class="summary-stat-row">
      ${stats
        .map(
          ([value, label]) => `
            <article class="summary-stat">
              <strong>${value}</strong>
              <span>${label}</span>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function getCategoryFacetText(defaultFacets = ["用途"], ...values) {
  const text = values.filter(Boolean).join(" ");
  const facets = ["用途", "器形", "纹样", "意境", "传播"].filter((facet) => text.includes(facet));
  return [...new Set([...(facets.length ? facets : []), ...defaultFacets])].join("|");
}

function getCategoryPageLinks(category) {
  return (
    category.pageLinks ?? [
      { href: "#category-panels", label: "看器物栏目" },
      { href: "#category-context", label: "看欣赏角度" },
      { href: "#category-research", label: "看延伸研究" }
    ]
  );
}

const categoryGuideProfiles = {
  tea: {
    title: "从饮法进入",
    text: "先选点茶、泡饮或分饮，再细看口沿、腹深、出汤路径和套组关系。",
    actions: [
      { href: "#category-panels", label: "选择饮法", text: "按使用场景切换浏览重点。" },
      { href: "#tea-typology", label: "看茶器", text: "对照盏、碗、壶、盖碗与杯碟。" },
      { href: "#tea-detail", label: "细看器物", text: "展开对象、尺寸和出处。" }
    ]
  },
  tableware: {
    title: "从桌面分工进入",
    text: "先分主盘、深碗、外销盘和成组服务，再看盘面版式与海外流通。",
    actions: [
      { href: "#category-panels", label: "选择用途", text: "按桌面角色切换浏览重点。" },
      { href: "#tableware-roster", label: "看谱系", text: "查看盘、碗、碟的成组关系。" },
      { href: "#tableware-collection", label: "看馆藏", text: "用对象样本校正阅读。" }
    ]
  },
  coffee: {
    title: "从冲煮方式进入",
    text: "先选滤泡、浸泡、压力或冷萃系统，再看容量、时间和器具结构。",
    actions: [
      { href: "#category-panels", label: "选择方式", text: "按冲煮路径切换浏览重点。" },
      { href: "#coffee-systems", label: "看系统", text: "对照滤材、流速和器具形态。" },
      { href: "#coffee-matrix", label: "看条件", text: "比较温度、时长和粉水比例。" }
    ]
  },
  vase: {
    title: "从陈设场景进入",
    text: "先定书斋、厅堂或案几位置，再看口沿、肩线、腹部和插枝空间。",
    actions: [
      { href: "#category-panels", label: "选择场景", text: "按空间关系切换浏览重点。" },
      { href: "#vase-typology", label: "看器形", text: "对照梅瓶、觚式瓶和抱月瓶。" },
      { href: "#vase-detail", label: "细看花器", text: "展开轮廓、用途和出处。" }
    ]
  },
  art: {
    title: "从观看方式进入",
    text: "先看正面性、题景、年款和展陈位置，再把对象放回收藏语境。",
    actions: [
      { href: "#category-panels", label: "选择看法", text: "按图像、器型和语境切换重点。" },
      { href: "#art-highlights", label: "看馆藏", text: "进入首要对象和策展说明。" },
      { href: "#art-axes", label: "看路径", text: "整理从图像到陈设的阅读顺序。" }
    ]
  }
};

function getCategoryGuideProfile(category) {
  return (
    categoryGuideProfiles[category.slug] ?? {
      title: `从${category.name}进入`,
      text: category.intro || category.historyNote || "先选择浏览重点，再进入对象样本和参考出处。",
      actions: getCategoryPageLinks(category)
        .slice(0, 3)
        .map(({ href, label }) => ({ href, label: normalizeAnchorLabel(label), text: "跳转到本页对应内容。" }))
    }
  );
}

function renderCategoryGuideActions(actions) {
  return actions
    .map(
      ({ href, label }) => `
        <a class="category-guide-card artifact-motion-card" href="${href}">
          <strong>${label}</strong>
        </a>
      `
    )
    .join("");
}

function renderCategoryHeroGuide(category) {
  const profile = getCategoryGuideProfile(category);

  return `
    <div class="category-hero-guide">
      <div class="category-hero-guide__actions" aria-label="${category.name}快捷入口">
        ${renderCategoryGuideActions(profile.actions)}
      </div>
    </div>
  `;
}

function normalizeAnchorLabel(label = "") {
  return label.replace(/^看/, "");
}

function createCategoryNavItems(category, sections = []) {
  const baseItems = [{ id: "category-panels", label: "浏览重点" }];
  const sectionItems = sections
    .filter(Boolean)
    .map(({ id, title }) => ({ id, label: normalizeAnchorLabel(title) }))
    .filter(({ id, label }) => id && label);
  const researchItems = category.researchModules?.length ? [{ id: "category-context", label: "欣赏角度" }] : [];
  const hasResearchCards = category.relatedResearchIds?.length || category.researchSpotlights?.length;

  return [...baseItems, ...sectionItems, ...researchItems, ...(hasResearchCards ? [{ id: "category-research", label: "延伸阅读" }] : [])];
}

function renderCategorySectionNav(items) {
  if (!items?.length) return "";

  return `
    <nav class="category-section-nav" aria-label="内容快捷导航" data-category-section-nav>
      ${items
        .map(
          ({ id, label }, index) => `
            <a class="category-section-nav__item" href="#${id}">
              <span>${String(index + 1).padStart(2, "0")}</span>
              <strong>${label}</strong>
            </a>
          `
        )
        .join("")}
    </nav>
  `;
}

// 五个器物栏目页共用同一套主目录：左侧保留分类说明，右侧提供入门路径和关键入口。
function renderCategoryLead(category) {
  return `
    <section class="category-hero">
      <div class="category-hero__grid">
        <div class="category-hero__media">
          ${category.heroImage ? `<img class="category-hero__image" src="${category.heroImage}" alt="${category.name}">` : ""}
        </div>
        <div class="category-hero__copy">
          <p class="eyebrow">器物导览</p>
          <h1>${category.name}</h1>
          ${category.intro ? `<p class="category-hero__intro">${category.intro}</p>` : ""}
          <div class="tag-row tag-row--compact category-hero__tags">
            ${category.glossaryTitles.map((item) => `<span class="tag-chip">${item}</span>`).join("")}
          </div>
          ${renderCategoryHeroGuide(category)}
        </div>
      </div>
    </section>
  `;
}

function renderCategoryShell(category, sections, navItems = createCategoryNavItems(category, sections)) {
  return `
    <div class="category-page-shell category-page-shell--${category.slug}">
      ${renderCategoryLead(category)}
      <div class="category-content-stack">
        ${renderCategorySectionNav(navItems)}
        <div class="category-content-main">
          ${sections.join("")}
        </div>
      </div>
    </div>
  `;
}

function renderCategoryModule({ id, title, summary, className = "reading-section", body }) {
  return `
    <section class="${className} category-module" id="${id}">
      <div class="section-heading">
        <h2>${title}</h2>
        ${summary ? `<p>${summary}</p>` : ""}
      </div>
      ${body}
    </section>
  `;
}

function renderCategoryResearchSection(category, cards) {
  return `
    <section class="reading-section category-module category-collapsible" id="category-research" data-collapsible-section>
      <div class="section-heading section-heading--compact">
        <div>
          <h2>${category.researchSectionTitle ?? "延伸研究"}</h2>
          ${category.researchSectionSummary ? `<p>${category.researchSectionSummary}</p>` : ""}
        </div>
        <button class="section-toggle" type="button" data-collapsible-toggle aria-expanded="true">收起</button>
      </div>
      <div class="research-rail-shell" data-collapsible-content>
        <div class="research-strip research-strip--mobile-rail">
          ${renderCategoryResearchCards(cards)}
        </div>
      </div>
    </section>
  `;
}

function getCategoryResearchCards(category, researchItems) {
  return (category.researchSpotlights ?? category.relatedResearchIds.map((id) => ({ id })))
    .map((spotlight) => ({ item: researchItems.find((entry) => entry.id === spotlight.id), spotlight }))
    .filter(({ item }) => Boolean(item));
}

function renderCategoryDirectory(category) {
  return `
    <section class="tab-group category-tabs category-tabs--directory category-module" id="category-panels" data-category-directory>
      <div class="section-heading section-heading--compact">
        <div>
          <h2>浏览重点</h2>
          <p>先切换用途、器形、纹样和语境，再继续阅读下方内容。</p>
        </div>
      </div>
      <p class="category-filter-summary" data-category-filter-summary>正在查看：${category.panels?.[0]?.[0] ?? "用途"}</p>
      <div class="tab-buttons">${renderCategoryPanelButtons(category.panels)}</div>
      <div class="tab-panels category-tabs__panel-wrap">${renderCategoryPanelArticles(category.panels)}</div>
    </section>
  `;
}

function addCategoryModuleClass(sectionHtml) {
  return sectionHtml.replace("<section class=\"detail-deck-section inline-detail\"", "<section class=\"detail-deck-section inline-detail category-module\"");
}

function renderResearchFacts(items) {
  return items
    .map(
      (fact) => `
        <article class="research-fact-card">
          <p>${fact}</p>
        </article>
      `
    )
    .join("");
}

function renderRelatedCategoryLinks(categorySlugs, categories) {
  return categorySlugs
    .map((slug) => categories.find((item) => item.slug === slug))
    .filter(Boolean)
    .map(
      (item) => `
        <a class="link-button" href="${item.href}">
          ${item.name}
        </a>
      `
    )
    .join("");
}

function renderResearchTagChips(tags) {
  return `
    <div class="hero-actions">
      ${tags.map((tag) => `<span class="tag-chip">${tag}</span>`).join("")}
    </div>
  `;
}

function renderResearchGlossaryLinks(glossaryIds, glossaryItems) {
  const glossaryMap = new Map(glossaryItems.map((item) => [item.id, item]));
  return glossaryIds
    .map((id) => glossaryMap.get(id))
    .filter(Boolean)
    .map(
      (item) => `
        <article class="glossary-card">
          <h3>${item.title}</h3>
          <p>${item.summary}</p>
        </article>
      `
    )
    .join("");
}

function renderDetailMeta(items) {
  if (!items?.length) return "";

  return `
    <dl class="detail-card__meta">
      ${items.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join("")}
    </dl>
  `;
}

function renderDetailLinks(title, items) {
  if (!items?.length) return "";

  return `
    <div class="detail-card__group">
      <p class="eyebrow">${title}</p>
      <div class="hero-actions hero-actions--compact">
        ${items.map(({ label, href, url }) => `<a class="link-button" href="${href ?? url}"${url ? ' target="_blank" rel="noreferrer"' : ""}>${label}</a>`).join("")}
      </div>
    </div>
  `;
}

export function renderEmbeddedDetail(detail) {
  if (!detail) return "";

  return `
    <article class="detail-card">
      ${detail.imagePath ? `<img class="detail-card__image" src="${detail.imagePath}" alt="${detail.title}">` : ""}
      <div class="detail-card__copy">
        <p class="eyebrow">${detail.eyebrow}</p>
        <h2>${detail.title}</h2>
        <p>${detail.summary}</p>
        ${renderDetailMeta(detail.meta)}
        ${
          detail.facts?.length
            ? `<ul class="detail-card__facts">${detail.facts.map((fact) => `<li>${fact}</li>`).join("")}</ul>`
            : ""
        }
        ${renderDetailLinks("来源页面", detail.sourceLinks)}
        ${renderDetailLinks("继续阅读", detail.relatedLinks)}
      </div>
    </article>
  `;
}

function normalizeSourceDetail(item) {
  return {
    id: item.id,
    eyebrow: item.eyebrow,
    title: item.detailTitle ?? item.title,
    summary: item.detailBody ?? item.summary,
    imagePath: item.imagePath,
    meta: item.detailMeta ?? [],
    facts: item.detailBullets ?? [],
    sourceLinks: item.sourceLinks ?? [],
    relatedLinks: []
  };
}

function normalizeFeaturedRecordDetail(item) {
  return {
    id: item.id,
    eyebrow: item.eyebrow,
    title: item.title,
    summary: item.summary,
    imagePath: item.imagePath,
    meta: item.detailMeta ?? [],
    facts: item.detailFacts ?? [],
    sourceLinks: item.sourceUrl ? [{ label: item.sourceName ?? "打开来源", url: item.sourceUrl }] : [],
    relatedLinks: item.categoryHref ? [{ label: item.categoryName ?? "返回栏目", href: item.categoryHref }] : []
  };
}

function normalizeResearchDetail(item, categories) {
  return {
    id: item.id,
    eyebrow: item.era,
    title: item.title,
    summary: item.lead ?? item.summary,
    imagePath: item.imagePath,
    meta: [
      ["来源", item.sourceName],
      ["资料类型", item.sourceType],
      ["时段", item.periods?.join(" / ") ?? item.era]
    ],
    facts: item.keyFacts ?? [],
    sourceLinks: item.sourceUrl ? [{ label: item.sourceName, url: item.sourceUrl }] : [],
    relatedLinks: renderRelatedCategoryLinks(item.relatedCategories, categories)
      ? item.relatedCategories
          .map((slug) => categories.find((entry) => entry.slug === slug))
          .filter(Boolean)
          .map((entry) => ({ label: entry.name, href: entry.href }))
      : []
  };
}

function normalizeTimelineDetail(item, researchItems, categories) {
  const researchItem = researchItems.find((entry) => entry.id === item.researchId);
  const categoryLinks = (item.relatedCategories ?? [])
    .map((slug) => categories.find((entry) => entry.slug === slug))
    .filter(Boolean)
    .map((entry) => ({ label: entry.name, href: entry.href }));

  return {
    id: item.id,
    eyebrow: item.era,
    title: item.title,
    summary: item.detail ?? item.summary,
    imagePath: researchItem?.imagePath,
    meta: [
      ["时段", item.era],
      ["来源", researchItem?.sourceName ?? "首页时间脉络"],
      ["关联栏目", categoryLinks.map((entry) => entry.label).join(" / ") || "器物栏目"]
    ],
    facts: item.facts ?? researchItem?.keyFacts ?? [],
    sourceLinks: researchItem?.sourceUrl ? [{ label: researchItem.sourceName, url: researchItem.sourceUrl }] : [],
    relatedLinks: categoryLinks
  };
}

function normalizeGlossaryDetail(item, researchItems, categories) {
  const matchedItems = researchItems.filter((entry) => item.relatedResearchIds?.includes(entry.id));
  const relatedCategories = [...new Set(matchedItems.flatMap((entry) => entry.relatedCategories ?? []))]
    .map((slug) => categories.find((entry) => entry.slug === slug))
    .filter(Boolean)
    .map((entry) => ({ label: entry.name, href: entry.href }));

  return {
    id: item.id,
    eyebrow: "术语索引",
    title: item.title,
    summary: item.summary,
    meta: [
      ["相关资料", `${matchedItems.length} 条`],
      ["关联栏目", relatedCategories.map((entry) => entry.label).join(" / ") || "器物栏目"]
    ],
    facts: matchedItems.slice(0, 4).map((entry) => `${entry.title}：${entry.summary}`),
    sourceLinks: matchedItems[0]?.sourceUrl ? [{ label: matchedItems[0].sourceName, url: matchedItems[0].sourceUrl }] : [],
    relatedLinks: relatedCategories
  };
}

export function buildHomeDetailLookup(home, researchItems, categories) {
  const lookup = new Map();

  home.sourceDeck.items.forEach((item) => {
    lookup.set(item.id, item);
  });

  (home.featuredRecords ?? []).forEach((item) => {
    lookup.set(item.id, item);
  });

  return lookup;
}

function renderResearchPreviewCards(items) {
  return items
    .map(
      (item) => `
        <article class="research-card">
          <img src="${item.imagePath}" alt="${item.title}">
          <div>
            <p class="eyebrow">${item.era}</p>
            <h3>${item.title}</h3>
          </div>
          <p>${item.summary}</p>
          <a class="link-button" href="research.html?id=${item.id}">查看专题</a>
        </article>
      `
    )
    .join("");
}

function renderResearchPathCards(paths, researchItems) {
  return paths
    .map(
      (path) => `
        <article class="path-card">
          <div>
            <p class="eyebrow">研究路径</p>
            <h3>${path.title}</h3>
          </div>
          <p>${path.summary}</p>
          <ol class="path-card__steps">
            ${path.stops
              .map((id) => researchItems.find((item) => item.id === id))
              .filter(Boolean)
              .map((item) => `<li><a href="research.html?id=${item.id}">${item.title}</a></li>`)
              .join("")}
          </ol>
        </article>
      `
    )
    .join("");
}

function renderResearchEssay(paragraphs) {
  return paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("");
}

function renderObservationPoints(items) {
  return items
    .map(
      (item) => `
        <article class="research-fact-card">
          <p>${item}</p>
        </article>
      `
    )
    .join("");
}

function renderSourceArchive(item) {
  return `
    <div class="reading-grid">
      <article class="research-card">
        <h3>机构类型</h3>
        <p>${item.sourceType}</p>
      </article>
      <article class="research-card">
        <h3>资料重点</h3>
        <p>${item.sourceFocus}</p>
      </article>
      <article class="research-card">
        <h3>原始来源</h3>
        <p>${item.sourceName}</p>
        <a class="link-button" href="${item.sourceUrl}" target="_blank" rel="noreferrer">打开原文</a>
      </article>
    </div>
  `;
}

function renderTopicGraph(item, researchItems) {
  const relatedByTag = researchItems
    .filter((entry) => entry.id !== item.id && entry.tags.some((tag) => item.tags.includes(tag)))
    .slice(0, 3);
  const relatedByPeriod = researchItems
    .filter((entry) => entry.id !== item.id && entry.periods?.some((period) => item.periods?.includes(period)))
    .slice(0, 3);
  const relatedBySource = researchItems
    .filter((entry) => entry.id !== item.id && entry.sourceName === item.sourceName)
    .slice(0, 3);

  const groups = [
    ["同主题", relatedByTag],
    ["同时段", relatedByPeriod],
    ["同来源体系", relatedBySource]
  ].filter(([, entries]) => entries.length);

  return groups
    .map(
      ([label, entries]) => `
        <article class="path-card">
          <div>
            <p class="eyebrow">关联图谱</p>
            <h3>${label}</h3>
          </div>
          <div class="tag-row">
            ${entries.map((entry) => `<a class="link-button" href="research.html?id=${entry.id}">${entry.title}</a>`).join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function renderSectionNav(items) {
  return `
    <nav class="section-nav" aria-label="专题导览">
      ${items.map(([href, label]) => `<a class="link-button" href="${href}">${label}</a>`).join("")}
    </nav>
  `;
}

function renderMatchedResearchPaths(currentId, paths, researchItems) {
  const matchedPaths = paths.filter((path) => path.stops.includes(currentId));
  return renderResearchPathCards(matchedPaths.length ? matchedPaths : paths.slice(0, 2), researchItems);
}

function renderHeroBrief(brief) {
  return `
    <div class="hero-brief-grid">
      ${brief
        .map(
          ([label, text]) => `
            <article class="brief-card">
              <p class="eyebrow">${label}</p>
              <p>${text}</p>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderHeroFocusCard(card) {
  return `
    <article class="hero-focus-card">
      <p class="eyebrow">${card.eyebrow}</p>
      <h3>${card.title}</h3>
      <p>${card.summary}</p>
      <div class="hero-actions hero-actions--compact">
        ${card.actions.map(({ href, label }) => `<a class="link-button" href="${href}">${label}</a>`).join("")}
      </div>
    </article>
  `;
}

function renderFeatureSpotlightSection(spotlight) {
  if (!spotlight) return "";

  const sectionClass = spotlight.sectionClass ?? "feature-focus-section";
  const sectionId = spotlight.sectionId ?? "feature-focus";
  const eyebrow = spotlight.eyebrow ?? spotlight.title;
  const heading = spotlight.heading ?? spotlight.title;

  return `
    <section class="${sectionClass}" id="${sectionId}">
      <div class="section-heading">
        <p class="eyebrow">${eyebrow}</p>
        <h2>${heading}</h2>
        <p>${spotlight.summary}</p>
      </div>
      <div class="vase-spotlight-grid">
        <div class="summary-stat-row">
          ${spotlight.stats
            .map(
              ([value, label]) => `
                <article class="summary-stat">
                  <strong>${value}</strong>
                  <span>${label}</span>
                </article>
              `
            )
            .join("")}
        </div>
        <div class="reading-grid">
          ${spotlight.bands
            .map(
              ({ eyebrow, title, text }) => `
                <article class="path-card">
                  <p class="eyebrow">${eyebrow}</p>
                  <h3>${title}</h3>
                  <p>${text}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderInstitutionSignals(items) {
  return renderInstitutionSignalSection(items, "机构来源", "首页列出本次专题整理所依赖的馆藏机构、公开研究与国际组织入口，便于直接追溯资料边界。");
}

function renderInstitutionSignalSection(items, title, summary) {
  return `
    <section class="institution-section">
      <div class="section-heading">
        <h2>${title}</h2>
        <p>${summary}</p>
      </div>
      <div class="institution-grid">
        ${items
          .map(
            ({ eyebrow, title, summary, href, stat }) => `
              <article class="institution-card">
                <div>
                  <p class="eyebrow">${eyebrow}</p>
                  <h3>${title}</h3>
                </div>
                <p>${summary}</p>
                <div class="institution-card__meta">
                  <span class="tag-chip">${stat}</span>
                  <a class="link-button" href="${href}" target="_blank" rel="noreferrer">打开来源</a>
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderCoffeeSystemCards(items) {
  return items
    .map(
      ({ title, format, ratio, temperature, time, filter, note, sourceName, sourceUrl }) => `
        <article class="research-card system-card" data-category-filter-target data-category-facets="${getCategoryFacetText(["用途", "器形"], title, format, ratio, temperature, time, filter, note)}">
          <div>
            <p class="eyebrow">${format}</p>
            <h3>${title}</h3>
          </div>
          <div class="system-card__body">
            <p>${note}</p>
            <p><strong>主要看点</strong>：先看 ${format} 如何控制水路和接触时间，再把 ${ratio}、${temperature} 与 ${filter} 放在同一组里比较。</p>
          </div>
          <div class="detail-panel__meta detail-panel__meta--stack">
            <div class="detail-meta-chip"><span>粉水比</span><strong>${ratio}</strong></div>
            <div class="detail-meta-chip"><span>温度</span><strong>${temperature}</strong></div>
            <div class="detail-meta-chip"><span>时间</span><strong>${time}</strong></div>
            <div class="detail-meta-chip"><span>滤材</span><strong>${filter}</strong></div>
          </div>
          <div class="research-card__meta">
            <span class="source-note">${sourceName}</span>
            <a class="link-button" href="${sourceUrl}" target="_blank" rel="noreferrer">查看协议</a>
          </div>
        </article>
      `
    )
    .join("");
}

function renderCoffeeProtocolLedger(items) {
  return `
    <div class="protocol-ledger">
      ${items
        .map(
          ({ title, brewingWindow, ratio, temperature, filter, vessel }) => `
            <article class="matrix-row" data-category-filter-target data-category-facets="${getCategoryFacetText(["用途"], title, brewingWindow, ratio, temperature, filter, vessel)}">
              <div>
                <p class="eyebrow">参数矩阵</p>
                <h3>${title}</h3>
              </div>
              <p>${brewingWindow}</p>
              <p>${ratio}</p>
              <p>${temperature}</p>
              <p>${filter}</p>
              <p>${vessel}</p>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderCoffeeHistoryCards(items) {
  return items
    .map(
      ({ eyebrow, title, summary, sourceName, href }) => `
        <article class="research-card history-card" data-category-filter-target data-category-facets="${getCategoryFacetText(["传播", "意境"], eyebrow, title, summary, sourceName)}">
          <div>
            <p class="eyebrow">${eyebrow}</p>
            <h3>${title}</h3>
          </div>
          <div class="history-card__body">
            <p>${summary}</p>
            <p><strong>为什么重要</strong>：这段资料把咖啡具从当代设备拉回杯壶比例、市场定制和社交场景，便于和上方冲煮系统互相对照。</p>
          </div>
          <div class="research-card__meta">
            <span class="source-note">${sourceName}</span>
            <a class="link-button" href="${href}" target="_blank" rel="noreferrer">打开对象页</a>
          </div>
        </article>
      `
    )
    .join("");
}

function renderNetworkPanels(items) {
  return `
    <section class="reading-section" id="signal-grid">
      <div class="section-heading">
        <h2>资料网络</h2>
        <p>把馆藏对象、研究文章与城市系统资料并排展示，让首页读法更接近正式资料门户，而不是单向品牌页。</p>
      </div>
      <div class="reading-grid">
        ${items
          .map(
            ({ eyebrow, title, summary }) => `
              <article class="network-panel path-card">
                <p class="eyebrow">${eyebrow}</p>
                <h3>${title}</h3>
                <p>${summary}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function mapInlineDetailItem(item) {
  const sourceLinks = item.sourceLinks ?? (item.sourceUrl ? [{ label: item.sourceName ?? "查看来源", url: item.sourceUrl }] : []);
  const metrics = item.metrics ?? [
    ["来源", item.sourceName ?? "资料来源"],
    ["分组", item.eyebrow ?? item.type ?? "专题对象"]
  ];
  const detailBullets = item.detailBullets ?? item.detailFacts ?? [];
  const detailMeta =
    item.detailMeta ??
    [
      ["来源", item.sourceName ?? "资料来源"],
      ["说明", item.focus ?? item.summary ?? "对象摘要"]
    ];

  return {
    id: item.id,
    eyebrow: item.eyebrow ?? item.type ?? "资料节点",
    title: item.title,
    summary: item.summary,
    detailTitle: item.detailTitle ?? item.title,
    detailBody: item.detailBody ?? item.summary,
    metrics,
    detailBullets,
    detailMeta,
    sourceLinks
  };
}

function renderFeaturedRecordSection(title, summary, items, sectionId) {
  const normalizedItems = items.map((item) => {
    const detail = mapInlineDetailItem(item);
    return {
      id: detail.id,
      eyebrow: detail.eyebrow,
      title: detail.detailTitle,
      summary: detail.detailBody,
      imagePath: item.imagePath,
      detailFacts: detail.detailBullets,
      detailMeta: detail.detailMeta,
      sourceName: item.sourceName ?? detail.sourceLinks?.[0]?.label ?? "资料来源",
      sourceUrl: item.sourceUrl ?? detail.sourceLinks?.[0]?.url ?? "#"
    };
  });

  return `
    <section class="reading-section" id="${sectionId}">
      <div class="section-heading">
        <h2>${title}</h2>
        <p>${summary}</p>
      </div>
      ${renderInlineDetailCards(normalizedItems)}
    </section>
  `;
}

function getFeaturedRecords(items, detailItems = []) {
  const seen = new Set((items ?? []).map((item) => item.title));
  const detailRecords = (detailItems ?? [])
    .filter((item) => !seen.has(item.title))
    .map((item) => ({
      id: item.id,
      eyebrow: item.eyebrow,
      title: item.title,
      summary: item.detailBody ?? item.summary,
      detailTitle: item.detailTitle ?? item.title,
      detailBody: item.detailBody ?? item.summary,
      detailFacts: item.detailBullets ?? [],
      detailMeta: item.detailMeta ?? [],
      sourceName: item.sourceLinks?.[0]?.label ?? "参考出处",
      sourceUrl: item.sourceLinks?.[0]?.url ?? "#",
      imagePath: item.imagePath
    }));

  return [...(items ?? []), ...detailRecords].slice(0, Math.max(6, items?.length ?? 0));
}

function renderDetailMetrics(items) {
  return `
    <div class="detail-panel__meta">
      ${items
        .map(
          ([label, value]) => `
            <div class="detail-meta-chip">
              <span>${label}</span>
              <strong>${value}</strong>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function renderSourceLinks(items) {
  return `
    <div class="hero-actions hero-actions--compact">
      ${items.map(({ label, url }) => `<a class="link-button" href="${url}" target="_blank" rel="noreferrer">${label}</a>`).join("")}
    </div>
  `;
}

// 详情 deck 是首页与专题页共用的内嵌资料查看器，左侧索引，右侧详情，避免资料只能跳走阅读。
function renderDetailDeck(sectionId, deck) {
  return `
    <section class="detail-deck-section inline-detail" id="${sectionId}">
      <div class="section-heading">
        <h2>${deck.title}</h2>
        <p>${deck.summary}</p>
      </div>
      <div class="detail-deck inline-detail" data-detail-root data-inline-detail-root>
        <div class="detail-deck__list inline-detail__list">
          ${deck.items
            .map(
              (item, index) => `
                <button
                  class="detail-trigger inline-detail__trigger${index === 0 ? " is-active" : ""}"
                  type="button"
                  data-detail-trigger
                  data-inline-detail-trigger
                  data-detail-target="${item.id}"
                  data-inline-detail-target="${item.id}"
                  aria-selected="${index === 0 ? "true" : "false"}"
                  aria-expanded="${index === 0 ? "true" : "false"}"
                >
                  <span class="detail-trigger__eyebrow">${item.eyebrow}</span>
                  <strong>${item.title}</strong>
                  <small>${item.summary}</small>
                </button>
              `
            )
            .join("")}
        </div>
        <div class="detail-deck__panels">
          ${deck.items
            .map(
              (item, index) => `
                <article class="detail-panel inline-detail__panel${index === 0 ? " is-active" : ""}" data-detail-panel="${item.id}" data-inline-detail-panel="${item.id}"${index === 0 ? "" : " hidden"}>
                  <div class="detail-panel__header">
                    <p class="eyebrow">${item.eyebrow}</p>
                    <h3>${item.detailTitle}</h3>
                    <p>${item.detailBody}</p>
                  </div>
                  <div class="detail-panel__content-grid">
                    <div>
                      ${renderDetailMetrics(item.metrics).replace('detail-panel__meta', 'detail-panel__meta inline-detail__meta')}
                      <ul class="context-panel__facts inline-detail__facts">
                        ${item.detailBullets.map((bullet) => `<li>${bullet}</li>`).join("")}
                      </ul>
                    </div>
                    <div class="detail-panel__meta detail-panel__meta--stack inline-detail__meta">
                      ${item.detailMeta
                        .map(
                          ([label, value]) => `
                            <div class="detail-meta-chip">
                              <span>${label}</span>
                              <strong>${value}</strong>
                            </div>
                          `
                        )
                        .join("")}
                    </div>
                  </div>
                  ${renderSourceLinks(item.sourceLinks)}
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderFeaturedResearchSection(featuredResearch, paths, researchItems) {
  const featuredItems = featuredResearch.ids
    .map((id) => researchItems.find((item) => item.id === id))
    .filter(Boolean);

  return `
    <section class="reading-paths-section" id="featured-research">
      <div class="section-heading">
        <h2>研究路径</h2>
        <p>${featuredResearch.summary}</p>
      </div>
      <div class="reading-grid">${renderResearchPathCards(paths.slice(0, 3), researchItems)}</div>
      <div class="research-strip">${renderResearchPreviewCards(featuredItems)}</div>
    </section>
  `;
}

function renderResearchIndexSection(config, items) {
  return `
    <section class="research-index-section" id="research-index">
      <div class="section-heading">
        <h2>${config.title}</h2>
        <p>${config.summary}</p>
      </div>
      <div class="research-index-shell">
        <div class="research-index__filters">
          <div class="index-filter-group">
            <p class="eyebrow">主题</p>
            <div class="tag-row">${renderResearchIndexFilters(config.filters)}</div>
          </div>
          <div class="index-filter-group">
            <p class="eyebrow">时段</p>
            <div class="tag-row">${renderResearchPeriodFilters(config.periods)}</div>
          </div>
          <div class="index-filter-group">
            <p class="eyebrow">来源</p>
            <div class="tag-row">${renderResearchSourceFilters(config.sources)}</div>
          </div>
          <label class="search-field">
            <span class="eyebrow">检索专题</span>
            <input type="search" placeholder="输入时代、机构或工艺关键词" data-research-search>
          </label>
        </div>
        <div class="filter-status" hidden data-research-status></div>
        <div class="reading-grid">${renderResearchIndexCards(items)}</div>
        <article class="research-card empty-state" hidden data-research-empty>
          <h3>${config.emptyTitle ?? "当前条件下没有匹配专题"}</h3>
          <p>${config.emptyHint ?? "可先清空条件，再从餐具、景德镇或工艺主题重新进入。"}</p>
        </article>
      </div>
    </section>
  `;
}

function renderCategoryPanelButtons(panels) {
  return panels
    .map(([label], index) => {
      const selected = index === 0 ? "true" : "false";
      return `<button class="tab-button" data-tab-target="panel-${index}" data-category-filter-label="${label}" aria-selected="${selected}">${label}</button>`;
    })
    .join("");
}

function renderCategoryPanelArticles(panels) {
  return panels
    .map(([label, title, text], index) => {
      const hidden = index === 0 ? "" : " hidden";
      return `
        <article class="tab-panel"${hidden} data-tab-panel="panel-${index}">
          <p class="eyebrow">${label}</p>
          <h3>${title}</h3>
          <p>${text}</p>
        </article>
      `;
    })
    .join("");
}

function renderVaseClassificationBands(items) {
  return items
    .map(
      (item) =>
        renderEnrichedBriefCard({
          item,
          className: "path-card enriched-brief-card",
          defaultFacets: ["用途"],
          showEyebrow: true
        })
    )
    .join("");
}

function renderBriefPointList(points) {
  if (!points?.length) return "";

  return `
    <ul class="inline-detail__facts enriched-brief-card__facts">
      ${points.map((point) => `<li>${point}</li>`).join("")}
    </ul>
  `;
}

// 分类页短说明卡统一读取 meta 与 points，让五类页面都有“字段 + 要点”的细读层。
function renderEnrichedBriefCard({ item, className, defaultFacets, showEyebrow = false }) {
  const facetText = getCategoryFacetText(defaultFacets, item.eyebrow, item.title, item.text, item.points?.join(" "));

  return `
    <article class="${className}" data-category-filter-target data-category-facets="${facetText}">
      ${showEyebrow && item.eyebrow ? `<p class="eyebrow">${item.eyebrow}</p>` : ""}
      <h3>${item.title}</h3>
      <p>${item.text}</p>
      ${renderInlineDetailMeta(item.meta)}
      ${renderBriefPointList(item.points)}
    </article>
  `;
}

function renderVaseTypologyCards(items) {
  return items
    .map(
      ({ name, alias, period, profile, use, focus, source }) => `
        <article class="research-card typology-card" data-category-filter-target data-category-facets="${getCategoryFacetText(["器形"], name, alias, profile, use, focus)}">
          <div>
            <p class="eyebrow">${period}</p>
            <h3>${name}</h3>
          </div>
          <div class="typology-card__body">
            <p>${profile}</p>
            <p><strong>阅读重点</strong>：${focus}。这件器物适合从“${use}”进入，再把口沿、腹深、画面和成组关系一起读。</p>
          </div>
          <div class="detail-panel__meta detail-panel__meta--stack">
            <div class="detail-meta-chip"><span>别名</span><strong>${alias}</strong></div>
            <div class="detail-meta-chip"><span>用途</span><strong>${use}</strong></div>
            <div class="detail-meta-chip"><span>主看点</span><strong>${focus}</strong></div>
            <div class="detail-meta-chip"><span>来源</span><strong>${source}</strong></div>
          </div>
        </article>
      `
    )
    .join("");
}

function renderVaseCurationNotes(items) {
  return items
    .map(
      (item) =>
        renderEnrichedBriefCard({
          item,
          className: "research-fact-card enriched-brief-card",
          defaultFacets: ["纹样", "意境"]
        })
    )
    .join("");
}

function renderCollectionHighlights(items) {
  return items
    .map(
      ({ title, museum, period, dimension, note, href, sourceName, imagePath }) => `
        <article class="research-card collection-card" data-category-filter-target data-category-facets="${getCategoryFacetText(["器形", "纹样"], title, period, dimension, note, sourceName)}">
          ${imagePath ? `<img src="${imagePath}" alt="${title}">` : ""}
          <div>
            <p class="eyebrow">${museum}</p>
            <h3>${title}</h3>
          </div>
          <div class="collection-card__body">
            <p>${note}</p>
            <p><strong>细看</strong>：${period} 的样本可用于对照 ${dimension} 这一尺度线索，并回看 ${sourceName} 的对象记录。</p>
          </div>
          <div class="detail-panel__meta detail-panel__meta--stack">
            <div class="detail-meta-chip"><span>时代</span><strong>${period}</strong></div>
            <div class="detail-meta-chip"><span>尺寸</span><strong>${dimension}</strong></div>
          </div>
          <div class="research-card__meta">
            <a class="link-button" href="${href}" target="_blank" rel="noreferrer">打开馆藏页</a>
            <span class="source-note">${sourceName}</span>
          </div>
        </article>
      `
    )
    .join("");
}

function getCategoryCollectionHighlights(category) {
  const existing = category.collectionHighlights ?? [];
  const seen = new Set(existing.map((item) => item.title));
  const detailItems = (category.detailDeck?.items ?? [])
    .filter((item) => !seen.has(item.title))
    .map((item) => ({
      title: item.title,
      museum: item.detailMeta?.find(([label]) => label.includes("来源") || label.includes("出处"))?.[1] ?? item.sourceLinks?.[0]?.label ?? "馆藏样本",
      period: item.metrics?.find(([label]) => label.includes("时期") || label.includes("时代"))?.[1] ?? item.eyebrow,
      dimension: item.metrics?.find(([label]) => label.includes("尺寸") || label.includes("宽度") || label.includes("器高"))?.[1] ?? item.metrics?.[0]?.[1] ?? "见对象页",
      note: item.detailBody ?? item.summary,
      href: item.sourceLinks?.[0]?.url ?? "#",
      sourceName: item.sourceLinks?.[0]?.label ?? "馆藏页",
      imagePath: item.imagePath
    }));

  return [...existing, ...detailItems].slice(0, Math.max(6, existing.length));
}

function renderResearchLedger(items) {
  return `
    <div class="ledger-list">
      ${items
        .map(
          ({ title, type, focus, value, href }) => `
            <article class="ledger-row reference-card" data-category-filter-target data-category-facets="${getCategoryFacetText(["用途", "器形", "纹样", "意境"], title, type, focus, value)}">
              <div>
                <p class="eyebrow">${type}</p>
                <h3>${title}</h3>
              </div>
              <p>${focus}</p>
              <p class="reference-card__insight">${value}。这条资料用于把页面中的器型说明、尺寸信息和使用场景接回具体出处。</p>
              <a class="link-button" href="${href}" target="_blank" rel="noreferrer">查看来源</a>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderTablewareRoster(items) {
  return `
    <div class="tableware-roster collection-list">
      ${items
        .map(
          ({ title, period, profile, use, sourceName, sourceUrl }) => `
            <article class="ledger-row tableware-roster-card" data-category-filter-target data-category-facets="${getCategoryFacetText(["用途", "器形", "传播"], title, period, profile, use, sourceName)}">
              <div>
                <p class="eyebrow">${period}</p>
                <h3>${title}</h3>
              </div>
              <div class="tableware-roster-card__body">
                <p>${profile}</p>
                <p><strong>主要看点</strong>：${use} 阅读时先确认桌面位置，再看口径、腹深、边饰和中心题景如何共同组织一套餐具。</p>
              </div>
              <div class="detail-panel__meta detail-panel__meta--stack">
                <div class="detail-meta-chip"><span>时期</span><strong>${period}</strong></div>
                <div class="detail-meta-chip"><span>出处</span><strong>${sourceName}</strong></div>
              </div>
              <a class="link-button" href="${sourceUrl}" target="_blank" rel="noreferrer">${sourceName}</a>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderTablewareJudgements(items) {
  return items
    .map(
      (item) =>
        renderEnrichedBriefCard({
          item,
          className: "research-fact-card enriched-brief-card",
          defaultFacets: ["用途", "器形", "纹样", "传播"]
        })
    )
    .join("");
}

function renderInlineDetailMeta(items) {
  if (!items?.length) return "";

  return `
    <div class="inline-detail__meta">
      ${items
        .map(
          ([label, value]) => `
            <div class="detail-meta-chip">
              <span>${label}</span>
              <strong>${value}</strong>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function renderInlineDetailCards(items) {
  return `
    <div class="reading-grid" data-inline-detail-root>
      ${items
        .map(
          (item, index) => `
            <article class="research-card inline-detail" data-category-filter-target data-category-facets="${getCategoryFacetText(["器形", "纹样", "意境"], item.eyebrow, item.title, item.summary, item.detailFacts?.join(" "))}">
              ${item.imagePath ? `<img src="${item.imagePath}" alt="${item.title}">` : ""}
              <div class="inline-detail__copy">
                <div>
                  <p class="eyebrow">${item.eyebrow ?? item.sourceName}</p>
                  <h3>${item.title}</h3>
                </div>
                <div class="inline-detail__summary">
                  <p>${item.summary}</p>
                  <p><strong>细看</strong>：${item.detailFacts?.[0] ?? item.detailMeta?.[0]?.[1] ?? "从器形、图像与出处一起进入这件对象。"} 这件对象可作为同类器物的近身参照。</p>
                </div>
                <button class="inline-detail__trigger" type="button" data-inline-detail-trigger="${item.id}" aria-expanded="${index === 0 ? "true" : "false"}">
                  ${index === 0 ? "收起细节" : "展开细节"}
                </button>
                <div class="inline-detail__panel" data-inline-detail-panel="${item.id}"${index === 0 ? "" : " hidden"}>
                  ${renderInlineDetailMeta(item.detailMeta)}
                  <ul class="inline-detail__facts">
                    ${item.detailFacts.map((fact) => `<li>${fact}</li>`).join("")}
                  </ul>
                  <div class="inline-detail__meta inline-detail__meta--source">
                    <div class="detail-meta-chip">
                      <span>来源机构</span>
                      <strong>${item.sourceName}</strong>
                    </div>
                  </div>
                  <div class="hero-actions hero-actions--compact">
                    <a class="link-button" href="${item.sourceUrl}" target="_blank" rel="noreferrer">打开来源</a>
                  </div>
                </div>
              </div>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderCollectionList(items) {
  return `
    <div class="collection-list" data-inline-detail-root>
      ${items
        .map(
          (item, index) => `
            <article class="collection-list__item inline-detail" data-category-filter-target data-category-facets="${getCategoryFacetText(["器形", "纹样", "意境"], item.eyebrow, item.title, item.summary, item.detailFacts?.join(" "))}">
              ${item.imagePath ? `<img src="${item.imagePath}" alt="${item.title}">` : ""}
              <div>
                <p class="eyebrow">${item.eyebrow ?? item.sourceName}</p>
                <h3>${item.title}</h3>
              </div>
              <div class="collection-list__body">
                <p>${item.summary}</p>
                <p><strong>细看</strong>：${item.detailFacts?.[0] ?? item.detailMeta?.[0]?.[1] ?? "从对象信息进入展陈语境。"} 外层先给出核心阅读线索，展开后再查看尺寸、材料与出处。</p>
              </div>
              <button class="inline-detail__trigger" type="button" data-inline-detail-trigger="${item.id}" aria-expanded="${index === 0 ? "true" : "false"}">
                ${index === 0 ? "收起细节" : "展开细节"}
              </button>
              <div class="inline-detail__panel" data-inline-detail-panel="${item.id}"${index === 0 ? "" : " hidden"}>
                ${renderInlineDetailMeta(item.detailMeta)}
                <ul class="inline-detail__facts">
                  ${item.detailFacts.map((fact) => `<li>${fact}</li>`).join("")}
                </ul>
                <div class="inline-detail__meta inline-detail__meta--source">
                  <div class="detail-meta-chip">
                    <span>来源机构</span>
                    <strong>${item.sourceName}</strong>
                  </div>
                </div>
                <div class="hero-actions hero-actions--compact">
                  <a class="link-button" href="${item.sourceUrl}" target="_blank" rel="noreferrer">查看来源</a>
                </div>
              </div>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderViewingAxes(items) {
  return items
    .map(
      (item) =>
        renderEnrichedBriefCard({
          item,
          className: "path-card enriched-brief-card",
          defaultFacets: ["用途", "器形", "纹样", "意境"]
        })
    )
    .join("");
}

function renderSourceInstitutions(items) {
  return `
    <div class="institution-grid">
      ${items
        .map(
          ({ title, summary, href }) => `
            <article class="network-panel institution-card" data-category-filter-target data-category-facets="${getCategoryFacetText(["传播", "意境"], title, summary)}">
              <p class="eyebrow">来源机构</p>
              <h3>${title}</h3>
              <p>${summary}</p>
              <div class="hero-actions hero-actions--compact">
                <a class="link-button" href="${href}" target="_blank" rel="noreferrer">打开来源</a>
              </div>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderLedgerRows(items) {
  return items
    .map(
      (item, index) => `
        <button class="ledger-row${index === 0 ? " is-active" : ""}" type="button"
          data-ledger-id="${item.id}" aria-selected="${index === 0 ? "true" : "false"}">
          <div class="ledger-row__head">
            <h3>${item.title}</h3>
            ${item.era ? `<span class="ledger-row__era">${item.era}</span>` : ""}
          </div>
          <p>${item.keyJudgment ?? item.summary}</p>
          ${item.relatedSections?.length
            ? `<div class="ledger-row__tags">${item.relatedSections
                .map((s) => `<span class="tag-chip">${s}</span>`)
                .join("")}</div>`
            : ""}
        </button>
      `
    )
    .join("");
}

export function renderLedgerDetail(item) {
  if (!item) return `<div class="detail-card detail-card--ledger"><p>请从左侧台账中选择一项查看详情。</p></div>`;
  return `
    <div class="detail-card detail-card--ledger">
      ${item.imagePath ? `<img class="detail-card__image" src="${item.imagePath}" alt="${item.title}" loading="lazy">` : ""}
      <div class="detail-card__copy">
        <p class="eyebrow">${item.eyebrow}</p>
        <h2>${item.detailTitle ?? item.title}</h2>
        <p>${item.detailBody ?? item.summary}</p>
        ${item.detailBullets?.length
          ? `<ul class="detail-card__facts">${item.detailBullets.map((b) => `<li>${b}</li>`).join("")}</ul>`
          : ""}
      </div>
      <div class="detail-card__meta">
        ${(item.detailMeta ?? [])
          .map(
            ([dt, dd]) => `
              <div><dt>${dt}</dt><dd>${dd}</dd></div>
            `
          )
          .join("")}
      </div>
      ${item.sourceLinks?.length
        ? `<div class="hero-actions hero-actions--compact">
            ${item.sourceLinks.map((l) => `<a class="link-button" href="${l.url}" target="_blank" rel="noreferrer">${l.label}</a>`).join("")}
          </div>`
        : ""}
    </div>
  `;
}

function renderResearchTabsNav(dimensions, activeId) {
  return dimensions
    .map(
      (d) =>
        `<button class="research-tabs__tab" type="button" data-research-tab="${d.id}" aria-selected="${d.id === activeId ? "true" : "false"}">${d.label}</button>`
    )
    .join("");
}

function renderResearchTabsPanels(dimensions, activeId) {
  return dimensions
    .map((d) => {
      const isActive = d.id === activeId;
      let content = "";
      switch (d.id) {
        case "network":
          content = d.panels?.length
            ? `<div class="institution-grid">${d.panels
                .map(
                  (p) => `
              <article class="network-panel institution-card">
                <p class="eyebrow">${p.eyebrow}</p>
                <h3>${p.title}</h3>
                <p>${p.summary}</p>
              </article>`
                )
                .join("")}</div>`
            : "";
          break;
        case "timeline":
          content =
            (d.timelineNodes?.length ? `<div class="timeline-grid">${renderTimeline(d.timelineNodes)}</div>` : "") +
            (d.jingdezhenPanel ? renderJingdezhenPanel(d.jingdezhenPanel) : "");
          break;
        case "glossary":
          content = d.terms?.length
            ? `<div class="reading-grid">${renderGlossaryDetailCards(d.terms)}</div>`
            : "";
          break;
        case "process":
          content = d.steps?.length
            ? `<div class="process-layout"><div class="process-steps">${renderProcessSteps(d.steps)}</div><div class="process-panels">${renderProcessPanels(d.steps)}</div></div>`
            : "";
          break;
      }
      return `<div class="research-tabs__panel" data-research-panel="${d.id}"${isActive ? "" : " hidden"}>${content}</div>`;
    })
    .join("");
}

function renderEraAnnotationMarkers(items) {
  return items
    .map(function(item, index) {
      var selected = index === 0 ? ' aria-selected="true"' : ' aria-selected="false"';
      return '\
        <button class="era-annotation-marker" type="button" data-annotation-trigger="' + item.id + '"' + selected + ' style="--marker-x:' + item.x + '%; --marker-y:' + item.y + '%;">\
          <span class="era-annotation-marker__pin"></span>\
          <span class="era-annotation-marker__label">' + item.label + '</span>\
        </button>\
      ';
    })
    .join("");
}

function renderEraAnnotationPanels(items) {
  return items
    .map(function(item, index) {
      return '\
        <article class="era-annotation-panel" data-annotation-panel="' + item.id + '"' + (index === 0 ? "" : " hidden") + '>\
          <strong>' + item.title + '</strong>\
          <span>' + item.summary + '</span>\
          <span>' + item.detail + '</span>\
        </article>\
      ';
    })
    .join("");
}

// 朝代图片承载胎、釉、青料、纹样、窑火热点，用户点击后只切换当前图片内的工艺说明。
function renderEraAnnotations(items, annotationId) {
  if (!items?.length) return "";

  return '\
    <div class="era-visual__annotations" data-annotation-root="' + annotationId + '">\
      ' + renderEraAnnotationMarkers(items) + '\
      <div class="era-annotation-panels">\
        ' + renderEraAnnotationPanels(items) + '\
      </div>\
    </div>\
  ';
}

function getEraNodePanelId(eraId, node) {
  return eraId + "-node-" + node.id;
}

function renderEraNodeFacts(facts) {
  // 时间线节点的判断点以列表呈现，帮助用户从摘要继续读到可操作的鉴赏依据。
  if (!facts?.length) return "";

  return '\
    <ul class="era-node-panel__facts">\
      ' + facts.map(function(fact) { return '<li>' + fact + '</li>'; }).join("") + '\
    </ul>\
  ';
}

function renderEraSubNavItems(era, eraId) {
  // 段内子导航按钮绑定到唯一节点面板，点击后切换当前朝代内的具体叙事节点。
  return (era.nodes || []).map(function(node, index) {
    var panelId = getEraNodePanelId(eraId, node);
    var current = index === 0 ? ' aria-current="true"' : "";
    return '\
      <button class="era-subnav__item" type="button" data-era-subnav-target="' + eraId + '" data-era-node-target="' + panelId + '" aria-controls="' + panelId + '"' + current + ' title="' + node.title + '">\
        ' + node.title + '\
      </button>\
    ';
  }).join("");
}

function renderEraNodePanels(era, eraId) {
  var nodes = era.nodes || [];
  if (!nodes.length) return "";

  // 子节点面板承载每个时间线节点的独立说明，让段内按钮点击后在当前视口产生明确反馈。
  return '\
    <div class="era-node-panels" data-era-node-root="' + eraId + '">\
      ' + nodes.map(function(node, index) {
        var panelId = getEraNodePanelId(eraId, node);
        var activeClass = index === 0 ? " is-active" : "";
        return '\
          <article class="era-node-panel' + activeClass + '" id="' + panelId + '" data-era-node-panel="' + panelId + '"' + (index === 0 ? "" : " hidden") + '>\
            <span class="era-node-panel__era">' + node.era + '</span>\
            <h3>' + node.title + '</h3>\
            <p>' + node.summary + '</p>\
            ' + (node.detail ? '<p class="era-node-panel__detail">' + node.detail + '</p>' : "") + '\
            ' + renderEraNodeFacts(node.facts) + '\
          </article>\
        ';
      }).join("") + '\
    </div>\
  ';
}

function getEraExplorerPanelId(explorerId, panel) {
  return explorerId + "-" + panel;
}

function renderEraCategoryLinks(entries) {
  return entries
    .map(function(entry) {
      return '<a class="link-button link-button--outline" href="' + entry.href + '" target="_blank">' + entry.name + '</a>';
    })
    .join("");
}

function renderEraExplorerTabs(explorerId) {
  var tabs = [
    ["nodes", "\u8282\u70b9\u8109\u7edc"],
    ["process", "\u5de5\u827a\u5224\u65ad"],
    ["glossary", "\u672f\u8bed"],
    ["categories", "\u53bb\u770b\u5206\u7c7b"]
  ];

  // 探索面板用固定四个维度组织信息，用户不需要离开当前朝代段落就能切换阅读视角。
  return tabs.map(function(tab, index) {
    var panelId = getEraExplorerPanelId(explorerId, tab[0]);
    return '\
      <button class="era-explorer__tab" type="button" data-era-explorer-tab="' + panelId + '" aria-controls="' + panelId + '" aria-selected="' + (index === 0 ? "true" : "false") + '">\
        ' + tab[1] + '\
      </button>\
    ';
  }).join("");
}

function renderEraExplorerNodes(nodes) {
  if (!nodes?.length) return '<p class="era-explorer__empty">\u6682\u65e0\u72ec\u7acb\u8282\u70b9\u3002</p>';

  return '\
    <div class="era-explorer__node-list">\
      ' + nodes.map(function(node, index) {
        return '\
          <article class="era-explorer__node">\
            <span>' + String(index + 1).padStart(2, "0") + '</span>\
            <div>\
              <strong>' + node.title + '</strong>\
              <p>' + node.summary + '</p>\
              ' + (node.detail ? '<small>' + node.detail + '</small>' : "") + '\
            </div>\
          </article>\
        ';
      }).join("") + '\
    </div>\
  ';
}

function renderEraExplorerProcess(processSteps) {
  if (!processSteps.length) return '<p class="era-explorer__empty">\u6682\u65e0\u5de5\u827a\u5224\u65ad\u3002</p>';

  return '\
    <ol class="era-explorer__judgement-list">\
      ' + processSteps.map(function(step) { return '<li>' + step + '</li>'; }).join("") + '\
    </ol>\
  ';
}

function renderEraExplorerGlossary(eraGlossary) {
  if (!eraGlossary.length) return '<p class="era-explorer__empty">\u6682\u65e0\u76f8\u5173\u672f\u8bed\u3002</p>';

  return '\
    <div class="era-explorer__term-grid">\
      ' + eraGlossary.map(function(g) {
        return '<article><strong>' + g.title + '</strong><p>' + g.summary + '</p></article>';
      }).join("") + '\
    </div>\
  ';
}

function renderEraExplorerCategories(entries) {
  if (!entries.length) return '<p class="era-explorer__empty">\u6682\u65e0\u5173\u8054\u5206\u7c7b\u3002</p>';

  return '\
    <div class="era-explorer__category-grid">\
      ' + entries.map(function(entry) {
        return '<a class="era-explorer__category" href="' + entry.href + '" target="_blank"><span>\u8fdb\u5165</span><strong>' + entry.name + '</strong></a>';
      }).join("") + '\
    </div>\
  ';
}

function renderEraExplorer(era, eraId, eraGlossary, processSteps, categoryEntries) {
  var explorerId = eraId + "-explorer";
  var panels = [
    ["nodes", renderEraExplorerNodes(era.nodes || [])],
    ["process", renderEraExplorerProcess(processSteps)],
    ["glossary", renderEraExplorerGlossary(eraGlossary)],
    ["categories", renderEraExplorerCategories(categoryEntries)]
  ];

  return '\
    <div class="era-explorer" id="' + explorerId + '" data-era-explorer="' + explorerId + '" role="dialog" aria-modal="false" aria-labelledby="' + explorerId + '-title" tabindex="-1" hidden>\
      <div class="era-explorer__surface">\
        <header class="era-explorer__header">\
          <div>\
            <p class="eyebrow">' + era.eraLabel + ' &middot; ' + era.eraPeriod + '</p>\
            <h3 id="' + explorerId + '-title">' + era.title + '</h3>\
          </div>\
          <button class="era-explorer__close" type="button" data-era-explorer-close aria-label="\u5173\u95ed\u63a2\u7d22">\u5173\u95ed</button>\
        </header>\
        <p class="era-explorer__lead">' + (era.detail || era.summary) + '</p>\
        <nav class="era-explorer__tabs" aria-label="' + era.eraLabel + '\u63a2\u7d22\u7ef4\u5ea6">\
          ' + renderEraExplorerTabs(explorerId) + '\
        </nav>\
        <div class="era-explorer__panels">\
          ' + panels.map(function(panel, index) {
            var panelId = getEraExplorerPanelId(explorerId, panel[0]);
            return '<article class="era-explorer__panel" id="' + panelId + '" data-era-explorer-panel="' + panelId + '"' + (index === 0 ? "" : " hidden") + '>' + panel[1] + '</article>';
          }).join("") + '\
        </div>\
      </div>\
    </div>\
  ';
}


function renderEraSection(era, index, home, categories, glossary) {
  const eraId = "era-" + era.eraSlug;
  const annotationItems = home.annotationDiagram?.items || [];

  // 朝代拼音用于生成独立朝代器物页链接，确保首页按钮能进入对应子分类页面。
  var eraPinyinMap = { "\u5510": "tang", "\u5b8b": "song", "\u5143": "yuan", "\u660e": "ming", "\u6e05": "qing" };
  var eraPinyin = eraPinyinMap[era.eraSlug] || "";

  // 术语按相关研究 ID 汇入当前朝代，避免把所有术语一次性塞进每个朝代段落。
  const eraGlossary = (glossary || []).filter(function(g) {
    var relatedIds = g.relatedResearchIds || [];
    return (era.relatedResearchIds || []).some(function(rid) { return relatedIds.indexOf(rid) !== -1; });
  });

  var glossaryCards = eraGlossary.slice(0, 3).map(function(g) {
    return '<article class="glossary-chip"><h4>' + g.title + '</h4><p>' + g.summary + '</p></article>';
  }).join("");

  var categoryEntries = (era.relatedCategories || [])
    .map(function(slug) {
      var cat = (categories || []).find(function(c) { return c.slug === slug; });
      if (!cat) return null;
      // 首页朝代段落的器类入口进入独立朝代页，而不是回到总分类页。
      var href = eraPinyin ? eraPinyin + "-" + cat.slug + ".html" : cat.slug + ".html";
      return { href: href, name: cat.name };
    })
    .filter(Boolean);

  var processSteps = era.processSteps || [];
  var subNavItems = renderEraSubNavItems(era, eraId);
  var nodePanels = renderEraNodePanels(era, eraId);
  var explorerId = eraId + "-explorer";
  var categoryLinks = renderEraCategoryLinks(categoryEntries);

  return '\
    <section class="era-section" id="' + eraId + '" data-era="' + era.eraSlug + '">\
      <div class="era-layout">\
        <div class="era-visual">\
          ' + (era.imagePath ? '<img src="' + era.imagePath + '" alt="' + era.eraLabel + '">' : '<div class="era-visual__placeholder"><span>' + era.eraLabel + '</span></div>') + '\
          ' + (era.imagePath ? renderEraAnnotations(annotationItems, eraId) : "") + '\
        </div>\
        <div class="era-text">\
          <p class="eyebrow">' + era.eraLabel + ' &middot; ' + era.eraPeriod + '</p>\
          <h2>' + era.title + '</h2>\
          <p>' + era.summary + '</p>\
          ' + (subNavItems ? '\
            <nav class="era-subnav" aria-label="' + era.eraLabel + '\u5b50\u8282\u70b9">\
              ' + subNavItems + '\
            </nav>\n          ' : "") + '\
          ' + nodePanels + '\
          ' + (processSteps.length ? '\
            <div class="era-highlights">\
              <h4>工艺要点</h4>\
              <ul class="era-process-list">\
                ' + processSteps.map(function(s) { return '<li>' + s + '</li>'; }).join("") + '\
              </ul>\n            </div>\n          ' : "") + '\
          ' + (eraGlossary.length ? '\
            <div class="era-highlights">\
              <h4>关键术语</h4>\
              <div class="era-glossary-chips">' + glossaryCards + '</div>\n            </div>\n          ' : "") + '\
          <div class="era-actions">\n            <button class="link-button era-explore-trigger" type="button" data-explore="' + explorerId + '" aria-controls="' + explorerId + '" aria-expanded="false">深入探索</button>\n            ' + categoryLinks + '\n          </div>\n        </div>\n      </div>\n      ' + renderEraExplorer(era, eraId, eraGlossary, processSteps, categoryEntries) + '\n    </section>\n  ';
}

function renderEraNav(eras) {
  return '\
    <nav class="era-nav" data-era-nav aria-label="\u671d\u4ee3\u5bfc\u822a">\
      <ul class="era-nav__list">\
        ' + eras
          .map(function(era, index) {
            return '\
              <li class="era-nav__item" data-era-item="' + era.eraSlug + '">\
                <button class="era-nav__dot" type="button" data-era-target="era-' + era.eraSlug + '" aria-label="' + era.eraLabel + '">\
                  <span class="era-nav__label">' + (era.eraShortLabel || era.eraLabel) + '</span>\
                </button>\
              </li>\
            ';
          })
          .join("") + '\
      </ul>\
    </nav>\
  ';
}

function renderFooterInstitutions(institutionSignals) {
  if (!institutionSignals || !institutionSignals.length) return "";
  return '\
    <section class="institution-signals-section">\
      <div class="section-heading">\
        <h2>馆藏来源</h2>\
        <p>本站引用的公开馆藏与研究机构。</p>\
      </div>\
      <div class="institution-signals-strip">\
        ' + institutionSignals
          .map(function(s) {
            return '\
              <a class="institution-signal-card" href="' + s.href + '" target="_blank" rel="noreferrer">\
                <p class="eyebrow">' + s.eyebrow + '</p>\
                <h3>' + s.title + '</h3>\
                <p>' + s.summary + '</p>\
                <span class="institution-signal-stat">' + s.stat + '</span>\
              </a>\
            ';
          })
          .join("") + '\
      </div>\
    </section>\
  ';
}

function buildEraCategorySlugsFromNavigation(navigation, categories) {
  // 首页朝代器类入口以导航子页为准，避免时间线节点的语义标签和真实页面数量不一致。
  var categorySlugs = (categories || []).map(function(category) { return category.slug; });
  var eraMap = { "\u5510": [], "\u5b8b": [], "\u5143": [], "\u660e": [], "\u6e05": [] };

  (navigation || []).forEach(function(item) {
    if (categorySlugs.indexOf(item.slug) === -1 || !item.children?.length) return;

    item.children.forEach(function(child) {
      var eraLabel = child.label;
      if (!eraMap[eraLabel]) return;
      if (eraMap[eraLabel].indexOf(item.slug) === -1) eraMap[eraLabel].push(item.slug);
    });
  });

  return eraMap;
}

function buildTimelineEras(timeline, glossary, process, navigation, categories) {
  // 将具体时间线节点归并为五个首页朝代段落，归并结果决定滚动叙事的显示顺序。
  var eraOrder = ["唐", "宋", "元", "明", "清"];
  var navigationEraCategories = buildEraCategorySlugsFromNavigation(navigation, categories);

  var eraGroups = {};
  eraOrder.forEach(function(e) { eraGroups[e] = []; });

  (timeline || []).forEach(function(node) {
    var era = node.era || "";
    if (era === "唐代") eraGroups["唐"].push(node);
    else if (era === "宋元" || era === "宋代") eraGroups["宋"].push(node);
    else if (era === "元代") eraGroups["元"].push(node);
    else if (era === "永乐" || era === "宣德" || era === "明代" || era === "晚明" || era === "景德镇") eraGroups["明"].push(node);
    else if (era === "清代" || era === "海贸") eraGroups["清"].push(node);
    else eraGroups["清"].push(node);
  });

  // 只输出有内容的朝代段落，避免空段落进入朝代导航和滚动高亮状态。
  return eraOrder
    .filter(function(eraKey) { return eraGroups[eraKey].length > 0; })
    .map(function(eraKey, index) {
      var nodes = eraGroups[eraKey];
      var firstNode = nodes[0];
      var eraSlug = eraKey;

      var relatedResearchIds = [];
      var relatedCategories = navigationEraCategories[eraKey] || [];
      nodes.forEach(function(n) {
        if (n.researchId) relatedResearchIds.push(n.researchId);
      });

      var processSteps = (process || []).slice(0, 4).map(function(p) { return p[0] + "\uff1a" + p[1]; });

      var periodMap = {
        "唐": "618\u2013907",
        "宋": "960\u20131279",
        "元": "1271\u20131368",
        "明": "1368\u20131644",
        "清": "1644\u20131912"
      };

      return {
        eraSlug: eraSlug,
        eraLabel: eraKey + "\u4ee3",
        eraShortLabel: eraKey,
        eraPeriod: periodMap[eraKey] || "",
        title: nodes.length === 1 ? firstNode.title : eraKey + "\u4ee3\u9752\u82b1\u74f7",
        summary: nodes.map(function(n) { return n.summary; }).join(" "),
        detail: nodes.map(function(n) { return n.detail; }).filter(Boolean).join(" "),
        imagePath: firstNode.imagePath || "",
        relatedResearchIds: relatedResearchIds,
        relatedCategories: relatedCategories,
        processSteps: processSteps,
        nodes: nodes
      };
    });
}

export function renderHome(home, categories, researchItems, navigation) {
  var glossary = home.glossary || [];
  var process = home.process || [];
  var timelineEras = buildTimelineEras(home.timeline || [], glossary, process, navigation, categories);

  // Store eras on home for other functions to use
  home.timelineEras = timelineEras;

  var eraSections = timelineEras
    .map(function(era, index) { return renderEraSection(era, index, home, categories, glossary); })
    .join("");

  var eraNav = renderEraNav(timelineEras);

  return '\
    <section class="hero-section hero-section--particle">\
      <div class="particle-hero" data-particle-hero></div>\
      <div class="hero-overlay">\
        <div class="hero-verse">\
          <p class="hero-verse__text">淮左名都，竹西佳处，<br>解鞍少驻初程。<br>过春风十里，<br>尽荠麦青青。<br>自胡马窥江去后，<br>废池乔木，犹厌言兵。<br>渐黄昏，清角吹寒，<br>都在空城。<br>杜郎俊赏，算而今，<br>重到须惊。<br>纵豆蔻词工，<br>青楼梦好，难赋深情。<br>二十四桥仍在，波心荡，<br>冷月无声。<br>念桥边红药，<br>年年知为谁生。</p>\
          <p class="hero-verse__attr">— 宋 · 姜夔《扬州慢》</p>\
        </div>\
      </div>\
    </section>\
    <div class="era-bg-layer era-bg-layer--tang" data-era-bg="\u5510"></div>\
    <div class="era-bg-layer era-bg-layer--song" data-era-bg="\u5b8b"></div>\
    <div class="era-bg-layer era-bg-layer--yuan" data-era-bg="\u5143"></div>\
    <div class="era-bg-layer era-bg-layer--ming" data-era-bg="\u660e"></div>\
    <div class="era-bg-layer era-bg-layer--qing" data-era-bg="\u6e05"></div>\
    ' + eraNav + '\
    <main class="era-main" data-era-main>\
      ' + eraSections + '\
    </main>\
  ';
}

export function resolveResearchItem(id, items) {
  return items.find((item) => item.id === id) ?? null;
}

export function renderResearchDetailPage(id, content) {
  const item = resolveResearchItem(id, content.research.items);

  if (!item) {
    return cleanPublicCopy(`
      <section class="page-header">
        <div>
          <p class="eyebrow">research journal</p>
          <h1>研究专题</h1>
          <div class="hero-actions">
            <a class="hero-action" href="index.html#objects">回到器物导览</a>
            <a class="hero-action" href="index.html">返回首页</a>
          </div>
        </div>
      </section>
      <section class="reading-section">
        <div class="section-heading">
          <h2>专题导览</h2>
        </div>
        <div class="research-strip">${renderResearchPreviewCards(content.research.items.slice(0, 6))}</div>
      </section>
      <section class="reading-paths-section">
        <div class="section-heading">
          <h2>研究路径</h2>
          <p>如果没有具体专题编号，就从预设读法进入整站内容。</p>
        </div>
        <div class="reading-grid">${renderResearchPathCards(content.home.researchPaths, content.research.items)}</div>
      </section>
    `);
  }

  const relatedItems = content.research.items
    .filter((entry) => entry.id !== item.id && entry.tags.some((tag) => item.tags.includes(tag)))
    .slice(0, 3);

  return cleanPublicCopy(`
    <section class="page-header">
      <div>
        <p class="eyebrow">${item.era}</p>
        <h1>${item.title}</h1>
        <p>${item.lead}</p>
        ${renderResearchTagChips(item.tags)}
      </div>
      <img class="page-header__image" src="${item.imagePath}" alt="${item.title}">
    </section>
    ${renderSectionNav([
      ["#facts", "关键事实"],
      ["#essay", "专题展开"],
      ["#notes", "观察笔记"],
      ["#related", "相关器物"],
      ["#source", "来源"]
    ])}
    <section class="research-detail-grid" id="facts">
      <div class="section-heading">
        <h2>关键事实</h2>
        <p>${item.summary}</p>
      </div>
      <div class="research-facts-grid">${renderResearchFacts(item.keyFacts)}</div>
    </section>
    <section class="research-detail-grid" id="essay">
      <div class="section-heading">
        <h2>专题展开</h2>
        <p>把摘要展开成连续段落，补足专题页的阅读密度。</p>
      </div>
      <article class="essay-card">
        ${renderResearchEssay(item.essay)}
      </article>
    </section>
    <section class="research-detail-grid" id="notes">
      <div class="section-heading">
        <h2>观察笔记</h2>
        <p>从器型、工艺或视觉线索切进去，帮助用户把抽象结论落回具体观看动作。</p>
      </div>
      <div class="research-facts-grid">${renderObservationPoints(item.observationPoints)}</div>
    </section>
    <section class="research-detail-grid">
      <div class="section-heading">
        <h2>相关术语</h2>
        <p>用术语卡把工艺语言和当前专题重新对齐，避免阅读只停在结论层。</p>
      </div>
      <div class="reading-grid">${renderResearchGlossaryLinks(item.relatedGlossary, content.home.glossary)}</div>
    </section>
    <section class="research-detail-grid" id="related">
      <div class="section-heading">
        <h2>相关器物</h2>
        <p>从专题继续跳回器物分类，让历史、工艺和使用场景互相对照。</p>
      </div>
      <div class="hero-actions">${renderRelatedCategoryLinks(item.relatedCategories, content.categories)}</div>
    </section>
    <section class="reading-paths-section">
      <div class="section-heading">
        <h2>关联图谱</h2>
        <p>按主题、时段和来源体系把相关专题重新串起来，帮助用户横向扩展阅读。</p>
      </div>
      <div class="reading-grid">${renderTopicGraph(item, content.research.items)}</div>
    </section>
    <section class="reading-paths-section">
      <div class="section-heading">
        <h2>研究路径</h2>
        <p>如果你从单篇专题进入，这里给出继续扩展的成组读法。</p>
      </div>
      <div class="reading-grid">${renderMatchedResearchPaths(item.id, content.home.researchPaths, content.research.items)}</div>
    </section>
    <section class="reading-section">
      <div class="section-heading">
        <h2>延伸阅读</h2>
        <p>根据时代和标签选择下一条相关专题，保持阅读连续性。</p>
      </div>
      <div class="research-strip">${renderResearchPreviewCards(relatedItems)}</div>
    </section>
    <section class="research-detail-grid" id="source">
      <div class="section-heading">
        <h2>出处与参考</h2>
        <p>把参考机构、资料重点和原始链接并排展示，方便理解这条专题的可信度与使用边界。</p>
      </div>
      ${renderSourceArchive(item)}
    </section>
  `);
}

function renderCategorySections(category, contentSections, cards) {
  return [
    renderCategoryDirectory(category),
    ...contentSections.map(({ html }) => html),
    renderCategoryResearchModules(category),
    renderCategoryResearchSection(category, cards)
  ];
}

function renderStandardCategoryPage(category, researchItems) {
  const cards = getCategoryResearchCards(category, researchItems);
  return renderCategoryShell(category, renderCategorySections(category, [], cards));
}

// 茶具页与花器页共用同一条专题渲染分支，页内导航由 section 定义统一生成。
function renderStructuredCategoryPage(category, researchItems) {
  const cards = getCategoryResearchCards(category, researchItems);
  const headings = category.sectionHeadings;
  const contentSections = [
    {
      id: headings.typology.id,
      title: headings.typology.title,
      html: renderCategoryModule({
        id: headings.typology.id,
        title: headings.typology.title,
        summary: headings.typology.summary,
        className: "reading-paths-section",
        body: `
          <div class="reading-grid category-module-grid">${renderVaseClassificationBands(category.classificationBands)}</div>
          <div class="topic-typology-grid category-module-grid">${renderVaseTypologyCards(category.typologyList)}</div>
        `
      })
    },
    {
      id: headings.notes.id,
      title: headings.notes.title,
      html: renderCategoryModule({
        id: headings.notes.id,
        title: headings.notes.title,
        summary: headings.notes.summary,
        body: `<div class="research-facts-grid category-module-grid">${renderVaseCurationNotes(category.curationNotes)}</div>`
      })
    },
    {
      id: `${category.slug}-detail`,
      title: `${category.name}细览`,
      html: addCategoryModuleClass(renderDetailDeck(`${category.slug}-detail`, category.detailDeck))
    },
    {
      id: headings.collection.id,
      title: headings.collection.title,
      html: renderCategoryModule({
        id: headings.collection.id,
        title: headings.collection.title,
        summary: headings.collection.summary,
        body: `<div class="reading-grid category-module-grid">${renderCollectionHighlights(getCategoryCollectionHighlights(category))}</div>`
      })
    },
    {
      id: headings.ledger.id,
      title: headings.ledger.title,
      html: renderCategoryModule({
        id: headings.ledger.id,
        title: headings.ledger.title,
        summary: headings.ledger.summary,
        body: renderResearchLedger(category.researchLedger)
      })
    }
  ];

  return renderCategoryShell(category, renderCategorySections(category, contentSections, cards), createCategoryNavItems(category, contentSections));
}

function renderCoffeeCategoryPage(category, researchItems) {
  const cards = getCategoryResearchCards(category, researchItems);
  const contentSections = [
    {
      id: "coffee-systems",
      title: "冲煮系统",
      html: renderCategoryModule({
        id: "coffee-systems",
        title: "冲煮系统",
        summary: category.systemsSummary,
        body: `
          <div class="reading-grid category-module-grid">${renderVaseClassificationBands(category.classificationBands)}</div>
          <div class="coffee-system-grid category-module-grid">${renderCoffeeSystemCards(category.systemCards)}</div>
        `
      })
    },
    {
      id: "coffee-matrix",
      title: "参数矩阵",
      html: renderCategoryModule({
        id: "coffee-matrix",
        title: "参数矩阵",
        summary: category.matrixSummary,
        body: renderCoffeeProtocolLedger(category.protocolLedger)
      })
    },
    {
      id: "coffee-detail-deck",
      title: "冲煮细览",
      html: addCategoryModuleClass(renderDetailDeck("coffee-detail-deck", category.detailDeck))
    },
    {
      id: "coffee-history",
      title: "历史脉络",
      html: renderCategoryModule({
        id: "coffee-history",
        title: "历史脉络",
        summary: category.historySummary,
        body: `<div class="coffee-history-grid category-module-grid">${renderCoffeeHistoryCards(category.historyMoments)}</div>`
      })
    },
    {
      id: "coffee-ledger",
      title: "参考资料",
      html: renderCategoryModule({
        id: "coffee-ledger",
        title: "参考资料",
        summary: "这里列出咖啡具页使用的行业组织、品牌官方页面和博物馆对象页，让分类内容有清楚出处。",
        body: renderResearchLedger(category.researchLedger)
      })
    }
  ];

  return renderCategoryShell(category, renderCategorySections(category, contentSections, cards), createCategoryNavItems(category, contentSections));
}

function renderTablewareCategoryPage(category, researchItems) {
  const cards = getCategoryResearchCards(category, researchItems);
  const contentSections = [
    {
      id: "tableware-roster",
      title: "桌面谱系",
      html: renderCategoryModule({
        id: "tableware-roster",
        title: "桌面谱系",
        summary: category.rosterSummary,
        body: `
          <div class="reading-grid category-module-grid">${renderVaseClassificationBands(category.classificationBands)}</div>
          ${renderTablewareRoster(category.roster)}
        `
      })
    },
    {
      id: "tableware-inline-detail",
      title: "餐具细览",
      html: addCategoryModuleClass(renderDetailDeck("tableware-inline-detail", category.detailDeck))
    },
    {
      id: "tableware-collection",
      title: "馆藏样本",
      html: renderCategoryModule({
        id: "tableware-collection",
        title: "馆藏样本",
        summary: "选出适合餐具分类的对象页样本，用尺寸、版式和使用语境校正页面内容。",
        body: `<div class="reading-grid category-module-grid">${renderCollectionHighlights(getCategoryCollectionHighlights(category))}</div>`
      })
    },
    {
      id: "tableware-judgements",
      title: "阅读提示",
      html: renderCategoryModule({
        id: "tableware-judgements",
        title: "阅读提示",
        summary: "把对象页、贸易背景和桌面使用关系整理成可快速复核的阅读条目。",
        body: `<div class="research-facts-grid category-module-grid">${renderTablewareJudgements(category.judgementNotes)}</div>`
      })
    },
    {
      id: "tableware-ledger",
      title: "参考资料",
      html: renderCategoryModule({
        id: "tableware-ledger",
        title: "参考资料",
        summary: "这里列出餐具页使用的馆藏、研究文章与机构出处，让分类内容有清楚出处。",
        body: renderResearchLedger(category.researchLedger)
      })
    }
  ];

  return renderCategoryShell(category, renderCategorySections(category, contentSections, cards), createCategoryNavItems(category, contentSections));
}

function renderArtLedgerSection(category) {
  if (!category.researchLedger?.length) return null;

  return {
    id: "art-ledger",
    title: "参考资料",
    html: `
      <section class="reading-section category-module" id="art-ledger">
        <div class="section-heading">
          <h2>参考资料</h2>
          <p>把对象页、机构页面与通史文章统一列出，方便从策展阅读直接回到原文出处。</p>
        </div>
        ${renderResearchLedger(category.researchLedger)}
      </section>
    `
  };
}

function renderArtCategoryPage(category, researchItems) {
  const cards = getCategoryResearchCards(category, researchItems);
  const contentSections = [
    {
      id: "art-highlights",
      title: "重点馆藏",
      html: addCategoryModuleClass(
        renderFeaturedRecordSection(
          "重点馆藏",
          category.curatorialIntro[0],
          getFeaturedRecords(category.collectionHighlights, category.detailDeck?.items),
          "art-highlights"
        )
      )
    },
    {
      id: "art-list",
      title: "策展列表",
      html: renderCategoryModule({
        id: "art-list",
        title: "策展列表",
        summary: category.curatorialIntro[1],
        body: renderCollectionList(category.collectionList)
      })
    },
    category.detailDeck
      ? {
          id: "art-detail-deck",
          title: "馆藏细览",
          html: addCategoryModuleClass(renderDetailDeck("art-detail-deck", category.detailDeck))
        }
      : null,
    {
      id: "art-axes",
      title: "观看路径",
      html: renderCategoryModule({
        id: "art-axes",
        title: "观看路径",
        summary: "艺术品页先给出观看对象的顺序，再进入使用场景和图像内容。",
        body: `<div class="reading-grid category-module-grid">${renderViewingAxes(category.viewingAxes)}</div>`
      })
    },
    {
      id: "art-sources",
      title: "参考机构",
      html: renderCategoryModule({
        id: "art-sources",
        title: "参考机构",
        summary: "重点馆藏之后继续展示参考机构，便于回看各馆藏页与研究文章的差异。",
        body: renderSourceInstitutions(category.sourceInstitutions)
      })
    },
    renderArtLedgerSection(category)
  ].filter(Boolean);

  return renderCategoryShell(category, renderCategorySections(category, contentSections, cards), createCategoryNavItems(category, contentSections));
}

function renderCategoryPage(category, researchItems) {
  if (category.slug === "coffee" && category.detailDeck) {
    return renderCoffeeCategoryPage(category, researchItems);
  }

  if (category.slug === "tableware" && category.detailDeck) {
    return renderTablewareCategoryPage(category, researchItems);
  }

  if (category.slug === "art" && category.collectionHighlights) {
    return renderArtCategoryPage(category, researchItems);
  }

  if (category.sectionHeadings && category.detailDeck && category.typologyList?.length) {
    return renderStructuredCategoryPage(category, researchItems);
  }

  return renderStandardCategoryPage(category, researchItems);
}

function renderAbout(about) {
  return `
    <section class="page-header">
      <div>
        <p class="eyebrow">about</p>
        <h1>${about.headerTitle}</h1>
        ${about.headerSummary ? `<p>${about.headerSummary}</p>` : ""}
      </div>
    </section>
    <section class="about-sections">
      ${about.sections
        .map(
          ([title, text], index) => `
            <details class="about-card"${index === 0 ? " open" : ""}>
              <summary>${title}</summary>
              <p>${text}</p>
            </details>
          `
        )
        .join("")}
    </section>
  `;
}

export function renderHeroActions(actions) {
  return actions.map(({ href, label }) => `<a class="hero-action" href="${href}">${label}</a>`).join("");
}

export function renderSiteNav(items, currentPage) {
  const renderChildren = (children) => {
    if (!children || !children.length) return "";
    return `<div class="site-nav__sub" hidden>${children
      .map(({ label, href }) => `<a class="site-nav__sublink" href="${href}" target="_blank">${label}</a>`)
      .join("")}</div>`;
  };

  return `
    <div class="site-brand">
      <img src="img/logo.png" alt="渔窑标识">
      <div>
        <p>渔窑手工青花</p>
        <span>fishing kiln</span>
      </div>
    </div>
    <div class="site-nav__links-wrap" data-nav-strip>
      <nav class="site-nav__links">
        ${items
          .map(
            ({ slug, label, href, children }) => {
              const hasChildren = children && children.length;
              const isActive = slug === currentPage;
              return `
              <div class="site-nav__group${isActive ? " is-active" : ""}">
                <div class="site-nav__row">
                  <a class="site-nav__link${isActive ? " is-active" : ""}" href="${href}">
                    ${label}
                  </a>
                  ${hasChildren ? `<button class="site-nav__toggle" type="button" aria-expanded="false" aria-label="展开${label}朝代"><span>▾</span></button>` : ''}
                </div>
                ${renderChildren(children)}
              </div>
            `;
            }
          )
          .join("")}
      </nav>
    </div>
  `;
}

export function renderPage(currentPage, content, researchId) {
  if (currentPage === "home") {
    return cleanPublicCopy(renderHome(content.home, content.categories, content.research.items, content.navigation));
  }

  if (currentPage === "research") {
    return renderResearchDetailPage(researchId, content);
  }

  const category = content.categories.find((item) => item.slug === currentPage);
  return category ? cleanPublicCopy(renderCategoryPage(category, content.research.items)) : "";
}
