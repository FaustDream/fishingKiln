# API / Data Shape

## `siteContent`

运行态页面统一读取 `js/siteContentUnified.js` 导出的 `siteContent`：

```js
{
  navigation,
  home,
  tea,
  tableware,
  coffee,
  vase,
  art,
  categories,
  about,
  research
}
```

## `home`

首页当前运行态主要依赖以下字段：

- `timeline`
  - 首页朝代叙事节点
  - 每项字段：
    - `id`
    - `era`
    - `title`
    - `summary`
    - `detail`
    - `facts`
    - `relatedCategories`
    - `researchId`
    - `imagePath`
  - `relatedCategories` 只用于表达该节点关联的器物语义，不决定首页朝代段落的入口数量
  - 每个节点会渲染为对应朝代段落里的一个 `data-era-node-panel`，段内按钮通过 `data-era-node-target` 切换
  - 每个朝代会额外渲染一个 `data-era-explorer` 探索抽屉，`data-explore` 按钮通过 `aria-controls` 指向它
  - 探索抽屉内部使用 `data-era-explorer-tab` / `data-era-explorer-panel` 切换四个固定维度：节点脉络、工艺要点、术语、去看分类
- `glossary`
  - 朝代区块的相关术语来源
  - `relatedResearchIds` 用于把术语关联到朝代节点
- `process`
  - 朝代区块的工艺要点来源

以下字段仍由 `siteContentUnified.js` 保留，但当前 `renderHome()` 不直接输出：

- `hero`
- `featureSpotlight`
- `categoryOverview`
- `portalTitle` / `portalSummary`
- `sourceDeck`
- `defaultDetailId`
- `featuredRecords`
- `institutionSignals`
- `networkPanels`
- `jingdezhenPanel`
- `readingCards`
- `featuredResearch`
- `researchIndex`

## `navigation`

导航项当前支持一层朝代子入口：

- `slug`
- `label`
- `href`
- `children`
  - 每项字段：
    - `slug`
    - `label`
    - `href`

当前子入口覆盖：

- 茶具：唐、宋、元、明、清
- 餐具：唐、宋、元、明、清
- 咖啡具：元、明、清
- 花器：唐、宋、元、明、清
- 艺术品：唐、宋、元、明、清

首页朝代段落的器类按钮必须以这些 `children` 为准：

- 唐、宋：茶具、餐具、花器、艺术品
- 元、明、清：茶具、餐具、咖啡具、花器、艺术品

运行态导航行为：

- 大分类链接只负责跳转到对应栏目页
- `.site-nav__sub` 初始必须带 `hidden`
- `.site-nav__toggle` 初始必须为 `aria-expanded="false"`
- 只有用户点击 `.site-nav__toggle` 后，`initNavToggle()` 才切换对应子菜单显示状态

## `art`

总装层会补齐艺术品页缺失字段：

- `detailDeck`
  - 由 `collectionList` 映射而来
- `researchLedger`
  - 由馆藏对象页、V&A、UNESCO、UNESCO WHC 组合而来
- `pageLinks`
  - 必须包含细览入口

## 分类页 DOM hooks

五个主分类页统一输出以下结构：

- `.category-page-shell`
  - 页面统一外壳，并追加 `.category-page-shell--{slug}`
- `.category-hero`
  - 器物导览
  - `.category-hero__grid` 负责桌面两栏与移动端单栏
  - `.category-hero__summary` 放置主图与 `.category-hero-guide`
- `.category-hero-guide`
  - 输出分类入门方式、简短说明和 3 个 `.category-guide-card`
  - 每个 `.category-guide-card[href="#..."]` 必须指向页面内真实 section id
- `.category-section-nav[data-category-section-nav]`
  - 由正文模块 `{ id, title }` 生成
  - 每个 `.category-section-nav__item[href="#..."]` 必须指向页面内真实 section id
  - 桌面端放在 `.category-content-stack` 右侧 rail 区域，以章节线样式 sticky 显示
  - 720px 以下回到内容流顶部，改为横向滚动轨道
- `.category-content-stack`
  - 分类页正文布局容器
  - 桌面端使用 `main / rail` 两栏，窄屏改为 `rail / main` 单列
- `.category-tabs--directory[data-category-directory]`
  - 浏览重点分段控制
  - 继续使用 `data-tab-target="panel-{index}"` 与 `data-tab-panel="panel-{index}"` 作为交互合同
  - 子按钮必须带 `data-category-filter-label="{label}"`，用于同步下方正文卡片的浏览状态
  - 摘要文本使用 `[data-category-filter-summary]`，点击按钮后显示当前查看的标签
- `.category-module`
  - 分类页主体模块统一样式钩子
  - `.category-module-grid` 用于模块内部卡片网格与移动端响应式约束
- `[data-category-filter-target]`
  - 下方正文卡片、馆藏样本、参数矩阵、观看路径和参考资料统一使用
  - `data-category-facets` 使用 `|` 分隔，必须至少包含一个浏览重点标签
  - `data-category-filter-state="active|muted"` 由 `initCategoryDirectoryFilters()` 设置，表示当前标签是否命中该卡片
- `.detail-panel__content-grid`
  - 分类页细览面板的右侧详情布局
  - 左侧放指标与事实列表，右侧放出处、对应谱系、分类位置等补充信息

## 正式页面文案

- `cleanPublicCopy(html)`
  - 在渲染出口统一执行，只作用于最终 HTML 字符串
  - 正式页面不输出“规则 / 档案 / 判断 / 台账”等内部整理词
  - 数据字段、DOM hook 与测试选择器保持英文或既有命名，不受文案清洗影响

## 兼容入口

以下文件只负责转发到 `siteContentUnified.js`，不再维护独立运行态：

- `js/siteContent.js`
- `js/siteContentRuntime.js`
- `js/siteContentPortal.js`
- `js/siteContentTeaPortal.js`
- `js/teaPortalContent.js`
