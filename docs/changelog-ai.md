# AI Changelog

## 2026-06-09

- 五个主分类页首屏右侧由“数量指标 + 快捷目录”改为 `category-hero-guide` 导览面板：茶具、餐具、咖啡具、花器、艺术品分别输出入门方式和 3 个可点击入口，避免与右侧章节线重复。
- 新增 `.category-guide-card` 首屏入口样式，并接入卡片动效与减少动态兜底；`main.js`、`styles.css` 和入口 HTML 的缓存 query 更新为 `20260609-guide-panel1`。
- 五个主分类页统一升级为资料型主目录：`tea.html`、`tableware.html`、`coffee.html`、`vase.html`、`art.html` 均输出 `category-page-shell`、`category-hero`、`category-hero-guide`、`category-tabs--directory` 与 `category-module`。
- 分类页顶部从旧的 `page-header + page-header__meta` 松散入口改为左侧栏目说明、右侧主图和入门导览的紧凑布局，避免首屏继续显示无意义数量指标。
- 分类页“用途 / 器形 / 纹样 / 语境”等按钮保留既有 `data-tab-target` 交互，但视觉上改为目录式分段控制，点击后只显示一个对应说明面板。
- 分类页入场与 tab 切换动效收敛到 180-220ms，并在 `prefers-reduced-motion: reduce` 下关闭 `categoryPanelReveal` 等动画。
- 新增分类页渲染和样式回归断言，覆盖统一主目录结构、页内锚点、目录式 tab、移动端规则和减少动态兜底。
- 五个主分类页新增 `category-section-nav` 内部快捷导航，按正文模块生成锚点，桌面端 sticky、移动端横向滚动，解决大目录内容过长时的跳转成本。
- `renderPage()` 与 `renderResearchDetailPage()` 出口新增 `cleanPublicCopy()`，正式页面统一移除“规则 / 档案 / 判断 / 台账”等内部整理词，替换为“要点 / 专题 / 辨识 / 参考资料”等用户可读文案。
- 静态朝代页新增正式文案回归测试，并清理 `qing-art.html`、`song-tableware.html` 中残留的内部整理词。
- 分类页浏览重点现在会同步下方正文卡片状态：`data-category-filter-label` 命中 `data-category-facets` 后，对象卡、馆藏样本、参数矩阵、观看路径和参考资料会进入 active / muted 状态。
- 茶具、餐具、花器和艺术品馆藏样本不足 6 条时从 `detailDeck.items` 补齐；餐具、咖啡具、艺术品的专用卡片外层新增主要看点、细看说明和来源承接。
- 分类页 detail deck 详情面板改为左右内容网格，指标/事实与出处/谱系并排展示，减少左右不对称和信息断裂。
- 分类页顶部主目录收紧为更平衡的双栏布局，降低左侧空白并压缩首屏高度。
- 分类页内部快捷导航从顶部 sticky 横条改为桌面右侧章节线，避免遮挡正文；720px 以下保留横向滚动轨道。
- 主入口脚本 query 更新为 `20260609-guide-panel1`，确保本地预览刷新后加载最新分类页渲染逻辑。
- 全站信息卡片统一增强动效：研究卡、资料行、重点对象、统计卡和分类页样本卡加入材质化入场、瓷釉流光、扫描线与 active 反馈，形成历史陶瓷质感和轻科技感的混合体验；`prefers-reduced-motion: reduce` 下关闭入场、流光和扫描动画，并通过 `artifacts.css?v=20260609-guide-panel1` 刷新预览缓存。
- `initRevealMotion()` 在浏览器不支持或未暴露 `IntersectionObserver` 时会立即显示所有卡片，卡片 reveal 改用专用 `has-card-motion` 状态，避免与首页朝代滚动动画的 `has-motion` 互相影响；`main.js` 与正式入口 HTML 的脚本 query 更新为 `20260609-guide-panel1`。

## 2026-06-08

- 首页运行态改为粒子首屏加唐、宋、元、明、清五段滚动叙事，`renderHome()` 输出 `hero-section--particle`、`era-section`、`era-nav` 与 `era-bg-layer`。
- 新增 `js/particle-hero.js`，由 `initParticleHero()` 在首页初始化青花墨韵 canvas。
- 主导航新增朝代子入口，承接 23 个独立朝代器物页：茶具、餐具、花器、艺术品覆盖唐宋元明清，咖啡具覆盖元明清。
- 首页朝代段落的器类入口改为从 `navigation.children` 反推：唐、宋输出 4 类，元、明、清输出 5 类，与独立朝代页数量保持一致。
- 首页时间线从 8 个节点扩展为 15 个节点，唐、宋、元、明、清每组至少 3 个叙事节点，段内子导航与探索面板同步变丰富。
- 新增 `css/artifacts.css`，集中放置分类增强、朝代背景层、粒子首屏、竖排诗词与段内子导航样式。
- 首页独立“青花器物注释图”已移除，胎体、釉层、青料、纹样、窑火五个热点改为叠加在每张朝代图片内，由 `[data-annotation-root]` 分别管理当前图片的说明面板。
- 首页朝代段内按钮从只滚动到同一朝代段落，改为通过 `data-era-node-target` 切换独立时间线节点面板；点击“煎茶器形”等子节点会立即显示对应说明与判断点。
- 首页“深入探索”从旧的页面流展开面板升级为当前视口内探索抽屉，提供“节点脉络 / 工艺判断 / 术语 / 去看分类”四个切换维度，并通过 `data-era-explorer` 独立管理每个朝代。
- 首页五个朝代段落统一增强动态效果：器物图片加入轻微呼吸与光泽扫过，注释热点加入脉冲提示，注释说明与节点面板加入轻量入场动画，并保留 `prefers-reduced-motion` 降低动态兜底。
- 首页清代段落主图从误用的红釉瓶局部图改为完整青花盖罐 `img/era-qing-dragon.jpg`，保证注释热点叠加在青花瓷器图片上。
- 朝代区块入场动画移除 `clip-path`，改为更轻的 `opacity + transform` 过渡；粒子首屏修复 `curlNoise()` 将时间误传为 octaves 导致 canvas 连续报错的问题。
- `npm test` 固定为 `node --test tests/*.test.mjs`，避免 Node 递归扫描 `回收站/` 的旧测试副本。
- 正式 `tests/` 已恢复内容、渲染、研究页、样式、注释热点交互、朝代入口一致性、段内节点切换与独立朝代页资源断言，当前覆盖 29 项。

## 2026-05-23

- 首页主叙事已从单一栏目专题回退为总站门户，不再由茶具、咖啡具或艺术品任一单独接管首页。
- `js/siteContentUnified.js` 现在是唯一正式运行态内容总装层：首页 Hero、首页导览、栏目总览、资料台账、重点对象、资料网络、时间脉络、术语索引、工艺图谱和器物栏目都由这一层统一组装。
- 首页一级“专题分发”已移除：不再输出 `featured-research`、`home-reading` 或研究索引区块；专题页继续只作为分类页进入后的二级阅读层。
- 首页资料台账现已清洗为官方来源数据：British Museum、The Met、V&A、UNESCO、UNESCO WHC 以及现代器具官方页面统一并入 `sourceDeck`，并通过首页共享详情面板展开。
- 艺术品页在总装层补齐了 `detailDeck`、`researchLedger` 与 `看共享详情` 入口；其他分类页继续复用既有 detail deck、资料台账和延伸研究结构。
- `README.md`、`docs/architecture.md`、`docs/api.md` 与 `docs/plans/2026-05-23-home-portal-refresh.md` 已同步到总站首页的真实行为。

## 2026-05-21

- 首页从品牌导语页扩展为研究导览页，新增青花历史时间线、景德镇背景面板、研究索引和术语卡。
- 新增 `research.html` 作为研究专题详情页，专题条目通过 `?id=` 参数进入并带有找不到条目时的兜底页面。
- 分类页从浅层栏目页扩展为专题页，新增相关历史节点、相关术语和延伸研究模块。

## 2026-05-22

- 移除了整页固定背景图和相关漂移动效，页面底层改回轻量纸面渐变，避免装饰层压住研究阅读层。
- 分类页保留关键词与页内跳转，但这些入口已收进页头文字工具区，避免删图后留下空的视觉占位。
