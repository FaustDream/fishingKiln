# 花器分类页与首页升级实施计划
>
**目标：** 把首页升级为信息密度更高的机构型入口页，并把花器页升级为带分类谱系、数据卡片和通用内嵌详情的正式专题页。  
**设计：** 以现有静态站的数据驱动结构为基础，新增花器专题数据模型、通用 detail deck 渲染组件和更完整的首页分区；内容来源统一落在本地结构化数据中，由渲染层拼装页面。  
**技术栈：** 原生 HTML / CSS / ES Modules / Node test  
**注释计划：** 为首页新结构渲染函数、花器数据渲染函数、通用 detail deck 交互、数据筛选与状态同步补充中文注释；为关键字段如 `detailDeck`、`classificationBands`、`sourceDeck` 标注业务含义。  
**文档同步：** 更新 `README.md`、新增 `docs/architecture.md`、新增 `docs/changelog-ai.md`；因为本次修改涉及首页信息架构、分类页数据模型和通用详情组件，不能只改代码不记上下文。  
---

### 任务 1：补齐首页/花器页目标测试
**文件：**
- 修改：`tests/renderers.test.mjs`
- 修改：`tests/siteContent.test.mjs`
- 修改：`tests/styles.test.mjs`
- 注释：测试命名保持行为导向，无需额外注释
- [ ] **第 1 步：编写失败测试**
```js
test("renderPage renders the enriched home page with vase spotlight and source deck", () => {
  const html = renderPage("home", siteContent);

  assert.match(html, /花器专题/);
  assert.match(html, /馆藏与典籍档案/);
  assert.match(html, /data-detail-root/);
  assert.match(html, /研究路径/);
});

test("renderPage renders the vase page with typology cards and embedded detail deck", () => {
  const html = renderPage("vase", siteContent);

  assert.match(html, /花器谱系/);
  assert.match(html, /馆藏样本/);
  assert.match(html, /典籍规矩/);
  assert.match(html, /data-detail-root/);
});
```
- [ ] **第 2 步：运行测试以验证其出现错误**
运行命令：`npm test`
预期结果：`renderers` 或 `siteContent` 相关断言失败，因为页面中尚无这些新结构。
- [ ] **第 3 步：编写最简实现**
```js
// 先不实现生产逻辑，本任务只提交失败测试。
```
- [ ] **第 4 步：运行测试以验证其通过成功**
运行命令：`npm test`
预期结果：仍失败，且失败原因聚焦于新增断言缺失。

### 任务 2：扩展结构化内容数据
**文件：**
- 修改：`js/content/home.js`
- 修改：`js/content/categories.js`
- 文档：`docs/changelog-ai.md`
- 注释：为新数据块的业务用途、字段中文含义补充注释
- [ ] **第 1 步：编写失败测试**
```js
test("siteContent exposes shared source deck and vase detail deck content", () => {
  const vase = siteContent.categories.find((item) => item.slug === "vase");

  assert.ok(siteContent.home.sourceDeck?.items.length >= 4);
  assert.ok(siteContent.home.vaseSpotlight);
  assert.ok(vase.summaryStats?.length >= 3);
  assert.ok(vase.typologyList?.length >= 6);
  assert.ok(vase.detailDeck?.items.length >= 6);
});
```
- [ ] **第 2 步：运行测试以验证其出现错误**
运行命令：`npm test`
预期结果：`siteContent` 结构缺失导致失败。
- [ ] **第 3 步：编写最简实现**
```js
export const home = {
  ...existingHome,
  sourceDeck: { title: "馆藏与典籍档案", items: [] }
};
```
- [ ] **第 4 步：运行测试以验证其通过成功**
运行命令：`npm test`
预期结果：测试继续失败，直到完整数据补齐。

### 任务 3：实现首页与花器页的新渲染结构
**文件：**
- 修改：`js/renderers.js`
- 修改：`css/components.css`
- 修改：`css/layout.css`
- 修改：`css/pages.css`
- 注释：为 `renderDetailDeck`、`renderHomeInstitutionBand`、`renderVaseTypologyCards` 等关键函数补中文注释
- [ ] **第 1 步：编写失败测试**
```js
test("renderPage includes shared detail deck state hooks for home and vase pages", () => {
  const homeHtml = renderPage("home", siteContent);
  const vaseHtml = renderPage("vase", siteContent);

  assert.match(homeHtml, /data-detail-trigger/);
  assert.match(homeHtml, /data-detail-panel/);
  assert.match(vaseHtml, /data-detail-trigger/);
  assert.match(vaseHtml, /data-detail-panel/);
});
```
- [ ] **第 2 步：运行测试以验证其出现错误**
运行命令：`npm test`
预期结果：新选择器不存在。
- [ ] **第 3 步：编写最简实现**
```js
function renderDetailDeck(deck) {
  return `
    <section data-detail-root>
      <div data-detail-panel></div>
    </section>
  `;
}
```
- [ ] **第 4 步：运行测试以验证其通过成功**
运行命令：`npm test`
预期结果：结构性断言开始转绿，但页面文本与布局断言仍可能失败。

### 任务 4：实现通用 detail deck 交互与动画
**文件：**
- 修改：`js/interactions.js`
- 修改：`css/components.css`
- 修改：`css/pages.css`
- 注释：为激活态同步、默认项选中和嵌入详情切换原因写中文注释
- [ ] **第 1 步：编写失败测试**
```js
test("styles define shared detail deck and embedded panel motion hooks", () => {
  const stylesheet = readFileSync(new URL("../css/pages.css", import.meta.url), "utf8");

  assert.match(stylesheet, /\.detail-deck/);
  assert.match(stylesheet, /\.detail-panel/);
  assert.match(stylesheet, /\.detail-trigger\[aria-selected="true"\]/);
});
```
- [ ] **第 2 步：运行测试以验证其出现错误**
运行命令：`npm test`
预期结果：样式断言失败。
- [ ] **第 3 步：编写最简实现**
```css
.detail-deck {}
.detail-panel {}
.detail-trigger[aria-selected="true"] {}
```
- [ ] **第 4 步：运行测试以验证其通过成功**
运行命令：`npm test`
预期结果：样式结构断言通过，交互逻辑再由浏览器 smoke check 验证。

### 任务 5：同步文档与完成验证
**文件：**
- 修改：`README.md`
- 新增：`docs/architecture.md`
- 新增：`docs/changelog-ai.md`
- 注释：文档中明确数据来源、组件边界与验证方式
- [ ] **第 1 步：编写失败测试**
```js
// 文档任务不单独写自动化测试，改为执行结构与页面验证。
```
- [ ] **第 2 步：运行测试以验证其出现错误**
运行命令：`npm test`
预期结果：已有测试全部通过；文档任务依赖人工检查。
- [ ] **第 3 步：编写最简实现**
```md
# Architecture

- 首页新增 detail deck
- 花器页新增 typology / collection / ledger 三层结构
```
- [ ] **第 4 步：运行测试以验证其通过成功**
运行命令：`npm test`
预期结果：自动化测试通过，并补充本地预览与浏览器 smoke check。
