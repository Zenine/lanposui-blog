# TODO

按优先级排序（2026-07-30 梳理，2026-08-22 更新第 077 期同步项）。

## P1 · 需用户登录操作

- [ ] SEO 站外提交：Google Search Console 已完成站点验证；首页 `https://zenine.github.io/lanposui-blog/` 于 2026-08-03 21:52 通过实际网址测试，允许抓取且可编入索引。已提交 `https://zenine.github.io/lanposui-blog/sitemap-index.xml`，若仍显示无法抓取则补交 `https://zenine.github.io/lanposui-blog/sitemap-0.xml`；第 004 / 005 / 100 期已上线且 sitemap 已包含；第 077 期已同步到博客源码，部署后需在 Search Console 用“网址检查”请求 `https://zenine.github.io/lanposui-blog/articles/077-medical-ai-benchmark/` 编入索引。Bing 站长工具仍需验证并提交 sitemap。百度不做（GitHub Pages 屏蔽 Baiduspider 且无备案域名）。

## P2 · 小件待决/待补

- [ ] favicon 品牌弧候选已生成在 `public/favicon-arc.svg`（亮暗自适应，未启用），当前默认仍是公众号 Logo；待用户审阅后决定是否切换（切换=改 `BaseLayout.astro` 两行 favicon link 并更新版本参数）。
- [ ] 文章 URL 期号 slug 的 SEO / GEO 长期评估：当前保留 `/articles/077-medical-ai-benchmark/` 这类“期号 + 语义关键词”格式，理由是稳定链接、跨库期号映射和公众号同步价值高；后续若决定改为纯语义 slug，必须同时设计 canonical、301/静态重定向、sitemap 更新、历史外链兼容和 `writing-craft` 映射回填，不做单点改名。

## 暂缓（有明确决策）

- 域根 `robots.txt`（需新建 `Zenine/zenine.github.io` 根仓库）暂缓：Search Console / Bing 手动提交 sitemap 后它无增量价值，且根仓库会占据 github.io 根路径，属域级决策；未来做根域个人主页时捎带。项目内 `/lanposui-blog/robots.txt` 爬虫不读（robots 协议只认域根），保留仅作声明。

## 长期约定

- [ ] 后续从 `writing-craft` 同步新文章时，先做公开边界审查，再复制正文和图片；图片按维护手册转 WebP。

## 主线提示（跨库）

- 本仓库（公开发布层）视觉与 SEO 基建已就绪。公众号发布**不建自动回路，人工手动触发**（用户 2026-07-30 拍板）；后续主线是持续手动发布存稿，并按公开边界流程同步到本博客。
