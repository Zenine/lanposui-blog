# 蓝破碎半圆博客

公开博客发布仓库。这里是 `writing-craft` 的发布层，只放已经确认可以公开的文章、页面和图片，不保存草稿、审读意见、库内附录、TODO 或私有素材。

线上地址：https://zenine.github.io/lanposui-blog/

## 首页与视觉

- Hero 文案：`在破碎信息里，留下判断的现场。`
- Hero 重点展示最新文章封面和标题。
- 当前视觉使用冷白纸面、蓝色和铜绿点缀，保留“蓝破碎半圆”的半圆品牌标记。
- 顶部导航包含文章、分类、合集、检索和公众号入口。
- 鼠标悬停或键盘聚焦“公众号”时，会浮出公众号二维码。

## 技术栈

- Astro
- Astro Content Collections
- Markdown 文章
- Pagefind 站内检索
- RSS / Sitemap / robots.txt
- GitHub Pages 部署
- Node.js >= 22.12.0

## 技术架构

- `src/content/articles/`：公开文章 Markdown 源文件，由 Astro Content Collections 管理并校验 frontmatter。
- `src/content.config.ts`：文章集合 schema。
- `src/data/posts.ts`：首页、列表、分类、合集、推荐和 RSS 使用的公开文章元数据。
- `src/data/blog.ts`：站点信息、文章排序、分类分组、合集分组、相关文章推荐和绝对链接工具。
- `src/pages/articles/[...slug].astro`：动态文章路由，保持 `/articles/<slug>/` 公开 URL。
- `src/pages/categories/`：分类索引和分类详情页。
- `src/pages/collections/`：合集索引和合集详情页。
- `src/pages/search.astro`：Pagefind 站内检索页。
- `src/pages/rss.xml.ts`、`src/pages/robots.txt.ts`：订阅与爬虫入口。
- `src/layouts/BaseLayout.astro`：全站导航、SEO meta、公众号二维码浮层和页脚。
- `src/layouts/PostLayout.astro`：文章页、BlogPosting JSON-LD 和相关推荐。

## 博客能力

- `/articles/`：全部文章
- `/categories/`：按分类阅读
- `/collections/`：按合集阅读
- `/search/`：站内全文检索
- `/rss.xml`：RSS 订阅
- `/sitemap-index.xml`：搜索引擎站点地图
- 文章页包含 canonical、Open Graph、Twitter card 和 BlogPosting JSON-LD。

## 公众号二维码

- 二维码文件：`public/images/wechat-qr.jpg`
- 展示位置：全站顶部导航的“公众号”入口。
- 行为：鼠标悬停和键盘聚焦时展示二维码浮层；点击文字仍打开公众号链接。
- 更换二维码时，替换该图片文件后运行 `npm test`。

## 本地开发

```sh
npm install
npm run astro -- dev --background
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
npm run build
```

本仓库启动开发服务时使用 Astro 后台模式，便于在 agent 会话中查看状态、日志并停止服务。

验证入口：

```sh
npm test
```

当前 `npm test` 会先运行 `npm run build`，再检查首页、文章列表、分类、合集、检索、RSS、robots、sitemap、Pagefind 索引和公众号二维码入口等关键公开输出。

## 内容边界

- 私有写作工作台：`/Users/zeninexu/github/writing-craft`
- 公开博客仓库：`/Users/zeninexu/github/lanposui-blog`
- 公开文章源码放在 `src/content/articles/`
- 公开图片放在 `public/images/`
- 过往公众号文章也放在 `src/content/articles/`，可通过分类和合集阅读，不在文章标题前展示编号或旧称。

首页、文章列表、分类、合集、RSS 和推荐区使用 `src/data/posts.ts` 维护展示数据；新增或修改文章时，需要同步更新该文件中的标题、日期、摘要、分类、合集、标签、封面和公众号原文链接。

从 `writing-craft` 同步文章前，必须确认：

- 删除“库内编辑附录”
- 删除审读记录、Prompt、TODO、内部来源核对
- 图片路径改为博客公开路径
- 涉及个人、公司、客户、股票或医疗内容时，先做公开边界审查
- 过往文章中用户明确删除或不再公开的文章不重新同步。

## 发布流程

1. 从 `writing-craft` 只同步已经确认公开的正文和必要图片。
2. 将文章保存到 `src/content/articles/`，并检查 frontmatter。
3. 将公开图片保存到 `public/images/`；文章正文中的站内图片路径使用 `/lanposui-blog/images/...`。
4. 更新 `src/data/posts.ts`，确保首页和文章列表可见。
5. 运行 `npm test`，构建会生成 RSS、sitemap 和 Pagefind 检索索引。
6. 同步更新 `TODO.md` 和 `CHANGELOG.md`。

## 部署

推送到 `main` 后，GitHub Actions 使用 Astro 官方 action 构建并部署到 GitHub Pages。部署 workflow 显式运行 `npm test`，因此上线前会先生成 Astro 静态页面、RSS、sitemap 和 Pagefind 检索索引，再执行公开输出检查。

站点配置在 `astro.config.mjs`：

- `site`: `https://zenine.github.io`
- `base`: `/lanposui-blog`

线上地址：https://zenine.github.io/lanposui-blog/
