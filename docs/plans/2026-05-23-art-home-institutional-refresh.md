# fishingKiln 艺术品页与机构型首页改版实施计划
> 
**目标：** 将首页升级为正式机构型内容首页，并将艺术品分类页改造成接入官方馆藏数据的策展栏目页。  
**设计：** 延续静态多页和结构化渲染模式，先通过失败测试锁定首页新模块、艺术品页新结构与通用内嵌详情，再采集官方机构数据并实现渲染、交互和样式。  
**技术栈：** 静态 HTML、模块化 JavaScript、CSS、Node `--test`、官方公开网页与 API 数据整理。  
**注释计划：** 为联网整理后的数据结构、艺术品条目映射、内嵌详情查找、详情展开状态、首页机构卡渲染和动画初始化补充中文注释，说明业务用途、字段意义、回退条件和失败影响。  
**文档同步：** 需要更新 `README.md`、`docs/changelog-ai.md`，并新增本次设计文档；当前不涉及新的工程约束、构建命令或 API 规范，因此无需更新 `AGENTS.md`、`docs/architecture.md`、`docs/decisions.md`、`docs/conventions.md`、`docs/api.md`。  
---

### 任务 1：建立首页与艺术品页改版的失败测试
**文件：**
- 修改：`D:/gitHub/fishingKiln/tests/siteContent.test.mjs`
- 修改：`D:/gitHub/fishingKiln/tests/renderers.test.mjs`
- 修改：`D:/gitHub/fishingKiln/tests/styles.test.mjs`
- 注释：测试命名需直接对应首页机构化结构、艺术品策展结构和内嵌详情行为

- [ ] **第 1 步：编写首页增强失败测试**
```js
test("renderPage renders institutional homepage sections", () => {
  const html = renderPage("home", siteContent);

  assert.match(html, /当期策展导览/);
  assert.match(html, /资料网络/);
  assert.match(html, /馆藏来源/);
  assert.match(html, /重点艺术品/);
});
```

- [ ] **第 2 步：运行测试以验证其失败**
运行命令：`node --test --test-name-pattern "renderPage renders institutional homepage sections"`  
预期结果：失败，首页现有 HTML 中不存在这些新结构。

- [ ] **第 3 步：编写艺术品页失败测试**
```js
test("renderPage renders curated collection modules for art page", () => {
  const html = renderPage("art", siteContent);

  assert.match(html, /重点馆藏/);
  assert.match(html, /策展列表/);
  assert.match(html, /观看路径/);
  assert.match(html, /data-inline-detail-trigger/);
});
```

- [ ] **第 4 步：运行测试以验证其失败**
运行命令：`node --test --test-name-pattern "renderPage renders curated collection modules for art page"`  
预期结果：失败，艺术品页当前没有专属策展结构或内嵌详情入口。

- [ ] **第 5 步：编写样式失败测试**
```js
test("stylesheets define inline detail, institutional hero, and art collection modules", () => {
  const stylesheet = readFileSync(new URL("../css/pages.css", import.meta.url), "utf8");

  assert.match(stylesheet, /\.institution-grid/);
  assert.match(stylesheet, /\.collection-list/);
  assert.match(stylesheet, /\.inline-detail/);
});
```

- [ ] **第 6 步：运行测试以验证其失败**
运行命令：`node --test --test-name-pattern "stylesheets define inline detail, institutional hero, and art collection modules"`  
预期结果：失败，对应样式类名尚不存在。

### 任务 2：采集官方机构数据并接入结构化内容
**文件：**
- 修改：`D:/gitHub/fishingKiln/js/content/home.js`
- 修改：`D:/gitHub/fishingKiln/js/content/categories.js`
- 修改：`D:/gitHub/fishingKiln/js/content/research.js`
- 视情况创建：`D:/gitHub/fishingKiln/js/content/institutions.js`
- 注释：首页机构数据字段、艺术品条目来源字段、详情事实数组与来源映射

- [ ] **第 1 步：联网采集 6 到 8 条官方来源对象与机构事实**
运行命令：`使用官方机构 API 或页面抓取对象名称、年代、机构、材料、来源链接、图片链接与观看重点`  
预期结果：得到可落本地结构化数据的对象清单。

- [ ] **第 2 步：编写最小结构化数据实现**
```js
const artRecord = {
  id: "met-cloud-collar-vase",
  title: "云肩纹青花大罐",
  institution: "The Metropolitan Museum of Art",
  period: "元代",
  material: "Porcelain with cobalt pigment under transparent glaze",
  sourceUrl: "https://...",
  imagePath: "https://...",
  summary: "作为重点对象进入艺术品页与首页策展导览。",
  detailFacts: ["馆藏机构：...", "材质：...", "观看重点：..."]
};
```

- [ ] **第 3 步：运行内容结构测试**
运行命令：`node --test tests/siteContent.test.mjs`  
预期结果：失败后在补齐字段后转为通过。

- [ ] **第 4 步：补齐首页和艺术品页所需全部真实数据**
```js
home.institutionStats = [...];
home.featuredRecords = [...];
category.collectionHighlights = [...];
category.collectionList = [...];
```

- [ ] **第 5 步：重新运行内容结构测试并确认通过**
运行命令：`node --test tests/siteContent.test.mjs`  
预期结果：通过，且新增字段具备完整来源信息。

### 任务 3：实现首页机构型模块与艺术品页策展渲染
**文件：**
- 修改：`D:/gitHub/fishingKiln/js/renderers.js`
- 修改：`D:/gitHub/fishingKiln/js/siteContent.js`
- 修改：`D:/gitHub/fishingKiln/index.html`
- 修改：`D:/gitHub/fishingKiln/art.html`
- 注释：首页机构模块渲染函数、艺术品页专属渲染分支、内嵌详情占位规则、来源列表输出条件

- [ ] **第 1 步：为首页新模块编写最简渲染实现**
```js
function renderInstitutionStats(stats) {
  return stats.map(({ label, value }) => `<article class="stat-card"><strong>${value}</strong><span>${label}</span></article>`).join("");
}
```

- [ ] **第 2 步：运行首页渲染测试**
运行命令：`node --test --test-name-pattern "renderPage renders institutional homepage sections"`  
预期结果：从失败转为通过。

- [ ] **第 3 步：为艺术品页编写专属渲染实现**
```js
function renderArtCollectionList(items) {
  return items.map((item) => `<article class="collection-list__item">${item.title}</article>`).join("");
}
```

- [ ] **第 4 步：运行艺术品页渲染测试**
运行命令：`node --test --test-name-pattern "renderPage renders curated collection modules for art page"`  
预期结果：从失败转为通过。

- [ ] **第 5 步：实现首页与艺术品页的通用内嵌详情标记**
```js
function renderInlineDetailTrigger(detailId) {
  return `<button class="link-button" type="button" data-inline-detail-trigger="${detailId}">展开资料</button>`;
}
```

- [ ] **第 6 步：运行渲染相关测试并确认通过**
运行命令：`node --test tests/renderers.test.mjs tests/researchPage.test.mjs`  
预期结果：通过。

### 任务 4：实现内嵌详情交互、动画和正式页面样式
**文件：**
- 修改：`D:/gitHub/fishingKiln/js/interactions.js`
- 修改：`D:/gitHub/fishingKiln/js/main.js`
- 修改：`D:/gitHub/fishingKiln/css/base.css`
- 修改：`D:/gitHub/fishingKiln/css/components.css`
- 修改：`D:/gitHub/fishingKiln/css/layout.css`
- 修改：`D:/gitHub/fishingKiln/css/pages.css`
- 注释：详情状态切换、交互回退、视区动画、机构首屏布局约束、艺术品列表稳定尺寸

- [ ] **第 1 步：为内嵌详情交互编写失败测试或字符串结构校验**
```js
test("rendered art page includes inline detail containers", () => {
  const html = renderPage("art", siteContent);
  assert.match(html, /data-inline-detail-panel/);
});
```

- [ ] **第 2 步：运行测试以验证其失败**
运行命令：`node --test --test-name-pattern "rendered art page includes inline detail containers"`  
预期结果：失败。

- [ ] **第 3 步：实现详情展开和动效初始化**
```js
function initInlineDetails() {
  document.querySelectorAll("[data-inline-detail-trigger]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`[data-inline-detail-panel="${button.dataset.inlineDetailTrigger}"]`);
      panel && panel.toggleAttribute("hidden");
    });
  });
}
```

- [ ] **第 4 步：实现页面样式**
运行命令：`补充 institution-grid、collection-list、inline-detail、hero-band、network-panel 等样式`  
预期结果：首页与艺术品页形成正式机构站排版和稳定响应式布局。

- [ ] **第 5 步：运行样式与渲染测试**
运行命令：`node --test tests/styles.test.mjs tests/renderers.test.mjs`  
预期结果：通过。

### 任务 5：完成前验证与文档同步
**文件：**
- 修改：`D:/gitHub/fishingKiln/README.md`
- 修改：`D:/gitHub/fishingKiln/docs/changelog-ai.md`
- 文档：`D:/gitHub/fishingKiln/docs/specs/2026-05-23-art-home-institutional-refresh-design.md`
- 注释：README 中说明新的首页与艺术品页定位，changelog 记录新增数据来源和内嵌详情约定

- [ ] **第 1 步：更新 README**
```md
- `index.html`: 机构型首页，整合策展导览、资料网络和重点对象入口
- `art.html`: 艺术品策展页，包含重点馆藏、策展列表和内嵌详情
```

- [ ] **第 2 步：更新 `docs/changelog-ai.md`**
```md
- 首页升级为机构型内容首页，新增官方来源统计、策展导览和资料网络区。
- 艺术品页改为策展栏目页，并新增通用内嵌详情机制。
```

- [ ] **第 3 步：运行完整测试**
运行命令：`npm test`  
预期结果：全部测试通过。

- [ ] **第 4 步：启动本地预览**
运行命令：`npm run preview`  
预期结果：本地静态服务成功启动。

- [ ] **第 5 步：进行浏览器核验**
运行命令：`打开首页与艺术品页，检查桌面与移动视口、详情展开、卡片动效与图片加载`  
预期结果：页面无空白、无重叠、无失控溢出，重点模块可用。

- [ ] **第 6 步：执行工作区差异检查**
运行命令：`git diff -- README.md docs index.html art.html js css tests`  
预期结果：只包含本计划范围内的内容、样式、测试与文档更新。
