# TODO

按优先级排序（2026-07-30 梳理，2026-08-04 增补第 004 期同步项）。

## P1 · 需用户登录操作

- [ ] SEO 站外提交：Google Search Console 已完成站点验证；首页 `https://zenine.github.io/lanposui-blog/` 于 2026-08-03 21:52 通过实际网址测试，允许抓取且可编入索引。已提交 `https://zenine.github.io/lanposui-blog/sitemap-index.xml`，若仍显示无法抓取则补交 `https://zenine.github.io/lanposui-blog/sitemap-0.xml`；后续等待实际收录，并用网址检查请求新文章 URL 编入索引。Bing 站长工具仍需验证并提交 sitemap。百度不做（GitHub Pages 屏蔽 Baiduspider 且无备案域名）。
- [ ] 第 004 期计划 `2026-08-04T21:00:00+08:00` 发布；到点后手动触发或由外部流程触发一次构建，确认 sitemap 包含 `https://zenine.github.io/lanposui-blog/articles/004-ai-assets/`，再在 Google Search Console 用“网址检查”请求新文章编入索引；若 Bing 站长工具已启用，也同步提交 sitemap。
- [ ] 第 005 期计划 `2026-08-06T21:00:00+08:00` 发布；到点后手动触发或由外部流程触发一次构建，确认 sitemap 包含 `https://zenine.github.io/lanposui-blog/articles/005-agent-work-organization/`，再在 Google Search Console 用“网址检查”请求新文章编入索引。

## P2 · 小件待决/待补

- [ ] 第 003 期、第 004 期和第 005 期公众号原文链接待从公众号后台补齐；补齐后同步更新对应 `src/content/articles/*.md` 和 `src/data/posts.ts`。
- [ ] （2026-07-31 审阅遗留）OG 图模板右侧蓝弧被画布右缘裁掉约 18px（`src/pages/og/[slug].png.ts` 的 `translate(830) scale(2)` 跨到 x=1218）；若为有意出血可关闭本项，否则把 translate 收到约 810。
- [ ] （2026-07-31 审阅遗留）`scripts/check-public-output.mjs` 的 `width="1693"`、`>2021<` 等断言绑死当前文章数据，发新文换最新封面或删旧文时需同步更新断言。
- [ ] favicon 品牌弧候选已生成在 `public/favicon-arc.svg`（亮暗自适应，未启用），当前默认仍是公众号 Logo；待用户审阅后决定是否切换（切换=改 `BaseLayout.astro` 两行 favicon link 并更新版本参数）。
- [ ] 第 001 期公众号原文链接和真实发布日期待从公众号后台补齐；补齐后同步更新首页文章数据和文章页 frontmatter。
- [ ] 如需继续补过往文章图片，从公众号后台或私有归档重新导出 2022 / 2023 两篇原图；当前博客保留原文图片占位提示。

## 暂缓（有明确决策）

- 域根 `robots.txt`（需新建 `Zenine/zenine.github.io` 根仓库）暂缓：Search Console / Bing 手动提交 sitemap 后它无增量价值，且根仓库会占据 github.io 根路径，属域级决策；未来做根域个人主页时捎带。项目内 `/lanposui-blog/robots.txt` 爬虫不读（robots 协议只认域根），保留仅作声明。

## 长期约定

- [ ] 后续从 `writing-craft` 同步新文章时，先做公开边界审查，再复制正文和图片；图片按维护手册转 WebP。

## 主线提示（跨库）

- 本仓库（公开发布层）视觉与 SEO 基建已就绪。公众号发布**不建自动回路，人工手动触发**（用户 2026-07-30 拍板）；后续主线是持续手动发布存稿，并按公开边界流程同步到本博客。
