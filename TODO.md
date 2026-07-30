# TODO

按优先级排序（2026-07-30 梳理）。

## P1 · 需用户登录操作

- [ ] SEO 站外提交：Google Search Console 和 Bing 站长工具验证站点并提交 `https://zenine.github.io/lanposui-blog/sitemap-index.xml`；如用 HTML meta 标签验证，把验证码告知 agent 加入 `BaseLayout.astro` 即可。百度不做（GitHub Pages 屏蔽 Baiduspider 且无备案域名）。

## P2 · 小件待决/待补

- [ ] 页眉品牌位已改为「蓝破碎半圆」品牌弧 SVG，浏览器 favicon 仍是公众号 Logo；是否统一为品牌弧待用户决定（点头即做，可顺手做亮暗自适应 SVG favicon）。
- [ ] 第 001 期公众号原文链接和真实发布日期待从公众号后台补齐；补齐后同步更新首页文章数据和文章页 frontmatter。
- [ ] 如需继续补过往文章图片，从公众号后台或私有归档重新导出 2022 / 2023 两篇原图；当前博客保留原文图片占位提示。

## 长期约定

- [ ] 后续从 `writing-craft` 同步新文章时，先做公开边界审查，再复制正文和图片；图片按维护手册转 WebP。

## 主线提示（跨库）

- 本仓库（公开发布层）视觉与 SEO 基建已就绪；按 `writing-craft` 规划，当前唯一 P0 是**发布回路**（公众号 draft/add 链路，存稿 74+6 篇、已发 0 篇，PR#17 未合）。博客侧无阻塞项后，主线应回到 `writing-craft` 建发布回路。
