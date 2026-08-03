## Project Rules

本仓库是公开博客发布层。不要把 `writing-craft` 的草稿、审读意见、库内编辑附录、TODO、Prompt、私有素材、客户 / 公司细节或未核实投资内容直接复制进来。

文章从 `writing-craft` 同步时，只同步已经确认公开的正文和必要图片。发布前必须删除“库内编辑附录”，并复核图片路径、外链、个人信息和事实口径。

## 工程与视觉规范（2026-07-30 确立）

- 验证入口是 `npm test`（构建 + Pagefind + `scripts/check-public-output.mjs` 产物断言）。改动行为先在检查脚本加断言、确认失败，再实现。提交信息不加任何 AI 署名。
- 签名视觉「蓝破碎半圆」的叙事方向是**半圆碎掉**（完整蓝色半圆自左向右碎裂散开），不是"碎片拼成半圆"；用户已拍板，改图前先确认。品牌弧出现在页眉、首页 Hero、kicker 刻度、404 页、文章页阅读进度弧。
- 色板、字体栈、暗色模式变量集中在 `src/layouts/BaseLayout.astro` 的 `:root` 与暗色覆写块；**新增颜色一律走 CSS 变量，不写死色值**，否则暗色模式会漏。蓝色是唯一强调色。
- 新增或修改文章要同时维护 Markdown（`src/content/articles/`）和 `src/data/posts.ts` 双份数据；`cover` 路径前缀两处不同（md 用 `/lanposui-blog/images/...`，posts.ts 用 `/images/...`）。文章修订可加 frontmatter `updated: "YYYY-MM-DD"`。
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
