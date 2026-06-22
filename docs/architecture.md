# Architecture

## 页面层

- `index.html`
  - 总站首页
  - 由 `js/renderers.js` 中的 `renderHome()` 负责拼装
  - 当前主叙事围绕青花粒子首屏、竖排诗词覆盖层和唐、宋、元、明、清五段朝代叙事展开
- `tea.html` / `tableware.html` / `coffee.html` / `vase.html` / `art.html`
  - 五个器物栏目页
  - 分别由 `renderStructuredCategoryPage()`、`renderTablewareCategoryPage()`、`renderCoffeeCategoryPage()`、`renderArtCategoryPage()` 等分支准备内容模块
  - 统一输出 `category-page-shell`、`category-hero`、`category-hero-guide`、右侧 `category-section-nav` 与 `category-tabs--directory`，保证茶具、餐具、咖啡具、花器、艺术品的导览布局和交互一致
- `tang-*.html` / `song-*.html` / `yuan-*.html` / `ming-*.html` / `qing-*.html`
  - 独立朝代器物页
  - 由静态 HTML 直接承接首页朝代叙事与导航子入口
- `research.html`
  - 研究详情页
  - 使用 `renderResearchDetailPage()` 输出关键事实、专题展开、观察笔记、关联图谱、研究路径与出处参考

## 数据层

- `js/content/home.js`
  - 首页基础数据
  - 继续维护时间线、术语卡与工艺步骤等可复用结构
  - `timeline` 是首页五朝叙事的核心输入，`relatedCategories` 只表达节点语义关联
- `js/content/navigation.js`
  - 朝代子入口是首页每个朝代段落输出器类按钮的数量来源，避免首页按钮与真实独立朝代页不一致
- `js/content/categories.js`
  - 五个栏目页原始数据
  - `tea` / `tableware` / `coffee` / `vase` 已自带各自的 detail deck、参考资料或参数矩阵结构
  - `art` 原始数据缺少共享详情卡组与参考资料，由总装层补齐
- `js/content/research.js`
  - 研究专题档案
  - 分类页延伸研究与专题详情页共用这一批数据

## 组装层

- `js/siteContentUnified.js`
  - 当前唯一正式运行态内容总装层
  - 汇总 `home`、`categories`、`about`、`research`
  - 职责：
    - 给五个栏目入口补总站级 `homepageSummary`
    - 为 `art` 补齐 `detailDeck`、`researchLedger` 与共享详情入口
    - 从官方来源与分类页对象中清洗首页 `sourceDeck`
    - 生成首页 `featuredRecords`、`institutionSignals`、`networkPanels`
    - 保留旧资料门户字段，当前 `renderHome()` 主要读取 `timeline`、`glossary`、`process` 与分类入口生成五朝叙事
- `js/siteContent.js` / `js/siteContentRuntime.js` / `js/siteContentPortal.js` / `js/siteContentTeaPortal.js` / `js/teaPortalContent.js`
  - 兼容旧入口文件名
  - 统一转发到 `js/siteContentUnified.js`

## 渲染层

- `renderHome()`
  - 渲染首页粒子 Hero、五朝朝代区块、朝代导航、朝代背景层、段内探索面板和朝代器物页入口
- `buildTimelineEras()`
  - 把 `home.timeline` 中的具体节点归并为唐、宋、元、明、清五组
  - 为每组生成时期、摘要、详情、图像、相关专题与工艺要点
  - 朝代器类入口从 `navigation.children` 反推，不再依赖单个时间线节点的 `relatedCategories`
- `renderEraNodePanels()`
  - 为每个朝代内的时间线节点输出独立说明面板
  - 段内按钮通过 `data-era-node-target` 切换对应 `data-era-node-panel`
- `renderEraExplorer()`
  - 为每个朝代输出当前视口内的探索抽屉
  - 四个维度固定为节点脉络、工艺要点、术语、去看分类
  - `data-explore` 按钮控制同朝代 `data-era-explorer`，不再输出旧的页面流展开面板
- `buildHomeDetailLookup()` / `renderEmbeddedDetail()`
  - 负责首页共享内嵌详情面板
  - 当前作为旧资料门户兼容能力保留，首页粒子叙事不直接输出这套面板
- `renderDetailDeck()`
  - 负责分类页共享详情卡组
  - 茶具、餐具、花器、艺术品与咖啡具页继续使用这套机制承接对象页和来源资料
- `renderCategoryShell()` / `renderCategoryLead()` / `renderCategoryDirectory()`
  - 负责五个器物栏目页的统一导览外壳
  - `category-hero-guide` 输出各分类的入门方式和 3 个首屏操作入口
  - `category-content-stack` 将正文主列和 `category-section-nav` 右侧章节线并排，避免页内导航遮挡顶部内容
  - `category-section-nav` 由正文 section 定义生成，桌面端在右侧 sticky 显示，窄屏回到内容流里的横向轨道
  - `category-tabs--directory` 复用既有 `data-tab-target` / `data-tab-panel` 切换逻辑，但视觉上作为浏览重点分段
  - 浏览重点按钮同时输出 `data-category-filter-label`，正文卡片输出 `data-category-filter-target` 与 `data-category-facets`，点击后会同步标记下方对象、样本、时间脉络和参考资料
- `renderCollectionHighlights()` / `renderFeaturedRecordSection()`
  - 分类页馆藏样本外层直接输出对象说明、尺度线索、细看提示与来源链接
  - 茶具、餐具、花器和艺术品不足 6 条时从对应 `detailDeck.items` 补齐，避免样本区过薄
- `cleanPublicCopy()`
  - 在 `renderPage()` 和 `renderResearchDetailPage()` 出口统一清洗正式页面可见文案
  - 将“规则 / 档案 / 判断 / 台账”等内部整理词替换为“要点 / 专题 / 辨识 / 参考资料”等正式用户词

## 交互层

- `js/interactions.js`
  - `initParticleHero()`: 初始化首页青花粒子画布
  - `initEraScrollAnimation()`: 处理朝代段落入场、图像视差与可见状态
  - `initEraNavHighlight()`: 处理朝代导航高亮、滚动定位和背景层切换
  - `initEraExplorePanels()`: 处理朝代探索抽屉打开、关闭与 `data-era-explorer-tab` 维度切换
  - `initEraSubNav()`: 处理朝代段内节点按钮状态与节点说明面板切换
  - `initCategoryDirectoryFilters()`: 处理分类页浏览重点与下方正文卡片的 active / muted 状态同步
  - `initDetailDecks()`: 处理分类页 detail deck 的激活态
  - `initInlineDetails()`: 处理卡片型资料展开/收起
  - `initCollapsibleSections()`: 处理移动端折叠段与锚点展开
  - `initNavToggle()`: 只响应 `.site-nav__toggle` 点击展开或收起朝代子菜单，主分类链接本身只负责页面跳转
  - `initRevealMotion()`: 为门户卡片、参考资料、详情卡和栏目入口提供入场动效
  - `initResearchFilters()`: 处理研究筛选

## 来源策略

- 馆藏对象页：British Museum、The Met
- 博物馆研究：V&A、The Met essay
- 国际机构：UNESCO Creative Cities、UNESCO World Heritage Centre
- 现代器具官方页：NCA、Hario 等官方页面
- 处理原则：
  - 只保留结构化事实、尺寸、用途、时段和原始链接
  - 首页总装层负责把多来源清洗成列表卡与共享详情卡
  - 不直接搬运长段原文
