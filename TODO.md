# TODO

按优先级排序（2026-07-30 梳理，2026-08-27 更新 148—150 定时同步与纯语义 slug 项）。

## P1 · 需用户登录操作

- [ ] SEO 站外提交：Google Search Console 已完成站点验证；首页 `https://zenine.github.io/lanposui-blog/` 于 2026-08-03 21:52 通过实际网址测试，允许抓取且可编入索引。已提交 `https://zenine.github.io/lanposui-blog/sitemap-index.xml`，若仍显示无法抓取则补交 `https://zenine.github.io/lanposui-blog/sitemap-0.xml`；第 004 / 005 / 100 期已上线且 sitemap 已包含；第 077 / 148 / 149 / 150 期已同步到博客源码，部署后需在 Search Console 用“网址检查”请求对应纯语义文章 URL 编入索引。Bing 站长工具仍需验证并提交 sitemap。百度不做（GitHub Pages 屏蔽 Baiduspider 且无备案域名）。

## P2 · 小件待决/待补

- [ ] favicon 品牌弧候选已生成在 `public/favicon-arc.svg`（亮暗自适应，未启用），当前默认仍是公众号 Logo；待用户审阅后决定是否切换（切换=改 `BaseLayout.astro` 两行 favicon link 并更新版本参数）。
- [ ] 公众号链接待补：148、149、150 已按定时发布计划同步到博客，待公众号正式发出后回填 `wechat` 字段与 source 说明；后台 `tempkey` 预览链接不入库。
## 暂缓（有明确决策）

- 域根 `robots.txt`（需新建 `Zenine/zenine.github.io` 根仓库）暂缓：Search Console / Bing 手动提交 sitemap 后它无增量价值，且根仓库会占据 github.io 根路径，属域级决策；未来做根域个人主页时捎带。项目内 `/lanposui-blog/robots.txt` 爬虫不读（robots 协议只认域根），保留仅作声明。

## 长期约定

- [ ] 后续从 `writing-craft` 同步新文章时，先做公开边界审查，再复制正文和图片；图片按维护手册转 WebP。

## 主线提示（跨库）

- 本仓库（公开发布层）视觉与 SEO 基建已就绪。公众号发布**不建自动回路，人工手动触发**（用户 2026-07-30 拍板）；后续主线是持续手动发布存稿，并按公开边界流程同步到本博客。
