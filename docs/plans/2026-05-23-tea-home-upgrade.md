# 茶具分类页与首页升级实施计划
>
**目标：** 把首页升级为茶具优先的机构型资料首页，并把 `tea.html` 升级为带器型谱系、文献规则、馆藏样本、资料台账和通用内嵌详情的正式专题页。  
**设计：** 复用现有数据驱动静态站结构，把首页焦点从花器切到茶具，同时为茶具分类页补充结构化数据、专题渲染分支与共享 detail deck；所有新增内容统一来自官方馆藏页、国际机构与公开古籍。  
**技术栈：** 原生 HTML / CSS / ES Modules / Node test  
**注释计划：** 为首页焦点渲染、茶具专题渲染、共享 detail deck、馆藏卡与数据列表组装补充中文注释；为关键字段如 `teaSpotlight`、`classificationBands`、`detailDeck`、`researchLedger` 标注业务含义。  
**文档同步：** 更新 `README.md`、更新 `docs/changelog-ai.md`、新增 `docs/specs/2026-05-23-tea-home-design.md`；本次涉及首页信息架构、分类页数据模型和来源结构，不能只改代码不写上下文。  
---

### 任务 1：补齐首页与茶具页的行为测试
**文件：**
- 修改：`tests/renderers.test.mjs`
- 修改：`tests/siteContent.test.mjs`
- 修改：`tests/styles.test.mjs`
- 注释：测试保持行为命名，不额外补注释
- [ ] **第 1 步：编写失败测试**
```js
test("renderPage renders the enriched home page with tea spotlight and source deck", () => {
  const html = renderPage("home", siteContent);

  assert.match(html, /茶具专题/);
  assert.match(html, /茶具资料台账/);
  assert.match(html, /馆藏样本/);
  assert.match(html, /data-detail-root/);
});

test("renderPage renders the tea page with typology cards and embedded detail deck", () => {
  const html = renderPage("tea", siteContent);

  assert.match(html, /茶具体系/);
  assert.match(html, /文献规则/);
  assert.match(html, /馆藏样本/);
  assert.match(html, /资料台账/);
  assert.match(html, /data-detail-root/);
});
```
- [ ] **第 2 步：运行测试以验证其出现错误**
运行命令：`npm test -- --test-name-pattern="tea spotlight|tea page with typology"`  
预期结果：断言失败，因为当前首页主叙事和茶具页还没有这些结构。
- [ ] **第 3 步：编写最简实现**
```js
// 本任务只提交失败测试，不提前改生产代码。
```
- [ ] **第 4 步：运行测试以验证其通过成功**
运行命令：`npm test -- --test-name-pattern="tea spotlight|tea page with typology"`  
预期结果：继续失败，且失败原因集中在新结构缺失。

### 任务 2：扩展首页与茶具页结构化数据
**文件：**
- 修改：`js/content/home.js`
- 修改：`js/content/categories.js`
- 文档：`docs/changelog-ai.md`
- 注释：为茶具专题字段、来源台账字段、馆藏样本字段补中文注释
- [ ] **第 1 步：编写失败测试**
```js
test("siteContent exposes tea spotlight, source deck, and structured tea category content", () => {
  const tea = siteContent.categories.find((item) => item.slug === "tea");

  assert.ok(siteContent.home.teaSpotlight?.stats.length >= 4);
  assert.ok(siteContent.home.sourceDeck?.items.length >= 6);
  assert.ok(siteContent.home.institutionSignals?.length >= 4);
  assert.ok(tea.summaryStats?.length >= 4);
  assert.ok(tea.typologyList?.length >= 6);
  assert.ok(tea.detailDeck?.items.length >= 6);
  assert.ok(tea.collectionHighlights?.length >= 4);
  assert.ok(tea.researchLedger?.length >= 4);
});
```
- [ ] **第 2 步：运行测试以验证其出现错误**
运行命令：`npm test -- --test-name-pattern="structured tea category"`  
预期结果：`siteContent` 缺少相关字段导致失败。
- [ ] **第 3 步：编写最简实现**
```js
export const home = {
  ...existingHome,
  teaSpotlight: { stats: [], bands: [] },
  sourceDeck: { items: [] }
};
```
- [ ] **第 4 步：运行测试以验证其通过成功**
运行命令：`npm test -- --test-name-pattern="structured tea category"`  
预期结果：测试仍失败，直到完整数据补齐。

### 任务 3：实现首页茶具焦点与馆藏预览渲染
**文件：**
- 修改：`js/renderers.js`
- 修改：`css/pages.css`
- 修改：`css/components.css`
- 注释：为首页焦点区、馆藏预览卡与机构来源区补中文注释
- [ ] **第 1 步：编写失败测试**
```js
test("renderPage renders the home page with tea spotlight, source deck, and collection preview", () => {
  const html = renderPage("home", siteContent);

  assert.match(html, /茶具专题/);
  assert.match(html, /馆藏样本/);
  assert.match(html, /British Museum/);
  assert.match(html, /The Met/);
});
```
- [ ] **第 2 步：运行测试以验证其出现错误**
运行命令：`npm test -- --test-name-pattern="collection preview"`  
预期结果：首页目前没有茶具馆藏预览，断言失败。
- [ ] **第 3 步：编写最简实现**
```js
function renderHomeCollectionPreview(items) {
  return `<section><h2>馆藏样本</h2></section>`;
}
```
- [ ] **第 4 步：运行测试以验证其通过成功**
运行命令：`npm test -- --test-name-pattern="collection preview"`  
预期结果：结构断言开始转绿，内容断言仍需继续补齐。

### 任务 4：实现茶具页专题结构与通用详情复用
**文件：**
- 修改：`js/renderers.js`
- 修改：`js/interactions.js`
- 修改：`css/pages.css`
- 修改：`css/components.css`
- 注释：为茶具页专题分支、列表与详情联动、激活态同步补中文注释
- [ ] **第 1 步：编写失败测试**
```js
test("renderPage includes shared detail deck state hooks for home and tea pages", () => {
  const homeHtml = renderPage("home", siteContent);
  const teaHtml = renderPage("tea", siteContent);

  assert.match(homeHtml, /data-detail-trigger/);
  assert.match(homeHtml, /data-detail-panel/);
  assert.match(teaHtml, /data-detail-trigger/);
  assert.match(teaHtml, /data-detail-panel/);
});
```
- [ ] **第 2 步：运行测试以验证其出现错误**
运行命令：`npm test -- --test-name-pattern="shared detail deck state hooks"`  
预期结果：若首页与茶具页尚未共用新结构，断言失败。
- [ ] **第 3 步：编写最简实现**
```js
function renderTeaCategoryPage(category) {
  return renderDetailDeck("tea-detail", category.detailDeck);
}
```
- [ ] **第 4 步：运行测试以验证其通过成功**
运行命令：`npm test -- --test-name-pattern="shared detail deck state hooks"`  
预期结果：共享选择器断言通过，内容完整性继续由其他测试覆盖。

### 任务 5：同步样式、README 与变更记录并做收尾验证
**文件：**
- 修改：`README.md`
- 修改：`docs/changelog-ai.md`
- 修改：`tests/renderers.test.mjs`
- 修改：`tests/siteContent.test.mjs`
- 修改：`tests/styles.test.mjs`
- 注释：文档中明确茶具专题的数据来源、组件边界和验证命令
- [ ] **第 1 步：编写失败测试**
```js
test("styles define shared detail deck and typology grids for the tea upgrade", () => {
  const stylesheet = readFileSync(new URL("../css/pages.css", import.meta.url), "utf8");

  assert.match(stylesheet, /\.detail-deck/);
  assert.match(stylesheet, /\.summary-stat-row/);
  assert.match(stylesheet, /\.institution-grid/);
});
```
- [ ] **第 2 步：运行测试以验证其出现错误**
运行命令：`npm test -- --test-name-pattern="tea upgrade"`  
预期结果：若样式或断言未同步，测试失败。
- [ ] **第 3 步：编写最简实现**
```md
- 首页当前重点切换为茶具专题
- 茶具页新增 typology / source deck / collection highlights
```
- [ ] **第 4 步：运行测试以验证其通过成功**
运行命令：`npm test`  
预期结果：自动化测试通过，再补本地预览与页面 smoke check。
