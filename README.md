# fishingKiln

渔窑手工青花静态站，现已重构为内容杂志型品牌站。

## Local Preview

1. Run `npm test`
2. Run `npm run preview`
3. Open [http://127.0.0.1:4317](http://127.0.0.1:4317)

## Project Structure

- `index.html`: 首页入口，包含品牌、工艺、器物导览和资料札记
- `tea.html` / `tableware.html` / `coffee.html` / `vase.html` / `art.html`: 分类栏目页
- `about.html`: 品牌手册页
- `css/`: 拆分后的基础样式、布局、组件和页面样式
- `js/siteContent.js`: 全站结构化内容入口
- `js/content/`: 首页、分类页、关于页和资料内容数据
- `js/renderers.js`: 页面渲染逻辑
- `js/interactions.js`: 标签切换、步骤切换和资料对话框交互
- `data/research/`: 本地研究资料摘要
- `img/research/`: 联网补充后的研究图片
- `tests/`: 站点内容和渲染测试
- `scripts/serve-local.cjs`: 本地静态预览服务
