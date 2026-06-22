# fishingKiln

渔窑手工青花静态站。当前运行态以 `index.html` 的粒子首屏和唐、宋、元、明、清五段朝代叙事作为总站入口；`tea.html`、`tableware.html`、`coffee.html`、`vase.html`、`art.html` 继续承担二级专题页和资料深读；新增的朝代器物页负责从首页叙事直接落到具体器类。

## Local Preview

1. Run `npm test`
2. Run `npm run preview`
3. Open [http://127.0.0.1:4317](http://127.0.0.1:4317) for the current verified preview

## Project Structure

- `index.html`: 总站首页，渲染青花粒子首屏、竖排诗词覆盖层、五朝滚动叙事、朝代侧边导航与朝代背景切换
- `tea.html` / `tableware.html` / `coffee.html` / `vase.html` / `art.html`: 五个器物栏目页，保留各自的深读结构、共享详情与延伸研究
- `tang-*.html` / `song-*.html` / `yuan-*.html` / `ming-*.html` / `qing-*.html`: 独立朝代器物页，承接首页五朝叙事和导航子入口
- `research.html`: 研究专题详情页，承接分类页进入后的连续阅读
- `css/`: 基础样式、布局、组件与页面样式
- `css/artifacts.css`: 分类页增强样式、朝代背景层、粒子首屏和段内子导航样式
- `js/siteContentUnified.js`: 当前正式运行态内容总装层，统一组装首页与各分类页数据
- `js/siteContent*.js` / `js/siteContentPortal.js` / `js/teaPortalContent.js`: 兼容旧入口文件名，统一转发到 `js/siteContentUnified.js`
- `js/content/`: 首页基础数据、分类页数据、关于页与研究专题数据
- `js/renderers.js`: 首页、分类页与研究详情页渲染逻辑，当前首页由 `renderHome()` 组装五朝叙事
- `js/interactions.js`: 标签切换、研究筛选、折叠区、朝代滚动高亮、探索面板与粒子首屏初始化
- `js/particle-hero.js`: 首页青花墨韵粒子画布
- `tests/`: 内容、渲染与样式回归测试
- `scripts/serve-local.cjs`: 本地静态预览服务

## Homepage Model

- 首页不再承接任何单一分类专题。
- 首页首屏为 `hero-section--particle`，由 `PorcelainParticleHero` 生成 canvas，并叠加竖排《扬州慢》文本。
- 首页主体由 `home.timeline` 聚合为唐、宋、元、明、清五段 `era-section`。
- 每段朝代叙事包含器物图、段内节点按钮、工艺要点、相关术语、探索面板和朝代器物页入口。
- 首页右侧或移动端底部输出 `era-nav`，滚动时同步高亮当前朝代并切换 `era-bg-layer`。
- 分类页继续作为二级深读入口，专题页通过分类页延伸研究或关联入口进入。

## Data Sources

- [British Museum Collection](https://www.britishmuseum.org/collection)
- [The Metropolitan Museum of Art Collection](https://www.metmuseum.org/art/collection)
- [The Met Essay: Chinese Export Porcelain](https://www.metmuseum.org/essays/east-and-west-chinese-export-porcelain)
- [V&A: Chinese blue and white ceramics](https://www.vam.ac.uk/articles/chinese-blue-and-white-ceramics)
- [UNESCO Creative Cities: Jingdezhen](https://www.unesco.org/en/creative-cities/jingdezhen)
- [UNESCO WHC: Imperial Kiln Sites of Jingdezhen](https://whc.unesco.org/en/tentativelists/6265/)
- [NCA: Pour-Over Coffee](https://www.aboutcoffee.org/brewing/pour-over-coffee/)
- [Hario V60 02](https://www.hario-usa.com/products/v60-ceramic-coffee-dripper-02-white)

## Current Focus

- 首页运行态已转为粒子首屏加五朝叙事，旧资料门户字段仍在 `siteContent.home` 中保留给后续恢复或复用。
- 朝代器物页已接入主导航子入口，当前覆盖 23 个独立 HTML 页面。
- `npm test` 固定只运行 `tests/*.test.mjs`，避免误扫 `回收站/` 里的旧测试副本。
