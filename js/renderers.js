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

function renderCategoryCards(items) {
  return items
    .map(
      ({ href, name, intro, heroImage }) => `
        <a class="object-card" href="${href}">
          <img src="${heroImage}" alt="${name}">
          <div>
            <h3>${name}</h3>
            <p>${intro}</p>
          </div>
        </a>
      `
    )
    .join("");
}

function renderProcessSteps(items) {
  return items
    .map(
      ([title, text], index) => `
        <button class="process-step${index === 0 ? " is-active" : ""}" data-step-index="${index}">
          <span>${title}</span>
        </button>
      `
    )
    .join("");
}

function renderProcessPanels(items) {
  return items
    .map(
      ([title, text], index) => `
        <article class="process-panel${index === 0 ? " is-active" : ""}" data-process-panel="${index}"${index === 0 ? "" : " hidden"}>
          <h3>${title}</h3>
          <p>${text}</p>
        </article>
      `
    )
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
          <button class="link-button" data-research-id="${researchId}">
            查看资料
          </button>
          <span class="source-note">${item.sourceName}</span>
        </article>
      `;
    })
    .join("");
}

function renderHeroGallery(items) {
  return items
    .map(
      ({ src, alt }) => `
        <figure class="hero-gallery__item">
          <img src="${src}" alt="${alt}">
        </figure>
      `
    )
    .join("");
}

function renderHome(home, categories, researchItems) {
  return `
    <section class="hero-section">
      <div class="hero-copy">
        <p class="eyebrow">${home.hero.englishName}</p>
        <h1>${home.hero.title}</h1>
        <p class="hero-subtitle">${home.hero.subtitle}</p>
        <p class="hero-description">${home.hero.description}</p>
        <div class="hero-actions">${renderHeroActions(home.hero.actions)}</div>
      </div>
      <div class="hero-gallery">${renderHeroGallery(home.hero.gallery)}</div>
    </section>
    <section class="story-section" id="story">
      <div class="section-heading"><h2>品牌与青花</h2><p>从品牌、工艺到水墨关系，先搭起阅读入口。</p></div>
      <div class="tab-group">
        <div class="tab-buttons">${renderStoryTabButtons(home.storyTabs)}</div>
        <div class="tab-panels">${renderStoryPanels(home.storyTabs)}</div>
      </div>
    </section>
    <section class="objects-section" id="objects">
      <div class="section-heading"><h2>器物导览</h2><p>五个栏目页使用同一套阅读路径，让浏览保持稳定节奏。</p></div>
      <div class="object-grid">${renderCategoryCards(categories)}</div>
    </section>
    <section class="process-section">
      <div class="section-heading"><h2>制作步骤</h2><p>用可切换步骤解释工艺，而不是只留一段静态说明。</p></div>
      <div class="process-layout">
        <div class="process-steps">${renderProcessSteps(home.process)}</div>
        <div class="process-panels">${renderProcessPanels(home.process)}</div>
      </div>
    </section>
    <section class="reading-section">
      <div class="section-heading"><h2>器物故事</h2><p>资料札记直接连接到本地整理的研究条目。</p></div>
      <div class="reading-grid">${renderReadingCards(home.readingCards, researchItems)}</div>
    </section>
  `;
}

function renderCategoryPanels(panels) {
  return panels
    .map(([label, title, text], index) => {
      const selected = index === 0 ? "true" : "false";
      const hidden = index === 0 ? "" : " hidden";
      return `
        <button class="tab-button" data-tab-target="panel-${index}" aria-selected="${selected}">${label}</button>
        <article class="tab-panel"${hidden} data-tab-panel="panel-${index}">
          <h3>${title}</h3>
          <p>${text}</p>
        </article>
      `;
    })
    .join("");
}

function renderCategoryPage(category, researchItems) {
  const cards = researchItems.slice(0, 3);
  return `
    <section class="page-header">
      <div>
        <p class="eyebrow">${category.name}</p>
        <h1>${category.name}</h1>
        <p>${category.intro}</p>
      </div>
      <img class="page-header__image" src="${category.heroImage}" alt="${category.name}">
    </section>
    <section class="tab-group category-tabs">
      <div class="tab-buttons">${renderCategoryPanels(category.panels).match(/<button[\s\S]*?<\/button>/g).join("")}</div>
      <div class="tab-panels">${renderCategoryPanels(category.panels).match(/<article[\s\S]*?<\/article>/g).join("")}</div>
    </section>
    <section class="reading-section">
      <div class="section-heading"><h2>延伸阅读</h2><p>分类页继续接回本地研究资料，保持内容连续性。</p></div>
      <div class="research-strip">
        ${cards
          .map(
            (item) => `
              <article class="research-card">
                <img src="${item.imagePath}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
                <button class="link-button" data-research-id="${item.id}">查看资料</button>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderAbout(about) {
  return `
    <section class="page-header">
      <div>
        <p class="eyebrow">about</p>
        <h1>${about.headerTitle}</h1>
        <p>${about.headerSummary}</p>
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
  return actions
    .map(({ href, label }) => `<a class="hero-action" href="${href}">${label}</a>`)
    .join("");
}

export function renderSiteNav(items, currentPage) {
  return `
    <div class="site-brand">
      <img src="img/logo.png" alt="渔窑标识">
      <div>
        <p>渔窑手工青花</p>
        <span>fishing kiln</span>
      </div>
    </div>
    <nav class="site-nav__links">
      ${items
        .map(
          ({ slug, label, href }) => `
            <a class="site-nav__link${slug === currentPage ? " is-active" : ""}" href="${href}">
              ${label}
            </a>
          `
        )
        .join("")}
    </nav>
  `;
}

export function renderPage(currentPage, content) {
  if (currentPage === "home") {
    return renderHome(content.home, content.categories, content.research.items);
  }

  if (currentPage === "about") {
    return renderAbout(content.about);
  }

  const category = content.categories.find((item) => item.slug === currentPage);
  return category ? renderCategoryPage(category, content.research.items) : "";
}
