# 花器分类页与首页信息架构升级设计

## 目标

把现有偏轻量的品牌站升级为更接近高校/国际机构官网的信息型站点，重点完成两件事：

1. 把 `vase.html` 从普通分类页提升为带有分类谱系、典籍线索、馆藏样本、数据卡片和详情面板的正式花器专题页。
2. 把 `index.html` 从简化入口页提升为内容密度更高的首页，允许用户从首页直接理解花器专题、资料来源、研究路径和器物网络。

## 用户要求映射

- 要定制化：视觉和信息结构围绕“渔窑花器研究站”建立，不做通用模板页。
- 要有列表数据：提供花器谱系列表、观察清单、研究路线、来源台账。
- 要有卡片数据：提供器型卡、统计卡、来源卡、专题卡。
- 要有动画效果：保留现有 reveal motion，并补充时间轴/详情面板/列表卡的入场与切换动画。
- 要有页面数据详情：花器页提供专属详情面板。
- 要有一个通用的内嵌数据详情：首页与花器页复用同一套 detail deck 组件，不使用营销式功能说明区。
- 首页功能要丰富：恢复并增强首页的数据入口、专题带、来源档案、对象网络与方法板块。
- 数据从网上获取：本次内容以 British Museum、The Met、UNESCO、Wikisource《瓶花谱》《瓶史》为基础进行整理。

## 视觉方向

- 气质：研究型、机构型、安静、密集，但保持手工青花品牌的温度。
- 版式：用多栏信息带、焦点面板、台账卡和横向专题条带组织内容，而不是营销海报。
- 首屏：不做夸张 hero，而是“主叙事 + 数据简报 + 焦点对象”的官方站首页结构。
- 动效：只用于层级切换、详情切换与内容出现，不做装饰性大动效。

## 信息架构

### 首页

1. Hero + 机构简报
   - 品牌标题、专题导向 CTA
   - 统计卡
   - 花器焦点 brief
2. 花器主线
   - 以时间/用途/空间三条线介绍花器专题入口
3. 馆藏与典籍档案
   - 复用通用 detail deck
   - 左侧列表，右侧详情
4. 器物网络
   - 五大器类卡片
   - 花器作为主焦点出现
5. 研究路径 / 研究专题条带
   - 使用现有 research 数据增强首页密度
6. 工艺步骤
   - 保留现有切换式工艺模块，但做机构化排版

### 花器页

1. 专题页头
   - 花器导言、主题标签、页内导航
   - 一条“专题摘要”数据带
2. 花器谱系
   - 列表 + 卡片并行
   - 按器型、口部、肩部、空间用途组织
3. 典籍规矩
   - 从《瓶花谱》《瓶史》提炼书斋/堂厦/比例/配枝规则
4. 馆藏样本
   - 以 British Museum / The Met 的器型记录做样本卡
5. 通用内嵌详情
   - 左侧类型索引，右侧详情面板
   - 内容包括：时代、尺寸、用途、空间关系、代表纹样、来源链接
6. 延伸研究
   - 继续接现有 researchItems

## 数据模型决策

### `home`

新增：

- `hero.brief`
- `hero.focusCard`
- `vaseSpotlight`
- `sourceDeck`
- `featuredResearch`
- `institutionSignals`

### `categories[vase]`

新增：

- `intro`
- `summaryStats`
- `classificationBands`
- `typologyList`
- `curationNotes`
- `detailDeck`
- `collectionHighlights`
- `researchLedger`

### 通用 detail deck

统一字段：

- `id`
- `eyebrow`
- `title`
- `summary`
- `metrics`
- `detailTitle`
- `detailBody`
- `detailBullets`
- `detailMeta`
- `sourceLinks`

## 内容来源与使用方式

### 博物馆/机构

- British Museum：梅瓶、抱月瓶、环耳花瓶、蒜头瓶等对象页
- The Met：meiping / yuhuchun / gu 相关对象页
- UNESCO：景德镇城市与御窑系统背景

### 典籍

- 《瓶花谱》：择瓶、尺度、季节、室内场景、插贮规则
- 《瓶史》：斋瓶尺度、陈设禁忌、数量与布局

### 处理原则

- 不照抄长段原文，只提取结构化事实。
- 所有来源保留链接，详情面板可直达原页。
- 典籍内容以现代中文归纳，不堆砌古文整段。

## 组件边界

- `renderDetailDeck()`：通用详情组件，首页和花器页复用
- `renderVaseTypologyCards()`：花器器型卡
- `renderVaseCollectionCards()`：馆藏样本卡
- `renderInstitutionSignals()`：首页来源信号卡
- `initDetailDecks()`：统一处理 detail deck 交互与激活态

## 验收标准

1. 首页首屏能直接看出这不是单一静态品牌页，而是有花器专题和来源档案的内容站。
2. 花器页至少同时存在：
   - 列表型数据
   - 卡片型数据
   - 内嵌详情面板
   - 机构来源链接
3. 通用 detail deck 至少在首页和花器页各使用一次。
4. 渲染与交互测试覆盖新结构。
5. README 与 `docs/architecture.md` / `docs/changelog-ai.md` 记录本次数据结构变化与验证方式。
