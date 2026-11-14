# CHANGELOG 归档：2026-09-30 及以前

当前记录在根目录 [CHANGELOG.md](../../CHANGELOG.md)。

## 2026-09-15

### 新增

- 同步第 078 期 `medical-ai-hospital-budget` 双源元数据与 WebP 封面，2026-09-15 19:00 公开。

## 2026-09-09

### 工程

- 新增 `scripts/check-content-consistency.mjs` 接入 `npm test`，校验双源字段、公众号域名、图片存在、跨库 slug。
- build 脚本改为 `astro build` 前清 `public/pagefind`，本地 Pagefind 分片由 132 降至 33。
- `check-public-output.mjs` 删除三处写死的 `cordis-context-ledger`，改为归档页覆盖 `posts.ts` 全部 href。

### 文档

- `AGENTS.md` 加文档地图、去重 cover/WebP 规约、删 Astro 样板、改 `~/github/writing-craft`、写明 slug 口径与四步验证。
- `docs/maintenance.md` 修正文件名示例、封面 `object-fit: contain` 说明与 `wechat-logo.jpg` 备份注记。
- `CHANGELOG.md` 07-30「文档」小节压成 3 条，08-27 条后加旧期号 slug 注记。

### 内容

- 确立公众号版为正文事实源，自首次提交 `4878df5` 起分叉的 6 篇正文逐字对齐公众号版，规则写入 `AGENTS.md`。
- 加断言「文章页恰好一个 `<h1>`」，删除六篇正文首行与 `title` 重复的 `# 标题`。
- 页眉「公众号」短链 `weixin.qq.com/r/mp/...` 改为可聚焦按钮，加断言禁止此类短链。
- 回填第 108 期 `wechat`（`https://mp.weixin.qq.com/s/ncUE_SVwpa-ddvvaPuyN3Q`），`publishAt` 由 21:00 改为实测 19:00（双源），14 篇 `wechat` 齐全。
- 2023 篇删两句「后台回复」行为召唤，2022/2023 篇删公众号落款，「本公众号」改「这个博客」。
- `archive/2023-chatgpt-traditional-nlp/image-001.webp` 由 720 裁到 624 像素高（28.4KB→27.2KB），去掉定位与时间戳行。

## 2026-09-08

### 维护

- 实测线上 `https://zenine.github.io/lanposui-blog/rss.xml` 含 14 个 item，删除 148—150 RSS 缺失待办。
- `check-public-output.mjs` 加固：`js` 类改由 `site.js` 添加，加脚本存活断言，覆盖文章页，修三条假断言。
- 完成 67 处产物断言消融（27 次中 12 抓到 15 逃逸），报告 `docs/assertion-ablation-2026-09-08.md`。
- 三份审阅（2026-09-04 全量、2026-09-05 跨库、2026-09-05 文档）未决条目去重并入 `TODO.md`，源文件删除。

## 2026-09-07

### 维护

- 回填第 148、149、150 期 `wechat` 链接（md 与 `src/data/posts.ts` 双源），来源说明改为已发布。

## 2026-08-27

### 新增

- 同步 148—150 期三篇，`publishAt` 分别为 2026-08-27、2026-08-30、2026-09-02 19:00，图转 WebP，纯语义 slug。

### 维护

- 定时发布改为详情页与 OG 图始终生成、列表按 `data-publish-at` 运行时隐藏，RSS 构建时过滤。
- 077、148、149、150 改纯语义路径，旧期号路径登记重定向。（本文件更早条目的期号 slug 如 `077-medical-ai-benchmark`、`100-open-models-negotiation` 均已重定向，见 `astro.config.mjs` 的 `redirects`。）
- 回填 077 期公众号正式链接。

## 2026-08-22

### 新增

- 同步第 077 期 `077-medical-ai-benchmark`，`publishAt` 为 `2026-08-22T12:53:28+08:00`，封面转 WebP。

### 维护

- 首页两处主封面、文章页封面与归档缩略图由 `object-fit: cover` 改 `contain`（`6f82d32`），`check-public-output.mjs` 加断言。

## 2026-08-11

### 新增

- 同步第 100 期 `100-open-models-negotiation`，含公众号链接与 2026-08-10 21:07 发布时间，图转 WebP。

## 2026-08-06

### 维护

- 从公众号抓回 2022、2023 两篇旧文配图入 `public/images/archive/`，替换正文 12 处图片占位，GIF 保留原格式。
- OG 模板蓝弧由 `translate(830 320) scale(2)` 改为 `translate(810 320) scale(2)`，右缘 1218px→1198px，加边界断言。
- `check-public-output.mjs` 去掉写死的归档年份 `2021 / 2026` 与正文图宽度，改为通用断言。
- 清理 `TODO.md` 中 004/005 发布触发与 001/003/004/005 公众号链接等已过期待办。
- 第 003 期补 `wechat`（实测发送 2026-08-01 09:00），本仓 `date: "2026-08-01"` 保持不变。
- 补齐 8 篇 `wechat`：001/004/005 及 2022、2023 篇新增，002 与 2021 篇换为标准文章链接。
- 第 001 期 `date` 由 `2026-07-30` 更正为实测 `2026-07-24`（20:42），确立以平台实测时间为准。
- 第 005 期 `publishAt` 由 `2026-08-06T21:00:00+08:00` 改为 `T08:00:00+08:00`。
- 同步 `src/data/posts.ts` 中 005 `publishAt`、001 `date` 与 7 条 `wechat`，修复 005 缺 JSON-LD。

## 2026-08-04

### 新增

- 预置第 004 期正文、封面与「五层资产地图」图，`publishAt` 为 `2026-08-04T21:00:00+08:00`。
- 预置第 005 期正文与 WebP 封面，`publishAt` 为 `2026-08-06T21:00:00+08:00`。

### 维护

- 第 004 期两图转为 `004-five-layer-assets-cover.webp`、`004-five-layer-assets-map.webp` 入库。
- `src/data/posts.ts` 加入第 004 期，覆盖首页、列表、分类、合集、RSS 与推荐。
- 发布过滤改为优先按 `publishAt` 精确时间，未写则按北京时间当天 00:00。
- 不用 GitHub Actions cron，未来文章靠手动、推送或外部流程触发构建后露出。
- 首页「已发布」主卡复用封面填充留白，后改为展示次新文章，均加对应断言。
- 文章页正文后新增分享区（复制链接、系统分享、公众号入口），加控件断言。
- 新增构建期定时发布过滤，workflow 保留推送与手动触发入口。
- `AGENTS.md` 补充 `writing-craft` 跨库同步规则（正文清洗、元数据、图片、WebP、验证）。

## 2026-08-03

### SEO

- 新增 Google Search Console HTML 验证文件并纳入产物检查。
- Search Console 完成站点验证，首页实际网址测试通过，维护手册补 sitemap 与网址检查流程。

## 2026-08-01

### 新增

- 新增第 003 期正文、封面与「五动作责任链」图，`date` 为 `2026-08-01`，09:00 定时发布。

## 2026-07-31

### 前端美化与交互升级

- 新增三态主题切换（跟随 / 浅色 / 深色），localStorage 记忆，防闪烁，hover 阴影改走 token 变量。
- 首页最新文章卡限制封面高度，主题按钮显示状态文案，加对应断言。
- 首页 Hero 蓝弧描边生长与碎片漂移动画（2.3–3.1s），`prefers-reduced-motion` 下静止。
- 主导航当前栏目 `aria-current="page"` 高亮，hover 下划线改为 `--arc-tick` 弧刻度。
- 代码块用 shiki 双主题（github-light / github-dark），`pre` 右上角加复制按钮。
- 文章页新增 TOC：rehype-slug 锚点，≥1200px 右侧 sticky 高亮，窄屏折叠 `<details>`。
- 封面与正文图构建期写入 `width`/`height`（`imageDims()`、rehype 插件），正文图加灯箱。
- 归档页按年份分组，有封面的文章行内展示 120px 缩略图。
- 全站接入 View Transitions（`<ClientRouter />`），交互脚本收口到 `src/scripts/site.js`。
- 各区块新增 `data-reveal` 滚动显现，页脚新增「最近更新于」与 RSS 引导。
- 新增 `src/pages/og/[slug].png.ts` 构建期生成 1200×630 OG 图，字体缺失时退化为品牌弧。
- 新增 devDependencies：rehype-slug、rehype-autolink-headings、sharp、image-size。
- `check-public-output.mjs` 扩展主题、阴影、显现、灯箱、目录、OG 图、图片宽高等断言。
- Markdown 处理迁移到 `@astrojs/markdown-remark` `unified()` processor，消除弃用警告。

## 2026-07-30

### QA 修复与打磨

- 静态审计 sitemap 19 个 URL 均返回 200，各页 title / description 唯一。
- 微信相关链接由 `http://` 改为 `https://`，页脚新增公众号二维码入口。
- 首页封面加 `fetchpriority="high"`，阅读进度弧在内容不足一屏时不显示满弧。
- 新增 favicon 品牌弧候选 `public/favicon-arc.svg`（未启用）；域根 robots.txt 暂缓。
- `check-public-output.mjs` 新增无 `http://`、页脚二维码、首页 `fetchpriority` 断言。

### SEO 优化

- 四张大图 PNG 转 WebP，公开图片总量约 6.6MB 降到 672KB，旧 PNG 移出仓库。
- `astro.config.mjs` 内联 rehype 插件给正文图加 `loading="lazy"` 与 `decoding="async"`。
- 结构化数据作者改为 `ZENINEXU`，文章页补 `dateModified` 与 BreadcrumbList，首页加 WebSite + Person。
- 新增 `src/pages/404.astro`，`check-public-output.mjs` 扩展 SEO 断言，站外提交事项记入 `TODO.md`。

### 视觉与交互

- 新增「蓝破碎半圆」签名视觉：页眉品牌弧、首页 Hero 碎裂大弧、kicker 小弧刻度。
- 文章页新增阅读进度弧与「约 N 分钟」阅读时长。
- 新增跟随系统的暗色模式（含 `theme-color` 双值），页脚改深蓝墨色全宽色带。
- 卡片、列表行、导航补齐 hover 与 `:focus-visible`，`::selection` 用品牌蓝。
- 色板删 `--paper-2` / `--ochre` / `--green`，字体栈整理为 `--serif` / `--sans` / `--mono`。
- 正文补 `blockquote`、表格、代码块、`figcaption` 样式，Pagefind 配色接入站点变量。
- `check-public-output.mjs` 扩展品牌弧、色带、进度弧、暗色模式等视觉断言。

### 新增

- 初始化 Astro 博客仓库，新增首页、文章列表、文章布局与 GitHub Pages 部署工作流。
- 同步第 001、002 期文章与配图，发布地址 `https://zenine.github.io/lanposui-blog/`。
- 从 `writing-craft` 同步 2021、2022、2023 三篇旧文，不同步 `2024-05-19-如何用GPT挑选西瓜`。
- 删除《ChatGPT最新课程：图灵奖最强粉丝亲自下场教你写Prompt Engineering》公开展示。
- 导航「公众号」悬停 / 聚焦浮出二维码，首页与列表不展示文章编号与旧文标签。
- 引入内容集合、RSS、sitemap、robots、Pagefind、分类页、合集页与相关推荐。
- 调整全站视觉为冷白纸面配蓝色，部署 workflow 改为运行 `npm test`。

### 文档

- README 定稿为读者版，维护细节迁往 `docs/maintenance.md`，作者介绍补医疗 AI 视角。
- 页眉与 favicon 用公众号 Logo（favicon 带版本参数），展示 `ZENINEXU` 作者标识。
- 导航与页脚增加 GitHub 入口。
