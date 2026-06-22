# fishingKiln 咖啡具分类页与首页升级实施计划
>
**目标：** 把首页升级为“咖啡具分类与冲煮档案”的机构型入口，并把 `coffee.html` 扩展为包含分类卡、参数列表、时间线档案、内嵌详情与来源台账的正式数据页。  
**设计：** 保留现有静态多页、结构化内容驱动和共享 `detail deck` 模式，把联网整理后的咖啡器具与冲煮数据抽成独立内容模块，供首页、咖啡分类页和研究专题共同复用。实现顺序遵循 workflow 与 TDD：先补失败测试，再接入最小数据与渲染，最后做样式、交互、文档与浏览器验收。  
**技术栈：** 静态 HTML、模块化 JavaScript、CSS、Node `--test`、本地静态预览。  
**注释计划：** 为咖啡数据模块字段、首页与咖啡页的共享渲染函数、列表切换与内嵌详情联动逻辑补充中文注释；重点说明业务用途、字段含义、来源清洗原则、状态切换原因和失败影响。  
**文档同步：** 需要更新 `README.md`（站点定位与页面结构）、新增或更新 `docs/architecture.md`（咖啡数据模块与共享详情 deck 结构）、更新 `docs/changelog-ai.md`（本次 AI 可复用上下文）；`AGENTS.md` 与 `docs/api.md` 无需更新，因为本次没有新增仓库级工程约束，也没有外部 API 接口。  

## 执行结果

- [x] 首页总装层已切到咖啡专题，当前正式入口统一收口到 `js/siteContentUnified.js`
- [x] `coffee.html` 已具备冲煮系统、参数矩阵、历史档案、资料台账与共享详情
- [x] 首页已补齐咖啡矩阵、历史档案、研究路径、研究索引与共享详情联动
- [x] README、`docs/architecture.md`、`docs/changelog-ai.md` 已同步咖啡首页口径
- [x] `npm test` 已通过
- [x] 实际实现未拆出独立 `js/content/coffee.js`，而是复用 `js/content/categories.js` 与 `js/content/research.js` 中的咖啡结构化数据，由 `js/siteContentUnified.js` 统一组装首页

---

### 任务 1：建立咖啡数据边界与首页/分类页失败测试
**文件：**
- 修改：`D:/gitHub/fishingKiln/tests/siteContent.test.mjs`
- 修改：`D:/gitHub/fishingKiln/tests/renderers.test.mjs`
- 修改：`D:/gitHub/fishingKiln/tests/styles.test.mjs`
- 创建：`D:/gitHub/fishingKiln/js/content/coffee.js`
- 修改：`D:/gitHub/fishingKiln/js/siteContent.js`
- 文档：`D:/gitHub/fishingKiln/docs/plans/2026-05-23-fishing-kiln-coffee-classification-refresh.md`
- 注释：`coffee.js` 顶层数据结构说明、来源字段与共享 deck 字段说明

- [x] **第 1 步：为新的咖啡数据模块编写失败测试**
```js
import test from "node:test";
import assert from "node:assert/strict";

import { siteContent } from "../js/siteContent.js";

test("siteContent exposes a coffee library with systems, protocols, history, and detail deck data", () => {
  assert.ok(siteContent.coffee);
  assert.ok(siteContent.coffee.systems.length >= 6);
  assert.ok(siteContent.coffee.protocolLedger.length >= 5);
  assert.ok(siteContent.coffee.historyMoments.length >= 4);
  assert.ok(siteContent.coffee.detailDeck.items.every((item) => item.sourceLinks?.length));
});
```

- [x] **第 2 步：运行测试以验证其失败**
运行命令：`node --test --test-name-pattern "siteContent exposes a coffee library with systems, protocols, history, and detail deck data"`  
预期结果：失败，提示 `siteContent.coffee` 不存在。

- [x] **第 3 步：为首页与咖啡分类页编写失败渲染测试**
```js
import test from "node:test";
import assert from "node:assert/strict";

import { renderPage } from "../js/renderers.js";
import { siteContent } from "../js/siteContent.js";

test("renderPage renders the coffee-led home page with archive deck and protocol matrix", () => {
  const html = renderPage("home", siteContent);

  assert.match(html, /咖啡具分类总览/);
  assert.match(html, /器具参数矩阵/);
  assert.match(html, /冲煮档案详情/);
  assert.match(html, /data-detail-root/);
});

test("renderPage renders the coffee category page with system cards and protocol ledger", () => {
  const html = renderPage("coffee", siteContent);

  assert.match(html, /冲煮系统/);
  assert.match(html, /参数矩阵/);
  assert.match(html, /资料台账/);
  assert.match(html, /data-detail-root/);
});
```

- [x] **第 4 步：运行渲染测试以验证其失败**
运行命令：`node --test --test-name-pattern "renderPage renders the coffee-led home page with archive deck and protocol matrix|renderPage renders the coffee category page with system cards and protocol ledger"`  
预期结果：失败，首页与 `coffee.html` 仍然没有这些结构。

- [x] **第 5 步：为咖啡页新增样式钩子编写失败检查**
```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("pages stylesheet defines coffee archive and matrix layouts", () => {
  const stylesheet = readFileSync(new URL("../css/pages.css", import.meta.url), "utf8");

  assert.match(stylesheet, /\.coffee-system-grid/);
  assert.match(stylesheet, /\.protocol-ledger/);
  assert.match(stylesheet, /\.coffee-history-grid/);
  assert.match(stylesheet, /\.matrix-row/);
});
```

- [x] **第 6 步：运行样式检查以验证其失败**
运行命令：`node --test --test-name-pattern "pages stylesheet defines coffee archive and matrix layouts"`  
预期结果：失败，`pages.css` 中还没有这些类名。

- [ ] **第 7 步：更新计划勾选状态**
将本任务已完成步骤在 `D:/gitHub/fishingKiln/docs/plans/2026-05-23-fishing-kiln-coffee-classification-refresh.md` 中同步为已完成。

### 任务 2：实现咖啡内容模块与研究专题数据
**文件：**
- 创建：`D:/gitHub/fishingKiln/js/content/coffee.js`
- 修改：`D:/gitHub/fishingKiln/js/content/home.js`
- 修改：`D:/gitHub/fishingKiln/js/content/categories.js`
- 修改：`D:/gitHub/fishingKiln/js/content/research.js`
- 修改：`D:/gitHub/fishingKiln/js/siteContent.js`
- 注释：咖啡数据模块字段说明、研究条目来源清洗原则、首页与分类页共享数据来源说明

- [ ] **第 1 步：编写最简咖啡内容模块与 `siteContent` 接入**
```js
export const coffee = {
  systems: [
    {
      id: "pour-over",
      title: "手冲滤泡",
      summary: "以 V60 与 CHEMEX 为代表的手动滴滤系统。",
      sourceLinks: [{ label: "NCA", url: "https://www.aboutcoffee.org/" }]
    }
  ],
  protocolLedger: [
    {
      title: "手冲滤泡",
      ratio: "1:13-1:16",
      temperature: "93C ± 3C"
    }
  ],
  historyMoments: [
    {
      title: "奥斯曼咖啡杯文化",
      sourceName: "British Museum"
    }
  ],
  detailDeck: {
    title: "冲煮档案详情",
    summary: "首页与咖啡页共用的内嵌详情。",
    items: [
      {
        id: "pour-over",
        title: "手冲滤泡",
        metrics: [["比例", "1:13-1:16"]],
        detailBullets: ["以手动控制注水为主。"],
        detailMeta: [["来源", "NCA / Hario"]],
        sourceLinks: [{ label: "NCA", url: "https://www.aboutcoffee.org/" }]
      }
    ]
  }
};
```

- [ ] **第 2 步：运行咖啡数据相关测试以验证其通过**
运行命令：`node --test --test-name-pattern "siteContent exposes a coffee library with systems, protocols, history, and detail deck data"`  
预期结果：通过。

- [ ] **第 3 步：补齐真实联网数据并把咖啡专题接入研究列表**
```js
{
  id: "manual-brewing-protocol",
  title: "手冲滤泡协议",
  summary: "NCA 的手冲比例、温度与时间范围，叠加 Hario 的 V60 形制信息。",
  periods: ["近现代"],
  tags: ["咖啡", "冲煮", "器具"],
  sourceName: "National Coffee Association / Hario",
  sourceUrl: "https://www.aboutcoffee.org/brewing/pour-over-coffee/"
}
```

- [ ] **第 4 步：运行首页与咖啡分类页现有测试，确认内容字段足以驱动渲染**
运行命令：`node --test tests/siteContent.test.mjs tests/renderers.test.mjs`  
预期结果：仍会有首页与咖啡页渲染失败，但 `siteContent` 结构相关断言转绿。

- [ ] **第 5 步：更新计划勾选状态**
将本任务已完成步骤在 `D:/gitHub/fishingKiln/docs/plans/2026-05-23-fishing-kiln-coffee-classification-refresh.md` 中同步为已完成。

### 任务 3：实现首页机构型咖啡入口与共享详情 deck
**文件：**
- 修改：`D:/gitHub/fishingKiln/js/renderers.js`
- 修改：`D:/gitHub/fishingKiln/js/interactions.js`
- 修改：`D:/gitHub/fishingKiln/js/content/home.js`
- 修改：`D:/gitHub/fishingKiln/css/pages.css`
- 修改：`D:/gitHub/fishingKiln/css/components.css`
- 注释：首页共享详情 deck、咖啡总览卡、时间线数据说明、详情切换交互说明

- [ ] **第 1 步：为首页咖啡总览实现最小渲染**
```js
function renderCoffeeOverviewSection(coffee) {
  return `
    <section class="coffee-overview-section" id="coffee-overview">
      <div class="section-heading">
        <h2>咖啡具分类总览</h2>
        <p>${coffee.overview.summary}</p>
      </div>
      <div class="coffee-system-grid">${renderCoffeeSystemCards(coffee.systems.slice(0, 3))}</div>
    </section>
  `;
}
```

- [ ] **第 2 步：运行首页渲染测试以验证仍为失败或部分失败**
运行命令：`node --test --test-name-pattern "renderPage renders the coffee-led home page with archive deck and protocol matrix"`  
预期结果：仍失败，缺少参数矩阵或详情 deck。

- [ ] **第 3 步：接入共享详情 deck 与参数矩阵，完成首页渲染**
```js
function renderCoffeeMatrix(items) {
  return `
    <div class="protocol-ledger">
      ${items.map((item) => `<article class="matrix-row"><h3>${item.title}</h3><p>${item.ratio}</p></article>`).join("")}
    </div>
  `;
}

function renderHome(home, categories, researchItems, coffee) {
  return `
    <section class="hero-section hero-section--institutional">...</section>
    ${renderCoffeeOverviewSection(coffee)}
    ${renderDetailDeck("home-coffee-detail", coffee.detailDeck)}
    <section class="reading-section">
      <div class="section-heading">
        <h2>器具参数矩阵</h2>
        <p>${coffee.matrixSummary}</p>
      </div>
      ${renderCoffeeMatrix(coffee.protocolLedger)}
    </section>
  `;
}
```

- [ ] **第 4 步：运行首页相关测试以验证其通过**
运行命令：`node --test --test-name-pattern "renderPage renders the coffee-led home page with archive deck and protocol matrix"`  
预期结果：通过。

- [ ] **第 5 步：补齐首页样式与共享动效**
```css
.coffee-system-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.protocol-ledger {
  display: grid;
  gap: 0.85rem;
}

.matrix-row {
  display: grid;
  grid-template-columns: minmax(10rem, 1.2fr) repeat(4, minmax(0, 1fr));
}
```

- [ ] **第 6 步：运行样式测试与首页渲染测试**
运行命令：`node --test --test-name-pattern "pages stylesheet defines coffee archive and matrix layouts|renderPage renders the coffee-led home page with archive deck and protocol matrix"`  
预期结果：通过。

- [ ] **第 7 步：更新计划勾选状态**
将本任务已完成步骤在 `D:/gitHub/fishingKiln/docs/plans/2026-05-23-fishing-kiln-coffee-classification-refresh.md` 中同步为已完成。

### 任务 4：实现咖啡分类页的数据卡、列表矩阵、历史档案与来源台账
**文件：**
- 修改：`D:/gitHub/fishingKiln/js/renderers.js`
- 修改：`D:/gitHub/fishingKiln/js/content/categories.js`
- 修改：`D:/gitHub/fishingKiln/js/content/coffee.js`
- 修改：`D:/gitHub/fishingKiln/css/pages.css`
- 注释：咖啡分类页专用渲染函数、列表数据字段与历史档案字段说明

- [ ] **第 1 步：为咖啡分类页编写最简专用渲染函数**
```js
function renderCoffeeCategoryPage(category, researchItems, coffee) {
  return `
    <section class="page-header page-header--compact">...</section>
    <section class="reading-section">
      <div class="section-heading">
        <h2>冲煮系统</h2>
        <p>${coffee.pageIntro}</p>
      </div>
      <div class="coffee-system-grid">${renderCoffeeSystemCards(coffee.systems)}</div>
    </section>
  `;
}
```

- [ ] **第 2 步：运行咖啡分类页测试以验证仍为失败**
运行命令：`node --test --test-name-pattern "renderPage renders the coffee category page with system cards and protocol ledger"`  
预期结果：仍失败，缺少参数矩阵、资料台账或详情 deck。

- [ ] **第 3 步：补参数矩阵、历史档案、资料台账和详情 deck**
```js
return `
  <section class="reading-section" id="coffee-matrix">
    <div class="section-heading">
      <h2>参数矩阵</h2>
      <p>${coffee.matrixSummary}</p>
    </div>
    ${renderCoffeeMatrix(coffee.protocolLedger)}
  </section>
  ${renderDetailDeck("coffee-detail-deck", coffee.detailDeck)}
  <section class="reading-section" id="coffee-history">
    <div class="section-heading">
      <h2>历史档案</h2>
      <p>${coffee.historySummary}</p>
    </div>
    <div class="coffee-history-grid">${renderCoffeeHistoryCards(coffee.historyMoments)}</div>
  </section>
  <section class="reading-section" id="coffee-ledger">
    <div class="section-heading">
      <h2>资料台账</h2>
      <p>${coffee.ledgerSummary}</p>
    </div>
    ${renderResearchLedger(coffee.sourceLedger)}
  </section>
`;
```

- [ ] **第 4 步：运行咖啡分类页测试以验证其通过**
运行命令：`node --test --test-name-pattern "renderPage renders the coffee category page with system cards and protocol ledger"`  
预期结果：通过。

- [ ] **第 5 步：补充咖啡分类页响应式与动画样式**
```css
.coffee-history-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.system-card:hover,
.matrix-row:hover,
.history-card:hover {
  transform: translateY(-3px);
}
```

- [ ] **第 6 步：运行渲染与样式测试**
运行命令：`node --test tests/renderers.test.mjs tests/styles.test.mjs`  
预期结果：通过。

- [ ] **第 7 步：更新计划勾选状态**
将本任务已完成步骤在 `D:/gitHub/fishingKiln/docs/plans/2026-05-23-fishing-kiln-coffee-classification-refresh.md` 中同步为已完成。

### 任务 5：同步文档、完成前验证与浏览器验收
**文件：**
- 修改：`D:/gitHub/fishingKiln/README.md`
- 创建或修改：`D:/gitHub/fishingKiln/docs/architecture.md`
- 修改：`D:/gitHub/fishingKiln/docs/changelog-ai.md`
- 文档：`D:/gitHub/fishingKiln/docs/plans/2026-05-23-fishing-kiln-coffee-classification-refresh.md`
- 注释：README 页面结构描述、架构文档中的数据流说明

- [ ] **第 1 步：更新 README、架构文档和 AI 变更记录**
```md
## Project Structure

- `js/content/coffee.js`: 咖啡器具、冲煮协议、历史档案和共享详情 deck 的结构化数据源
- `coffee.html`: 咖啡具分类与冲煮档案页

## Coffee Data Flow

首页与 `coffee.html` 共享 `coffee.detailDeck`、`coffee.protocolLedger` 和 `coffee.historyMoments`。
```

- [ ] **第 2 步：运行完整测试**
运行命令：`npm test`  
预期结果：全部测试通过。

- [ ] **第 3 步：启动本地预览**
运行命令：`npm run preview`  
预期结果：静态预览启动在 `http://127.0.0.1:4317`，若端口占用则改用新的端口。

- [ ] **第 4 步：执行浏览器完成前验证**
运行目标：`http://127.0.0.1:4317/index.html`、`http://127.0.0.1:4317/coffee.html`  
预期结果：
  - 首页首屏出现咖啡具分类总览与机构型概览
  - `coffee.html` 出现系统卡片、参数矩阵、详情 deck 与资料台账
  - 内嵌详情切换正常
  - 桌面与移动端无文字重叠、无空白图块

- [ ] **第 5 步：执行工作区差异检查**
运行命令：`git diff -- README.md docs js css tests coffee.html index.html`  
预期结果：仅包含本计划范围内的内容数据、渲染、样式、测试和文档变更。

- [ ] **第 6 步：更新计划勾选状态**
将本任务已完成步骤在 `D:/gitHub/fishingKiln/docs/plans/2026-05-23-fishing-kiln-coffee-classification-refresh.md` 中同步为已完成。
