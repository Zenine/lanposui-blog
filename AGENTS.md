## Project Rules

本仓库是公开博客发布层。不要把 `writing-craft` 的草稿、审读意见、库内编辑附录、TODO、Prompt、私有素材、客户 / 公司细节或未核实投资内容直接复制进来。

文章从 `writing-craft` 同步时，只同步已经确认公开的正文和必要图片。发布前必须删除“库内编辑附录”，并复核图片路径、外链、个人信息和事实口径。

## 与 writing-craft 的同步流程

- `writing-craft` 是写作源和私有归档库，默认路径为 `/Users/zeninexu/github/writing-craft`；本仓库只做公开展示层。后续即使用户从 `writing-craft` 语境要求“同步到博客”“发布到博客”“更新公开博客”，也应回到本仓库完成公开层改动和验证。
- 同步前必须先读取 `writing-craft/AGENTS.md`、`writing-craft/README.md`，以及目标草稿 / 已发布文件；只取确认公开的标题、摘要、正文、公开链接和必要图片。不要同步原始素材区、审读意见、Prompt、库内编辑附录、发布跟踪 TODO、本机路径、客户 / 公司细节、家庭材料、投资未核实内容或任何私有上下文。
- 正文处理顺序：先在 `writing-craft` 中确认公开版已经删去“库内编辑附录（公众号发布前删除）”等内部段落，再复制到 `src/content/articles/<slug>.md`；保留作者原文自称和正文表达，不为了结构化数据统一作者而改写正文里的“Azen”等原文。
- 元数据处理顺序：同步或新增文章时，同时维护 Markdown frontmatter 和 `src/data/posts.ts`。Markdown 的 `cover` 使用 `/lanposui-blog/images/...`；`src/data/posts.ts` 的 `cover` 使用 `/images/...`。公众号平台链接暂时没有时不伪造，留空并同步写入 `TODO.md`。
- 定时发布口径：可提前把未来文章同步进本公开仓库；`date` 写计划公开日，若需要精确到小时则同时写 `publishAt: "YYYY-MM-DDTHH:mm:ss+08:00"`。构建期按当前时间过滤，优先按 `publishAt` 判断，未写 `publishAt` 的文章按北京时间当天 00:00 露出。提前提交到公开仓库意味着源码可见，但发布时间到达前的构建不会产出站点入口、RSS、sitemap、Pagefind、OG 图或文章路由；发布时间到达后需要一次手动触发或其它外部流程触发构建。

## 图片归档与公开使用

- `writing-craft/images/` 保存写作源图片、可复用母版、生成原图和正文图；图片 Prompt、用途、比例和生成记录留在 `writing-craft` 对应草稿的“视觉方案与生成 Prompt（库内使用）”小节，不复制到本公开仓库。
- 同步到本仓库时，只复制最终采用且确认可公开的图片到 `public/images/`。封面按约 1.82 宽高比准备；正文解释图只在确实承载关系或结构信息时同步，不把库内过程图、Prompt 图、未定稿候选图或私有截图带进公开层。
- 图片超过约 150KB 先转 WebP；源 PNG / SVG 是否保留在 `writing-craft/images/` 由写作库负责，本仓库优先保存公开展示所需的 WebP 成品。转换命令和路径规范见 `docs/maintenance.md`。
- 站内图片引用规则：Markdown 正文和 frontmatter 使用 `/lanposui-blog/images/...`；`src/data/posts.ts` 使用 `/images/...`；不要引用 `writing-craft` 的本机绝对路径、Obsidian 附件路径或私有仓库相对路径。
- 图片入库后必须运行 `npm test`，确认构建期宽高、懒加载、Pagefind 和公开产物断言通过；若新增文章，部署后还要确认 sitemap 包含新 URL，并按 TODO 中的搜索引擎提交项更新状态。

## 工程与视觉规范（2026-07-30 确立）

- 验证入口是 `npm test`（构建 + Pagefind + `scripts/check-public-output.mjs` 产物断言）。改动行为先在检查脚本加断言、确认失败，再实现。提交信息不加任何 AI 署名。
- 签名视觉「蓝破碎半圆」的叙事方向是**半圆碎掉**（完整蓝色半圆自左向右碎裂散开），不是"碎片拼成半圆"；用户已拍板，改图前先确认。品牌弧出现在页眉、首页 Hero、kicker 刻度、404 页、文章页阅读进度弧。
- 色板、字体栈、暗色模式变量集中在 `src/layouts/BaseLayout.astro` 的 `:root` 与暗色覆写块；**新增颜色一律走 CSS 变量，不写死色值**，否则暗色模式会漏。蓝色是唯一强调色。
- 新增或修改文章要同时维护 Markdown（`src/content/articles/`）和 `src/data/posts.ts` 双份数据；`cover` 路径前缀两处不同（md 用 `/lanposui-blog/images/...`，posts.ts 用 `/images/...`）。文章修订可加 frontmatter `updated: "YYYY-MM-DD"`。
  - **`date`、`publishAt`、`wechat` 同属双源字段，改一处必须改两处**。分工是：md frontmatter 决定文章页正文渲染，`posts.ts` 决定首页 / 列表 / 分类 / RSS / **JSON-LD 结构化数据**。只改 md 会得到一个「页面能打开但没有任何结构化数据」的半残页面——2026-08-06 第 005 期即因此触发 `npm test` 的 `missing "name":"ZENINEXU"`。
  - 该类不一致在文章未到 `publishAt` 时**不会被测试发现**（页面根本不生成，断言循环遍历不到），只会在上线当天暴露。因此调整发布时间后应立即跑一次 `npm test`，不要等部署。
- 每次新发布文章后，收尾必须更新搜索引擎提交状态：确认 sitemap 已包含新文章 URL，部署后在 Google Search Console 提交或刷新 `https://zenine.github.io/lanposui-blog/sitemap-index.xml`（必要时直接提交 `https://zenine.github.io/lanposui-blog/sitemap-0.xml`），并用“网址检查”请求新文章 URL 编入索引；若 Bing 站长工具已启用，也同步提交 sitemap。
- 图片超过约 150KB 先转 WebP（封面按 1.82 宽高比出图），转换命令见 `docs/maintenance.md`；正文图片构建期自动懒加载，不需要手写属性。
- 结构化数据作者实体统一为 `ZENINEXU`（`src/data/blog.ts` 的 `site.author`）；文章正文里作者的原文自称（如"Azen"）属于素材原文，**不得改写**。
- 文档分工：根 `README.md` 面向读者，维护细节在 `docs/maintenance.md`；收尾时同步 `TODO.md` 与 `CHANGELOG.md`（文件名日期后缀用完整 `YYYY-MM-DD`）。

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
