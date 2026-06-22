# fishingKiln 研究杂志站实施计划
> 
**目标：** 把当前渔窑静态内容站升级为一个围绕青花历史、景德镇脉络、器物分类与研究专题持续阅读的静态研究杂志站。  
**设计：** 保留现有静态多页与结构化内容渲染模式，先把首页升级为“编年时间线 + 景德镇脉络”的总导览，再新增研究专题详情页、研究索引和分类页专题化阅读。实现采用 Outside-In 路线：先补 BDD 外环验收，再用 TDD 内环完成渲染、筛选、参数解析和兜底逻辑。  
**技术栈：** 静态 HTML、模块化 JavaScript、CSS、Node `--test`。  
**注释计划：** 为研究条目查找、URL 参数解析、研究索引筛选、首页时间线联动、分类页专题映射与空状态回退逻辑补充中文注释；重点说明业务意图、字段含义、回退规则和失败影响。  
**文档同步：** 需要更新 `README.md`（站点定位与本地预览说明）、`docs/changelog-ai.md`（沉淀本次 AI/人工可复用上下文）；若实现过程中没有引入新的长期工程约束，则无需更新 `AGENTS.md`、`docs/architecture.md`、`docs/decisions.md`、`docs/conventions.md`、`docs/api.md`。  
---

### 任务 1：建立 BDD 外环与研究站数据边界
**文件：**
- 修改：`D:/gitHub/fishingKiln/tests/siteContent.test.mjs`
- 修改：`D:/gitHub/fishingKiln/tests/renderers.test.mjs`
- 修改：`D:/gitHub/fishingKiln/js/content/home.js`
- 修改：`D:/gitHub/fishingKiln/js/content/research.js`
- 修改：`D:/gitHub/fishingKiln/js/content/categories.js`
- 修改：`D:/gitHub/fishingKiln/js/siteContent.js`
- 文档：`D:/gitHub/fishingKiln/docs/plans/2026-05-21-fishing-kiln-research-journal.md`
- 注释：`researchItems` 新增字段、首页时间线数据、索引标签结构的字段意义与业务用途

- [x] **第 1 步：编写首页与研究站能力的失败验收测试**
```js
import test from "node:test";
import assert from "node:assert/strict";

import { siteContent } from "../js/siteContent.js";

test("siteContent exposes timeline, glossary, and research detail metadata", () => {
  assert.ok(siteContent.home.timeline);
  assert.ok(siteContent.home.timeline.length >= 4);
  assert.ok(siteContent.home.glossary);
  assert.ok(siteContent.home.glossary.length >= 4);
  assert.ok(siteContent.research.items.every((item) => item.era));
  assert.ok(siteContent.research.items.every((item) => item.tags?.length));
});
```

- [x] **第 2 步：运行测试以验证其失败**
运行命令：`node --test --test-name-pattern "siteContent exposes timeline, glossary, and research detail metadata"`  
预期结果：失败，提示 `timeline`、`glossary` 或 `era/tags` 等字段不存在。

- [x] **第 3 步：编写最简数据实现**
```js
export const home = {
  // 中文注释：timeline 定义首页首屏历史主线，节点顺序即用户的首读顺序。
  timeline: [
    { id: "yuan-origins", era: "元代", title: "元代定型", summary: "景德镇开始建立稳定的蓝白语言。" },
    { id: "imperial-kiln-system", era: "明清", title: "御窑系统", summary: "官窑与作坊体系推动器物标准化与扩散。" },
    { id: "porcelain-capital", era: "景德镇", title: "瓷都景德镇", summary: "原料、窑火与运输网络在此汇合。" },
    { id: "global-export", era: "海贸", title: "全球传播", summary: "青花通过海贸进入跨文化流通。" }
  ],
  glossary: [
    { id: "fenshui", title: "分水", summary: "用浓淡层次让青花呈现近似水墨的渗化效果。" }
  ]
};

export const researchItems = [
  {
    id: "yuan-origins",
    title: "元代定型",
    era: "元代",
    tags: ["历史", "景德镇", "青花"],
    relatedCategories: ["tea", "art"]
  }
];
```

- [x] **第 4 步：运行测试以验证其通过**
运行命令：`node --test --test-name-pattern "siteContent exposes timeline, glossary, and research detail metadata"`  
预期结果：通过。

- [x] **第 5 步：补全本任务所需真实数据并保持现有内容兼容**
```js
export const researchItems = [
  {
    id: "global-export",
    title: "海贸传播",
    summary: "元明清时期的青花借由海陆贸易形成稳定的跨文化辨识度。",
    era: "明清",
    tags: ["海贸", "外销瓷", "历史"],
    relatedCategories: ["tableware", "coffee"],
    lead: "从海贸网络看青花如何变成全球可识别的器物语言。",
    keyFacts: [
      "景德镇器物流向中东、日本、东南亚与欧洲市场。",
      "外销需求反过来影响器型、纹样密度与生产组织方式。"
    ],
    relatedGlossary: ["waixiaoci", "jingdezhen-network"]
  }
];
```

- [x] **第 6 步：更新计划勾选状态**
将本任务已完成步骤在 `D:/gitHub/fishingKiln/docs/plans/2026-05-21-fishing-kiln-research-journal.md` 中同步为已完成。

### 任务 2：首页编年时间线、景德镇面板与研究索引
**文件：**
- 修改：`D:/gitHub/fishingKiln/tests/renderers.test.mjs`
- 修改：`D:/gitHub/fishingKiln/js/renderers.js`
- 修改：`D:/gitHub/fishingKiln/js/interactions.js`
- 修改：`D:/gitHub/fishingKiln/js/content/home.js`
- 修改：`D:/gitHub/fishingKiln/css/components.css`
- 修改：`D:/gitHub/fishingKiln/css/layout.css`
- 修改：`D:/gitHub/fishingKiln/css/pages.css`
- 注释：首页时间线联动函数、研究索引筛选函数、空状态判断变量、景德镇面板字段说明

- [x] **第 1 步：编写首页研究主线渲染的失败验收测试**
```js
import test from "node:test";
import assert from "node:assert/strict";

import { renderPage } from "../js/renderers.js";
import { siteContent } from "../js/siteContent.js";

test("renderPage renders historical timeline and glossary entry points on home", () => {
  const html = renderPage("home", siteContent);

  assert.match(html, /元代定型/);
  assert.match(html, /景德镇/);
  assert.match(html, /研究索引/);
  assert.match(html, /分水/);
});
```

- [x] **第 2 步：运行测试以验证其失败**
运行命令：`node --test --test-name-pattern "renderPage renders historical timeline and glossary entry points on home"`  
预期结果：失败，首页 HTML 中还没有时间线、研究索引或术语卡内容。

- [x] **第 3 步：编写最简首页渲染实现**
```js
function renderTimeline(items) {
  return items
    .map(
      ({ id, era, title, summary }, index) => `
        <button class="timeline-node" data-timeline-id="${id}" aria-selected="${index === 0 ? "true" : "false"}">
          <span>${era}</span>
          <strong>${title}</strong>
          <small>${summary}</small>
        </button>
      `
    )
    .join("");
}

function renderGlossaryCards(items) {
  return items
    .map(
      ({ id, title, summary }) => `
        <article class="glossary-card" data-glossary-id="${id}">
          <h3>${title}</h3>
          <p>${summary}</p>
        </article>
      `
    )
    .join("");
}
```

- [x] **第 4 步：运行测试以验证其通过**
运行命令：`node --test --test-name-pattern "renderPage renders historical timeline and glossary entry points on home"`  
预期结果：通过。

- [x] **第 5 步：为研究索引筛选函数编写失败测试**
```js
import test from "node:test";
import assert from "node:assert/strict";

import { filterResearchItems } from "../js/interactions.js";
import { siteContent } from "../js/siteContent.js";

test("filterResearchItems returns only items matching the selected theme", () => {
  const result = filterResearchItems(siteContent.research.items, { tag: "海贸" });

  assert.ok(result.length > 0);
  assert.ok(result.every((item) => item.tags.includes("海贸")));
});
```

- [x] **第 6 步：运行测试以验证其失败**
运行命令：`node --test --test-name-pattern "filterResearchItems returns only items matching the selected theme"`  
预期结果：失败，提示 `filterResearchItems` 未导出或返回结果不正确。

- [x] **第 7 步：编写最简筛选实现并接入首页索引**
```js
export function filterResearchItems(items, filters) {
  const selectedTag = filters.tag?.trim();
  if (!selectedTag) return items;

  // 中文注释：索引筛选默认走“包含该标签”规则，保证用户看到的是当前主题下的全部有效专题。
  return items.filter((item) => item.tags.includes(selectedTag));
}
```

- [x] **第 8 步：运行首页相关测试并确认全部通过**
运行命令：`node --test --test-name-pattern "renderPage renders historical timeline and glossary entry points on home|filterResearchItems returns only items matching the selected theme"`  
预期结果：通过。

- [x] **第 9 步：补首页样式与交互实现**
```css
.timeline-node[aria-selected="true"] {
  background: rgba(255, 255, 255, 0.92);
  box-shadow: inset 0 0 0 1px var(--line);
}

.glossary-card,
.timeline-node,
.index-filter {
  border-radius: 1rem;
}
```

- [x] **第 10 步：更新计划勾选状态**
将本任务已完成步骤在 `D:/gitHub/fishingKiln/docs/plans/2026-05-21-fishing-kiln-research-journal.md` 中同步为已完成。

### 任务 3：新增研究专题详情页与参数兜底
**文件：**
- 创建：`D:/gitHub/fishingKiln/research.html`
- 创建：`D:/gitHub/fishingKiln/tests/researchPage.test.mjs`
- 修改：`D:/gitHub/fishingKiln/js/renderers.js`
- 修改：`D:/gitHub/fishingKiln/js/interactions.js`
- 修改：`D:/gitHub/fishingKiln/js/main.js`
- 修改：`D:/gitHub/fishingKiln/js/content/navigation.js`
- 修改：`D:/gitHub/fishingKiln/js/siteContent.js`
- 注释：查询参数解析函数、研究条目查找逻辑、找不到条目的回退规则、详情页返回入口生成逻辑

- [x] **第 1 步：编写研究详情页与异常兜底的失败验收测试**
```js
import test from "node:test";
import assert from "node:assert/strict";

import { renderResearchDetailPage, resolveResearchItem } from "../js/renderers.js";
import { siteContent } from "../js/siteContent.js";

test("resolveResearchItem returns the matching entry by id", () => {
  const item = resolveResearchItem("yuan-origins", siteContent.research.items);

  assert.equal(item.title, "元代定型");
});

test("renderResearchDetailPage returns fallback content for unknown ids", () => {
  const html = renderResearchDetailPage(undefined, siteContent);

  assert.match(html, /未找到该专题|从研究索引进入/);
});
```

- [x] **第 2 步：运行测试以验证其失败**
运行命令：`node --test tests/researchPage.test.mjs`  
预期结果：失败，提示 `renderResearchDetailPage` 或 `resolveResearchItem` 未定义。

- [x] **第 3 步：编写最简详情渲染与查找实现**
```js
export function resolveResearchItem(id, items) {
  return items.find((item) => item.id === id) ?? null;
}

export function renderResearchDetailPage(id, content) {
  const item = resolveResearchItem(id, content.research.items);
  if (!item) {
    return `
      <section class="page-header">
        <div>
          <p class="eyebrow">research</p>
          <h1>未找到该专题</h1>
          <p>请从研究索引重新进入，或返回首页继续阅读。</p>
        </div>
      </section>
    `;
  }

  return `<section><h1>${item.title}</h1><p>${item.lead}</p></section>`;
}
```

- [x] **第 4 步：运行测试以验证其通过**
运行命令：`node --test tests/researchPage.test.mjs`  
预期结果：通过。

- [x] **第 5 步：补研究详情页页面壳与 URL 参数解析测试**
```js
import test from "node:test";
import assert from "node:assert/strict";

import { getResearchIdFromLocation } from "../js/interactions.js";

test("getResearchIdFromLocation reads the id query parameter", () => {
  const id = getResearchIdFromLocation("https://example.com/research.html?id=global-export");

  assert.equal(id, "global-export");
});
```

- [x] **第 6 步：运行测试以验证其失败**
运行命令：`node --test --test-name-pattern "getResearchIdFromLocation reads the id query parameter"`  
预期结果：失败，提示参数解析函数未定义。

- [x] **第 7 步：编写最简参数解析实现并接入 `main.js`**
```js
export function getResearchIdFromLocation(href) {
  const url = new URL(href);
  return url.searchParams.get("id");
}

function mountPage() {
  const page = document.body.dataset.page ?? "home";
  const detailId = page === "research" ? getResearchIdFromLocation(window.location.href) : null;
  appRoot.innerHTML = page === "research"
    ? renderResearchDetailPage(detailId, siteContent)
    : renderPage(page, siteContent);
}
```

- [x] **第 8 步：运行研究详情页相关测试并确认全部通过**
运行命令：`node --test --test-name-pattern "getResearchIdFromLocation reads the id query parameter|resolveResearchItem returns the matching entry by id|renderResearchDetailPage returns fallback content for unknown ids" tests/researchPage.test.mjs`  
预期结果：通过。

- [x] **第 9 步：把首页与分类页研究卡链接到 `research.html?id=yuan-origins` 这类详情地址**
```js
<a class="link-button" href="research.html?id=${item.id}">
  查看专题
</a>
```

- [x] **第 10 步：更新计划勾选状态**
将本任务已完成步骤在 `D:/gitHub/fishingKiln/docs/plans/2026-05-21-fishing-kiln-research-journal.md` 中同步为已完成。

### 任务 4：分类页专题化、术语复用与完成前文档同步
**文件：**
- 修改：`D:/gitHub/fishingKiln/tests/renderers.test.mjs`
- 修改：`D:/gitHub/fishingKiln/js/renderers.js`
- 修改：`D:/gitHub/fishingKiln/js/content/categories.js`
- 修改：`D:/gitHub/fishingKiln/css/components.css`
- 修改：`D:/gitHub/fishingKiln/css/pages.css`
- 修改：`D:/gitHub/fishingKiln/README.md`
- 创建或修改：`D:/gitHub/fishingKiln/docs/changelog-ai.md`
- 注释：分类页专题映射、历史节点关联、术语卡复用判断、README 中新增阅读路径说明

- [x] **第 1 步：编写分类页专题化渲染的失败验收测试**
```js
import test from "node:test";
import assert from "node:assert/strict";

import { renderPage } from "../js/renderers.js";
import { siteContent } from "../js/siteContent.js";

test("renderPage renders category research modules for tea page", () => {
  const html = renderPage("tea", siteContent);

  assert.match(html, /相关历史节点/);
  assert.match(html, /相关术语/);
  assert.match(html, /延伸研究/);
});
```

- [x] **第 2 步：运行测试以验证其失败**
运行命令：`node --test --test-name-pattern "renderPage renders category research modules for tea page"`  
预期结果：失败，分类页 HTML 还没有相关历史节点或术语模块。

- [x] **第 3 步：编写最简分类页专题模块实现**
```js
function renderCategoryResearchModules(category) {
  return `
    <section class="category-context">
      <article class="context-card">
        <h2>相关历史节点</h2>
        <p>${category.historyNote}</p>
      </article>
      <article class="context-card">
        <h2>相关术语</h2>
        <p>${category.glossaryTitles.join(" / ")}</p>
      </article>
    </section>
  `;
}
```

- [x] **第 4 步：运行测试以验证其通过**
运行命令：`node --test --test-name-pattern "renderPage renders category research modules for tea page"`  
预期结果：通过。

- [x] **第 5 步：补 README 与 changelog 的失败检查**
运行命令：`rg -n "研究杂志|research.html|专题" README.md docs/changelog-ai.md`  
预期结果：失败或无匹配，说明文档尚未同步。

- [x] **第 6 步：更新 README 与 `docs/changelog-ai.md`**
```md
## Project Structure

- `research.html`: 研究专题详情页，承接首页与分类页的连续阅读

## Recent AI Changes

- 将首页升级为青花历史与景德镇脉络导览
- 新增研究专题详情页与研究索引
- 将分类页扩展为专题化阅读页
```

- [x] **第 7 步：运行文档检查以验证其通过**
运行命令：`rg -n "研究杂志|research.html|专题" README.md docs/changelog-ai.md`  
预期结果：返回新增说明行。

- [x] **第 8 步：执行完成前验证**
运行命令：`npm test`  
预期结果：全部测试通过，并包含新增的研究详情与筛选相关测试。

- [x] **第 9 步：执行工作区差异检查**
运行命令：`git diff -- README.md docs/changelog-ai.md index.html research.html js css tests`  
预期结果：仅包含本计划范围内的结构化数据、渲染、样式、测试和文档变更。

- [x] **第 10 步：更新计划勾选状态**
将本任务已完成步骤在 `D:/gitHub/fishingKiln/docs/plans/2026-05-21-fishing-kiln-research-journal.md` 中同步为已完成。
