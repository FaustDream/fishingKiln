# fishingKiln 餐具页与首页官网化升级实施计划
>
**目标：** 把首页升级为正式机构风格的内容型门户，并把餐具分类页升级为带真实在线数据、列表台账、卡片编排、共享内嵌详情和动效的专题页。  
**设计：** 继续沿用静态 HTML + 结构化内容驱动渲染的站点模式，不引入新依赖。实现上先补失败测试，再把当前已存在但未接通的“首页增强 / 共享详情卡组”数据结构真正接到渲染层；同时补入一套来自官方馆藏与公开典籍的餐具专题数据，并复用同一套详情 deck 到首页与分类页。  
**技术栈：** 静态 HTML、模块化 JavaScript、CSS、Node `--test`、在线公开馆藏与公开数字文献数据。  
**注释计划：** 为共享详情 deck 初始化、首页主模块渲染、餐具专题列表映射、远端资料字段用途、筛选状态与默认激活逻辑补充中文注释；重点解释业务用途、字段含义、状态切换原因、外部来源接入原因和失败影响。  
**文档同步：** 需要更新 `README.md`（站点定位与页面结构）、`docs/architecture.md`（首页/分类页的数据驱动边界与共享详情 deck）、`docs/changelog-ai.md`（沉淀本次上下文）。无需更新 `AGENTS.md`、`docs/api.md`、`docs/decisions.md`、`docs/conventions.md`，因为本次不新增公共接口协议或新的长期工程约束。  
---

### 任务 1：用失败测试锁定首页官网化与餐具页专题化边界
**文件：**
- 修改：`D:/gitHub/fishingKiln/tests/renderers.test.mjs`
- 修改：`D:/gitHub/fishingKiln/tests/styles.test.mjs`
- 修改：`D:/gitHub/fishingKiln/tests/siteContent.test.mjs`
- 文档：`D:/gitHub/fishingKiln/docs/plans/2026-05-23-tableware-official-site-refresh.md`
- 注释：测试名称中的页面边界、共享详情 deck 约束、餐具页新增数据字段含义

- [x] **第 1 步：编写首页官网化与餐具页专题化的失败验收测试**
```js
test("renderPage renders the enriched home page with tableware focus and source deck", () => {
  const html = renderPage("home", siteContent);

  assert.match(html, /餐具专题/);
  assert.match(html, /馆藏与餐桌档案/);
  assert.match(html, /机构来源/);
  assert.match(html, /研究索引/);
  assert.match(html, /data-detail-root/);
});

test("renderPage renders the tableware page with list ledger and embedded detail deck", () => {
  const html = renderPage("tableware", siteContent);

  assert.match(html, /桌面谱系/);
  assert.match(html, /馆藏样本/);
  assert.match(html, /资料台账/);
  assert.match(html, /data-detail-root/);
});
```

- [x] **第 2 步：运行测试以验证其失败**
运行命令：`node --test --test-name-pattern "tableware focus|list ledger|shared detail deck|官网化"`  
预期结果：失败，提示首页和餐具页尚未渲染这些模块，样式中也缺少共享详情 deck 选择态。

- [x] **第 3 步：补样式约束测试，锁定共享详情 deck 与餐具页布局类名**
```js
test("pages stylesheet defines shared detail deck selection states", () => {
  const stylesheet = readFileSync(new URL("../css/pages.css", import.meta.url), "utf8");

  assert.match(stylesheet, /\.detail-deck/);
  assert.match(stylesheet, /\.detail-trigger\[aria-selected="true"\]/);
  assert.match(stylesheet, /\.detail-panel__meta/);
  assert.match(stylesheet, /\.tableware-roster/);
});
```

- [x] **第 4 步：更新计划勾选状态**
将本任务已完成步骤在 `D:/gitHub/fishingKiln/docs/plans/2026-05-23-tableware-official-site-refresh.md` 中同步为已完成。

### 任务 2：整理在线来源并扩充首页、餐具页的数据模型
**文件：**
- 修改：`D:/gitHub/fishingKiln/js/content/home.js`
- 修改：`D:/gitHub/fishingKiln/js/content/categories.js`
- 修改：`D:/gitHub/fishingKiln/js/content/research.js`
- 修改：`D:/gitHub/fishingKiln/tests/siteContent.test.mjs`
- 注释：首页专题焦点字段、餐具台账字段、共享详情 deck 条目字段、外部来源链接用途

- [x] **第 1 步：为结构化数据边界补失败测试**
```js
test("siteContent exposes shared detail data for home and tableware pages", () => {
  assert.ok(siteContent.home.sourceDeck.items.length >= 4);
  assert.ok(siteContent.categories.find((item) => item.slug === "tableware")?.detailDeck?.items.length >= 4);
  assert.ok(siteContent.categories.find((item) => item.slug === "tableware")?.roster?.length >= 4);
});
```

- [x] **第 2 步：运行测试以验证其失败**
运行命令：`node --test --test-name-pattern "shared detail data for home and tableware pages"`  
预期结果：失败，提示餐具页还没有 `detailDeck` 或 `roster` 这类字段。

- [x] **第 3 步：接入真实在线来源并写入结构化数据**
```js
{
  id: "portuguese-arms-dish",
  title: "Dish with IHS monogram, armillary sphere, and Portuguese royal arms",
  sourceName: "The Metropolitan Museum of Art",
  sourceUrl: "https://www.metmuseum.org/art/collection/search/204716"
}
```

- [x] **第 4 步：运行结构化数据相关测试以验证其通过**
运行命令：`node --test --test-name-pattern "shared detail data for home and tableware pages|siteContent exposes"`  
预期结果：通过。

- [x] **第 5 步：更新计划勾选状态**
将本任务已完成步骤在 `D:/gitHub/fishingKiln/docs/plans/2026-05-23-tableware-official-site-refresh.md` 中同步为已完成。

### 任务 3：实现共享内嵌详情 deck、首页官网化布局与餐具页专题布局
**文件：**
- 修改：`D:/gitHub/fishingKiln/js/renderers.js`
- 修改：`D:/gitHub/fishingKiln/js/interactions.js`
- 修改：`D:/gitHub/fishingKiln/css/pages.css`
- 修改：`D:/gitHub/fishingKiln/css/components.css`
- 修改：`D:/gitHub/fishingKiln/js/main.js`
- 注释：共享详情 deck 默认激活逻辑、首页主区块渲染逻辑、餐具页列表映射、动效触发原因、跨页面复用原因

- [x] **第 1 步：编写共享详情 deck 切换初始化的失败测试或失败渲染断言**
```js
test("renderPage includes shared detail deck state hooks for home and tableware pages", () => {
  const homeHtml = renderPage("home", siteContent);
  const tablewareHtml = renderPage("tableware", siteContent);

  assert.match(homeHtml, /data-detail-trigger/);
  assert.match(homeHtml, /data-detail-panel/);
  assert.match(tablewareHtml, /data-detail-trigger/);
  assert.match(tablewareHtml, /data-detail-panel/);
});
```

- [x] **第 2 步：运行测试以验证其失败**
运行命令：`node --test --test-name-pattern "shared detail deck state hooks"`  
预期结果：失败，提示页面 HTML 中还没有共享详情 deck 状态钩子。

- [x] **第 3 步：实现最简共享详情 deck 与首页餐具焦点区**
```js
function renderDetailDeck(section) {
  return `
    <section class="detail-deck" data-detail-root>
      <div class="detail-deck__list">${/* trigger list */ ""}</div>
      <div class="detail-deck__panel">${/* detail panels */ ""}</div>
    </section>
  `;
}
```

- [x] **第 4 步：运行首页与餐具页相关测试以验证其通过**
运行命令：`node --test --test-name-pattern "tableware focus|list ledger|shared detail deck"`  
预期结果：通过。

- [x] **第 5 步：补交互与动效实现**
运行命令：`node --test tests/renderers.test.mjs tests/styles.test.mjs`  
预期结果：通过，并且样式测试能识别 `.detail-deck`、`.detail-trigger[aria-selected="true"]`、`.tableware-roster` 等类名。

- [x] **第 6 步：更新计划勾选状态**
将本任务已完成步骤在 `D:/gitHub/fishingKiln/docs/plans/2026-05-23-tableware-official-site-refresh.md` 中同步为已完成。

### 任务 4：同步文档并完成预览验证
**文件：**
- 修改：`D:/gitHub/fishingKiln/README.md`
- 创建或修改：`D:/gitHub/fishingKiln/docs/architecture.md`
- 修改：`D:/gitHub/fishingKiln/docs/changelog-ai.md`
- 注释：README 页面职责说明、architecture 中共享详情 deck 边界说明

- [x] **第 1 步：更新 README 与架构文档**
```md
- `index.html`: 正式门户首页，包含时间线、机构来源、专题焦点、研究索引和共享内嵌详情
- `tableware.html`: 餐具专题页，包含桌面谱系、馆藏样本、资料台账和共享详情 deck
```

- [ ] **第 2 步：运行文档与测试验证**
运行命令：`npm test`  
预期结果：全部测试通过。

当前状态：已完成运行时直检、局部 Node 渲染校验与结构化内容校验；`npm test` 受工作区内旧测试文件与旧首页装配残留回摆影响，尚不能稳定作为最终通过证据。

- [x] **第 3 步：运行本地预览并检查页面**
运行命令：`npm run preview`  
预期结果：本地服务启动成功，可验证首页与 `tableware.html` 的真实渲染、动效和外部图像加载。

- [x] **第 4 步：执行工作区差异检查**
运行命令：`git diff -- README.md docs js css tests index.html tableware.html`  
预期结果：仅包含首页、餐具页、共享详情组件、测试和文档范围内的变更。

- [x] **第 5 步：更新计划勾选状态**
将本任务已完成步骤在 `D:/gitHub/fishingKiln/docs/plans/2026-05-23-tableware-official-site-refresh.md` 中同步为已完成。
