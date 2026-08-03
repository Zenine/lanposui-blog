# CHANGELOG

## 2026-08-03

### SEO

- 新增 Google Search Console HTML 验证文件，并把验证文件纳入构建产物检查；部署后可在 Search Console 完成站点验证并提交 sitemap。
- Google Search Console 已完成站点验证；首页实际网址测试通过，确认允许抓取且可编入索引；维护手册补充新文章发布后的 sitemap 刷新和网址检查流程。

## 2026-08-01

### 新增

- 新增第 003 期《当 AI 比你更会砍柴，你还剩什么价值？》，同步公开正文、封面主视觉和“五动作责任链”正文解释图；文章日期设为 `2026-08-01`，用于 09:00 定时发布。

## 2026-07-31

### 前端美化与交互升级

- 新增亮 / 暗主题手动切换：页眉三态按钮（跟随系统 / 强制亮 / 强制暗），localStorage 记忆，`<html data-theme>` 驱动，head 内联脚本首绘前防闪烁；暗色变量块复制为 `[data-theme="dark"]` 选择器，系统态仍由媒体查询兜底；同步维护 `theme-color` meta；深色下卡片 hover 阴影加深并叠加蓝色微光（新增 `--shadow-feature` / `--shadow-hover` / `--shadow-qr` token，全站 hover 阴影统一走变量）。
- 主题切换按钮由纯图标改为图标 + 当前状态文案，避免暗色模式能力不可见；构建产物检查同步断言按钮文案存在。
- 首页最新文章卡片限制封面展示高度，避免首屏右栏被封面撑成过高竖幅；主题切换文案调整为“跟随 / 浅色 / 深色”，降低“黑暗模式”语义歧义。
- 首页 Hero 蓝弧描边生长入场动画（stroke-dashoffset 逐段错峰）+ 碎片小幅循环漂移（2.3–3.1s，1–2px / 0.5°以内），`prefers-reduced-motion` 下全部静止。
- 主导航当前栏目高亮（`aria-current="page"` + 品牌蓝），hover 时下划线改为 `--arc-tick` 弧刻度滑入。
- 代码块升级：shiki 双主题（github-light / github-dark）随主题切换，深色代码底走 `--deep`；正文 `pre` 右上角新增"复制 / 已复制"按钮（原生 JS）。
- 文章页新增目录（TOC）：rehype-slug + rehype-autolink-headings 给 h2/h3 生成锚点（hover 显示 #）；宽屏（≥1200px）右侧 sticky 目录随滚动高亮当前小节（弧刻度标记），窄屏文首折叠为 `<details>`；目录数据取自内容集合 `render()` 的 headings。
- 图片：封面 / 缩略图构建期写入真实 `width`/`height`（`src/data/blog.ts` 的 `imageDims()`，基于 image-size），正文 Markdown 图片由 rehype 插件自动补宽高，消除 CLS；正文图片新增轻量灯箱（点击全屏、ESC / 点背景关闭，原生 JS）。
- 归档页按年份分组（mono 年份刻度标题 + 弧刻度），有封面的文章行内展示 120px 缩略图，保留原行 hover 语言。
- 全站接入 Astro View Transitions（`<ClientRouter />`）：主题状态跨导航不闪烁（astro:before-swap 复制 data-theme）；交互脚本统一收口到 `src/scripts/site.js`，经 astro:page-load 重初始化、astro:before-swap 清理监听器；Pagefind 检索初始化同步适配。
- 各区块新增滚动显现（`data-reveal` + IntersectionObserver，无 JS / 减少动态时直接可见）。
- 页脚新增"最近更新于 YYYY-MM-DD"（构建时注入）与 RSS 订阅引导文案。
- 文章页 OG 图构建期自动生成（`src/pages/og/[slug].png.ts`，sharp 光栅化 SVG 模板：标题 + 分类日期 + 蓝破碎半圆母题，1200×630）；中文字体自动探测（PingFang SC / Noto CJK 等），探测不到时退化为纯品牌弧 + 英文标识，任何环境下构建均可通过。
- 新增构建期依赖（均为 devDependencies）：rehype-slug、rehype-autolink-headings、sharp、image-size；无新增运行时依赖、无外链资源。
- 构建产物检查脚本同步扩展：主题切换、阴影 token、页脚构建日期、滚动显现、弧动画、灯箱、复制按钮、归档年份分组与缩略图、文章目录 / 锚点 / OG 图、图片宽高等断言。
- Markdown 处理迁移到 Astro 7 推荐的 `@astrojs/markdown-remark` `unified()` processor 配置，消除 `markdown.rehypePlugins` 弃用警告。

## 2026-07-30

### QA 修复与打磨

- 静态审计全站：sitemap 全部 19 个 URL 返回 200、站内图片无死链、各页 title / description 唯一，未发现功能性 bug。
- 微信相关链接（导航公众号入口、两篇文章公众号原文链）由 `http://` 改为 `https://`。
- 页脚新增公众号二维码入口，解决移动端悬浮二维码不可达（触屏无 hover）的问题。
- 首页封面图加 `fetchpriority="high"`；文章页阅读进度弧在内容不足一屏时不再显示满弧。
- 新增 favicon 品牌弧候选 `public/favicon-arc.svg`（亮暗自适应，未启用，默认仍为公众号 Logo，待审阅）。
- 域根 robots.txt 决策：暂缓（理由与口径见 `TODO.md`「暂缓」）。
- 构建产物检查脚本新增断言：无 `http://` 链接、页脚二维码、首页 `fetchpriority`。

### SEO 优化

- 四张大图（两张封面、判断流程图、一张过往文章配图）由 PNG 转 WebP，公开图片总量约 6.6MB 降到 672KB；站内引用同步更新，旧 PNG 移出仓库。
- 正文 Markdown 图片构建期自动加 `loading="lazy"` 与 `decoding="async"`（`astro.config.mjs` 内联 rehype 插件，新增依赖 `@astrojs/markdown-remark`）；文章页封面按 1.82 宽高比展示，避免布局偏移。
- 结构化数据作者实体统一为 `ZENINEXU`（修正原 `Azen`，文章正文中的原文自称不改）；文章页补 `dateModified`（支持可选 frontmatter `updated`）与 BreadcrumbList；首页新增 WebSite + Person JSON-LD。
- 新增 404 页（`src/pages/404.astro`，品牌弧视觉）。
- 构建产物检查脚本扩展 SEO 断言：404 页、WebP 封面、懒加载、作者实体、面包屑与站点结构化数据。
- SEO 站外事项（Search Console / Bing 提交、百度不可行说明）记入 `TODO.md` 与维护手册。

### 视觉与交互

- 新增「蓝破碎半圆」签名视觉系统：页眉品牌弧（内联 SVG，替换公众号 Logo 图片）、首页 Hero 大弧（完整蓝色半圆自左向右碎裂、弧段位移散开，保留原轮廓虚线残影）、全站 kicker 小弧刻度。
- 文章页新增阅读进度弧（右下角半圆随滚动逐段补全）和"约 N 分钟"阅读时长（构建期按字数计算）。
- 新增暗色模式：跟随系统 `prefers-color-scheme`，深蓝墨色底 + 提亮品牌蓝，含 `theme-color` 双值。
- 页脚改为深蓝墨色全宽色带，收拢页面底部。
- 全站卡片、列表行、导航补齐 hover 与 `:focus-visible` 焦点反馈；动效尊重 `prefers-reduced-motion`；选中文字（`::selection`）使用品牌蓝。
- 色板收敛：移除未使用的 `--paper-2` / `--ochre` / `--green`，蓝色为唯一强调色；卡片底色、分隔线、图片边框统一走 CSS 变量（同时服务暗色模式）。
- 字体栈整理为 `--serif` / `--sans` / `--mono` 变量：补 Windows 回退（SimSun、Microsoft YaHei）；日期、期数、计数改用等宽字体。
- 文章正文补齐 `blockquote`、表格、代码块、`figcaption` 样式；正文重点标注下划线降低透明度。
- 检索页 Pagefind 组件配色接入站点变量，适配暗色模式。
- 构建产物检查脚本同步扩展：断言品牌弧、首页大弧、页脚色带、阅读进度弧、阅读时长、暗色模式/选中色/焦点/hover 样式均已产出。

### 新增

- 初始化 `lanposui-blog` Astro 博客仓库，作为 `writing-craft` 的公开发布层。
- 新增首页、文章列表页、文章布局、GitHub Pages 部署工作流。
- 同步第 001 期和第 002 期公开文章内容及配图；第 002 期已补公众号原文链接。
- 创建 GitHub Pages 配置，发布地址为 `https://zenine.github.io/lanposui-blog/`。
- GitHub Pages 首次部署成功后，已复核线上首页和第 002 期文章页返回 `200`，公开图片路径使用 `/lanposui-blog/images/`。
- 从 `writing-craft` Git 历史同步过往公众号文章：`2021从元开始`、`2022-重拾写作1 —砍柴、放羊与元放羊`、`ChatGPT：都什么年代，谁在搞传统NLP？`。此前明确删除的 `2024-05-19-如何用GPT挑选西瓜` 不同步。
- 按公开展示口径调整过往公众号文章标签，不再使用“历史 / 历史归档”。
- 删除《ChatGPT最新课程：图灵奖最强粉丝亲自下场教你写Prompt Engineering》，不再在博客公开展示。
- 导航栏“公众号”入口支持鼠标悬停和键盘聚焦时浮出公众号二维码。
- 首页和文章列表不再展示文章编号或过往文章标题前标签。
- 引入 Astro 内容集合、RSS、sitemap、robots、Pagefind 检索、分类页、合集页和相关文章推荐。
- 调整全站视觉，使用更清爽的冷白纸面、蓝色和铜绿点缀，并补充页脚导航。
- GitHub Pages 部署 workflow 改为运行 `npm test`，上线前执行构建与公开输出检查。

### 文档

- 更新 README，补充 Node 版本、本地后台开发服务命令、验证入口、内容同步流程、图片路径规范、首页数据维护位置和部署配置说明。
- 新增构建产物检查脚本，验证首页和文章列表包含公众号二维码入口。
- 更新 README，补充首页 Hero、技术架构、博客能力、公众号二维码和部署测试工作流说明。
- 重写 README，整理为站点定位、品牌入口、技术架构、手动更新文章、公开边界、验证和部署流程。
- 更新站点品牌展示，页眉使用公众号 Logo，并展示 `ZENINEXU` 作者标识。
- 合并首页视觉相关提交，保持公开提交历史简洁。
- 增加 GitHub 首页入口，分别放在顶部导航和页脚导航。
- 调整 README 职责：根 README 改为面向读者的公开介绍，项目维护说明迁移到 `docs/maintenance.md`。
- 根据个人公开定位补充 README 中的作者介绍，强调医疗健康 AI、医疗大数据、大模型应用架构和工程化交付视角。
- 更新浏览器 favicon 为公众号 Logo，并为 favicon 链接增加版本参数以刷新缓存。
