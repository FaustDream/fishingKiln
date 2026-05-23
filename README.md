# fishingKiln

渔窑手工青花静态站。当前运行态已收束为一个总站式首页：`index.html` 负责组织青花历史、景德镇系统、馆藏来源、重点对象与五类器物栏目入口；`tea.html`、`tableware.html`、`coffee.html`、`vase.html`、`art.html` 继续承担二级专题页和资料深读；`research.html` 负责专题详情。

## Local Preview

1. Run `npm test`
2. Run `npm run preview`
3. Open [http://127.0.0.1:4318](http://127.0.0.1:4318) for the current verified preview

## Project Structure

- `index.html`: 总站首页，整合首页导览、栏目总览、资料台账、重点对象、资料网络、时间脉络、术语索引、工艺图谱与器物栏目入口
- `tea.html` / `tableware.html` / `coffee.html` / `vase.html` / `art.html`: 五个器物栏目页，保留各自的深读结构、共享详情与延伸研究
- `research.html`: 研究专题详情页，承接分类页进入后的连续阅读
- `about.html`: 品牌手册页
- `css/`: 基础样式、布局、组件与页面样式
- `js/siteContentUnified.js`: 当前正式运行态内容总装层，统一组装首页与各分类页数据
- `js/siteContent*.js` / `js/siteContentPortal.js` / `js/teaPortalContent.js`: 兼容旧入口文件名，统一转发到 `js/siteContentUnified.js`
- `js/content/`: 首页基础数据、分类页数据、关于页与研究专题数据
- `js/renderers.js`: 首页、分类页与研究详情页渲染逻辑，包含首页共享内嵌详情组件
- `js/interactions.js`: 标签切换、首页详情联动、研究筛选、折叠区与视区动效初始化
- `tests/`: 内容、渲染与样式回归测试
- `scripts/serve-local.cjs`: 本地静态预览服务

## Homepage Model

- 首页不再承接任何单一分类专题，不再提供一级专题导航。
- 首页一级结构固定为：
  - 首页导览
  - 栏目总览
  - 资料台账
  - 重点对象
  - 资料网络
  - 时间脉络
  - 术语索引
  - 工艺图谱
  - 器物栏目
- 首页中的资料台账、重点对象、时间线节点和术语卡共用一套内嵌详情面板，不使用弹窗。
- 分类页继续作为二级深读入口，专题页只通过分类页延伸研究或关联入口进入。

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

- 首页现在是总站门户，不再被茶具、咖啡具、艺术品等任一单一栏目接管。
- 官方来源数据已被清洗进首页台账、重点对象和机构来源卡，首页可以直接展开内嵌详情。
- 各分类页继续保留各自的 detail deck、资料台账和延伸研究，保证首页到分类页再到专题页的阅读连续性。
