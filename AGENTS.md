## 文档地图

| 要做什么 | 看哪里 |
| --- | --- |
| 同步 / 新增文章的具体步骤 | `docs/maintenance.md` 「手动更新文章」 |
| 验证改动 | `npm test`（四步链路见下方「工程与视觉规范」） |
| 待办与待决策 | `TODO.md`（唯一待办入口） |
| 已完成事项与历史决策 | `CHANGELOG.md` |
| 面向读者的项目介绍 | `README.md` |
| 断言能防住什么、防不住什么 | `docs/assertion-ablation-2026-09-08.md` |

## Project Rules

本仓库是公开博客发布层。不要把 `writing-craft` 的草稿、审读意见、库内编辑附录、TODO、Prompt、私有素材、客户 / 公司细节或未核实投资内容直接复制进来。

文章从 `writing-craft` 同步时，只同步已经确认公开的正文和必要图片。发布前必须删除“库内编辑附录”，并复核图片路径、外链、个人信息和事实口径。

## 与 writing-craft 的同步流程

- `writing-craft` 是写作源和私有归档库，默认路径为 `~/github/writing-craft`；本仓库只做公开展示层。后续即使用户从 `writing-craft` 语境要求“同步到博客”“发布到博客”“更新公开博客”，也应回到本仓库完成公开层改动和验证。
- **正文事实源：公众号版为准**（2026-09-09 用户裁决）。同一篇文章的公开正文以**公众号实际发出的文字**为唯一事实源，其归档副本是 `writing-craft/published/<日期>-<标题>.md`（已核实：抓取公众号线上原文与该副本逐句吻合）。同步到本仓库时**逐字复制正文，不做博客化改写**——不改开篇、不改小标题、不改比喻、不改术语注释。只有下列发布层元素例外：
  1. frontmatter 整块按本仓库规则写（`layout` / `cover` / `publishAt` / `wechat` / `description` 等），不照抄写作库的 frontmatter；
  2. 删掉公众号版正文首行的 `# 标题`——本仓库由 `PostLayout.astro` 渲染 `<h1>`，保留会造成双 H1（检查脚本已有「每个文章页恰好一个 h1」断言）；
  3. 删掉正文内嵌的封面图——封面由 frontmatter `cover` 渲染，保留会重复出现；
  4. 图片路径改写为 `/lanposui-blog/images/<名>.webp`，写作库侧的 `../images/<名>.png` 不能直接搬；
  5. 可在文末追加本仓库特有的「## 延伸阅读」站内链接小节——公众号没有也不可能有站内链接。
  历史包袱已清：2026-09-09 已把 6 篇分叉正文回退对齐到公众号版（此前 7 对可配对文章中 6 对正文不同，最大一篇整篇重写）。此后若发现两边不一致，一律以公众号线上原文为准修改本仓库，不要反向改写作库。

- 同步前必须先读取 `writing-craft/AGENTS.md`、`writing-craft/README.md`，以及目标草稿 / 已发布文件；只取确认公开的标题、摘要、正文、公开链接和必要图片。不要同步原始素材区、审读意见、Prompt、库内编辑附录、发布跟踪 TODO、本机路径、客户 / 公司细节、家庭材料、投资未核实内容或任何私有上下文。
- 正文处理顺序：先在 `writing-craft` 中确认公开版已经删去“库内编辑附录（公众号发布前删除）”等内部段落，再按上一条逐字复制到 `src/content/articles/<slug>.md`；保留作者原文自称和正文表达，不为了结构化数据统一作者而改写正文里的“Azen”等原文。
- 元数据处理顺序：同步或新增文章时，同时维护 Markdown frontmatter 和 `src/data/posts.ts`。两侧 `cover` 前缀规则不同，见下方「工程与视觉规范」的双源字段一条。公众号平台链接暂时没有时不伪造，留空并同步写入 `TODO.md`。
- 定时发布口径：可提前把未来文章同步进本公开仓库；`date` 写计划公开日，若需要精确到小时则同时写 `publishAt: "YYYY-MM-DDTHH:mm:ss+08:00"`。文章详情页、OG 图在构建时**始终生成**（无论 publishAt 是否到达）；列表页（首页、文章列表、分类、合集、相关推荐）通过客户端 JavaScript 按 `data-publish-at` 时间戳在运行时隐藏未到时间的文章，到达 publishAt 后读者刷新页面即可见，**不需要二次构建**。RSS 仍在构建时按 publishAt 过滤，避免订阅者提前收到。未写 `publishAt` 的文章按北京时间当天 00:00 视为已发布。

## 图片归档与公开使用

- `writing-craft/images/` 保存写作源图片、可复用母版、生成原图和正文图；图片 Prompt、用途、比例和生成记录留在 `writing-craft` 对应草稿的“视觉方案与生成 Prompt（库内使用）”小节，不复制到本公开仓库。
- 同步到本仓库时，只复制最终采用且确认可公开的图片到 `public/images/`。封面按约 1.82 宽高比准备；正文解释图只在确实承载关系或结构信息时同步，不把库内过程图、Prompt 图、未定稿候选图或私有截图带进公开层。
- 源 PNG / SVG 是否保留在 `writing-craft/images/` 由写作库负责，本仓库优先保存公开展示所需的 WebP 成品；体积规约见下方「工程与视觉规范」。
- 站内图片引用规则见下方「工程与视觉规范」的双源字段一条；不要引用 `writing-craft` 的本机绝对路径、Obsidian 附件路径或私有仓库相对路径。
- 图片入库后必须运行 `npm test`，确认构建期宽高、懒加载、Pagefind 和公开产物断言通过；若新增文章，部署后还要确认 sitemap 包含新 URL，并按 TODO 中的搜索引擎提交项更新状态。

## 工程与视觉规范（2026-07-30 确立，持续更新）

- 验证入口是 `npm test`，四步：`scripts/check-scheduled-publishing.mjs`（定时发布过滤）→ `scripts/check-content-consistency.mjs`（双源字段、公众号链接格式、图片存在性、跨库 slug）→ `npm run build`（astro build + pagefind + 回拷）→ `scripts/check-public-output.mjs`（产物断言）。改动行为先在检查脚本加断言、确认失败，再实现。提交信息不加任何 AI 署名。
- 签名视觉「蓝破碎半圆」的叙事方向是**半圆碎掉**（完整蓝色半圆自左向右碎裂散开），不是"碎片拼成半圆"；用户已拍板，改图前先确认。品牌弧出现在页眉、首页 Hero、kicker 刻度、404 页、文章页阅读进度弧。
- 色板、字体栈、暗色模式变量集中在 `src/layouts/BaseLayout.astro` 的 `:root` 与暗色覆写块；**新增颜色一律走 CSS 变量，不写死色值**，否则暗色模式会漏。蓝色是唯一强调色。
- 新增或修改文章要同时维护 Markdown（`src/content/articles/`）和 `src/data/posts.ts` 双份数据；`cover` 路径前缀两处不同（md 用 `/lanposui-blog/images/...`，posts.ts 用 `/images/...`）。文章修订可加 frontmatter `updated: "YYYY-MM-DD"`。
  - **`date`、`publishAt`、`wechat` 同属双源字段，改一处必须改两处**。分工是：md frontmatter 决定文章页正文渲染，`posts.ts` 决定首页 / 列表 / 分类 / RSS / **JSON-LD 结构化数据**。只改 md 会得到一个「页面能打开但没有任何结构化数据」的半残页面——2026-08-06 第 005 期即因此触发 `npm test` 的 `missing "name":"ZENINEXU"`。
  - 调整发布时间后应立即跑一次 `npm test`，确认双源一致性和构建通过。
- **文章 slug 不带期号前缀**（2026-08-25 起的口径），用纯语义英文短横线命名，如 `medical-ai-benchmark`。**改动或新增 slug 时，旧路径必须在 `astro.config.mjs` 的 `redirects` 里登记**，否则已发出的公众号链接和站外索引会 404；`writing-craft` 侧引用旧期号 slug 时同理，`scripts/check-content-consistency.mjs` 会把未登记的跨库 slug 报为警告。
- 每次新发布文章后，收尾必须更新搜索引擎提交状态：确认 sitemap 已包含新文章 URL，部署后在 Google Search Console 提交或刷新 `https://zenine.github.io/lanposui-blog/sitemap-index.xml`（必要时直接提交 `https://zenine.github.io/lanposui-blog/sitemap-0.xml`），并用“网址检查”请求新文章 URL 编入索引；若 Bing 站长工具已启用，也同步提交 sitemap。
- 图片超过约 150KB 先转 WebP（封面按 1.82 宽高比出图），转换命令见 `docs/maintenance.md`；正文图片构建期自动懒加载，不需要手写属性。
- 结构化数据作者实体统一为 `ZENINEXU`（`src/data/blog.ts` 的 `site.author`）；文章正文里作者的原文自称（如"Azen"）属于素材原文，**不得改写**。
- 文档分工：根 `README.md` 面向读者，维护细节在 `docs/maintenance.md`；收尾时同步 `TODO.md` 与 `CHANGELOG.md`（文件名日期后缀用完整 `YYYY-MM-DD`）。

## 本地开发

- 本仓库没有全局 `astro`，命令一律走 npm：`npm run astro -- dev --background`。启停与日志见 `docs/maintenance.md`。
